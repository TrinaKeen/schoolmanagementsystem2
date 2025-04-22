"use client";

import Image from "next/image";
import { Menu, ScrollArea, Text, Divider } from "@mantine/core";
import { useNotification } from "@/context/notificationContent";

const Navbar = () => {
  const { notifications, clearNotifications } = useNotification();

  return (
    <div className="flex items-center justify-between p-4">
      {/* ICONS AND USER */}
      <div className="flex items-center gap-6 justify-end w-full">
        {/* Notification Bell with old Icon but Dropdown from Mantine */}
        <Menu shadow="md" width={250} position="bottom-end">
          <Menu.Target>
            <div className="bg-white rounded-full w-7 h-7 flex items-center justify-center cursor-pointer relative hover:bg-gray-100 transition">
              <Image src="/announcement.png" alt="" width={36} height={36} />
              {notifications.length > 0 && (
                <div className="absolute -top-3 -right-3 w-5 h-5 flex items-center justify-center bg-purple-500 text-white rounded-full text-xs">
                  {notifications.length}
                </div>
              )}
            </div>
          </Menu.Target>

          <Menu.Dropdown>
            <ScrollArea h={200}>
              {notifications.length === 0 ? (
                <Text c="dimmed" size="xs" ta="center" py="md">
                  No new notifications
                </Text>
              ) : (
                notifications.map((note: string, index: number) => (
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
      </div>
    </div>
  );
};

export default Navbar;
