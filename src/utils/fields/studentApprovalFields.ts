export interface FieldConfig {
  name: string;
  label: string;
  type?: string;
  required?: boolean;
  readonly?: boolean;
  options?: { label: string; value: string }[];
  data: any[];
}

const studentApprovalFields: FieldConfig[] = [
  {
    name: "studentId",
    label: "Student ID",
    type: "text",
    readonly: true,
    data: [],
  },
  { name: "firstName", label: "First Name", readonly: true, data: [] },
  { name: "middleName", label: "Middle Name", readonly: true, data: [] },
  { name: "lastName", label: "Last Name", readonly: true, data: [] },
  {
    name: "dob",
    label: "Date of Birth",
    type: "date",
    readonly: true,
    data: [],
  },
  { name: "gender", label: "Gender", readonly: true, data: [] },
  { name: "age", label: "Age", readonly: true, data: [] },
  { name: "nationality", label: "Nationality", readonly: true, data: [] },
  { name: "placeOfBirth", label: "Place of Birth", readonly: true, data: [] },
  { name: "email", label: "Email", type: "email", readonly: true, data: [] },
  { name: "phoneNumber", label: "Phone Number", readonly: true, data: [] },
  { name: "homeAddress", label: "Home Address", readonly: true, data: [] },
  {
    name: "emergencyContactName",
    label: "Emergency Contact Name",
    readonly: true,
    data: [],
  },
  {
    name: "emergencyContactPhoneNumber",
    label: "Emergency Contact Phone",
    readonly: true,
    data: [],
  },
  {
    name: "emergencyContactRelationship",
    label: "Emergency Contact Relationship",
    readonly: true,
    data: [],
  },
  {
    name: "previousSchools",
    label: "Previous Schools",
    readonly: true,
    data: [],
  },
  {
    name: "yearOfGraduation",
    label: "Year of Graduation",
    readonly: true,
    data: [],
  },
  { name: "gpa", label: "GPA", readonly: true, data: [] },
  { name: "program", label: "Program", readonly: true, data: [] },
  {
    name: "submissionDate",
    label: "Submission Date",
    type: "date",
    readonly: true,
    data: [],
  },
  {
    name: "status",
    label: "Approval Status",
    type: "select",
    required: true,
    options: [
      { label: "Approved", value: "approved" },
      { label: "Rejected", value: "rejected" },
    ],
    data: [],
  },
  {
    name: "rejectionReason",
    label: "Reason for Rejection",
    required: true,
    data: [],
  },
];

export default studentApprovalFields;
