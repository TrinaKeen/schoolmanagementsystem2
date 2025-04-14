// Created with the help of ChatGPT
// Create a reusable React component with mmantine ui's modal form.
// The component should accept props like opened, onClose, onSubmit, fields and title
// The `fields` prop should be an array of field config objects
// Use `@mantine/form` to handle form state. 
// Return the `<Modal>` containing the form and a Submit button

// Use prisma schema

'use client';

import {
  Button,
  Group,
  Modal,
  Box,
  TextInput,
} from '@mantine/core';
import { useForm } from '@mantine/form';
// useForm is a hook that manages form state, validation, and input control

// Type Definitions
interface FieldConfig {
  name: string; // Used as the form field name and key in form state
  label: string; // Displayed as the field's label in the UI
  type?: string; // Optional: input type ('text', 'email', 'date', etc.)
  required?: boolean; // Optional: whether the field is required
}

interface FormModalProps {
  opened: boolean; // Whether the modal is visible
  onClose: () => void; // Function to call when closing the modal
  onSubmit: (values: Record<string, any>) => void; // Function called when form is submitted
  fields: FieldConfig[]; // Array of fields to dynamically render
  title: string; // Title of the modal
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

// Initialize Form State 
}: FormModalProps) { 
  const form = useForm({
    initialValues: fields.reduce((acc, field) => {
      acc[field.name] = ''; // Set each field to an empty string
      return acc;
    }, {} as Record<string, any>),
  });

  const handleSubmit = (values: Record<string, any>) => {
    onSubmit(values); // Call the parent’s submit function
    form.reset(); // Clears the form
  };

  // Modal Render
  // This dynamically renders the fields
  return (
    <Modal opened={opened} onClose={onClose} title={title} size="lg">
      <Box component="form" onSubmit={form.onSubmit(handleSubmit)}>
        {fields.map((field) => (
          <TextInput
            key={field.name} // unique React key
            label={field.label} // shown in UI
            type={field.type || 'text'} // default to 'text' if undefined
            required={field.required} // add red asterisk if true
            {...form.getInputProps(field.name)} // binds input value and events to form
            mt="sm"  // top margin between inputs
          />
        ))}

        <Group justify="flex-end" mt="md">
          <Button type="submit">Submit</Button>
        </Group>
      </Box>
    </Modal>
  );
}
