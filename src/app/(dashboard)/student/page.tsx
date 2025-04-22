"use client";
import { useEffect, useState } from "react";

const Dashboard = () => {
  const [user, setUser] = useState<{ userId: string | null; name: string | null; role: string | null }>({
    userId: null,
    name: null,
    role: null,
  });

  useEffect(() => {
    const userId = localStorage.getItem("userId");
    const name = localStorage.getItem("name");
    const role = localStorage.getItem("role");

    if (userId && name && role) {
      setUser({ userId, name, role });
    } else {
      window.location.href = "/signin";
    }
  }, []);

  return (
    <div className="p-6 space-y-10 bg-gray-100 min-h-screen">
      {/* Welcome Section */}
      <section className="bg-white rounded-2xl shadow-md p-6">
        <h1 className="text-3xl font-bold mb-2">Welcome, {user.name} 👋</h1>
        <p className="text-gray-700 text-lg">We're happy you're here!</p>
        <p className="text-gray-600 mt-2">
        This is your student admission dashboard. Here, you can start a new application, upload required documents, track the status of your submission, and receive updates about your admission process.
        </p>
      </section>

      {/* My Application Section */}
      <section className="bg-white rounded-2xl shadow-md p-6">
        <h2 className="text-2xl font-semibold mb-4">📄 My Applications</h2>
        <p className="text-gray-700">You currently have no active applications.</p>
        {/* You can map over applications here in the future */}
      </section>

      {/* My Profile Section */}
      <section className="bg-white rounded-2xl shadow-md p-6">
        <h2 className="text-2xl font-semibold mb-4">👤 My Info</h2>
        <p><strong>Name:</strong> {user.name}</p>
        <p><strong>Email:</strong> your-email@example.com</p> {/* Replace with actual email if you store it */}
        <p><strong>Role:</strong> {user.role}</p>
      </section>
    </div>
  );
};

export default Dashboard;
