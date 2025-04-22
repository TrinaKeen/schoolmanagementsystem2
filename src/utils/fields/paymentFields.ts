const paymentFields = (studentOptions: { label: string; value: string }[] = []) => [
  {
    name: "studentId",
    label: "Student",
    type: "select",
    required: true,
    async: true, // Enables async search with Autocomplete
    data: studentOptions,
  },
  {
    name: "amountPaid",
    label: "Amount Paid",
    type: "number",
    required: true,
  },
  {
    name: "paymentDate",
    label: "Payment Date",
    type: "date",
    required: true,
  },
  {
    name: "paymentStatus",
    label: "Status",
    type: "select",
    required: true,
    options: [
      { label: "Pending", value: "PENDING" },
      { label: "Completed", value: "COMPLETED" },
      { label: "Failed", value: "FAILED" },
      { label: "Cancelled", value: "CANCELLED" },
    ],
  },
];

export default paymentFields;
