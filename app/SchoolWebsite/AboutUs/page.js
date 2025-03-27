"use client"
import Head from 'next/head';
import styles from './AboutUs.module.css';
import WebsiteHeader from '../components/WebsiteHeader';

const About = () => {
  return (
    <>
      <Head>
        <title>About Us - Evelyn E. Fabie College</title>
        <meta name="description" content="Learn about the history, mission, and vision of Evelyn E. Fabie College, Inc." />
      </Head>

      <WebsiteHeader />

      <main className={styles.pageContainer}>
        <div className={styles.hours}>
          <p>Monday - Friday: 7:00am - 5:00pm</p>
          <p>Saturday: 8:00am - 3:00pm</p>
        </div>

        <section className={styles.contentArea}>
          <div className={styles.headerSection}>
            <h2>Our History</h2>
            <p>
              Pioneer-Telstar St., Doña Vicenta Village, Davao City
            </p>
            <p>
              Evelyn E. Fabie College, Inc. (formerly Fabie School of Midwifery) is a private college in Davao City. It has programs for Senior High School and college students. EEFCI has available strands from the Academic and the Technical-Vocational-Livelihood (TVL) tracks. 
              The undergraduate programs offered are in Technical-Vocational Teacher Education and in Midwifery.
              Evelyn E. Fabi College is recognized by the Commission on Higher Education (CHED) and the Department of Education (DepEd).
            </p>
          </div>

          <div className={styles.missionVision}>
            <h2>Our Mission</h2>
            <p>Choosing the right program can help you set your future goals and visualize where you want to be. 
              Whether you want to be an engineer, a teacher, an accountant, or you want to level up in your profession, 
              making yourself informed with the right choices will surely back you up in the future. 
              Are you ready to map your career with Evelyn E. Fabie College, Inc.? 
              Make the best decision in choosing the right path for you, click through the list of programs offered by Evelyn E. Fabie College, Inc. below:</p>
              <a href='/SchoolWebsite/AdminandPrograms'>View Available Programs</a>
            <h2>Our Vision</h2>
            <p>Conubia sodales gravida laoreet natoque nibh. Etiam feugiat lorem non metus vulputate.</p>
          </div>

          <div className={styles.almaMater}>
            <h2>Evelyn E. Fabie College, Inc. Alma Mater</h2>
            <p>Ullamcorper ex turpis luctus senectus convallis class odio nec lacus.</p>
          </div>
        </section>
      </main>

      </>
  );
};

export default About;
