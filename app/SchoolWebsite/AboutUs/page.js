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
              Habitants pharetra id magna duis congue ridiculus fringilla neque. Sed sit amet est ut felis fermentum elementum.
            </p>
          </div>

          <div className={styles.missionVision}>
            <h2>Our Mission</h2>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero.</p>
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
