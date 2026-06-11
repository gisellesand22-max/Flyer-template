export interface CarouselSlide {
  id: number;
  imageUrl: string;
  alt: string;
  title: string;
  description: string;
}

export const carouselSlides: CarouselSlide[] = [
  {
    id: 1,
    imageUrl: 'https://picsum.photos/seed/slide1/1200/600',
    alt: 'Mountain landscape at sunrise',
    title: 'Explore the Mountains',
    description: 'Breathtaking views at every turn',
  },
  {
    id: 2,
    imageUrl: 'https://picsum.photos/seed/slide2/1200/600',
    alt: 'Tropical beach with turquoise water',
    title: 'Discover the Ocean',
    description: 'Relax on pristine white sand beaches',
  },
  {
    id: 3,
    imageUrl: 'https://picsum.photos/seed/slide3/1200/600',
    alt: 'Dense forest path in autumn',
    title: 'Into the Forest',
    description: 'Find peace among ancient trees',
  },
  {
    id: 4,
    imageUrl: 'https://picsum.photos/seed/slide4/1200/600',
    alt: 'City skyline at night',
    title: 'City Lights',
    description: 'The energy of a thousand stories',
  },
];
