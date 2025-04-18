'use client';

/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useRef } from 'react';

type Callback = (...args: any[]) => void;

export function useRequestAnimationFrame<T extends Callback>(callback: T) {
  const rafId = useRef<number | null>(null);

  useEffect(() => {
    return () => {
      if (rafId.current) {
        cancelAnimationFrame(rafId.current);
      }
    };
  }, []);

  // 외부에서 호출될 때 받아지는 args
  return (...args: Parameters<T>) => {
    if (rafId.current == null) {
      rafId.current = requestAnimationFrame((t) => {
        callback(...args);

        rafId.current = null;
      });
    }
  };
}
