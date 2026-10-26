import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X, Instagram, Youtube, Facebook } from 'lucide-react';
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import { cn } from './lib/utils';
import { useFollow } from './lib/aiq';
import Home from './pages/Home';
import About from './pages/About';
import Music from './pages/Music';
import Anthem from './pages/Anthem';
import Videos from './pages/Videos';
import Services from './pages/Services';
import Legacy from './pages/Legacy';
import Contact from './pages/Contact';
import PressKit from './pages/PressKit';
import EPK from './pages/EPK';
import DownloadEPK from './pages/DownloadEPK';
import FestivalEPK from './pages/FestivalEPK';
import BookingPage from './pages/Booking';
import Listen from './pages/Listen';
import CustomCursor from './components/CustomCursor';
import MobileNavbar from './components/MobileNavbar';
import { FanSignup, FanPopup } from './components/FanSignup';
import { LightboxProvider } from './context/LightboxContext';
import { FeaturedReleasePanel } from './components/FeaturedReleasePanel';

const Navbar = () => {
  const location = useLocation();

  const navLinks = [
    { name: 'HOME', href: '/' },
    { name: 'ABOUT', href: '/about' },
    { name: 'MUSIC', href: '/music' },
    { name: 'ANTHEM', href: '/anthem' },
    { name: 'VIDEOS', href: '/videos' },
    { name: 'SERVICES', href: '/services' },
    { name: 'LEGACY', href: '/legacy' },
    { name: 'PRESS', href: '/press' },
    { name: 'EPK', href: '/epk' },
    { name: 'BOOKING', href: '/booking' },
    { name: 'CONTACT', href: '/contact' },
  ];

  return (
    <header className="fixed top-0 left-0 lg:left-[420px] lg:w-[calc(100%-420px)] z-50 w-full flex items-center justify-between px-8 py-7 bg-transparent transition-all duration-300">
      <div className="flex flex-col leading-tight opacity-100 transition-opacity shrink-0 mr-8">
        <span className="text-white text-sm md:text-base font-bold tracking-widest uppercase whitespace-nowrap">
          Aşkın Şerbetçi
        </span>
        <span className="text-[#F2D37D] text-[9px] md:text-[10px] tracking-[0.2em] uppercase mt-0.5 font-medium">
          Music for the Soul
        </span>
      </div>

      <nav className="hidden md:flex items-center flex-wrap justify-end gap-x-5 xl:gap-x-8 gap-y-1 text-white">
        {navLinks.map((link) => (
          <Link
            key={link.name}
            to={link.href}
            className={cn(
              "text-[10px] uppercase tracking-[0.25em] xl:tracking-[0.3em] hover:text-gold transition-all duration-500 relative py-2 whitespace-nowrap",
              location.pathname === link.href ? "text-gold" : "text-white"
            )}
          >
            {link.name}
            {location.pathname === link.href && (
              <motion.div 
                layoutId="nav-underline"
                className="absolute bottom-0 left-0 w-full h-[1px] bg-gold/50"
                transition={{ type: "spring", stiffness: 380, damping: 30 }}
              />
            )}
          </Link>
        ))}
      </nav>
    </header>
  );
};

