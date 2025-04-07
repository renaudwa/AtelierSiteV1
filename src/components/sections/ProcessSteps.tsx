import React from 'react';

const ProcessSteps = () => {
  const steps = [
    {
      number: '01',
      title: 'Prise de contact',
      description: 'Discutons de votre projet et de vos besoins. Nous vous aiderons à définir la meilleure approche pour votre projet.'
    },
    {
      number: '02',
      title: 'Validation par étape',
      description: 'Nous travaillons en étroite collaboration avec vous pour valider chaque étape du projet et assurer sa réussite.'
    },
    {
      number: '03',
      title: 'Fabrication',
      description: 'Une fois le projet validé, nous passons à la phase de fabrication en utilisant les technologies les plus adaptées.'
    },
    {
      number: '04',
      title: 'Suivi et livraison',
      description: 'Nous assurons un suivi complet de votre projet jusqu\'à la livraison finale.'
    }
  ];

  return (
    <section id="process" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4 md:px-6">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
          Comment nous travaillons
        </h2>
        
        <div className="max-w-5xl mx-auto">
          <div className="space-y-12">
            {steps.map((step, index) => (
              <div 
                key={index}
                className="flex items-start gap-6"
              >
                <div className="flex-shrink-0 w-12 h-12 rounded-full bg-vcube-teal text-white flex items-center justify-center text-xl font-bold">
                  {step.number}
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
                  <p className="text-gray-600">{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProcessSteps; 