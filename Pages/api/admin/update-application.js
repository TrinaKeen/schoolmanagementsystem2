import { neon } from '@neondatabase/serverless';



SELECT 
  students.student_id,
  students.student_name,
  courses.course_id,
  courses.course_name,
  departments.department_name,
  instructors.instructor_id,
  instructors.instructor_name
FROM 
  students
JOIN 
  enrollments ON students.student_id = enrollments.student_id
JOIN 
  courses ON enrollments.course_id = courses.course_id
JOIN 
  departments ON courses.department_id = departments.department_id
JOIN 
  instructors ON courses.instructor_id = instructors.instructor_id;