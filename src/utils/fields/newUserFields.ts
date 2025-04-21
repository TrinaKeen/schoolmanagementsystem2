export interface FieldConfig {
  name: string;
  label: string;
  type?: string;
  required?: boolean;
  options?: { label: string; value: string }[];
  data: any[]; // Optional for additional data related to the field
}

const newUserFields: FieldConfig[] = [
  {
    name: "role",
    label: "Role",
    type: "select",
    required: true,
    options: [
      { label: "Admin", value: "admin" },
      { label: "Instructor", value: "instructor" },
      { label: "Student", value: "student" },
    ],
    data: [],
  },
  { name: "username", label: "Username", required: true, data: [] },
  { name: "email", label: "Email", type: "email", required: true, data: [] },
  {
    name: "password",
    label: "Password",
    type: "password",
    required: true,
    data: [],
  },
];

export default newUserFields;
