import React from 'react';
import { motion } from 'framer-motion';

const achievements = [
  { title: "AIR 4 – Godrej Dronelog '23", desc: 'IIT Bombay Techfest', color: 'neonblue' },
  { title: 'Google DSC Hackathon', desc: 'Rank 1', color: 'neonred' },
  { title: 'Amazon ML School', desc: 'Top 3K globally', color: 'neonblue' },
  { title: 'Leetcode 50 Day Streak', desc: '', color: 'neonred' },
  { title: 'AIR 19 in TOSS DSA', desc: '', color: 'neonblue' },
  { title: 'Tata Crucible Semi-finalist', desc: '', color: 'neonred' },
  { title: 'Head – Techfest NMIMS ’23', desc: '', color: 'neonblue' },
];

export default function Achievements() {
  return (
    <section id="achievements" className="max-w-4xl mx-auto px-6 py-20">
      <motion.h2
        className="text-3xl md:text-4xl font-bold text-neonred mb-10 text-center"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        viewport={{ once: true }}
      >
        Achievements
      </motion.h2>
      <div className="flex flex-wrap gap-6 justify-center">
        {achievements.map((a, i) => (
          <motion.div
            key={a.title}
            className={`px-6 py-4 rounded-xl shadow-lg border-2 border-${a.color} bg-darkgray/80 text-white text-center min-w-[180px]`}
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.1 * i }}
            viewport={{ once: true }}
          >
            <div className={`text-lg font-bold text-${a.color}`}>{a.title}</div>
            {a.desc && <div className="text-sm text-lightgray mt-1">{a.desc}</div>}
          </motion.div>
        ))}
      </div>
    </section>
  );
}
