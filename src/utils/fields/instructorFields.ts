// FieldConfig type definition
// TS interface named FieldConfig
// Defines the structure of the object that reps the form field
// This object is used to dynamically render form inputs
// This top section will be imported to the other fields

export interface FieldConfig {
  name: string; // The name of the field which is used as a key in the form data
  label: string; // The label shown to the user in the form UI
  type?: string; // Optional for input types
  required?: boolean; // Optional for whether the field must be filled out before submission
  options?: { value: string; label: string }[]; // For dropdowns if needed
  readOnly?: boolean;
  data: any[]; // Optional for additional data related to the field
}

// Instructor fields array
// This array defines the structure of the form for adding a new instructor
const instructorFields: FieldConfig[] = [
  {
    name: "employeeNumber",
    label: "Employee Number",
    readOnly: true,
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

export default instructorFields;
