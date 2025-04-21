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
import scheduleFields from "@/utils/fields/scheduleFields";

interface Schedule {
  id: number;
  courseId: number;
  instructorId: number;
  startTime: Date;
  endTime: Date;
}

interface Course {
  id: number;
  courseCode: string;
  courseName: string;
  courseDescription?: string;
}

interface Instructor {
  id: number;
  firstName: string;
  lastName: string;
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

export default function SchedulesPage() {
  const [schedule, setSchedules] = useState<Schedule[]>([]);
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState<keyof Schedule>("id");
  const [reverseSortDirection, setReverseSortDirection] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const { addNotification } = useNotification();
  const [selectedSchedule, setSelectedSchedule] = useState<Schedule | null>(
    null
  );
  const [editSchedule, setEditSchedule] = useState<Schedule | null>(null);
  const [courseOptions, setCourseOptions] = useState<
    { label: string; value: string }[]
  >([]);
  const [instructorOptions, setInstructorOptions] = useState<
    { label: string; value: string }[]
  >([]);
  const [loading, setLoading] = useState(true);

  const fetchSchedules = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/schedule");
      const data = await res.json();
      const parsedData = data.map((item: Schedule) => ({
        ...item,
        startTime: new Date(item.startTime),
        endTime: new Date(item.endTime),
      }));

      setSchedules(parsedData);
    } catch (err) {
      notifications.show({
        title: "Error",
        message: "Failed to fetch schedules.",
        color: "red",
      });
    }
  };

  const fetchCoursesAndInstructors = async () => {
    try {
      const [courseRes, instructorRes] = await Promise.all([
        axios.get("/api/courses"),
        axios.get("/api/instructors"),
      ]);

      setCourseOptions(
        courseRes.data.map((course: Course) => ({
          label: course.courseName,
          value: course.id.toString(),
        }))
      );

      setInstructorOptions(
        instructorRes.data.map((instructor: Instructor) => ({
          label: `${instructor.firstName} ${instructor.lastName}`,
          value: instructor.id.toString(),
        }))
      );
    } catch (err) {
      notifications.show({
        title: "Error",
        message: "Failed to load courses or instructors.",
        color: "red",
      });
    }
  };

  useEffect(() => {
    fetchSchedules();
    fetchCoursesAndInstructors();
  }, []);

  const handleSaveSchedule = async (values: Record<string, any>) => {
    const schedule = {
      courseId: parseInt(values.courseId),
      instructorId: parseInt(values.instructorId),
      startTime: new Date(values.startTime),
      endTime: new Date(values.endTime),
    };

    try {
      if (editSchedule) {
        await axios.put(`/api/schedule?id=${editSchedule.id}`, schedule);
        addNotification(`Schedule updated successfully!`);
      } else {
        await axios.post("/api/schedule", schedule);
        addNotification(`Schedule added successfully!`);
      }
      setModalOpen(false);
      setEditSchedule(null);
      fetchSchedules();
    } catch (err) {
      notifications.show({
        title: "Error",
        message: "Failed to save schedule.",
        color: "red",
      });
    }
  };

  const handleDeleteSchedule = async () => {
    if (!selectedSchedule) return;

    try {
      await axios.delete(`/api/schedule?id=${selectedSchedule.id}`);
      addNotification(`Schedule deleted successfully!`);
      setDeleteModal(false);
      fetchSchedules();
    } catch (err) {
      notifications.show({
        title: "Error",
        message: "Failed to delete schedule.",
        color: "red",
      });
    }
  };

  const filteredSchedules = schedule.filter((s) => {
    const query = search.toLowerCase();

    const courseLabel =
      courseOptions.find((c) => c.value === s.courseId.toString())?.label || "";

    const instructorLabel =
      instructorOptions.find((i) => i.value === s.instructorId.toString())
        ?.label || "";

    return (
      courseLabel.toLowerCase().includes(query) ||
      instructorLabel.toLowerCase().includes(query)
    );
  });

  const sorted = sortBy
    ? [...filteredSchedules].sort((a, b) => {
        const dir = reverseSortDirection ? -1 : 1;
        return (
          String(a[sortBy] ?? "").localeCompare(String(b[sortBy] ?? "")) * dir
        );
      })
    : filteredSchedules;

  const setSorting = (field: keyof Schedule) => {
    const reversed = field === sortBy ? !reverseSortDirection : false;
    setReverseSortDirection(reversed);
    setSortBy(field);
  };

  const rows = sorted.map((schedule) => (
    <Table.Tr key={schedule.id}>
      <Table.Td>
        {courseOptions.find((c) => c.value === schedule.courseId.toString())
          ?.label || schedule.courseId}
      </Table.Td>
      <Table.Td>
        {instructorOptions.find(
          (i) => i.value === schedule.instructorId.toString()
        )?.label || schedule.instructorId}
      </Table.Td>

      <Table.Td>
        {schedule.startTime.toLocaleString("en-US", {
          dateStyle: "medium",
          timeStyle: "short",
        })}
      </Table.Td>
      <Table.Td>
        {schedule.endTime.toLocaleString("en-US", {
          dateStyle: "medium",
          timeStyle: "short",
        })}
      </Table.Td>

      <Table.Td style={{ textAlign: "right" }}>
        <Group gap="xs">
          <Button
            size="xs"
            variant="light"
            leftSection={<IconPencil size={14} />}
            onClick={() => {
              setEditSchedule(schedule);
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
              setSelectedSchedule(schedule);
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
          Schedules List
        </Text>
        <Button onClick={() => setModalOpen(true)}>Add Schedule</Button>
      </Group>

      <TextInput
        placeholder="Search by Course Id or Instructor Id"
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
                sorted={sortBy === "courseId"}
                reversed={reverseSortDirection}
                onSort={() => setSorting("courseId")}
              >
                Course
              </Th>
              <Th
                sorted={sortBy === "instructorId"}
                reversed={reverseSortDirection}
                onSort={() => setSorting("instructorId")}
              >
                Instructor
              </Th>
              <Th
                sorted={sortBy === "startTime"}
                reversed={reverseSortDirection}
                onSort={() => setSorting("startTime")}
              >
                Start Time
              </Th>
              <Th
                sorted={sortBy === "endTime"}
                reversed={reverseSortDirection}
                onSort={() => setSorting("endTime")}
              >
                End Time
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
                  <Text ta="center">No schedules found</Text>
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
          setEditSchedule(null);
        }}
        onSubmit={handleSaveSchedule}
        fields={scheduleFields(courseOptions, instructorOptions)}
        title={editSchedule ? "Edit Schedule" : "Add Schedule"}
        initialValues={
          editSchedule
            ? {
                courseId: editSchedule.courseId.toString(),
                instructorId: editSchedule.instructorId.toString(),
                startTime: new Date(editSchedule.startTime)
                  .toISOString()
                  .slice(0, 16),
                endTime: new Date(editSchedule.endTime)
                  .toISOString()
                  .slice(0, 16),
              }
            : {
                courseId: "",
                instructorId: "",
                startTime: "",
                endTime: "",
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
          Are you sure you want to delete <b>{selectedSchedule?.courseId}</b>?
        </Text>
        <Group justify="flex-end" mt="md">
          <Button variant="default" onClick={() => setDeleteModal(false)}>
            Cancel
          </Button>
          <Button color="red" onClick={handleDeleteSchedule}>
            Delete
          </Button>
        </Group>
      </Modal>
    </Box>
  );
}
