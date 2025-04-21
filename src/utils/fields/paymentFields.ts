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
    data: [
      { label: "Paid", value: "paid" },
      { label: "Unpaid", value: "unpaid" },
      { label: "Pending", value: "pending" },
    ],
  },
];

export default paymentFields;
