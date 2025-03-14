---
folderName: js_throttle_debounce
updatedAt: 2024-10-14
title: throttle과 debounce
tag: javascript
isPublished: true
---

## throttle과 debounce

<!-- todo: 내용 보완 필요 -->

이벤트에 병목 현상을 주고 싶거나, 사용자의 입력에 딜레이를 주고 싶은 상황이 빈번하게 발생하는데 이를 `lodash`의 `throttle`과 `debounce`로 쉽게 해결이 가능하다.

보통 스크롤 이벤트 같이 매우 빈번하게 발생하는 이벤트의 경우 `throttle`을 통해 병목 현상을 준다. 사용자가 고의로 빈번하게 입력하는 것을 방지하기 위해서는 `debounce`를 활용해 정해진 딜레이 이상 지나지 않으면 이벤트를 막아준다. 아래의 사진으로 해당 함수들이 어떻게 동작하는 지 이해할 수 있다.

`throttle`은 클릭을 여러번할 때 사용자가 설정한 n초 당 한 번씩 이벤트가 발생한다
`debounce`는 클릭을 여러번할 때 클릭과 클릭 사이에 간격이 사용자가 설정한 n초를 넘어가면 이벤트가 발생한다

![img](assets/debounce_vs_throttle.png)

사용법은 아래와 같다. 리액트의 경우 리렌더링 시에 컴포넌트를 계속 호출하므로 `useRef` 훅으로 감싸서 매 렌더링마다 새로운 함수가 생성되는 것을 막는다.

```js
import _ from 'lodash';

...

function onCheckEmail() {
    ...
}

const onThrottledCheckEmail = _.throttle(onCheckEmail, 1000, {leading: true, trailling: false});

const onDebouncedCheckEmail = _.debounce(onCheckEmail, 1000, {leading: true, trailling: false});

function debounceWrapper(func, delay) {
  let timerId;

  return function (...args) {
    if (timerId) {
      clearTimeout(timerId);
    }

    timerId = setTimeout(() => {
      func.apply(this, args);
    }, delay);
  };
}

function throttleWrapper(func, delay) {
  let isThrottled = false;

  return function (...args) {
    if (!isThrottled) {
      func.apply(this, args);
      isThrottled = true;

      setTimeout(() => {
        isThrottled = false;
      }, delay);
    }
  };
}
```

```ts
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
export function useDebounceCallback<T extends (...args: any[]) => any>(handler: T, dependency: DependencyList, debounceTime: number = 500) {
  return useMemo(() => {
    return debounce(handler, debounceTime);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dependency]);
```

```ts
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
export function useThrottleCallback<T extends (...args: any[]) => any>(handler: T, dependency: DependencyList, throttleTime: number = 500) {
  return useMemo(() => {
    return throttle(handler, throttleTime);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dependency]);
```

```json
{
  "extends": ["next/core-web-vitals", "next/typescript", "prettier"],
  "rules": {
    "@typescript-eslint/no-unused-vars": "off",
    "react-hooks/exhaustive-deps": [
      "warn",
      {
        "additionalHooks": "(useDebounceCallback|useThrottleCallback)"
      }
    ]
  }
}
```
