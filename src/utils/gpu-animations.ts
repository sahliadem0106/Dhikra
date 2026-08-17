import { useRef, useCallback, useEffect, type CSSProperties } from 'react';

/** GPU-composited CSS — only transform and opacity avoid layout thrashing */
export const GPU_CSS: CSSProperties = {
  willChange: 'transform, opacity',
  transform: 'translateZ(0)',
  backfaceVisibility: 'hidden',
};

/** requestAnimationFrame-throttled scroll handler for 60fps scrolling */
export function useRafScroll(handler: (y: number) => void, deps: unknown[] = []) {
  const rafId = useRef<number>(0);
  const savedHandler = useRef(handler);
  savedHandler.current = handler;
  return useCallback(() => {
    if (rafId.current) return;
    rafId.current = requestAnimationFrame(() => {
      rafId.current = 0;
      savedHandler.current(window.scrollY);
    });
  }, deps);
}

/** Skips off-screen rendering for children in this container */
export function useContentVisibility(containerRef: React.RefObject<HTMLElement | null>) {
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    el.querySelectorAll(':scope > *').forEach(child => {
      if (child instanceof HTMLElement) {
        child.style.contentVisibility = 'auto';
        child.style.containIntrinsicSize = '100px';
      }
    });
  }, [containerRef]);
}