const Footer = () => {
  const follow = useFollow();
  const link = (name: string) => follow.find(f => f.name === name)?.url || '#';
  return (
    <footer className="w-full flex flex-col items-center justify-center py-16 mt-40 border-t border-white/5 lg:pl-[420px] transition-all duration-300">
      {useLocation().pathname !== '/' && <FanSignup compact />}
      <span className="text-white text-2xl md:text-3xl font-semibold tracking-wide">
        Aşkın Şerbetçi
      </span>
      <span className="text-gold text-base md:text-lg tracking-normal mt-1 mb-8">
        Music for the Soul
      </span>
      
      <div className="flex gap-8 text-[10px] uppercase tracking-widest text-paper/40">
        <Link to="/epk" className="hover:text-gold transition-colors">EPK</Link>
        <Link to="/download-epk" className="hover:text-gold transition-colors">Download Assets</Link>
        <Link to="/press" className="hover:text-gold transition-colors">Press</Link>
        <Link to="/contact" className="hover:text-gold transition-colors">Contact</Link>
      </div>

      <div className="flex gap-6 mt-8 text-paper/40">
        <a href={link('YouTube')} target="_blank" rel="noopener noreferrer" className="hover:text-gold transition-colors" aria-label="YouTube">
          <Youtube size={20} strokeWidth={1.5} />
        </a>
        <a href={link('Instagram')} target="_blank" rel="noopener noreferrer" className="hover:text-gold transition-colors" aria-label="Instagram">
          <Instagram size={20} strokeWidth={1.5} />
        </a>
        <a href={link('Facebook')} target="_blank" rel="noopener noreferrer" className="hover:text-gold transition-colors" aria-label="Facebook">
          <Facebook size={20} strokeWidth={1.5} />
        </a>
      </div>
      
      <p className="mt-8 text-[10px] md:text-xs uppercase tracking-[0.2em] text-gold/70 font-medium">
        askinstudios.com
      </p>
      
      <p className="mt-8 text-[9px] uppercase tracking-[0.3em] text-paper/20">
        &copy; {new Date().getFullYear()} Aşkın Şerbetçi. All Rights Reserved.
      </p>
    </footer>
  );
};

const PageTransition = ({ children }: { children: React.ReactNode }) => (
  <motion.div
    initial={{ opacity: 0, filter: "blur(5px)" }}
    animate={{ opacity: 1, filter: "blur(0px)" }}
    exit={{ opacity: 0, filter: "blur(5px)" }}
    transition={{ duration: 0.5, ease: "easeInOut" }}
    className="w-full"
  >
    {children}
  </motion.div>
);

const AnimatedRoutes = () => {
  const location = useLocation();
  
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<PageTransition><Home /></PageTransition>} />
        <Route path="/about" element={<PageTransition><About /></PageTransition>} />
        <Route path="/music" element={<PageTransition><Music /></PageTransition>} />
        <Route path="/music/:slug" element={<PageTransition><Music /></PageTransition>} />
        <Route path="/anthem" element={<PageTransition><Anthem /></PageTransition>} />
        <Route path="/videos" element={<PageTransition><Videos /></PageTransition>} />
        <Route path="/services" element={<PageTransition><Services /></PageTransition>} />
        <Route path="/legacy" element={<PageTransition><Legacy /></PageTransition>} />
        <Route path="/press" element={<PageTransition><PressKit /></PageTransition>} />
        <Route path="/epk" element={<PageTransition><EPK /></PageTransition>} />
        <Route path="/download-epk" element={<PageTransition><DownloadEPK /></PageTransition>} />
        <Route path="/epk-festival" element={<PageTransition><FestivalEPK /></PageTransition>} />
        <Route path="/booking" element={<PageTransition><BookingPage /></PageTransition>} />
        <Route path="/contact" element={<PageTransition><Contact /></PageTransition>} />
      </Routes>
    </AnimatePresence>
  );
};

// The ad landing page stands alone: no side panel or menu between the viewer and the music
const Shell: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const location = useLocation();
  if (location.pathname.startsWith('/listen')) return <Listen />;
  return <>{children}</>;
};

function App() {
  return (
    <Router>
      <Shell>
      <LightboxProvider>
        <div className="min-h-screen bg-transparent text-paper font-sans selection:bg-gold/30 selection:text-gold relative">
          <FeaturedReleasePanel />
          <CustomCursor />
          <Navbar />
          <MobileNavbar />
          <main className="relative z-10 lg:pl-[420px] transition-all duration-300">
            <AnimatedRoutes />
          </main>
          <Footer />
          <FanPopup />
        </div>
      </LightboxProvider>
      </Shell>
    </Router>
  );
}

export default App;
