import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaLinkedin, FaGithub, FaEnvelope, FaCode } from 'react-icons/fa';

const socials = [
  { icon: <FaEnvelope />, label: 'Email', link: 'mailto:khushvardhanbhardwaj@gmail.com' },
  { icon: <FaLinkedin />, label: 'LinkedIn', link: 'https://www.linkedin.com/in/khushvardhanbhardwaj/' },
  { icon: <FaGithub />, label: 'GitHub', link: 'https://github.com/cryptbird' },
  { icon: <FaCode />, label: 'LeetCode', link: 'https://leetcode.com/u/cryptbird/' },
];

// The portfolio is served from /khush on the same domain as the serverless
// function, so a root-relative path is all that is needed in production.
// `npm start` here runs on its own dev port, so point at the root site then.
const API_URL =
  process.env.NODE_ENV === 'production'
    ? '/api/send-email'
    : 'http://localhost:3000/api/send-email';

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState('idle'); // idle | sending | sent | error
  const [error, setError] = useState(null);

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async e => {
    e.preventDefault();
    setStatus('sending');
    setError(null);

    try {
      const res = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, source: 'khush' }),
      });

      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data.message || `Request failed (${res.status})`);

      setStatus('sent');
      setForm({ name: '', email: '', message: '' });
      setTimeout(() => setStatus('idle'), 5000);
    } catch (err) {
      console.error(err);
      setError(err.message || 'Failed to send message. Please try again later.');
      setStatus('error');
    }
  };

  const sending = status === 'sending';

  return (
    <section id="contact" className="max-w-3xl mx-auto px-6 py-20">
      <motion.h2
        className="text-3xl md:text-4xl font-bold text-neonblue mb-10 text-center"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        viewport={{ once: true }}
      >
        Let's Connect
      </motion.h2>
      <div className="flex flex-col md:flex-row gap-10 items-start">
        <div className="flex-1 mb-8 md:mb-0 flex flex-col gap-4">
          {socials.map(s => (
            <a
              key={s.label}
              href={s.link}
              target={s.link.startsWith('http') ? '_blank' : undefined}
              rel="noopener noreferrer"
              className="flex items-center gap-3 text-lg text-lightgray hover:text-neonred transition-colors"
            >
              <span className="text-2xl text-neonblue">{s.icon}</span> {s.label}
            </a>
          ))}
        </div>
        <form className="flex-1 bg-darkgray/80 rounded-xl p-8 shadow-lg" onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block mb-1 text-lightgray" htmlFor="contact-name">Name</label>
            <input
              id="contact-name"
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 rounded bg-navy text-white border-2 border-neonblue focus:outline-none focus:ring-2 focus:ring-neonblue/60 transition"
            />
          </div>
          <div className="mb-4">
            <label className="block mb-1 text-lightgray" htmlFor="contact-email">Email</label>
            <input
              id="contact-email"
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 rounded bg-navy text-white border-2 border-neonblue focus:outline-none focus:ring-2 focus:ring-neonblue/60 transition"
            />
          </div>
          <div className="mb-6">
            <label className="block mb-1 text-lightgray" htmlFor="contact-message">Message</label>
            <textarea
              id="contact-message"
              name="message"
              value={form.message}
              onChange={handleChange}
              required
              rows={4}
              className="w-full px-4 py-2 rounded bg-navy text-white border-2 border-neonblue focus:outline-none focus:ring-2 focus:ring-neonblue/60 transition"
            />
          </div>
          <button
            type="submit"
            disabled={sending}
            className={`w-full py-3 rounded-lg bg-neonred text-white font-semibold text-lg shadow-md hover:bg-neonblue hover:text-navy transition-colors duration-200 ${
              sending ? 'opacity-60 cursor-not-allowed' : ''
            }`}
          >
            {sending ? 'Sending...' : status === 'sent' ? 'Message Sent!' : 'Send Message'}
          </button>
          {status === 'sent' && (
            <div className="mt-3 text-sm text-neonblue">Thanks! Your message is on its way.</div>
          )}
          {status === 'error' && error && (
            <div className="mt-3 text-sm text-neonred">{error}</div>
          )}
        </form>
      </div>
    </section>
  );
}
