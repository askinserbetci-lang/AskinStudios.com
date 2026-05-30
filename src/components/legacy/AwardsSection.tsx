import React from 'react';
import { AwardItem } from '../../types/media';
import { useLightbox } from '../../context/LightboxContext';

export function AwardsSection({ awards }: { awards: AwardItem[] }) {
  const { showImage } = useLightbox();

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
      {awards.map(award => (
        <div
          key={award.id}
          className="bg-neutral-900 p-6 rounded-xl shadow-xl hover:shadow-2xl transition-shadow group"
        >
          {award.image && (
            <div 
              className="relative cursor-zoom-in overflow-hidden rounded-lg mb-4"
              onClick={() => showImage(award.image!, award.title)}
            >
              <img
                src={award.image}
                alt={award.title}
                className="object-contain w-full h-48 bg-black/40 group-hover:scale-105 transition-transform duration-500"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = `https://picsum.photos/seed/${award.id}/400/400?grayscale`;
                }}
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-500 flex items-center justify-center opacity-0 group-hover:opacity-100">
                <span className="text-white/50 text-[10px] uppercase tracking-widest border border-white/20 px-3 py-1 rounded-full backdrop-blur-sm">View Larger</span>
              </div>
            </div>
          )}

          <h3 className="text-xl font-light text-white">{award.title}</h3>

          <p className="mt-1 text-sm text-[#e6c15a]">
            {award.organization} • {award.year}
          </p>

          <p className="mt-3 text-neutral-400 leading-relaxed">
            {award.description}
          </p>
        </div>
      ))}
    </div>
  );
}
