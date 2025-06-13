import React, { useEffect, useState } from 'react';
import { FaMoon, FaSun } from 'react-icons/fa';

const DarkModeToggle = () => {
  const [dark, setDark] = useState(() =>
    window.matchMedia('(prefers-color-scheme: dark)').matches
  );

  useEffect(() => {
    if (dark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [dark]);

  return (
    <button
      aria-label="Toggle Dark Mode"
      className="fixed top-6 right-6 z-50 p-3 rounded-full bg-gray-800 bg-opacity-80 hover:bg-gray-700 text-cyan-300 shadow-lg transition-all duration-300"
      onClick={() => setDark((d) => !d)}
    >
      {dark ? <FaSun size={22} /> : <FaMoon size={22} />}
    </button>
  );
};

export default DarkModeToggle; 