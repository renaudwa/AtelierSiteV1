import React, { useState, useRef, useEffect } from 'react';
import { FaPaperPlane } from 'react-icons/fa';

const ContactForm = () => {
    const [isExpanded, setIsExpanded] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: ''
    });
    const [status, setStatus] = useState({ type: null, message: '' });
    const [isLoading, setIsLoading] = useState(false);
    const formRef = useRef(null);
    const containerRef = useRef(null);

    // Fonction pour calculer la hauteur nécessaire
    const updateContainerHeight = () => {
        if (containerRef.current) {
            const formHeight = formRef.current?.offsetHeight || 0;
            const minHeight = 400; // Hauteur minimale
            const newHeight = Math.max(minHeight, formHeight + 100); // +100 pour le padding
            containerRef.current.style.height = `${newHeight}px`;
        }
    };

    // Mise à jour de la hauteur quand le formulaire est visible
    useEffect(() => {
        if (isExpanded) {
            updateContainerHeight();
        }
    }, [isExpanded]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            const response = await fetch('https://ateliervcube.be/process-contact.php', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            const data = await response.json();

            if (response.ok) {
                setStatus({ 
                    type: 'success', 
                    message: 'Merci, votre message a été envoyé avec succès !' 
                });
                setTimeout(() => {
                    setFormData({ name: '', email: '', message: '' });
                    setStatus({ type: null, message: '' });
                }, 3000);
            } else {
                setStatus({ 
                    type: 'error', 
                    message: data.message || 'Une erreur est survenue lors de l\'envoi.' 
                });
            }
        } catch (error) {
            setStatus({ 
                type: 'error', 
                message: 'Une erreur est survenue lors de l\'envoi. Veuillez réessayer.' 
            });
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <section id="contact" className="relative overflow-hidden py-24">
            <div 
                ref={containerRef}
                className={`bg-gradient-to-br from-[#3CA6A6] to-[#2A4B7C] rounded-3xl overflow-hidden mx-4 md:mx-8 lg:mx-12
                    transition-all duration-700 ease-in-out relative flex items-center justify-center`}
                style={{ height: isExpanded ? 'auto' : '400px' }}
            >
                <div className="w-full max-w-4xl mx-auto px-6 py-12">
                    {/* Contenu initial */}
                    <div className={`text-center transition-all duration-700
                        ${isExpanded ? 'opacity-0 scale-95 absolute' : 'opacity-100 scale-100 relative'}`}>
                        <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">Nous contacter</h2>
                        <p className="text-xl text-white mb-8 max-w-2xl mx-auto">
                            Une question ? Un projet ? N'hésitez pas à nous contacter pour discuter de vos besoins.
                        </p>
                        <button
                            onClick={() => setIsExpanded(true)}
                            className="bg-white text-[#3CA6A6] px-8 py-4 rounded-xl font-semibold text-lg 
                                shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
                        >
                            Contactez-nous
                        </button>
                    </div>

                    {/* Formulaire */}
                    <div className={`transition-all duration-700
                        ${isExpanded ? 'opacity-100 scale-100 relative' : 'opacity-0 scale-95 absolute'}`}>
                        <div ref={formRef} className="w-full max-w-2xl mx-auto px-4 md:px-6">
                            <form onSubmit={handleSubmit} className="space-y-8">
                                <div className="space-y-6">
                                    <div>
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
                                    <div>
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
                                    <div>
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
                                </div>

                                {status.message && (
                                    <div className={`p-4 rounded-lg ${
                                        status.type === 'success' ? 'bg-green-500/20' : 'bg-red-500/20'
                                    } text-white`}>
                                        {status.message}
                                    </div>
                                )}

                                <div className="flex justify-center space-x-4 pt-4">
                                    <button
                                        type="button"
                                        onClick={() => setIsExpanded(false)}
                                        className="bg-white/10 text-white px-8 py-4 rounded-xl font-semibold text-lg 
                                            shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
                                    >
                                        Retour
                                    </button>
                                    <button
                                        type="submit"
                                        disabled={isLoading}
                                        className="bg-white text-[#3CA6A6] px-8 py-4 rounded-xl font-semibold text-lg 
                                            shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 
                                            disabled:opacity-70 disabled:cursor-not-allowed inline-flex items-center"
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
                                                <FaPaperPlane className="ml-2" />
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

export default ContactForm; 