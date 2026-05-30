import React from 'react';
import { motion } from 'motion/react';
import { Helmet } from 'react-helmet-async';
import { ContactForm } from '../components/ContactForm';
import { contactPageSEO } from '../data/seo/pages/contact.seo';

import { CinematicBackground } from '../components/common/CinematicBackground';

const Contact = () => {
  return (
    <div className="bg-transparent min-h-screen text-paper relative">
      <Helmet>
        <title>{contactPageSEO.title}</title>
        <meta name="description" content={contactPageSEO.description} />
        <meta property="og:title" content={contactPageSEO.ogTitle} />
        <meta property="og:description" content={contactPageSEO.ogDescription} />
        <meta property="og:image" content={contactPageSEO.ogImage} />
        <meta property="og:type" content="website" />
      </Helmet>

      <CinematicBackground imageSrc="/Turkiye_Grammy_2013.jpg" imageAlt="Contact Background" />

      {/* Hero Section */}
      <section className="page-hero">
        <div className="absolute inset-0 pointer-events-none"
             style={{
               background: "radial-gradient(circle at 50% 80%, rgba(40,80,90,0.15), transparent 70%)"
             }}
        />
        <div className="max-w-5xl mx-auto text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
          >
            <h1 className="text-5xl md:text-8xl font-serif italic mb-6 leading-tight">Contact</h1>
            <span className="text-gold uppercase tracking-[0.3em] text-[10px] md:text-xs mb-10 block leading-relaxed font-medium">
              Get in Touch
            </span>
            <p className="text-paper/60 font-light text-lg md:text-2xl leading-relaxed max-w-3xl mx-auto">
              Connect with Aşkın Studios for inquiries, collaborations, and press.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Contact Directory */}
      <section className="px-6 pb-48">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
            className="grid md:grid-cols-2 gap-8 md:gap-16"
          >
            {/* General Contact */}
            <div className="bg-white/5 border border-white/10 p-10 rounded-sm hover:border-gold/30 transition-colors duration-500 text-center">
              <h2 className="text-2xl font-serif italic text-white mb-4">General Contact</h2>
              <p className="text-paper/60 font-light text-sm mb-6">For all general inquiries</p>
              <a href="mailto:info@askinstudios.com" className="text-gold hover:text-white transition-colors text-lg md:text-xl font-medium">
                info@askinstudios.com
              </a>
            </div>

            {/* Booking */}
            <div className="bg-white/5 border border-white/10 p-10 rounded-sm hover:border-gold/30 transition-colors duration-500 text-center">
              <h2 className="text-2xl font-serif italic text-white mb-4">Booking</h2>
              <p className="text-paper/60 font-light text-sm mb-6">For performance & production</p>
              <a href="mailto:booking@askinstudios.com" className="text-gold hover:text-white transition-colors text-lg md:text-xl font-medium">
                booking@askinstudios.com
              </a>
            </div>

            {/* Press */}
            <div className="bg-white/5 border border-white/10 p-10 rounded-sm hover:border-gold/30 transition-colors duration-500 text-center">
              <h2 className="text-2xl font-serif italic text-white mb-4">Press</h2>
              <p className="text-paper/60 font-light text-sm mb-6">For interviews & media features</p>
              <a href="mailto:info@askinstudios.com" className="text-gold hover:text-white transition-colors text-lg md:text-xl font-medium">
                info@askinstudios.com
              </a>
            </div>

            {/* Social Media */}
            <div className="bg-white/5 border border-white/10 p-10 rounded-sm hover:border-gold/30 transition-colors duration-500 text-center">
              <h2 className="text-2xl font-serif italic text-white mb-4">Social Media</h2>
              <p className="text-paper/60 font-light text-sm mb-6">Follow for updates & behind the scenes</p>
              <div className="flex justify-center gap-6">
                <a href="https://www.youtube.com/@askinserbetci" target="_blank" rel="noopener noreferrer" className="text-gold hover:text-white transition-colors">
                  YouTube
                </a>
                <a href="https://www.instagram.com/askinserbetci/" target="_blank" rel="noopener noreferrer" className="text-gold hover:text-white transition-colors">
                  Instagram
                </a>
                <a href="https://www.facebook.com/askinstudios" target="_blank" rel="noopener noreferrer" className="text-gold hover:text-white transition-colors">
                  Facebook
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Contact Form Section */}
      <section className="px-6 pb-48">
        <div className="max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
            className="bg-white/5 border border-white/10 p-8 md:p-12 rounded-sm"
          >
            <h2 className="text-3xl font-serif italic text-white mb-8 text-center">Send a Message</h2>
            <ContactForm />
          </motion.div>
        </div>
      </section>

    </div>
  );
};

export default Contact;
