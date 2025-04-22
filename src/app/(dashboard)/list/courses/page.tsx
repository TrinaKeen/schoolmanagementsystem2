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
  IconAlertTriangle,
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

interface ThProps {
  children: React.ReactNode;
  sorted: boolean;
  reversed: boolean;
  onSort: () => void;
}

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
  const [courses, setCourses] = useState<Course[]>([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [sortBy, setSortBy] = useState<keyof Course | null>(null);
  const [reversed, setReversed] = useState(false);
  const [search, setSearch] = useState("");
  const [editCourse, setEditCourse] = useState<Course | null>(null);
  const [deleteModal, setDeleteModal] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
  const [warningModal, setWarningModal] = useState(false);
  const [warningMessage, setWarningMessage] = useState("");
  const { addNotification } = useNotification();

  const [instructorOptions, setInstructorOptions] = useState<
    { label: string; value: string }[]
  >([]);
  const [programOptions, setProgramOptions] = useState<
    { label: string; value: string }[]
  >([]);

  const fetchCourses = async () => {
    try {
      const res = await axios.get("/api/courses");
      setCourses(res.data);
    } catch {
      notifications.show({
        title: "Error",
        message: "Failed to fetch courses.",
        color: "red",
      });
    }
  };

  const fetchDropdowns = async () => {
    try {
      const [instructorsRes, programsRes] = await Promise.all([
        axios.get("/api/instructors"),
        axios.get("/api/programs"),
      ]);

      setInstructorOptions(
        instructorsRes.data.map((i: any) => ({
          value: i.id.toString(),
          label: `${i.firstName} ${i.middleName ?? ""} ${i.lastName}`.trim(),
        }))
      );

      setProgramOptions(
        programsRes.data.map((p: any) => ({
          value: p.id.toString(),
          label: `${p.programCode} - ${p.programName}`,
        }))
      );
    } catch {
      notifications.show({
        title: "Error",
        message: "Failed to fetch dropdown options.",
        color: "red",
      });
    }
  };

  useEffect(() => {
    fetchCourses();
    fetchDropdowns();
  }, []);

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
      fetchCourses();
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
    } catch (error: any) {
      const errMsg = error?.response?.data?.error || "";

      if (errMsg.includes("Foreign key constraint")) {
        setDeleteModal(false);
        setWarningMessage(
          `Cannot delete ${selectedCourse.courseName} because they are assigned to a course and/or schedule.`
        );
        setWarningModal(true);
      } else {
        notifications.show({
          title: "Delete Failed",
          message: errMsg || "Failed to delete course.",
          color: "red",
        });
      }
    }
  };

  const filtered = courses.filter((c) =>
    Object.values(c).join(" ").toLowerCase().includes(search.toLowerCase())
  );

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
          ? `${c.instructor.firstName} ${c.instructor.middleName ?? ""} ${
              c.instructor.lastName
            }`
          : "-"}
      </Table.Td>
      <Table.Td>
        {c.program
          ? `${c.program.programCode} - ${c.program.programName}`
          : "-"}
      </Table.Td>
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
            setEditCourse(null);
            setModalOpen(true);
          }}
        >
          Add Course
        </Button>
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
                sorted={sortBy === "courseCode"}
                reversed={reversed}
                onSort={() => setSorting("courseCode")}
              >
                Course Code
              </Th>
              <Th
                sorted={sortBy === "courseName"}
                reversed={reversed}
                onSort={() => setSorting("courseName")}
              >
                Name
              </Th>
              <Th
                sorted={sortBy === "courseDescription"}
                reversed={reversed}
                onSort={() => setSorting("courseDescription")}
              >
                Description
              </Th>
              <Th
                sorted={sortBy === "instructorId"}
                reversed={reversed}
                onSort={() => setSorting("instructorId")}
              >
                Instructor
              </Th>
              <Th
                sorted={sortBy === "programId"}
                reversed={reversed}
                onSort={() => setSorting("programId")}
              >
                Program
              </Th>
              <Table.Th>Actions</Table.Th>
            </Table.Tr>
          </Table.Thead>
          <Table.Tbody>
            {rows.length ? (
              rows
            ) : (
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
        opened={modalOpen}
        onClose={() => {
          setModalOpen(false);
          setEditCourse(null);
        }}
        onSubmit={handleAddCourses}
        fields={courseFields(instructorOptions, programOptions)}
        title={editCourse ? "Edit Course" : "Add New Course"}
        initialValues={
          editCourse
            ? {
                courseCode: editCourse.courseCode,
                courseName: editCourse.courseName,
                courseDescription: editCourse.courseDescription || "",
                instructorId: editCourse.instructorId.toString(),
                programId: editCourse.programId
                  ? editCourse.programId.toString()
                  : "",
              }
            : {
                courseName: "",
                courseDescription: "",
                instructorId: "",
                programId: "",
              }
        }
        type={editCourse ? "update" : "create"}
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
      <Modal
        opened={warningModal}
        onClose={() => setWarningModal(false)}
        title={
          <Group>
            <IconAlertTriangle color="orange" size={20} />
            <Text fw={600}>Cannot Delete Course</Text>
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
