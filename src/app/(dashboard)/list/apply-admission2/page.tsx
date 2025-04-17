"use client";
import { useEffect, useState } from "react";
import Pagination from "@/components/Pagination";
import StudentApplicationModal from "@/components/StudentApplicationModal";
import Table from "@/components/Table";
import TableSearch from "@/components/TableSearch";
import Image from "next/image";

// Updated structure reflecting full student name and program name
type StudentApplicationStatus = {
  id: number;
  studentName: string;
  programName: string;
  status: string;
  submittedAt: string;
};

const columns = [
  {
    header: "Student Name",
    accessor: "studentName",
  },
  {
    header: "Program Name",
    accessor: "programName",
  },
  {
    header: "Status",
    accessor: "status",
    className: "hidden lg:table-cell",
  },
  {
    header: "Submitted At",
    accessor: "submittedAt",
    className: "hidden lg:table-cell",
  },
  {
    header: "Actions",
    accessor: "action",
  },
];

const StudentApplicationStatus = () => {
  const [studentApplications, setStudentApplications] = useState<StudentApplicationStatus[]>([]);
  const [loading, setLoading] = useState(true);

  // Get the JWT token from localStorage
  const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;

  useEffect(() => {
    const fetchApplications = async () => {
      try {
        // If no token, return early
        if (!token) {
          console.error("No token found in localStorage");
          return;
        }

        const response = await fetch(`/api/studentApplicationStatus`, {
          method: "GET",
          headers: {
            "Authorization": `Bearer ${token}`, // Pass the token in the Authorization header
          },
        });

        const data = await response.json();
        console.log("Fetched applications:", data); // Debugging log

        // If the data is valid, update the state
        if (data) {
          setStudentApplications(
            data.map((item: any) => ({
              id: item.id,
              studentName: item.studentId, // backend sends full name as `studentId`
              programName: item.programId, // backend sends program name as `programId`
              status: item.status,
              submittedAt: item.submittedAt,
            }))
          );
        }
      } catch (error) {
        console.error("Error fetching student applications:", error);
      } finally {
        setLoading(false);
      }
    };

    if (token) {
      fetchApplications();
    } else {
      setLoading(false);
    }
  }, [token]);

  const handleWithdraw = async (applicationId: number) => {
    try {
      const response = await fetch(`/api/withdrawApplication`, {
        method: "POST",
        body: JSON.stringify({ applicationId, token }), // Send token along with the withdrawal request
        headers: {
          "Content-Type": "application/json",
        },
      });
      const result = await response.json();
      if (result.success) {
        setStudentApplications((prevApplications) =>
          prevApplications.filter((app) => app.id !== applicationId)
        );
        alert("Application withdrawn successfully.");
      } else {
        alert("Failed to withdraw the application.");
      }
    } catch (error) {
      console.error("Error withdrawing application:", error);
    }
  };

  const renderRow = (item: StudentApplicationStatus) => (
    <tr key={item.id} className="border-b border-gray-200 even:bg-slate-50 text-sm hover:bg-lamaPurpleLight">
      <td className="p-4">{item.studentName}</td>
      <td>{item.programName}</td>
      <td className="hidden lg:table-cell">{item.status}</td>
      <td className="hidden lg:table-cell">{item.submittedAt}</td>
      <td>
        <div className="flex items-center gap-2">
          {item.status !== "Withdrawn" && (
            <button
              onClick={() => handleWithdraw(item.id)}
              className="text-red-500 hover:text-red-700"
            >
              Withdraw
            </button>
          )}
        </div>
      </td>
    </tr>
  );

  return (
    <div className="bg-white p-4 rounded-md flex-1 m-4 mt-0">
      <div className="flex items-center justify-between">
        <h1 className="hidden md:block text-lg font-semibold">All Student Applications</h1>
        <div className="flex flex-col md:flex-row items-center gap-4 w-full md:w-auto">
          <TableSearch />
          <div className="flex items-center gap-4 self-end">
            <button className="w-8 h-8 flex items-center justify-center rounded-full bg-lamaYellow">
              <Image src="/filter.png" alt="" width={14} height={14} />
            </button>
            <button className="w-8 h-8 flex items-center justify-center rounded-full bg-lamaYellow">
              <Image src="/sort.png" alt="" width={14} height={14} />
            </button>
            {token && <StudentApplicationModal type="create" />}
          </div>
        </div>
      </div>
      {loading ? (
        <p>Loading...</p>
      ) : studentApplications.length > 0 ? (
        <Table columns={columns} renderRow={renderRow} data={studentApplications} />
      ) : (
        <p>No applications found.</p>
      )}
      <Pagination />
    </div>
  );
};

export default StudentApplicationStatus;
