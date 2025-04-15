"use client";

import {
  ActionIcon,
  Badge,
  Menu,
  ScrollArea,
  Text,
  Divider,
  Group,
} from "@mantine/core";
import { IconBell } from "@tabler/icons-react";
import { useNotification } from "@/context/notificationContent";

export default function notificationDropdown() {
  const { notifications, clearNotifications } = useNotification();

  return (
    <Menu shadow="md" width={250} position="bottom-end">
      <Menu.Target>
        <ActionIcon variant="subtle" size="lg">
          <IconBell />
          {notifications.length > 0 && (
            <Badge
              size="xs"
              color="violet"
              style={{ position: "absolute", top: 0, right: 0 }}
            >
              {notifications.length}
            </Badge>
          )}
        </ActionIcon>
      </Menu.Target>

      <Menu.Dropdown>
        <ScrollArea h={200}>
          {notifications.length === 0 ? (
            <Text c="dimmed" size="xs" ta="center" py="md">
              No new notifications
            </Text>
          ) : (
            notifications.map((note, index) => (
              <Menu.Item key={index}>{note}</Menu.Item>
            ))
          )}
        </ScrollArea>

        <Divider />

        <Menu.Item color="red" onClick={clearNotifications}>
          Clear all
        </Menu.Item>
      </Menu.Dropdown>
    </Menu>
  );
}
