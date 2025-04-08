"use client";
import { useEffect, useState } from 'react';
import FormModal from "@/components/FormModal";
import Pagination from "@/components/Pagination";
import Table from "@/components/Table";
import TableSearch from "@/components/TableSearch";
import Image from "next/image";

// Define the structure of StudentApplication
type StudentApplicationStatus = {
  id: number;
  studentId: number;
  programId: string;
  status: string;
  submittedAt: string;
};

const columns = [
  {
    header: "Student Name",
    accessor: "studentId",
  },
  {
    header: "Program Name",
    accessor: "programId",
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
  
  // Get the user's ID and role from localStorage
  const userId = typeof window !== 'undefined' ? localStorage.getItem('userId') : null;
  const role = typeof window !== 'undefined' ? localStorage.getItem('role') || 'user' : 'user';

  useEffect(() => {
    const fetchApplications = async () => {
      try {
        console.log('Fetching student applications...');  // Debugging log
        const response = await fetch(`/api/studentApplicationStatus?userId=${userId}`);
        const data = await response.json();
        console.log('Fetched student applications:', data);  // Log the response to check data
        setStudentApplications(data);
      } catch (error) {
        console.error('Error fetching student applications:', error);
      } finally {
        setLoading(false);
      }
    };

    if (userId) {
      fetchApplications();
    } else {
      setLoading(false);
    }
  }, [userId]);

  const renderRow = (item: StudentApplicationStatus) => (
    <tr
      key={item.id}
      className="border-b border-gray-200 even:bg-slate-50 text-sm hover:bg-lamaPurpleLight"
    >
      <td className="p-4">{item.studentId}</td>
      <td>{item.programId}</td>
      <td className="hidden lg:table-cell">{item.status}</td>
      <td className="hidden lg:table-cell">{item.submittedAt}</td>
      <td>
        <div className="flex items-center gap-2">
          {/* Only show these options for admin */}
          {role === "admin" && (
            <>
              <FormModal table="studentApplication" type="update" data={item} />
              <FormModal table="studentApplication" type="delete" id={item.id} />
            </>
          )}
        </div>
      </td>
    </tr>
  );

  return (
    <div className="bg-white p-4 rounded-md flex-1 m-4 mt-0">
      {/* TOP */}
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
            {role === "admin" && (
              <FormModal table="studentApplication" type="create" />
            )}
          </div>
        </div>
      </div>
      {/* LIST */}
      {loading ? (
        <p>Loading...</p>
      ) : (
        studentApplications.length > 0 ? (
          <Table columns={columns} renderRow={renderRow} data={studentApplications} role={role} />
        ) : (
          <p>No applications found.</p>
        )
      )}
      {/* PAGINATION */}
      <Pagination />
    </div>
  );
};

export default StudentApplicationStatus;
