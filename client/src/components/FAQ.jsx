import React, { useState } from "react";

const FAQ = () => {
  const [openFaq, setOpenFaq] = useState(null);

  const toggleFaq = (index) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  const faqs = [
    {
      question: "What are your operating hours?",
      // UPDATED HOURS HERE
      answer: "We are open from 6:00 AM to 11:00 PM, Everyday.",
    },
    {
      question: "Is this gym suitable for beginners?",
      answer:
        "Absolutely. We have a 'Zero-Intimidation' policy. Our floor trainers are specifically trained to guide beginners through their first few months.",
    },
    {
      question: "Do you have Personal Trainers available?",
      answer:
        "Yes, we have certified personal trainers for those who want dedicated 1-on-1 coaching, customized diet plans, and faster results.",
    },
    {
      question: "Are there separate changing rooms?",
      answer:
        "Yes, we maintain high standards of privacy and hygiene with separate changing rooms, lockers, and washrooms for men and women.",
    },
    {
      question: "How do I pay? Is EMI available?",
      answer:
        "We accept Cash, UPI, and Bank Transfers. For yearly memberships, we can discuss installment options on a case-by-case basis.",
    },
  ];

  return (
    <section className="faq-section py-24 px-6 bg-zinc-950 border-t border-zinc-900">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl md:text-5xl font-black uppercase text-center mb-12 text-white">
          Common <span className="text-red-600">Questions</span>
        </h2>
        <div className="space-y-4">
          {faqs.map((faq, i) => (
            <div
              key={i}
              className={`faq-item border border-zinc-800 bg-zinc-900/50 rounded-lg overflow-hidden transition-all duration-300 ${openFaq === i ? "border-red-600 shadow-[0_0_15px_rgba(220,38,38,0.2)]" : "hover:border-zinc-600"}`}
            >
              <button
                onClick={() => toggleFaq(i)}
                className="w-full text-left px-6 py-5 flex justify-between items-center bg-zinc-900 focus:outline-none"
              >
                <span
                  className={`font-bold uppercase tracking-wide text-sm md:text-base ${openFaq === i ? "text-white" : "text-gray-400"}`}
                >
                  {faq.question}
                </span>
                <span
                  className={`text-xl font-bold transition-transform duration-300 ${openFaq === i ? "text-red-600 rotate-180" : "text-zinc-600"}`}
                >
                  ▼
                </span>
              </button>
              <div
                className={`transition-all duration-300 ease-in-out overflow-hidden ${openFaq === i ? "max-h-96 opacity-100" : "max-h-0 opacity-0"}`}
              >
                <div className="px-6 pb-6 pt-2 text-gray-400 text-sm leading-relaxed border-t border-zinc-800/50">
                  {faq.answer}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQ;
