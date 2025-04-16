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
} from "@mantine/core";
import { Textarea } from "@mantine/core";
import { useForm } from "@mantine/form";
import { Children, useEffect } from "react";
// useForm is a hook that manages form state, validation, and input control

// Type Definitions
interface FieldConfig {
  name: string; // Used as the form field name and key in form state
  label: string; // Displayed as the field's label in the UI
  type?: string; // Optional: input type ('text', 'email', 'date', etc.)
  required?: boolean; // Optional: whether the field is required
  options?: { label: string; value: string }[]; // Optional: for select or radio inputs
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
}: // Initialize Form State
FormModalProps) {
  const form = useForm({
    initialValues: fields.reduce((acc, field) => {
      acc[field.name] = ""; // Set each field to an empty string
      return acc;
    }, {} as Record<string, any>),
  });

  useEffect(() => {
    if (initialValues) {
      form.setValues(initialValues);
    }
  }, [initialValues]);

  const handleSubmit = (values: Record<string, any>) => {
    onSubmit(values); // Call the parent’s submit function
    form.reset(); // Clears the form
  };

  // Modal Render
  // This dynamically renders the fields
  return (
    <Modal opened={opened} onClose={onClose} title={title} size="lg">
      {type === "delete" ? (
        <Box>
          <Text mb="md">Are you sure you want to delete this item?</Text>
          <Group justify="flex-end">
            <Button variant="default" onClick={onClose}>
              Cancel
            </Button>
            <Button color="red" onClick={() => onSubmit(data)}>
              Delete
            </Button>
          </Group>
        </Box>
      ) : (
        <Box component="form" onSubmit={form.onSubmit(handleSubmit)}>
          {fields.map((field) => {
            if (
              field.name === "rejectionReason" &&
              form.values.status !== "rejected"
            ) {
              return null; // Skip rendering if status is not "rejected"
            }

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

            if (field.type === "select") {
              return (
                <Select
                  key={field.name}
                  label={field.label}
                  data={field.options || []}
                  required={field.required}
                  {...form.getInputProps(field.name)}
                  mt="sm"
                  placeholder="Select..."
                />
              );
            }

            if (field.type === "password") {
              return (
                <PasswordInput
                  key={field.name}
                  label={field.label}
                  required={field.required}
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
                {...form.getInputProps(field.name)}
                mt="sm"
              />
            );
          })}

          <Group justify="flex-end" mt="md">
            <Button type="submit">Submit</Button>
          </Group>

          {children}
        </Box>
      )}
    </Modal>
  );
}
