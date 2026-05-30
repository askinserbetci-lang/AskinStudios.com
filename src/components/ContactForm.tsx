import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Send, Loader2 } from 'lucide-react';

export const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('submitting');
    setErrorMessage('');

    try {
      // Construct the email body
      const subject = `Contact Inquiry: ${formData.name}`;
      const body = `
Name: ${formData.name}
Email: ${formData.email}

Message:
${formData.message}
      `.trim();

      // Open the user's default email client
      const mailtoLink = `mailto:info@askinstudios.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
      window.location.href = mailtoLink;

      setStatus('success');
      setFormData({
        name: '',
        email: '',
        message: ''
      });
    } catch (error) {
      setStatus('error');
      setErrorMessage(error instanceof Error ? error.message : 'Failed to send message');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <label htmlFor="name" className="text-xs uppercase tracking-widest text-gold/80">Name</label>
          <input
            type="text"
            id="name"
            name="name"
            required
            value={formData.name}
            onChange={handleChange}
            className="w-full bg-white/5 border border-white/10 rounded-sm px-4 py-3 text-white focus:outline-none focus:border-gold/50 transition-colors"
            placeholder="Your Name"
          />
        </div>
        <div className="space-y-2">
          <label htmlFor="email" className="text-xs uppercase tracking-widest text-gold/80">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            required
            value={formData.email}
            onChange={handleChange}
            className="w-full bg-white/5 border border-white/10 rounded-sm px-4 py-3 text-white focus:outline-none focus:border-gold/50 transition-colors"
            placeholder="your@email.com"
          />
        </div>
      </div>

      <div className="space-y-2">
        <label htmlFor="message" className="text-xs uppercase tracking-widest text-gold/80">Message</label>
        <textarea
          id="message"
          name="message"
          required
          rows={6}
          value={formData.message}
          onChange={handleChange}
          className="w-full bg-white/5 border border-white/10 rounded-sm px-4 py-3 text-white focus:outline-none focus:border-gold/50 transition-colors resize-none"
          placeholder="How can we help you?"
        />
      </div>

      <div className="pt-4">
        <button
          type="submit"
          disabled={status === 'submitting'}
          className="w-full bg-gold text-ink font-semibold uppercase tracking-widest text-xs py-4 rounded-sm hover:bg-white transition-colors flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {status === 'submitting' ? (
            <>
              <Loader2 className="animate-spin" size={16} /> Sending...
            </>
          ) : (
            <>
              Send Message <Send size={16} />
            </>
          )}
        </button>
      </div>

      {status === 'success' && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-4 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-sm text-center rounded-sm"
        >
          Message sent successfully! We'll be in touch soon.
        </motion.div>
      )}

      {status === 'error' && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-4 bg-red-500/10 border border-red-500/20 text-red-400 text-sm text-center rounded-sm"
        >
          {errorMessage || 'Failed to send message. Please try again.'}
        </motion.div>
      )}
    </form>
  );
};
