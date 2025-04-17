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
  IconEye ,
} from "@tabler/icons-react";
import axios from "axios";
import { notifications } from "@mantine/notifications";
import FormModal from "@/components/FormModal";
import { useNotification } from "@/context/notificationContent";

interface Student {
    id: number;
    studentNumber: string;
    firstName: string;
    middleName?: string;
    lastName: string;
    email: string;
    dob: string;
    programs: string; // this is the chosen program
    application_status: string;
    studentApplication?: { status: string }[];
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

export default function StudentPage() {
  const [students, setStudents] = useState<Student[]>([]);
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState<keyof Student | null>(null);
  const [reverseSortDirection, setReverseSortDirection] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [editStudent, setEditStudent] = useState<Student | null>(null);
  const [deleteModal, setDeleteModal] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);
  const { addNotification } = useNotification();

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
    fetchStudents();
  }, []);

  const formatDate = (iso: string) => iso.slice(0, 10);

  const handleSaveStudent = async (values: Record<string, any>) => {
    try {
      if (editStudent) {
        await axios.put(`/api/students?id=${editStudent.id}`, values);
        addNotification(`Student ${values.first_name} updated`);
      } else {
        await axios.post("/api/students", values);
        addNotification(`Student ${values.first_name} added`);
      }
      setModalOpen(false);
      setEditStudent(null);
      fetchStudents();
    } catch {
      notifications.show({
        title: "Error",
        message: "Failed to save student.",
        color: "red",
      });
    }
  };

  const handleDelete = async () => {
    if (!selectedStudent) return;
    try {
      await axios.delete(`/api/students?id=${selectedStudent.id}`);
      addNotification(`Student ${selectedStudent.firstName} deleted`);
      setDeleteModal(false);
      fetchStudents();
    } catch {
      notifications.show({
        title: "Error",
        message: "Failed to delete student.",
        color: "red",
      });
    }
  };

  const filtered = students.filter((s) => {
    const q = search.toLowerCase();
    const latestAppStatus = s.studentApplication?.[0]?.status;
  
    return (
      latestAppStatus === "approved" &&
      (
        (s.firstName?.toLowerCase().includes(q) ?? false) ||
        (s.lastName?.toLowerCase().includes(q) ?? false) ||
        (s.email?.toLowerCase().includes(q) ?? false) ||
        (s.programs?.toLowerCase().includes(q) ?? false)
      )
    );
  });
  
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
  
  
  
=======
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes

>>>>>>> Stashed changes
  const sorted = sortBy
    ? [...filtered].sort((a, b) => {
        const dir = reverseSortDirection ? -1 : 1;
        return (
          String(a[sortBy] ?? "").localeCompare(String(b[sortBy] ?? "")) * dir
        );
      })
    : filtered;
  
  

  const setSorting = (field: keyof Student) => {
    const reversed = field === sortBy ? !reverseSortDirection : false;
    setReverseSortDirection(reversed);
    setSortBy(field);
  };

  const rows = sorted.map((s) => (
    <Table.Tr key={s.id}>
      <Table.Td>{s.studentNumber}</Table.Td>
      <Table.Td>
        {s.firstName} {s.middleName} {s.lastName}
      </Table.Td>
      <Table.Td>{s.email}</Table.Td>
    <Table.Td>{s.programs}</Table.Td>

      <Table.Td>{new Date(s.dob).toLocaleDateString()}</Table.Td>
      <Table.Td>Active</Table.Td>
      <Table.Td>
        <Group gap="xs">
          <Button
            size="xs"
            variant="light"
            leftSection={<IconPencil size={14} />}
            onClick={() => {
              setEditStudent(s);
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
              setSelectedStudent(s);
              setDeleteModal(true);
            }}
          >
            Delete
          </Button>
          <Button
            size="xs"
            variant="light"
            color="green"
            leftSection={<IconEye size={14} />}
            onClick={() => {
              setEditStudent(s);
              setModalOpen(true);
            }}
          >
            View Account
          </Button>
        </Group>
      </Table.Td>
    </Table.Tr>
  ));

  return (
    <Box p="md">
      <Group justify="space-between" mb="md">
        <Text fw={700} size="xl">
          List of Students
        </Text>
        <Button onClick={() => setModalOpen(true)}>Add Student</Button>
      </Group>

      <TextInput
        placeholder="Search by name or email"
        leftSection={<IconSearch size={16} />}
        value={search}
        onChange={(e) => setSearch(e.currentTarget.value)}
        mb="md"
      />

      <ScrollArea>
        <Table striped withTableBorder highlightOnHover>
          <Table.Thead>
            <Table.Tr>
              <Th
                sorted={sortBy === "studentNumber"}
                reversed={reverseSortDirection}
                onSort={() => setSorting("studentNumber")}
              >
                Student #
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
                sorted={sortBy === "programs"}
                reversed={reverseSortDirection}
                onSort={() => setSorting("programs")}
              >
                Course
              </Th>
              <Th
                sorted={sortBy === "dob"}
                reversed={reverseSortDirection}
                onSort={() => setSorting("dob")}
              >
                DOB
              </Th>
              <Th
                sorted={sortBy === "application_status"}
                reversed={reverseSortDirection}
                onSort={() => setSorting("application_status")}
              >
                Status
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
                  <Text ta="center">No students found.</Text>
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
    setEditStudent(null);
  }}
  onSubmit={handleSaveStudent}
  title={editStudent ? "Edit Student" : "Add New Student"}
  fields={[
    { name: "studentNumber", label: "Student Number", type: "text", required: true },
    { name: "firstName", label: "First Name", type: "text", required: true },
    { name: "middleName", label: "Middle Name", type: "text" },
    { name: "lastName", label: "Last Name", type: "text", required: true },
    { name: "email", label: "Email", type: "email", required: true },
    { name: "dob", label: "Date of Birth", type: "date", required: true },
    { name: "gender", label: "Gender", type: "text" },
    { name: "age", label: "Age", type: "number" },
    { name: "nationality", label: "Nationality", type: "text" },
    { name: "placeOfBirth", label: "Place of Birth", type: "text" },
    { name: "phoneNumber", label: "Phone Number", type: "text" },
    { name: "homeAddress", label: "Home Address", type: "text" },
    { name: "emergencyContactName", label: "Emergency Contact Name", type: "text" },
    { name: "emergencyContactPhoneNumber", label: "Emergency Contact Phone", type: "text" },
    { name: "emergencyContactRelationship", label: "Emergency Contact Relationship", type: "text" },
    { name: "previousSchools", label: "Previous Schools", type: "text" },
    { name: "yearOfGraduation", label: "Year of Graduation", type: "text" },
    { name: "gpa", label: "GPA", type: "number" },
  ]}
  initialValues={
    editStudent
      ? {
          ...editStudent,
          dob: new Date(editStudent.dob).toISOString().slice(0, 10), // Convert the date
        }
      : {
          studentNumber: "",
          firstName: "",
          middleName: "",
          lastName: "",
          email: "",
          dob: "",
          gender: "",
          age: 0,
          nationality: "",
          placeOfBirth: "",
          phoneNumber: "",
          homeAddress: "",
          emergencyContactName: "",
          emergencyContactPhoneNumber: "",
          emergencyContactRelationship: "",
          previousSchools: "",
          yearOfGraduation: "",
          gpa: 0,
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
          Are you sure you want to delete{" "}
          <b>
            {selectedStudent?.firstName} {selectedStudent?.lastName}
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
