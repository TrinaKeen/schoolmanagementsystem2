// Asked chatgpt to create a next.js sidebar component for a student management system: grade 11, 12, Midwifery, Teacher Education
// CSS referenced from Emily's sidebar

import Link from 'next/link'; 
import { useEffect, useState } from 'react'; 
import styles from './components.module.css'; 

// Sidebar component for navigation within the student courses section
const Sidebar = () => {
    const [activePath, setActivePath] = useState('');
    // `useState` initializes `activePath` as an empty string.
    // `activePath` stores the current active page path to determine which link is highlighted.
    // `setActivePath` is used to update the state whenever the page path changes.

    useEffect(() => {
        setActivePath(window.location.pathname);
        // `useEffect` runs once after the component mounts.
        // It retrieves the current URL path from `window.location.pathname` and updates `activePath`.
        // This ensures that the correct link is highlighted when the page loads.
    }, []);
    // The empty dependency array `[]` means this effect runs only once after the initial render.
    
    return (
        <div className={styles.sidebar}>
            <h2>Student Courses</h2>
            <ul>
                <li>
                    <Link
                        href="/AdminPortal/StudentCourses/grade11"
                        className={activePath === '/AdminPortal/StudentCourses/grade11' ? styles.active : ''}
                    >
                        Senior High School Grade 11
                    </Link>
                </li>
                <li>
                    <Link
                        href="/AdminPortal/StudentCourses/grade12"
                        className={activePath === '/AdminPortal/StudentCourses/grade12' ? styles.active : ''}
                    >
                        Senior High School Grade 12
                    </Link>
                </li>
                <li>
                    <Link
                        href="/AdminPortal/StudentCourses/BachelorWifery"
                        className={activePath === '/AdminPortal/StudentCourses/BachelorWifery' ? styles.active : ''}
                    >
                        Bachelor of Science in Midwifery
                    </Link>
                </li>
                <li>
                    <Link
                        href="/AdminPortal/StudentCourses/BachelorEducation"
                        className={activePath === '/AdminPortal/StudentCourses/BachelorEducation' ? styles.active : ''}
                    >
                        Bachelor of Technical-Vocational Teacher Education
                    </Link>
                </li>
            </ul>
        </div>
    );
};

export default Sidebar;
