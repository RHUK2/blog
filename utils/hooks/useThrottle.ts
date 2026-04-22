'use client';

import { useCallback, useEffect, useRef } from 'react';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type Callback = (...args: any[]) => void;

interface ThrottleOptions {
  leading?: boolean;
  trailing?: boolean;
}

export function useThrottle<T extends Callback>(
  callback: T,
  delay: number,
  options: ThrottleOptions = { leading: true, trailing: false },
) {
  const callbackRef = useRef(callback);
  callbackRef.current = callback;
  const delayRef = useRef(delay);
  delayRef.current = delay;
  const leadingRef = useRef(options.leading ?? true);
  leadingRef.current = options.leading ?? true;
  const trailingRef = useRef(options.trailing ?? false);
  trailingRef.current = options.trailing ?? false;

  const timerId = useRef<ReturnType<typeof setTimeout>>(null);
  const isReady = useRef(true);
  const lastArgs = useRef<Parameters<T>>(null);

  useEffect(() => {
    return () => {
      if (timerId.current) {
        clearTimeout(timerId.current);
      }
    };
  }, []);

  return useCallback((...args: Parameters<T>) => {
    if (trailingRef.current) {
      lastArgs.current = args;
    }

    if (isReady.current) {
      if (leadingRef.current) {
        callbackRef.current(...args);
      }

      isReady.current = false;

      if (timerId.current) {
        clearTimeout(timerId.current);
      }

      timerId.current = setTimeout(() => {
        if (trailingRef.current && lastArgs.current) {
          callbackRef.current(...lastArgs.current);
        }

        isReady.current = true;

        if (trailingRef.current) {
          lastArgs.current = null;
        }
      }, delayRef.current);
    }
  }, []);
}
