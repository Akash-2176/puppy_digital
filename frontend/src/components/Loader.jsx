import React, { useState, useEffect } from 'react';

const Loader = ({ onComplete }) => {
  const [showText, setShowText] = useState(false);

  useEffect(() => {
    const textTimer = setTimeout(() => setShowText(true), 500);
    const completeTimer = setTimeout(() => onComplete(), 3000);

    return () => {
      clearTimeout(textTimer);
      clearTimeout(completeTimer);
    };
  }, [onComplete]);

  return (
    <div className="loader-overlay">
      {/* Animated Circles in Background */}
      <div className="animated-bg" />

      <div className="loader-content">
        {/* Dolphin SVG */}
        <div className="dolphin-container">
          <svg width="120" height="80" viewBox="0 0 120 80" fill="none">
            <defs>
              <linearGradient id="dolphinGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#7c3aed" />
                <stop offset="100%" stopColor="#ec4899" />
              </linearGradient>
            </defs>

            <path
              d="M15 50C15 50 25 35 45 35C65 35 85 40 95 45C105 50 110 55 105 60C100 65 90 60 85 55C80 50 70 45 60 50C50 55 45 60 40 55C35 50 30 45 25 50C20 55 15 50 15 50Z"
              fill="url(#dolphinGradient)"
            />
            <ellipse cx="25" cy="45" rx="12" ry="8" fill="url(#dolphinGradient)" />
            <circle cx="22" cy="42" r="2" fill="white" />
            <circle cx="23" cy="41.5" r="1" fill="black" />
            <path d="M55 35L60 25L65 35Z" fill="url(#dolphinGradient)" />
            <path d="M95 45L105 35L110 45L105 55Z" fill="url(#dolphinGradient)" />
          </svg>
        </div>

        {/* Fade-In Text */}
        <div className={`loader-text ${showText ? 'show' : ''}`}>
          <h1>Puppy Digital</h1>
          <div className="dots">
            <span className="dot" />
            <span className="dot delay" />
            <span className="dot delay-2" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Loader;
