const paymentFields = (
  studentOptions: { label: string; value: string }[],
  feeOptions: { label: string; value: string }[]
) => [
  {
    name: "studentId",
    label: "Student",
    type: "select",
    required: true,
    data: studentOptions,
  },
  {
    name: "feeId",
    label: "Fee Type",
    type: "select",
    data: feeOptions,
    required: true,
  },
  {
    name: "amountPaid",
    label: "Amount Paid",
    type: "number",
    required: true,
    data: [], // No need for data here
  },
  {
    name: "paymentDate",
    label: "Payment Date",
    type: "date",
    required: true,
    data: [], // No need for data here
  },
  {
    name: "paymentStatus",
    label: "Status",
    type: "select",
    required: true,
    data: [
      { label: "Pending", value: "PENDING" },
      { label: "Completed", value: "COMPLETED" },
      { label: "Failed", value: "FAILED" },
      { label: "Cancelled", value: "CANCELLED" },
    ],
  },
];

export default paymentFields;
