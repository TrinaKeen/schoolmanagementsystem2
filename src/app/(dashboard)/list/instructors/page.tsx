// Created with the help of ChatGPT

// Using React, Next.js (App Router), and Mantine UI, generate a functional `page.tsx` component that does the following:
// Fetches a list of instructors from `/api/instructors` using `axios`
// Displays them in a responsive `<Table>`
// Includes a "Add Instructor" button that opens a `FormModal`
// Submits data using the `onSubmit` handler to POST `/api/instructors`
// Uses `instructorFields` imported from a config file

// Include `useEffect`, `useState`, and `FormModal` integration
// ChatGPT also created accompanying fields and form code skeleton

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

// Interface for Instructor Type
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
  const [instructors, setInstructors] = useState<Instructor[]>([]);  // Holds the array of instructors returned from the backend
  const [modalOpen, setModalOpen] = useState(false);  // Controls whether the Add Instructor modal is open or closed

  // API fetch form the instructors table
  const fetchInstructors = async () => {
    try {
      const res = await axios.get('/api/instructors');
      setInstructors(res.data);
    } catch (err) {
      console.error('Failed to fetch instructors:', err); // Error logging
    }
  };

  // Add new instructor function
  const handleAddInstructor = async (values: Record<string, any>) => {
    try {
      await axios.post('/api/instructors', values);
      setModalOpen(false);
      fetchInstructors(); // Reloads the table to show the new instructor
    } catch (err) {
      console.error('Error adding instructor:', err); // Error logging
    }
  };

  // Fecth instructors on first render only
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
        opened={modalOpen} // Whether the modal is open
        onClose={() => setModalOpen(false)} // Function to close it
        onSubmit={handleAddInstructor} // Function to handle form submit
        fields={instructorFields} // Field configuration from external file
        title="Add New Instructor" // Modal title
      />
    </Box>
  );
}
