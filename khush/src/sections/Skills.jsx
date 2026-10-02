import React from 'react';
import { motion } from 'framer-motion';
import { FaPython, FaJs, FaReact, FaNodeJs, FaGitAlt, FaDatabase, FaServer, FaRobot } from 'react-icons/fa';
import { SiC, SiCplusplus, SiTailwindcss, SiFirebase, SiOracle, SiTensorflow, SiOpencv, SiPandas, SiTableau } from 'react-icons/si';
import { SiDotnet, SiApachekafka, SiPostgresql, SiMysql, SiFastapi, SiDjango, SiDocker, SiGooglecloud, SiNextdotjs, SiPytorch, SiOnnx, SiMediapipe } from 'react-icons/si';
import { SiFlutter, SiDart } from 'react-icons/si';

const skills = [
  {
    category: 'Languages',
    items: [
      { name: 'C#', icon: <SiDotnet /> },
      { name: 'Python', icon: <FaPython /> },
      { name: 'C++', icon: <SiCplusplus /> },
      { name: 'C', icon: <SiC /> },
      { name: 'JavaScript', icon: <FaJs /> },
      { name: 'SQL', icon: <FaDatabase /> },
      { name: 'Dart', icon: <SiDart /> },
    ],
  },
  {
    category: 'Backend',
    items: [
      { name: '.NET Core', icon: <SiDotnet /> },
      { name: 'FastAPI', icon: <SiFastapi /> },
      { name: 'Django', icon: <SiDjango /> },
      { name: 'NodeJS', icon: <FaNodeJs /> },
      { name: 'Kafka', icon: <SiApachekafka /> },
      { name: 'Microservices', icon: <FaServer /> },
    ],
  },
  {
    category: 'Databases',
    items: [
      { name: 'PostgreSQL', icon: <SiPostgresql /> },
      { name: 'MySQL', icon: <SiMysql /> },
      { name: 'Firebase', icon: <SiFirebase /> },
    ],
  },
  {
    category: 'AI/ML',
    items: [
      { name: 'PyTorch', icon: <SiPytorch /> },
      { name: 'TensorFlow', icon: <SiTensorflow /> },
      { name: 'OpenCV', icon: <SiOpencv /> },
      { name: 'MediaPipe', icon: <SiMediapipe /> },
      { name: 'ONNX Runtime', icon: <SiOnnx /> },
      { name: 'MCP', icon: <FaRobot /> },
    ],
  },
  {
    category: 'Frontend & Mobile',
    items: [
      { name: 'ReactJS', icon: <FaReact /> },
      { name: 'NextJS', icon: <SiNextdotjs /> },
      { name: 'Flutter', icon: <SiFlutter /> },
      { name: 'Tailwind', icon: <SiTailwindcss /> },
    ],
  },
  {
    category: 'DevOps & Cloud',
    items: [
      { name: 'Docker', icon: <SiDocker /> },
      { name: 'Git', icon: <FaGitAlt /> },
      { name: 'Google Cloud', icon: <SiGooglecloud /> },
      { name: 'Oracle Cloud', icon: <SiOracle /> },
    ],
  },
  {
    category: 'Data Analytics',
    items: [
      { name: 'Pandas', icon: <SiPandas /> },
      { name: 'Tableau', icon: <SiTableau /> },
    ],
  },
];

export default function Skills() {
  return (
    <section id="skills" className="max-w-5xl mx-auto px-6 py-20">
      <motion.h2
        className="text-3xl md:text-4xl font-bold text-neonblue mb-10 text-center"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        viewport={{ once: true }}
      >
        Tech Stack
      </motion.h2>
      <div className="grid md:grid-cols-2 gap-10">
        {skills.map((cat, i) => (
          <motion.div
            key={cat.category}
            className="bg-darkgray/80 rounded-xl p-6 shadow-lg border-l-4 border-neonred"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 * i }}
            viewport={{ once: true }}
          >
            <h3 className="text-xl font-semibold text-neonred mb-4">{cat.category}</h3>
            <div className="flex flex-wrap gap-6">
              {cat.items.map(skill => (
                <motion.div
                  key={skill.name}
                  whileHover={{ scale: 1.2, color: '#00eaff', textShadow: '0 0 8px #00eaff' }}
                  className="flex flex-col items-center text-lightgray hover:text-neonblue transition-colors cursor-pointer"
                >
                  <span className="text-4xl mb-1">{skill.icon}</span>
                  <span className="text-xs font-medium">{skill.name}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
      <motion.p
        className="mt-10 text-center text-sm text-lightgray"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.7 }}
        viewport={{ once: true }}
      >
        <span className="text-neonblue font-semibold">Can also work with:</span> Haskell, F#, Scala, Elixir, PureScript
      </motion.p>
    </section>
  );
}
