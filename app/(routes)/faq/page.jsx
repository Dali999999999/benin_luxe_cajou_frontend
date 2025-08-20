"use client";  // 👈 ajoute ça tout en haut

import { useState } from "react";

export default function FAQPage() {
  const faqs = [
    {
      question: "Quels types d’amandes de cajou proposez-vous ?",
      answer: "Nous proposons des amandes blanches naturelles, des amandes torréfiées et des amandes beurrées, adaptées à la consommation directe ou à l’utilisation en recettes."
    },
    {
      question: "Vos produits sont-ils issus d’une production durable ?",
      answer: "Oui, nous nous engageons à respecter des pratiques de production durable pour préserver l’environnement et soutenir l’économie locale."
    },
    {
      question: "Comment passer commande ?",
      answer: "Vous pouvez passer commande directement sur notre site web ou nous contacter via nos réseaux sociaux pour toute demande spéciale."
    },
    {
      question: "Livrez-vous à l’international ?",
      answer: "Oui, nous livrons à l’international. Les frais et délais de livraison varient selon la destination."
    },
    {
      question: "Vos produits sont-ils certifiés pour la qualité et l’hygiène ?",
      answer: "Toutes nos noix de cajou respectent les normes HACCP et sont rigoureusement sélectionnées pour garantir qualité et sécurité alimentaire."
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 text-gray-800 py-16 px-6">
      <h1 className="text-4xl md:text-5xl font-bold text-center text-green-700 mb-12">
        Foire aux Questions (FAQ)
      </h1>

      <div className="max-w-4xl mx-auto space-y-6">
        {faqs.map((faq, index) => (
          <FAQItem key={index} question={faq.question} answer={faq.answer} />
        ))}
      </div>
    </div>
  );
}

function FAQItem({ question, answer }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="border border-green-200 rounded-lg overflow-hidden shadow-sm">
      <button
        onClick={() => setOpen(!open)}
        className="w-full text-left px-6 py-4 bg-green-100 hover:bg-green-200 flex justify-between items-center"
      >
        <span className="font-semibold">{question}</span>
        <span className="text-xl">{open ? "-" : "+"}</span>
      </button>
      {open && (
        <div className="px-6 py-4 bg-white text-gray-700">
          {answer}
        </div>
      )}
    </div>
  );
}
