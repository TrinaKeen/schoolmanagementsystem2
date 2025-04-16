import { FieldConfig } from './instructorFields';

const programFields: FieldConfig[] = [
  { name: 'programCode', label: 'Program Code', required: true },
  { name: 'programName', label: 'Program Name', required: true },
  { name: 'programDescription', label: 'Description', required: false},
  { name: 'duration', label: 'Duration', type: 'number', required: true },
  { name: 'tuitionFee', label: 'Tuitition Fee', type: 'number', required: false },
];

export default programFields;