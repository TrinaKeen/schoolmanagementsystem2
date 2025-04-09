"use client";

import React, { useState } from "react";
import Header from "../components/header";

export default function ApplyNow() {
  // Form data state
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    country: "",
    username: "",
    password: "",
  });

  // Feedback message state
  const [message, setMessage] = useState("");

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Form validation
  const validateForm = () => {
    const { fullName, email, password } = formData;
    if (!fullName.trim()) return "Full name is required.";
    if (!/^\S+@\S+\.\S+$/.test(email))
      return "Please enter a valid email address.";
    if (password.length < 6)
      return "Password must be at least 6 characters long.";
    return null;
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    const validationError = validateForm();
    if (validationError) {
      setMessage(validationError);
      return;
    }

    try {
      const res = await fetch("/api/students/studentloginregister", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (res.ok) {
        setMessage("Student successfully registered!");
        setFormData({
          fullName: "",
          email: "",
          country: "",
          username: "",
          password: "",
        });
      } else {
        setMessage(data.error || "Registration failed. Please try again.");
      }
    } catch (error) {
      setMessage("An unexpected error occurred. Please try again later.");
    }
  };

  return (
    <div className="bg-white min-h-screen text-gray-800 font-sans">
      <Header />
      <div className="h-[100px] md:h-[120px]" />

      <main className="max-w-xl mx-auto px-6 py-12 bg-white shadow-md rounded-lg">
        <h1 className="text-3xl font-bold text-cyan-700 mb-4 text-center">
          Apply Now
        </h1>
        <p className="text-center text-gray-600 mb-6">
          Join our community of learners and start your journey toward a
          rewarding career! Please fill out the form below to create your
          account.
        </p>

        {message && (
          <p className="mb-4 text-center text-red-500 font-medium">{message}</p>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <InputField
            label="Full Name"
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
            placeholder="Enter your full name"
          />
          <InputField
            label="Email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Enter your email address"
          />
          <InputField
            label="Country"
            name="country"
            value={formData.country}
            onChange={handleChange}
            placeholder="Enter your country"
          />
          <InputField
            label="Username"
            name="username"
            value={formData.username}
            onChange={handleChange}
            placeholder="Choose a username"
          />
          <InputField
            label="Password"
            name="password"
            type="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Create a password"
          />

          <button
            type="submit"
            className="w-full bg-cyan-700 hover:bg-cyan-800 text-white font-semibold py-3 rounded-md transition duration-300"
          >
            Create Account
          </button>
        </form>

        <p className="text-center text-sm text-gray-600 mt-6">
          By creating an account, you agree to our{" "}
          <a href="/terms" className="text-cyan-600 hover:underline">
            Terms of Service
          </a>{" "}
          and{" "}
          <a href="/privacy" className="text-cyan-600 hover:underline">
            Privacy Policy
          </a>
          .
        </p>
      </main>
    </div>
  );
}

// Optional: extract input to a reusable component
function InputField({
  label,
  name,
  value,
  onChange,
  placeholder,
  type = "text",
}) {
  return (
    <div>
      <label htmlFor={name} className="block font-medium mb-1">
        {label}
      </label>
      <input
        type={type}
        name={name}
        id={name}
        value={value}
        onChange={onChange}
        required
        placeholder={placeholder}
        className="w-full border border-gray-300 p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-500"
      />
    </div>
  );
}
