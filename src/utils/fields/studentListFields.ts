export interface StudentListField {
  name: string;
  label: string;
  type?: string;
  required?: boolean;
  readonly?: boolean;
  options?: { label: string; value: string }[];
  data: any[];
}

const studentListFields: StudentListField[] = [
  {
    name: "studentNumber",
    label: "Student Number",
    type: "text",
    required: true,
    data: [],
  },
  {
    name: "firstName",
    label: "First Name",
    type: "text",
    required: true,
    data: [],
  },
  { name: "middleName", label: "Middle Name", type: "text", data: [] },
  {
    name: "lastName",
    label: "Last Name",
    type: "text",
    required: true,
    data: [],
  },
  { name: "email", label: "Email", type: "email", required: true, data: [] },
  {
    name: "dob",
    label: "Date of Birth",
    type: "date",
    required: true,
    data: [],
  },
  { name: "gender", label: "Gender", type: "text", data: [] },
  { name: "age", label: "Age", type: "number", data: [] },
  { name: "nationality", label: "Nationality", type: "text", data: [] },
  { name: "placeOfBirth", label: "Place of Birth", type: "text", data: [] },
  { name: "phoneNumber", label: "Phone Number", type: "text", data: [] },
  { name: "homeAddress", label: "Home Address", type: "text", data: [] },
  {
    name: "emergencyContactName",
    label: "Emergency Contact Name",
    type: "text",
    data: [],
  },
  {
    name: "emergencyContactPhoneNumber",
    label: "Emergency Contact Phone",
    type: "text",
    data: [],
  },
  {
    name: "emergencyContactRelationship",
    label: "Emergency Contact Relationship",
    type: "text",
    data: [],
  },
  {
    name: "previousSchools",
    label: "Previous Schools",
    type: "text",
    data: [],
  },
  {
    name: "yearOfGraduation",
    label: "Year of Graduation",
    type: "text",
    data: [],
  },
  { name: "gpa", label: "GPA", type: "number", data: [] },
];

export default studentListFields;
