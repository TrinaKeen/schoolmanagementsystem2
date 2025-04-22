"use client";

import React, { useEffect, useState } from "react";
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
import paymentFields from "@/utils/fields/paymentFields";

interface Payment {
  id: number;
  studentId: number;
  amountPaid: number;
  paymentDate: string;
  paymentStatus: "paid" | "unpaid" | "pending";
}

interface Student {
  id: number;
  studentNumber: string;
  firstName: string;
  lastName: string;
  email: string;
}

interface ThProps {
  children: React.ReactNode;
  reversed: boolean;
  sorted: boolean;
  onSort: () => void;
}

function Th({ children, reversed, sorted, onSort }: ThProps) {
  const Icon = sorted
    ? reversed
      ? IconChevronUp
      : IconChevronDown
    : IconSelector;
  return (
    <Table.Th style={{ cursor: "pointer" }}>
      <UnstyledButton onClick={onSort} style={{ width: "100%" }}>
        <Group justify="space-between">
          <Text fw={600} fz="sm">
            {children}
          </Text>
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
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState<keyof Payment>("id");
  const [reverseSortDirection, setReverseSortDirection] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedPayment, setSelectedPayment] = useState<Payment | null>(null);
  const [editPayment, setEditPayment] = useState<Payment | null>(null);
  const { addNotification } = useNotification();

  const fetchPayments = async () => {
    try {
      const res = await axios.get("/api/payments");
      setPayments(res.data);
    } catch {
      notifications.show({
        title: "Error",
        message: "Failed to fetch payments.",
        color: "red",
      });
    }
  };

  const fetchStudents = async () => {
    try {
      const res = await axios.get("/api/students");
      setStudents(res.data);
    } catch {
      notifications.show({
        title: "Error",
        message: "Failed to fetch students.",
        color: "red",
      });
    }
  };

  useEffect(() => {
    fetchPayments();
    fetchStudents();
  }, []);

  useEffect(() => {
    console.log("studentOptions", studentOptions);
  }, [students]);

  const handleSavePayment = async (values: Record<string, any>) => {
    console.log("Submitting payment:", values);
    const payment = {
      studentId: parseInt(values.studentId),
      amountPaid: parseFloat(values.amountPaid),
      paymentDate: values.paymentDate,
      paymentStatus: values.paymentStatus,
    };

    try {
      if (editPayment) {
        console.log("Is editing:", !!editPayment, "Edit ID:", editPayment?.id);

        await axios.put(`/api/payments?id=${editPayment.id}`, payment);
        addNotification("Payment updated successfully!");
      } else {
        await axios.post("/api/payments", payment);
        addNotification("Payment added successfully!");
      }
      setModalOpen(false);
      setEditPayment(null);
      fetchPayments();
    } catch {
      notifications.show({
        title: "Error",
        message: "Failed to save payment.",
        color: "red",
      });
    }
  };

  const handleDeletePayment = async () => {
    if (!selectedPayment) return;
    try {
      await axios.delete(`/api/payments?id=${selectedPayment.id}`);
      addNotification("Payment deleted successfully!");
      setDeleteModal(false);
      fetchPayments();
    } catch {
      notifications.show({
        title: "Error",
        message: "Failed to delete payment.",
        color: "red",
      });
    }
  };

  const studentOptions = students.map((s) => ({
    label: `${s.studentNumber} | ${s.firstName} ${s.lastName}`,
    value: s.id.toString(),
  }));

  const filtered = payments.filter((p) => {
    const student =
      studentOptions.find((s) => s.value === p.studentId.toString())?.label ||
      "";
    return student.toLowerCase().includes(search.toLowerCase());
  });

  const sorted = [...filtered].sort((a, b) => {
    const dir = reverseSortDirection ? -1 : 1;
    return String(a[sortBy]).localeCompare(String(b[sortBy])) * dir;
  });

  const setSorting = (field: keyof Payment) => {
    const reversed = field === sortBy ? !reverseSortDirection : false;
    setReverseSortDirection(reversed);
    setSortBy(field);
  };

  const rows = sorted.map((p) => (
    <Table.Tr key={p.id}>
      <Table.Td>
        {studentOptions.find((s) => s.value === p.studentId.toString())
          ?.label || p.studentId}
      </Table.Td>
      <Table.Td>{`PHP ${p.amountPaid}`}</Table.Td>
      <Table.Td>{new Date(p.paymentDate).toLocaleDateString()}</Table.Td>
      <Table.Td>
        {p.paymentStatus.charAt(0) + p.paymentStatus.slice(1).toLowerCase()}
      </Table.Td>
      <Table.Td style={{ textAlign: "right" }}>
        <Group gap="xs">
          <Button
            size="xs"
            variant="light"
            leftSection={<IconPencil size={14} />}
            onClick={() => {
              setEditPayment(p);
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
              setSelectedPayment(p);
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
          Payments List
        </Text>
        <Button onClick={() => setModalOpen(true)}>Add Payment</Button>
      </Group>

      <TextInput
        placeholder="Search by student name"
        leftSection={<IconSearch size={14} />}
        mb="md"
        value={search}
        onChange={(e) => setSearch(e.currentTarget.value)}
        w="500px"
      />

      <ScrollArea>
        <Table striped withTableBorder highlightOnHover>
          <Table.Thead>
            <Table.Tr>
              <Th
                sorted={sortBy === "studentId"}
                reversed={reverseSortDirection}
                onSort={() => setSorting("studentId")}
              >
                Student
              </Th>
              <Th
                sorted={sortBy === "amountPaid"}
                reversed={reverseSortDirection}
                onSort={() => setSorting("amountPaid")}
              >
                Amount
              </Th>
              <Th
                sorted={sortBy === "paymentDate"}
                reversed={reverseSortDirection}
                onSort={() => setSorting("paymentDate")}
              >
                Date
              </Th>
              <Th
                sorted={sortBy === "paymentStatus"}
                reversed={reverseSortDirection}
                onSort={() => setSorting("paymentStatus")}
              >
                Status
              </Th>
              <Table.Th>Actions</Table.Th>
            </Table.Tr>
          </Table.Thead>
          <Table.Tbody>
            {rows.length > 0 ? (
              rows
            ) : (
              <Table.Tr>
                <Table.Td colSpan={5}>
                  <Text ta="center">No payments found</Text>
                </Table.Td>
              </Table.Tr>
            )}
          </Table.Tbody>
        </Table>
      </ScrollArea>

      {studentOptions.length > 0 && (
        <FormModal
          opened={modalOpen}
          onClose={() => {
            setModalOpen(false);
            setEditPayment(null);
          }}
          onSubmit={handleSavePayment}
          fields={paymentFields(studentOptions)}
          title={editPayment ? "Edit Payment" : "Add Payment"}
          initialValues={
            editPayment
              ? {
                  studentId: editPayment.studentId.toString(),
                  amountPaid: editPayment.amountPaid.toString(),
                  paymentDate: editPayment.paymentDate.slice(0, 10),
                  paymentStatus: editPayment.paymentStatus,
                }
              : {
                  studentId: "",
                  amountPaid: "",
                  paymentDate: "",
                  paymentStatus: "",
                }
          }
          type={editPayment ? "update" : "create"}
        />
      )}

      <Modal
        opened={deleteModal}
        onClose={() => setDeleteModal(false)}
        title="Confirm Deletion"
        centered
      >
        <Text>Are you sure you want to delete this payment?</Text>
        <Group justify="flex-end" mt="md">
          <Button variant="default" onClick={() => setDeleteModal(false)}>
            Cancel
          </Button>
          <Button color="red" onClick={handleDeletePayment}>
            Delete
          </Button>
        </Group>
      </Modal>
    </Box>
  );
}
