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
import feeFields from "@/utils/fields/feesFields";

// For prolgram relation
interface Program {
  id: number;
  programCode: string;
  programName: string;
  tuitionFee: number;
}

// Interface for Courses Type
interface Fee {
  id: number | string;
  programId: number;
  feeType: string;
  amount: number;
  description?: string;
  isTuition?: boolean;
  program?: {
    programCode: string;
    programName: string;
  };
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

export default function FeesPage() {
  const [fees, setFees] = useState<Fee[]>([]); // Holds the array of courses returned from the backend
  const [modalOpen, setModalOpen] = useState(false); // Controls whether the modal is open or closed
  const [programs, setPrograms] = useState<Program[]>([]);
  const [sortBy, setSortBy] = useState<keyof Fee | null>(null);
  const [reversed, setReversed] = useState(false);
  const [search, setSearch] = useState("");
  const [editFee, setEditFee] = useState<Fee | null>(null);
  const [deleteModal, setDeleteModal] = useState(false);
  const [selectedFee, setSelectedFee] = useState<Fee | null>(null);
  const { addNotification } = useNotification();

  // API fetch form the fees table
  const fetchFees = async () => {
    try {
      const res = await axios.get("/api/fees");
      setFees(res.data);
    } catch (err) {
      console.error("Failed to fetch fees:", err); // Error logging
    }
  };

  const fetchPrograms = async () => {
    try {
      const res = await axios.get("/api/programs");
      setPrograms(res.data);
    } catch (err) {
      console.error("Failed to fetch programs:", err);
    }
  };

  const programOptions = programs.map((p) => ({
    value: p.id.toString(),
    label: `${p.programCode} - ${p.programName}`,
  }));

  // Fecth instructors on first render only
  useEffect(() => {
    fetchFees();
    fetchPrograms();
  }, []);

  // Merge programs' tuitionFee as fees
  const tuitionFeeRows: Fee[] = programs
    .filter((p) => p.tuitionFee > 0)
    .map((program) => ({
      id: `tuition-${program.id}`,
      programId: program.id,
      feeType: "Tuition",
      amount: program.tuitionFee ?? 0,
      description: "Tuition Fee",
      isTuition: true,
      program: {
        programCode: program.programCode,
        programName: program.programName,
      },
    }));

  const allFees: Fee[] = [...tuitionFeeRows, ...fees];

  const handleAddFees = async (values: Record<string, any>) => {
    try {
      const formattedValues = {
        ...values,
        programId: parseInt(values.programId),
        amount: parseFloat(values.amount),
      };
  
      if (editFee) {
        await axios.put(`/api/fees?id=${editFee.id}`, formattedValues);
        addNotification(`${values.feeType} fee updated`);
      } else {
        await axios.post("/api/fees", formattedValues);
        addNotification(`${values.feeType} fee added`);
      }
  
      setModalOpen(false);
      setEditFee(null);
      fetchFees();
    } catch (err) {
      notifications.show({
        title: "Error",
        message: "Failed to save fee.",
        color: "red",
      });
    }
  };
  

  const handleDelete = async () => {
    if (!selectedFee || selectedFee.isTuition) return; // prevent deleting virtual fee
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
  const filtered = allFees.filter((f) =>
    Object.values(f).join(" ").toLowerCase().includes(search.toLowerCase())
  );

  // Sort logic
  const sorted = sortBy
    ? [...filtered].sort((a, b) => {
        let aValue: any = a[sortBy as keyof Fee];
        let bValue: any = b[sortBy as keyof Fee];

        // Special handling for program
        if (sortBy === "program") {
          aValue = a.program?.programName ?? "";
          bValue = b.program?.programName ?? "";
        }

        // Special handling for amount
        if (sortBy === "amount") {
          return reversed
            ? Number(bValue) - Number(aValue)
            : Number(aValue) - Number(bValue);
        }

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
      <Table.Td>
        {f.program
          ? `${f.program.programCode} - ${f.program.programName}`
          : "-"}
      </Table.Td>
      <Table.Td>{f.feeType}</Table.Td>
      <Table.Td>{`PHP ${Number(f.amount).toLocaleString()}`}</Table.Td>
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
            disabled={f.isTuition}
          >
            Delete
          </Button>
        </Group>
      </Table.Td>
    </Table.Tr>
  ));

  return (
    <Box p="md">
      <Group justify="space-between" style={{ marginBottom: "1rem" }}>
        <Text fw={700} size="xl">
          List of Fees
        </Text>
        <Button
          onClick={() => {
            setEditFee(null), setModalOpen(true);
          }}
        >
          Add Fee
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
                sorted={sortBy === "program"}
                reversed={reversed}
                onSort={() => setSorting("program")}
              >
                Program
              </Th>
              <Th
                sorted={sortBy === "feeType"}
                reversed={reversed}
                onSort={() => setSorting("feeType")}
              >
                Fee Type
              </Th>
              <Th
                sorted={sortBy === "amount"}
                reversed={reversed}
                onSort={() => setSorting("amount")}
              >
                Amount
              </Th>
              <Th
                sorted={sortBy === "description"}
                reversed={reversed}
                onSort={() => setSorting("description")}
              >
                Description
              </Th>
              <Table.Th>Actions</Table.Th>
            </Table.Tr>
          </Table.Thead>
          <Table.Tbody>{rows}</Table.Tbody>
        </Table>
      </ScrollArea>

      <FormModal
        opened={modalOpen} // Whether the modal is open
        onClose={() => setModalOpen(false)} // Function to close it
        onSubmit={handleAddFees} // Function to handle form submit
        fields={feeFields(programOptions)} // Field configuration from external file
        title={editFee ? "Edit Fee" : "Add New Fee"} // Modal title
        initialValues={
          editFee
            ? {
                programId: editFee.programId.toString(),
                feeType: editFee.feeType,
                amount: editFee.amount.toString(),
                description: editFee.description || "",
              }
            : {
                programId: "",
                feeType: "",
                amount: "",
                description: "",
              }
        }
        type={editFee ? "update" : "create"}
      />

      <Modal
        opened={deleteModal}
        onClose={() => setDeleteModal(false)}
        title="Confirm Deletion"
        centered
      >
        <Text>
          Are you sure you want to delete <b>{selectedFee?.feeType}</b>?
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
