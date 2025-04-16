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
import programFields from '@/utils/fields/programFields';

// Interface for Courses Type
interface Program {
  id: number;
  programCode: string;
  programName: string;
  programDescription?: string;
  duration: number;
  tuitionFee?: number;
}

export default function ProgramsPage() {
  const [fees, setFees] = useState<Program[]>([]);  // Holds the array of courses returned from the backend
  const [modalOpen, setModalOpen] = useState(false);  // Controls whether the modal is open or closed

  // API fetch form the programs table
  const fetchPrograms = async () => {
    try {
      const res = await axios.get('/api/programs');
      setFees(res.data);
    } catch (err) {
      console.error('Failed to fetch programs:', err); // Error logging
    }
  };

  // Add new instructor function
  const handleAddPrograms = async (values: Record<string, any>) => {
    try {
      await axios.post('/api/programs', values);
      setModalOpen(false);
      fetchPrograms(); // Reloads the table to show the new instructor
    } catch (err) {
      console.error('Error adding program:', err); // Error logging
    }
  };

  // Fecth programs on first render only
  useEffect(() => {
    fetchPrograms();
  }, []);

  return (
    <Box p="md">
      <Group justify="space-between" style={{ marginBottom: '1rem' }}>
        <Text fw={700} size="xl">
          Programs
        </Text>
        <Button onClick={() => setModalOpen(true)}>Add Program</Button>
      </Group>

      <Table>
        <thead>
          <tr>
            <th>Program Code</th>
            <th>Program Name</th>
            <th>Description</th>
            <th>Duration</th>
            <th>Tuition Fee</th>
          </tr>
        </thead>
        <tbody>
          {fees.length === 0 ? (
            <tr>
              <td colSpan={6}>No programs found.</td>
            </tr>
          ) : (
            fees.map((p) => (
              <tr key={p.id}>
                <td>{p.programCode}</td>
                <td>{p.programName}</td>
                <td>{p.programDescription}</td>
                <td>{p.duration}</td>
                <td>{p.tuitionFee}</td>
              </tr>
            ))
          )}
        </tbody>
      </Table>

      <FormModal
        opened={modalOpen} // Whether the modal is open
        onClose={() => setModalOpen(false)} // Function to close it
        onSubmit={handleAddPrograms} // Function to handle form submit
        fields={programFields} // Field configuration from external file
        title="Add New Program" // Modal title
        initialValues={{
            programCode: '',
            programName: '',
            programDescription: '',
            duration: '',
            tuitionFee: '',
        }}
      />
    </Box>
  );
}
