'use client';

import React, { useEffect, useState } from 'react';

interface Course {
  id: number;
  courseCode: string;
  courseName: string;
  courseDescription: string;
  instructorId: number;
  programId: number;
}

export default function CoursesPage() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);
  const [newCourse, setNewCourse] = useState({
    courseCode: '',
    courseName: '',
    courseDescription: '',
    instructorId: '',
    programId: '',
  });

  const fetchCourses = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/courses');
      const data = await res.json();

      if (Array.isArray(data)) {
        setCourses(data);
        setError('');
      } else {
        setError('Unexpected response format');
      }
    } catch (err) {
      setError('Failed to fetch courses.');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch('/api/courses', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...newCourse,
          instructorId: parseInt(newCourse.instructorId),
          programId: parseInt(newCourse.programId),
        }),
      });

      if (!res.ok) throw new Error('Failed to add course');
      setNewCourse({ courseCode: '', courseName: '', courseDescription: '', instructorId: '', programId: '' });
      fetchCourses();
    } catch {
      alert('Error adding course.');
    }
  };

  useEffect(() => {
    fetchCourses();
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Courses Dashboard</h1>

      <form onSubmit={handleSubmit} className="mb-6 space-y-3 bg-gray-50 p-4 border rounded-md shadow-sm">
        <div className="flex flex-col gap-2">
          <input
            type="text"
            placeholder="Course Code"
            value={newCourse.courseCode}
            onChange={e => setNewCourse({ ...newCourse, courseCode: e.target.value })}
            className="p-2 border rounded"
            required
          />
          <input
            type="text"
            placeholder="Course Name"
            value={newCourse.courseName}
            onChange={e => setNewCourse({ ...newCourse, courseName: e.target.value })}
            className="p-2 border rounded"
            required
          />
          <input
            type="text"
            placeholder="Course Description"
            value={newCourse.courseDescription}
            onChange={e => setNewCourse({ ...newCourse, courseDescription: e.target.value })}
            className="p-2 border rounded"
          />
          <input
            type="number"
            placeholder="Instructor ID"
            value={newCourse.instructorId}
            onChange={e => setNewCourse({ ...newCourse, instructorId: e.target.value })}
            className="p-2 border rounded"
            required
          />
          <input
            type="number"
            placeholder="Program ID"
            value={newCourse.programId}
            onChange={e => setNewCourse({ ...newCourse, programId: e.target.value })}
            className="p-2 border rounded"
            required
          />
        </div>
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">Add Course</button>
      </form>

      {loading ? (
        <p>Loading courses...</p>
      ) : error ? (
        <p className="text-red-500">{error}</p>
      ) : (
        <table className="w-full border text-sm">
          <thead className="bg-gray-200 text-left">
            <tr>
              <th className="p-2 border">ID</th>
              <th className="p-2 border">Code</th>
              <th className="p-2 border">Name</th>
              <th className="p-2 border">Instructor ID</th>
              <th className="p-2 border">Program ID</th>
            </tr>
          </thead>
          <tbody>
            {courses.map(course => (
              <tr key={course.id} className="hover:bg-gray-50">
                <td className="p-2 border">{course.id}</td>
                <td className="p-2 border">{course.courseCode}</td>
                <td className="p-2 border">{course.courseName}</td>
                <td className="p-2 border">{course.instructorId}</td>
                <td className="p-2 border">{course.programId}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
