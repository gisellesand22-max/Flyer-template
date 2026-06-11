import React from 'react';

interface CarouselDotsProps {
  readonly total: number;
  readonly current: number;
  readonly onSelect: (index: number) => void;
}

export const CarouselDots: React.FC<CarouselDotsProps> = ({ total, current, onSelect }) => (
  <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 flex gap-2">
    {Array.from({ length: total }).map((_, i) => (
      <button
        key={i}
        onClick={() => onSelect(i)}
        aria-label={`Go to slide ${i + 1}`}
        className={`rounded-full transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-white
          ${current === i ? 'w-6 h-2.5 bg-white' : 'w-2.5 h-2.5 bg-white/50 hover:bg-white/75'}`}
      />
    ))}
  </div>
);

export default CarouselDots;
