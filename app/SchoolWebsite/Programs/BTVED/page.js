"use client";

import React from "react";
import Header from "../../components/header.js";
import Footer from "../../components/footer.js";

export default function BachelorAndTechVocPage() {
  return (
    <div className="bg-white min-h-screen text-gray-800 font-sans">
      <Header />
      <div className="h-[100px] md:h-[120px]" />

      <main className="max-w-6xl mx-auto px-4 md:px-8 py-12 space-y-16">
        {/* Bachelor Degree Programs */}
        <section>
          <h1 className="text-3xl font-bold text-cyan-700 mb-6 text-center">
            Bachelor Degree Programs
          </h1>

          <table className="min-w-full border border-gray-300 text-base">
            <thead className="bg-[#005f73] text-white">
              <tr>
                <th className="py-2 px-4 border">Course</th>
                <th className="py-2 px-4 border">Code</th>
                <th className="py-2 px-4 border">Major</th>
              </tr>
            </thead>
            <tbody>
              {[
                {
                  course:
                    "BACHELOR OF TECHNICAL - VOCATIONAL TEACHER EDUCATION",
                  code: "BTVED",
                  major: "AUTOMOTIVE TECHNOLOGY",
                },
                {
                  course:
                    "BACHELOR OF TECHNICAL - VOCATIONAL TEACHER EDUCATION",
                  code: "TVED",
                  major: "FOOD AND SERVICES MANAGEMENT",
                },
                {
                  course:
                    "BACHELOR OF TECHNICAL - VOCATIONAL TEACHER EDUCATION",
                  code: "TVED",
                  major: "GARMENTS, FASHION AND DESIGN",
                },
                {
                  course: "BACHELOR OF SCIENCE",
                  code: "BSM",
                  major: "MIDWIFERY",
                },
              ].map((item, idx) => (
                <tr key={idx} className="hover:bg-gray-50">
                  <td className="py-2 px-4 border">{item.course}</td>
                  <td className="py-2 px-4 border">{item.code}</td>
                  <td className="py-2 px-4 border">{item.major}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>

        {/* Technical-Vocational Track */}
        <section>
          <h1 className="text-3xl font-bold text-cyan-700 mb-6 text-center">
            Technical-Vocational and Livelihood Track
          </h1>

          <table className="min-w-full border border-gray-300 text-base">
            <thead className="bg-[#005f73] text-white">
              <tr>
                <th className="py-2 px-4 border">Strand</th>
                <th className="py-2 px-4 border">Programs</th>
              </tr>
            </thead>
            <tbody>
              <tr className="hover:bg-gray-50">
                <td className="py-2 px-4 border">Home Economics Strand</td>
                <td className="py-2 px-4 border">
                  <ul className="list-disc pl-5 space-y-1">
                    <li>Caregiving</li>
                    <li>Dressmaker</li>
                    <li>Housekeeping</li>
                    <li>Wellness Massage</li>
                    <li>Tailoring</li>
                    <li>Cookery</li>
                  </ul>
                </td>
              </tr>
              <tr className="hover:bg-gray-50">
                <td className="py-2 px-4 border">Industrial Arts Strand</td>
                <td className="py-2 px-4 border">
                  <ul className="list-disc pl-5 space-y-1">
                    <li>Automotive</li>
                    <li>Driving</li>
                    <li>Plumbing</li>
                  </ul>
                </td>
              </tr>
            </tbody>
          </table>
        </section>
      </main>
      <Footer />
    </div>
  );
}
