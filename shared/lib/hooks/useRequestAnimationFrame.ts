'use client';

import { useCallback, useEffect, useRef } from 'react';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type Callback = (...args: any[]) => void;

export function useRequestAnimationFrame<T extends Callback>(callback: T) {
  const rafId = useRef<number | null>(null);
  const callbackRef = useRef(callback);
  callbackRef.current = callback;

  useEffect(() => {
    return () => {
      if (rafId.current) {
        cancelAnimationFrame(rafId.current);
      }
    };
  }, []);

  return useCallback((...args: Parameters<T>) => {
    if (rafId.current == null) {
      rafId.current = requestAnimationFrame(() => {
        callbackRef.current(...args);
        rafId.current = null;
      });
    }
  }, []);
}
