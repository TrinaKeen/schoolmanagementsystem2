"use client";

import { useState } from "react";
import AdminHeader from "../components/header";
import { FaLock, FaUser, FaUserPlus, FaQuestionCircle } from "react-icons/fa";
import styles from "./Reports.module.css";
import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";

//Referenced from Deepseek
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
        switch (activeTab) {
            case "studentfees":
                return(
                    <div className={styles.tabContent}>
                        <h1>Student Fees Details</h1>
                        <div className={styles.buttonGroup}>
                        {renderExportButton()}
                        </div>
                        <table className={styles.Table1}>
                            <thead>
                                <tr>
                                    <th>Detail Code</th>
                                    <th>Description</th>
                                    <th>Charges</th>
                                </tr>
                            </thead>
                            <tbody>
                            <tr>
                                    <td>GAGAA01</td>
                                    <td>Nemo enim ipsam voluptatem</td>
                                    <td>$1,500.00</td>
                                </tr>
                                <tr>
                                    <td>YAWA22</td>
                                    <td>Nemo enim ipsam voluptatem</td>
                                    <td>$540.00</td>
                                </tr>
                                <tr>
                                    <td>HELP00</td>
                                    <td>Nemo enim ipsam voluptatem</td>
                                    <td>$3,399.00</td>
                                </tr>
                                <tr>
                                    <td>HALO13</td>
                                    <td>Nemo enim ipsam voluptatem</td>
                                    <td>$290.00</td>
                                </tr>
                                <tr>
                                    <td>GAGO10</td>
                                    <td>Nemo enim ipsam voluptatem</td>
                                    <td>$129.00</td>
                                </tr>
                                <tr>
                                    <td>FFAII01</td>
                                    <td>Nemo enim ipsam voluptatem</td>
                                    <td>$7,100.00</td>
                                </tr>
                                <tr>
                                    <td>HSHS17</td>
                                    <td>Nemo enim ipsam voluptatem</td>
                                    <td>$1,580.00</td>
                                </tr>
                                <tr>
                                    <td>WEEH08</td>
                                    <td>Nemo enim ipsam voluptatem</td>
                                    <td>$1,400.00</td>
                                </tr>
                            </tbody>
                            
                        </table>
                    </div>
                );
            
            case "courses":
                return(
                    <div className={styles.tabContent}>
                        <h1>Semester Course Details</h1>
                        <div className={styles.buttonGroup}>
                        {renderExportButton()}
                        </div>
                        <div className={styles.dropdownContainer}>
                            <select className={styles.dropdown}>
                                <option value="0"> Select Course:</option>
                                <option value="1"> Senior Highschool Grade 11</option>
                                <option value="2"> Senior Highschool Grade 12</option>
                                <option value="3"> Bachelor of Science in Midwifery</option>
                                <option value="4"> Bachelor of Technical-Vocational Teacher Education</option>
                            </select>
                        </div>
                        <table className={styles.Table1}>
                            <thead>
                                <tr>
                                    <th>Detail Code</th>
                                    <th>Description</th>
                                    <th>Instructor</th>
                                </tr>
                            </thead>
                            <tbody>
                            <tr>
                                    <td>GAGAA01</td>
                                    <td>Nemo enim ipsam voluptatem</td>
                                    <td>John McDonald</td>
                                </tr>
                                <tr>
                                    <td>YAWA22</td>
                                    <td>Nemo enim ipsam voluptatem</td>
                                    <td>Laura Vincent</td>
                                </tr>
                                <tr>
                                    <td>HELP00</td>
                                    <td>Nemo enim ipsam voluptatem</td>
                                    <td>Laura Vincent</td>
                                </tr>
                                <tr>
                                    <td>HALO13</td>
                                    <td>Nemo enim ipsam voluptatem</td>
                                    <td>Laura Vincent</td>
                                </tr>
                                <tr>
                                    <td>GAGO10</td>
                                    <td>Nemo enim ipsam voluptatem</td>
                                    <td>John McDonald</td>
                                </tr>
                                <tr>
                                    <td>FFAII01</td>
                                    <td>Nemo enim ipsam voluptatem</td>
                                    <td>Laura Vincent</td>
                                </tr>
                                <tr>
                                    <td>HSHS17</td>
                                    <td>Nemo enim ipsam voluptatem</td>
                                    <td>John McDonald</td>
                                </tr>
                                <tr>
                                    <td>WEEH08</td>
                                    <td>Nemo enim ipsam voluptatem</td>
                                    <td>Laura Vincent</td>
                                </tr>
                            </tbody>
                            
                        </table>

                    </div>
                );
            case "semesterfees":
                return(
                    <div className={styles.tabContent}>
                        <h1>Semester Fees Details</h1>
                        <div className={styles.buttonGroup}>
                        {renderExportButton()}
                        </div>
                        <div className={styles.dropdownContainer}>
                            <select className={styles.dropdown}>
                                <option value="0"> Select Course:</option>
                                <option value="1"> Senior Highschool Grade 11</option>
                                <option value="2"> Senior Highschool Grade 12</option>
                                <option value="3"> Bachelor of Science in Midwifery</option>
                                <option value="4"> Bachelor of Technical-Vocational Teacher Education</option>
                            </select>
                        </div>
                        <table className={styles.Table1}>
                            <thead>
                                <tr>
                                    <th>Detail Code</th>
                                    <th>Description</th>
                                    <th>Charges</th>
                                </tr>
                            </thead>
                            <tbody>
                            <tr>
                                    <td>GAGAA01</td>
                                    <td>Nemo enim ipsam voluptatem</td>
                                    <td>$1,500.00</td>
                                </tr>
                                <tr>
                                    <td>YAWA22</td>
                                    <td>Nemo enim ipsam voluptatem</td>
                                    <td>$540.00</td>
                                </tr>
                                <tr>
                                    <td>HELP00</td>
                                    <td>Nemo enim ipsam voluptatem</td>
                                    <td>$3,399.00</td>
                                </tr>
                                <tr>
                                    <td>HALO13</td>
                                    <td>Nemo enim ipsam voluptatem</td>
                                    <td>$290.00</td>
                                </tr>
                                <tr>
                                    <td>GAGO10</td>
                                    <td>Nemo enim ipsam voluptatem</td>
                                    <td>$129.00</td>
                                </tr>
                                <tr>
                                    <td>FFAII01</td>
                                    <td>Nemo enim ipsam voluptatem</td>
                                    <td>$7,100.00</td>
                                </tr>
                                <tr>
                                    <td>HSHS17</td>
                                    <td>Nemo enim ipsam voluptatem</td>
                                    <td>$1,580.00</td>
                                </tr>
                                <tr>
                                    <td>WEEH08</td>
                                    <td>Nemo enim ipsam voluptatem</td>
                                    <td>$1,400.00</td>
                                </tr>
                            </tbody>
                            
                        </table>
                    </div>
                    );
            case "enrolled":
                return(
                    <div className={styles.tabContent}>
                        <h1>Student Enrollment Details</h1>
                        <div className={styles.buttonGroup}>
                        {renderExportButton()}
                        </div>
                        <div className={styles.dropdownContainer}>
                            <select className={styles.dropdown}>
                                <option value="0"> Select Status:</option>
                                <option value="1"> Active</option>
                                <option value="2"> Inactive</option>
                            </select>
                        </div>
                        <table className={styles.Table1}>
                            <thead>
                                <tr>
                                    <th>Student ID</th>
                                    <th>Student Name</th>
                                    <th>Status</th>
                                </tr>
                            </thead>
                            <tbody>
                            <tr>
                                    <td>0000</td>
                                    <td>Melissa</td>
                                    <td>Active</td>
                                </tr>
                                <tr>
                                    <td>1111</td>
                                    <td>Finn</td>
                                    <td>Active</td>
                                </tr>
                                <tr>
                                    <td>2222</td>
                                    <td>Lana</td>
                                    <td>Active</td>
                                </tr>
                                <tr>
                                    <td>3333</td>
                                    <td>Derrick</td>
                                    <td>Active</td>
                                </tr>
                                <tr>
                                    <td>4444</td>
                                    <td>Eric</td>
                                    <td>Active</td>
                                </tr>
                                <tr>
                                    <td>5555</td>
                                    <td>Martha</td>
                                    <td>Active</td>
                                </tr>
                                <tr>
                                    <td>6666</td>
                                    <td>Vincent</td>
                                    <td>Active</td>
                                </tr>
                                <tr>
                                    <td>7777</td>
                                    <td>Jake</td>
                                    <td>Active</td>
                                </tr>
                            </tbody>
                            
                        </table>
                    </div>
                    );
        }
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