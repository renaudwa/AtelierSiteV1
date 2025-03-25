import { useState, useRef } from 'react';
import { FaPaperPlane } from 'react-icons/fa';

// @ts-ignore
const API_URL = __API_URL__;
console.log('API URL:', API_URL); // Pour déboguer

const ContactForm = () => {
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [status, setStatus] = useState({
    type: null,
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const modalRef = useRef(null);

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    console.log('Submitting to:', API_URL);

    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });
      
      console.log('Response status:', response.status);
      const data = await response.json();
      console.log('Response data:', data);

      if (response.ok) {
        setStatus({
          type: 'success',
          message: 'Message envoyé avec succès!'
        });
        setFormData({
          name: '',
          email: '',
          message: ''
        });
        setTimeout(() => {
          setShowModal(false);
          setStatus({ type: null, message: '' });
        }, 3000);
      } else {
        setStatus({
          type: 'error',
          message: data.message || 'Une erreur est survenue.'
        });
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      setStatus({
        type: 'error',
        message: 'Une erreur est survenue lors de l\'envoi.'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="relative overflow-hidden py-24">
      <div className="bg-gradient-to-br from-[#3CA6A6] to-[#2A4B7C] rounded-3xl overflow-hidden mx-4 md:mx-8 lg:mx-12">
        <div className="container mx-auto px-4 py-16 md:px-8">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Contactez-nous</h2>
              <p className="text-white/80">
                Une question ? Un projet ? N'hésitez pas à nous contacter.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="name" className="block text-white mb-2">
                    Nom
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-white/50 focus:outline-none focus:border-white/40 transition-colors"
                    placeholder="Votre nom"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-white mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-white/50 focus:outline-none focus:border-white/40 transition-colors"
                    placeholder="votre@email.com"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="message" className="block text-white mb-2">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  required
                  rows="6"
                  className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-white/50 focus:outline-none focus:border-white/40 transition-colors resize-none"
                  placeholder="Votre message..."
                ></textarea>
              </div>

              {status.message && (
                <div
                  className={`p-4 rounded-lg ${
                    status.type === 'success'
                      ? 'bg-green-500/20 text-green-100'
                      : 'bg-red-500/20 text-red-100'
                  }`}
                >
                  {status.message}
                </div>
              )}

              <div className="text-center">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`btn-3d inline-flex items-center px-8 py-4 rounded-lg text-white font-medium text-lg shadow-lg hover:shadow-neon transition-all duration-300 ${
                    isSubmitting
                      ? 'bg-gray-500 cursor-not-allowed'
                      : 'bg-gradient-to-r from-vcube-orange to-vcube-teal'
                  }`}
                >
                  {isSubmitting ? (
                    'Envoi en cours...'
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
    </section>
  );
};

export default ContactForm; 