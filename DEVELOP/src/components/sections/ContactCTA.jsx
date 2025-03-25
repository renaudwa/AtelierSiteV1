import React, { useState, useRef } from 'react';

const PaperPlaneIcon = ({ isFlying }) => (
    <svg 
        className={`w-5 h-5 ml-2 inline-block transition-all duration-1000 transform
            ${isFlying ? 'translate-x-[500%] translate-y-[-500%] rotate-[45deg] opacity-0' : ''}`}
        viewBox="0 0 24 24" 
        fill="none" 
        xmlns="http://www.w3.org/2000/svg"
    >
        <path 
            d="M22 2L11 13M22 2L15 22L11 13M22 2L2 9L11 13" 
            stroke="currentColor" 
            strokeWidth="2" 
            strokeLinecap="round" 
            strokeLinejoin="round"
        />
    </svg>
);

const ContactCTA = () => {
    const [isExpanded, setIsExpanded] = useState(false);
    const [isFlying, setIsFlying] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: ''
    });
    const [status, setStatus] = useState({ type: null, message: '' });
    const [isLoading, setIsLoading] = useState(false);
    const formRef = useRef(null);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setIsFlying(true);

        try {
            const response = await fetch('https://ateliervcube.be/process-contact.php', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
                mode: 'cors',
            });

            const data = await response.json();

            if (response.ok) {
                setStatus({ type: 'success', message: 'Message envoyé avec succès!' });
                setFormData({ name: '', email: '', message: '' });
                setTimeout(() => {
                    setIsExpanded(false);
                    setStatus({ type: null, message: '' });
                    setIsFlying(false);
                }, 3000);
            } else {
                setStatus({ type: 'error', message: data.message || 'Une erreur est survenue lors de l\'envoi.' });
                setIsFlying(false);
            }
        } catch (error) {
            console.error('Erreur:', error);
            setStatus({ type: 'error', message: 'Une erreur est survenue lors de la communication avec le serveur.' });
            setIsFlying(false);
        }

        setIsLoading(false);
    };

    return (
        <section id="contact" className="relative overflow-hidden py-24">
            <div className={`bg-gradient-to-br from-[#3CA6A6] to-[#2A4B7C] rounded-3xl overflow-hidden mx-4 md:mx-8 lg:mx-12
                transition-all duration-700 ease-in-out ${isExpanded ? 'h-[600px] md:h-[700px]' : 'h-[400px]'} relative`}>
                
                {/* Contenu initial */}
                <div className={`absolute inset-0 flex items-center justify-center transition-all duration-700 transform
                    ${isExpanded ? 'translate-y-[-20%] opacity-0' : 'translate-y-0 opacity-100'}`}>
                    <div className="w-full px-6 md:px-8 lg:px-12">
                        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                            {/* Texte */}
                            <div className="text-white">
                                <h2 className="text-4xl md:text-5xl font-bold mb-6">Nous contacter</h2>
                                <p className="text-xl md:text-2xl mb-12 opacity-90">
                                    Prêt à transformer vos idées en réalité? Contactez-nous pour discuter de votre projet et découvrir comment nous pouvons vous aider à concrétiser votre vision.
                                </p>
                                <button
                                    onClick={() => setIsExpanded(true)}
                                    className="bg-white text-[#3CA6A6] px-8 py-4 rounded-xl font-semibold text-lg 
                                        shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
                                >
                                    Contactez-nous
                                </button>
                            </div>
                            
                            {/* Rectangle Jaune */}
                            <div className="hidden md:block relative h-[400px] perspective-container">
                                <div className="absolute inset-0 bg-yellow-400 rounded-2xl shadow-2xl transform hover:scale-105 transition-transform duration-500"></div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Formulaire */}
                <div className={`absolute inset-0 flex items-center justify-center transition-all duration-700 transform
                    ${isExpanded ? 'translate-y-0 opacity-100' : 'translate-y-[100%] opacity-0'}`}>
                    <div className="w-full px-6 md:px-8 lg:px-12">
                        <div className="max-w-4xl mx-auto text-center text-white">
                            <h2 className="text-4xl md:text-5xl font-bold mb-10 transition-all duration-700 transform">Nous contacter</h2>
                            <form
                                ref={formRef}
                                onSubmit={handleSubmit}
                                className="max-w-2xl mx-auto space-y-6"
                            >
                                <div className="relative transition-all duration-700 delay-100">
                                    <input
                                        type="text"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleChange}
                                        className="w-full bg-white/10 border border-white/20 rounded-xl px-6 py-4 
                                            text-white placeholder-white/60 focus:outline-none focus:ring-2 
                                            focus:ring-white/30 transition-all"
                                        placeholder="Votre nom"
                                        required
                                    />
                                </div>

                                <div className="relative transition-all duration-700 delay-200">
                                    <input
                                        type="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        className="w-full bg-white/10 border border-white/20 rounded-xl px-6 py-4 
                                            text-white placeholder-white/60 focus:outline-none focus:ring-2 
                                            focus:ring-white/30 transition-all"
                                        placeholder="Votre email"
                                        required
                                    />
                                </div>

                                <div className="relative transition-all duration-700 delay-300">
                                    <textarea
                                        name="message"
                                        value={formData.message}
                                        onChange={handleChange}
                                        rows={4}
                                        className="w-full bg-white/10 border border-white/20 rounded-xl px-6 py-4 
                                            text-white placeholder-white/60 focus:outline-none focus:ring-2 
                                            focus:ring-white/30 transition-all resize-none"
                                        placeholder="Votre message"
                                        required
                                    />
                                </div>
                                
                                {status.type && (
                                    <div className={`p-4 rounded-lg ${
                                        status.type === 'success' ? 'bg-green-500/20' : 'bg-red-500/20'
                                    } text-white animate-fadeIn`}>
                                        {status.message}
                                    </div>
                                )}

                                <div className="transition-all duration-700 delay-400">
                                    <button
                                        type="submit"
                                        disabled={isLoading}
                                        className="bg-white text-[#3CA6A6] px-8 py-4 rounded-xl font-semibold text-lg 
                                            shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 
                                            disabled:opacity-70 disabled:cursor-not-allowed mt-8 inline-flex items-center"
                                    >
                                        {isLoading ? (
                                            <span className="flex items-center">
                                                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-[#3CA6A6]" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                                </svg>
                                                Envoi en cours...
                                            </span>
                                        ) : (
                                            <>
                                                Envoyer
                                                <PaperPlaneIcon isFlying={isFlying} />
                                            </>
                                        )}
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ContactCTA; 