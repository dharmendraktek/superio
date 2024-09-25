import React from 'react';
import { motion } from 'framer-motion';

const Robot = () => {
  const duration = 2; // Duration for the full movement

  const loaderVariants = {
    animate: {
      x: ['-100%', '100%'], // Move from left to right
      transition: {
        duration,
        repeat: Infinity,
        ease: "linear",
      },
    },
  };

  const lineVariants = {
    blink: {
      opacity: [0, 1, 0],
      transition: {
        duration: 0.5,
        repeat: Infinity,
        ease: "easeInOut",
      },
    },
  };

  return (
    <div style={{ position: 'relative', width: '500px', height: '100px', overflow: 'hidden', textAlign: 'center' }}>
      {/* Loader Background */}
      <div style={{
        position: 'absolute',
        top: '40%',
        left: '0%',
        width: '100%',
        height: '20px',
        backgroundColor: '#eee',
        borderRadius: '10px',
        boxShadow: 'inset 0 0 10px rgba(0,0,0,0.2)',
      }} />

      {/* Blinking Green Dots in the Background */}
      <div style={{ position: 'absolute', top: '50%', width: '100%', display: 'flex', justifyContent: 'space-between' }}>
        {[...Array(10)].map((_, index) => (
          <motion.div
            key={index}
            style={{
              width: '6px',
              height: '6px',
              borderRadius: '50%',
              backgroundColor: 'green',
              margin: '0 5px',
              animation: `move ${duration}s linear infinite`,
              animationDelay: `${(duration / 10) * index}s`,
            }}
            variants={lineVariants}
            animate="blink"
          />
        ))}
      </div>

      {/* Blinking Line */}
      <motion.line
        x1="0"
        y1="50"
        x2="300"
        y2="50"
        stroke="cyan"
        strokeWidth="5"
        variants={lineVariants}
        animate="blink"
      />

      {/* Robot Loader */}
      <motion.svg
        width="50"
        height="50"
        viewBox="0 0 100 100"
        style={{
          position: 'absolute',
          top: '20%',
          transform: 'translateY(-50%)',
        }}
        variants={loaderVariants}
        animate="animate"
      >
        <g>
          {/* Robot Head */}
          <rect x="25" y="10" width="60" height="50" fill="#6c63ff" rx="5" />
          <circle cx="40" cy="20" r="4" fill="#fff" /> {/* Left eye */}
          <circle cx="60" cy="20" r="4" fill="#fff" /> {/* Right eye */}
          <rect x="40" y="25" width="20" height="5" fill="#000" /> {/* Mouth */}
          {/* Robot Antennae */}
          <line x1="30" y1="10" x2="30" y2="0" stroke="#6c63ff" strokeWidth="2" />
          <circle cx="30" cy="0" r="3" fill="#ff4757" />
          <line x1="70" y1="10" x2="70" y2="0" stroke="#6c63ff" strokeWidth="2" />
          <circle cx="70" cy="0" r="3" fill="#ff4757" />
        </g>
      </motion.svg>

      {/* Blinking Status Text */}
      <motion.div
        style={{
          position: 'absolute',
          bottom: '10%',
          width: '100%',
          top:'70%',
          color: '#ffffff',
          fontSize: '20px',
          textShadow: '1px 1px 2px rgba(0,0,0,0.5)',
          animation: `blink 1s infinite alternate`
        }}
      >
        AI Checking process is running, please wait...
      </motion.div>
    </div>
  );
};

export default Robot;
