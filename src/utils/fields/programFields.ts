import { FieldConfig } from "./instructorFields";

const programFields: FieldConfig[] = [
  { name: "programCode", label: "Program Code", required: true, data: [] },
  { name: "programName", label: "Program Name", required: true, data: [] },
  {
    name: "programDescription",
    label: "Description",
    required: false,
    data: [],
  },
  {
    name: "duration",
    label: "Duration (Months)",
    type: "select",
    required: true,
    data: [],
    options: [
      { value: "6", label: "6 months" },
      { value: "12", label: "12 months" },
      { value: "48", label: "48 months" },
    ],
  },
  {
    name: "tuitionFee",
    label: "Tuitition Fee",
    type: "number",
    required: false,
    data: [],
  },
];

export default programFields;
