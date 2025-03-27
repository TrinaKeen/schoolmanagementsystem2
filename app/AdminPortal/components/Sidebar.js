import { useEffect, useState } from "react";
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
import { IoPeople } from "react-icons/io5";
import Link from "next/link";
import jwt from "jsonwebtoken"; // Ensure this import is present for decoding JWT

export default function Sidebar({ onLogout }) {
  const [activeMenu, setActiveMenu] = useState(null);
  const [employee, setEmployee] = useState(null);
  const router = useRouter();

  useEffect(() => {
    // Retrieve token from localStorage
    const token = localStorage.getItem("token");

    if (token) {
      const decoded = jwt.decode(token); // Decode token to get user data
      console.log("Received Employee Name:", decoded.fullName);
      console.log("Received Role:", decoded.role);
      console.log("Received Employee Number:", decoded.employeeNumber || "N/A");

      setEmployee({
        full_name: decoded.fullName,
        role: decoded.role,
        employee_number: decoded.employeeNumber || "N/A",
        loginTimestamp: new Date().toLocaleString(), // You can replace this with a real login timestamp if needed
      });
    }
  }, []);

  const toggleMenu = (menu) => {
    setActiveMenu(activeMenu === menu ? null : menu);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("employeeNumber"); // Remove employee ID on logout
    localStorage.removeItem("loginTimestamp");
    router.push("/"); // Redirect to the home page or login page
  };

  const menuItems = [
    {
      title: "Dashboard",
      icon: <FaHome />,
      action: () => router.push("/AdminPortal/admin-dashboard"),
    },
    {
      title: "Students",
      icon: <FaUser />,
      submenu: [
        {
          title: "All Students",
          link: "/AdminPortal/StudentPage/approved-students",
        },
        {
          title: "Approved Students",
          link: "/AdminPortal/StudentPage/studentList",
        },
        {
          title: "Admission Request",
          link: "/AdminPortal/StudentPage/admission-approvals",
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
      title: "Employees",
      icon: <IoPeople />,
      submenu: [
        {
          title: "All Employees",
          link: "/AdminPortal/admin-settings/allEmployees",
        },
        {
          title: "Add New Employees",
          link: "/AdminPortal/admin-settings",
        },
      ],
    },
    {
      title: "Fees",
      icon: <FaMoneyBill />,
      submenu: [
        { title: "All Fees", link: "/AdminPortal/StudentFees" },
        { title: "Add Course Fees", link: "/AdminPortal/AddCourseFee" },
        { title: "Add Students Fees", link: "/AdminPortal/AddMiscFee" },
      ],
    },
    {
      title: "Programs",
      icon: <FaBook />,
      action: () => router.push("/AdminPortal/SchoolDepartment"),
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
    { title: "Log Out", icon: <FaSignOutAlt />, action: handleLogout },
  ];

  return (
    <div className="flex fixed h-full">
      <div className="bg-gray-800 text-white w-72 h-full flex flex-col">
        {/* Sidebar Header */}
        <div className="p-4 bg-gray-900 border-b-2 border-gray-600 flex items-center space-x-3">
          <img
            src="/school-logo.png"
            alt="logo"
            className="h-10 w-10 object-contain"
          />
          <span className="text-xl font-bold">EEFCI</span>
        </div>

        {/* Employee Info Section */}
        {employee && (
          <div className="p-4 bg-gray-800 text-white border-b-2 border-gray-600">
            <div className="text-lg font-semibold">
              Welcome, {employee.full_name}
            </div>
            <div className="text-sm">
              Employee #: {employee.employee_number}
            </div>
            <div className="text-sm">Role: {employee.role}</div>{" "}
            {/* Added role */}
            <div className="text-sm">Last Login: {employee.loginTimestamp}</div>
          </div>
        )}

        {/* Sidebar Menu */}
        <div className="flex-grow overflow-y-auto">
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
    </div>
  );
}
