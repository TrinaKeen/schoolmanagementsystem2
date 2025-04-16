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
      { icon: "/home.png", label: "Dashboard", href: "/admin", visible: ["admin"] },
      { icon: "/student.png", label: "Students", href: "/list/studentList", visible: ["admin"] },
      { icon: "/subject.png", label: "Application Approval", href: "/list/studentApproval", visible: ["admin"] },
      { icon: "/teacher.png", label: "Instructor", href: "/list/instructors", visible: ["admin"] },
      { icon: "/subject.png", label: "Programs", href: "/programs", visible: ["admin"] },
      { icon: "/class.png", label: "Courses", href: "/list/courses", visible: ["admin"] },
      { icon: "/lesson.png", label: "Fees", href: "/fees", visible: ["admin"] }, 

     
      { icon: "/home.png", label: "My Account", href: "/student", visible: ["student"] },
      { icon: "/subject.png", label: "Apply for Admission", href: "/list/apply-admission", visible: ["student"] },
      { icon: "/subject.png", label: "Application Status", href: "/list/apply-admission2", visible: ["student"] },
      { icon: "/class.png", label: "Courses", href: "/list/courses", visible: ["student"] },
      { icon: "/result.png", label: "Fees", href: "/list/fees", visible: ["student"] },
      

    ],
  },

  {
    title: "OTHER",
    items: [
      { icon: "/profile.png", label: "Add New Employee", href: "/list/addNewEmployee", visible: ["admin"] },
      { icon: "/setting.png", label: "Add New User", href: "/list/addNewUser", visible: ["admin"] },
      { icon: "/profile.png", label: "Profile", href: "/profile", visible: ["admin", "instructor", "student"] },
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
