"use client"; // Ensure this is at the top of your file

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';  // Change this import to use next/navigation
import Image from 'next/image';
import Link from 'next/link';

// Define the menu items structure
const menuItems = [
  {
    title: "MENU",
    items: [
      { icon: "/home.png", label: "Dashboard", href: "/dashboard", visible: ["admin", "instructor", "student"] },
      { icon: "/subject.png", label: "Apply for Admission", href: "/list/apply-admission", visible: ["student"] },
      { icon: "/subject.png", label: "Application Status", href: "/list/apply-admission2", visible: ["student"] },
      { icon: "/teacher.png", label: "Instructors", href: "/list/instructors", visible: ["admin", "instructor"] },
      { icon: "/student.png", label: "Students", href: "/students", visible: ["admin"] },
      { icon: "/student.png", label: "Students", href: "/list/students", visible: ["admin", "instructor"] },
      { icon: "/subject.png", label: "Programs", href: "/list/programs", visible: ["admin"] },
      { icon: "/class.png", label: "Courses", href: "/courses", visible: ["admin", "instructor"] },
      { icon: "/class.png", label: "Courses", href: "/list/courses", visible: ["student", "instructor"] },
      { icon: "/lesson.png", label: "Fees", href: "/fees", visible: ["admin"] },     
      { icon: "/result.png", label: "Fees", href: "/list/fees", visible: ["student"] },
      { icon: "/message.png", label: "Messages", href: "/list/messages", visible: ["admin", "instructor", "student"] },
      { icon: "/announcement.png", label: "Announcements", href: "/list/announcements", visible: ["admin", "instructor", "student"] },
    ],
  },
  {
    title: "OTHER",
    items: [
      { icon: "/profile.png", label: "Profile", href: "/profile", visible: ["admin", "instructor", "student"] },
      { icon: "/setting.png", label: "Settings", href: "/settings", visible: ["admin", "instructor", "student"] },
      { icon: "/logout.png", label: "Logout", href: "#", visible: ["admin", "instructor", "student"], onClick: true },
    ],
  },
];

const Menu = () => {
  const [role, setRole] = useState<string>('');
  const [mounted, setMounted] = useState<boolean>(false); // State to track if the component is mounted
  const router = useRouter(); // Initialize useRouter

  useEffect(() => {
    setMounted(true); // Set mounted to true after the component has mounted
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
    <div className="mt-4 text-sm">
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
                  className="flex items-center justify-center lg:justify-start gap-4 text-gray-500 py-2 md:px-2 rounded-md hover:bg-lamaSkyLight"
                >
                  <Image src={item.icon} alt={item.label} width={20} height={20} />
                  <span className="hidden lg:block">{item.label}</span>
                </Link>
              )
            ))}
        </div>
      ))}
    </div>
  );
};

export default Menu;
