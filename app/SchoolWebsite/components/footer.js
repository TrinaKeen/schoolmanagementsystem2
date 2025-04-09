"use client";

import React, { useEffect, useState, useRef } from "react";
import Link from "next/link";

export default function WebsiteFooter() {
  return (
    <footer className="bg-gray-900 text-white py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 font-sans">
        <div className="flex flex-col md:flex-row items-center justify-between">
          <div className="text-white">
            <h2 className="text-3xl font-bold mb-4">Contact</h2>

            <div className="flex items-center mb-3">
              {/* Phone Icon */}
              <svg
                className="w-5 h-5 text-cyan-400 mr-3"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M6.6 10.8a15.1 15.1 0 0 0 6.6 6.6l2.2-2.2c.2-.2.5-.3.7-.2a11.3 11.3 0 0 0 3.6.6c.4 0 .8.3.8.8v3.7c0 .4-.3.8-.8.8A16 16 0 0 1 3 5c0-.4.3-.8.8-.8h3.7c.4 0 .8.3.8.8 0 1.2.2 2.4.6 3.6.1.3 0 .5-.2.7l-2.1 2.2z" />
              </svg>
              <p className="text-xl">(082) 227-3469 / 227-3686</p>
            </div>

            <div className="flex items-center mb-3">
              {/* Email Icon */}
              <svg
                className="w-5 h-5 text-cyan-400 mr-3"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4a2 2 0 0 1-2-2V6c0-1.1.9-2 2-2zm0 2v.01l8 5 8-5V6H4zm0 12h16V8l-8 5-8-5v10z" />
              </svg>
              <p className="text-xl">evelynfabiecollegeinc@gmail.com</p>
            </div>

            <div className="flex items-center mb-3">
              {/* Location Icon */}
              <svg
                className="w-5 h-5 text-cyan-400 mr-3"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5A2.5 2.5 0 1 1 12 6a2.5 2.5 0 0 1 0 5.5z" />
              </svg>
              <p className="text-xl">
                Pioneer-Telstar St., Doña Vicenta Village, Davao City,
                Philippines
              </p>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="mt-6 border-t border-gray-700 pt-4 text-center text-sm text-gray-500">
          © {new Date().getFullYear()} Evelyn E. Fabie College, Inc. All rights
          reserved.
        </div>
      </div>
    </footer>
  );
}
