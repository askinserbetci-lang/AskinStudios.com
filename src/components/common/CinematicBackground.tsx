import React from 'react';
import { motion } from 'motion/react';

interface CinematicBackgroundProps {
  imageSrc?: string;
  imageAlt?: string;
  opacity?: number;
}

export const CinematicBackground: React.FC<CinematicBackgroundProps> = ({ 
  imageSrc, 
  imageAlt = "Background",
  opacity = 0.12
}) => {
  return (
    <div className="fixed inset-0 w-screen h-screen pointer-events-none overflow-hidden z-0">
      {/* Cinematic Light Accents */}
      <motion.div 
        animate={{ 
          opacity: [0.1, 0.2, 0.1],
          scale: [1, 1.1, 1],
        }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        className="absolute -top-[20%] -left-[10%] w-[60%] h-[60%] bg-gold/5 blur-[120px] rounded-full"
      />
      <motion.div 
        animate={{ 
          opacity: [0.05, 0.15, 0.05],
          scale: [1, 1.2, 1],
        }}
        transition={{ duration: 15, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        className="absolute -bottom-[10%] -right-[10%] w-[50%] h-[50%] bg-gold/5 blur-[100px] rounded-full"
      />

      {/* Background Image */}
      {imageSrc && (
        <div className="absolute inset-0 z-0">
          <motion.div
            initial={{ scale: 1.05, opacity: 0 }}
            animate={{ scale: 1, opacity: opacity }}
            transition={{ duration: 3, ease: "easeOut" }}
            className="w-full h-full"
          >
            <img 
              src={imageSrc} 
              alt={imageAlt} 
              className="w-full h-full object-cover grayscale mix-blend-luminosity opacity-80"
              referrerPolicy="no-referrer"
            />
          </motion.div>
          {/* Uniform overlay to maintain readability without darkening on scroll */}
          <div className="absolute inset-0 bg-midnight/40" />
        </div>
      )}
    </div>
  );
};
