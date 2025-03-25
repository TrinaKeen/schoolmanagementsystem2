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
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
} from "recharts";

const currencyFormat = (value) => `$${Number(value).toLocaleString()}`;

export default function AdminDashboard() {
  const [totalStudents, setTotalStudents] = useState(0);
  const [totalInstructors, setTotalInstructors] = useState(0);
  const [totalEarnings, setTotalEarnings] = useState(0);
  const [genderBreakdown, setGenderBreakdown] = useState([]);
  const [earningsData, setEarningsData] = useState([]);
  const [expenseData, setExpenseData] = useState([]);

  useEffect(() => {
    fetch("/api/admin/stats/totalStudents")
      .then((res) => res.json())
      .then((data) => setTotalStudents(data.totalStudents))
      .catch((err) => console.error("Failed to load student count", err));

    fetch("/api/admin/stats/totalInstructors")
      .then((res) => res.json())
      .then((data) => setTotalInstructors(data.totalInstructors))
      .catch((err) => console.error("Failed to load instructor count", err));

    fetch("/api/admin/stats/totalEarnings")
      .then((res) => {
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        return res.json();
      })
      .then((data) => setTotalEarnings(data.totalEarnings))
      .catch((err) => console.error("Failed to load earnings", err)); // Added this line to catch errors in the fetch request since it was giving an error in the console.  - Trisha

    fetch("/api/admin/stats/studentGenderBreakdown")
      .then((res) => res.json())
      .then((data) => setGenderBreakdown(data.genderStats))
      .catch((err) => console.error("Failed to load gender breakdown", err));

    fetch("/api/admin/stats/monthlyEarnings")
      .then((res) => res.json())
      .then((data) => setEarningsData(data.monthly))
      .catch((err) => console.error("Failed to load monthly earnings", err));

    fetch("/api/admin/stats/monthlyExpenses")
      .then((res) => res.json())
      .then((data) => setExpenseData(data.monthly))
      .catch((err) => console.error("Failed to load monthly expenses", err));
  }, []);

  const COLORS = ["#3b82f6", "#f59e0b"];

  return (
    <div className={styles.wrapper}>
      <Sidebar />
      <div className={styles.dashboardContent}>
        <h2 className={styles.pageTitle}>Admin Dashboard</h2>

        {/* Summary Stats */}
        <div className={styles.summaryGrid}>
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
        </div>

        {/* Charts Section */}
        <div className={styles.chartGrid}>
          {/* Earnings Area Chart */}
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

          {/* Expenses Bar Chart */}
          <div className={styles.chartCard}>
            <h4 className={styles.chartTitle}>Expenses</h4>
            <ResponsiveContainer width="100%" height={200}>
              <BarChart data={expenseData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip formatter={currencyFormat} />
                <Bar dataKey="expenses" fill="#38bdf8" />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Gender Pie Chart */}
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
