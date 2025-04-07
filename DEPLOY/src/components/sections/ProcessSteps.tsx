import React, { useRef } from 'react';

interface ProcessStep {
  number: string;
  title: string;
  description: string;
}

const WorkProcess: React.FC = () => {
  const steps: ProcessStep[] = [
    {
      number: "01",
      title: "Prise de mesures",
      description: "Sur place ou à partir de vos données envoyées par mail, nous prenons les mesures et analysons le contexte d'utilisation pour modéliser, adapter et valider la faisabilité."
    },
    {
      number: "02",
      title: "Validation par plan",
      description: "Nous réalisons un modèle 3D puis le transformons en plans techniques ou en rendu réaliste. Nous vous faisons valider les plans et le matériau choisi avant de démarrer la fabrication."
    },
    {
      number: "03",
      title: "Fabrication",
      description: "Une fois les plans validés, nous procédons à la fabrication de la pièce, en utilisant les matériaux et techniques adaptés pour garantir une réalisation conforme à vos attentes."
    },
    {
      number: "04",
      title: "Suivi et livraison",
      description: "Après la fabrication, nous vérifions la conformité des pièces et leur état, puis nous assurons leur livraison dans les meilleures conditions et dans les délais convenus."
    }
  ];

  const sectionRef = useRef<HTMLDivElement>(null);
  
  return (
    <section className="py-20 px-4 md:px-10 max-w-7xl mx-auto" ref={sectionRef}>
      <div className="text-center mb-16">
        <h2 className="text-3xl md:text-4xl font-medium mb-2">Comment nous travaillons</h2>
        <div className="w-24 h-1 bg-[#3BB8C9] mx-auto mt-4 mb-8"></div>
        <p className="text-gray-600 max-w-3xl mx-auto">
          Notre processus de travail en quatre étapes pour assurer que votre projet soit réalisé selon vos attentes.
        </p>
      </div>

      <div className="process-timeline">
        {steps.map((step, index) => (
          <div 
            key={index} 
            className="process-step"
          >
            <div className="process-step-circle">
              <svg width="20" height="20" viewBox="0 0 20 20">
                <circle 
                  cx="10" 
                  cy="10" 
                  r="6" 
                  fill="white" 
                  stroke="#3BB8C9" 
                  strokeWidth="2" 
                />
              </svg>
            </div>
            <div className="process-step-content">
              <div className="process-step-number">STEP {step.number}</div>
              <div className="process-step-title">{step.title}</div>
              <div className="process-step-description">{step.description}</div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default WorkProcess;