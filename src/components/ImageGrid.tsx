import React from 'react';
import type { MemeTemplate } from '../services/imageService';

interface ImageGridProps {
  images: MemeTemplate[];
  selectedImage: string;
  onSelect: (imageUrl: string) => void;
}

export const ImageGrid: React.FC<ImageGridProps> = ({
  images,
  selectedImage,
  onSelect,
}) => {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 mt-8">
      {images.map((meme) => (
        <button
          key={meme.id}
          onClick={() => onSelect(meme.url)}
          className={`relative aspect-square rounded-xl overflow-hidden transition-all duration-200 hover:scale-105 ${
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
            loading="lazy"
          />
        </button>
      ))}
    </div>
  );
}; 