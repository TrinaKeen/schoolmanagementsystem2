"use client";

import React, { useState } from "react";
import styles from "./teacherPage.module.css";
import { TEACHERS } from ".";
import AdminHeader from "../components/page";

export default function teacherPage() {
  const [selectedGrade, setSelectedGrade] = useState(null);
  const [selectedYear, setSelectedYear] = useState(null);
  const [teacherList, setTeacherList] = useState([]);

  // credit: BlackBox AI & W3Schools
  // handles the grade selection
  const handleGradeClick = (grade) => {
    setSelectedGrade(grade);
    setSelectedYear(null);

    if (grade !== "College") {
      setTeacherList(TEACHERS[0][grade]);
    } else {
      setTeacherList([]);
    }
  };

  // handles the college yr selection
  const handleYearClick = (year) => {
    console.log("Year clicked:", year);
    console.log("Teachers for selected year:", TEACHERS[0]["College"][year]);
    setSelectedYear(year);
    setTeacherList(TEACHERS[0]["College"][year]); //update teacher list for the selected yr
  };

  return (
    // credit: ChatGPT & BlackBox AI
    <div className="text-black">
      <AdminHeader />
      <div className={styles.container}>
        <div className={styles.sidebar}>
          <h2>Grade Levels</h2>
          <ul>
            <li
              className={selectedGrade === "Grade11" ? styles.active : ""}
              onClick={() => handleGradeClick("Grade11")}
            >
              {" "}
              Grade 11
            </li>
            <li
              className={selectedGrade === "Grade12" ? styles.active : ""}
              onClick={() => handleGradeClick("Grade12")}
            >
              {" "}
              Grade 12
            </li>
            <li
              className={selectedYear === "College" ? styles.active : ""}
              onClick={() => handleGradeClick("College")}
            >
              {" "}
              College
            </li>

            {/** for them college yr dropdown :D */}
            {selectedGrade === "College" && (
              <ul>
                {Object.keys(TEACHERS[0]["College"]).map((year) => (
                  <li
                    key={year}
                    className={selectedYear === year ? styles.active : ""}
                    onClick={() => handleYearClick(year)}
                  >
                    {year}
                  </li>
                ))}
              </ul>
            )}
          </ul>
        </div>

        {/**content to display teachers */}
        <div className={styles.content}>
          <div className={styles.tabContent}>
            <h1>Teachers</h1>
          </div>
          {teacherList.length > 0 ? (
            <ul>
              {teacherList.map((teacher, index) => (
                <li key={index}>{teacher}</li>
              ))}
            </ul>
          ) : (
            <p>Select a grade level and year to view the teachers</p>
          )}
        </div>
      </div>
    </div>
  );
}

// I'd like to thank my babygirls ChatGPT, BlackBox AI, and W3Schools for helping me compose this code <3
