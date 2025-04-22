const paymentFields = (studentOptions: { label: string; value: string }[]) => [
  {
    name: "studentId",
    label: "Student",
    type: "select",
    required: true,
    data: studentOptions,
  },
  {
    name: "amountPaid",
    label: "Amount Paid",
    type: "number",
    required: true,
    data: [],
  },
  {
    name: "paymentDate",
    label: "Payment Date",
    type: "date",
    required: true,
    data: [],
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
