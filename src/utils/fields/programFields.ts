import { FieldConfig } from './instructorFields';

const programFields: FieldConfig[] = [
  { name: 'programCode', label: 'Program Code', required: true },
  { name: 'programName', label: 'Program Name', required: true },
  { name: 'programDescription', label: 'Description', required: false},
  {  name: "duration",
    label: "Duration (Weeks)",
    type: "select",
    required: true,
    options: [
      { value: "6", label: "6 weeks" },
      { value: "12", label: "12 weeks" },
      { value: "48", label: "48 weeks" },
    ], 
  },
  { name: 'tuitionFee', label: 'Tuitition Fee', type: 'number', required: false },
];

export default programFields;