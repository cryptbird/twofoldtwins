import React from 'react';
import { motion } from 'framer-motion';

const highlights = [
  {
    title: 'ICICI Lombard GIC',
    desc: 'Backend Developer – Lead dev on a payments platform processing INR 60 crore+ monthly.'
  },
  {
    title: 'Aignosis',
    desc: 'AI / Software Engineer Intern – Backend + CV pipeline for 1,500+ weekly autism screenings.'
  },
  {
    title: 'K–SOS App',
    desc: 'Student safety app with 95,000+ downloads, deployed by Rajasthan Police for 150,000 students.'
  }

];

const education = [
  { year: '2019', label: '10th (CBSE)', place: 'Sir Padampat Singhania School', score: '91.6%' },
  { year: '2021', label: '12th (CBSE)', place: 'Sir Padampat Singhania School', score: '93.8%' },
  { year: '2025', label: 'B.Tech Computer Engineering', place: "SVKM's MPSTME, NMIMS University", score: '9.2/10 CGPA' },
];

export default function About() {
  return (
    <section id="about" className="max-w-4xl mx-auto px-6 py-20">
      <motion.h2
        className="text-3xl md:text-4xl font-bold text-neonred mb-6 text-center"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        viewport={{ once: true }}
      >
        Who Am I?
      </motion.h2>
      <motion.div
        className="text-lg md:text-xl text-lightgray space-y-4 mb-8 text-justify"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        viewport={{ once: true }}
      >
        <p>
        Hi! I'm Khushvardhan, a backend developer and machine learning engineer with a deep focus on creating scalable, impactful technology. My journey began with a simple curiosity about how things work—and evolved into solving real-world problems with distributed systems, AI, and mobile platforms.        </p>
        <p>
        I’m currently at ICICI Lombard GIC, where I lead development of a centralized payments platform that processes INR 60 crore+ in monthly payments across every one of the company’s insurance products, built as .NET Core microservices on PostgreSQL with Kafka-driven event processing. Before that I studied at NMIMS University (B.Tech in Computer Engineering) and built AI systems at Aignosis.
        </p>
        <p>
        From deploying a panic-alert app for over 150,000 students in Kota to building the computer-vision pipeline behind early autism detection, I thrive on building tech that makes a difference.
        </p>
      </motion.div>
      <div className="flex flex-col md:flex-row gap-8 mb-8">
        {highlights.map(h => (
          <motion.div
            key={h.title}
            className="flex-1 bg-darkgray/70 rounded-xl p-6 shadow-lg border-l-4 border-neonblue"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 * highlights.indexOf(h) }}
            viewport={{ once: true }}
          >
            <h3 className="text-xl font-semibold text-neonblue mb-2">{h.title}</h3>
            <p>{h.desc}</p>
          </motion.div>
        ))}
      </div>
      <div className="mt-6">
        <h4 className="text-lg font-semibold text-neonred mb-2">Education</h4>
        <ol className="relative border-l-2 border-neonblue ml-4">
          {education.map((e, i) => (
            <li key={e.year} className="mb-6 ml-6">
              <span className="absolute -left-3 flex items-center justify-center w-6 h-6 bg-neonblue rounded-full ring-4 ring-navy text-navy font-bold">{i+1}</span>
              <div className="bg-darkgray/80 p-4 rounded-lg shadow-md">
                <div className="font-semibold text-white">{e.label} <span className="text-neonblue">({e.year})</span></div>
                <div className="text-sm text-lightgray">{e.place}</div>
                <div className="text-xs text-neonred">{e.score}</div>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
