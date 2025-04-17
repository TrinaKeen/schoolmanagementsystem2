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
} from "@mantine/core";
import {
  IconChevronDown,
  IconChevronUp,
  IconPencil,
  IconSearch,
  IconSelector,
  IconTrash,
} from "@tabler/icons-react";
import axios from "axios";
import FormModal from "@/components/FormModal";
import { useNotification } from "@/context/notificationContent";
import { notifications } from "@mantine/notifications";
import programFields from "@/utils/fields/programFields";

// Interface for Courses Type
interface Program {
  id: number;
  programCode: string;
  programName: string;
  programDescription?: string;
  duration: number;
  tuitionFee?: number;
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

export default function ProgramsPage() {
  const [programs, setPrograms] = useState<Program[]>([]); // Holds the array of courses returned from the backend
  const [modalOpen, setModalOpen] = useState(false); // Controls whether the modal is open or closed
  const [sortBy, setSortBy] = useState<keyof Program | null>(null);
  const [reversed, setReversed] = useState(false);
  const [search, setSearch] = useState("");
  const [editProgram, setEditProgram] = useState<Program | null>(null);
  const [deleteModal, setDeleteModal] = useState(false);
  const [selectedProgram, setSelectedProgram] = useState<Program | null>(null);
  const { addNotification } = useNotification();

  // API fetch form the programs table
  const fetchPrograms = async () => {
    try {
      const res = await axios.get("/api/programs");
      setPrograms(res.data);
    } catch (err) {
      notifications.show({
        title: "Error",
        message: "Failed to fetch instructors.",
        color: "red",
      });
    }
  };

  // Fecth programs on first render only
  useEffect(() => {
    fetchPrograms();
  }, []);

  // Add new instructor function
  const handleAddPrograms = async (values: Record<string, any>) => {
    try {
      if (editProgram) {
        await axios.put(`/api/programs?id=${editProgram.id}`, values);
        addNotification(`Program ${values.programName} updated`);
      } else {
        await axios.post("/api/programs", values);
        addNotification(`Program ${values.programName} added`);
      }
      setModalOpen(false);
      setEditProgram(null);
      fetchPrograms(); // Reloads the table to show the new course
    } catch {
      notifications.show({
        title: "Error",
        message: "Failed to save program.",
        color: "red",
      });
    }
  };

  const handleDelete = async () => {
    if (!selectedProgram) return;
    try {
      await axios.delete(`/api/programs?id=${selectedProgram.id}`);
      addNotification(`Program ${selectedProgram.programName} deleted`);
      setDeleteModal(false);
      fetchPrograms();
    } catch {
      notifications.show({
        title: "Error",
        message: "Failed to delete program.",
        color: "red",
      });
    }
  };

  // Search logic
  const filtered = programs.filter((p) =>
    Object.values(p).join(" ").toLowerCase().includes(search.toLowerCase())
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

  const setSorting = (field: keyof Program) => {
    const shouldReverse = field === sortBy ? !reversed : false;
    setReversed(shouldReverse);
    setSortBy(field);
  };

  const rows = sorted.map((p) => (
    <Table.Tr key={p.id}>
      <Table.Td>{p.programCode}</Table.Td>
      <Table.Td>{p.programName}</Table.Td>
      <Table.Td>{p.programDescription}</Table.Td>
      <Table.Td>{p.duration}</Table.Td>
      <Table.Td>{p.tuitionFee}</Table.Td>
      <Table.Td>
        <Group gap="xs">
          <Button
            size="xs"
            variant="light"
            leftSection={<IconPencil size={14} />}
            onClick={() => {
              setEditProgram(p);
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
              setSelectedProgram(p);
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
          List of Programs
        </Text>
        <Button
          onClick={() => {
            setEditProgram(null), setModalOpen(true);
          }}
        >
          Add Program
        </Button>
        {/* Clears the modal when clicking on add new course */}
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
                sorted={sortBy === "programCode"}
                reversed={reversed}
                onSort={() => setSorting("programCode")}
              >
                Program Code
              </Th>
              <Th
                sorted={sortBy === "programName"}
                reversed={reversed}
                onSort={() => setSorting("programName")}
              >
                Name
              </Th>
              <Th
                sorted={sortBy === "programDescription"}
                reversed={reversed}
                onSort={() => setSorting("programDescription")}
              >
                Description
              </Th>
              <Th
                sorted={sortBy === "duration"}
                reversed={reversed}
                onSort={() => setSorting("duration")}
              >
                Duration
              </Th>
              <Th
                sorted={sortBy === "tuitionFee"}
                reversed={reversed}
                onSort={() => setSorting("tuitionFee")}
              >
                Tuition Fee
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
                  <Text ta="center">No programs found.</Text>
                </Table.Td>
              </Table.Tr>
            )}
          </Table.Tbody>
        </Table>
      </ScrollArea>

      <FormModal
        opened={modalOpen} // Whether the modal is open
        onClose={() => setModalOpen(false)} // Function to close it
        onSubmit={handleAddPrograms} // Function to handle form submit
        fields={programFields} // Field configuration from external file
        title={editProgram ? "Edit Program" : "Add New Program"} // Modal title
        initialValues={
          editProgram
            ? {
                ...editProgram,
              }
            : {
                programCode: "",
                programName: "",
                programDescription: "",
                duration: "",
                tuitionFee: "",
              }
        }
      />

      <Modal
        opened={deleteModal}
        onClose={() => setDeleteModal(false)}
        title="Confirm Deletion"
        centered
      >
        <Text>
          Are you sure you want to delete <b>{selectedProgram?.programName}</b>?
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
