export interface FieldConfig {
  name: string;
  label: string;
  type?: string;
  required?: boolean;
  readonly?: boolean;
}

const studentApprovalFields: FieldConfig[] = [
  { name: "studentNumber", label: "Student Number", readonly: true },
  { name: "firstName", label: "First Name", readonly: true },
  { name: "middleName", label: "Middle Name", readonly: true },
  { name: "lastName", label: "Last Name", readonly: true },
  { name: "dob", label: "Date of Birth", type: "date", readonly: true },
  { name: "gender", label: "Gender", readonly: true },
  { name: "age", label: "Age", readonly: true },
  { name: "nationality", label: "Nationality", readonly: true },
  { name: "placeOfBirth", label: "Place of Birth", readonly: true },
  { name: "email", label: "Email", type: "email", readonly: true },
  { name: "phoneNumber", label: "Phone Number", readonly: true },
  { name: "homeAddress", label: "Home Address", readonly: true },
  {
    name: "emergencyContactName",
    label: "Emergency Contact Name",
    readonly: true,
  },
  {
    name: "emergencyContactPhoneNumber",
    label: "Emergency Contact Phone",
    readonly: true,
  },
  {
    name: "emergencyContactRelationship",
    label: "Emergency Contact Relationship",
    readonly: true,
  },
  { name: "previousSchools", label: "Previous Schools", readonly: true },
  { name: "yearOfGraduation", label: "Year of Graduation", readonly: true },
  { name: "gpa", label: "GPA", readonly: true },
  { name: "program", label: "Program", readonly: true },
  {
    name: "submissionDate",
    label: "Submission Date",
    type: "date",
    readonly: true,
  },
  { name: "status", label: "Approval Status", required: true },
  { name: "rejectionReason", label: "Reason for Rejection" },
];

export default studentApprovalFields;
