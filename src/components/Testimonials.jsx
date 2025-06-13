import React from 'react';
import { motion } from 'framer-motion';

const testimonials = [
  {
    quote: "The KSOS App by Twofoldtwins has been a game-changer for student safety in Kota. It's heartening to see young minds use technology to support such a crucial cause.",
    author: "SP, Kota City Police",
  },
  {
    quote: "Twofoldtwins demonstrated skills and professionalism far beyond what you'd expect from a student-led firm. Their dedication, quality of work, and work ethic were truly impressive. If you get a chance to work with them, consider yourself fortunate.",
    author: "Thomas Hansen, CEO, Ainiro",
  },
  {
    quote: "Twofoldtwins delivered exactly what we envisioned—clean, professional websites that truly represent the spirit of our real estate projects. Their attention to detail and commitment to quality made the entire process smooth and rewarding.",
    author: "R. S. Agarwal, Director, Vindhya Realty",
  },
];

const press = [
  {
    name: 'News18 India',
    url: 'https://hindi.news18.com/news/rajasthan/kota-police-will-reach-the-coaching-student-of-education-city-kota-as-soon-as-he-presses-a-button-what-is-so-special-about-this-button-local18-8824242.html',
    img: '/press-news18.jpg',
  },
  {
    name: 'Aaj Tak',
    url: 'https://drive.google.com/file/d/1q9hNZI_Gbu3P4rC0NeyZXH33F0C4lpHw/view',
    img: '/press-aajtak.png',
  },
  {
    name: 'ETV Bharat',
    url: 'https://www.etvbharat.com/hi/!state/ksos-app-launched-for-coaching-students-police-will-reach-near-through-panic-button-rajasthan-news-rjs24110807141',
    img: '/press-etvbharat.png',
  },
  {
    name: 'Dainik Bhaskar',
    url: 'https://www.bhaskar.com/local/rajasthan/kota/news/information-given-about-social-policing-and-student-app-133946639.html',
    img: '/press-bhaskar.png',
  },
];

const Testimonials = () => (
  <section id="testimonials" className="py-24 px-4 md:px-16 bg-gradient-to-br from-gray-900/80 to-black/90 backdrop-blur-lg">
    <div className="max-w-4xl mx-auto text-center">
      <motion.h2
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="text-4xl md:text-5xl font-bold mb-8 bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-blue-600"
      >
        Testimonials & Press
      </motion.h2>
      <div className="flex flex-wrap justify-center gap-8 mb-16">
        {testimonials.map((t, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.2, duration: 0.7 }}
            className="bg-white/10 border border-cyan-400/20 rounded-2xl shadow-xl p-8 w-96 max-w-full backdrop-blur-md text-left flex flex-col justify-between"
          >
            <div className="text-gray-100 italic mb-4">"{t.quote}"</div>
            <div className="mt-2 text-cyan-400 font-semibold text-right">— {t.author}</div>
          </motion.div>
        ))}
      </div>
      <div className="flex flex-col items-center gap-4">
        <div className="text-lg text-gray-200 mb-2">Media coverage for <span className="font-bold text-cyan-400">KSOS</span>:</div>
        <div className="flex flex-wrap gap-8 justify-center">
          {press.map((p, i) => (
            <a key={p.name} href={p.url} target="_blank" rel="noopener noreferrer" className="flex flex-col items-center w-72 p-4 rounded-xl bg-gradient-to-r from-cyan-700/40 to-blue-700/40 text-white font-semibold shadow-md hover:scale-105 transition-transform">
              <img src={p.img} alt={p.name + ' thumbnail'} className="w-64 h-40 object-cover rounded mb-3 border border-cyan-400/40" />
              <span className="text-lg mt-1">{p.name}</span>
            </a>
          ))}
        </div>
      </div>
    </div>
  </section>
);

export default Testimonials; 