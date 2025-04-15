"use client";
import { useState, useEffect } from "react";
import CreateStudentApplicationForm from "@/components/forms/CreateStudentApplicationForm";

const CreateStudentApplicationPage = () => {
  const [userId, setUserId] = useState<string | null>(null);

  // Get userId from localStorage (assuming user is logged in)
  useEffect(() => {
    const storedUserId = localStorage.getItem("userId");
    if (storedUserId) {
      setUserId(storedUserId);
    }
  }, []);

  return (
    <div className="container mx-auto py-6 text-black">
      <h1 className="text-xl font-semibold">Create Student Application</h1>
      {userId ? (
        <CreateStudentApplicationForm userId={userId} />
      ) : (
        <p>You must be logged in to create an application.</p>
      )}
    </div>
  );
};

export default CreateStudentApplicationPage;
