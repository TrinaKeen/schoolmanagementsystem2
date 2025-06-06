"use client";

import { useEffect, useState } from "react";
import { RadialBarChart, RadialBar, ResponsiveContainer } from "recharts";
import axios from "axios";
import { FaFemale, FaMale } from "react-icons/fa";

export default function CountChart() {
  const [maleCount, setMaleCount] = useState(0);
  const [femaleCount, setFemaleCount] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get("/api/students");
        const students = res.data;

        const male = students.filter(
          (s: { gender: string }) => s.gender === "Male"
        ).length;
        const female = students.filter(
          (s: { gender: string }) => s.gender === "Female"
        ).length;

        setMaleCount(male);
        setFemaleCount(female);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const total = maleCount + femaleCount;

  const data = [
    { name: "Total Students", count: total, fill: "white" },
    { name: "Girls", count: femaleCount, fill: "#ff90c1" },
    { name: "Boys", count: maleCount, fill: "#659edc" },
  ];

  return (
    <div className="bg-white rounded-md w-full h-full p-4 shadow-sm">
      {/* TITLE */}
      <div className="flex justify-between items-center">
        <h1 className="text-lg font-semibold">Students</h1>
      </div>

      {/* CHART */}
      <div className="relative w-full h-[75%]">
        <ResponsiveContainer>
          <RadialBarChart
            cx="50%"
            cy="50%"
            innerRadius="40%"
            outerRadius="100%"
            barSize={32}
            data={data}
          >
            <RadialBar background dataKey="count" />
          </RadialBarChart>
        </ResponsiveContainer>

        {/* Center Gender Icons */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center">
          <FaMale size={50} color="#659edc" className="mr-[-13px]" />
          <FaFemale size={50} color="#ff90c1" />
        </div>
      </div>

      {/* LEGEND */}
      <div className="flex justify-center gap-16 mt-2">
        <div className="flex flex-col items-center gap-1">
          <div className="w-5 h-5 bg-[#659edc] rounded-full" />
          <h1 className="font-bold">{maleCount.toLocaleString()}</h1>
          <h2 className="text-xs text-gray-600">
            Boys ({total > 0 ? Math.round((maleCount / total) * 100) : 0}%)
          </h2>
        </div>
        <div className="flex flex-col items-center gap-1">
          <div className="w-5 h-5 bg-[#ff90c1] rounded-full" />
          <h1 className="font-bold">{femaleCount.toLocaleString()}</h1>
          <h2 className="text-xs text-gray-600">
            Girls ({total > 0 ? Math.round((femaleCount / total) * 100) : 0}%)
          </h2>
        </div>
      </div>
    </div>
  );
}
