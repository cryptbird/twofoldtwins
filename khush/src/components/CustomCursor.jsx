import React, { useEffect, useRef } from 'react';



export default function CustomCursor() {

  const cursorRef = useRef(null);



  useEffect(() => {

    const moveCursor = (e) => {

      if (window.innerWidth < 768) {

        cursorRef.current.style.display = 'none';

        return;

      }

      cursorRef.current.style.display = 'block';

      cursorRef.current.style.left = e.clientX + 'px';

      cursorRef.current.style.top = e.clientY + 'px';

    };

    document.addEventListener('mousemove', moveCursor);

    return () => document.removeEventListener('mousemove', moveCursor);

  }, []);



  return (

    <div

      ref={cursorRef}

      className="pointer-events-none fixed z-[9999] w-8 h-8 rounded-full bg-neonblue/30 blur-[2px] mix-blend-lighten transition-transform duration-75"

      style={{ transform: 'translate(-50%, -50%)' }}

    />

  );

} 