import { FieldConfig } from './instructorFields';

  // Instructor fields array
  // This array defines the structure of the form for adding a new instructor
  const editInstructorFields: FieldConfig[] = [
    { name: 'employeeNumber', label: 'Employee Number', required: true },
    { name: 'firstName', label: 'First Name', required: true },
    { name: 'middleName', label: 'Middle Name', required: false },
    { name: 'lastName', label: 'Last Name', required: true },
    { name: 'department', label: 'Department', required: false },
    { name: 'email', label: 'Email', type: 'email', required: true },
    { name: 'phoneNumber', label: 'Phone Number', required: true },
    { name: 'dateHired', label: 'Date Hired', type: 'date', required: true },
    { name: 'dob', label: 'Date of Birth', type: 'date', required: true },
  ];

export default editInstructorFields;
  