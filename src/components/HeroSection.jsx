import React from 'react';
import { motion } from 'framer-motion';
import Particles from 'react-tsparticles';
import { loadFull } from 'tsparticles';
import logo from '../logo.svg';

const particlesInit = async (main) => {
  await loadFull(main);
};

const HeroSection = () => {
  return (
    <section className="relative flex flex-col items-center justify-center min-h-screen w-full overflow-hidden bg-gradient-to-br from-black via-gray-900 to-gray-800">
      {/* Animated Particles Background */}
      <Particles
        id="tsparticles"
        init={particlesInit}
        options={{
          background: { color: { value: '#000' } },
          fpsLimit: 60,
          interactivity: {
            events: { onHover: { enable: true, mode: 'repulse' }, resize: true },
            modes: { repulse: { distance: 100, duration: 0.4 } },
          },
          particles: {
            color: { value: '#00fff7' },
            links: { enable: true, color: '#00fff7', distance: 150, opacity: 0.2, width: 1 },
            move: { enable: true, speed: 1, outModes: { default: 'bounce' } },
            number: { value: 60 },
            opacity: { value: 0.3 },
            shape: { type: 'circle' },
            size: { value: { min: 1, max: 3 } },
          },
          detectRetina: true,
        }}
        className="absolute inset-0 z-0"
      />
      {/* Logo and Tagline */}
      <div className="relative z-10 flex flex-col items-center justify-center text-center py-24">
        <img src={logo} alt="twofoldtwins logo" className="w-32 h-32 mb-6 animate-pulse drop-shadow-lg" />
        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="text-5xl md:text-7xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-blue-600 mb-4"
        >
          twofoldtwins
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 1 }}
          className="text-xl md:text-2xl font-medium text-gray-300 mb-8"
        >
          Engineering Ideas. Deploying Impact.
        </motion.p>
        {/* CTA Buttons */}
        <div className="flex gap-6 justify-center">
          <a href="#projects" className="px-8 py-3 rounded-xl bg-cyan-500 bg-opacity-80 hover:bg-cyan-400 text-black font-semibold shadow-lg transition-all duration-300 backdrop-blur-md">
            View Our Projects
          </a>
          <a href="#contact" className="px-8 py-3 rounded-xl bg-white bg-opacity-10 hover:bg-white hover:bg-opacity-20 text-cyan-300 font-semibold shadow-lg transition-all duration-300 border border-cyan-400 backdrop-blur-md">
            Contact Us
          </a>
        </div>
        {/* Twofoldtwins Avatars */}
        <div className="mt-12 w-full flex justify-center gap-12">
          <div className="flex flex-col items-center">
            <img src="https://i.ibb.co/Dgk5Cktn/Khush-avatar.png" alt="Khush Avatar" className="w-28 h-28 rounded-full border-4 border-cyan-400 shadow-lg object-cover" />
            <span className="mt-3 text-lg font-semibold text-cyan-200">Khush</span>
          </div>
          <div className="flex flex-col items-center">
            <img src="https://i.ibb.co/sJ2mz7SD/Jay-avatar.png" alt="Jay Avatar" className="w-28 h-28 rounded-full border-4 border-cyan-400 shadow-lg object-cover" />
            <span className="mt-3 text-lg font-semibold text-cyan-200">Jay</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection; 