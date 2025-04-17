
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
    axios.get<FAQ[]>('http://localhost:3001/faqs').then((res) => setFaqs(res.data));
  }, []);

  if (!isOpen) return null;

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <div className="w-80 bg-white border p-4 mt-2 rounded-lg shadow-xl">
        <div className="flex justify-between items-center mb-2">
          <h2 className="text-lg font-bold">FAQs</h2>
          <button onClick={() => setIsOpen(false)} className="text-sm text-gray-500 hover:text-black">✖</button>
        </div>
        {selectedAnswer ? (
          <div>
            <p className="mb-2 text-gray-700">{selectedAnswer}</p>
            <button
              className="text-sm text-blue-600 underline"
              onClick={() => setSelectedAnswer(null)}
            >
              Back to questions
            </button>
          </div>
        ) : (
          <ul className="space-y-2">
            {faqs.map((faq) => (
              <li key={faq.id}>
                <button
                  className="text-left text-sm text-blue-800 hover:underline"
                  onClick={() => setSelectedAnswer(faq.answer)}
                >
                  {faq.question}
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default FAQChatbox;
