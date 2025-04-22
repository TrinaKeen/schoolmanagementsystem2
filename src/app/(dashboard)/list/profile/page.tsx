// "use client";
// import { useEffect, useState } from 'react';

// const Dashboard = () => {
//   const [user, setUser] = useState<any>(null);

//   useEffect(() => {
//     const userId = localStorage.getItem('userId');
//     const role = localStorage.getItem('role');

//     if (!userId || !role) {
//       window.location.href = '/signin';
//       return;
//     }

//     // Fetch full user info
//     fetch(`/api/profile?userId=${userId}`)
//       .then(res => res.json())
//       .then(data => {
//         if (data.user) {
//           setUser(data.user);
//         } else {
//           alert(data.error || 'Failed to load profile');
//         }
//       })
//       .catch(err => {
//         console.error(err);
//         alert("Something went wrong.");
//       });
//   }, []);

//   const changePassword = async () => {
//     const email = prompt("Enter your email:");
//     const currentPassword = prompt("Enter your current password:");
//     const newPassword = prompt("Enter your new password:");

//     if (!email || !currentPassword || !newPassword) {
//       alert("All fields are required.");
//       return;
//     }

//     try {
//       const res = await fetch('/api/profile', {
//         method: 'PUT',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({ email, currentPassword, newPassword }),
//       });

//       const data = await res.json();
//       alert(res.ok ? data.message : `Error: ${data.error}`);
//     } catch (err) {
//       alert("Something went wrong. Please try again.");
//     }
//   };

//   const renderRoleDetails = () => {
//     if (!user) return null;

//     const { role, student, instructor, admin } = user;

//     if (role === 'student' && student) {
//       return (
//         <div>
//           <h3>Student Details</h3>
//           <p><strong>Name:</strong> {student.firstName} {student.lastName}</p>
//           <p><strong>Email:</strong> {student.email}</p>
//           <p><strong>Phone:</strong> {student.phoneNumber}</p>
//           <p><strong>Address:</strong> {student.homeAddress}</p>
//         </div>
//       );
//     }

//     if (role === 'instructor' && instructor) {
//       return (
//         <div>
//           <h3>Instructor Details</h3>
//           <p><strong>Name:</strong> {instructor.firstName} {instructor.lastName}</p>
//           <p><strong>Email:</strong> {instructor.email}</p>
//           <p><strong>Department:</strong> {instructor.department}</p>
//           <p><strong>Phone:</strong> {instructor.phoneNumber}</p>
//         </div>
//       );
//     }

//     if (role === 'admin' && admin) {
//       return (
//         <div>
//           <h3>Admin Details</h3>
//           <p><strong>Name:</strong> {admin.firstName} {admin.lastName}</p>
//           <p><strong>Email:</strong> {admin.email}</p>
//           <p><strong>Phone:</strong> {admin.phoneNumber}</p>
//         </div>
//       );
//     }

//     return <p>No additional details available.</p>;
//   };

//   if (!user) return <p>Loading...</p>;

//   return (
//     <div style={{ padding: '2rem' }}>
//       <h1>My Profile</h1>
//       <div style={{ marginTop: '1rem' }}>
//         <p><strong>User ID:</strong> {user.id}</p>
//         <p><strong>Username:</strong> {user.username}</p>
//         <p><strong>Email:</strong> {user.email}</p>
//         <p><strong>Role:</strong> {user.role}</p>
//       </div>

//       <div style={{ marginTop: '2rem' }}>
//         {renderRoleDetails()}
//       </div>

//       <button
//         onClick={changePassword}
//         style={{
//           marginTop: '2rem',
//           padding: '0.5rem 1rem',
//           backgroundColor: '#0070f3',
//           color: 'white',
//           border: 'none',
//           borderRadius: '4px',
//           cursor: 'pointer'
//         }}
//       >
//         Change Password
//       </button>
//     </div>
//   );
// };

// export default Dashboard;

