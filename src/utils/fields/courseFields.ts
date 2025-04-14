
import { FieldConfig } from "./instructorFields";
  
  // Course fields array
  // This array defines the structure of the form for adding a new course
  const courseFields: FieldConfig[] = [
    { name: 'courseCode', label: 'Course Code', required: true },
    { name: 'courseName', label: 'Course Name', required: true },
    { name: 'courseDescription', label: 'Description' },
    { name: 'instructorId', label: 'Instructor ID', required: true },
    { name: 'programId', label: 'Program ID' },
  ];

export default courseFields;
  