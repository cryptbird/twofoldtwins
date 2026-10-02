import React from 'react';

import { FaLinkedin, FaGithub, FaCode } from 'react-icons/fa';



const socials = [

  { icon: <FaLinkedin />, link: 'https://www.linkedin.com/in/khushvardhanbhardwaj/', label: 'LinkedIn' },

  { icon: <FaGithub />, link: 'https://github.com/cryptbird', label: 'GitHub' },

  { icon: <FaCode />, link: 'https://leetcode.com/u/cryptbird/', label: 'LeetCode' },

];



export default function Footer() {

  return (

    <footer className="relative w-full py-6 px-6 bg-navy border-t border-darkgray flex flex-col md:flex-row items-center justify-between z-10 overflow-hidden">

      {/* Animated background waves */}

      <div className="absolute inset-0 -z-1 pointer-events-none">

        <svg viewBox="0 0 1440 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">

          <path fill="#00eaff33" d="M0,40 C480,120 960,0 1440,40 L1440,100 L0,100 Z" />

          <path fill="#ff225333" d="M0,60 C480,0 960,100 1440,60 L1440,100 L0,100 Z" />

        </svg>

      </div>

      <div className="relative z-10 text-lightgray text-sm mb-2 md:mb-0">

        &copy; {new Date().getFullYear()} Khushvardhan Bhardwaj

      </div>

      <div className="relative z-10 flex gap-6">

        {socials.map(s => (

          <a

            key={s.label}

            href={s.link}

            target="_blank"

            rel="noopener noreferrer"

            className="text-2xl text-neonblue hover:text-neonred transition-colors"

            aria-label={s.label}

          >

            {s.icon}

          </a>

        ))}

      </div>

    </footer>

  );

} 