export interface FieldConfig {
  name: string;
  label: string;
  type?: string;
  required?: boolean;
  options?: { label: string; value: string }[];
}

const newEmployeeFields: FieldConfig[] = [
  { name: "employeeNumber", label: "Employee Number", required: true },
  { name: "firstName", label: "First Name", required: true },
  { name: "middleName", label: "Middle Name" },
  { name: "lastName", label: "Last Name", required: true },
  { name: "email", label: "Email", type: "email", required: true },
  { name: "phoneNumber", label: "Phone Number", required: true },
  { name: "dob", label: "Date of Birth", type: "date", required: true },
  { name: "dateHired", label: "Date Hired", type: "date", required: true },
];

export default newEmployeeFields;
