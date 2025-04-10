"use client";

import { useState } from "react";

type InstructorFormData = {
  employeeNumber: string;
  firstName: string;
  middleName: string;
  lastName: string;
  department: string;
  email: string;
  phoneNumber: string;
  dateHired: string;
  dob: string;
};

type InstructorFormProps = {
  type: "create" | "update";
  data?: InstructorFormData & { id?: string }; // include ID only for update
};

const defaultFormState: InstructorFormData = {
  employeeNumber: "",
  firstName: "",
  middleName: "",
  lastName: "",
  department: "",
  email: "",
  phoneNumber: "",
  dateHired: "",
  dob: "",
};

const InstructorForm = ({ type, data }: InstructorFormProps) => {
  const [formData, setFormData] = useState<InstructorFormData>(
    data || defaultFormState
  );

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev: InstructorFormData) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const method = type === "create" ? "POST" : "PUT";
    const endpoint =
      type === "create"
        ? "/api/instructors"
        : `/api/instructors/${data?.id}`;

    const res = await fetch(endpoint, {
      method,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    if (res.ok) {
      alert(
        `Instructor ${
          type === "create" ? "created" : "updated"
        } successfully.`
      );
      window.location.reload();
    } else {
      alert("An error occurred.");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-4"
    >
      {Object.entries(formData).map(([key, value]) => (
        <div key={key} className="flex flex-col text-black">
          <label htmlFor={key} className="capitalize font-medium mb-1">
            {key}
          </label>
          <input
            type="text"
            id={key}
            name={key}
            value={value}
            onChange={handleChange}
            className="border rounded border-black px-2 py-1"
            required
          />
        </div>
      ))}
      <div className="sm:col-span-2 text-right">
        <button
          type="submit"
          className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-4 py-2 rounded"
        >
          {type === "create" ? "Create" : "Update"} Instructor
        </button>
      </div>
    </form>
  );
};

export default InstructorForm;
