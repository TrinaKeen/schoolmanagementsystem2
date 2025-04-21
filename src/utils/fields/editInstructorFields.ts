import { FieldConfig } from "./instructorFields";

// Instructor fields array
// This array defines the structure of the form for adding a new instructor
const editInstructorFields: FieldConfig[] = [
  {
    name: "employeeNumber",
    label: "Employee Number",
    required: true,
    data: [],
  },
  { name: "firstName", label: "First Name", required: true, data: [] },
  { name: "middleName", label: "Middle Name", required: false, data: [] },
  { name: "lastName", label: "Last Name", required: true, data: [] },
  { name: "department", label: "Department", required: false, data: [] },
  { name: "email", label: "Email", type: "email", required: true, data: [] },
  { name: "phoneNumber", label: "Phone Number", required: true, data: [] },
  {
    name: "dateHired",
    label: "Date Hired",
    type: "date",
    required: true,
    data: [],
  },
  {
    name: "dob",
    label: "Date of Birth",
    type: "date",
    required: true,
    data: [],
  },
];

export default editInstructorFields;
