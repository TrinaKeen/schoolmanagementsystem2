export interface FieldConfig {
  name: string;
  label: string;
  type?: string;
  required?: boolean;
  options?: { label: string; value: string }[];
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
  },
  { name: "username", label: "Username", required: true },
  { name: "email", label: "Email", type: "email", required: true },
  { name: "password", label: "Password", type: "password", required: true },
];

export default newUserFields;
