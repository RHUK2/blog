import { useMemo } from 'react';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function debounce(handler: (...args: any[]) => any, debounceTime: number = 500) {
  let debounceTimeId: ReturnType<typeof setTimeout>;

  let canRetry = true;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return (...args: any[]) => {
    if (debounceTimeId) {
      clearTimeout(debounceTimeId);
    }

    if (canRetry) {
      handler(...args);
    }

    canRetry = false;

    debounceTimeId = setTimeout(() => {
      canRetry = true;
    }, debounceTime);
  };
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function useDebounceCallback<T extends (...args: any[]) => any>(handler: T, debounceTime: number = 500) {
  return useMemo(() => {
    return debounce(handler, debounceTime);
  }, [handler, debounceTime]);
}
