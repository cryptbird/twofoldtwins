import React from 'react';
import { motion } from 'framer-motion';
import { FaGithub, FaGooglePlay, FaPython } from 'react-icons/fa';

const projects = [
  {
    title: 'K–SOS App',
    desc: 'A student safety app with a panic button, real-time location tracking and emergency alerts. Deployed by Rajasthan Police for 150,000 students in Kota.',
    tech: ['Flutter', 'Firebase', 'React', 'OpenStreetMap API'],
    achievements: [
      '95,000+ downloads',
      '#3 globally in the Parenting category on Google Play',
      'Covered by 10+ national outlets incl. Aaj Tak, ETV Bharat, Dainik Bhaskar',
    ],
    links: {
      play: 'https://play.google.com/store/apps/details?id=com.twofoldtwins.panicbutton&pcampaignid=web_share',
      // github: 'https://github.com/cryptbird/k-sos',
    },
  },
  {
    title: 'Autonomous Warehouse Inventory Drone',
    desc: 'An autonomous hexacopter that scans warehouse inventory in flight, with a 3 ms control loop latency.',
    tech: ['Pixhawk', 'Raspberry Pi', 'ArduPilot', 'Python', 'React', 'Firebase'],
    achievements: ["All India Rank 4 at Godrej Dronelog'23", 'IIT Bombay Techfest'],
    links: {},
  },
  {
    title: 'Gateway2Japan App',
    desc: 'A Japanese learning app designed for Indian learners. Gateway 2 Japan makes language acquisition simple through structured lessons and interactive content.',
    tech: ['Android', 'Firebase', 'Flutter'],
    achievements: ['2K+ downloads', 'Educational app'],
    links: {
      play: '/gateway2japan-maintenance',
    },
  },
  {
    title: 'Way2Me Bus Tracker',
    desc: 'Live bus tracking and ETA prediction for city commuters.',
    tech: ['ReactJS', 'NodeJS', 'Firebase'],
    achievements: ['Deployed for 2 bus routes', '100+ daily users'],
    links: {
      // github: 'https://github.com/cryptbird/way2me',
    },
  },
  {
    title: 'Statistical Optimization Library',
    desc: 'A Python library for advanced statistical optimization algorithms.',
    tech: ['Python', 'NumPy', 'SciPy'],
    achievements: ['Published on PyPi', '50+ weekly downloads'],
    links: {
      pypi: 'https://pypi.org/project/ORTipy2/',

    },
  },
  {
    title: 'Vehicle Tracking w/o GPS',
    desc: 'ML-based vehicle tracking using sensor fusion, no GPS required.',
    tech: ['Python', 'TensorFlow', 'OpenCV'],
    achievements: ['Research project', 'Demoed at Techfest'],
    links: {
      github: 'https://github.com/cryptbird/Escaping-Criminal-Car-Tracking-System-Using-Number-Plate-Detection-and-Image-to-Text-Algorithm',
    },
  },
];

const iconFor = (key, link) => {
  if (key === 'github' || link.includes('github')) return <FaGithub />;
  if (key === 'play' || link.includes('play.google')) return <FaGooglePlay />;
  if (key === 'pypi' || link.includes('pypi.org')) return <FaPython />;
  return null;
};

export default function Projects() {
  return (
    <section id="projects" className="max-w-6xl mx-auto px-6 py-20">
      <motion.h2
        className="text-3xl md:text-4xl font-bold text-neonred mb-10 text-center"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        viewport={{ once: true }}
      >
        My Projects
      </motion.h2>
      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {projects.map((p, i) => (
          <motion.div
            key={p.title}
            className="bg-darkgray/80 rounded-xl p-6 shadow-lg border-b-4 border-neonblue flex flex-col justify-between hover:scale-[1.03] hover:shadow-neonblue/30 transition-transform duration-200"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 * i }}
            viewport={{ once: true }}
          >
            <div>
              <h3 className="text-xl font-semibold text-neonblue mb-2">{p.title}</h3>
              <p className="mb-3 text-lightgray">{p.desc}</p>
              <div className="flex flex-wrap gap-2 mb-2">
                {p.tech.map(t => (
                  <span key={t} className="bg-navy text-neonblue px-2 py-1 rounded text-xs font-semibold border border-neonblue/40">{t}</span>
                ))}
              </div>
              <ul className="mb-3 text-xs text-neonred list-disc ml-5">
                {p.achievements.map(a => <li key={a}>{a}</li>)}
              </ul>
            </div>
            <div className="flex gap-4 mt-2">
              {Object.entries(p.links).map(([k, link]) => (
                <a
                  key={k}
                  href={link}
                  target={link.startsWith('http') ? '_blank' : undefined}
                  rel="noopener noreferrer"
                  className="text-2xl text-neonblue hover:text-neonred transition-colors"
                  aria-label={k}
                >
                  {iconFor(k, link)}
                </a>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
