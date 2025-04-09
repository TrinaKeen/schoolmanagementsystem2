"use client";

import React from "react";
import Header from "../../components/header.js";
import Footer from "../../components/footer.js";

export default function SeniorHighSchoolPage() {
  return (
    <div className="bg-white min-h-screen text-gray-800 font-sans">
      <Header />
      <div className="h-[100px] md:h-[120px]" />

      <main className="max-w-6xl mx-auto px-4 md:px-8 py-12">
        <section>
          <h1 className="text-3xl font-bold text-cyan-700 mb-6 text-center">
            Senior High School Programs
          </h1>

          <table className="min-w-full border border-gray-300 text-base">
            <thead className="bg-[#005f73] text-white">
              <tr>
                <th className="py-2 px-4 border">Strand</th>
                <th className="py-2 px-4 border">Specialization</th>
              </tr>
            </thead>
            <tbody>
              {[
                {
                  strand: "ABM",
                  specialization: "Accounting & Bookkeeping",
                },
                {
                  strand: "STEM",
                  specialization: "Mathematics & Basic Mechanical Engineering",
                },
                {
                  strand: "GAS",
                  specialization: "Biology, Chemistry, Physics, Filipino & PE",
                },
                {
                  strand: "HUMSS",
                  specialization:
                    "Psychology, Political Science, History, Journalism & Creative Writing",
                },
              ].map((item, idx) => (
                <tr key={idx} className="hover:bg-gray-50">
                  <td className="py-2 px-4 border">{item.strand}</td>
                  <td className="py-2 px-4 border">{item.specialization}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>
      </main>
      <Footer />
    </div>
  );
}