"use client";
import { useEffect, useState } from "react";
import { FaUser } from "react-icons/fa";
import {
  Modal,
  Button,
  TextInput,
  PasswordInput,
  Group,
  Text,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";

const Dashboard = () => {
  const [user, setUser] = useState<any>(null);
  const [opened, { open, close }] = useDisclosure(false);
  const [email, setEmail] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");

  useEffect(() => {
    const userId = localStorage.getItem("userId");
    const role = localStorage.getItem("role");

    if (!userId || !role) {
      window.location.href = "/signin";
      return;
    }

    fetch(`/api/profile?userId=${userId}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.user) {
          setUser(data.user);
          setEmail(data.user.email); // auto-fill email
        } else {
          alert(data.error || "Failed to load profile");
        }
      })
      .catch((err) => {
        console.error(err);
        alert("Something went wrong.");
      });
  }, []);

  const handlePasswordChange = async () => {
    if (!email || !currentPassword || !newPassword) {
      alert("Please fill in all fields.");
      return;
    }

    try {
      const res = await fetch("/api/profile", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, currentPassword, newPassword }),
      });

      const data = await res.json();
      alert(res.ok ? data.message : `Error: ${data.error}`);
      if (res.ok) {
        close();
        setCurrentPassword("");
        setNewPassword("");
      }
    } catch {
      alert("Something went wrong. Please try again.");
    }
  };

  const renderRoleDetails = () => {
    if (!user) return null;

    const { role, student, instructor, admin } = user;

    const blockClass =
      "bg-gray-50 border border-gray-200 p-4 rounded-md shadow-sm";

    if (role === "student" && student) {
      return (
        <div className={blockClass}>
          <h3 className="text-lg font-semibold mb-2 text-blue-600">
            Student Info
          </h3>
          <p>
            <strong>Name:</strong> {student.firstName}{" "}
            {student.middleName ? `${student.middleName} ` : ""}
            {student.lastName}
          </p>
        </div>
      );
    }

    if (role === "instructor" && instructor) {
      return (
        <div className={blockClass}>
          <h3 className="text-lg font-semibold mb-2 text-purple-600">
            Instructor Info
          </h3>
          <p>
            <strong>Name:</strong> {instructor.firstName}{" "}
            {instructor.middleName ? `${instructor.middleName} ` : ""}
            {instructor.lastName}
          </p>
        </div>
      );
    }

    if (role === "admin" && admin) {
      return (
        <div className={blockClass}>
          <h3 className="text-lg font-semibold mb-2 text-green-600">
            Admin Info
          </h3>
          <p>
            <strong>Name:</strong> {admin.firstName}{" "}
            {admin.middleName ? `${admin.middleName} ` : ""}
            {admin.lastName}
          </p>
          z
        </div>
      );
    }

    return <p>No additional details available.</p>;
  };

  if (!user)
    return (
      <p className="text-center mt-10 text-gray-500">Loading profile...</p>
    );

  return (
    <div className="max-w-3xl mx-auto p-6">
      <div className="bg-white p-6 rounded-lg shadow-md">
        <div className="flex items-center gap-4 mb-6">
          <FaUser size={60} className="text-gray-400" />
          <div>
            <h1 className="text-2xl font-bold">Welcome, {user.username}!</h1>
            <p className="text-sm text-gray-500">Role: {user.role}</p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm text-gray-700">
          <p>
            <strong>User ID:</strong> {user.id}
          </p>
          <p>
            <strong>Email:</strong> {user.email}
          </p>
        </div>

        <div className="mt-6">{renderRoleDetails()}</div>

        <div className="mt-6">
          <Button onClick={open} color="blue">
            Change Password
          </Button>
        </div>
      </div>

      {/* Modal */}
      <Modal opened={opened} onClose={close} title="Change Password" centered>
        <TextInput
          label="Email"
          value={email}
          onChange={(e) => setEmail(e.currentTarget.value)}
          required
        />
        <PasswordInput
          label="Current Password"
          value={currentPassword}
          onChange={(e) => setCurrentPassword(e.currentTarget.value)}
          required
          mt="md"
        />
        <PasswordInput
          label="New Password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.currentTarget.value)}
          required
          mt="md"
        />
        <Group justify="flex-end" mt="lg">
          <Button variant="default" onClick={close}>
            Cancel
          </Button>
          <Button color="blue" onClick={handlePasswordChange}>
            Save
          </Button>
        </Group>
      </Modal>
    </div>
  );
};

export default Dashboard;
