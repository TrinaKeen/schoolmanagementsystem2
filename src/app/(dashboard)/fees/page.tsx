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
  Modal,
} from '@mantine/core';
import { 
  IconChevronDown,
  IconChevronUp,
  IconPencil,
  IconSearch,
  IconSelector,
  IconTrash,
 } from '@tabler/icons-react';
import axios from 'axios';
import FormModal from '@/components/FormModal';
import courseFields from '@/utils/fields/courseFields';
import { useNotification } from '@/context/notificationContent';
import { notifications } from '@mantine/notifications';
import feeFields from '@/utils/fields/feesFields';

// Interface for Courses Type
interface Fee {
  id: number;
  programId: number;
  feeType: string;
  amount: number;
  description?: string;
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

export default function FeesPage() {
  const [fees, setFees] = useState<Fee[]>([]);  // Holds the array of courses returned from the backend
  const [modalOpen, setModalOpen] = useState(false);  // Controls whether the modal is open or closed
  const [sortBy, setSortBy] = useState<keyof Fee | null>(null);
  const [reversed, setReversed] = useState(false);
  const [search, setSearch] = useState('');
  const [editFee, setEditFee ] = useState<Fee | null>(null);
  const [deleteModal, setDeleteModal] = useState(false);
  const [selectedFee, setSelectedFee] = useState<Fee | null>(null);
  const { addNotification } = useNotification();

  // API fetch form the fees table
  const fetchFees = async () => {
    try {
      const res = await axios.get('/api/fees');
      setFees(res.data);
    } catch (err) {
      console.error('Failed to fetch fees:', err); // Error logging
    }
  };

   // Fecth instructors on first render only
   useEffect(() => {
    fetchFees();
  }, []);

  // Add new instructor function
  const handleAddFees = async (values: Record<string, any>) => {
    try {
      if (editFee){
      await axios.put(`/api/fees?id=${editFee.id}`, values);
      addNotification(`${values.feeName} fee updated`)
      } else {
      await axios.post('/api/fees', values);
      addNotification(`${values.feeName} fee added`);
      }
      setModalOpen(false);
      setEditFee(null);
      fetchFees(); // Reloads the table to show the new instructor
    } catch (err) {
      notifications.show({
        title: "Error",
        message: "Failed to save fee.",
        color: "red",
    });
  };
}

const handleDelete = async () => {
  if (!selectedFee) return;
  try {
    await axios.delete(`/api/fees?id=${selectedFee.id}`);
    addNotification(`${selectedFee.feeType} fee deleted`);
    setDeleteModal(false);
    fetchFees();
  } catch {
    notifications.show({
      title: "Error",
      message: "Failed to delete fee.",
      color: "red",
    });
  }
};

// Search logic
  const filtered = fees.filter((f) =>
    Object.values(f)
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

 const setSorting = (field: keyof Fee) => {
   const shouldReverse = field === sortBy ? !reversed : false;
   setReversed(shouldReverse);
   setSortBy(field);
 };

 const rows = sorted.map((f) => (
  <Table.Tr key={f.id}>
    <Table.Td>{f.programId}</Table.Td>
    <Table.Td>{f.feeType}</Table.Td>
    <Table.Td>{f.amount}</Table.Td>
    <Table.Td>{f.description}</Table.Td>
    <Table.Td>
      <Group gap="xs">
        <Button
          size="xs"
          variant="light"
          leftSection={<IconPencil size={14} />}
          onClick={() => {
            setEditFee(f);
            setModalOpen(true);
          }}
        >
          Edit
        </Button>
        <Button
          size="xs"
          color="red"
          variant="light"
          leftSection={<IconTrash size={14} />}
          onClick={() => {
            setSelectedFee(f);
            setDeleteModal(true);
          }}
        >
          Delete
        </Button>
      </Group>
    </Table.Td>
  </Table.Tr>
));

  return (
    <Box p="md">
      <Group justify="space-between" style={{ marginBottom: '1rem' }}>
        <Text fw={700} size="xl">
          List of Fees
        </Text>
        <Button onClick={() => { setEditFee(null), setModalOpen(true)}}>Add Fee</Button>
        {/* Clears the modal when clicking on add new course */}
      </Group>

      <TextInput
         placeholder="Search"
         leftSection={<IconSearch size={16} />}
         value={search}
         onChange={(e) => setSearch(e.currentTarget.value)}
         mb="md"
       />

       <ScrollArea>
                <Table striped withTableBorder highlightOnHover>
                  <Table.Thead>
                    <Table.Tr>
                    <Th sorted = {sortBy === 'programId' } reversed = {reversed} onSort = {() => setSorting('programId')}>
                     Program
                   </Th>
                   <Th sorted={sortBy === 'feeType'} reversed={reversed} onSort={() => setSorting('feeType')}>
                     Fee Type
                   </Th>
                   <Th sorted={sortBy === 'amount'} reversed={reversed} onSort={() => setSorting('amount')}>
                     Amount
                   </Th>
                   <Th sorted={sortBy === 'description'} reversed={reversed} onSort={() => setSorting('description')}>
                     Description
                   </Th>
                      <Table.Th>Actions</Table.Th>
                    </Table.Tr>
                  </Table.Thead>
                  <Table.Tbody>
                    {rows.length ? (
                      rows
                    ) : (
                      <Table.Tr>
                        <Table.Td colSpan={7}>
                          <Text ta="center">No fees found.</Text>
                        </Table.Td>
                      </Table.Tr>
                    )}
                  </Table.Tbody>
                </Table>
              </ScrollArea>

              <FormModal
        opened={modalOpen} // Whether the modal is open
        onClose={() => setModalOpen(false)} // Function to close it
        onSubmit={handleAddFees} // Function to handle form submit
        fields={feeFields} // Field configuration from external file
        title={editFee ? "Edit Fee" : "Add New Fee"} // Modal title
        initialValues={
          editFee
      ? {
          ...editFee
        }
      : {
          programId: '',
          feeType: '',
          amount: '',
          description: '',
        }}
      />

      <Modal
              opened={deleteModal}
              onClose={() => setDeleteModal(false)}
              title="Confirm Deletion"
              centered
            >
              <Text>
                Are you sure you want to delete{" "}
                <b>
                  {selectedFee?.feeType}
                </b>
                ?
              </Text>
              <Group justify="flex-end" mt="md">
                <Button variant="default" onClick={() => setDeleteModal(false)}>
                  Cancel
                </Button>
                <Button color="red" onClick={handleDelete}>
                  Delete
                </Button>
              </Group>
            </Modal>
    </Box>
  );
}
