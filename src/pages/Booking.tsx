import React, { useState } from "react";
import { motion } from "motion/react";
import { Helmet } from "react-helmet-async";
import { bookingPageSEO } from "../data/seo/pages/booking.seo";
import { sendBookingEmail } from "../lib/email/sendBookingEmail";

import { CinematicBackground } from '../components/common/CinematicBackground';

export default function BookingPage() {
  const [form, setForm] = useState<any>({});
  const [status, setStatus] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) {
    setForm({ ...form, [e.target.name]: e.target.value });
    if (error) setError(null);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setIsSubmitting(true);

    try {
      // Basic validation (can be enhanced with Zod schema matching new fields)
      if (!form.name || !form.email || !form.message) {
        setError("Please fill in all required fields.");
        setIsSubmitting(false);
        return;
      }

      await sendBookingEmail(form); // Ensure backend handles new fields or generic object
      setStatus("Your inquiry has been sent. We will respond within 24–48 hours.");
    } catch (err) {
      console.error("Error submitting form:", err);
      setError("An unexpected error occurred. Please try again later.");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="bg-transparent min-h-screen text-paper relative">
      <Helmet>
        <title>{bookingPageSEO.title}</title>
        <meta name="description" content={bookingPageSEO.description} />
        <meta property="og:title" content={bookingPageSEO.ogTitle} />
        <meta property="og:description" content={bookingPageSEO.ogDescription} />
        <meta property="og:image" content={bookingPageSEO.ogImage} />
        <meta property="og:type" content="website" />
      </Helmet>

      <CinematicBackground imageSrc="/Turkiye_Grammy_2013.jpg" imageAlt="Booking Background" />

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
            <h1 className="text-5xl md:text-8xl font-serif italic mb-6 leading-tight">Booking</h1>
            <span className="text-gold uppercase tracking-[0.3em] text-[10px] md:text-xs mb-10 block leading-relaxed font-medium">
              Performance • Production • Collaboration
            </span>
            <p className="text-paper/60 font-light text-lg md:text-2xl leading-relaxed max-w-3xl mx-auto">
              A streamlined booking system for performances, production work, collaborations, and events.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Booking Categories */}
      <section className="px-6 mb-32">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { title: "Live Performance", desc: "Solo, ensemble, or full world‑fusion band for concerts and events." },
              { title: "Studio Production", desc: "Recording, mixing, and production services at Aşkın Studios." },
              { title: "Composition", desc: "Original scoring for film, documentary, and visual media." },
              { title: "Workshops", desc: "Masterclasses on Turkish tradition and East–West fusion." },
              { title: "Cultural Events", desc: "Ceremonial and diplomatic event performances." },
              { title: "Collaboration", desc: "Artistic partnership and co-writing opportunities." }
            ].map((cat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ delay: i * 0.1, duration: 1, ease: [0.22, 1, 0.36, 1] }}
                className="border border-white/10 p-8 md:p-10 rounded-sm hover:border-gold/30 transition-colors duration-500 bg-white/5"
              >
                <h3 className="text-xl font-serif italic text-gold mb-4">{cat.title}</h3>
                <p className="text-paper/60 font-light text-base leading-relaxed">
                  {cat.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Booking Form */}
      <section className="px-6 pb-48">
        <div className="max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
            className="border border-white/10 p-8 md:p-16 rounded-sm shadow-2xl shadow-midnight/50 bg-black/40 backdrop-blur-sm"
          >
            {status ? (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8 }}
                className="text-center py-12"
              >
                <h2 className="text-3xl font-serif italic mb-6 text-gold">Inquiry Received</h2>
                <p className="text-paper/60 font-light text-lg leading-relaxed max-w-xl mx-auto">
                  {status}
                </p>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-8">
                <div className="grid md:grid-cols-2 gap-8">
                  <div className="space-y-2">
                    <label className="text-[10px] uppercase tracking-widest text-paper/40">Name *</label>
                    <input required name="name" type="text" onChange={handleChange} className="w-full bg-transparent border-b border-white/20 px-0 py-3 text-sm text-paper focus:outline-none focus:border-gold transition-colors" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] uppercase tracking-widest text-paper/40">Email *</label>
                    <input required name="email" type="email" onChange={handleChange} className="w-full bg-transparent border-b border-white/20 px-0 py-3 text-sm text-paper focus:outline-none focus:border-gold transition-colors" />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-8">
                  <div className="space-y-2">
                    <label className="text-[10px] uppercase tracking-widest text-paper/40">Phone</label>
                    <input name="phone" type="tel" onChange={handleChange} className="w-full bg-transparent border-b border-white/20 px-0 py-3 text-sm text-paper focus:outline-none focus:border-gold transition-colors" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] uppercase tracking-widest text-paper/40">Event Type *</label>
                    <select required name="eventType" onChange={handleChange} className="w-full bg-transparent border-b border-white/20 px-0 py-3 text-sm text-paper focus:outline-none focus:border-gold transition-colors appearance-none">
                      <option value="" disabled selected className="bg-midnight text-paper/40">Select Event Type</option>
                      <option value="performance" className="bg-midnight">Live Performance</option>
                      <option value="production" className="bg-midnight">Studio Production</option>
                      <option value="composition" className="bg-midnight">Composition / Scoring</option>
                      <option value="workshop" className="bg-midnight">Workshop / Masterclass</option>
                      <option value="cultural" className="bg-midnight">Cultural Event</option>
                      <option value="other" className="bg-midnight">Other</option>
                    </select>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-8">
                  <div className="space-y-2">
                    <label className="text-[10px] uppercase tracking-widest text-paper/40">Date & Location</label>
                    <input name="dateLocation" type="text" placeholder="e.g. Oct 15, 2024 - New York, NY" onChange={handleChange} className="w-full bg-transparent border-b border-white/20 px-0 py-3 text-sm text-paper focus:outline-none focus:border-gold transition-colors placeholder:text-paper/20" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] uppercase tracking-widest text-paper/40">Budget Range</label>
                    <select name="budget" onChange={handleChange} className="w-full bg-transparent border-b border-white/20 px-0 py-3 text-sm text-paper focus:outline-none focus:border-gold transition-colors appearance-none">
                      <option value="" disabled selected className="bg-midnight text-paper/40">Select Budget Range</option>
                      <option value="under-1k" className="bg-midnight">Under $1,000</option>
                      <option value="1k-5k" className="bg-midnight">$1,000 – $5,000</option>
                      <option value="5k-10k" className="bg-midnight">$5,000 – $10,000</option>
                      <option value="10k-plus" className="bg-midnight">$10,000+</option>
                      <option value="flexible" className="bg-midnight">Flexible / To Be Discussed</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] uppercase tracking-widest text-paper/40">Message / Project Details *</label>
                  <textarea required name="message" rows={4} placeholder="Tell us about your event or project" onChange={handleChange} className="w-full bg-transparent border-b border-white/20 px-0 py-3 text-sm text-paper focus:outline-none focus:border-gold transition-colors resize-none"></textarea>
                </div>

                <div className="pt-8">
                  {error && (
                    <div className="mb-6 p-4 border border-red-500/30 bg-red-500/10 text-red-200 text-sm rounded-sm">
                      {error}
                    </div>
                  )}
                  <button 
                    type="submit" 
                    disabled={isSubmitting}
                    className="w-full py-5 bg-gold text-ink font-medium uppercase tracking-widest text-[10px] hover:bg-white transition-all duration-500 rounded-sm disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? 'Sending...' : 'Send Inquiry'}
                  </button>
                  <p className="text-center text-paper/40 text-[10px] uppercase tracking-widest mt-6">
                    All inquiries receive a response within 24–48 hours.
                  </p>
                </div>
              </form>
            )}
          </motion.div>
        </div>
      </section>
    </div>
  );
}
