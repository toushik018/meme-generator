import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import type { MemeTemplate } from '../services/imageService';

interface ImageCarouselProps {
  images: MemeTemplate[];
  selectedImage: string;
  onSelect: (imageUrl: string) => void;
  label: string;
}

export const ImageCarousel: React.FC<ImageCarouselProps> = ({
  images,
  selectedImage,
  onSelect,
  label
}) => {
  const scrollRef = React.useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const scrollAmount = direction === 'left' ? -200 : 200;
      scrollRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  return (
    <div className="relative">
      <div className="flex items-center justify-between mb-4">
        <span className="text-white font-medium text-lg">{label}</span>
      </div>
      <div className="relative group">
        <button
          onClick={() => scroll('left')}
          className="absolute -left-3 top-1/2 -translate-y-1/2 z-10 bg-gray-700 hover:bg-gray-600 p-2 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-200 shadow-lg"
        >
          <ChevronLeft className="w-5 h-5 text-white" />
        </button>
        <div
          ref={scrollRef}
          className="flex gap-3 overflow-x-auto scrollbar-hide scroll-smooth pb-4"
        >
          {images.map((meme) => (
            <button
              key={meme.id}
              onClick={() => onSelect(meme.url)}
              className={`relative flex-shrink-0 w-28 h-28 rounded-xl overflow-hidden transition-all duration-200 hover:scale-105 ${
                selectedImage === meme.url 
                  ? 'ring-2 ring-blue-500 shadow-lg shadow-blue-500/20' 
                  : 'hover:ring-2 hover:ring-gray-400'
              }`}
              title={meme.name}
            >
              <img
                src={meme.url}
                alt={meme.name}
                className="w-full h-full object-cover"
              />
            </button>
          ))}
        </div>
        <button
          onClick={() => scroll('right')}
          className="absolute -right-3 top-1/2 -translate-y-1/2 z-10 bg-gray-700 hover:bg-gray-600 p-2 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-200 shadow-lg"
        >
          <ChevronRight className="w-5 h-5 text-white" />
        </button>
      </div>
    </div>
  );
}; 