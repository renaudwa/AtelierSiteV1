import React from 'react';

const About = () => {
  return (
    <section id="about" className="bg-white mt-24 mb-24 pt-32 md:pt-48">
      <div className="container mx-auto px-6 md:px-8 py-32 md:py-40">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16 md:mb-24">
            <h2 className="text-4xl md:text-5xl font-bold mb-8">
              Un studio de design accessible 
            </h2>
            <div className="w-32 h-1 bg-vcube-teal mx-auto mb-12"></div>
          </div>
          
          <div className="grid md:grid-cols-2 gap-12 md:gap-16">
            <div className="space-y-8">
              <p className="text-lg md:text-xl text-gray-600">
                Nous sommes là pour vous aider à créer des produits innovants et durables 
                grace à notre expertise technique et créativité pour donner 
                vie à vos idées.
              </p>
              
              <p className="text-lg md:text-xl text-gray-600">
                Que vous soyez une startup ou une grande entreprise, nous adaptons nos services 
                à vos besoins et votre budget.
              </p>
            </div>
            
            <div className="bg-white p-8 md:p-10 rounded-xl shadow-lg">
              <div className="flex items-center justify-center">
                <img 
                  src="/images/logo.svg" 
                  alt="VCube Logo" 
                  className="w-40 h-40 object-contain"
                />
              </div>
              <p className="text-center mt-6 text-lg md:text-xl text-gray-600">
                Expertise & Innovation
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About; 