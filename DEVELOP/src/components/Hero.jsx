import React from 'react';
import './Hero.css';

const Hero = () => {
  return (
    <div className="hero-section">
      <div className="hero-content">
        <h1 className="hero-title">
          Donnez vie à vos projets avec Atelier VCUBE
        </h1>
        <p className="hero-description">
          Contactez-nous pour discuter de votre projet et découvrir comment nous pouvons vous aider à concrétiser votre vision.
        </p>
        <button className="hero-cta">
          Commencer un projet
        </button>
      </div>
    </div>
  );
};

export default Hero; 