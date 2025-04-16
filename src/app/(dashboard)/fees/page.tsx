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
import feeFields from '@/utils/fields/feesFields';

// Interface for Courses Type
interface Fee {
  id: number;
  programId: number;
  feeType: string;
  amount: number;
  description?: string;
}

export default function FeesPage() {
  const [fees, setFees] = useState<Fee[]>([]);  // Holds the array of courses returned from the backend
  const [modalOpen, setModalOpen] = useState(false);  // Controls whether the modal is open or closed

  // API fetch form the fees table
  const fetchFees = async () => {
    try {
      const res = await axios.get('/api/fees');
      setFees(res.data);
    } catch (err) {
      console.error('Failed to fetch fees:', err); // Error logging
    }
  };

  // Add new instructor function
  const handleAddFees = async (values: Record<string, any>) => {
    try {
      await axios.post('/api/fees', values);
      setModalOpen(false);
      fetchFees(); // Reloads the table to show the new instructor
    } catch (err) {
      console.error('Error adding fee:', err); // Error logging
    }
  };

  // Fecth instructors on first render only
  useEffect(() => {
    fetchFees();
  }, []);

  return (
    <Box p="md">
      <Group justify="space-between" style={{ marginBottom: '1rem' }}>
        <Text fw={700} size="xl">
          Fees
        </Text>
        <Button onClick={() => setModalOpen(true)}>Add Fee</Button>
      </Group>

      <Table>
        <thead>
          <tr>
            <th>Program ID</th>
            <th>Type</th>
            <th>Amount</th>
            <th>Description</th>
          </tr>
        </thead>
        <tbody>
          {fees.length === 0 ? (
            <tr>
              <td colSpan={6}>No courses found.</td>
            </tr>
          ) : (
            fees.map((f) => (
              <tr key={f.id}>
                <td>{f.programId}</td>
                <td>{f.feeType}</td>
                <td>{f.amount}</td>
                <td>{f.description}</td>
              </tr>
            ))
          )}
        </tbody>
      </Table>

      <FormModal
        opened={modalOpen} // Whether the modal is open
        onClose={() => setModalOpen(false)} // Function to close it
        onSubmit={handleAddFees} // Function to handle form submit
        fields={feeFields} // Field configuration from external file
        title="Add New Fee" // Modal title
        initialValues={{
          programId: '',
          feeType: '',
          amount: '',
          description: '',
        }}
      />
    </Box>
  );
}
