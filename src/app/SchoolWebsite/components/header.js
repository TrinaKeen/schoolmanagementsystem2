"use client";

import React, { useEffect, useState, useRef } from "react";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import logo from "/public/school-logo.png";

export default function WebsiteHeader() {
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef(null);
  const [programsMenuOpen, setProgramsMenuOpen] = useState(false);
  const programsMenuRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setMenuOpen(false);
      }

      if (
        programsMenuRef.current &&
        !programsMenuRef.current.contains(event.target)
      ) {
        setProgramsMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <>
      <Head>
        <title>Evelyn E. Fabie College Inc.</title>
        <meta
          name="description"
          content="School Management System for efficient management"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <header className="fixed w-full z-50 transition-all duration-300 bg-gradient-to-b from-[#005f73] to-[#0a9396] shadow-lg py-3">
        <div className="flex items-center justify-between px-6 text-white font-sans">
          <Link
            href="/"
            className="flex items-center hover:opacity-80 transition text-white"
          >
            <Image src={logo} alt="School Logo" width={50} height={50} />
            <h1 className="text-lg font-semibold ml-3">
              Evelyn E. Fabie College Inc.
            </h1>
          </Link>

          {/* Nav Links + Dropdown */}
          <nav className="flex items-center space-x-6 text-base font-medium tracking-wide">
            <Link
              href="/SchoolWebsite/Admission"
              className="hover:text-blue-300"
            >
              ADMISSION
            </Link>
            <div className="relative" ref={programsMenuRef}>
              <button
                onClick={() => setProgramsMenuOpen((prev) => !prev)}
                className="flex items-center hover:text-blue-300"
              >
                PROGRAMS
                <svg
                  className={`w-4 h-4 ml-1 transform transition-transform ${
                    programsMenuOpen ? "rotate-180" : ""
                  }`}
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M5.23 7.21a.75.75 0 011.06.02L10 10.94l3.71-3.71a.75.75 0 111.06 1.06l-4.24 4.25a.75.75 0 01-1.06 0L5.25 8.29a.75.75 0 01-.02-1.08z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>

              {programsMenuOpen && (
                <div className="absolute left-0 mt-2 w-48 bg-white text-black rounded shadow-md z-50">
                  <Link
                    href="/SchoolWebsite/Programs/TVED"
                    className="block px-4 py-2 hover:bg-gray-100"
                    onClick={() => setProgramsMenuOpen(false)}
                  >
                    Senior High School
                  </Link>
                  <Link
                    href="/SchoolWebsite/Programs/BTVED"
                    className="block px-4 py-2 hover:bg-gray-100"
                    onClick={() => setProgramsMenuOpen(false)}
                  >
                    College
                  </Link>
                </div>
              )}
            </div>
            <Link href="/SchoolWebsite/AboutUs" className="hover:text-blue-300">
              ABOUT
            </Link>
            <Link href="/SchoolWebsite/Contact" className="hover:text-blue-300">
              CONTACT US
            </Link>

            {/* Hamburger Dropdown */}
            <div className="relative" ref={menuRef}>
              <button
                onClick={() => setMenuOpen(!menuOpen)}
                className="focus:outline-none hover:text-blue-300 transition-transform duration-300"
              >
                {menuOpen ? (
                  <svg
                    className="w-6 h-6 transform rotate-180 transition duration-300"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                ) : (
                  <svg
                    className="w-6 h-6 transition duration-300"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 6h16M4 12h16M4 18h16"
                    />
                  </svg>
                )}
              </button>

              {/* Dropdown Items */}
              {menuOpen && (
                <div className="absolute right-0 mt-2 w-40 bg-white text-black rounded shadow-md z-50">
                  <a
                    href="/LogIn/AdminLogin"
                    className="block px-4 py-2 hover:bg-gray-100"
                    onClick={() => setMenuOpen(false)}
                  >
                    EEFCI Employee
                  </a>
                  <a
                    href="/LogIn/StudentLogin"
                    className="block px-4 py-2 hover:bg-gray-100"
                    onClick={() => setMenuOpen(false)}
                  >
                    Current Student
                  </a>
                </div>
              )}
            </div>
          </nav>
        </div>
      </header>
    </>
  );
}
