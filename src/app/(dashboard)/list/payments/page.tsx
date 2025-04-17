"use client";

import { useEffect, useState } from "react";
import {
  Box,
  Button,
  Center,
  Group,
  Modal,
  ScrollArea,
  Table,
  Text,
  TextInput,
  UnstyledButton,
  Loader,
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
import { notifications } from "@mantine/notifications";
import FormModal from "@/components/FormModal";
import { useNotification } from "@/context/notificationContent";

interface Payment {
  id: number;
  studentID: number;
  feeID: number;
  amountPaid: string;
  paymentDate: string;
  paymentStatus: string;
}

interface Student {
  id: number;
  studentNumber: string;
  firstName: string;
  lastName: string;
  email: string;
}

interface Fee {
  id: number;
  programID: number;
  feeType: string;
  amount: number;
}

interface ThProps {
  children: React.ReactNode;
  reversed: boolean;
  sorted: boolean;
  onSort: () => void;
}

function Th({ children, reversed, sorted, onSort }: ThProps) {
  const Icon = sorted ? (reversed ? IconChevronUp : IconChevronDown) : IconSelector;

  return (
    <Table.Th style={{ cursor: "pointer", padding: "12px 8px" }}>
      <UnstyledButton onClick={onSort} style={{ width: "100%" }}>
        <Group justify="space-between" gap={4}>
          <Text fw={600} fz="sm">{children}</Text>
          <Center>
            <Icon size={16} stroke={1.5} />
          </Center>
        </Group>
      </UnstyledButton>
    </Table.Th>
  );
}

export default function PaymentsPage() {
  const [payments, setPayments] = useState<Payment[]>([]);
  const [students, setStudents] = useState<Student[]>([]);
  const [fees, setFees] = useState<Fee[]>([]);
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState<string | null>(null);
  const [reverseSortDirection, setReverseSortDirection] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [editPayment, setEditPayment] = useState<Payment | null>(null);
  const [selectedPayment, setSelectedPayment] = useState<Payment | null>(null);
  const { addNotification } = useNotification();
  const [loading, setLoading] = useState(false); // Loading state

  const fetchAllData = async () => {
    setLoading(true);
    try {
      const [paymentsRes, studentsRes, feesRes] = await Promise.all([
        axios.get("/api/payments"),
        axios.get("/api/students"),
        axios.get("/api/fees"),
      ]);
      setPayments(paymentsRes.data);
      setStudents(studentsRes.data);
      setFees(feesRes.data);
    } catch {
      notifications.show({
        title: "Error",
        message: "Failed to fetch payments/students/fees.",
        color: "red",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAllData();
  }, []);

  const getStudentDetails = (studentID: number) => {
    const student = students.find((s) => s.id === studentID);
    return student ? `${student.firstName} ${student.lastName} (${student.studentNumber})` : "N/A";
  };

  const getFeeAmount = (feeID: number) => {
    const amount = fees.find((f) => f.id === feeID)?.amount;
    return amount !== undefined ? `$${amount.toFixed(2)}` : "N/A";
  };

  const formatDate = (isoDate: string) => isoDate.slice(0, 10);

  const handleSavePayment = async (values: Record<string, any>) => {
    try {
      setLoading(true);
      if (editPayment) {
        await axios.put(`/api/payments?id=${editPayment.id}`, values);
        addNotification(`Payment updated`);
      } else {
        await axios.post("/api/payments", values);
        addNotification(`Payment added`);
      }
      setModalOpen(false);
      setEditPayment(null);
      fetchAllData();
    } catch (error: any) {
      const errorMessage = error.response?.data?.message || "Failed to save payment.";
      notifications.show({
        title: "Error",
        message: errorMessage,
        color: "red",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!selectedPayment) return;
    try {
      setLoading(true);
      await axios.delete(`/api/payments?id=${selectedPayment.id}`);
      addNotification(`Payment deleted`);
      setDeleteModal(false);
      fetchAllData();
    } catch {
      notifications.show({
        title: "Error",
        message: "Failed to delete payment.",
        color: "red",
      });
    } finally {
      setLoading(false);
    }
  };

  const filtered = payments.filter((pay) => {
    const studentDetails = getStudentDetails(pay.studentID).toLowerCase();
    return (
      studentDetails.includes(search.toLowerCase()) ||
      pay.paymentStatus.toLowerCase().includes(search.toLowerCase())
    );
  });

  const sorted = sortBy
    ? [...filtered].sort((a, b) => {
        const dir = reverseSortDirection ? -1 : 1;
        const aValue = sortBy === "studentDetails"
          ? getStudentDetails(a.studentID)
          : sortBy === "amount"
          ? getFeeAmount(a.feeID)
          : (a as any)[sortBy];
        const bValue = sortBy === "studentDetails"
          ? getStudentDetails(b.studentID)
          : sortBy === "amount"
          ? getFeeAmount(b.feeID)
          : (b as any)[sortBy];
        return String(aValue).localeCompare(String(bValue)) * dir;
      })
    : filtered;

  const setSorting = (field: string) => {
    const reversed = field === sortBy ? !reverseSortDirection : false;
    setReverseSortDirection(reversed);
    setSortBy(field);
  };

  const rows = sorted.map((pay) => (
    <Table.Tr key={pay.id}>
      <Table.Td>{getStudentDetails(pay.studentID)}</Table.Td>
      <Table.Td>{getFeeAmount(pay.feeID)}</Table.Td>
      <Table.Td>{new Date(pay.paymentDate).toLocaleDateString()}</Table.Td>
      <Table.Td>{pay.paymentStatus}</Table.Td>
      <Table.Td>
        <Group gap="xs">
          <Button
            size="xs"
            variant="light"
            leftSection={<IconPencil size={14} />}
            onClick={() => {
              setEditPayment(pay);
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
              setSelectedPayment(pay);
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
        <Text fw={700} size="xl">Payments</Text>
        <Button onClick={() => setModalOpen(true)} loading={loading}>Add Payment</Button>
      </Group>

      <TextInput
        placeholder="Search by student details or status"
        leftSection={<IconSearch size={16} />}
        value={search}
        onChange={(e) => setSearch(e.currentTarget.value)}
        mb="md"
        w="500px"
        aria-label="Search payments"
      />

      <ScrollArea>
        <Table striped withTableBorder highlightOnHover>
          <Table.Thead>
            <Table.Tr>
              <Th sorted={sortBy === "studentDetails"} reversed={reverseSortDirection} onSort={() => setSorting("studentDetails")}>
                Student
              </Th>
              <Th sorted={sortBy === "amount"} reversed={reverseSortDirection} onSort={() => setSorting("amount")}>
                Amount
              </Th>
              <Th sorted={sortBy === "paymentDate"} reversed={reverseSortDirection} onSort={() => setSorting("paymentDate")}>
                Date
              </Th>
              <Th sorted={sortBy === "paymentStatus"} reversed={reverseSortDirection} onSort={() => setSorting("paymentStatus")}>
                Status
              </Th>
              <Table.Th>Actions</Table.Th>
            </Table.Tr>
          </Table.Thead>
          <Table.Tbody>
            {rows.length ? rows : (
              <Table.Tr>
                <Table.Td colSpan={6}>
                  <Text ta="center">No payments found.</Text>
                </Table.Td>
              </Table.Tr>
            )}
          </Table.Tbody>
        </Table>
      </ScrollArea>

      <FormModal
        opened={modalOpen}
        onClose={() => {
          setModalOpen(false);
          setEditPayment(null);
        }}
        onSubmit={handleSavePayment}
        fields={[
          {
            name: "studentID",
            label: "Student ID",
            type: "number",
            required: true,
          },
          {
            name: "feeID",
            label: "Fee ID",
            type: "number",
            required: true,
          },
          {
            name: "paymentDate",
            label: "Payment Date",
            type: "date",
            required: true,
          },
          {
            name: "paymentStatus",
            label: "Payment Status",
            type: "text",
            required: true,
          },
        ]}
        title={editPayment ? "Edit Payment" : "Add New Payment"}
        initialValues={
          editPayment
            ? { ...editPayment, paymentDate: formatDate(editPayment.paymentDate) }
            : {
                studentID: "",
                feeID: "",
                paymentDate: "",
                paymentStatus: "",
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
          Are you sure you want to delete the payment from{" "}
          <b>{selectedPayment && getStudentDetails(selectedPayment.studentID)}</b>?
        </Text>
        <Group justify="flex-end" mt="md">
          <Button variant="default" onClick={() => setDeleteModal(false)}>Cancel</Button>
          <Button color="red" onClick={handleDelete} loading={loading}>Delete</Button>
        </Group>
      </Modal>
    </Box>
  );
}
