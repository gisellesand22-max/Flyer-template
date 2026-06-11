import { useState, useCallback, useEffect, useRef } from 'react';

interface UseCarouselOptions {
  readonly total: number;
  readonly autoPlayInterval?: number;
}

export function useCarousel({ total, autoPlayInterval = 0 }: UseCarouselOptions) {
  const [current, setCurrent] = useState(0);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const goTo = useCallback((index: number) => {
    setCurrent((index + total) % total);
  }, [total]);

  const prev = useCallback(() => goTo(current - 1), [current, goTo]);
  const next = useCallback(() => goTo(current + 1), [current, goTo]);

  useEffect(() => {
    if (!autoPlayInterval) return;
    timerRef.current = setInterval(next, autoPlayInterval);
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [next, autoPlayInterval]);

  return { current, prev, next, goTo };
}
