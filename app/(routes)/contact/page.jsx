"use client";

import { useState } from "react";

export default function ContactPage() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Message envoyé ✅ (simulation)");
    // Ici tu peux ajouter un appel API (route handler /api/contact)
  };

  return (
    <main className="max-w-2xl mx-auto my-12 p-6 bg-white shadow-lg rounded-2xl">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">Contactez-nous</h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700">
            Nom
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="Votre nom"
            className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:ring-primary focus:border-primary p-2"
            required
          />
        </div>

        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            placeholder="Votre email"
            className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:ring-primary focus:border-primary p-2"
            required
          />
        </div>

        <div>
          <label htmlFor="message" className="block text-sm font-medium text-gray-700">
            Message
          </label>
          <textarea
            id="message"
            name="message"
            rows={4}
            value={form.message}
            onChange={handleChange}
            placeholder="Votre message..."
            className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:ring-primary focus:border-primary p-2"
            required
          ></textarea>
        </div>

        <button
          type="submit"
          className="w-full py-2 px-4 bg-primary text-white font-semibold rounded-lg shadow-md hover:bg-primary-dark transition"
        >
          Envoyer
        </button>
      </form>
    </main>
  );
}
