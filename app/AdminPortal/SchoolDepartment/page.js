"use client";

import { useState } from "react";
import AdminHeader from "../components/page";
import { FaLock, FaUser, FaUserPlus, FaQuestionCircle } from "react-icons/fa";
import styles from "./StudentDepartment.module.css";
import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";

// Initialize fonts
pdfMake.vfs = pdfFonts.pdfMake ? pdfFonts.pdfMake.vfs : pdfFonts.vfs;

const courses = [
    { code: 'GAGAA01', description: 'Nemo enim ipsam voluptatem', instructor: 'John McDonald' },
    { code: 'YAWA22', description: 'Nemo enim ipsam voluptatem', instructor: 'Laura Vincent' },
    { code: 'HELP00', description: 'Nemo enim ipsam voluptatem', instructor: 'Laura Vincent' },
    { code: 'HALO13', description: 'Nemo enim ipsam voluptatem', instructor: 'Laura Vincent' },
    { code: 'GAGO10', description: 'Nemo enim ipsam voluptatem', instructor: 'John McDonald' },
    { code: 'FFAII01', description: 'Nemo enim ipsam voluptatem', instructor: 'Laura Vincent' },
    { code: 'HSHS17', description: 'Nemo enim ipsam voluptatem', instructor: 'John McDonald' },
    { code: 'WEEH08', description: 'Nemo enim ipsam voluptatem', instructor: 'Laura Vincent' },
];

export default function SchoolDepartment() {
    const [activeTab, setActiveTab] = useState("grade11");

    const handleExportPDF = () => {
        const documentDefinition = {
            content: [
                {
                  text: `Department Details - ${activeTab.toUpperCase()}`,
                  style: 'header',
                  margin: [0, 0, 0, 10]
                },
                {
                  table: {
                    headerRows: 1,
                    widths: ['*', '*', '*'],
                    body: [
                      [
                        { text: 'Detail Code', style: 'tableHeader' }, 
                        { text: 'Description', style: 'tableHeader' }, 
                        { text: 'Instructor', style: 'tableHeader' }
                      ],
                      ...courses.map(course => [
                        course.code, 
                        course.description, 
                        course.instructor
                      ])
                    ]
                  }
                }
              ],
              styles: {
                header: {
                  fontSize: 18,
                  bold: true,
                  alignment: 'center'
                },
                tableHeader: {
                  bold: true,
                  fontSize: 12,
                  color: 'black',
                  fillColor: '#f5f5f5'
                }
              },
              // Add fonts definition
              fonts: {
                Roboto: {
                  normal: 'Roboto-Regular.ttf',
                  bold: 'Roboto-Medium.ttf',
                  italics: 'Roboto-Italic.ttf',
                  bolditalics: 'Roboto-MediumItalic.ttf'
                }
              },
              defaultStyle: {
                font: 'Roboto', // Changed from Helvetica
                fontSize: 10
              }
            };
          
            pdfMake.createPdf(documentDefinition).download(`${activeTab}-courses.pdf`);
          };

    const renderTab = () => {
        switch (activeTab) {
            case "grade11":
                return(
                    <div className={styles.tabContent}>
                        <h1>Department Details</h1>
                        <button className={styles.editButton}>Edit Courses</button>
                        <button 
                            className={styles.editButton}
                            onClick={handleExportPDF}
                            >
                            Export PDF
                        </button>
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
            
            case "grade12":
                return(
                    <div className={styles.tabContent}>
                        <h1>Department Details</h1>
                        <button className={styles.editButton}>Edit Courses</button>
                        <button 
                            className={styles.editButton}
                            onClick={handleExportPDF}
                            >
                            Export PDF
                        </button>
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
            case "science-bachelor":
                return(
                    <div className={styles.tabContent}>
                        <h1>Department Details</h1>
                        <button className={styles.editButton}>Edit Courses</button>
                        <button 
                            className={styles.editButton}
                            onClick={handleExportPDF}
                            >
                            Export PDF
                        </button>
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
            case "tech-bachelor":
                return(
                    <div className={styles.tabContent}>
                        <h1>Department Details</h1>
                        <button className={styles.editButton}>Edit Courses</button>
                        <button 
                            className={styles.editButton}
                            onClick={handleExportPDF}
                            >
                            Export PDF
                        </button>
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
        }
    };

    return (
        <div>
            <AdminHeader />
            <div className={styles.container}>
                <div className={styles.sidebar}>
                    <h2>School Department</h2>
                    <ul>
                        <li className={activeTab === "grade11" ? styles.active : ""}
                        onClick={() => setActiveTab("grade11")}> Senior Highschool Grade 11 </li>

                        <li className={activeTab === "grade12" ? styles.active : ""}
                        onClick={() => setActiveTab("grade12")}> Senior Highschool Grade 12 </li>

                        <li className={activeTab === "science-bachelor" ? styles.active : ""}
                        onClick={() => setActiveTab("science-bachelor")}> Bachelor of Science in Midwifery </li>

                        <li className={activeTab === "tech-bachelor" ? styles.active : ""}
                        onClick={() => setActiveTab("tech-bachelor")}> Bachelor of Technical-Vocational Teacher Education </li>
                    </ul>
                </div>
                <div className={styles.content}>{renderTab()}</div>
            </div>
            
        </div>
    );
};