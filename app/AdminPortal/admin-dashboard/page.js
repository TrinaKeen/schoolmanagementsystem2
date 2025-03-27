"use client";

import { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import styles from "./AdminDashboard.module.css";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";

const currencyFormat = (value) => `$${Number(value).toLocaleString()}`;

export default function AdminDashboard() {
  const [totalStudents, setTotalStudents] = useState(0);
  const [totalInstructors, setTotalInstructors] = useState(0);
  const [totalEarnings, setTotalEarnings] = useState(0);
  const [totalPrograms, setTotalPrograms] = useState(0);
  const [totalCourses, setTotalCourses] = useState(0);
  const [genderBreakdown, setGenderBreakdown] = useState([]);
  const [earningsData, setEarningsData] = useState([]);

  useEffect(() => {
    fetch("/api/admin/stats/totalStudents")
      .then((res) => res.json())
      .then((data) => setTotalStudents(data.totalStudents));

    fetch("/api/admin/stats/totalInstructors")
      .then((res) => res.json())
      .then((data) => setTotalInstructors(data.totalInstructors));

    fetch("/api/admin/stats/totalEarnings")
      .then((res) => res.json())
      .then((data) => setTotalEarnings(data.totalEarnings));

    fetch("/api/admin/stats/totalPrograms")
      .then((res) => res.json())
      .then((data) => setTotalPrograms(data.totalPrograms));

    fetch("/api/admin/stats/totalCourses")
      .then((res) => res.json())
      .then((data) => setTotalCourses(data.totalCourses));

    fetch("/api/admin/stats/studentGenderBreakdown")
      .then((res) => res.json())
      .then((data) => setGenderBreakdown(data.genderStats));

    fetch("/api/admin/stats/monthlyEarnings")
      .then((res) => res.json())
      .then((data) => setEarningsData(data.monthly));
  }, []);

  const COLORS = ["#3b82f6", "#f59e0b"];

  return (
    <div className={styles.wrapper}>
      <Sidebar />
      <div className={styles.dashboardContent}>
        <h2 className={styles.pageTitle}>Admin Dashboard</h2>
        {/* <p className={styles.breadcrumb}>Home &gt; Admin</p> */}

        {/* Summary Cards */}
        <div className={styles.summaryGridWide}>
          <div className={styles.card}>
            <p className={styles.cardLabel}>Students</p>
            <h3 className={styles.cardValue}>{totalStudents}</h3>
          </div>
          <div className={styles.card}>
            <p className={styles.cardLabel}>Teachers</p>
            <h3 className={styles.cardValue}>{totalInstructors}</h3>
          </div>
          <div className={styles.card}>
            <p className={styles.cardLabel}>Earnings</p>
            <h3 className={styles.cardValue}>
              {currencyFormat(totalEarnings)}
            </h3>
          </div>
          <div className={styles.card}>
            <p className={styles.cardLabel}>Programs</p>
            <h3 className={styles.cardValue}>{totalPrograms}</h3>
          </div>
          <div className={styles.card}>
            <p className={styles.cardLabel}>Courses</p>
            <h3 className={styles.cardValue}>{totalCourses}</h3>
          </div>
        </div>

        {/* Charts Section */}
        <div className={styles.chartGrid}>
          <div className={styles.chartCard}>
            <h4 className={styles.chartTitle}>Earnings</h4>
            <div className={styles.chartLegend}>
              <span className={styles.legendItem}>
                <span className={styles.blueDot} /> Total Collections
              </span>
              <span className={styles.legendItem}>
                <span className={styles.redDot} /> Fees Collection
              </span>
            </div>
            <ResponsiveContainer width="100%" height={200}>
              <AreaChart data={earningsData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip formatter={currencyFormat} />
                <Area
                  type="monotone"
                  dataKey="earnings"
                  stroke="#f43f5e"
                  fill="#fda4af"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>

          <div className={styles.chartCard}>
            <h4 className={styles.chartTitle}>Students</h4>
            <ResponsiveContainer width="100%" height={200}>
              <PieChart>
                <Pie
                  data={genderBreakdown}
                  dataKey="value"
                  nameKey="label"
                  outerRadius={70}
                >
                  {genderBreakdown.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
            <div className={styles.genderBreakdown}>
              {genderBreakdown.map((entry, index) => (
                <div key={index} className={styles.genderItem}>
                  <span
                    className={index === 0 ? styles.blueDot : styles.yellowDot}
                  />
                  {entry.label}:{" "}
                  <span className="font-semibold">{entry.value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
