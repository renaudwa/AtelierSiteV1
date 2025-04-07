import React, { useState } from 'react';

const ContactCTA = () => {
    const [isExpanded, setIsExpanded] = useState(false);
    const [showForm, setShowForm] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: ''
    });
    const [status, setStatus] = useState('');
    const [statusMessage, setStatusMessage] = useState('');

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log('Début de la soumission du formulaire');
        setStatus('sending');
        setStatusMessage('');

        try {
            // En production, on utilise toujours l'URL de production
            const apiUrl = 'https://ateliervcube.be/server/process-contact.php';
            
            console.log('URL de l\'API:', apiUrl);
            console.log('Données du formulaire:', formData);
            
            const response = await fetch(apiUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify(formData)
            });

            console.log('Statut de la réponse:', response.status);
            console.log('Headers de la réponse:', response.headers);

            if (!response.ok) {
                const errorText = await response.text();
                console.error('Erreur de réponse:', errorText);
                throw new Error(`Erreur HTTP: ${response.status} - ${errorText}`);
            }

            const data = await response.json();
            console.log('Réponse du serveur:', data);
            
            if (data.success) {
                setStatus('success');
                setFormData({ name: '', email: '', message: '' });
                setStatusMessage(data.message || 'Votre message a été envoyé avec succès !');
                setTimeout(() => {
                    handleClose();
                }, 3000);
            } else {
                throw new Error(data.message || 'Erreur lors de l\'envoi du message');
            }
        } catch (error) {
            console.error('Erreur complète:', error);
            setStatus('error');
            setStatusMessage(error.message || 'Une erreur est survenue lors de l\'envoi du message. Veuillez réessayer plus tard.');
        }
    };

    const handleContactClick = () => {
        setIsExpanded(true);
        setTimeout(() => {
            setShowForm(true);
        }, 300);
    };

    const handleClose = () => {
        setShowForm(false);
        setTimeout(() => {
            setIsExpanded(false);
            setFormData({ name: '', email: '', message: '' });
            setStatus('');
            setStatusMessage('');
        }, 500);
    };

    return (
        <section id="contact" className="relative overflow-hidden py-24">
            <div className={`bg-gradient-to-br from-[#3CA6A6] to-[#2A4B7C] rounded-3xl overflow-hidden mx-4 md:mx-8 lg:mx-12
                transition-all duration-500 ease-in-out ${isExpanded ? 'py-32' : 'h-[400px]'}`}>
                
                {/* Contenu initial */}
                <div className={`h-full flex items-center justify-center transition-all duration-500 ease-in-out
                    ${isExpanded ? 'opacity-0 -translate-y-full pointer-events-none' : 'opacity-100 translate-y-0'}`}>
                    <div className="w-full px-6 md:px-8 lg:px-12">
                        <div className="max-w-6xl mx-auto flex flex-col items-center justify-center text-center">
                            <div className="text-white max-w-2xl">
                                <h2 className="text-4xl md:text-5xl font-bold mb-6">Nous contacter</h2>
                                <p className="text-xl md:text-2xl mb-12 opacity-90">
                                    Prêt à transformer vos idées en réalité? Contactez-nous pour discuter de votre projet et découvrir comment nous pouvons vous aider à concrétiser votre vision.
                                </p>
                                <button
                                    onClick={handleContactClick}
                                    className="bg-white text-[#3CA6A6] px-8 py-4 rounded-xl font-semibold text-lg 
                                        shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
                                >
                                    Contactez-nous
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Formulaire */}
                <div className={`transition-all duration-500 ease-in-out
                    ${isExpanded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-full pointer-events-none'}`}>
                    <div className="w-full max-w-4xl mx-auto text-center text-white flex flex-col items-center justify-center py-12">
                        <div className="flex justify-center mb-10">
                            <h2 className="text-4xl md:text-5xl font-bold">Parlons de vos idées</h2>
                        </div>
                        <form
                            onSubmit={handleSubmit}
                            className="w-full max-w-3xl mx-auto space-y-6"
                        >
                            <div className={`transform transition-all duration-500 ${showForm ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}`}>
                                <input
                                    type="text"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    className="w-full bg-white/10 border border-white/20 rounded-xl px-6 py-4 
                                        text-white placeholder-white/60 focus:outline-none focus:ring-2 
                                        focus:ring-white/30"
                                    placeholder="Votre nom"
                                    required
                                />
                            </div>

                            <div className={`transform transition-all duration-500 delay-100 ${showForm ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}`}>
                                <input
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    className="w-full bg-white/10 border border-white/20 rounded-xl px-6 py-4 
                                        text-white placeholder-white/60 focus:outline-none focus:ring-2 
                                        focus:ring-white/30"
                                    placeholder="Votre email"
                                    required
                                />
                            </div>

                            <div className={`transform transition-all duration-500 delay-200 ${showForm ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}`}>
                                <textarea
                                    name="message"
                                    value={formData.message}
                                    onChange={handleChange}
                                    rows={4}
                                    className="w-full bg-white/10 border border-white/20 rounded-xl px-6 py-4 
                                        text-white placeholder-white/60 focus:outline-none focus:ring-2 
                                        focus:ring-white/30 resize-none"
                                    placeholder="Votre message"
                                    required
                                />
                            </div>

                            {status && (
                                <div className={`transform transition-all duration-500 ${
                                    status === 'success' 
                                        ? 'bg-green-500/20 text-green-100' 
                                        : status === 'error' 
                                            ? 'bg-red-500/20 text-red-100'
                                            : 'bg-white/10 text-white'
                                } rounded-xl px-6 py-4`}>
                                    {statusMessage}
                                </div>
                            )}

                            <div className={`transform transition-all duration-500 delay-300 ${showForm ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}`}>
                                <button
                                    type="submit"
                                    disabled={status === 'sending'}
                                    className={`bg-white text-[#3CA6A6] px-8 py-4 rounded-xl font-semibold text-lg 
                                        shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1
                                        ${status === 'sending' ? 'opacity-75 cursor-not-allowed' : ''}`}
                                >
                                    {status === 'sending' ? 'Envoi en cours...' : 'Envoyer'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ContactCTA;