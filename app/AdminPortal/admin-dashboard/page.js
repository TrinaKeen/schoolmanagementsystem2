"use client";

import { useState } from "react";
import {
  FaBars,
  FaChevronDown,
  FaChevronRight,
  FaHome,
  FaUser,
  FaBook,
  FaMoneyBill,
  FaCog,
  FaSignOutAlt ,
} from "react-icons/fa";
import Image from "next/image";
import Link from 'next/link';  
import teacherlogo from "/src/teachericon.png";
import studentlogo from "/src/studentlogo.png";
import courseslogo from "/src/courseslogo.png";
import departmentslogo from "/src/departmentslogo.png";
import studentfeeslogo from "/src/studentfeeslogo.png";
import reportlogo from "/src/reportlogo.png";
import styles from '../components/AdminDashboard.module.css';

export default function AdminDashboard() {
  const [isOpen, setIsOpen] = useState(true);
  const [activeMenu, setActiveMenu] = useState(null);
  const [hoveredMenu, setHoveredMenu] = useState(null);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const toggleMenu = (menu) => {
    setActiveMenu(activeMenu === menu ? null : menu);
  };

  const handleLogout = () => {
    router.push("/");  // Redirect to the homepage
  };

  const menuItems = [
    { title: "Dashboard", icon: <FaHome />, link: "/dashboard" },
    {
      title: "Students",
      icon: <FaUser />,
      submenu: [
        { title: "All Students", link: "/students" },
        { title: "Student Details", link: "/students/details" },
        { title: "Admission Request", link: "/students/admission" },
        { title: "Admission Form", link: "/students/admission-form" },
      ],
    },
    { 
      title: "Instructor", 
      icon: <FaUser />, 
      submenu: [
        { title: "All Instructors", link: "/instructors" },
        { title: "Instructor Details", link: "/instructors/details" },
        { title: "Add New Instructor", link: "/instructors/add" }
      ] 
    },
    { title: "Fees", icon: <FaMoneyBill />, submenu: [{ title: "All Fees", link: "/fees" }, { title: "Add New Fees", link: "/fees/add" }] },
    { title: "Programs", icon: <FaBook />, submenu: [{ title: "Add/Update Programs", link: "/programs" }] },
    { title: "Courses", icon: <FaBook />, submenu: [{ title: "All Courses", link: "/courses" }, { title: "Add/Update Courses", link: "/courses/add" }] },
    { title: "Account Setting", icon: <FaCog />, link: "/account-settings" },
    { 
        title: "Log Out", 
  icon: <FaSignOutAlt />, 
  link: "/logout"  //Attach the logout function here
      },
  ];

  return (
    <div className="flex">
      <div className={`bg-gray-800 text-white transition-all duration-300 ${isOpen ? "w-72" : "w-20"}`}>
        {/* Sidebar Header */}
        <div className="p-4 flex justify-between items-center bg-gray-900 border-b-2 border-gray-600">
          <span className="text-xl font-bold">{isOpen ? "EEFCI" : ""}</span>
          <button onClick={toggleSidebar} className="p-2">
            <FaBars className="w-6 h-6" />
          </button>
        </div>

        {/* Sidebar Menu */}
        <nav className="p-4 space-y-2 relative">
          {menuItems.map((item, index) => (
            <div key={index} className="relative group border-b-2 border-gray-600">
              <div
                className="flex items-center p-2 hover:bg-gray-700 rounded cursor-pointer"
                onClick={() => item.submenu && toggleMenu(item.title)}
                onMouseEnter={() => setHoveredMenu(item.title)}
              >
                <span className="mr-2">{item.icon}</span>
                {isOpen && <span>{item.title}</span>}
                {item.submenu && isOpen && (
                  <span className="ml-auto">{activeMenu === item.title ? <FaChevronDown /> : <FaChevronRight />}</span>
                )}
              </div>


              {/* Submenu Links */}
              {item.submenu && (activeMenu === item.title || (!isOpen && hoveredMenu === item.title)) && (
                <div className={`pl-8 space-y-1 ${isOpen ? "" : "absolute left-full top-0 bg-gray-800 p-2 rounded shadow-lg"}`}>
                  {item.submenu.map((subitem, subindex) => (
                    <Link key={subindex} href={subitem.link}>
                      <div className="block p-2 hover:bg-gray-700 rounded">
                        {subitem.title}
                      </div>
                    </Link>
                  ))}
                </div>
              )}
             
            </div>
          ))}
        </nav>
      </div>



      {/* Main Content */}
      <div className={styles.container}>
      <main className={styles['main-content']}>
        <h2>Welcome to the Super Admin Account</h2>
        <p>Manage your school's daily activities, student records, teacher assignments, and more.</p>

        <div className={styles['grid-container']}>
          <div className={styles.card}>
            <Image src={studentlogo} alt="Student Logo" width={200} height={200} />
            <h3>Student Management</h3>
            <p>Manage student records and progress.</p>
            <Link href="../AdminPortal/StudentPage">Go to Student Management</Link>
          </div>

          <div className={styles.card}>
            <Image src={teacherlogo} alt="Teacher Logo" width={200} height={200} />
            <h3>Teacher Management</h3>
            <p>Manage teacher assignments and performance.</p>
            <Link href="../AdminPortal/TeacherPage">Go to Teacher Management</Link>
          </div>

          <div className={styles.card}>
            <Image src={departmentslogo} alt="Departments Logo" width={200} height={200} />
            <h3>School Departments</h3>
            <p>Organize class schedules and attendance.</p>
            <Link href="../AdminPortal/SchoolDepartment">Go to Departments Management</Link>
          </div>
        </div>


        <div className={styles['grid-container']}>
          <div className={styles.card}>
            <Image src={courseslogo} alt="Courses Logo" width={200} height={200} />
            <h3>Student Courses</h3>
            <p>Manage student records and progress.</p>
            <Link href="../AdminPortal/StudentCourses">Go to Student Courses Management</Link>
          </div>

          <div className={styles.card}>
            <Image src={studentfeeslogo} alt="Student Fees Logo" width={200} height={200} />
            <h3>Student Fees</h3>
            <p>Manage teacher assignments and performance.</p>
            <Link href="../AdminPortal/StudentFees">Go to Tuition Fees Management</Link>
          </div>

          <div className={styles.card}>
            <Image src={reportlogo} alt="Report Logo" width={200} height={200} />
            <h3>Reports</h3>
            <p>Organize class schedules and attendance.</p>
            <Link href="../AdminPortal/Reports">Go to Reports Management</Link>
          </div>
        </div>
      </main>
    </div>

    </div>
  );
}
