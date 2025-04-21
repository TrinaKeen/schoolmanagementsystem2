export interface FieldConfig {
  name: string;
  label: string;
  type?: string;
  required?: boolean;
  options?: { label: string; value: string }[];
  readOnly?: boolean;
  data: any[]; // Optional for additional data related to the field
}

const newEmployeeFields: FieldConfig[] = [
  {
    name: "employeeNumber",
    label: "Employee Number",
    readOnly: true,
    data: [],
  },
  { name: "firstName", label: "First Name", required: true, data: [] },
  { name: "middleName", label: "Middle Name", data: [] },
  { name: "lastName", label: "Last Name", required: true, data: [] },
  { name: "email", label: "Email", type: "email", required: true, data: [] },
  { name: "phoneNumber", label: "Phone Number", required: true, data: [] },
  {
    name: "dob",
    label: "Date of Birth",
    type: "date",
    required: true,
    data: [],
  },
  {
    name: "dateHired",
    label: "Date Hired",
    type: "date",
    required: true,
    data: [],
  },
];

export default newEmployeeFields;
