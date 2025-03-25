import React from 'react';
import { 
  Boxes, 
  Layers, 
  Settings, 
  FileText, 
  Zap, 
  Box, 
  Printer, 
  Scissors, 
  Wrench, 
  FileCode, 
  Activity, 
  Package, 
  Code 
} from "lucide-react";

const Services = () => {
  const services = [
    {
      title: 'Modélisation 3D',
      icon: <Boxes className="w-9 h-9" />,
      description: 'Création de modèles précis pour vos projets.',
      bgColor: 'bg-gradient-to-br from-[#27a2b8] to-[#2193a8]',
      items: [
        {
          title: 'Modèles optimisés pour la fabrication',
          icon: <Settings className="w-5 h-5" />
        },
        {
          title: 'Plans techniques détaillés',
          icon: <FileText className="w-5 h-5" />
        },
        {
          title: 'Simulation de contraintes mécaniques',
          icon: <Zap className="w-5 h-5" />
        },
        {
          title: 'Modélisation paramétrique',
          icon: <Settings className="w-5 h-5" />
        },
        {
          title: 'Fichiers prêts pour impression 3D & CNC',
          icon: <Box className="w-5 h-5" />
        }
      ]
    },
    {
      title: 'Fabrication Prototype',
      icon: <Layers className="w-9 h-9" />,
      description: 'Développement rapide de prototypes fonctionnels.',
      bgColor: 'bg-gradient-to-br from-[#ff7849] to-[#ff6b37]',
      items: [
        {
          title: 'Impression 3D (FDM, résine, SLS)',
          icon: <Printer className="w-5 h-5" />
        },
        {
          title: 'Découpe & gravure laser',
          icon: <Scissors className="w-5 h-5" />
        },
        {
          title: 'Assemblage & finition',
          icon: <Wrench className="w-5 h-5" />
        },
        {
          title: 'Tests fonctionnels & ajustements',
          icon: <Activity className="w-5 h-5" />
        },
        {
          title: 'Fabrication hybride multi-technique',
          icon: <Settings className="w-5 h-5" />
        }
      ]
    },
    {
      title: 'Petite production',
      icon: <Settings className="w-9 h-9" />,
      description: 'Production en faible volume, optimisée.',
      bgColor: 'bg-gradient-to-br from-[#2a4b7c] to-[#1e3a61]',
      items: [
        {
          title: 'Production en petite série',
          icon: <Package className="w-5 h-5" />
        },
        {
          title: 'Assemblage & post-traitement',
          icon: <Wrench className="w-5 h-5" />
        },
        {
          title: 'Marquage & gravure personnalisée',
          icon: <Code className="w-5 h-5" />
        },
        {
          title: 'Optimisation des coûts & délais',
          icon: <Settings className="w-5 h-5" />
        },
        {
          title: 'Contrôle qualité & ajustements',
          icon: <Wrench className="w-5 h-5" />
        }
      ]
    }
  ];

  return (
    <section id="services" className="bg-white mt-16 mb-24 pt-32 md:pt-48">
      <div className="container mx-auto px-4 md:px-6 pt-12 md:pt-20 pb-32 md:pb-40">
        <div className="text-center mb-16 md:mb-24">
          <h2 className="text-4xl md:text-4xl font-bold mb-6">Nos Services</h2>
          <div className="w-24 h-1 bg-vcube-teal mx-auto mb-6 md:mb-6"></div>
          <p className="text-xl md:text-xl text-gray-600">
            Découvrez nos prestations en prototypage, modélisation et production.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16 md:mb-24">
          {services.map((service, index) => (
            <div key={index} className="flex flex-col h-full bg-white rounded-lg shadow-lg overflow-hidden">
              <div 
                className={`${service.bgColor} p-6 md:p-8 text-white`}
                style={{
                  background: service.title === 'Modélisation 3D' 
                    ? 'linear-gradient(135deg,rgb(61, 180, 201) 40%,rgb(149, 196, 205) 100%)' 
                    : service.title === 'Fabrication Prototype'
                    ? 'linear-gradient(135deg,rgb(244, 133, 5) 40%,rgb(240, 201, 156) 100%)'
                    : 'linear-gradient(135deg,rgb(44, 105, 197) 40%,rgb(103, 149, 227) 100%)'
                }}
              >
                <div className="flex items-center gap-8 mb-4">
                  <div className="flex-shrink-0">
                    {service.icon}
                  </div>
                  <h3 className="text-2xl font-bold">
                    {service.title}
                  </h3>
                </div>
                <p className="text-white/90">
                  {service.description}
                </p>
              </div>
              
              <div className="p-6 md:p-8 flex-grow">
                <ul className="space-y-4">
                  {service.items.map((item, itemIndex) => (
                    <li key={itemIndex} className="flex items-center gap-4 hover:bg-gray-50 p-2 rounded-md transition-colors">
                      <span className="text-gray-700 flex-shrink-0">{item.icon}</span>
                      <span className="text-gray-700">{item.title}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services; 