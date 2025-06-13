import React from 'react';
import HeroSection from './components/HeroSection';
import AboutUs from './components/AboutUs';
import Projects from './components/Projects';
import TechStack from './components/TechStack';
import Testimonials from './components/Testimonials';
import Collaborate from './components/Collaborate';
import Footer from './components/Footer';
import DarkModeToggle from './components/DarkModeToggle';
import Gateway2JapanMaintenance from './pages/Gateway2JapanMaintenance';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './index.css';

function App() {
  return (
    <BrowserRouter>
      <div className="bg-black dark:bg-gray-900 text-white dark:text-gray-100 min-h-screen font-sans transition-colors duration-500">
        <DarkModeToggle />
        <Routes>
          <Route path="/gateway2japan-maintenance" element={<Gateway2JapanMaintenance />} />
          <Route path="/" element={
            <>
              <HeroSection />
              <AboutUs />
              <Projects />
              <TechStack />
              <Testimonials />
              <Collaborate />
              <Footer />
            </>
          } />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
