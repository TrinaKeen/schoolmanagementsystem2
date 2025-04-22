"use client";

import { useEffect, useState } from "react";
import axios from "axios";

const ApprovedEmployee = () => {
  const [count, setCount] = useState<number>(0);

  useEffect(() => {
    axios
      .get("/api/employees")
      .then((res) => setCount(res.data.length))
      .catch(() => setCount(0));
  }, []);

  return (
    <div className="rounded-2xl bg-blue-200 p-4 flex-1 min-w-[130px] shadow-sm transition-all duration-300 transform hover:scale-105 hover:shadow-lg">
      <div className="flex justify-end">
        <span className="text-[10px] bg-white px-2 py-1 rounded-full text-green-600">
          {new Date().getFullYear()}/
          {(new Date().getFullYear() + 1).toString().slice(-2)}
        </span>
      </div>
      <h1 className="text-4xl font-semibold my-3 ml-2">
        {count.toLocaleString()}
      </h1>
      <h2 className="text-sm font-medium text-gray-500">Employees</h2>
    </div>
  );
};

export default ApprovedEmployee;
