import React from "react";
import Header from "../components/header.js";
import Footer from "../components/footer.js";
import Image from "next/image";
import schoolPic from "../../../public/12.jpg";

const Admissions = () => {
  return (
    <div className="bg-white text-gray-800 font-sans">
      <Header />

      <section className="relative h-[60vh] w-full font-sans shadow-md">
        <Image
          src={schoolPic}
          alt="About Page Cover"
          fill
          priority
          className="object-cover"
        />
        <div className="absolute inset-0 bg-black/50 z-10" />
        <div className="relative z-20 flex flex-col items-center justify-center h-full text-center px-4 text-white">
          <h1 className="text-4xl md:text-5xl font-extrabold mb-4">
            Admissions and Enrollment
          </h1>
          <p className="text-base md:text-lg max-w-3xl">
            For both new and returning students, we are here to assist you in
            your enrollment process.
          </p>
        </div>
      </section>

      <main className="max-w-6xl mx-auto px-4 md:px-8 py-12 space-y-16">
        {/* Admission Policy Section */}
        <section>
          <h2 className="text-2xl font-bold text-cyan-700 mb-4">
            Admission Policy
          </h2>
          <p>
            Evelyn E. Fabie College, Inc. is dedicated to providing quality
            education grounded in professional excellence, compassion, and
            service. The college expects its students to honor and uphold its
            academic values, ethical principles, and the legacy of care and
            commitment it has built over the years.
          </p>
          <br />
          <p>
            In line with its standards and mission, the college reserves the
            right to admit students who demonstrate the character, intellect,
            and potential suited to their chosen program. Admission is a
            privilege granted to those who show readiness to grow academically
            and contribute positively to the school community.
          </p>
          <p>
            For more information, please contact the registrar's office at
            09229260887.
          </p>
        </section>

        {/* Simplified Enrollment Requirements Section */}
        <section>
          <h2 className="text-2xl font-bold text-cyan-700 mb-4">
            Simplified Enrollment Requirements
          </h2>
          <p>
            We understand that gathering documents and records can be
            challenging, especially during these times. That's why we've made
            the enrollment process simpler by listing only the essential
            requirements for each level. You can scroll down to the Complete
            Requirements section to view the full list, which you may submit at
            a later time.
          </p>
          {/* Add tables or lists here to detail the simplified requirements */}
        </section>

        {/* Enrollment Procedure Section */}
        <section>
          <h2 className="text-2xl font-bold text-cyan-700 mb-4">
            Enrollment Procedure
          </h2>
          <ol className="list-decimal pl-5 space-y-2">
            <li>
              <strong>Fill out the ONLINE REGISTRATION FORM.</strong>
              <p>
                Access the online enrollment link for the level you are applying
                for:
              </p>
              <ul className="list-disc pl-5">
                <li>
                  Senior High:{" "}
                  <a
                    href="/SchoolWebsite/Applynow"
                    className="text-cyan-600 hover:underline"
                  >
                    Online Enrollment
                  </a>
                </li>
                <li>
                  College:{" "}
                  <a
                    href="/SchoolWebsite/Applynow"
                    className="text-cyan-600 hover:underline"
                  >
                    Online Enrollment
                  </a>
                </li>
              </ul>
            </li>
            <li>
              <strong>Pay for enrollment downpayment.</strong>
              <p>
                The Admissions Office will confirm your successful registration
                through EMAIL and give instructions to proceed to payment. Here
                are the available payment methods:
              </p>
              <ul className="list-disc pl-5">
                <li>Metrobank Account No. 547-3-547-06468-3</li>
                <li>Landbank Account No. 2982-1024-24</li>
                <li>BDO Account No. 002700048039</li>
                <li>DBP Account No. 0915-040-231-030</li>
              </ul>
              <p>
                Alternative Payment Methods include RCBC Online Banking, SM City
                Davao, SM Lanang Premiere, Savemore Branches, RCBC Branches
                nationwide, GCash, M Lhuillier Kwarta Padala, and Palawan
                Express.
              </p>
            </li>
            <li>
              <strong>Check email for your Student Assessment Form.</strong>
              <p>
                After successful registration and payment, your Student
                Assessment Form will be sent to your email. You are now
                officially enrolled!
              </p>
            </li>
          </ol>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Admissions;
