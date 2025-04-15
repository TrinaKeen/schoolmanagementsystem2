"use client";

import { useEffect, useState } from "react";
import { Button, Group, Table, Box, Text, ActionIcon } from "@mantine/core";
import { IconPencil, IconTrash } from "@tabler/icons-react";
import axios from "axios";
import FormModal from "@/components/FormModal";
import newUserFields from "@/utils/fields/newUserFields";

interface User {
  id: number;
  role: string;
  username: string;
  email: string;
}

export default function AddNewUserPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [editUser, setEditUser] = useState<User | null>(null);

  const fetchUsers = async () => {
    try {
      const res = await axios.get("/api/users");
      setUsers(res.data);
    } catch (err) {
      console.error("Failed to fetch users:", err);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleSaveUser = async (userData: Record<string, any>) => {
    try {
      if (editUser) {
        await axios.put("/api/users", { ...userData, id: editUser.id });
      } else {
        await axios.post("/api/users", userData);
      }
      setModalOpen(false);
      setEditUser(null);
      fetchUsers();
    } catch (err) {
      console.error("Failed to save user:", err);
    }
  };

  const handleDeleteUser = async (id: number) => {
    if (!confirm("Are you sure you want to delete this user?")) return;
    try {
      await axios.delete("/api/users", { data: { id } });
      fetchUsers();
    } catch (err) {
      console.error("Failed to delete user:", err);
    }
  };

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

      <Table striped highlightOnHover withTableBorder>
        <thead>
          <tr>
            <th>Role</th>
            <th>Username</th>
            <th>Email</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.length === 0 ? (
            <tr>
              <td colSpan={4}>No users found.</td>
            </tr>
          ) : (
            users.map((user) => (
              <tr key={user.id}>
                <td>{user.role}</td>
                <td>{user.username}</td>
                <td>{user.email}</td>
                <td>
                  <Group gap="xs">
                    <ActionIcon
                      color="blue"
                      onClick={() => {
                        setEditUser(user);
                        setModalOpen(true);
                      }}
                    >
                      <IconPencil size={16} />
                    </ActionIcon>
                    <ActionIcon
                      color="red"
                      onClick={() => handleDeleteUser(user.id)}
                    >
                      <IconTrash size={16} />
                    </ActionIcon>
                  </Group>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </Table>

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
          editUser ||
          newUserFields.reduce((acc, field) => {
            acc[field.name] = "";
            return acc;
          }, {} as Record<string, any>)
        }
      />
    </Box>
  );
}
