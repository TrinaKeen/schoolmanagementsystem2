"use client";

import {
  Box,
  Button,
  Center,
  Group,
  Modal,
  ScrollArea,
  Select,
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
} from "@tabler/icons-react";
import axios from "axios";
import { useEffect, useState } from "react";
import FormModal from "@/components/FormModal";
import { useNotification } from "@/context/notificationContent";
import { notifications } from "@mantine/notifications";
import studentApprovalFields from "@/utils/fields/studentApprovalFields";

interface Application {
  id: number;
  student: {
    id: number;
    firstName: string;
    middleName?: string;
    lastName: string;
    gender: string;
    age: number;
    nationality: string;
    placeOfBirth: string;
    phoneNumber: string;
    homeAddress: string;
    emergencyContactName: string;
    emergencyContactPhoneNumber: string;
    emergencyContactRelationship: string;
    previousSchools: string;
    yearOfGraduation: string;
    gpa: string;
    email: string;
    dob: string;
  };
  program: {
    id: number;
    programName: string;
  };
  status: string;
  rejectionReason?: string | null;
  submissionDate: string;
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

export default function StudentApprovalPage() {
  const [applications, setApplications] = useState<Application[]>([]);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<string | null>("pending");
  const [sortBy, setSortBy] = useState<string | null>(null);
  const [reverseSortDirection, setReverseSortDirection] = useState(false);
  const [selectedApp, setSelectedApp] = useState<Application | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [statusUpdate, setStatusUpdate] = useState("pending");
  const [rejectionReason, setRejectionReason] = useState("");
  const { addNotification } = useNotification();

  const fetchApplications = async () => {
    try {
      const res = await axios.get("/api/studentApproval", {
        params: statusFilter ? { status: statusFilter } : {},
      });

      console.log("Fetched applications:", res.data);

      setApplications(res.data);
    } catch (err) {
      notifications.show({
        title: "Error",
        message: "Failed to fetch applications.",
        color: "red",
      });
    }
  };

  useEffect(() => {
    fetchApplications();
  }, [statusFilter]);

  const handleUpdateStatus = async () => {
    if (!selectedApp) return;

    try {
      await axios.put("/api/studentApproval", {
        id: selectedApp.id,
        status: statusUpdate,
        rejectionReason: statusUpdate === "rejected" ? rejectionReason : null,
        approvalDate:
          statusUpdate === "approved" ? new Date().toISOString() : null,
        adminId: 1, // Replace with actual admin id in real setup
      });

      if (statusUpdate === "approved") {
        await axios.post("/api/studentApproval?status=approved", {
          studentId: selectedApp.student.id,
          firstName: selectedApp.student.firstName,
          lastName: selectedApp.student.lastName,
          email: selectedApp.student.email,
          dob: selectedApp.student.dob,
          course: selectedApp.program.programName,
          enrollment_date: new Date(),
          student_status: "active",
          academic_year: "2024-2025",
          admin_id: 1,
        });
      }

      addNotification(
        `Employee ${selectedApp.student.firstName} ${selectedApp.student.lastName} has been updated!`
      );

      setModalOpen(false);
      setSelectedApp(null);
      fetchApplications();
    } catch (err) {
      notifications.show({
        title: "Error",
        message: "Failed to update student application.",
        color: "red",
      });
    }
  };

  const filteredApps = applications.filter((app) => {
    const query = search.toLowerCase();
    return (
      app.student?.firstName?.toLowerCase().includes(query) ||
      app.student?.lastName?.toLowerCase().includes(query) ||
      app.program?.programName?.toLowerCase().includes(query)
    );
  });

  const sortedApps = sortBy
    ? [...filteredApps].sort((a, b) => {
        const dir = reverseSortDirection ? -1 : 1;

        const getField = (app: Application) => {
          switch (sortBy) {
            case "student":
              return `${app.student.lastName} ${app.student.firstName}`;
            case "program":
              return app.program.programName;
            case "status":
              return app.status;
            default:
              return "";
          }
        };

        return getField(a).localeCompare(getField(b)) * dir;
      })
    : filteredApps;

  const setSorting = (field: string) => {
    const reversed = field === sortBy ? !reverseSortDirection : false;
    setReverseSortDirection(reversed);
    setSortBy(field);
  };

  const rows = sortedApps.map((app) => (
    <Table.Tr key={app.id}>
      <Table.Td>
        {app.student.firstName} {app.student.lastName}
      </Table.Td>
      <Table.Td>{app.program.programName}</Table.Td>
      <Table.Td>{app.status}</Table.Td>
      <Table.Td>
        {app.submissionDate
          ? new Date(app.submissionDate).toLocaleDateString()
          : "N/A"}
      </Table.Td>
      <Table.Td>
        <Button
          size="xs"
          variant="light"
          leftSection={<IconPencil size={14} />}
          onClick={() => {
            setSelectedApp(app);
            setStatusUpdate(app.status);
            setRejectionReason(app.rejectionReason || "");
            setModalOpen(true);
          }}
        >
          Edit
        </Button>
      </Table.Td>
    </Table.Tr>
  ));

  return (
    <Box p="md">
      <Group justify="space-between" mb="md">
        <Text fw={700} size="xl">
          {statusFilter
            ? `${
                statusFilter[0].toUpperCase() + statusFilter.slice(1)
              } Applications`
            : "All Applications"}
        </Text>
      </Group>

      <Group mb="md" gap="md">
        <TextInput
          placeholder="Search by student or program"
          leftSection={<IconSearch size={16} stroke={1.5} />}
          value={search}
          onChange={(e) => setSearch(e.currentTarget.value)}
          w="300px"
        />

        <Select
          placeholder="Filter by status"
          data={["pending", "approved", "rejected"]}
          clearable
          value={statusFilter}
          onChange={setStatusFilter}
        />
      </Group>

      <ScrollArea>
        <Table striped highlightOnHover withTableBorder>
          <Table.Thead>
            <Table.Tr>
              <Th
                sorted={sortBy === "student"}
                reversed={reverseSortDirection}
                onSort={() => setSorting("student")}
              >
                Student
              </Th>
              <Th
                sorted={sortBy === "program"}
                reversed={reverseSortDirection}
                onSort={() => setSorting("program")}
              >
                Program
              </Th>
              <Th
                sorted={sortBy === "status"}
                reversed={reverseSortDirection}
                onSort={() => setSorting("status")}
              >
                Status
              </Th>
              <Th
                sorted={sortBy === "submissionDate"}
                reversed={reverseSortDirection}
                onSort={() => setSorting("submissionDate")}
              >
                Submission Date
              </Th>
              <Table.Th>Actions</Table.Th>
            </Table.Tr>
          </Table.Thead>
          <Table.Tbody>{rows}</Table.Tbody>
        </Table>
      </ScrollArea>

      <FormModal
        opened={modalOpen}
        onClose={() => setModalOpen(false)}
        fields={studentApprovalFields}
        title="Update Student Application"
        onSubmit={handleUpdateStatus}
        initialValues={{
          studentId: selectedApp?.student.id,
          firstName: selectedApp?.student.firstName,
          middleName: selectedApp?.student.middleName ?? "",
          lastName: selectedApp?.student.lastName,
          dob: selectedApp?.student.dob,
          gender: selectedApp?.student.gender,
          age: selectedApp?.student.age,
          nationality: selectedApp?.student.nationality,
          placeOfBirth: selectedApp?.student.placeOfBirth,
          email: selectedApp?.student.email,
          phoneNumber: selectedApp?.student.phoneNumber,
          homeAddress: selectedApp?.student.homeAddress,
          emergencyContactName: selectedApp?.student.emergencyContactName,
          emergencyContactPhoneNumber:
            selectedApp?.student.emergencyContactPhoneNumber,
          emergencyContactRelationship:
            selectedApp?.student.emergencyContactRelationship,
          previousSchools: selectedApp?.student.previousSchools ?? "",
          yearOfGraduation: selectedApp?.student.yearOfGraduation ?? "",
          gpa: selectedApp?.student.gpa ?? "",
          program: selectedApp?.program.programName,
          submissionDate: selectedApp?.submissionDate
            ? new Date(selectedApp.submissionDate).toISOString().split("T")[0]
            : "",
          status: statusUpdate,
          rejectionReason: rejectionReason,
        }}
      />
    </Box>
  );
}
