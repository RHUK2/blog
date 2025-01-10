import { useMemo } from 'react';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function throttle(handler: (...args: any[]) => any, throttleTime: number = 500) {
  let throttleTimeId: ReturnType<typeof setTimeout>;

  let canRetry = true;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return (...args: any[]) => {
    if (canRetry) {
      handler(...args);

      canRetry = false;

      clearTimeout(throttleTimeId);

      throttleTimeId = setTimeout(() => {
        canRetry = true;
      }, throttleTime);
    }
  };
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function useThrottleCallback<T extends (...args: any[]) => any>(handler: T, throttleTime: number = 500) {
  return useMemo(() => {
    return throttle(handler, throttleTime);
  }, [handler, throttleTime]);
}
