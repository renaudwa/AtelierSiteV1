import React, { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { scrollToElement } from '../../utils';
import { useScroll } from '../../hooks/useScroll';
import { GRADIENTS } from '../../config/constants';
import type { NavItem } from '../../types/common';

const navItems: NavItem[] = [
  { id: 'services', label: 'Services' },
  { id: 'about', label: 'À propos' },
  { id: 'process', label: 'Processus' },
];

const Navbar = () => {
  const isScrolled = useScroll();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleNavigation = (id: string) => {
    setIsMobileMenuOpen(false);
    scrollToElement(id);
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-white shadow-md py-2'
          : 'bg-transparent py-4'
      }`}
    >
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center">
            <a 
              href="#" 
              className={`font-bold text-2xl flex items-center ${
                isScrolled ? 'text-vcube-dark' : 'text-white'
              }`}
              onClick={(e) => {
                e.preventDefault();
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
            >
              <img 
                src="./images/logo.svg"
                alt="VCube lol" 
                className={`h-8 w-auto mr-2 ${
                  isScrolled 
                    ? '[filter:brightness(0)_saturate(100%)_invert(48%)_sepia(95%)_saturate(446%)_hue-rotate(142deg)_brightness(86%)_contrast(86%)]'
                    : 'brightness-0 invert'
                }`}
              />
              <div className="flex flex-col font-['Quicksand'] font-bold">
                <span className={`text-lg leading-tight ${
                  isScrolled 
                    ? 'logo-gradient'
                    : 'text-white'
                }`}>Atelier</span>
                <span className={`text-lg leading-tight ${
                  isScrolled 
                    ? 'logo-gradient'
                    : 'text-white'
                }`}>Vcube Pro</span>
              </div>
            </a>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <a
                key={item.id}
                onClick={() => handleNavigation(item.id)}
                className={`animated-underline cursor-pointer transition-colors ${
                  isScrolled ? 'text-vcube-dark hover:text-vcube-teal' : 'text-white hover:text-vcube-teal'
                }`}
              >
                {item.label}
              </a>
            ))}
            <a 
              onClick={() => handleNavigation('contact')} 
              className="btn-3d bg-vcube-teal text-white px-4 py-2 rounded-md hover:shadow-neon"
            >
              Nous contacter
            </a>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              className={`p-2 rounded-lg transition-colors ${
                isScrolled 
                  ? 'text-vcube-dark hover:bg-gray-100' 
                  : 'text-white hover:bg-white/10'
              }`}
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div 
        className={`md:hidden fixed inset-x-0 top-[60px] transition-all duration-300 ease-in-out transform ${
          isMobileMenuOpen 
            ? 'translate-y-0 opacity-100 pointer-events-auto' 
            : '-translate-y-2 opacity-0 pointer-events-none'
        }`}
      >
        <div className="bg-white shadow-lg rounded-b-2xl mx-4 overflow-hidden">
          <div className="py-2 px-4 space-y-1">
            {navItems.map((item) => (
              <a
                key={item.id}
                onClick={() => handleNavigation(item.id)}
                className="block py-3 px-4 text-vcube-dark hover:bg-gray-50 rounded-lg transition-colors cursor-pointer"
              >
                {item.label}
              </a>
            ))}
            <a 
              onClick={() => handleNavigation('contact')}
              className="block py-3 px-4 mt-2 bg-vcube-teal text-white rounded-lg text-center hover:bg-vcube-teal/90 transition-colors cursor-pointer"
            >
              Nous contacter
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar; 