import React, { useEffect, useState } from 'react';

import { FiSun, FiMoon } from 'react-icons/fi';



export default function ThemeToggle() {

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

      className="fixed top-4 right-4 z-50 p-2 rounded-full bg-darkgray/80 hover:bg-neonblue/80 text-neonblue hover:text-neonred shadow-lg transition-colors duration-300"

      onClick={() => setDark(d => !d)}

      aria-label="Toggle theme"

    >

      {dark ? <FiSun size={22} /> : <FiMoon size={22} />}

    </button>

  );

} 