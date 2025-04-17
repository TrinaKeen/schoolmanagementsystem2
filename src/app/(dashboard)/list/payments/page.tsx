'use client';

import { PaymentStatus } from '@prisma/client';
import React, { useEffect, useState } from 'react';

interface Payment {
  id: number;
  studentId: number;
  amountPaid: number;
  paymentDate: Date;
  paymentStatus: 'paid' | 'unpaid' | 'pending';
}

export default function PaymentsPage() {
  const [courses, setPayments] = useState<Payment[]>([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);
  const [newPayment, setNewPayment] = useState({
    studentId: '',
    amountPaid: '',
    paymentDate: '',
    paymentStatus: '',
  });

  const fetchPayments = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/payments');
      const data = await res.json();

      if (Array.isArray(data)) {
        setPayments(data);
        setError('');
      } else {
        setError('Unexpected response format');
      }
    } catch (err) {
      setError('Failed to fetch payments.');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch('/api/payments', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...newPayment,
          studentId: parseInt(newPayment.studentId),
        }),
      });

      if (!res.ok) throw new Error('Failed to add payment');
      setNewPayment({ studentId: '', amountPaid: '',  paymentDate: '', paymentStatus: '',});
      fetchPayments();
    } catch {
      alert('Error adding course.');
    }
  };

  useEffect(() => {
    fetchPayments();
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Payments Dashboard</h1>

      <form onSubmit={handleSubmit} className="mb-6 space-y-3 bg-gray-50 p-4 border rounded-md shadow-sm">
        <div className="flex flex-col gap-2">
          <input
            type="text"
            placeholder="Student Id"
            value={newPayment.studentId}
            onChange={e => setNewPayment({ ...newPayment, studentId: e.target.value })}
            className="p-2 border rounded"
            required
          />
          <input
            type="number"
            placeholder="Amount Paid"
            value={newPayment.amountPaid}
            onChange={e => setPayments({ ...newPayment, amountPaid: e.target.value })}
            className="p-2 border rounded"
            required
          />
          <input
            type="number"
            placeholder="Payment Date"
            value={newPayment.paymentDate}
            onChange={e => setNewPayment({ ...newPayment, paymentDate: e.target.value })}
            className="p-2 border rounded"
            required
          />
            <input
            type="number"
            placeholder="Payment Status"
            value={newPayment.paymentStatus}
            onChange={e => setNewPayment({ ...newPayment, paymentStatus: e.target.value })}
            className="p-2 border rounded"
            required
          />
        </div>
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">Add Payment</button>
      </form>

      {loading ? (
        <p>Loading schedules...</p>
      ) : error ? (
        <p className="text-red-500">{error}</p>
      ) : (
        <table className="w-full border text-sm">
          <thead className="bg-gray-200 text-left">
            <tr>
              <th className="p-2 border">ID</th>
              <th className="p-2 border">Student ID</th>
              <th className="p-2 border">Amount Paid</th>
              <th className="p-2 border">Payment Date</th>
              <th className="p-2 border">Payment Status</th>
            </tr>
          </thead>
          <tbody>
            {courses.map(payment => (
              <tr key={payment.id} className="hover:bg-gray-50">
                <td className="p-2 border">{payment.id}</td>
                <td className="p-2 border">{payment.studentId}</td>
                <td className="p-2 border">{payment.amountPaid}</td>
                <td className="p-2 border">{payment.paymentStatus}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}