import React from 'react';
import { LegacyEvent } from '../../types/legacy';
import { useLightbox } from '../../context/LightboxContext';

export function TimelineSection({ events }: { events: LegacyEvent[] }) {
  const { showImage } = useLightbox();
  const sorted = [...events].sort((a, b) => a.year - b.year);

  return (
    <div className="relative ml-4 border-l border-neutral-700 pl-8">
      {sorted.map(event => (
        <div key={event.id} className="mb-12 relative">
          <div className="absolute -left-[38px] top-1 h-3 w-3 rounded-full bg-[#e6c15a] shadow-lg" />

          <span className="text-[#e6c15a] font-medium">{event.year}</span>

          <h3 className="mt-2 text-xl font-light text-white">
            {event.title}
          </h3>

          <p className="mt-2 text-neutral-400 leading-relaxed max-w-2xl">
            {event.description}
          </p>

          {event.image && (
            <div 
              className="mt-6 max-w-xl cursor-zoom-in group relative overflow-hidden rounded-lg"
              onClick={() => showImage(event.image!, event.title)}
            >
              <img 
                src={event.image} 
                alt={event.title} 
                className="shadow-xl border border-white/10 w-full object-contain max-h-96 bg-black/40 group-hover:scale-105 transition-transform duration-700"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = `https://picsum.photos/seed/${event.id}/800/600?grayscale`;
                }}
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-500 flex items-center justify-center opacity-0 group-hover:opacity-100">
                <span className="text-white/50 text-[10px] uppercase tracking-widest border border-white/20 px-3 py-1 rounded-full backdrop-blur-sm">View Larger</span>
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
