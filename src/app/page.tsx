"use client";

import React from "react";
import { useState, useEffect } from "react";
import Footer from "../app/SchoolWebsite/components/footer";
import WebsiteHeader from "../app/SchoolWebsite/components/WebsiteHeader";
import Image from "next/image";
import instructorPic from "/public/8.jpg";
import shsPic from "/public/3.jpg";
import collegePic from "/public/7.jpg";
import schoolPic from "/public/2.jpg";
import Link from "next/link";

export default function Home() {
  const slideshowImages = [
    {
      src: "/9.jpg",
      title: "CHED 30th Anniversary",
      desc: "Celebrating 30 years of excellence in education.",
    },
    {
      src: "/10.jpg",
      title: "Future Midwives",
      desc: "Empowering the next generation of healthcare professionals.",
    },
    {
      src: "/6.jpg",
      title: "Graduation Day",
      desc: "Celebrating the achievements of our graduates.",
    },
  ];

  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slideshowImages.length);
    }, 5000); // autoplay every 5 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <div style={{ backgroundColor: "white", flex: 1 }}>
      <WebsiteHeader />

      {/* Cover Photo Section */}
      <section className="relative h-[90vh] w-full font-sans">
        <Image
          src={schoolPic}
          alt="School Cover Photo"
          fill
          priority
          className="object-cover"
        />
        <div className="absolute inset-0 bg-black/50 z-10" />
        <div className="relative z-20 flex flex-col items-start justify-center h-full px-6 md:px-24 pt-32 text-white">
          <p className="text-sm md:text-base text-cyan-200 font-semibold mb-2 uppercase">
            Midwifery and Technical Vocation Courses
          </p>
          <h1 className="text-4xl md:text-6xl font-extrabold mb-4 leading-tight">
            Empowering minds,
            <br />
            right around the corner.
          </h1>
          <p className="text-base md:text-lg mb-6 max-w-2xl">
            EEFCI is where you'll find your passion, build your skills, and grow
            into who you're meant to be. We're here to guide, support, and cheer
            you on every step of the way. Your future starts now and it's
            brighter than ever!
          </p>
          <div className="flex gap-4">
            <a
              href="/SchoolWebsite/Applynow"
              className="inline-block px-6 py-3 w-full sm:w-fit rounded-full bg-[#005f73] hover:scale-110 transition duration-300 ease-in-out cursor-pointer text-white font-semibold mt-3"
            >
              Apply Now
            </a>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto py-10 px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* SHS box */}
          <Link href="/SchoolWebsite/Programs/TVED" className="group">
            <div className="group flex w-full h-56 bg-cyan-200 hover:bg-cyan-400 transition-all duration-500 ease-in-out shadow-md rounded-xl overflow-hidden transform hover:scale-105 hover:shadow-xl">
              <Image
                src={shsPic}
                alt="Senior High School"
                className="w-56 h-full object-cover transition-all duration-500 ease-in-out"
              />
              <div className="p-8 flex flex-col justify-center">
                <h5 className="text-3xl font-semibold mb-3 text-gray-700 group-hover:text-white transition-all duration-500 ease-in-out">
                  Senior High School Programs
                </h5>
                <p className="text-lg text-gray-700 group-hover:text-white transition-all duration-500 ease-in-out">
                  Prepare for your future with our Senior High School programs.
                </p>
              </div>
            </div>
          </Link>

          {/* College box */}
          <Link href="/SchoolWebsite/Programs/BTVD" className="group">
            <div className="group flex w-full h-56 bg-cyan-200 hover:bg-cyan-400 transition-all duration-500 ease-in-out shadow-md rounded-xl overflow-hidden transform hover:scale-105 hover:shadow-xl">
              <Image
                src={collegePic}
                alt="College Programs"
                className="w-56 h-full object-cover transition-all duration-500 ease-in-out"
              />
              <div className="p-8 flex flex-col justify-center">
                <h5 className="text-3xl font-semibold mb-3 text-gray-700 group-hover:text-white transition-all duration-500 ease-in-out">
                  College Programs
                </h5>
                <p className="text-lg text-gray-700 group-hover:text-white transition-all duration-500 ease-in-out">
                  Take the next step toward your future with our college
                  programs offering Bachelor's degrees in diverse fields.
                </p>
              </div>
            </div>
          </Link>
        </div>
      </div>

      <div className="max-w-7xl mx-auto py-10 px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
          {/* Image Column */}
          <div className="relative h-[400px] w-full">
            <Image
              src={instructorPic}
              alt="Instructors"
              className="absolute inset-0 w-full h-full object-cover rounded-md"
            />
          </div>

          {/* Text Column */}
          <div>
            <div className="flex items-center mb-2">
              <h6 className="text-cyan-500 text-lg font-semibold mr-3">
                ABOUT US
              </h6>
              <svg
                width="40"
                height="12"
                viewBox="0 0 40 12"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <line
                  x1="0"
                  y1="4"
                  x2="20"
                  y2="4"
                  stroke="#06B6D4"
                  strokeWidth="2"
                />
                <line
                  x1="0"
                  y1="10"
                  x2="40"
                  y2="10"
                  stroke="#06B6D4"
                  strokeWidth="2"
                />
              </svg>
            </div>

            <h1 className="text-4xl text-blue-950 font-bold mb-4">
              Welcome to EEFCI
            </h1>
            <p className="mb-4 text-gray-700">
              Evelyn E. Fabie College, Inc. (EEFCI), formerly known as the Fabie
              School of Midwifery, is a private educational institution in the
              Philippines established in 1982.
            </p>
            <p className="mb-6 text-gray-700">
              With programs in Senior High School, Midwifery, and
              Technical-Vocational Teacher Education, EEFCI is committed to
              shaping competent professionals through quality instruction and
              hands-on training.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-2 gap-x-4 text-gray-700">
              <p className="flex items-center mb-0">
                <svg
                  className="w-4 h-4 text-cyan-500 mr-2"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M10.293 15.707a1 1 0 010-1.414L13.586 11H4a1 1 0 110-2h9.586l-3.293-3.293a1 1 0 111.414-1.414l5 5a1 1 0 010 1.414l-5 5a1 1 0 01-1.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
                Skilled Instructors
              </p>
              <p className="flex items-center mb-0">
                <svg
                  className="w-4 h-4 text-cyan-500 mr-2"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M10.293 15.707a1 1 0 010-1.414L13.586 11H4a1 1 0 110-2h9.586l-3.293-3.293a1 1 0 111.414-1.414l5 5a1 1 0 010 1.414l-5 5a1 1 0 01-1.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
                Hands-On Training
              </p>
              <p className="flex items-center mb-0">
                <svg
                  className="w-4 h-4 text-cyan-500 mr-2"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M10.293 15.707a1 1 0 010-1.414L13.586 11H4a1 1 0 110-2h9.586l-3.293-3.293a1 1 0 111.414-1.414l5 5a1 1 0 010 1.414l-5 5a1 1 0 01-1.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
                CHED Accredited Programs
              </p>
              <p className="flex items-center mb-0">
                <svg
                  className="w-4 h-4 text-cyan-500 mr-2"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M10.293 15.707a1 1 0 010-1.414L13.586 11H4a1 1 0 110-2h9.586l-3.293-3.293a1 1 0 111.414-1.414l5 5a1 1 0 010 1.414l-5 5a1 1 0 01-1.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
                Meaningful Learning Experiences
              </p>
              <p className="flex items-center mb-0">
                <svg
                  className="w-4 h-4 text-cyan-500 mr-2"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M10.293 15.707a1 1 0 010-1.414L13.586 11H4a1 1 0 110-2h9.586l-3.293-3.293a1 1 0 111.414-1.414l5 5a1 1 0 010 1.414l-5 5a1 1 0 01-1.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
                Online Classes
              </p>
              <p className="flex items-center mb-0">
                <svg
                  className="w-4 h-4 text-cyan-500 mr-2"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M10.293 15.707a1 1 0 010-1.414L13.586 11H4a1 1 0 110-2h9.586l-3.293-3.293a1 1 0 111.414-1.414l5 5a1 1 0 010 1.414l-5 5a1 1 0 01-1.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
                International Certificate
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="relative w-full max-w-7xl h-[450px] md:h-[500px] mx-auto overflow-hidden rounded-xl shadow-lg my-12">
        {slideshowImages.map((item, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${
              index === currentSlide ? "opacity-100 z-10" : "opacity-0 z-0"
            }`}
          >
            {/* Background image */}
            <Image
              src={item.src}
              alt={item.title}
              fill
              className="object-cover"
            />

            {/* Gradient + Text Overlay */}
            <div className="absolute inset-y-0 left-0 w-1/2 bg-gradient-to-r from-black/60 to-transparent flex items-center px-8">
              <div className="text-white">
                <h2 className="text-3xl md:text-4xl font-bold mb-2">
                  {item.title}
                </h2>
                <p className="text-lg">{item.desc}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <Footer />
    </div>
  );
}
