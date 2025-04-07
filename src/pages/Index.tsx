import React from 'react';
import Navbar from '../components/layout/Navbar';
import Hero from '../components/sections/Hero';
import Services from '../components/sections/Services';
import About from '../components/sections/About';
import ProcessSteps from '../components/sections/ProcessSteps';
import ContactForm from '../components/sections/ContactForm';

const Index = () => {
  return (
    <div className="bg-red-500">
      <Navbar />
      <Hero />
      <Services />
      <About />
      <ProcessSteps />
      <ContactForm />
    </div>
  );
};

export default Index; 