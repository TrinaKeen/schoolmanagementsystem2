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
import Link from 'next/link';  


export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(true);
  const [activeMenu, setActiveMenu] = useState(null);
  const [hoveredMenu, setHoveredMenu] = useState(null);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
    
    // When collapsing the sidebar, close all dropdowns
    if (!isOpen) {
      setActiveMenu(null);
    }
  };

  const toggleMenu = (menu) => {
    // ✅ Only allow dropdowns if sidebar is open
    if (isOpen) {
      setActiveMenu(activeMenu === menu ? null : menu);
    }
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
      </div>    </div>
  );
}

