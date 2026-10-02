import React from 'react';

import Navbar from './components/Navbar';

import ThemeToggle from './components/ThemeToggle';

import CustomCursor from './components/CustomCursor';

import Hero from './sections/Hero';

import About from './sections/About';

import Experience from './sections/Experience';

import Projects from './sections/Projects';

import Skills from './sections/Skills';

import Achievements from './sections/Achievements';

import Contact from './sections/Contact';

import Footer from './components/Footer';



function App() {

  return (

    <div className="relative min-h-screen bg-gradient-to-b from-navy to-black text-lightgray font-sans overflow-x-hidden">

      <CustomCursor />

      <ThemeToggle />

      <Navbar />

      <main className="pt-20">

        <Hero />

        <About />

        <Experience />

        <Projects />

        <Skills />

        <Achievements />

        <Contact />

      </main>

      <Footer />

    </div>

  );

}



export default App; 