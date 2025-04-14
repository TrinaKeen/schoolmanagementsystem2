// FieldConfig type definition
export interface FieldConfig {
    name: string;
    label: string;
    type?: string;
    required?: boolean;
  }
  
  // Instructor fields array (correct structure)
  const instructorFields: FieldConfig[] = [
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
  
  // Export the array as default
  export default instructorFields;
  