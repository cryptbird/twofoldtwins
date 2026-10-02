import React from 'react';

import { motion } from 'framer-motion';

import Avatar from '../components/Avatar';



export default function Hero() {

  return (

    <section id="hero" className="min-h-[80vh] flex flex-col md:flex-row items-center justify-center gap-10 md:gap-20 px-6 py-16 md:py-32">

      <motion.div

        initial={{ opacity: 0, y: 40 }}

        animate={{ opacity: 1, y: 0 }}

        transition={{ duration: 0.8 }}

        className="flex-shrink-0"

      >

        <a

            href="https://www.linkedin.com/in/khushvardhanbhardwaj/"

            target="_blank"

            rel="noopener noreferrer"

            className="flex flex-col items-center hover:scale-105 transition-transform duration-200"

          >

        <Avatar />

        </a>

      </motion.div>

      <motion.div

        initial={{ opacity: 0, y: 40 }}

        animate={{ opacity: 1, y: 0 }}

        transition={{ duration: 1, delay: 0.2 }}

        className="max-w-xl text-center md:text-left"

      >

        <h1 className="text-4xl md:text-5xl font-bold text-white mb-2">

          Khushvardhan Bhardwaj

        </h1>

        <h2 className="text-xl md:text-2xl font-semibold text-neonblue mb-4">

          Backend Developer @ ICICI Lombard | Payments Platform | AI Engineer

        </h2>

        <p className="text-lg md:text-xl text-lightgray mb-8">

          Building payment systems that move INR 60 crore+ a month, AI tooling, and real-world apps that solve meaningful problems.

        </p>

        <div className="flex flex-col md:flex-row gap-4 justify-center md:justify-start">

          <a

            href="/Khushvardhan_Bhardwaj_SDE.pdf"

            download

            target="_blank"

            rel="noopener noreferrer"

            className="px-6 py-3 rounded-lg bg-neonblue text-navy font-semibold shadow-md hover:bg-neonred hover:text-white transition-colors duration-200"

          >

            Download Resume

          </a>

          <a

            href="#contact"

            className="px-6 py-3 rounded-lg border-2 border-neonred text-neonred font-semibold hover:bg-neonred hover:text-white transition-colors duration-200"

          >

            Let's Connect

          </a>

        </div>

      </motion.div>

    </section>

  );

} 