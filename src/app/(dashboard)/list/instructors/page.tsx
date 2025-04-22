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

"use client";

import { useEffect, useState } from "react";
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
  Stack,
} from "@mantine/core";

import {
  IconChevronDown,
  IconChevronUp,
  IconPencil,
  IconSearch,
  IconSelector,
  IconTrash,
  IconAlertTriangle,
} from "@tabler/icons-react";
import axios from "axios";
import FormModal from "@/components/FormModal";
import instructorFields from "@/utils/fields/instructorFields";
import { useNotification } from "@/context/notificationContent";
import { notifications } from "@mantine/notifications";

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
  const Icon = sorted
    ? reversed
      ? IconChevronUp
      : IconChevronDown
    : IconSelector;

  return (
    <Table.Th>
      <UnstyledButton onClick={onSort} style={{ width: "100%" }}>
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
  const [instructors, setInstructors] = useState<Instructor[]>([]); // Holds the array of instructors returned from the backend
  const [modalOpen, setModalOpen] = useState(false); // Controls whether the Add Instructor modal is open or closed
  const [sortBy, setSortBy] = useState<keyof Instructor | null>(null);
  const [reversed, setReversed] = useState(false);
  const [search, setSearch] = useState("");
  const [editInstructor, setEditInstructor] = useState<Instructor | null>(null);
  const [deleteModal, setDeleteModal] = useState(false);
  const [selectedInstructor, setSelectedInstructor] =
    useState<Instructor | null>(null);
  const { addNotification } = useNotification();
  const [warningModal, setWarningModal] = useState(false);
  const [warningMessage, setWarningMessage] = useState("");


  // API fetch form the instructors table
  const fetchInstructors = async () => {
    try {
      const res = await axios.get("/api/instructors");
      setInstructors(res.data);
    } catch (err) {
      notifications.show({
        title: "Error",
        message: "Failed to fetch instructors.",
        color: "red",
      });
    }
  };

  // Fetch instructors on first render only
  useEffect(() => {
    fetchInstructors();
  }, []);

  // Add new instructor function
  // Update instructor
  const handleAddInstructor = async (values: Record<string, any>) => {
    try {
      if (editInstructor) {
        await axios.put(`/api/instructors?id=${editInstructor.id}`, values);
        addNotification(
          `Instructor ${values.firstName} ${values.lastName} updated`
        );
      } else {
        await axios.post("/api/instructors", values);
        addNotification(
          `Instructor ${values.firstName} ${values.lastName} added`
        );
      }
      setModalOpen(false);
      setEditInstructor(null);
      fetchInstructors();
    } catch {
      notifications.show({
        title: "Error",
        message: "Failed to save instructor.",
        color: "red",
      });
    }
  };

  const handleDelete = async () => {
    if (!selectedInstructor) return;
  
    try {
      await axios.delete(`/api/instructors?id=${selectedInstructor.id}`);
      
      notifications.show({
        title: "Success",
        message: `Instructor ${selectedInstructor.firstName} deleted successfully.`,
        color: "green",
      });
  
      setDeleteModal(false);
      fetchInstructors();
  
    } catch (error: any) {
      console.error("Delete error:", error.response?.data?.error); // Debug log
  
      // ✅ Foreign key constraint warning popup
      if (
        error.response?.data?.error?.includes("Foreign key constraint") || 
        error.response?.data?.error?.includes("P2003") // Prisma-specific error
      ) {
        setDeleteModal(false); // Close original modal
        setWarningMessage(
          `Cannot delete ${selectedInstructor.firstName} ${selectedInstructor.lastName} because they are assigned to a course and/or schedule.`
        );
        setWarningModal(true); // Show warning modal
      } else {
        // Default error fallback
        notifications.show({
          title: "Delete Failed",
          message: error.response?.data?.error || "Failed to delete instructor.",
          color: "red",
        });
      }
    }
  };
  
  
  
  

  // Search logic
  const filtered = instructors.filter((ins) =>
    Object.values(ins).join(" ").toLowerCase().includes(search.toLowerCase())
  );

  // Sort logic
  const sorted = sortBy
    ? [...filtered].sort((a, b) => {
        const aValue = a[sortBy] ?? "";
        const bValue = b[sortBy] ?? "";
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

  const rows = sorted.map((ins) => (
    <Table.Tr key={ins.id}>
      <Table.Td>{ins.employeeNumber}</Table.Td>
      <Table.Td>
        {ins.firstName} {ins.middleName} {ins.lastName}
      </Table.Td>
      <Table.Td>{ins.department}</Table.Td>
      <Table.Td>{ins.email}</Table.Td>
      <Table.Td>{ins.phoneNumber}</Table.Td>
      <Table.Td>{new Date(ins.dateHired).toLocaleDateString()}</Table.Td>
      <Table.Td>
        <Group gap="xs">
          <Button
            size="xs"
            variant="light"
            leftSection={<IconPencil size={14} />}
            onClick={() => {
              setEditInstructor(ins);
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
              setSelectedInstructor(ins);
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
      <Group justify="space-between" mb="md">
        <Text fw={700} size="xl">
          List of Instructors
        </Text>
        <Button
          onClick={() => {
            setEditInstructor(null), setModalOpen(true);
          }}
        >
          Add Instructor
        </Button>
        {/* Clears the modal when clicking on add new instructor */}
      </Group>

      <TextInput
        placeholder="Search"
        leftSection={<IconSearch size={16} />}
        value={search}
        onChange={(e) => setSearch(e.currentTarget.value)}
        mb="md"
        w="500px"
      />

      <ScrollArea>
        <Table striped withTableBorder highlightOnHover>
          <Table.Thead>
            <Table.Tr>
              <Th
                sorted={sortBy === "employeeNumber"}
                reversed={reversed}
                onSort={() => setSorting("employeeNumber")}
              >
                Employee #
              </Th>
              <Th
                sorted={sortBy === "firstName"}
                reversed={reversed}
                onSort={() => setSorting("firstName")}
              >
                Name
              </Th>
              <Th
                sorted={sortBy === "department"}
                reversed={reversed}
                onSort={() => setSorting("department")}
              >
                Department
              </Th>
              <Th
                sorted={sortBy === "email"}
                reversed={reversed}
                onSort={() => setSorting("email")}
              >
                Email
              </Th>
              <Th
                sorted={sortBy === "phoneNumber"}
                reversed={reversed}
                onSort={() => setSorting("phoneNumber")}
              >
                Phone
              </Th>
              <Th
                sorted={sortBy === "dateHired"}
                reversed={reversed}
                onSort={() => setSorting("dateHired")}
              >
                Date Hired
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
                  <Text ta="center">No instructors found.</Text>
                </Table.Td>
              </Table.Tr>
            )}
          </Table.Tbody>
        </Table>
      </ScrollArea>

      <FormModal
        opened={modalOpen} // Whether the modal is open
        onClose={() => {
          setModalOpen(false);
          setEditInstructor(null);
        }}
        onSubmit={handleAddInstructor} // Function to handle form submit
        fields={
          editInstructor
            ? instructorFields
            : instructorFields.filter(
                (field) => field.name !== "employeeNumber"
              )
        }
        title={editInstructor ? "Edit Instructor" : "Add New Instructor"} // Modal title
        initialValues={
          editInstructor
            ? {
                ...editInstructor,
                dateHired: new Date(editInstructor.dateHired)
                  .toISOString()
                  .slice(0, 10),
                dob: editInstructor.dob
                  ? new Date(editInstructor.dob).toISOString().slice(0, 10)
                  : "",
              }
            : {
                firstName: "",
                middleName: "",
                lastName: "",
                department: "",
                email: "",
                phoneNumber: "",
                dateHired: "",
                dob: "",
              }
        }
        type={editInstructor ? "update" : "create"}
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
            {selectedInstructor?.firstName} {selectedInstructor?.lastName}
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
      <Modal
        opened={warningModal}
        onClose={() => setWarningModal(false)}
        title={
          <Group>
            <IconAlertTriangle color="orange" size={20} />
            <Text fw={600}>Cannot Delete Instructor</Text>
          </Group>
        }
        centered
      >
        <Stack gap="sm">
          <Text size="sm" c="dimmed">
            {warningMessage}
          </Text>
          <Group justify="flex-end" mt="xs">
            <Button onClick={() => setWarningModal(false)} color="blue">
              OK
            </Button>
          </Group>
        </Stack>
      </Modal>
    </Box>
  );
}