import React from 'react';
import { FaGithub, FaLinkedin, FaEnvelope } from 'react-icons/fa';
import logo from '../logo.svg';

const Footer = () => (
  <footer className="w-full py-8 bg-gradient-to-t from-black/90 to-gray-900/80 text-gray-300 border-t border-cyan-400/20 mt-12">
    <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6 px-4">
      <div className="flex items-center gap-3">
        <img src={logo} alt="twofoldtwins logo" className="w-10 h-10" />
        <span className="font-bold text-xl text-white">twofoldtwins</span>
      </div>
      <nav className="flex gap-6 text-base font-medium">
        <a href="#projects" className="hover:text-cyan-400 transition">Projects</a>
        <a href="#contact" className="hover:text-cyan-400 transition">Contact</a>
        <a href="https://github.com/twofoldtwins" target="_blank" rel="noopener noreferrer" className="hover:text-cyan-400 transition">GitHub</a>
        <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="hover:text-cyan-400 transition">LinkedIn</a>
      </nav>
      <div className="flex gap-4 text-xl">
        <a href="mailto:twofoldtwins.inc@gmail.com" className="hover:text-cyan-400 transition"><FaEnvelope /></a>
        <a href="https://github.com/twofoldtwins" target="_blank" rel="noopener noreferrer" className="hover:text-cyan-400 transition"><FaGithub /></a>
        <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="hover:text-cyan-400 transition"><FaLinkedin /></a>
      </div>
    </div>
    <div className="text-center text-gray-500 text-sm mt-6">Copyright © 2025 Twofold Twins</div>
  </footer>
);

export default Footer; 