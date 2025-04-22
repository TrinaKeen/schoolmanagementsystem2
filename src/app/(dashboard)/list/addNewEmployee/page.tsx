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
import newEmployeeFields from "@/utils/fields/newEmployeeFields";
import { useNotification } from "@/context/notificationContent";

interface Employee {
  id: number;
  employeeNumber: string;
  firstName: string;
  middleName?: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  dob: string;
  dateHired: string;
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
    <Table.Th style={{ cursor: "pointer", padding: "12px 8px" }}>
      <UnstyledButton onClick={onSort} style={{ width: "100%" }}>
        <Group justify="space-between" gap={4}>
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

export default function EmployeePage() {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState<keyof Employee | null>(null);
  const [reverseSortDirection, setReverseSortDirection] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [editEmployee, setEditEmployee] = useState<Employee | null>(null);
  const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(
    null
  );
  const { addNotification } = useNotification();

  const fetchEmployees = async () => {
    try {
      const res = await axios.get("/api/employees");
      setEmployees(res.data);
    } catch (err) {
      notifications.show({
        title: "Error",
        message: "Failed to fetch employees.",
        color: "red",
      });
    }
  };

  useEffect(() => {
    fetchEmployees();
  }, []);

  const formatDate = (isoDate: string) => isoDate.slice(0, 10);

  const handleSaveEmployee = async (values: Record<string, any>) => {
    try {
      if (editEmployee) {
        await axios.put(`/api/employees?id=${editEmployee.id}`, values);
        addNotification(
          `Employee ${values.firstName} ${values.lastName} has been updated!`
        );
      } else {
        await axios.post("/api/employees", values);
        addNotification(
          `Employee ${values.firstName} ${values.lastName} has been added!`
        );
      }
      setModalOpen(false);
      setEditEmployee(null);
      fetchEmployees();
    } catch (err) {
      notifications.show({
        title: "Error",
        message: "Failed to save employee.",
        color: "red",
      });
    }
  };

  const handleDelete = async () => {
    if (!selectedEmployee) return;

    try {
      await axios.delete(`/api/employees?id=${selectedEmployee.id}`);
      addNotification(
        `Employee ${selectedEmployee.firstName} ${selectedEmployee.lastName} has been deleted!`
      );
      setDeleteModal(false);
      fetchEmployees();
    } catch {
      notifications.show({
        title: "Error",
        message: "Failed to delete employee.",
        color: "red",
      });
    }
  };

  const filtered = employees.filter((emp) => {
    const query = search.toLowerCase();
    return (
      emp.firstName.toLowerCase().includes(query) ||
      emp.lastName.toLowerCase().includes(query) ||
      emp.email.toLowerCase().includes(query)
    );
  });

  const sorted = sortBy
    ? [...filtered].sort((a, b) => {
        const dir = reverseSortDirection ? -1 : 1;
        return (
          String(a[sortBy] ?? "").localeCompare(String(b[sortBy] ?? "")) * dir
        );
      })
    : filtered;

  const setSorting = (field: keyof Employee) => {
    const reversed = field === sortBy ? !reverseSortDirection : false;
    setReverseSortDirection(reversed);
    setSortBy(field);
  };

  const rows = sorted.map((emp) => (
    <Table.Tr key={emp.id}>
      <Table.Td>{emp.employeeNumber}</Table.Td>
      <Table.Td>
        {emp.firstName} {emp.middleName} {emp.lastName}
      </Table.Td>
      <Table.Td>{emp.email}</Table.Td>
      <Table.Td>{emp.phoneNumber}</Table.Td>
      <Table.Td>{new Date(emp.dob).toLocaleDateString()}</Table.Td>
      <Table.Td>{new Date(emp.dateHired).toLocaleDateString()}</Table.Td>
      <Table.Td>
        <Group gap="xs">
          <Button
            size="xs"
            variant="light"
            leftSection={<IconPencil size={14} />}
            onClick={() => {
              setEditEmployee(emp);
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
              setSelectedEmployee(emp);
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
          Employees
        </Text>
        <Button onClick={() => setModalOpen(true)}>Add Employee</Button>
      </Group>

      <TextInput
        placeholder="Search by name or email"
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
                reversed={reverseSortDirection}
                onSort={() => setSorting("employeeNumber")}
              >
                Employee ID
              </Th>
              <Th
                sorted={sortBy === "lastName"}
                reversed={reverseSortDirection}
                onSort={() => setSorting("lastName")}
              >
                Full Name
              </Th>
              <Th
                sorted={sortBy === "email"}
                reversed={reverseSortDirection}
                onSort={() => setSorting("email")}
              >
                Email
              </Th>
              <Th
                sorted={sortBy === "phoneNumber"}
                reversed={reverseSortDirection}
                onSort={() => setSorting("phoneNumber")}
              >
                Phone
              </Th>
              <Th
                sorted={sortBy === "dob"}
                reversed={reverseSortDirection}
                onSort={() => setSorting("dob")}
              >
                DOB
              </Th>
              <Th
                sorted={sortBy === "dateHired"}
                reversed={reverseSortDirection}
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
                  <Text ta="center">No employees found.</Text>
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
          setEditEmployee(null);
        }}
        onSubmit={handleSaveEmployee}
        fields={
          editEmployee
            ? newEmployeeFields
            : newEmployeeFields.filter(
                (field) => field.name !== "employeeNumber"
              )
        }
        title={editEmployee ? "Edit Employee" : "Add New Employee"}
        initialValues={
          editEmployee
            ? {
                ...editEmployee,
                dob: formatDate(editEmployee.dob),
                dateHired: formatDate(editEmployee.dateHired),
              }
            : {
                firstName: "",
                middleName: "",
                lastName: "",
                email: "",
                phoneNumber: "",
                dob: "",
                dateHired: "",
              }
        }
        type={editEmployee ? "update" : "create"}
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
            {selectedEmployee?.firstName} {selectedEmployee?.lastName}
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
