"use client";

import { useEffect, useState } from "react";
import {
  Box,
  Button,
  Center,
  Group,
  ScrollArea,
  Table,
  Text,
  TextInput,
  UnstyledButton,
  Select,
  ActionIcon,
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
import { notifications } from "@mantine/notifications";
import axios from "axios";
import FormModal from "@/components/FormModal";
import newUserFields from "@/utils/fields/newUserFields";
import { useNotification } from "@/context/notificationContent";

interface User {
  id: number;
  role: string;
  username: string;
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

export default function AddNewUserPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [editUser, setEditUser] = useState<User | null>(null);
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState<keyof User | null>(null);
  const [reverseSortDirection, setReverseSortDirection] = useState(false);
  const [roleFilter, setRoleFilter] = useState<string | null>(null);
  const { addNotification } = useNotification();
  const [deleteUserId, setDeleteUserId] = useState<number | null>(null);
  const [deleteUsername, setDeleteUsername] = useState<string>("");

  const fetchUsers = async () => {
    try {
      const res = await axios.get("/api/users");
      setUsers(res.data);
    } catch (err) {
      notifications.show({
        title: "Error",
        message: "Failed to fetch users.",
        color: "red",
      });
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleSaveUser = async (userData: Record<string, any>) => {
    try {
      if (editUser) {
        await axios.put("/api/users", { ...userData, id: editUser.id });
        addNotification(
          `User ${userData.username} has been added successfully!`
        );
      } else {
        await axios.post("/api/users", userData);
        addNotification(
          `User ${userData.username} has been added successfully!`
        );
      }
      setModalOpen(false);
      setEditUser(null);
      fetchUsers();
    } catch (err) {
      notifications.show({
        title: "Error",
        message: "Failed to save user.",
        color: "red",
      });
    }
  };

  const handleDeleteUser = async (id: number, username: string) => {
    try {
      await axios.delete("/api/users", { data: { id } });
      addNotification(`User ${username} has been deleted successfully!`);
      fetchUsers();
    } catch (err) {
      notifications.show({
        title: "Error",
        message: "Failed to delete user.",
        color: "red",
      });
    }
  };

  const filteredUsers = users.filter((user) => {
    const query = search.toLowerCase();
    const roleMatch = roleFilter ? user.role === roleFilter : true;
    return (
      roleMatch &&
      (user.role.toLowerCase().includes(query) ||
        user.username.toLowerCase().includes(query) ||
        user.email.toLowerCase().includes(query))
    );
  });

  const sortedUsers = sortBy
    ? [...filteredUsers].sort((a, b) => {
        const dir = reverseSortDirection ? -1 : 1;
        return String(a[sortBy]).localeCompare(String(b[sortBy])) * dir;
      })
    : filteredUsers;

  const setSorting = (field: keyof User) => {
    const reversed = field === sortBy ? !reverseSortDirection : false;
    setReverseSortDirection(reversed);
    setSortBy(field);
  };

  const rows = sortedUsers.map((user) => (
    <Table.Tr key={user.id}>
      <Table.Td style={{ padding: "10px 8px" }}>{user.role}</Table.Td>
      <Table.Td style={{ padding: "10px 8px" }}>{user.username}</Table.Td>
      <Table.Td style={{ padding: "10px 8px" }}>{user.email}</Table.Td>
      <Table.Td style={{ padding: "10px 8px" }}>
        <Group gap="xs">
          <ActionIcon
            color="blue"
            onClick={() => {
              setEditUser(user);
              setModalOpen(true);
            }}
          >
            <IconPencil size={18} />
          </ActionIcon>
          <ActionIcon
            color="red"
            onClick={() => {
              setDeleteUserId(user.id);
              setDeleteUsername(user.username);
            }}
          >
            <IconTrash size={18} />
          </ActionIcon>
        </Group>
      </Table.Td>
    </Table.Tr>
  ));

  return (
    <Box p="md">
      <Group justify="space-between" mb="md">
        <Text fw={700} size="xl">
          Users
        </Text>
        <Button
          onClick={() => {
            setModalOpen(true);
            setEditUser(null);
          }}
        >
          Add User
        </Button>
      </Group>

      <Group mb="md" gap="md">
        <TextInput
          placeholder="Search by role, username or email"
          leftSection={<IconSearch size={16} stroke={1.5} />}
          value={search}
          onChange={(e) => setSearch(e.currentTarget.value)}
        />

        <Select
          placeholder="Filter by role"
          data={["admin", "instructor", "student"]}
          clearable
          value={roleFilter}
          onChange={setRoleFilter}
        />
      </Group>

      <ScrollArea>
        <Table
          horizontalSpacing="md"
          verticalSpacing="xs"
          miw={700}
          layout="fixed"
          striped
          withTableBorder
          highlightOnHover
        >
          <Table.Thead>
            <Table.Tr>
              <Th
                sorted={sortBy === "role"}
                reversed={reverseSortDirection}
                onSort={() => setSorting("role")}
              >
                Role
              </Th>
              <Th
                sorted={sortBy === "username"}
                reversed={reverseSortDirection}
                onSort={() => setSorting("username")}
              >
                Username
              </Th>
              <Th
                sorted={sortBy === "email"}
                reversed={reverseSortDirection}
                onSort={() => setSorting("email")}
              >
                Email
              </Th>
              <Table.Th style={{ padding: "12px 8px" }}>Actions</Table.Th>
            </Table.Tr>
          </Table.Thead>
          <Table.Tbody>
            {rows.length > 0 ? (
              rows
            ) : (
              <Table.Tr>
                <Table.Td colSpan={4}>
                  <Text fw={500} ta="center">
                    No users found.
                  </Text>
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
          setEditUser(null);
        }}
        onSubmit={handleSaveUser}
        fields={newUserFields}
        title={editUser ? "Edit User" : "Add New User"}
        initialValues={
          editUser
            ? { ...editUser, password: "" }
            : { role: "", username: "", email: "", password: "" }
        }
      />
      <Modal
        opened={deleteUserId !== null}
        onClose={() => setDeleteUserId(null)}
        title="Confirm Deletion"
        centered
      >
        <Text>
          Are you sure you want to delete <b>{deleteUsername}</b>?
        </Text>

        <Group justify="flex-end" mt="md">
          <Button variant="default" onClick={() => setDeleteUserId(null)}>
            Cancel
          </Button>
          <Button
            color="red"
            onClick={() => {
              if (deleteUserId !== null) {
                handleDeleteUser(deleteUserId, deleteUsername);
                setDeleteUserId(null);
              }
            }}
          >
            Delete
          </Button>
        </Group>
      </Modal>
    </Box>
  );
}
