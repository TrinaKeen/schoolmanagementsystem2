"use client";

import { useNotification } from "@/context/notificationContent";

const Notifications = () => {
  const { notifications } = useNotification();

  return (
    <div className="bg-white p-4 rounded-md shadow-sm w-full max-w-md mx-auto">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-semibold">Notifications</h1>
      </div>

      <div className="flex flex-col gap-4 mt-4">
        {notifications.length > 0 ? (
          notifications.map((note, index) => (
            <div
              key={index}
              className={`rounded-md p-4 ${
                index % 3 === 0
                  ? "bg-lamaSkyLight"
                  : index % 3 === 1
                  ? "bg-lamaPurpleLight"
                  : "bg-lamaYellowLight"
              }`}
            >
              <div className="flex items-center justify-between">
                <h2 className="font-medium">Notification</h2>
                <span className="text-xs text-gray-400 bg-white rounded-md px-1 py-1">
                  {new Date().toISOString().slice(0, 10)}
                </span>
              </div>
              <p className="text-sm text-gray-500 mt-1">{note}</p>
            </div>
          ))
        ) : (
          <div className="text-sm text-gray-400 text-center mt-4">
            No notifications at the moment.
          </div>
        )}
      </div>
    </div>
  );
};

export default Notifications;
