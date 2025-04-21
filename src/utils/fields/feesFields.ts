import { FieldConfig } from "./instructorFields";

// Asked ChatGPT on how to add a dropdown option to my fees page
// Gave me a general outline of what to change as well
const feeFields = (
  programOptions: { label: string; value: string }[]
): FieldConfig[] => [
  {
    name: "programId",
    label: "Program",
    type: "select",
    required: true,
    data: [],
    options: programOptions,
  },
  {
    name: "feeType",
    label: "Fee Type",
    type: "select",
    required: true,
    data: [],
    options: [
      { value: "Tuition", label: "Tuition" },
      { value: "Misc", label: "Misc" },
      { value: "Other", label: "Other" },
    ],
  },
  {
    name: "amount",
    label: "Amount",
    type: "number",
    required: true,
    data: [],
  },
  {
    name: "description",
    label: "Description",
    data: [],
  },
];

export default feeFields;
