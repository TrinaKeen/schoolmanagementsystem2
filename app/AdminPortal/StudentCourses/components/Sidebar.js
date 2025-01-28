import Link from 'next/link';
import { useEffect, useState } from 'react';
import styles from './components.module.css';

const Sidebar = () => {
  const [activePath, setActivePath] = useState('');

  // Get the current path from the browser
  useEffect(() => {
    setActivePath(window.location.pathname);
  }, []);

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
