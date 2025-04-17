import { FieldConfig } from './instructorFields';

// Asked ChatGPT on how to add a dropdown option to my fees page
// Gave me a general outline of what to change as well
const feeFields: FieldConfig[] = [
  { name: 'programId', label: 'Program ID', required: true },
  { name: 'feeType', label: 'Fee Type', type: 'select', required: true,
    options: [
      {value: 'Tuition', label: 'Tuition'},
      {value: 'Misc', label: 'Misc'},
    ],
   },
  { name: 'amount', label: 'Amount', type: 'number', required: true },
  { name: 'description', label: 'Description' },
];

export default feeFields;