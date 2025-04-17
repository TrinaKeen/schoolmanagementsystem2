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
import courseFields from "@/utils/fields/courseFields";
import { useNotification } from "@/context/notificationContent";
import { notifications } from "@mantine/notifications";

// Interface for Courses Type
interface Course {
  id: number;
  courseCode: string;
  courseName: string;
  courseDescription?: string;
  instructorId: number;
  programId?: number;
  instructor: {
    firstName: string;
    middleName?: string;
    lastName: string;
  };
  program?: {
    programName: string;
    programCode: string;
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

export default function CoursesPage() {
  const [courses, setCourses] = useState<Course[]>([]); // Holds the array of courses returned from the backend
  const [modalOpen, setModalOpen] = useState(false); // Controls whether the modal is open or closed
  const [sortBy, setSortBy] = useState<keyof Course | null>(null);
  const [reversed, setReversed] = useState(false);
  const [search, setSearch] = useState("");
  const [editCourse, setEditCourse] = useState<Course | null>(null);
  const [deleteModal, setDeleteModal] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
  const { addNotification } = useNotification();
  const [instructorOptions, setInstructorOptions] = useState<{ label: string; value: string }[]>([]);
  const [programOptions, setProgramOptions] = useState<{ label: string; value: string }[]>([]);

  // API fetch form the instructors table
  const fetchCourses = async () => {
    try {
      const res = await axios.get("/api/courses");
      setCourses(res.data);
    } catch (err) {
      notifications.show({
        title: "Error",
        message: "Failed to fetch instructors.",
        color: "red",
      });
    }
  };

  const fetchDropdowns = async () => {
    try {
      const [instructorsRes, programsRes] = await Promise.all([
        axios.get('/api/instructors'),
        axios.get('/api/programs'),
      ]);

      const instructors = instructorsRes.data.map((i: any) => ({
        value: i.id.toString(),
        label: `${i.firstName} ${i.middleName ?? ''} ${i.lastName}`.trim(),
      }));

      const programs = programsRes.data.map((p: any) => ({
        value: p.id.toString(),
        label: `${p.programCode} - ${p.programName}`,
      }));

      setInstructorOptions(instructors);
      setProgramOptions(programs);
    } catch {
      notifications.show({
        title: 'Error',
        message: 'Failed to fetch dropdown options',
        color: 'red',
      });
    }
  };

  // Fetch courses on first render only
  useEffect(() => {
    fetchCourses();
    fetchDropdowns();
  }, []);

  // Add new course function
  const handleAddCourses = async (values: Record<string, any>) => {
    try {
      if (editCourse) {
        await axios.put(`/api/courses?id=${editCourse.id}`, values);
        addNotification(`Course ${values.courseName} updated`);
      } else {
        await axios.post("/api/courses", values);
        addNotification(`Course ${values.courseName} added`);
      }
      setModalOpen(false);
      setEditCourse(null);
      fetchCourses(); // Reloads the table to show the new course
    } catch {
      notifications.show({
        title: "Error",
        message: "Failed to save course.",
        color: "red",
      });
    }
  };

  const handleDelete = async () => {
    if (!selectedCourse) return;
    try {
      await axios.delete(`/api/courses?id=${selectedCourse.id}`);
      addNotification(`Course ${selectedCourse.courseName} deleted`);
      setDeleteModal(false);
      fetchCourses();
    } catch {
      notifications.show({
        title: "Error",
        message: "Failed to delete Course.",
        color: "red",
      });
    }
  };

  // Search logic
  const filtered = courses.filter((c) =>
    Object.values(c).join(" ").toLowerCase().includes(search.toLowerCase())
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

  const setSorting = (field: keyof Course) => {
    const shouldReverse = field === sortBy ? !reversed : false;
    setReversed(shouldReverse);
    setSortBy(field);
  };

  const rows = sorted.map((c) => (
    <Table.Tr key={c.id}>
      <Table.Td>{c.courseCode}</Table.Td>
      <Table.Td>{c.courseName}</Table.Td>
      <Table.Td>{c.courseDescription}</Table.Td>
      <Table.Td>
        {c.instructor
          ? `${c.instructor.firstName} ${c.instructor.middleName ?? ''} ${c.instructor.lastName}`
          : "-"}
      </Table.Td>
      <Table.Td>{c.program ? `${c.program.programCode} - ${c.program.programName}` : "-"}</Table.Td>
      <Table.Td>
        <Group gap="xs">
          <Button
            size="xs"
            variant="light"
            leftSection={<IconPencil size={14} />}
            onClick={() => {
              setEditCourse(c);
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
              setSelectedCourse(c);
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
          List of Courses
        </Text>
        <Button
          onClick={() => {
            setEditCourse(null), setModalOpen(true);
          }}
        >
          Add Course
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
              <Th sorted={sortBy === "courseCode"} reversed={reversed} onSort={() => setSorting("courseCode")}>Course Code</Th>
              <Th sorted={sortBy === "courseName"} reversed={reversed} onSort={() => setSorting("courseName")}>Name</Th>
              <Th sorted={sortBy === "courseDescription"} reversed={reversed} onSort={() => setSorting("courseDescription")}>Description</Th>
              <Th sorted={sortBy === "instructorId"} reversed={reversed} onSort={() => setSorting("instructorId")}>Instructor</Th>
              <Th sorted={sortBy === "programId"} reversed={reversed} onSort={() => setSorting("programId")}>Program</Th>
              <Table.Th>Actions</Table.Th>
            </Table.Tr>
          </Table.Thead>
          <Table.Tbody>
            {rows.length ? rows : (
              <Table.Tr>
                <Table.Td colSpan={6}>
                  <Text ta="center">No courses found.</Text>
                </Table.Td>
              </Table.Tr>
            )}
          </Table.Tbody>
        </Table>
      </ScrollArea>

      <FormModal
        opened={modalOpen} // Whether the modal is open
        onClose={() => setModalOpen(false)} // Function to close it
        onSubmit={handleAddCourses} // Function to handle form submit
        fields={courseFields(instructorOptions, programOptions)} // Field configuration from external file
        title={editCourse ? "Edit Course" : "Add New Course"} // Modal title
        initialValues={
          editCourse
            ? {
                // Manually map out the fields necessary - ChatGPT
                // Was getting errors passing through ...editCourse directtly
                courseCode: editCourse.courseCode,
                courseName: editCourse.courseName,
                courseDescription: editCourse.courseDescription || "",
                instructorId: editCourse.instructorId.toString(),
                programId: editCourse.programId ? editCourse.programId.toString() : "",
              }
            : {
                courseCode: "",
                courseName: "",
                courseDescription: "",
                instructorId: "",
                programId: "",
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
          Are you sure you want to delete <b>{selectedCourse?.courseName}</b>?
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
