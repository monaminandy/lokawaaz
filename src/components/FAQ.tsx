"use client";

import React, { useState } from "react";

const faqs = [
  {
    question: "What is DigiVoter?",
    answer: "DigiVoter is a secure digital voting platform that uses Aadhaar and facial recognition to verify voters remotely.",
  },
  {
    question: "Is my vote secure?",
    answer: "Yes, all votes are encrypted and stored securely on a blockchain to prevent tampering.",
  },
  {
    question: "How do I verify my identity?",
    answer: "You can upload your Aadhaar card and complete a facial recognition scan to verify your identity.",
  },
  {
    question: "Can I vote more than once?",
    answer: "No. Each verified user can cast only one vote, and duplicate voting is prevented using biometric checks.",
  },
];

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div>
        
        <div className="space-y-6 max-w-4xl mx-auto">
            {faqs.map((faq, index) => (
            <div key={index} className="border border-primary rounded-lg shadow-sm">
                <button
                className="w-full flex justify-between items-center text-left px-6 py-4 text-lg font-medium text-gray-800 focus:outline-none"
                onClick={() => toggleFAQ(index)}
                >
                {faq.question}
                <span className="ml-4">{openIndex === index ? "−" : "+"}</span>
                </button>
                {openIndex === index && (
                <div className="px-6 pb-4 text-gray-700 text-md">{faq.answer}</div>
                )}
            </div>
            ))}
        </div>
    </div>
  );
};

export default FAQ;
