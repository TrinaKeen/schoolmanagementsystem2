"use client";

import { useState } from "react";
import AdminHeader from "../components/header";
import { FaLock, FaUser, FaUserPlus, FaQuestionCircle } from "react-icons/fa";
import styles from "./Reports.module.css";
import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";

// Initialize fonts
pdfMake.vfs = pdfFonts.pdfMake ? pdfFonts.pdfMake.vfs : pdfFonts.vfs;

// Data configuration
const reportData = {
  studentfees: {
    title: "Student Fees Details",
    headers: ["Student Number", "Program", "Major", "Payment Status"],
    rows: [
      ["SN-0010000001", "Senior HighSchool", "Accounting & Bookkeeping", "Pending"],
      ["SN-0010000002", "Bachelor of Science", "Midwifery","Pending"],
      ["SN-0010000003", "Bachelor of Technical-Vocational Teacher Education", "Automotive Technology","Pending"],
      ["SN-0010000004", "Bachelor of Technical-Vocational Teacher Education", "Food and Services Management","Pending"],
      ["SN-0010000005", "Senior HighSchool", "Biology, Chemistry, Physics, Filipino & Physical Education","Pending"],
    ]
  },
  courses: {
    title: "Semester Course Details",
    headers: ["Detail Code", "Description", "Instructor"],
    rows: [
      ["GAGAA01", "Nemo enim ipsam voluptatem", "John McDonald"],
      ["YAWA22", "Nemo enim ipsam voluptatem", "Laura Vincent"],
      ["HELP00", "Nemo enim ipsam voluptatem", "Laura Vincent"],
      ["HALO13", "Nemo enim ipsam voluptatem", "Laura Vincent"],
      ["GAGO10", "Nemo enim ipsam voluptatem", "John McDonald"],
      ["FFAII01", "Nemo enim ipsam voluptatem", "Laura Vincent"],
      ["HSHS17", "Nemo enim ipsam voluptatem", "John McDonald"],
      ["WEEH08", "Nemo enim ipsam voluptatem", "Laura Vincent"]
    ]
  },
  semesterfees: {
    title: "Semester Fees Details",
    headers: ["Detail Code", "Description", "Charges"],
    rows: [
      ["PHC 1", "Primary HealthCare 1", "$1,500.00"],
      ["GE 114", "Science, Technology and Society", "$540.00"],
      ["AT 213", "Automotive Body Repair and Subtrate Preparation", "$3,399.00"],
      ["PCK. 211", "Technology for Teaching and Learning 1", "$290.00"],
      ["FSM 111", "Occupational Health and Safety Practices", "$129.00"],
      ["FSM 112", "Food Selection and Preservation", "$7,100.00"],
      ["GFD 112", "Fabric and Garment Designing Techniques", "$1,580.00"],
      ["GFD 211", "Pattern Drafting and Designing", "$1,400.00"]
    ]
  },
  enrolled: {
    title: "Student Enrollment Details",
    headers: ["Student Number", "Student Name", "Program", "Major", "Status"],
    rows: [
      ["SN-0010000001", "Melissa","Senior HighSchool","Accounting & Bookkeeping","Active"],
      ["SN-0010000002", "Finn", "Bachelor of Science", "Midwifery","Active"],
      ["SN-0010000003", "Lana", "Bachelor of Technical-Vocational Teacher Education","Automotive Technology","Active"],
      ["SN-0010000004", "Derrick", "Bachelor of Technical-Vocational Teacher Education", "Food and Services Management","Active"],
      ["SN-0010000005", "Eric", "Senior HighSchool", "Biology, Chemistry, Physics, Filipino & Physical Education","Active"],
    ]
  }
};


export default function SchoolDepartment() {
    const [activeTab, setActiveTab] = useState("studentfees");
    
    const handleExportPDF = () => {
        const { title, headers, rows } = reportData[activeTab];
        
        const documentDefinition = {
          content: [
            { text: title, style: "header" },
            {
              table: {
                headerRows: 1,
                widths: Array(headers.length).fill("*"),
                body: [
                  headers.map(header => ({ text: header, style: "tableHeader" })),
                  ...rows
                ]
              }
            }
          ],
          styles: {
            header: {
              fontSize: 18,
              bold: true,
              alignment: "center",
              margin: [0, 0, 0, 10]
            },
            tableHeader: {
              bold: true,
              fontSize: 12,
              fillColor: "#f5f5f5"
            }
          },
          defaultStyle: {
            fontSize: 10,
            font: "Roboto"
          }
        };
    
        pdfMake.createPdf(documentDefinition).download(`${activeTab}-report.pdf`);
      };
    
      // Add PDF button to all tabs
      const renderExportButton = () => (
        <button className={styles.editButton} onClick={handleExportPDF}>
          Export PDF
        </button>
    );

    /*renderTab reference in admin-settings*/
    const renderTab = () => {
        const { headers, rows, title } = reportData[activeTab];
      
        return (
          <div className={styles.tabContent}>
            <h1>{title}</h1>
            <div className={styles.buttonGroup}>
              {renderExportButton()}
            </div>
      
            {/* Conditional Dropdowns */}
            {(activeTab === "courses" || activeTab === "semesterfees") && (
              <div className={styles.dropdownContainer}>
                <select className={styles.dropdown} onChange={(e) => console.log("Filter:", e.target.value)}>
                  <option value="0">Select Course:</option>
                  <option value="Senior Highschool">Senior Highschool</option>
                  <option value="Midwifery">Midwifery</option>
                  <option value="Automotive Technology">Automotive Technology</option>
                </select>
              </div>
            )}
      
            {activeTab === "enrolled" && (
              <div className={styles.dropdownContainer}>
                <select className={styles.dropdown} onChange={(e) => console.log("Filter status:", e.target.value)}>
                  <option value="all">All Statuses</option>
                  <option value="Active">Active</option>
                  <option value="Inactive">Inactive</option>
                </select>
              </div>
            )}
      
            {/* Dynamic Table */}
            <table className={styles.Table1}>
              <thead>
                <tr>
                  {headers.map((header) => (
                    <th key={header}>{header}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {rows.map((row, rowIndex) => (
                  <tr key={rowIndex}>
                    {row.map((cell, cellIndex) => (
                      <td key={`${rowIndex}-${cellIndex}`}>{cell}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        );
      };

    return (
        <div>
            <AdminHeader />
            <div className={styles.container}>
                <div className={styles.sidebar}>
                    <h2>Reports</h2>
                    <ul>
                        <li className={activeTab === "studentfees" ? styles.active : ""}
                        onClick={() => setActiveTab("studentfees")}> Student Fees </li>

                        <li className={activeTab === "courses" ? styles.active : ""}
                        onClick={() => setActiveTab("courses")}> Semester Courses </li>

                        <li className={activeTab === "semesterfees" ? styles.active : ""}
                        onClick={() => setActiveTab("semesterfees")}> Semester Fees </li>

                        <li className={activeTab === "enrolled" ? styles.active : ""}
                        onClick={() => setActiveTab("enrolled")}> Students Enrolled</li>
                    </ul>
                </div>
                <div className={styles.content}>{renderTab()}</div>
            </div>
            
        </div>
    );
};

// OpenAI. (2025, February 20). Response to the prompt "How to implement an export pdf function with pdf make?"
// Deepseek (Deepseek-R1). Accessed and retrieved on Feb 20, 2025 from https://www.deepseek.com/