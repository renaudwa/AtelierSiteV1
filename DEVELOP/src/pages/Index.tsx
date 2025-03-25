import React from 'react';
import Navbar from '../components/layout/Navbar';
import Hero from '../components/sections/Hero';
import Services from '../components/sections/Services';
import About from '../components/sections/About';
import ProcessSteps from '../components/sections/ProcessSteps';
import ContactCTA from '../components/sections/ContactCTA';

const Index = () => {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <main className="space-y-24 pb-24">
        <Hero />
        <Services />
        <About />
        <ProcessSteps />
        <ContactCTA />
      </main>
    </div>
  );
};

export default Index; 