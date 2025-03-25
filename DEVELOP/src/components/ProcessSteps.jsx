import React from 'react';
import '../styles/ProcessSteps.css';

const ProcessSteps = () => {
    const steps = [
        {
            number: '01',
            title: 'Prise de mesures',
            description: 'Sur place ou à partir de vos données envoyées par mail, nous prenons les mesures et analysons le contexte d\'utilisation pour modéliser, adapter et valider la faisabilité.'
        },
        {
            number: '02',
            title: 'Validation par plan',
            description: 'Nous réalisons un modèle 3D puis le transformons en plans techniques ou en rendu réaliste. Nous vous faisons valider les plans et le matériau choisi avant de démarrer la fabrication.'
        },
        {
            number: '03',
            title: 'Fabrication',
            description: 'Nous fabriquons votre projet dans notre atelier avec des matériaux de qualité et un savoir-faire artisanal.'
        },
        {
            number: '04',
            title: 'Installation',
            description: 'Nous installons votre projet sur place en veillant à la qualité de la finition et au respect de vos attentes.'
        }
    ];

    const values = ['Éthique', 'Local', 'Sur mesure', 'Durable'];

    return (
        <div className="main-container">
            <h1 className="process-title">
                Notre processus de travail en quatre étapes pour assurer que votre projet 
                soit réalisé selon vos attentes.
            </h1>

            <div className="steps-container">
                {steps.map((step, index) => (
                    <div key={step.number} className="step-card">
                        <div className="step-number">{step.number}</div>
                        <h2 className="step-title">{step.title}</h2>
                        <p className="step-description">{step.description}</p>
                    </div>
                ))}
            </div>

            <div className="value-buttons">
                {values.map((value, index) => (
                    <button key={index} className="value-button">
                        {value}
                    </button>
                ))}
            </div>

            <nav className="bottom-nav">
                <button className="nav-button">
                    <img src="/images/notes.svg" alt="Notes" />
                </button>
                <button className="nav-button add-button">
                    <img src="/images/plus.svg" alt="Ajouter" />
                </button>
                <button className="nav-button">
                    <img src="/images/up.svg" alt="Remonter" />
                </button>
            </nav>
        </div>
    );
};

export default ProcessSteps; 