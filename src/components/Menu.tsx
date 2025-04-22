"use client"; // Ensure this is at the top of your file

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation"; // Change this import to use next/navigation
import Image from "next/image";
import Link from "next/link";
import {
  Home,
  GraduationCap,
  FileText,
  BookOpen,
  Users,
  Banknote,
  Calendar,
  CircleUserRound,
  LogOut,
  UserPlus,
  Settings,
  BadgeCheck,
  ClipboardList,
} from "lucide-react";

// Define the menu items structure
const menuItems = [
  {
    title: "MENU",
    items: [
      {
        icon: <Home size={18} />,
        label: "Dashboard",
        href: "/admin",
        visible: ["admin"],
      },
      {
        icon: <Users size={18} />,
        label: "Students",
        href: "/list/studentList",
        visible: ["admin"],
      },
      {
        icon: <ClipboardList size={18} />,
        label: "Application Approval",
        href: "/list/studentApproval",
        visible: ["admin"],
      },
      {
        icon: <GraduationCap size={18} />,
        label: "Instructors",
        href: "/list/instructors",
        visible: ["admin"],
      },
      {
        icon: <FileText size={18} />,
        label: "Programs",
        href: "/programs",
        visible: ["admin"],
      },
      {
        icon: <BookOpen size={18} />,
        label: "Courses",
        href: "/list/courses",
        visible: ["admin"],
      },
      { icon: <Banknote size={18} />, label: "Fees", href: "/fees", visible: ["admin"] },
      {
        icon: <Banknote size={18} />,
        label: "Payments",
        href: "/list/payments",
        visible: ["admin"],
      },
      {
        icon: <Calendar size={18} />,
        label: "Course Schedule",
        href: "/list/schedule",
        visible: ["admin"],
      },

      {
        icon: <Home size={18} />,
        label: "My Account",
        href: "/student",
        visible: ["student"],
      },
      {
        icon: <FileText size={18} />,
        label: "Apply for Admission",
        href: "/list/apply-admission",
        visible: ["student"],
      },


      {
        icon: <Banknote size={18} />,
        label: "Fees",
        href: "/list/fees",
        visible: [""],
      },
    ],
  },

  {
    title: "OTHER",
    items: [
      {
        icon: <UserPlus size={18} />,
        label: "Add New Employee",
        href: "/list/addNewEmployee",
        visible: ["admin"],
      },
      {
        icon: <Settings size={18} />,
        label: "Add New User",
        href: "/list/addNewUser",
        visible: ["admin"],
      },
      {
        icon: <CircleUserRound size={18} />,
        label: "Profile",
        href: "/list/profile",
        visible: ["admin", "instructor", "student"],
      },
      {
        icon: <LogOut size={18} />,
        label: "Logout",
        href: "#",
        visible: ["admin", "instructor", "student"],
        onClick: true,
      },
    ],
  },
];

const Menu = () => {
  const [role, setRole] = useState<string>("");
  const [mounted, setMounted] = useState<boolean>(false); // State to track if the component is mounted
  const router = useRouter(); // Initialize useRouter

  useEffect(() => {
    setMounted(true); // Set mounted to true after the component has mounted
  }, []);

  useEffect(() => {
    if (mounted) {
      const token = localStorage.getItem("token");
      if (token) {
        const decodedToken: any = JSON.parse(atob(token.split(".")[1])); // Decode token manually
        setRole(decodedToken.role); // Set the role from decoded token
      }
    }
  }, [mounted]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    router.push("/sign-in"); // Redirect to login page
  };

  return (
    <div className="h-full bg-[#152238] text-white px-4 py-6 text-sm">
      {/* Logo Section */}
      <div className="flex items-center justify-center lg:justify-start gap-2 mb-6">
        <Image src="/school-logo-white.png" alt="logo" width={40} height={40} />
        <span className="text-white text-lg font-bold hidden lg:inline">EEFCI</span>
      </div>

      {/* Menu Sections */}
      {menuItems.map((menu) => (
        <div className="flex flex-col gap-2 mb-6" key={menu.title}>
          <span className="text-gray-400 font-light text-xs">{menu.title}</span>
          {menu.items
            .filter((item) => item.visible.includes(role))
            .map((item) =>
              item.onClick ? (
                <button
                  key={item.label}
                  onClick={handleLogout}
                  className="flex items-center justify-center lg:justify-start gap-4 text-white/80 py-2 px-2 rounded-md hover:bg-[#4A5568] transition"
                >
                  {item.icon}
                  <span className="hidden lg:block">{item.label}</span>
                </button>
              ) : (
                <Link
                  href={item.href}
                  key={item.label}
                  className="flex items-center justify-center lg:justify-start gap-4 text-white/80 py-2 px-2 rounded-md hover:bg-[#4A5568] transition"
                >
                  {item.icon}
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