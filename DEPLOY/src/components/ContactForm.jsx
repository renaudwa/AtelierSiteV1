import React, { useState } from 'react';
import '../styles/contact.css';

export default function ContactForm() {
    const [formData, setFormData] = useState({
        nom: '',
        email: '',
        message: ''
    });
    const [status, setStatus] = useState('');
    const [message, setMessage] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setStatus('sending');
        setMessage('');

        try {
            console.log('Envoi du formulaire avec les données:', formData);
            
            const response = await fetch('https://ateliervcube.be/api.php?action=contact', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify(formData)
            });

            console.log('Statut de la réponse:', response.status);
            const data = await response.json();
            console.log('Réponse du serveur:', data);
            
            if (data.success) {
                console.log('Succès:', data.message);
                setStatus('success');
                setFormData({ nom: '', email: '', message: '' });
                setMessage(data.message);
            } else {
                console.error('Erreur serveur:', data.message);
                throw new Error(data.message || 'Erreur lors de l\'envoi');
            }
        } catch (error) {
            console.error('Erreur complète:', error);
            setStatus('error');
            setMessage('Une erreur est survenue lors de l\'envoi du message');
        }
    };

    return (
        <div className="contact-form-container">
            <h2>Contactez-nous</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="nom">Nom</label>
                    <input
                        type="text"
                        id="nom"
                        name="nom"
                        value={formData.nom}
                        onChange={handleChange}
                        required
                        placeholder="Votre nom"
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        placeholder="Votre email"
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="message">Message</label>
                    <textarea
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        required
                        placeholder="Votre message"
                        rows="5"
                    />
                </div>

                {status === 'sending' && (
                    <div className="info-message">
                        Envoi en cours...
                    </div>
                )}
                {status === 'success' && (
                    <div className="success-message">
                        {message || 'Votre message a été envoyé avec succès !'}
                    </div>
                )}
                {status === 'error' && (
                    <div className="error-message">
                        {message || 'Une erreur est survenue. Veuillez réessayer.'}
                    </div>
                )}

                <button 
                    type="submit" 
                    className="submit-button"
                    disabled={status === 'sending'}
                >
                    {status === 'sending' ? 'Envoi...' : 'Envoyer'}
                </button>
            </form>
        </div>
    );
} 