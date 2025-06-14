
import { useEffect, useRef, useState } from 'react';

interface SwipeHandlers {
  onSwipeLeft?: () => void;
  onSwipeRight?: () => void;
  onSwipeUp?: () => void;
  onSwipeDown?: () => void;
}

interface SwipeConfig {
  threshold?: number;
  preventDefaultTouchmoveEvent?: boolean;
  trackMouse?: boolean;
}

export const useSwipeGestures = (
  handlers: SwipeHandlers,
  config: SwipeConfig = {}
) => {
  const {
    threshold = 50,
    preventDefaultTouchmoveEvent = false,
    trackMouse = false
  } = config;

  const touchStart = useRef({ x: 0, y: 0 });
  const touchEnd = useRef({ x: 0, y: 0 });
  const [swiping, setSwiping] = useState(false);

  const handleTouchStart = (e: TouchEvent | MouseEvent) => {
    setSwiping(true);
    const touch = 'touches' in e ? e.touches[0] : e;
    touchStart.current = { x: touch.clientX, y: touch.clientY };
  };

  const handleTouchMove = (e: TouchEvent | MouseEvent) => {
    if (preventDefaultTouchmoveEvent) {
      e.preventDefault();
    }
    const touch = 'touches' in e ? e.touches[0] : e;
    touchEnd.current = { x: touch.clientX, y: touch.clientY };
  };

  const handleTouchEnd = () => {
    if (!swiping) return;
    setSwiping(false);

    const deltaX = touchStart.current.x - touchEnd.current.x;
    const deltaY = touchStart.current.y - touchEnd.current.y;
    const absDeltaX = Math.abs(deltaX);
    const absDeltaY = Math.abs(deltaY);

    // Determine if it's a horizontal or vertical swipe
    if (Math.max(absDeltaX, absDeltaY) < threshold) return;

    if (absDeltaX > absDeltaY) {
      // Horizontal swipe
      if (deltaX > 0 && handlers.onSwipeLeft) {
        handlers.onSwipeLeft();
      } else if (deltaX < 0 && handlers.onSwipeRight) {
        handlers.onSwipeRight();
      }
    } else {
      // Vertical swipe
      if (deltaY > 0 && handlers.onSwipeUp) {
        handlers.onSwipeUp();
      } else if (deltaY < 0 && handlers.onSwipeDown) {
        handlers.onSwipeDown();
      }
    }
  };

  useEffect(() => {
    const element = document.body;

    element.addEventListener('touchstart', handleTouchStart, { passive: true });
    element.addEventListener('touchmove', handleTouchMove, { passive: !preventDefaultTouchmoveEvent });
    element.addEventListener('touchend', handleTouchEnd, { passive: true });

    if (trackMouse) {
      element.addEventListener('mousedown', handleTouchStart);
      element.addEventListener('mousemove', handleTouchMove);
      element.addEventListener('mouseup', handleTouchEnd);
    }

    return () => {
      element.removeEventListener('touchstart', handleTouchStart);
      element.removeEventListener('touchmove', handleTouchMove);
      element.removeEventListener('touchend', handleTouchEnd);

      if (trackMouse) {
        element.removeEventListener('mousedown', handleTouchStart);
        element.removeEventListener('mousemove', handleTouchMove);
        element.removeEventListener('mouseup', handleTouchEnd);
      }
    };
  }, [handlers, threshold, preventDefaultTouchmoveEvent, trackMouse]);

  return { swiping };
};
