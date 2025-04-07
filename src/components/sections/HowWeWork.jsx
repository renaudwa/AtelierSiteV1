import React from 'react';

const HowWeWork = () => {
    const steps = [
        {
            number: '01',
            title: 'Analyse des besoins',
            description: 'Nous prenons le temps de comprendre vos objectifs et vos attentes pour proposer la solution la plus adaptée.'
        },
        {
            number: '02',
            title: 'Conception sur mesure',
            description: 'Notre équipe crée un design unique qui reflète votre identité et répond à vos besoins spécifiques.'
        },
        {
            number: '03',
            title: 'Développement agile',
            description: 'Nous développons votre projet de manière itérative, en intégrant régulièrement vos retours.'
        },
        {
            number: '04',
            title: 'Livraison et support',
            description: 'Nous assurons le déploiement de votre solution et vous accompagnons dans son utilisation.'
        }
    ];

    return (
        <section id="how-we-work" className="py-24 bg-white">
            <div className="container mx-auto px-4">
                <h2 className="text-4xl md:text-5xl font-bold text-center mb-16">Comment nous travaillons</h2>
                
                <div className="relative max-w-6xl mx-auto">
                    {/* Ligne verticale centrale */}
                    <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-gradient-to-b from-[#3CA6A6] to-[#2A4B7C]"></div>

                    {/* Étapes */}
                    <div className="space-y-32">
                        {steps.map((step, index) => (
                            <div key={index} className={`relative flex items-center ${index % 2 === 0 ? 'justify-end' : 'justify-start'}`}>
                                {/* Cercle avec le numéro */}
                                <div className="absolute left-1/2 transform -translate-x-1/2 w-16 h-16 rounded-full bg-gradient-to-br from-[#3CA6A6] to-[#2A4B7C] 
                                    flex items-center justify-center text-white text-2xl font-bold z-10 shadow-lg">
                                    {step.number}
                                </div>

                                {/* Contenu de l'étape */}
                                <div className={`w-full md:w-1/2 ${index % 2 === 0 ? 'md:pr-16' : 'md:pl-16'}`}>
                                    <div className={`bg-white p-8 rounded-2xl shadow-lg ${index % 2 === 0 ? 'md:mr-8' : 'md:ml-8'}`}>
                                        <h3 className="text-2xl font-bold text-[#3CA6A6] mb-4">{step.title}</h3>
                                        <p className="text-gray-600">{step.description}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default HowWeWork; 