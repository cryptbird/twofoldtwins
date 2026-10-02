import React, { useState } from 'react';

import { FiMenu, FiX } from 'react-icons/fi';



const navLinks = [

  { name: 'Home', to: '#hero' },

  { name: 'About', to: '#about' },

  { name: 'Experience', to: '#experience' },

  { name: 'Projects', to: '#projects' },

  { name: 'Skills', to: '#skills' },

  { name: 'Achievements', to: '#achievements' },

  { name: 'Contact', to: '#contact' },

];



export default function Navbar() {

  const [open, setOpen] = useState(false);

  return (

    <nav className="fixed top-0 left-0 w-full z-50 bg-navy/90 backdrop-blur border-b border-darkgray">

      <div className="max-w-6xl mx-auto flex items-center justify-between px-6 py-3">

        <a href="#hero" className="text-2xl font-bold text-neonblue tracking-tight">Khushvardhan</a>

        <div className="hidden md:flex gap-8">

          {navLinks.map(link => (

            <a

              key={link.name}

              href={link.to}

              className="text-lightgray hover:text-neonred transition-colors duration-200 font-medium relative after:block after:h-0.5 after:bg-neonblue after:scale-x-0 hover:after:scale-x-100 after:transition-transform after:duration-300 after:origin-left after:mt-1"

            >

              {link.name}

            </a>

          ))}

        </div>

        <button className="md:hidden text-lightgray text-2xl" onClick={() => setOpen(!open)}>

          {open ? <FiX /> : <FiMenu />}

        </button>

      </div>

      {/* Mobile menu */}

      {open && (

        <div className="md:hidden bg-navy border-t border-darkgray px-6 pb-4 flex flex-col gap-4 animate-fadeIn">

          {navLinks.map(link => (

            <a

              key={link.name}

              href={link.to}

              className="text-lightgray hover:text-neonred text-lg font-medium"

              onClick={() => setOpen(false)}

            >

              {link.name}

            </a>

          ))}

        </div>

      )}

    </nav>

  );

} 