import React from 'react';

interface CarouselArrowProps {
  readonly direction: 'prev' | 'next';
  readonly onClick: () => void;
}

export const CarouselArrow: React.FC<CarouselArrowProps> = ({ direction, onClick }) => {
  const isPrev = direction === 'prev';
  return (
    <button
      onClick={onClick}
      aria-label={isPrev ? 'Previous slide' : 'Next slide'}
      className={`absolute top-1/2 -translate-y-1/2 z-20 flex items-center justify-center
        w-11 h-11 rounded-full bg-white/20 hover:bg-white/40 backdrop-blur-sm
        text-white transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-white
        ${isPrev ? 'left-4' : 'right-4'}`}
    >
      <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d={isPrev ? 'M15 19l-7-7 7-7' : 'M9 5l7 7-7 7'}
        />
      </svg>
    </button>
  );
};

export default CarouselArrow;
