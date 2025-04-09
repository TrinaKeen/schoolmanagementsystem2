"use client";

import React from "react";
import Header from "../components/header";
import Image from "next/image";
import schoolPic from "../../../public/11.jpg";

export default function Contact() {
  return (
    <>
      <Header />

      {/* Hero Section */}
      <section className="relative h-[60vh] w-full font-sans shadow-md">
        <Image
          src={schoolPic}
          alt="About Page Cover"
          fill
          priority
          className="object-cover"
        />
        <div className="absolute inset-0 bg-black/50 z-10" />
        <div className="relative z-20 flex flex-col items-center justify-center h-full text-center px-4 text-white">
          <h1 className="text-4xl md:text-5xl font-extrabold mb-4">About Us</h1>
          <p className="text-xl md:text-2xl max-w-3xl mb-2">Contact Us</p>
          <p className="text-base md:text-lg max-w-3xl">
            Anytime, anywhere, we are here to help you.
          </p>
        </div>
      </section>

      {/* Contact Section */}
      <section className="max-w-7xl mx-auto px-4 py-16 grid grid-cols-1 lg:grid-cols-3 gap-10">
        <div className="space-y-6">
          {/* Phone */}
          <div className="flex items-start">
            <div className="w-12 h-12 text-cyan-600 flex items-center justify-center rounded-full mr-4">
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3 5a2 2 0 012-2h3.6a1 1 0 01.9.6l1.1 2.4a1 1 0 01-.2 1.1L9.4 9.4a12.08 12.08 0 005.2 5.2l2.3-1.9a1 1 0 011.1-.2l2.4 1.1a1 1 0 01.6.9V19a2 2 0 01-2 2h-1C9.3 21 3 14.7 3 7V6a2 2 0 012-2z"
                />
              </svg>
            </div>
            <div>
              <h4 className="text-lg font-semibold text-cyan-700">Phone</h4>
              <p className="text-gray-700">(082) 227-3469 / 227-3686</p>
            </div>
          </div>

          {/* Email */}
          <div className="flex items-start">
            <div className="w-12 h-12 text-cyan-600 flex items-center justify-center rounded-full mr-4">
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8m-18 8h18a2 2 0 002-2V6a2 2 0 00-2-2H3a2 2 0 00-2 2v8a2 2 0 002 2z"
                />
              </svg>
            </div>
            <div>
              <h4 className="text-lg font-semibold text-cyan-700">Email</h4>
              <p className="text-gray-700">evelynfabiecollegeinc@gmail.com</p>
            </div>
          </div>

          {/* Address */}
          <div className="flex items-start">
            <div className="w-12 h-12 text-cyan-600 flex items-center justify-center rounded-full mr-4">
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 11c1.38 0 2.5-1.12 2.5-2.5S13.38 6 12 6s-2.5 1.12-2.5 2.5S10.62 11 12 11z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 22s6-5.5 6-10a6 6 0 10-12 0c0 4.5 6 10 6 10z"
                />
              </svg>
            </div>
            <div>
              <h4 className="text-lg font-semibold text-cyan-700">Address</h4>
              <p className="text-gray-700">
                Pioneer-Telstar St., Doña Vicenta Village, <br />
                Davao City, Philippines
              </p>
            </div>
          </div>
        </div>

        {/* Map */}
        <div className="h-96 w-full lg:col-span-1">
          <iframe
            className="rounded-md w-full h-full shadow"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d62865.21576585396!2d125.5997056!3d7.0780976!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x32f96d0cb85b1911%3A0x90761d0c4ac3c380!2sEvelyn%20E.%20Fabie%20College%2C%20Inc.!5e0!3m2!1sen!2sph!4v1712645824556!5m2!1sen!2sph"
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>

        {/* Form */}
        <form className="space-y-4 w-full text-blue-950">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              type="text"
              placeholder="Your Name"
              className="border border-gray-300 p-3 rounded w-full"
              required
            />
            <input
              type="email"
              placeholder="Your Email"
              className="border border-gray-300 p-3 rounded w-full"
              required
            />
          </div>
          <input
            type="text"
            placeholder="Subject"
            className="border border-gray-300 p-3 rounded w-full"
          />
          <textarea
            rows="5"
            placeholder="Message"
            className="border border-gray-300 p-3 rounded w-full"
            required
          ></textarea>
          <button
            type="submit"
            className="w-full py-3 bg-cyan-700 text-white font-semibold rounded hover:bg-cyan-800 transition duration-300"
          >
            Send Message
          </button>
        </form>
      </section>

      <footer className="bg-gray-800 text-white py-6 text-center">
        <p>
          &copy; {new Date().getFullYear()} Evelyn E. Fabie College, Inc. All
          rights reserved.
        </p>
      </footer>
    </>
  );
}
