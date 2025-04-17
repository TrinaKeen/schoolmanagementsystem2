'use client';

import React, { useEffect, useState } from 'react';

interface Schedule {
  id: number;
  courseId: number;
  instructorId: number;
  startTime:Date;
  endTime:Date;
}

export default function SchedulesPage() {
  const [courses, setSchedules] = useState<Schedule[]>([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);
  const [newSchedule, setNewSchedule] = useState({
    courseId: '',
    instructorId: '',
    startTime: '',
    endTime: '',
  });

  const fetchSchedules = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/schedule');
      const data = await res.json();

      if (Array.isArray(data)) {
        setSchedules(data);
        setError('');
      } else {
        setError('Unexpected response format');
      }
    } catch (err) {
      setError('Failed to fetch schedules.');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch('/api/schedule', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...newSchedule,
          instructorId: parseInt(newSchedule.instructorId),
        }),
      });

      if (!res.ok) throw new Error('Failed to add schedule');
      setNewSchedule({ courseId: '', instructorId: '',  startTime: '', endTime: '',});
      fetchSchedules();
    } catch {
      alert('Error adding course.');
    }
  };

  useEffect(() => {
    fetchSchedules();
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Schedules Dashboard</h1>

      <form onSubmit={handleSubmit} className="mb-6 space-y-3 bg-gray-50 p-4 border rounded-md shadow-sm">
        <div className="flex flex-col gap-2">
          <input
            type="text"
            placeholder="Course Id"
            value={newSchedule.courseId}
            onChange={e => setNewSchedule({ ...newSchedule, courseId: e.target.value })}
            className="p-2 border rounded"
            required
          />
          <input
            type="number"
            placeholder="Instructor ID"
            value={newSchedule.instructorId}
            onChange={e => setNewSchedule({ ...newSchedule, instructorId: e.target.value })}
            className="p-2 border rounded"
            required
          />
          <input
            type="number"
            placeholder="Start Time"
            value={newSchedule.startTime}
            onChange={e => setNewSchedule({ ...newSchedule, startTime: e.target.value })}
            className="p-2 border rounded"
            required
          />
            <input
            type="number"
            placeholder="End Time"
            value={newSchedule.startTime}
            onChange={e => setNewSchedule({ ...newSchedule, endTime: e.target.value })}
            className="p-2 border rounded"
            required
          />
        </div>
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">Add Schedule</button>
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
              <th className="p-2 border">Course ID</th>
              <th className="p-2 border">Instructor ID</th>
              <th className="p-2 border">Start Time</th>
              <th className="p-2 border">End Time</th>
            </tr>
          </thead>
          <tbody>
            {courses.map(schedule => (
              <tr key={schedule.id} className="hover:bg-gray-50">
                <td className="p-2 border">{schedule.id}</td>
                <td className="p-2 border">{schedule.courseId}</td>
                <td className="p-2 border">{schedule.instructorId}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}