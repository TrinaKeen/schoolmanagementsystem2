// https://chatgpt.com/c/67f6d77e-593c-8003-b651-f54c20610ba9
// https://chatgpt.com/c/67f7d43f-4c18-8003-bece-9ecaa85fe777

// 'use client';

// import React, { useEffect, useState } from 'react';

// type Instructor = {
//   id: number;
//   employeeNumber: string;
//   firstName: string;
//   middleName?: string;
//   lastName: string;
//   department?: string;
//   email: string;
//   phoneNumber: string;
//   dateHired: string;
//   dob: string;
// };

// export default function InstructorsPage() {
//   const [instructors, setInstructors] = useState<Instructor[]>([]);
//   const [formData, setFormData] = useState({
//     employeeNumber: '',
//     firstName: '',
//     middleName: '',
//     lastName: '',
//     department: '',
//     email: '',
//     phoneNumber: '',
//     dateHired: '',
//     dob: '',
//   });

//   const fetchInstructors = async () => {
//     try {
//       const res = await fetch('/api/instructors');
//       const data: Instructor[] = await res.json();
//       if (Array.isArray(data)) {
//         setInstructors(data);
//       } else {
//         console.error('Unexpected instructor data:', data);
//       }
//     } catch (err) {
//       console.error('Error fetching instructors:', err);
//     }
//   };

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const { name, value } = e.target;
//     setFormData(prev => ({ ...prev, [name]: value }));
//   };

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     const res = await fetch('/api/instructors', {
//       method: 'POST',
//       headers: { 'Content-Type': 'application/json' },
//       body: JSON.stringify(formData),
//     });

//     if (res.ok) {
//       setFormData({
//         employeeNumber: '',
//         firstName: '',
//         middleName: '',
//         lastName: '',
//         department: '',
//         email: '',
//         phoneNumber: '',
//         dateHired: '',
//         dob: '',
//       });
//       fetchInstructors();
//     } else {
//       alert('Error creating instructor');
//     }
//   };

//   useEffect(() => {
//     fetchInstructors();
//   }, []);

//   return (
//     <div className="p-6">
//       <h1 className="text-2xl font-bold mb-4">Instructors Dashboard</h1>

//       <form onSubmit={handleSubmit} className="mb-6 grid grid-cols-2 gap-4 bg-gray-50 p-4 rounded shadow">
//         {[
//           ['employeeNumber', 'Employee Number'],
//           ['firstName', 'First Name'],
//           ['middleName', 'Middle Name'],
//           ['lastName', 'Last Name'],
//           ['department', 'Department'],
//           ['email', 'Email'],
//           ['phoneNumber', 'Phone Number'],
//           ['dateHired', 'Date Hired'],
//           ['dob', 'Date of Birth'],
//         ].map(([name, label]) => (
//           <input
//             key={name}
//             name={name}
//             placeholder={label}
//             value={(formData as any)[name]}
//             onChange={handleChange}
//             className="p-2 border rounded"
//             type={name === 'dateHired' || name === 'dob' ? 'date' : 'text'}
//             required={name !== 'middleName' && name !== 'department'}
//           />
//         ))}

//         <button type="submit" className="col-span-2 bg-blue-600 text-white py-2 rounded">
//           Add Instructor
//         </button>
//       </form>

//       <table className="w-full text-sm border">
//         <thead className="bg-gray-100 text-left">
//           <tr>
//             <th className="p-2 border">ID</th>
//             <th className="p-2 border">Name</th>
//             <th className="p-2 border">Email</th>
//             <th className="p-2 border">Phone</th>
//           </tr>
//         </thead>
//         <tbody>
//           {instructors.map((instructor) => (
//             <tr key={instructor.id} className="hover:bg-gray-50">
//               <td className="p-2 border">{instructor.id}</td>
//               <td className="p-2 border">{instructor.firstName} {instructor.lastName}</td>
//               <td className="p-2 border">{instructor.email}</td>
//               <td className="p-2 border">{instructor.phoneNumber}</td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// }

// Old functioning code

'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import Table from '@/components/Table';
import Pagination from '@/components/Pagination';
import TableSearch from '@/components/TableSearch';
import FormModal from '@/components/FormModal';

const role = 'admin'; // You can replace this with dynamic role checking

type Instructor = {
  id: number;
  employeeNumber: string;
  firstName: string;
  middleName?: string;
  lastName: string;
  department?: string;
  email: string;
  phoneNumber: string;
  dateHired: string;
  dob: string;
};

const columns = [
  { header: 'ID', accessor: 'id' },
  { header: 'Name', accessor: 'name' },
  { header: 'Email', accessor: 'email', className: 'hidden md:table-cell' },
  { header: 'Phone', accessor: 'phoneNumber', className: 'hidden lg:table-cell' },
  { header: 'Actions', accessor: 'actions' },
];

export default function InstructorsPage() {
  const [instructors, setInstructors] = useState<Instructor[]>([]);
  const [formData, setFormData] = useState({
    employeeNumber: '',
    firstName: '',
    middleName: '',
    lastName: '',
    department: '',
    email: '',
    phoneNumber: '',
    dateHired: '',
    dob: '',
  });

  const fetchInstructors = async () => {
    try {
      const res = await fetch('/api/instructors');
      const data: Instructor[] = await res.json();
      if (Array.isArray(data)) {
        setInstructors(data);
      } else {
        console.error('Unexpected instructor data:', data);
      }
    } catch (err) {
      console.error('Error fetching instructors:', err);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await fetch('/api/instructors', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    });

    if (res.ok) {
      setFormData({
        employeeNumber: '',
        firstName: '',
        middleName: '',
        lastName: '',
        department: '',
        email: '',
        phoneNumber: '',
        dateHired: '',
        dob: '',
      });
      fetchInstructors();
    } else {
      alert('Error creating instructor');
    }
  };

  useEffect(() => {
    fetchInstructors();
  }, []);

  const renderRow = (instructor: Instructor) => (
    <tr
      key={instructor.id}
      className="border-b border-gray-200 even:bg-slate-50 text-sm hover:bg-blue-50"
    >
      <td className="p-4">{instructor.id}</td>
      <td className="p-4">
        {instructor.firstName} {instructor.lastName}
      </td>
      <td className="hidden md:table-cell p-4">{instructor.email}</td>
      <td className="hidden lg:table-cell p-4">{instructor.phoneNumber}</td>
      <td className="p-4">
        <div className="flex gap-2">
          <Link href={`/instructors/${instructor.id}`}>
            <button className="w-7 h-7 flex items-center justify-center rounded-full bg-lamaSky">
              <Image src="/view.png" alt="View" width={16} height={16} />
            </button>
          </Link>
          {role === 'admin' && (
            <FormModal table="instructor" type="delete" id={instructor.id} />
          )}
        </div>
      </td>
    </tr>
  );

  return (
    <div className="bg-white p-4 rounded-md flex-1 m-4 mt-0">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-lg font-semibold">All Instructors</h1>
        <div className="flex items-center gap-4">
          <TableSearch />
          <button className="w-8 h-8 flex items-center justify-center rounded-full bg-lamaYellow">
            <Image src="/filter.png" alt="Filter" width={14} height={14} />
          </button>
          {role === 'admin' && (
            <FormModal table="instructor" type="create">
            <form onSubmit={handleSubmit} className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-4">
              {[
                ['employeeNumber', 'Employee Number'],
                ['firstName', 'First Name'],
                ['middleName', 'Middle Name'],
                ['lastName', 'Last Name'],
                ['department', 'Department'],
                ['email', 'Email'],
                ['phoneNumber', 'Phone Number'],
                ['dateHired', 'Date Hired'],
                ['dob', 'Date of Birth']
              ].map(([name, label]) => (
                <input
                  key={name}
                  name={name}
                  placeholder={label}
                  value={(formData as any)[name]}
                  onChange={handleChange}
                  className="p-2 border rounded"
                  type={name === 'dateHired' || name === 'dob' ? 'date' : 'text'}
                  required
                />
              ))}
          
              <button
                type="submit"
                className="sm:col-span-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold px-4 py-2 rounded"
              >
                Create Instructor
              </button>
            </form>
          </FormModal>
          
          )}
        </div>
      </div>

      {/* Table */}
      <Table columns={columns} renderRow={renderRow} data={instructors} />

      {/* Pagination */}
      <Pagination />
    </div>
  );
}
