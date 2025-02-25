"use client";

import React from 'react';
import styles from '../components/AdminandPrograms.modules.css'; 
import WebsiteHeader from '../components/WebsiteHeader';

export default function Home() {
  return (
    <div style={{ backgroundColor: 'white', height: '100vh' }}>
      <WebsiteHeader />
    
      <main className={styles.body}>
        <div className={styles.container}>
          
          <section>
            <h1>BACHELOR DEGREE PROGRAMS</h1>   
            <table>
              <thead>
                <tr>
                  <th>COURSE</th>
                  <th>CODE</th>
                  <th>MAJOR</th>
                  <th>ACTION</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>BACHELOR OF TECHNICAL - VOCATIONAL TEACHER EDUCATION</td>
                  <td>BTVED</td>
                  <td>AUTOMOTIVE TECHNOLOGY</td>
                  <td><a href="/SchoolWebsite2/Programs/BTVED">view</a></td>
                </tr>
                <tr>
                  <td>BACHELOR OF TECHNICAL - VOCATIONAL TEACHER EDUCATION</td>
                  <td>TVED</td>
                  <td>FOOD AND SERVICES MANAGEMENT</td>
                  <td><a href="/SchoolWebsite2/Programs/TVED">view</a></td>
                </tr>
                <tr>
                  <td>BACHELOR OF TECHNICAL - VOCATIONAL TEACHER EDUCATION</td>
                  <td>TVED</td>
                  <td>GARMENTS, FASHION AND DESIGN</td>
                  <td><a href="#">view</a></td>
                </tr>
                <tr>
                  <td>BACHELOR OF SCIENCE</td>
                  <td>BSM</td>
                  <td>MIDWIFERY</td>
                  <td><a href="#">view</a></td>
                </tr>
              </tbody>
            </table>
          </section>

          <section>
            <h1>TECHNICAL - VOCATIONAL AND LIVELIHOOD TRACK</h1>   
            <table>
              <thead>
                <tr>
                  <th>STRAND</th>
                  <th>PROGRAMS</th>
                  <th>ACTION</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>HOME ECONOMICS STRAND</td>
                  <td>
                    <ul>
                      <li>CAREGIVING</li>
                      <li>DRESSMAKER</li>
                      <li>HOUSEKEEPING</li>
                      <li>WELLNESS MESSAGE</li>
                      <li>TAILORING</li>
                      <li>COOKERY</li>
                    </ul>
                  </td>
                  <td><a href="#">view</a></td>
                </tr>
                <tr>
                  <td>INDUSTRIAL ARTS STRAND</td>
                  <td>
                    <ul>
                      <li>AUTOMOTIVE</li>
                      <li>DRIVING</li>
                      <li>PLUMBING</li>
                    </ul>
                  </td>
                  <td><a href="#">view</a></td>
                </tr>
              </tbody>
            </table>
          </section>

          <section>
            <h1>SENIOR HIGH SCHOOL</h1>
            <table>
              <thead>
                <tr>
                  <th>STRANDS</th>
                  <th>SPECIALIZATION</th>
                  <th>ACTION</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>ABM</td>
                  <td>Accounting & Bookkeeping</td>
                  <td><a href="#">view</a></td>
                </tr>
                <tr>
                  <td>STEM</td>
                  <td>Mathematics & Basic Mechanical Engineering</td>
                  <td><a href="#">view</a></td>
                </tr>
                <tr>
                  <td>GAS</td>
                  <td>Biology, Chemistry, Physics, Filipino & Physical Education</td>
                  <td><a href="#">view</a></td>
                </tr>
                <tr>
                  <td>HUMSS</td>
                  <td>General Psychology, Political Science, History, Journalism & Creative Writing</td>
                  <td><a href="#">view</a></td>
                </tr>
              </tbody>
            </table>
          </section>

        </div>
      </main> 
    </div>  
  );
}
