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

interface FieldConfig {
  name: string;
  label: string;
  type?: string;
  required?: boolean;
}

interface FormModalProps {
  opened: boolean;
  onClose: () => void;
  onSubmit: (values: Record<string, any>) => void;
  fields: FieldConfig[];
  title: string;
}

export default function FormModal({
  opened,
  onClose,
  onSubmit,
  fields,
  title,
}: FormModalProps) {
  const form = useForm({
    initialValues: fields.reduce((acc, field) => {
      acc[field.name] = '';
      return acc;
    }, {} as Record<string, any>),
  });

  const handleSubmit = (values: Record<string, any>) => {
    onSubmit(values);
    form.reset();
  };

  return (
    <Modal opened={opened} onClose={onClose} title={title} size="lg">
      <Box component="form" onSubmit={form.onSubmit(handleSubmit)}>
        {fields.map((field) => (
          <TextInput
            key={field.name}
            label={field.label}
            type={field.type || 'text'}
            required={field.required}
            {...form.getInputProps(field.name)}
            mt="sm"
          />
        ))}

        <Group justify="flex-end" mt="md">
          <Button type="submit">Submit</Button>
        </Group>
      </Box>
    </Modal>
  );
}
