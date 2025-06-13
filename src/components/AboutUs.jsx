import React from 'react';
import { motion } from 'framer-motion';

const experiences = [
  {
    year: '2025',
    title: 'KSOS App Launch',
    desc: 'Launched KSOS with Rajasthan Police, impacting 35,000+ students.'
  },
  {
    year: '2024',
    title: 'Gateway 2 Japan',
    desc: 'Released language learning app for Indian learners.'
  },
  {
    year: '2024',
    title: 'Vindhya Realty Websites',
    desc: 'Delivered high-performance real estate web platforms.'
  },
];

const values = [
  { label: 'Innovation', color: 'from-cyan-400 to-blue-500' },
  { label: 'Impact', color: 'from-green-400 to-cyan-500' },
  { label: 'Integrity', color: 'from-yellow-400 to-orange-500' },
  { label: 'Iteration', color: 'from-pink-400 to-purple-500' },
];

const AboutUs = () => (
  <section id="about" className="relative py-24 px-4 md:px-16 bg-black/80 backdrop-blur-lg">
    <div className="max-w-4xl mx-auto text-center">
      <motion.h2
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="text-4xl md:text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-blue-600"
      >
        About Us
      </motion.h2>
      <motion.p
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.7 }}
        className="text-lg md:text-xl text-gray-300 mb-10"
      >
        We are twofoldtwins – a tech duo passionate about solving real-world problems through scalable, secure, and impactful digital solutions. From government-backed mobile apps to enterprise websites, we build with purpose and precision.
      </motion.p>
      {/* Timeline */}
      <div className="flex flex-col md:flex-row justify-center items-center gap-8 mb-12">
        {experiences.map((exp, i) => (
          <motion.div
            key={exp.year}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.2, duration: 0.7 }}
            className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl shadow-xl p-6 w-72 border border-cyan-700/30 backdrop-blur-md"
          >
            <div className="text-cyan-400 text-2xl font-bold mb-2">{exp.year}</div>
            <div className="text-lg font-semibold mb-1 text-white">{exp.title}</div>
            <div className="text-gray-300 text-sm">{exp.desc}</div>
          </motion.div>
        ))}
      </div>
      {/* Values */}
      <div className="flex flex-wrap justify-center gap-6">
        {values.map((v, i) => (
          <motion.div
            key={v.label}
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 + i * 0.1, duration: 0.5 }}
            className={`px-6 py-3 rounded-xl font-bold text-lg bg-gradient-to-r ${v.color} text-white shadow-lg backdrop-blur-md`}
          >
            {v.label}
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default AboutUs; 