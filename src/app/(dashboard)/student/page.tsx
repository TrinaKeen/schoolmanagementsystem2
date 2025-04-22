"use client";
import { useEffect, useState } from "react";
import axios from "axios";

const Dashboard = () => {
  const [user, setUser] = useState<{ userId: string | null; name: string | null; role: string | null }>({
    userId: null,
    name: null,
    role: null,
  });
  const [applications, setApplications] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const userId = localStorage.getItem("userId");
    const name = localStorage.getItem("name");
    const role = localStorage.getItem("role");

    if (userId && name && role) {
      setUser({ userId, name, role });
      fetchApplications(userId);
    } else {
      window.location.href = "/signin";
    }
  }, []);

  const fetchApplications = async (userId: string) => {
    try {
      const res = await axios.get(`/api/studentApplicationStatus`, {
        params: { userId },
      });
      setApplications(res.data.applications || []);
    } catch (error) {
      console.error("Error fetching applications:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleWithdraw = async (applicationId: number) => {
    try {
      const response = await fetch(`/api/studentApplicationStatus?applicationId=${applicationId}`, {
        method: "POST",
      });

      const result = await response.json();

      if (response.ok) {
        alert("Application withdrawn successfully!");
        setApplications((prevApps) =>
          prevApps.filter((app) => app.id !== applicationId)
        );
      } else {
        alert(result.error || "Failed to withdraw application");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Something went wrong!");
    }
  };

  return (
    <div className="p-6 space-y-10 bg-gray-100 min-h-screen">
      {/* Welcome Section */}
      <section className="bg-white rounded-2xl shadow-md p-6">
        <h1 className="text-3xl font-bold mb-2">Welcome, {user.name} 👋</h1>
        <p className="text-gray-700 text-lg">We're happy you're here!</p>
        <p className="text-gray-600 mt-2">
          This is your student admission dashboard. Here, you can start a new
          application, upload required documents, track the status of your
          submission, and receive updates about your admission process.
        </p>
      </section>

      {/* My Application Section */}
      <section className="bg-white rounded-2xl shadow-md p-6">
        <h2 className="text-2xl font-semibold mb-4">📄 My Applications</h2>
        <table className="min-w-full table-auto">
          <thead>
            <tr className="bg-gray-200">
              <th className="px-4 py-2 text-left">Application Number</th>
              <th className="px-4 py-2 text-left">Program</th>
              <th className="px-4 py-2 text-left">Submission Date</th>
              <th className="px-4 py-2 text-left">Status</th>
              <th className="px-4 py-2 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {applications.map((app) => (
              <tr key={app.id} className="border-b">
                <td className="px-4 py-2">{app.student?.studentNumber || "Student not found"}</td>
                <td className="px-4 py-2">
                  {app.program?.programName
                    ? `${app.program.programName} (${app.program.programDescription})`
                    : "Program not found"}
                </td>
                <td className="px-4 py-2">
                  {new Date(app.submissionDate).toLocaleDateString()}
                </td>
                <td className="px-4 py-2">{app.status}</td>
                <td className="px-4 py-2">
                  {app.status !== "withdrawn" && (
                    <button
                      className="text-red-500 hover:text-red-700"
                      onClick={() => handleWithdraw(app.id)}
                    >
                      Withdraw Application
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      {/* My Profile Section */}
      <section className="bg-white rounded-2xl shadow-md p-6">
        <h2 className="text-2xl font-semibold mb-4">👤 My Info</h2>
        <p>
          <strong>Name:</strong> {user.name}
        </p>
        <p>
          <strong>Email:</strong> your-email@example.com
        </p>
        <p>
          <strong>Role:</strong> {user.role}
        </p>
      </section>
    </div>
  );
};

export default Dashboard;
