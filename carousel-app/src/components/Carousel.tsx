import React from 'react';
import { carouselSlides } from '../data/mockData';
import { useCarousel } from '../hooks/useCarousel';
import { CarouselSlide } from './CarouselSlide';
import { CarouselArrow } from './CarouselArrow';
import { CarouselDots } from './CarouselDots';

interface CarouselProps {
  readonly autoPlayInterval?: number;
  readonly className?: string;
}

export const Carousel: React.FC<CarouselProps> = ({
  autoPlayInterval = 4000,
  className = '',
}) => {
  const { current, prev, next, goTo } = useCarousel({
    total: carouselSlides.length,
    autoPlayInterval,
  });

  return (
    <div
      className={`relative w-full overflow-hidden rounded-2xl shadow-xl ${className}`}
      style={{ aspectRatio: '2 / 1' }}
      role="region"
      aria-label="Image carousel"
    >
      {carouselSlides.map((slide, i) => (
        <CarouselSlide key={slide.id} slide={slide} isActive={i === current} />
      ))}

      <CarouselArrow direction="prev" onClick={prev} />
      <CarouselArrow direction="next" onClick={next} />
      <CarouselDots total={carouselSlides.length} current={current} onSelect={goTo} />
    </div>
  );
};

export default Carousel;
