"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";

// Lucide icons imports
import {
  Home,
  User,
  Users,
  BadgeCheck,
  BookOpen,
  GraduationCap,
  FileText,
  DollarSign,
  CalendarDays,
  UserPlus,
  LogOut,
} from "lucide-react";

const menuItems = [
  {
    title: "MENU",
    items: [
      { icon: <Home size={18} />, label: "Dashboard", href: "/admin", visible: ["admin"] },
      { icon: <Users size={18} />, label: "Students", href: "/list/studentList", visible: ["admin"] },
      { icon: <BadgeCheck size={18} />, label: "Application Approval", href: "/list/studentApproval", visible: ["admin"] },
      { icon: <User size={18} />, label: "Instructors", href: "/list/instructors", visible: ["admin"] },
      { icon: <BookOpen size={18} />, label: "Programs", href: "/programs", visible: ["admin"] },
      { icon: <GraduationCap size={18} />, label: "Courses", href: "/list/courses", visible: ["admin"] },
      { icon: <FileText size={18} />, label: "Fees", href: "/fees", visible: ["admin"] },
      { icon: <DollarSign size={18} />, label: "Payments", href: "/list/payments", visible: ["admin"] },
      { icon: <CalendarDays size={18} />, label: "Course Schedule", href: "/list/schedule", visible: ["admin"] },

      { icon: <User size={18} />, label: "My Account", href: "/student", visible: ["student"] },
      { icon: <BadgeCheck size={18} />, label: "Apply for Admission", href: "/list/apply-admission", visible: ["student"] },
      { icon: <FileText size={18} />, label: "Application Status", href: "/list/apply-admission2", visible: ["student"] },
      { icon: <GraduationCap size={18} />, label: "Courses", href: "/list/courses", visible: ["student"] },
      { icon: <FileText size={18} />, label: "Fees", href: "/list/fees", visible: ["student"] },
    ],
  },

  {
    title: "OTHER",
    items: [
      { icon: "/profile.png", label: "Add New Employee", href: "/list/addNewEmployee", visible: ["admin"] },
      { icon: "/setting.png", label: "Add New User", href: "/list/addNewUser", visible: ["admin"] },
      { icon: "/profile.png", label: "Profile", href: "/list/profile", visible: ["admin", "instructor", "student"] },
      { icon: "/logout.png", label: "Logout", href: "#", visible: ["admin", "instructor", "student"], onClick: true },
    ],
  },
];

const Menu = () => {
  const [role, setRole] = useState<string>('');
  const [mounted, setMounted] = useState<boolean>(false); // State to track if the component is mounted
  const router = useRouter(); // Initialize useRouter

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (mounted) {
      const token = localStorage.getItem("token");
      if (token) {
        const decodedToken: any = JSON.parse(atob(token.split('.')[1])); // Decode token manually
        setRole(decodedToken.role); // Set the role from decoded token
      }
    }
  }, [mounted]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    router.push('/sign-in'); // Redirect to login page
  };

  return (
    <div className="h-full bg-[#151C34] text-white p-4">
      {/* School Logo */}
      <div className="flex items-center justify-center lg:justify-start mb-6 gap-2">
        <Image src="/school-logo-white.png" alt="logo" width={40} height={40} />
        <span className="hidden lg:block font-bold text-white text-xl">EEFCI</span>
      </div>

      {menuItems.map((menu) => (
        <div className="flex flex-col gap-2" key={menu.title}>
          <span className="hidden lg:block text-gray-400 font-light my-4">{menu.title}</span>
          {menu.items
            .filter((item) => item.visible.includes(role)) // Filter items based on role
            .map((item) => (
              item.onClick ? (
                <button
                  key={item.label}
                  onClick={handleLogout}  // Call handleLogout on click
                  className="flex items-center justify-center lg:justify-start gap-4 text-gray-500 py-2 md:px-2 rounded-md hover:bg-lamaSkyLight"
                >
                  <Image src={item.icon} alt={item.label} width={20} height={20} />
                  <span className="hidden lg:block">{item.label}</span>
                </button>
              ) : (
                <Link
                  href={item.href}
                  key={item.label}
                  className="flex items-center gap-4 text-gray-300 py-2 px-2 rounded-md hover:bg-[#2A2F4D]"
                >
                  <Image src={item.icon} alt={item.label} width={20} height={20} />
                  <span className="hidden lg:block">{item.label}</span>
                </Link>
              )
            )}
        </div>
      ))}
    </div>
  );
};

export default Menu;
