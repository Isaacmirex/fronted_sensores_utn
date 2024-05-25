// src/components/Preloader/Preloader.jsx
import React from 'react';
import './PreloaderCSS.css';

const Preloader = ({ load }) => {
  if (!load) return null;
  return (
    <div className="preloader">
      <div className="loader"></div>
    </div>
  );
};

export default Preloader;
