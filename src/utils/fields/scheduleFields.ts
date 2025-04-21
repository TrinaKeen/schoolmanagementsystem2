// scheduleFields.ts

export interface FieldConfig {
  name: string;
  label: string;
  type?: string;
  required?: boolean;
  options?: { label: string; value: string }[];
  readOnly?: boolean;
  data?: { label: string; value: string }[];
}

const scheduleFields = (
  courseOptions: { label: string; value: string }[],
  instructorOptions: { label: string; value: string }[]
): FieldConfig[] => [
  {
    name: "courseId",
    label: "Course",
    type: "select",
    required: true,
    options: courseOptions,
  },
  {
    name: "instructorId",
    label: "Instructor",
    type: "select",
    required: true,
    options: instructorOptions,
  },
  {
    name: "startTime",
    label: "Start Time",
    type: "datetime-local",
    required: true,
    data: [],
  },
  {
    name: "endTime",
    label: "End Time",
    type: "datetime-local",
    required: true,
    data: [],
  },
];

export default scheduleFields;
