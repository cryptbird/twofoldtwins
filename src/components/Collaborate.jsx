import React, { useState } from 'react';
import { motion } from 'framer-motion';
import emailjs from '@emailjs/browser';

const SERVICE_ID = 'service_5r2fhzm';
const TEMPLATE_ID = 'template_0zdy1ay';
const USER_ID = '48Q_QVt0MhUDw7kou';

const Collaborate = () => {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitted(false);
    setError(null);
    try {
      await emailjs.send(
        SERVICE_ID,
        TEMPLATE_ID,
        {
          form_name: form.name,
          form_email: form.email,
          message: form.message,
        },
        USER_ID
      );
      setSubmitted(true);
      setForm({ name: '', email: '', message: '' });
    } catch (err) {
      setError('Failed to send. Please try again later.');
    }
  };

  return (
    <section id="contact" className="py-24 px-4 md:px-16 bg-black/80 backdrop-blur-lg">
      <div className="max-w-2xl mx-auto text-center">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="text-4xl md:text-5xl font-bold mb-8 bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-blue-600"
        >
          Let's Collaborate
        </motion.h2>
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.7 }}
          className="text-lg text-gray-300 mb-8"
        >
          Interested in working together? Fill out the form or email us at <a href="mailto:twofoldtwins.inc@gmail.com" className="text-cyan-400 underline">twofoldtwins.inc@gmail.com</a>
        </motion.p>
        <form onSubmit={handleSubmit} className="bg-white/10 border border-cyan-400/20 rounded-2xl shadow-xl p-8 backdrop-blur-md flex flex-col gap-6">
          <input type="text" name="name" placeholder="Name" value={form.name} onChange={handleChange} required className="px-4 py-3 rounded-lg bg-black/40 text-white placeholder-gray-400 border border-cyan-400/30 focus:outline-none focus:ring-2 focus:ring-cyan-400" />
          <input type="email" name="email" placeholder="Email" value={form.email} onChange={handleChange} required className="px-4 py-3 rounded-lg bg-black/40 text-white placeholder-gray-400 border border-cyan-400/30 focus:outline-none focus:ring-2 focus:ring-cyan-400" />
          <textarea name="message" placeholder="Message" value={form.message} onChange={handleChange} required rows={4} className="px-4 py-3 rounded-lg bg-black/40 text-white placeholder-gray-400 border border-cyan-400/30 focus:outline-none focus:ring-2 focus:ring-cyan-400" />
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.97 }}
            type="submit"
            className="mt-2 px-8 py-3 rounded-xl bg-cyan-500 bg-opacity-80 hover:bg-cyan-400 text-black font-semibold shadow-lg transition-all duration-300 backdrop-blur-md"
          >
            {submitted ? 'Thank You!' : 'Get in Touch'}
          </motion.button>
          {submitted && <div className="text-green-400 mt-2">Your message has been sent!</div>}
          {error && <div className="text-red-400 mt-2">{error}</div>}
        </form>
      </div>
    </section>
  );
};

export default Collaborate; 