'use client';

import { useEffect, useState } from 'react';
import {
  Button,
  Group,
  Table,
  Box,
  Text,
} from '@mantine/core';
import axios from 'axios';
import FormModal from '@/components/FormModal';
import instructorFields from '@/utils/fields/instructorFields';

// Interface for Courses Type
interface Course {
  id: number;
  courseCode: string;
  courseName: string;
  courseDescription?: string;
  instructorId: number;
  programId?: number;
}

export default function InstructorsPage() {
  const [instructors, setInstructors] = useState<Course[]>([]);  // Holds the array of courses returned from the backend
  const [modalOpen, setModalOpen] = useState(false);  // Controls whether the modal is open or closed

  // API fetch form the instructors table
  const fetchCourses = async () => {
    try {
      const res = await axios.get('/api/courses');
      setInstructors(res.data);
    } catch (err) {
      console.error('Failed to fetch courses:', err); // Error logging
    }
  };

  // Add new instructor function
  const handleAddInstructor = async (values: Record<string, any>) => {
    try {
      await axios.post('/api/instructors', values);
      setModalOpen(false);
      fetchCourses(); // Reloads the table to show the new instructor
    } catch (err) {
      console.error('Error adding course:', err); // Error logging
    }
  };

  // Fecth instructors on first render only
  useEffect(() => {
    fetchCourses();
  }, []);

  return (
    <Box p="md">
      <Group justify="space-between" style={{ marginBottom: '1rem' }}>
        <Text fw={700} size="xl">
          Instructors
        </Text>
        <Button onClick={() => setModalOpen(true)}>Add Course</Button>
      </Group>

      <Table>
        <thead>
          <tr>
            <th>Code</th>
            <th>Name</th>
            <th>Description</th>
            <th>Instructor ID</th>
            <th>Program ID</th>
          </tr>
        </thead>
        <tbody>
          {instructors.length === 0 ? (
            <tr>
              <td colSpan={6}>No courses found.</td>
            </tr>
          ) : (
            instructors.map((c) => (
              <tr key={c.id}>
                <td>{c.courseCode}</td>
                <td>{c.courseName}</td>
                <td>{c.courseDescription}</td>
                <td>{c.instructorId}</td>
                <td>{c.programId}</td>
              </tr>
            ))
          )}
        </tbody>
      </Table>

      <FormModal
        opened={modalOpen} // Whether the modal is open
        onClose={() => setModalOpen(false)} // Function to close it
        onSubmit={handleAddInstructor} // Function to handle form submit
        fields={instructorFields} // Field configuration from external file
        title="Add New Course" // Modal title
      />
    </Box>
  );
}
