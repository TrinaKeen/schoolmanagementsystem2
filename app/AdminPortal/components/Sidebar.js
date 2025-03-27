"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  FaChevronDown,
  FaChevronRight,
  FaHome,
  FaUser,
  FaBook,
  FaMoneyBill,
  FaCog,
  FaSignOutAlt,
} from "react-icons/fa";
import Link from "next/link";

export default function Sidebar({ onLogout }) {
  const [activeMenu, setActiveMenu] = useState(null);
  const router = useRouter();

  const toggleMenu = (menu) => {
    setActiveMenu(activeMenu === menu ? null : menu);
  };

  const handleLogout = () => {
    router.push("/LogIn/AdminLogin");
  };

  const handleProgram = () => {
    router.push("/AdminPortal/SchoolDepartment");
  };

  const handleDashboard = () => {
    router.push("/AdminPortal/admin-dashboard");
  };

  const handleAccountSettings = () => {
    router.push("/AdminPortal/admin-settings");
  };

  const menuItems = [
    {
      title: "Dashboard",
      icon: <FaHome />,
      action: handleDashboard,
    },
    {
      title: "Students",
      icon: <FaUser />,
      submenu: [
        { title: "All Students", link: "/AdminPortal/StudentPage/studentList" },
        { title: "Admission Request", link: "/AdminPortal/StudentPage" },
        {
          title: "Admission Form",
          link: "/AdminPortal/StudentPage/admission-form",
        },
      ],
    },
    {
      title: "Instructor",
      icon: <FaUser />,
      submenu: [
        { title: "All Instructors", link: "/AdminPortal/TeacherPage" },
        {
          title: "Add New Instructor",
          link: "/AdminPortal/TeacherPage/addInstructor",
        },
      ],
    },
    {
      title: "Fees",
      icon: <FaMoneyBill />,
      submenu: [
        { title: "All Fees", link: "/AdminPortal/StudentFees" },
        { title: "Add Course Fees", link: "/AdminPortal/AddCourseFee" },
        { title: "Add Misc Fee", link: "/AdminPortal/AddMiscFee" }, 
      ],
    },
    {
      title: "Programs",
      icon: <FaBook />,
      action: handleProgram,
    },
    {
      title: "Courses",
      icon: <FaBook />,
      submenu: [
        { title: "All Courses", link: "/AdminPortal/StudentCourses" },
        {
          title: "Add Courses",
          link: "/AdminPortal/StudentCourses/addStudentCourses",
        },
      ],
    },
    {
      title: "Account Setting",
      icon: <FaCog />,
      action: handleAccountSettings,
    },
    {
      title: "Log Out",
      icon: <FaSignOutAlt />,
      action: handleLogout,
    },
  ];

  return (
    <div className="flex fixed h-full">
      <div className="bg-gray-800 text-white w-72 transition-all duration-300">
        {/* Sidebar Header */}
        <div className="p-4 bg-gray-900 border-b-2 border-gray-600 flex items-center space-x-3">
          <img
            src="/school-logo.png"
            alt="logo"
            className="h-10 w-10 object-contain"
          />
          <span className="text-xl font-bold">EEFCI</span>
        </div>

        {/* Sidebar Menu */}
        <nav className="p-4 space-y-2">
          {menuItems.map((item, index) => (
            <div key={index} className="relative border-b-2 border-gray-600">
              <div
                className="flex items-center p-2 hover:bg-gray-700 rounded cursor-pointer"
                onClick={() =>
                  item.submenu
                    ? toggleMenu(item.title)
                    : item.action
                    ? item.action()
                    : null
                }
              >
                <span className="mr-2">{item.icon}</span>
                <span>{item.title}</span>
                {item.submenu && (
                  <span className="ml-auto">
                    {activeMenu === item.title ? (
                      <FaChevronDown />
                    ) : (
                      <FaChevronRight />
                    )}
                  </span>
                )}
              </div>

              {/* Submenu Links */}
              {item.submenu && activeMenu === item.title && (
                <div className="pl-8 space-y-1">
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
    </div>
  );
}
