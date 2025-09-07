"use client";

import { useState } from "react";

export default function ContactPage() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Message sent! (Replace with API call)");
    setForm({ name: "", email: "", message: "" });
  };

  return (
    <div className="max-w-3xl mx-auto py-12 px-6">
      <h1 className="text-3xl font-bold text-primary mb-6">Contact Us</h1>
      <p className="text-gray-700 mb-8">
        Have questions, feedback, or issues? Reach out to us below.
      </p>
      <form
        onSubmit={handleSubmit}
        className="space-y-4 p-6 border rounded-lg shadow-sm bg-white"
      >
        <input
          type="text"
          name="name"
          placeholder="Your Name"
          value={form.name}
          onChange={handleChange}
          required
          className="w-full border p-3 rounded-lg"
        />
        <input
          type="email"
          name="email"
          placeholder="Your Email"
          value={form.email}
          onChange={handleChange}
          required
          className="w-full border p-3 rounded-lg"
        />
        <textarea
          name="message"
          placeholder="Your Message"
          value={form.message}
          onChange={handleChange}
          required
          className="w-full border p-3 rounded-lg h-32"
        />
        <button
          type="submit"
          className="px-6 py-2 bg-primary text-white rounded-lg"
        >
          Send Message
        </button>
      </form>
    </div>
  );
}
