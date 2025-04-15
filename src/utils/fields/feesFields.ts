import { FieldConfig } from './instructorFields';

const feeFields: FieldConfig[] = [
  { name: 'programId', label: 'Program ID', required: true },
  { name: 'feeType', label: 'Fee Type', required: true },
  { name: 'amount', label: 'Amount', type: 'number', required: true },
  { name: 'description', label: 'Description' },
];

export default feeFields;