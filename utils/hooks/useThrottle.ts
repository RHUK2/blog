'use client';

/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useRef } from 'react';

type Callback = (...args: any[]) => void;

interface ThrottleOptions {
  leading?: boolean;
  trailing?: boolean;
}

// 해당 훅이 컴포넌트에서 호출될 경우 리렌더링 시 마다 새로운 클로저 환경을 가진 새로운 함수를 반환
// 하지만, useRef를 이용해 값을 유지할 수 있음
// 이전 클로저는 참조가 사라지면서 가비지 컬렉션에 의해 정리되기 때문에 메모리를 낭비하지 않음
export function useThrottle<T extends Callback>(
  callback: T,
  delay: number,
  options: ThrottleOptions = { leading: true, trailing: false },
) {
  const { leading, trailing } = options;
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

  return (...args: Parameters<T>) => {
    if (trailing) {
      lastArgs.current = args;
    }

    if (isReady.current) {
      if (leading) {
        callback(...args);
      }

      isReady.current = false;

      if (timerId.current) {
        clearTimeout(timerId.current);
      }

      timerId.current = setTimeout(() => {
        if (trailing && lastArgs.current) {
          callback(...lastArgs.current);
        }

        isReady.current = true;

        if (trailing) {
          lastArgs.current = null;
        }
      }, delay);
    }
  };
}
