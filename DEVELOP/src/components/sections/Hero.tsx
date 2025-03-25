import React, { useRef, useEffect } from 'react';
import { Showcase } from '../3d/Showcase';

const Hero = () => {
  const headingRef = useRef(null);
  const subheadingRef = useRef(null);
  const buttonRef = useRef(null);
  const modelContainerRef = useRef(null);

  useEffect(() => {
    // Add animations
    const headingElement = headingRef.current;
    const subheadingElement = subheadingRef.current;
    const buttonElement = buttonRef.current;
    const modelContainer = modelContainerRef.current;

    if (headingElement && subheadingElement && buttonElement && modelContainer) {
      setTimeout(() => {
        headingElement.classList.add('animate-fade-in-up');
        headingElement.style.opacity = '1';
      }, 100);
      
      setTimeout(() => {
        subheadingElement.classList.add('animate-fade-in-up');
        subheadingElement.style.opacity = '1';
      }, 300);
      
      setTimeout(() => {
        buttonElement.classList.add('animate-fade-in-up');
        buttonElement.style.opacity = '1';
      }, 500);
      
      setTimeout(() => {
        modelContainer.classList.add('animate-fade-in');
        modelContainer.style.opacity = '1';
      }, 700);
    }

    // Parallax effect
    const handleMouseMove = (e: MouseEvent) => {
      if (!modelContainer) return;
      
      const { left, top, width, height } = modelContainer.getBoundingClientRect();
      const x = (e.clientX - left) / width - 0.5;
      const y = (e.clientY - top) / height - 0.5;
      
      modelContainer.style.transform = `perspective(1000px) rotateY(${x * 5}deg) rotateX(${-y * 5}deg)`;
    };

    window.addEventListener('mousemove', handleMouseMove);
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <div className="relative min-h-screen flex items-center animated-gradient overflow-hidden pt-16 mb-32 border-b-2 border-red-500">
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-0 left-0 w-64 h-64 bg-vcube-teal opacity-10 rounded-full blur-3xl transform -translate-x-1/2 -translate-y-1/2"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-vcube-orange opacity-10 rounded-full blur-3xl transform translate-x-1/2 translate-y-1/2"></div>
      </div>
      
      <div className="container mx-auto px-4 md:px-6 py-12 flex flex-col md:flex-row items-center z-10">
        <div className="md:w-1/2 mb-12 md:mb-0 md:pr-8">
          <h1 
            ref={headingRef}
            className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 opacity-0"
            style={{ transition: 'all 0.6s ease-out' }}
          >
            <span className="block mb-2">Transformez
            vos idées en cool</span>
            <span className="bg-gradient-to-r from-vcube-orange to-vcube-teal bg-clip-text text-transparent">
              réalité
            </span>
          </h1>
          
          <p 
            ref={subheadingRef}
            className="text-xl text-gray-700 mb-8 opacity-0"
            style={{ transition: 'all 0.6s ease-out' }}
          >
            Découvrez notre atelier à Charleroi, spécialisé en modélisation 3D, prototypage et fabrication.
          </p>
          
          <a 
            ref={buttonRef}
            href="#contact"
            className="btn-3d inline-block bg-gradient-to-r from-vcube-teal to-vcube-blue text-white px-8 py-4 rounded-lg font-medium text-lg shadow-lg hover:shadow-neon opacity-0"
            style={{ transition: 'all 0.6s ease-out' }}
            onClick={(e) => {
              e.preventDefault();
              const element = document.getElementById('contact');
              if (element) {
                element.scrollIntoView({ behavior: 'smooth' });
              }
            }}
          >
            Démarrer un projet
          </a>
        </div>
        
        <div 
          ref={modelContainerRef}
          className="perspective-container opacity-0"
          style={{ 
            transition: 'transform 0.3s ease-out, opacity 0.6s ease-out',
            transformStyle: 'preserve-3d',
            width: 'var(--model-viewer-width-md)'
          }}
        >
          <Showcase />
        </div>
      </div>
    </div>
  );
};

export default Hero;
