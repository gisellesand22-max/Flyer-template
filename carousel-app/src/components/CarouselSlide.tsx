import React from 'react';
import type { CarouselSlide as SlideData } from '../data/mockData';

interface CarouselSlideProps {
  readonly slide: SlideData;
  readonly isActive: boolean;
}

export const CarouselSlide: React.FC<CarouselSlideProps> = ({ slide, isActive }) => (
  <div
    className={`absolute inset-0 transition-opacity duration-700 ${
      isActive ? 'opacity-100 z-10' : 'opacity-0 z-0'
    }`}
    aria-hidden={!isActive}
  >
    <img
      src={slide.imageUrl}
      alt={slide.alt}
      className="w-full h-full object-cover"
      loading="lazy"
    />
    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
    <div className="absolute bottom-12 left-8 text-white">
      <h2 className="text-3xl font-bold drop-shadow-lg">{slide.title}</h2>
      <p className="mt-1 text-lg text-white/80">{slide.description}</p>
    </div>
  </div>
);

export default CarouselSlide;
