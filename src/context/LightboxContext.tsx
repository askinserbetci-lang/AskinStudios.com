import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Lightbox } from '../components/common/Lightbox';

interface LightboxContextType {
  showImage: (src: string, title: string) => void;
}

const LightboxContext = createContext<LightboxContextType | undefined>(undefined);

export function LightboxProvider({ children }: { children: ReactNode }) {
  const [selectedImage, setSelectedImage] = useState<{ src: string, title: string } | null>(null);

  const showImage = (src: string, title: string) => {
    setSelectedImage({ src, title });
  };

  return (
    <LightboxContext.Provider value={{ showImage }}>
      {children}
      <Lightbox 
        isOpen={!!selectedImage}
        onClose={() => setSelectedImage(null)}
        image={selectedImage?.src || ""}
        title={selectedImage?.title || ""}
      />
    </LightboxContext.Provider>
  );
}

export function useLightbox() {
  const context = useContext(LightboxContext);
  if (context === undefined) {
    throw new Error('useLightbox must be used within a LightboxProvider');
  }
  return context;
}
