'use client';

/* eslint-disable @typescript-eslint/no-explicit-any */
import { useRef } from 'react';

type Callback = (...args: any[]) => void;

interface DebounceOptions {
  leading?: boolean;
  trailing?: boolean;
}

export function useDebounce<T extends Callback>(
  callback: T,
  delay: number,
  options: DebounceOptions = { leading: true, trailing: false },
) {
  const { leading, trailing } = options;
  const timerId = useRef<ReturnType<typeof setTimeout>>();
  const isReady = useRef(true);
  // settimeout으로 실행될 때 받는 args
  const lastArgs = useRef<Parameters<T>>();

  // 외부에서 호출될 때 받아지는 args
  return (...args: Parameters<T>) => {
    lastArgs.current = args;

    if (timerId.current) {
      clearTimeout(timerId.current);
    }

    if (leading && isReady.current) {
      callback(...args);
    }

    isReady.current = false;

    timerId.current = setTimeout(() => {
      if (trailing && lastArgs.current) {
        callback(...lastArgs.current);
      }
      isReady.current = true;
    }, delay);
  };
}
