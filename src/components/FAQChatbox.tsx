
import React, { useEffect, useState } from 'react';
import axios from 'axios';

type FAQ = {
  id: number;
  question: string;
  answer: string;
};

type FAQChatboxProps = {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
};

const FAQChatbox:  React.FC<FAQChatboxProps> = ({ isOpen, setIsOpen })  => {
  const [faqs, setFaqs] = useState<FAQ[]>([]);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  

  useEffect(() => {
    const fetchFAQs = async () => {
      try {
        const res = await axios.get<FAQ[]>('http://localhost:3001/faqs');
        setFaqs(res.data);
      } catch (err) {
        console.error('Failed to load FAQs:', err);
        // Set default FAQs if server fails
        setFaqs([
          { id: 1, question: "How do I contact support?", answer: "Email us at evelynfabiecollegeinc@gmail.com"},
          { id: 2, question: "What are the school’s office hours of operation?", answer: "Monday to Friday: 7:00 AM - 5:00pm. Saturday:8:00 AM - 3:00 PM"},
          { id: 3, question: "Where is the school located?", answer: "The school is located in Pioneer-Telstar St., Doña Vicenta Village, Davao City. Directions are available on our Contact page."},
          { id: 4, question: " How do I enroll?", answer: "Visit our Admissions page to find the enrollment application, required documents, and step-by-step instructions"},
          { id: 5, question: "What grade levels do you offer?", answer: "We offer education from Senior Highschool Grade to College level"},
          { id: 6, question: "Are there gifted or special education programs?", answer: " Yes, we offer support for a variety of learning needs. Please visit our Student Services page for details."}
        ]);
      }
    };
  
    if (isOpen) fetchFAQs();
  }, [isOpen]);

  
  return (
    <div
    className={`fixed bottom-4 right-4 z-50 transition-opacity duration-300 ${
      isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
    }`}
  >
      <div className="w-80 bg-white border border-gray-300 rounded-xl shadow-2xl overflow-hidden flex flex-col max-h-[70vh]">
        <div className="bg-gradient-to-r from-blue-600 to-blue-500 text-white px-4 py-3 flex justify-between items-center">
          <h2 className="text-lg font-semibold">📚 FAQs</h2>
          <button onClick={() => setIsOpen(false)} className="text-white text-xl hover:opacity-80">✖</button>
        </div>

        <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
          {selectedAnswer ? (
            <div>
              <div className="bg-blue-100 p-3 rounded-xl self-end text-sm text-gray-800 shadow">
                <p>{selectedAnswer}</p>
              </div>
              <button
                className="mt-2 text-sm text-blue-600 underline hover:text-blue-800"
                onClick={() => setSelectedAnswer(null)}
              >
                ← Back to questions
              </button>
            </div>
          ) : (
            <ul className="space-y-2">
              {faqs.map((faq) => (
                <div
                key={faq.id}
                className="bg-white border border-gray-200 p-3 rounded-lg shadow-sm hover:shadow-md cursor-pointer"
                onClick={() => setSelectedAnswer(faq.answer)}
              >
                <p className="text-sm text-gray-800">{faq.question}</p>
              </div>
              ))}
            </ul>
          )}
        </div>
        
      </div>
      <div className="bg-white px-4 py-2 text-xs text-center text-gray-400 border-t border-gray-200">
        Evelyn E. Fabie College Inc.
      </div>
    </div>
  );
};

export default FAQChatbox;
