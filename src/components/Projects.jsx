import React from 'react';
import { motion } from 'framer-motion';

const projects = [
  {
    name: 'KSOS (Kota Safety of Students)',
    type: 'Android Mobile App | Public Safety',
    desc: 'Built in collaboration with Rajasthan Police, KSOS is a real-time emergency response system for student safety in Kota. With 35,000+ downloads and a #3 trending rank in Parenting category, KSOS is a benchmark in civic-tech deployment.',
    cta: { label: 'View on Play Store', url: 'https://play.google.com/store/apps/details?id=com.twofoldtwins.panicbutton' },
    tags: ['Flutter', 'Firebase', 'Location Services', 'Government Project'],
    logo: 'https://play-lh.googleusercontent.com/pYNfxAwk-cIhS8r-ezoszOGCFdG7YAwI-M3mloaDO61AmQePGaicakgj6MB3Epd4oQ=w480-h960-rw',
  },
  {
    name: 'Gateway 2 Japan',
    type: 'Android App | Education',
    desc: 'A Japanese learning app designed for Indian learners. Gateway 2 Japan makes language acquisition simple through structured lessons and interactive content.',
    cta: { label: 'Download Now', url: '/gateway2japan-maintenance' },
    tags: ['Android', 'Education', 'Firebase'],
    logo: 'https://static.wixstatic.com/media/136462_10cf5a48b1b2475798bfd1c8994e774f~mv2.png/v1/fill/w_115,h_116,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/136462_10cf5a48b1b2475798bfd1c8994e774f~mv2.png',
  },
  {
    name: 'Aignosis.in',
    type: 'Website | AI Tools',
    desc: 'Developed AI tool pages and provided backend integration support for Aignosis.in, an advanced AI-powered platform.',
    cta: { label: 'Visit Site', url: 'https://aignosis.in' },
    tags: ['Web Dev', 'AI', 'Backend Integration'],
    logo: 'https://media.licdn.com/dms/image/v2/D560BAQGU4VtOc8Se9g/company-logo_200_200/company-logo_200_200/0/1730386943151/aignosisai_logo?e=1755129600&v=beta&t=e7QKb_eNLA11jps9qboSD_DhdbI5-4Xb-hT4KBF51Kw',
  },
  {
    name: 'Optevo.com',
    type: 'Website | Enterprise',
    desc: 'Multiple pages of Optevo.com were built by twofoldtwins, contributing to a seamless enterprise web experience.',
    cta: { label: 'Visit Site', url: 'https://optevo.com' },
    tags: ['Web Dev', 'Enterprise', 'UI/UX'],
    logo: 'https://media.licdn.com/dms/image/v2/D560BAQFte5-yhNcluA/company-logo_200_200/company-logo_200_200/0/1738815014884/optevo_logo?e=1755129600&v=beta&t=mhT6hIQknKSuUR516j9RIvM13N0DjNMhbnKRqklzYwM',
  },
  {
    name: 'Vindhya Primrose',
    type: 'Website | Real Estate',
    desc: `Official website for Vindhya Realty's luxury housing project – Primrose. Built for smooth navigation, high performance, and visual appeal.`,
    cta: { label: 'Visit Site', url: 'https://vindhyaprimrose.com' },
    tags: ['Web Dev', 'Real Estate', 'Responsive'],
    logo: 'https://static.wixstatic.com/media/8215c5_22c1b5d137ef41889727742bc1baa3ab~mv2.png/v1/fill/w_476,h_140,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/8215c5_22c1b5d137ef41889727742bc1baa3ab~mv2.png',
  },
  {
    name: 'Vindhya Sparsh',
    type: 'Website | Real Estate',
    desc: `Crafted for one of Vindhya Realty's flagship properties, Vindhya Sparsh showcases housing details, galleries, and forms through a sleek UI.`,
    cta: { label: 'Visit Site', url: 'https://vindhyasparsh.com' },
    tags: ['Web Dev', 'Real Estate', 'Responsive'],
    logo: 'https://static.wixstatic.com/media/021691_04c60a1c45b3476db4c6607be78f540d~mv2.jpg/v1/fill/w_193,h_81,al_c,q_80,usm_0.66_1.00_0.01,enc_avif,quality_auto/021691_04c60a1c45b3476db4c6607be78f540d~mv2.jpg',
  },
];

const Projects = () => (
  <section id="projects" className="py-24 px-4 md:px-16 bg-gradient-to-br from-gray-900/80 to-black/90 backdrop-blur-lg">
    <div className="max-w-6xl mx-auto text-center">
      <motion.h2
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="text-4xl md:text-5xl font-bold mb-8 bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-blue-600"
      >
        Our Projects
      </motion.h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mt-12">
        {projects.map((proj, i) => (
          <motion.div
            key={proj.name}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.2, duration: 0.7 }}
            className="bg-white/10 border border-cyan-400/20 rounded-2xl shadow-xl p-8 flex flex-col items-start backdrop-blur-md hover:scale-[1.03] transition-transform duration-300"
          >
            <div className="mb-4 w-16 h-16 flex items-center justify-center rounded-full bg-cyan-400/20">
              {proj.logo ? (
                <img src={proj.logo} alt={proj.name + ' logo'} className="w-12 h-12 object-contain rounded-full" />
              ) : (
                <span className="text-cyan-400 text-2xl font-bold">{proj.name[0]}</span>
              )}
            </div>
            <div className="text-xl font-bold text-white mb-1">{proj.name}</div>
            <div className="text-cyan-300 text-sm mb-2">{proj.type}</div>
            <div className="text-gray-200 mb-4 text-left">{proj.desc}</div>
            <div className="flex flex-wrap gap-2 mb-4">
              {proj.tags.map(tag => (
                <span key={tag} className="px-3 py-1 rounded-full bg-cyan-700/30 text-cyan-200 text-xs font-semibold">{tag}</span>
              ))}
            </div>
            <a href={proj.cta.url} target={proj.cta.url.startsWith('http') ? '_blank' : undefined} rel={proj.cta.url.startsWith('http') ? 'noopener noreferrer' : undefined} className="mt-auto px-6 py-2 rounded-xl bg-cyan-500 bg-opacity-80 hover:bg-cyan-400 text-black font-semibold shadow-lg transition-all duration-300 backdrop-blur-md">
              {proj.cta.label}
            </a>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default Projects; 