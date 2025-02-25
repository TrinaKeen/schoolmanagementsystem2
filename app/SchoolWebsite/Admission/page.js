import Head from 'next/head';
import Banner from '../components/Banner';
import Footer from '../components/Footer';
import styles from './Admission.module.css';

const About = () => {
  return (
    <>
      <Head>
        <title>About Us - Evelyn E. Fabie College</title>
        <meta name="description" content="Undergraduate Admission Process for Evelyn E. Fabie College" />
      </Head>

      <Banner />

      <main className={styles.pageContainer}>
        <div className={styles.contentArea}>
          <h2>Undergraduate Admission Process</h2>
          <p>Habitant pharetra id magna duis congue ridiculus fringilla neque...</p>
          <h3>Step 1:</h3>
          <p>Lorem ipsum dolor amet, consectetur adipiscing elit...</p>
          <h3>Step 2:</h3>
          <p>Conubia sodales gravida laoreet natoque nibh...</p>
          <h3>Step 3:</h3>
          <p>Ullamcorper ex turpis luctus senectus convallis class odio...</p>
          <h3>NOTE:</h3>
          <p>Ullamcorper ex turpis luctus senectus convallis class odio...</p>
          <h3>Step 4:</h3>
          <p>Ullamcorper ex turpis luctus senectus convallis class odio...</p>
          <h3>Step 5:</h3>
          <p>Ullamcorper ex turpis luctus senectus convallis class odio...</p>
          <h3>Reminder:</h3>
          <p>Ullamcorper ex turpis luctus senectus convallis class odio...</p>
        </div>
      </main>

      <Footer />
    </>
  );
};

export default About;
