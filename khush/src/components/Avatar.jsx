import React from 'react';

import { motion } from 'framer-motion';



export default function Avatar() {

  return (

    <motion.div

      className="rounded-full shadow-xl overflow-hidden bg-darkgray"

      whileHover={{ rotate: 8, scale: 1.05, boxShadow: '0 0 40px #00eaff, 0 0 80px #ff2253' }}

      transition={{ type: 'spring', stiffness: 200, damping: 10 }}

      tabIndex={0}

      aria-label="3D avatar of Khushvardhan Bhardwaj"

    >

      <img

        src={process.env.PUBLIC_URL + '/avatar.png'}

        alt="3D avatar of Khushvardhan Bhardwaj"

        className="w-48 h-48 md:w-64 md:h-64 object-cover mx-auto"

        draggable="false"

      />

    </motion.div>

  );

} 