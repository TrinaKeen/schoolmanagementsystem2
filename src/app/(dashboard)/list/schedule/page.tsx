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
      const res = await fetch('/api/schedule', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...newSchedule,
          instructorId: parseInt(newSchedule.instructorId),
        }),
      });

      if (!res.ok) throw new Error('Failed to add schedule');
      setNewSchedule({ courseId: '', instructorId: '',  startTime: '', endTime: '',});
      fetchSchedules();
    } catch {
      alert('Error adding course.');
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
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Schedules Dashboard</h1>

      <form onSubmit={handleSubmit} className="mb-6 space-y-3 bg-gray-50 p-4 border rounded-md shadow-sm">
        <div className="flex flex-col gap-2">
          <input
            type="text"
            placeholder="Course Id"
            value={newSchedule.courseId}
            onChange={e => setNewSchedule({ ...newSchedule, courseId: e.target.value })}
            className="p-2 border rounded"
            required
          />
          <input
            type="number"
            placeholder="Instructor ID"
            value={newSchedule.instructorId}
            onChange={e => setNewSchedule({ ...newSchedule, instructorId: e.target.value })}
            className="p-2 border rounded"
            required
          />
          <input
            type="number"
            placeholder="Start Time"
            value={newSchedule.startTime}
            onChange={e => setNewSchedule({ ...newSchedule, startTime: e.target.value })}
            className="p-2 border rounded"
            required
          />
            <input
            type="number"
            placeholder="End Time"
            value={newSchedule.startTime}
            onChange={e => setNewSchedule({ ...newSchedule, endTime: e.target.value })}
            className="p-2 border rounded"
            required
          />
        </div>
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">Add Schedule</button>
      </form>

      {loading ? (
        <p>Loading schedules...</p>
      ) : error ? (
        <p className="text-red-500">{error}</p>
      ) : (
        <table className="w-full border text-sm">
          <thead className="bg-gray-200 text-left">
            <tr>
              <th className="p-2 border">ID</th>
              <th className="p-2 border">Course ID</th>
              <th className="p-2 border">Instructor ID</th>
              <th className="p-2 border">Start Time</th>
              <th className="p-2 border">End Time</th>
            </tr>
          </thead>
          <tbody>
            {courses.map(schedule => (
              <tr key={schedule.id} className="hover:bg-gray-50">
                <td className="p-2 border">{schedule.id}</td>
                <td className="p-2 border">{schedule.courseId}</td>
                <td className="p-2 border">{schedule.instructorId}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
