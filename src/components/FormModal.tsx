// Created with the help of ChatGPT
// Create a reusable React component with mmantine ui's modal form.
// The component should accept props like opened, onClose, onSubmit, fields and title
// The `fields` prop should be an array of field config objects
// Use `@mantine/form` to handle form state.
// Return the `<Modal>` containing the form and a Submit button

// Use prisma schema

"use client";

import {
  Button,
  Group,
  Modal,
  Box,
  TextInput,
  Select,
  PasswordInput,
  Text,
  Autocomplete,
  Textarea,
  AutocompleteProps,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import axios from "axios";
import { Children, useEffect, useState } from "react";
import { read } from "fs";

// useForm is a hook that manages form state, validation, and input control

// Type Definitions
interface FieldConfig {
  data?: { label: string; value: string }[];
  readonly?: boolean;
  name: string; // Used as the form field name and key in form state
  label: string; // Displayed as the field's label in the UI
  type?: string; // Optional: input type ('text', 'email', 'date', etc.)
  required?: boolean; // Optional: whether the field is required
  options?: { label: string; value: string }[]; // Optional: for select or radio inputs
  async?: boolean;
}

type ModalType = "create" | "update" | "delete" | null;

interface FormModalProps {
  opened: boolean; // Whether the modal is visible
  onClose: () => void; // Function to call when closing the modal
  onSubmit: (values: Record<string, any>) => void; // Function called when form is submitted
  fields: FieldConfig[]; // Array of fields to dynamically render
  title: string; // Title of the modal
  initialValues?: Record<string, any>; // Optional: initial values for the form fields
  type?: ModalType;
  data?: any;
  children?: React.ReactNode; // Optional: children to render inside the modal
  onFieldChange?: (field: string, value: any) => void;
  readonly?: boolean; // Optional: whether the form is read-only
}

// Component Definition
// Renders the modal and dynamically builds a form
// Calls onSubmit
export default function FormModal({
  opened,
  onClose,
  onSubmit,
  fields,
  title,
  initialValues = {},
  type = "create",
  data,
  children,
  onFieldChange,
  readonly = false, // Default to false if not provided
}: // Initialize Form State
FormModalProps) {
  const form = useForm({
    initialValues: fields.reduce((acc, field) => {
      acc[field.name] = ""; // Set each field to an empty string
      return acc;
    }, {} as Record<string, any>),
  });

  const [asyncOptions, setAsyncOptions] = useState<Record<string, { label: string; value: string }[]>>({});
  const [searchValues, setSearchValues] = useState<Record<string, string>>({});

  // Reset when modal closes
  useEffect(() => {
    if (!opened) {
      form.reset();
      setSearchValues({});
      setAsyncOptions({});
    }
  }, [opened]);

    // Set initial form values (e.g., during edit)
    useEffect(() => {
      if (initialValues) {
        form.setValues(initialValues);
  
        // Handle async label lookup for autocomplete field
        fields.forEach(async (field) => {
          if (field.async && field.type === "select") {
            const id = initialValues[field.name];
            if (id) {
              try {
                const res = await axios.get(`/api/student-label?id=${id}`);
                const label = res.data?.label || "";
  
                setSearchValues((prev) => ({
                  ...prev,
                  [field.name]: label,
                }));
  
                setAsyncOptions((prev) => ({
                  ...prev,
                  [field.name]: [{ label, value: id.toString() }],
                }));
              } catch (err) {
                console.error(`Failed to fetch label for ${field.name}`, err);
              }
            }
          }
        });
      }
    }, [initialValues, fields]);
  
    const handleSubmit = (values: Record<string, any>) => {
      onSubmit(values);
      form.reset();
      setSearchValues({});
      setAsyncOptions({});
    };
  
    return (
      <Modal opened={opened} onClose={onClose} title={title} size="lg">
        {type === "delete" ? (
          <Box>
            <Text mb="md">Are you sure you want to delete this item?</Text>
            <Group justify="flex-end">
              <Button variant="default" onClick={onClose}>Cancel</Button>
              <Button color="red" onClick={() => onSubmit(data)}>Delete</Button>
            </Group>
          </Box>
        ) : (
          <Box component="form" onSubmit={form.onSubmit(handleSubmit)}>
            {fields.map((field) => {
              const currentValue = form.values[field.name];
  
              // Conditionally skip rejectionReason if not rejected
              if (field.name === "rejectionReason" && form.values.status !== "rejected") return null;
  
              // Rejection reason field
              if (field.name === "rejectionReason") {
                return (
                  <Textarea
                    key={field.name}
                    label={field.label}
                    required={field.required}
                    autosize
                    minRows={3}
                    {...form.getInputProps(field.name)}
                    mt="sm"
                    placeholder="Please explain the reason for rejection..."
                  />
                );
              }
  
              // Async Autocomplete
              if (field.type === "select" && field.async) {
                const options = Array.isArray(asyncOptions[field.name]) ? asyncOptions[field.name] : [];
                const currentLabel = options.find((opt) => opt.value === currentValue)?.label || "";
  
                return (
                  <Autocomplete
                    key={field.name}
                    label={field.label}
                    placeholder="Search student..."
                    value={searchValues[field.name] ?? currentLabel}
                    data={Array.isArray(options) ? options.map((opt) => opt.label) : []}
                    onChange={async (input) => {
                      setSearchValues((prev) => ({ ...prev, [field.name]: input }));
  
                      try {
                        const res = await axios.get(`/api/students?q=${input}`);
                        const raw = res.data;
  
                        const newOptions = Array.isArray(raw)
                          ? raw.map((s) => ({
                              label: `${s.studentNumber} | ${s.firstName} ${s.lastName}`,
                              value: s.id.toString(),
                            }))
                          : [];
  
                        const stillExists = newOptions.some((opt) => opt.value === currentValue);
                        const currentOpt = options.find((opt) => opt.value === currentValue);
  
                        setAsyncOptions((prev) => ({
                          ...prev,
                          [field.name]: stillExists
                            ? newOptions
                            : currentOpt
                            ? [currentOpt, ...newOptions]
                            : newOptions,
                        }));
                      } catch (err) {
                        console.error("Search failed:", err);
                        setAsyncOptions((prev) => ({ ...prev, [field.name]: [] }));
                      }
                    }}
                    onOptionSubmit={(label) => {
                      const selected = asyncOptions[field.name]?.find((opt) => opt.label === label);
                      if (selected) {
                        form.setFieldValue(field.name, selected.value);
                        setSearchValues((prev) => ({ ...prev, [field.name]: label }));
                        onFieldChange?.(field.name, selected.value);
                      }
                    }}
                    {...({
                      nothingFound: "No students found",
                    } as Partial<AutocompleteProps>)}
                    mt="sm"
                  />
                );
              }
  
              // Static Select
              if (field.type === "select") {
                return (
                  <Select
                    key={field.name}
                    label={field.label}
                    data={field.options ?? field.data ?? []}
                    required={field.required}
                    disabled={field.readonly}
                    {...form.getInputProps(field.name)}
                    onChange={(value) => {
                      form.setFieldValue(field.name, value);
                      onFieldChange?.(field.name, value);
                    }}
                    mt="sm"
                    placeholder="Select..."
                  />
                );
              }
  
              // Password
              if (field.type === "password") {
                return (
                  <PasswordInput
                    key={field.name}
                    label={field.label}
                    required={field.required}
                    disabled={field.readonly}
                    {...form.getInputProps(field.name)}
                    mt="sm"
                  />
                );
              }
  
              // Text / Default
              return (
                <TextInput
                  key={field.name}
                  label={field.label}
                  type={field.type || "text"}
                  required={field.required}
                  disabled={readonly || field.readonly}
                  {...form.getInputProps(field.name)}
                  onChange={(e) => {
                    form.setFieldValue(field.name, e.currentTarget.value);
                    onFieldChange?.(field.name, e.currentTarget.value);
                  }}
                  mt="sm"
                />
              );
            }

            if (field.type === "password") {
              return (
                <PasswordInput
                  key={field.name}
                  label={field.label}
                  required={field.required}
                  disabled={field.readonly}
                  {...form.getInputProps(field.name)}
                  mt="sm"
                />
              );
            }

            return (
              <TextInput
                key={field.name}
                label={field.label}
                type={field.type || "text"}
                required={field.required}
                disabled={readonly || field.readonly}
                {...form.getInputProps(field.name)}
                onChange={(e) => {
                  form.setFieldValue(field.name, e.currentTarget.value);
                  onFieldChange?.(field.name, e.currentTarget.value);
                }}
                mt="sm"
              />
            );
          })}
          {!readonly && (
            <Group justify="flex-end" mt="md">
              <Button type="submit">
                {type === "update" ? "Update" : "Add"}
              </Button>
            </Group>
          )}

          {children}
        </Box>
      )}
    </Modal>
  );
}

