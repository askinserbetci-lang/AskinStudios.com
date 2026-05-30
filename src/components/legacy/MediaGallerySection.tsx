import React from 'react';
import { MediaItem } from '../../types/media';
import { useLightbox } from '../../context/LightboxContext';

export function MediaGallerySection({ items }: { items: MediaItem[] }) {
  const { showImage } = useLightbox();

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
      {items.map(item => (
        <div
          key={item.id}
          className="group bg-neutral-900 rounded-xl overflow-hidden shadow-xl hover:shadow-2xl transition-all cursor-zoom-in"
          onClick={() => showImage(item.image, item.title)}
        >
          <div className="relative overflow-hidden">
            <img
              src={item.image}
              alt={item.title}
              className="w-full h-56 object-cover group-hover:scale-105 transition-transform duration-700"
              onError={(e) => {
                (e.target as HTMLImageElement).src = `https://picsum.photos/seed/${item.id}/800/800?grayscale`;
              }}
            />
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-500 flex items-center justify-center opacity-0 group-hover:opacity-100">
              <span className="text-white/50 text-[10px] uppercase tracking-widest border border-white/20 px-3 py-1 rounded-full backdrop-blur-sm">View Larger</span>
            </div>
          </div>

          <div className="p-6">
            <h4 className="text-lg font-light text-white">{item.title}</h4>

            {item.year && (
              <p className="text-sm text-[#e6c15a] mt-1">{item.year}</p>
            )}

            <p className="mt-3 text-neutral-400 leading-relaxed">
              {item.description}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}
