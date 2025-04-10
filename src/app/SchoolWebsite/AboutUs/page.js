"use client";

import Head from "next/head";
import Header from "../components/header.js";
import Footer from "../components/footer.js";
import Image from "next/image";
import schoolPic from "/public/11.jpg"; // Adjust the path as necessary

const About = () => {
  return (
    <>
      <Head>
        <title>About Us - Evelyn E. Fabie College</title>
        <meta
          name="description"
          content="Learn about the history, mission, and vision of Evelyn E. Fabie College, Inc."
        />
      </Head>

      <Header />

      <section className="relative h-[60vh] w-full font-sans">
        <Image
          src={schoolPic}
          alt="About Page Cover"
          fill
          priority
          className="object-cover"
        />
        <div className="absolute inset-0 bg-black/50 z-10" />
        <div className="relative z-20 flex flex-col items-center justify-center h-full text-center px-4 text-white">
          <h1 className="text-4xl md:text-5xl font-extrabold mb-4">About Us</h1>
          <p className="text-xl md:text-2xl max-w-3xl mb-2">
            Evelyn E. Fabie College, Inc.
          </p>
          <p className="text-base md:text-lg max-w-3xl">
            Empowering Futures Since 1982
          </p>
        </div>
      </section>

      <main className="max-w-6xl mx-auto px-4 md:px-8 py-12 text-gray-800 font-sans">
        <section className="mb-16">
          <h2 className="text-2xl font-bold text-blue-900 mb-4">Our History</h2>
          <p className="text-gray-700 mb-2">
            <strong>Campus:</strong> Pioneer-Telstar St., Doña Vicenta Village,
            Davao City
          </p>
          <p className="text-gray-700">
            Evelyn E. Fabie College, Inc. (formerly Fabie School of Midwifery)
            is a private college in Davao City. It offers programs for Senior
            High School and college students, with strands from the Academic and
            the Technical-Vocational-Livelihood (TVL) tracks. EEFCI is
            recognized by the Commission on Higher Education (CHED) and the
            Department of Education (DepEd).
          </p>
        </section>

        <section className="mb-16 grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h2 className="text-2xl font-bold text-blue-900 mb-4">
              Our Mission
            </h2>
            <p className="text-gray-700 mb-4">
              Choosing the right program can help you set your future goals and
              visualize where you want to be. Whether you aspire to be an
              engineer, a teacher, or grow in your profession, being informed
              will support your future. EEFCI is here to help you make the best
              decision for your career path.
            </p>
            <a
              href="/SchoolWebsite/AdminandPrograms"
              className="inline-block mt-2 text-cyan-700 font-medium hover:underline"
            >
              View Available Programs →
            </a>
          </div>
          <div>
            <h2 className="text-2xl font-bold text-blue-900 mb-4">
              Our Vision
            </h2>
            <p className="text-gray-700">
              To cultivate a community of skilled, compassionate, and competent
              professionals by delivering quality education, strong values, and
              real-world experience in all areas of instruction.
            </p>
          </div>
        </section>

        <section className="mb-16">
          <h2 className="text-2xl font-bold text-blue-900 mb-4">Alma Mater</h2>
          <p className="text-gray-700">
            Evelyn E. Fabie College, Inc. continues to produce outstanding
            alumni who serve communities with passion and professionalism,
            living up to the ideals of the institution as lifelong learners and
            contributors to society.
          </p>
        </section>

        <div className="bg-[#005f73] p-6 rounded-lg shadow mb-12 text-center">
          <h2 className="text-xl font-semibold mb-2 text-white">
            Office Hours
          </h2>
          <p className="text-white">Monday - Friday: 7:00am - 5:00pm</p>
          <p className="text-white">Saturday: 8:00am - 3:00pm</p>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default About;
