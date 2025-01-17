"use client";

import React, { useState } from "react";
import styles from "./teacherPage.module.css";
import { TEACHERS } from ".";
import AdminHeader from "../components/page";

export default function teacherPage() {
  const [selectedGrade, setSelectedGrade] = useState(null);
  const [selectedYear, setSelectedYear] = useState(null);
  const [teacherList, setTeacherList] = useState([]);

  // handles the grade selection
  const handleGradeClick = (grade) => {
    setSelectedGrade(grade);
    setSelectedYear(null);

    if (grade != "college") {
      setTeacherList(TEACHERS[0][grade]);
    } else {
      setTeacherList([]);
    }
  };

  // handles the college yr selection
  const handleYearClick = (year) => {
    setSelectedYear(year);
    setSelectedGrade(null);
  };

  return (
    <section>
      <AdminHeader />
      <div className={styles.container}>
        <div className={styles.sidebar}>
          <h2>Grade Levels</h2>
          <ul>
            <li
              className={selectedGrade === "Grade11" ? styles.active : ""}
              onclick={() => handleGradeClick("Grade11")}
            >
              {" "}
              Grade 11
            </li>
            <li
              className={selectedGrade === "Grade12" ? styles.active : ""}
              onclick={() => handleGradeClick("Grade12")}
            >
              {" "}
              Grade 12
            </li>
            <li
              className={selectedYear === "College" ? styles.active : ""}
              onclick={() => handleGradeClick("College")}
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
                    onclick={() => handleYearClick(year)}
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
          <h1>Teachers</h1>
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
    </section>
  );
}
