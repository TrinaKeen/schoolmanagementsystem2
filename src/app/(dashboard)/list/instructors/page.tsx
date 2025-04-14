// Created with the help of ChatGPT

// Using React, Next.js (App Router), and Mantine UI, generate a functional `page.tsx` component that does the following:
// Fetches a list of instructors from `/api/instructors` using `axios`
// Displays them in a responsive `<Table>`
// Includes a "Add Instructor" button that opens a `FormModal`
// Submits data using the `onSubmit` handler to POST `/api/instructors`
// Uses `instructorFields` imported from a config file

// Include `useEffect`, `useState`, and `FormModal` integration

'use client';

import { useEffect, useState } from 'react';
import {
  Button,
  Group,
  Table,
  Box,
  Text,
} from '@mantine/core';
import axios from 'axios';
import FormModal from '@/components/FormModal';
import instructorFields from '@/utils/fields/instructorFields';

interface Instructor {
  id: number;
  employeeNumber: string;
  firstName: string;
  middleName?: string;
  lastName: string;
  department?: string;
  email: string;
  phoneNumber?: string;
  dateHired: string;
  dob?: string;
}

export default function InstructorsPage() {
  const [instructors, setInstructors] = useState<Instructor[]>([]);
  const [modalOpen, setModalOpen] = useState(false);

  const fetchInstructors = async () => {
    try {
      const res = await axios.get('/api/instructors');
      setInstructors(res.data);
    } catch (err) {
      console.error('Failed to fetch instructors:', err);
    }
  };

  const handleAddInstructor = async (values: Record<string, any>) => {
    try {
      await axios.post('/api/instructors', values);
      setModalOpen(false);
      fetchInstructors();
    } catch (err) {
      console.error('Error adding instructor:', err);
    }
  };

  useEffect(() => {
    fetchInstructors();
  }, []);

  return (
    <Box p="md">
      <Group justify="space-between" style={{ marginBottom: '1rem' }}>
        <Text fw={700} size="xl">
          Instructors
        </Text>
        <Button onClick={() => setModalOpen(true)}>Add Instructor</Button>
      </Group>

      <Table>
        <thead>
          <tr>
            <th>Employee #</th>
            <th>Name</th>
            <th>Department</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Date Hired</th>
          </tr>
        </thead>
        <tbody>
          {instructors.length === 0 ? (
            <tr>
              <td colSpan={6}>No instructors found.</td>
            </tr>
          ) : (
            instructors.map((ins) => (
              <tr key={ins.id}>
                <td>{ins.employeeNumber}</td>
                <td>
                  {ins.firstName} {ins.middleName} {ins.lastName}
                </td>
                <td>{ins.department}</td>
                <td>{ins.email}</td>
                <td>{ins.phoneNumber}</td>
                <td>{new Date(ins.dateHired).toLocaleDateString()}</td>
              </tr>
            ))
          )}
        </tbody>
      </Table>

      <FormModal
        opened={modalOpen}
        onClose={() => setModalOpen(false)}
        onSubmit={handleAddInstructor}
        fields={instructorFields}
        title="Add New Instructor"
      />
    </Box>
  );
}
