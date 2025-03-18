"use client";
import { useState } from 'react';
import { FaBars, FaChevronDown, FaChevronRight, FaHome, FaUser, FaBook, FaMoneyBill, FaCog } from "react-icons/fa";
import styles from './Sidebar2.css'; // Import the CSS module

export default function SidebarWithToggle() {
    const [isOpen, setIsOpen] = useState(true);
    const [activeMenu, setActiveMenu] = useState(null);
    const [hoveredMenu, setHoveredMenu] = useState(null);

    const toggleSidebar = () => {
        setIsOpen(!isOpen);
    };

    const toggleMenu = (menu) => {
        setActiveMenu(activeMenu === menu ? null : menu);
    };

    const menuItems = [
        { title: 'Dashboard', icon: <FaHome /> },
        { title: 'Students', icon: <FaUser />, submenu: ['All Students', 'Student Details', 'Admission Request', 'Admission Form'] },
        { title: 'Instructor', icon: <FaUser />, submenu: ['All Instructors', 'Instructor Details', 'Add New Instructor'] },
        { title: 'Fees', icon: <FaMoneyBill />, submenu: ['All Fees', 'Add New Fees'] },
        { title: 'Programs', icon: <FaBook />, submenu: ['Add/Update Programs'] },
        { title: 'Courses', icon: <FaBook />, submenu: ['All Courses', 'Add/Update Courses'] },
        { title: 'Account Setting', icon: <FaCog /> }
    ];

    return (
        <div className={styles['sidebar-container']}>
            {/* Sidebar */}
            <div className={`${styles.sidebar} ${isOpen ? '' : styles.sidebarClosed}`}>
                <div className={styles.sidebarHeader}>
                    <span className={styles.sidebarTitle}>{isOpen ? 'EFFCI' : ''}</span>
                    <button onClick={toggleSidebar} className={styles.sidebarToggleButton}>
                        <FaBars className="w-6 h-6" />
                    </button>
                </div>
                <nav className={styles.sidebarNav}>
                    {menuItems.map((item, index) => (
                        <div key={index} className={styles.sidebarMenuItem}>
                            <div
                                className={styles.sidebarMenuLink}
                                onClick={() => item.submenu && toggleMenu(item.title)}
                                onMouseEnter={() => setHoveredMenu(item.title)}
                            >
                                <span className="mr-2">{item.icon}</span>
                                {isOpen && <span>{item.title}</span>}
                                {item.submenu && isOpen && (
                                    <span className="ml-auto">{activeMenu === item.title ? <FaChevronDown /> : <FaChevronRight />}</span>
                                )}
                            </div>
                            {item.submenu && (activeMenu === item.title || (!isOpen && hoveredMenu === item.title)) && (
                                <div className={styles.submenu}>
                                    {item.submenu.map((subitem, subindex) => (
                                        <a key={subindex} href="#" className={styles.submenuLink}>
                                            {subitem}
                                        </a>
                                    ))}
                                </div>
                            )}
                        </div>
                    ))}
                </nav>
            </div>

            {/* Main Content */}
            <div
                className={`${styles['main-content']} ${isOpen ? styles['main-contentWithSidebarOpen'] : styles['main-contentWithSidebarClosed']}`}
            >
                {/* Add your main content here */}
            </div>
        </div>
    );
}
