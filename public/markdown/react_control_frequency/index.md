---
folderName: react_control_frequency
title: 이벤트 호출 주기 제어
tag: react
isPublished: true
---

# 이벤트 호출 주기 제어

- [쓰로틀링(Throttling)](#쓰로틀링throttling)
  - [구현 예시](#구현-예시)
- [디바운싱(Debouncing)](#디바운싱debouncing)
  - [구현 예시](#구현-예시-1)
- [RequestAnimationFrame(rAF)](#requestanimationframeraf)
  - [구현 예시](#구현-예시-2)
- [안정적인 참조와 최신 콜백 유지](#안정적인-참조와-최신-콜백-유지)
  - [문제 1: 반환 함수의 참조 불안정](#문제-1-반환-함수의-참조-불안정)
  - [문제 2: 클로저 안에 갇힌 콜백](#문제-2-클로저-안에-갇힌-콜백)
  - [해결: callbackRef](#해결-callbackref)

## 쓰로틀링(Throttling)

![img](images/throttle.webp)

- 쓰로틀링(Throttling)은 특정 함수가 연속적으로 호출되는 것을 제한하여, 일정 시간 간격 내에서 함수가 최대 한 번만 실행되도록 하는 기법이다.
- 이벤트가 과도하게 발생할 때 호출 빈도를 줄여 성능 저하를 방지함.
- 특징:
  - 스크롤(Scroll), 리사이즈(Resize) 이벤트 처리에 주로 사용함.
  - 설정한 시간 간격 동안 추가적인 호출은 무시됨.
  - 일정한 주기마다 실행을 보장하여 사용자에게 실시간성을 제공함.

### 구현 예시

```ts
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
```

## 디바운싱(Debouncing)

- 디바운싱(Debouncing)은 연속적인 이벤트 호출이 멈춘 후, 일정 시간이 지나면 함수가 한 번만 실행되도록 하는 기법이다.
- 사용자가 입력을 멈추거나 동작이 끝날 때까지 처리를 지연시켜 불필요한 연산을 방지함.
- 특징:
  - 검색창 입력(Search Input), 버튼 중복 클릭 방지 등에 유용함.
  - 이벤트 발생 시마다 기존 타이머를 취소하고 새로 시작함.
  - 마지막 호출로부터 지정된 시간이 경과해야 최종적으로 실행됨.

![img](images/debounce.webp)

### 구현 예시

```ts
import { useCallback, useEffect, useRef } from 'react';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
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

    if (timerId.current) {
      clearTimeout(timerId.current);
    }

    if (leadingRef.current && isReady.current) {
      callbackRef.current(...args);
    }

    isReady.current = false;

    timerId.current = setTimeout(() => {
      if (trailingRef.current && lastArgs.current) {
        callbackRef.current(...lastArgs.current);
      }

      isReady.current = true;

      if (trailingRef.current) {
        lastArgs.current = null;
      }
    }, delayRef.current);
  }, []);
}
```

기본값은 `{ leading: true, trailing: false }`로, 연속 호출의 첫 번째 시점에 즉시 실행하고 이후 입력은 무시하는 leading 방식이다. 일반적인 trailing 방식(마지막 호출 후 지연 실행)이 필요한 경우 `{ leading: false, trailing: true }`로 설정한다.

## RequestAnimationFrame(rAF)

- `RequestAnimationFrame(rAF)`은 브라우저가 다음 리페인트(Repaint) 직전에 함수를 실행하도록 스케줄링하는 API다.
- 브라우저의 렌더링 주기(일반적으로 60fps)에 맞춰 최적화된 실행을 보장함.
- 특징:
  - 애니메이션이나 부드러운 UI 업데이트가 필요할 때 사용함.
  - 탭이 활성화되어 있을 때만 호출되므로 CPU 자원을 절약함.
  - `setTimeout`보다 정확한 타이밍에 실행되어 끊김 현상을 최소화함.

### 구현 예시

```ts
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
```

## 안정적인 참조와 최신 콜백 유지

세 훅은 공통적으로 `useCallback`과 `callbackRef` 패턴을 함께 사용한다. 이 두 가지가 해결하는 문제는 서로 다르며, 하나만으로는 충분하지 않다.

### 문제 1: 반환 함수의 참조 불안정

훅이 반환하는 함수는 렌더마다 새로 생성된다. 이를 `useEffect`의 의존성 배열에 포함하면 렌더마다 클린업과 재실행이 반복되어 무한 루프가 발생할 수 있다.

```ts
const throttled = useThrottle(handleScroll, 300);

useEffect(() => {
  window.addEventListener('scroll', throttled);
  return () => window.removeEventListener('scroll', throttled);
}, [throttled]); // throttled가 렌더마다 바뀌면 이벤트 등록/해제가 반복됨
```

`useCallback(..., [])`으로 반환 함수를 감싸면 마운트 시 한 번만 생성되어 참조가 안정된다.

### 문제 2: 클로저 안에 갇힌 콜백

`useCallback(..., [])`을 사용하면 내부 클로저는 최초 렌더의 값만 기억한다. `callback`이 렌더마다 새 함수로 교체되더라도 훅 내부는 초기 버전을 계속 호출하게 된다.

```ts
// deps []이므로 callback은 마운트 시점 값에 고정됨
return useCallback((...args) => {
  callback(...args); // 항상 초기 렌더의 callback
}, []);
```

### 해결: callbackRef

`callbackRef`는 매 렌더마다 현재 `callback`을 ref에 덮어쓴다. 반환 함수는 ref를 통해 호출하므로 클로저가 고정되어도 실행 시점에는 항상 최신 콜백이 사용된다.

```ts
const callbackRef = useRef(callback);
callbackRef.current = callback; // 렌더마다 최신값으로 갱신

return useCallback((...args) => {
  callbackRef.current(...args); // 실행 시점에 최신 callback 호출
}, []); // deps []로 참조 안정 유지
```

`useCallback(..., [])`이 참조 안정성을 보장하고, `callbackRef`가 stale closure 문제를 해소한다. 같은 이유로 `delay`, `leading`, `trailing`도 ref로 관리하여 타이머 내부에서 항상 최신 값을 읽도록 한다.
