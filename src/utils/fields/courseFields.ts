// courseFields.ts
const courseFields = (
  instructorOptions: { label: string; value: string }[],
  programOptions: { label: string; value: string }[]
) => [
  {
    name: "courseCode",
    label: "Course Code",
    required: true,
  },
  {
    name: "courseName",
    label: "Course Name",
    required: true,
  },
  {
    name: "courseDescription",
    label: "Description",
  },
  {
    name: "instructorId",
    label: "Instructor",
    type: "select",
    required: true,
    options: instructorOptions,
  },
  {
    name: "programId",
    label: "Program",
    type: "select",
    required: true,
    options: programOptions,
  },
];

export default courseFields;
