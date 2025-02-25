import Head from 'next/head';
import Banner from '../../SchoolWebsite/components/Banner';
import Footer from '../../SchoolWebsite/components/Footer';
import styles from './AboutUs.module.css';

const About = () => {
  return (
    <>
      <Head>
        <title>About Us - Evelyn E. Fabie College</title>
        <meta name="description" content="About Evelyn E. Fabie College" />
      </Head>

      <Banner />

      <main className={styles.pageContainer}>
        <div className={styles.hours}>
          <p>Monday - Friday: 7:00am - 5:00pm</p>
          <p>Saturday: 8:00am - 3:00pm</p>
        </div>

        <div className={styles.contentArea}>
          <p>Pioneer-Telstar St., Doña Vicenta Village, Davao City</p>
          <h2>Our History:</h2>
          <p>Habitant pharetra id magna duis congue ridiculus fringilla neque...</p>
          <h2>Our Mission:</h2>
          <p>Lorem ipsum dolor amet, consectetur adipiscing elit...</p>
          <h2>Our Vision:</h2>
          <p>Conubia sodales gravida laoreet natoque nibh...</p>
          <h2>Evelyn E. Fabie College, Inc. Alma Mater:</h2>
          <p>Ullamcorper ex turpis luctus senectus convallis class odio...</p>
        </div>
      </main>

      <Footer />
    </>
  );
};

export default About;
