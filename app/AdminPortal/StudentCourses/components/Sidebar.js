import Link from 'next/link';
import styles from './component.module.css';

const Sidebar = () => {
  return (
    <div className={styles.sidebar}>
      <h2>Student Courses</h2>
      <ul>
        <li>
          <Link href="/AdminPortal/StudentCourses/grade11">
            Senior High School Grade 11
          </Link>
        </li>
        <li>
          <Link href="/AdminPortal/StudentCourses/grade12">
            Senior High School Grade 12
          </Link>
        </li>
        <li>
          <Link href="/AdminPortal/StudentCourses/BachelorWifery">
            Bachelor of Science in Midwifery
          </Link>
        </li>
        <li>
          <Link href="/AdminPortal/StudentCourses/BachelorEducation">
            Bachelor of Technical-Vocational Teacher Education
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
