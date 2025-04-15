// Created with the help of ChatGPT

// Using React, Next.js (App Router), and Mantine UI, generate a functional `page.tsx` component that does the following:
// Fetches a list of instructors from `/api/instructors` using `axios`
// Displays them in a responsive `<Table>`
// Includes a "Add Instructor" button that opens a `FormModal`
// Submits data using the `onSubmit` handler to POST `/api/instructors`
// Uses `instructorFields` imported from a config file

// Include `useEffect`, `useState`, and `FormModal` integration
// ChatGPT also created accompanying fields and form code skeleton

// Further styling and table functions from mantine ui

'use client';

import { useEffect, useState } from 'react';
import {
  Button,
  Group,
  Table,
  Box,
  Text,
  TextInput,
  UnstyledButton,
  ScrollArea,
  Center,
} from '@mantine/core';
import { IconSearch, IconSelector, IconChevronDown, IconChevronUp } from '@tabler/icons-react';
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

// Header column type for sortable headers
interface ThProps {
  children: React.ReactNode;
  sorted: boolean;
  reversed: boolean;
  onSort: () => void;
}

// Sortable table header component
function Th({ children, sorted, reversed, onSort }: ThProps) {
  const Icon = sorted ? (reversed ? IconChevronUp : IconChevronDown) : IconSelector;

  return (
    <Table.Th>
      <UnstyledButton onClick={onSort} style={{ width: '100%' }}>
        <Group justify="space-between">
          <Text fw={600} size="sm">
            {children}
          </Text>
          <Center>
            <Icon size={16} />
          </Center>
        </Group>
      </UnstyledButton>
    </Table.Th>
  );
}

export default function InstructorsPage() {
  const [instructors, setInstructors] = useState<Instructor[]>([]);  // Holds the array of instructors returned from the backend
  const [modalOpen, setModalOpen] = useState(false);  // Controls whether the Add Instructor modal is open or closed
  const [sortBy, setSortBy] = useState<keyof Instructor | null>(null);
  const [reversed, setReversed] = useState(false);
  const [search, setSearch] = useState('');

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

  // Search logic
  const filtered = instructors.filter((ins) =>
    Object.values(ins)
      .join(' ')
      .toLowerCase()
      .includes(search.toLowerCase())
  );

   // Sort logic
   const sorted = sortBy
   ? [...filtered].sort((a, b) => {
       const aValue = a[sortBy] ?? '';
       const bValue = b[sortBy] ?? '';
       return reversed
         ? String(bValue).localeCompare(String(aValue))
         : String(aValue).localeCompare(String(bValue));
     })
   : filtered;

 const setSorting = (field: keyof Instructor) => {
   const shouldReverse = field === sortBy ? !reversed : false;
   setReversed(shouldReverse);
   setSortBy(field);
 };

  return (
    <Box p="md">
      <Group justify="space-between" style={{ marginBottom: '1rem' }}>
        <Text fw={700} size="xl">
          Instructors
        </Text>
        <Button onClick={() => setModalOpen(true)}>Add Instructor</Button>
      </Group>

      <TextInput
        placeholder="Search instructor..."
        leftSection={<IconSearch size={14} />}
        mb="md"
        value={search}
        onChange={(e) => setSearch(e.currentTarget.value)}
      />

      <ScrollArea>
      <Table striped highlightOnHover withColumnBorders>
        <Table.Thead>
          <Table.Tr>
            <Th sorted = {sortBy === 'employeeNumber' } reversed = {reversed} onSort = {() => setSorting('employeeNumber')}>
              Employee #
            </Th>
            <Th sorted={sortBy === 'firstName'} reversed={reversed} onSort={() => setSorting('firstName')}>
              Name
            </Th>
            <Th sorted={sortBy === 'department'} reversed={reversed} onSort={() => setSorting('department')}>
              Department
            </Th>
            <Th sorted={sortBy === 'email'} reversed={reversed} onSort={() => setSorting('email')}>
              Email
            </Th>
            <Th sorted={sortBy === 'phoneNumber'} reversed={reversed} onSort={() => setSorting('phoneNumber')}>
              Phone
            </Th>
            <Th sorted={sortBy === 'dateHired'} reversed={reversed} onSort={() => setSorting('dateHired')}>
              Date Hired
            </Th>
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>
          {sorted.length === 0 ? (
            <Table.Tr>
              <Table.Td colSpan={6}>
                <Text ta = "center">
                No instructors found.
                </Text>
              </Table.Td>
            </Table.Tr>
          ) : (
            sorted.map((ins) => (
              <Table.Tr key={ins.id}>
                <Table.Td>{ins.employeeNumber}</Table.Td>
                <Table.Td>
                  {ins.firstName} {ins.middleName} {ins.lastName}
                </Table.Td>
                <Table.Td>{ins.department}</Table.Td>
                <Table.Td>{ins.email}</Table.Td>
                <Table.Td>{ins.phoneNumber}</Table.Td>
                <Table.Td>{new Date(ins.dateHired).toLocaleDateString()}</Table.Td>
              </Table.Tr>
            ))
          )}
        </Table.Tbody>
      </Table>
      </ScrollArea>

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
