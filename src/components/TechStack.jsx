import React from 'react';
import { FaReact, FaNodeJs, FaHtml5, FaCss3Alt, FaAndroid, FaGoogle, FaCloud, FaMapMarkedAlt } from 'react-icons/fa';
import { SiFlutter, SiFirebase, SiDart, SiJavascript, SiOpenstreetmap } from 'react-icons/si';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';

const stack = [
  { name: 'Flutter', icon: <SiFlutter className="text-cyan-400" size={36} /> },
  { name: 'Firebase', icon: <SiFirebase className="text-yellow-400" size={36} /> },
  { name: 'Dart', icon: <SiDart className="text-blue-400" size={36} /> },
  { name: 'JavaScript', icon: <SiJavascript className="text-yellow-300" size={36} /> },
  { name: 'HTML', icon: <FaHtml5 className="text-orange-500" size={36} /> },
  { name: 'CSS', icon: <FaCss3Alt className="text-blue-500" size={36} /> },
  { name: 'ReactJS', icon: <FaReact className="text-cyan-300" size={36} /> },
  { name: 'Android Studio', icon: <FaAndroid className="text-green-400" size={36} /> },
  { name: 'NodeJS', icon: <FaNodeJs className="text-green-500" size={36} /> },
  { name: 'Google Cloud', icon: <FaGoogle className="text-blue-400" size={36} /> },
  { name: 'OpenStreetMap API', icon: <SiOpenstreetmap className="text-green-300" size={36} /> },
];

const TechStack = () => (
  <section id="techstack" className="py-24 px-4 md:px-16 bg-black/80 backdrop-blur-lg">
    <div className="max-w-4xl mx-auto text-center">
      <h2 className="text-4xl md:text-5xl font-bold mb-8 bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-blue-600">Tech Stack</h2>
      <div className="mb-10 text-lg text-gray-300">We use a modern, robust, and scalable tech stack to deliver impactful solutions.</div>
      <Swiper
        spaceBetween={30}
        slidesPerView={4}
        loop={true}
        autoplay={{ delay: 1500, disableOnInteraction: false }}
        className="my-8"
        breakpoints={{
          320: { slidesPerView: 2 },
          640: { slidesPerView: 3 },
          1024: { slidesPerView: 5 },
        }}
      >
        {stack.map((tech, i) => (
          <SwiperSlide key={tech.name}>
            <div className="flex flex-col items-center gap-2 p-4 bg-white/10 rounded-xl shadow-lg backdrop-blur-md border border-cyan-400/20">
              {tech.icon}
              <span className="text-sm text-gray-200 font-semibold mt-2">{tech.name}</span>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  </section>
);

export default TechStack; 