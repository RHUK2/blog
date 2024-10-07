---
fileName: asynchronous
updatedAt: 2024-04-29
title: 비동기 작업 제어하기
tag: javascript
isPublished:
---

# Asynchronous

- [Callback](#callback)
- [Promise](#promise)
  - [Promise.resolve](#promiseresolve)
  - [Promise.reject](#promisereject)
  - [다중 프로미스 처리](#다중-프로미스-처리)
- [async/await](#asyncawait)

브라우저는

## Callback

```ts
function loadScript(src) {
  // <script> 태그를 만들고 페이지에 태그를 추가합니다.
  // 태그가 페이지에 추가되면 src에 있는 스크립트를 로딩하고 실행합니다.
  let script = document.createElement('script');
  script.src = src;
  document.head.append(script);
}

loadScript('/my/script.js');
```

## Promise

![img](images/promise_1.gif)
![img](images/promise_2.gif)
![img](images/promise_3.gif)

아래 그림 설명:

1. 실행흐름 중 비동기 동작을 만나 Web API로 넘겨서 처리한다.
2. 비동기 동작이 완료되면 인수로 넘겨진 콜백을 매크로태스크 큐로 넘긴다.

![img](images/promise_4.gif)

아래 그림 설명:

1. 실행흐름 중 `Promise`를 만나 `executor` 함수를 즉시 실행한다.
2. `resolve` 함수가 호출되면 `then` 함수에 인수로 넘겨진 콜백을 마이크로태스크 큐로 넘긴다.
3. `reject` 함수가 호출되면 `catch` 함수에 인수로 넘겨진 콜백을 마이크로태스크 큐로 넘긴다.

![img](images/promise_5.gif)
![img](images/promise_6.gif)

아래 그림 설명:

1. 콜 스택이 비워지면 이벤트 루프는 마이크로태스크 큐의 작업을 우선으로 콜 스택으로 보낸다.
2. 이후 매크로태스크 큐의 작업을 콜 스택으로 보낸다.

![img](images/promise_7.gif)
![img](images/promise_8.gif)

### Promise.resolve

- `Promise.resolve(value)`는 결괏값이 `value`인 이행 상태 프로미스를 생성한다.
- `Promise.resolve(value)`는 `new Promise((res, rej) => res(value))`와 같다.
- `Promise.resolve`는 호환성을 위해 함수가 거부 상태 프로미스를 반환하도록 해야 할 때 사용할 수 있다.

아래 함수 `loadCached`는 인수로 받은 URL을 대상으로 fetch를 호출하고, 그 결과를 기억한다.

```ts
let cache = new Map();

function loadCached(url) {
  if (cache.has(url)) {
    return Promise.resolve(cache.get(url)); // (*)
  }

  return fetch(url)
    .then((response) => response.text())
    .then((text) => {
      cache.set(url, text);
      return text;
    });
}
```

`loadCached`를 호출하면 이행 상태 프로미스가 반환된다는 것이 보장된다. `(*)`로 표시한 줄에서 `Promise.resolve`를 사용한 이유가 바로 여기에 있다.

### Promise.reject

- `Promise.reject(error)`는 결괏값이 `error`인 거부 상태 프로미스를 생성한다.
- `Promise.reject(error)`는 `new Promise((res, rej) => rej(error))`와 같다.
- `Promise.reject`는 호환성을 위해 함수가 이행 상태 프로미스를 반환하도록 해야 할 때 사용할 수 있다.

아래는 `axios` 라이브러리의 응답에 대한 인터셉터 기능을 사용할 때이다.

```ts
axios.interceptors.response.use(
  function (response) {
    // ...
    return response;
  },
  function (error) {
    // ...
    return Promise.reject(error); // (*)
  },
);
```

`axios`는 오류가 나고 인터셉터로 에러에 대한 추가 처리가 되어도 거절 상태 프로미스가 반환된다는 것이 보장된다. `(*)`로 표시한 줄에서 `Promise.reject`를 사용한 이유가 바로 여기에 있다.

### 다중 프로미스 처리

다중 프로미스는 `Promise.all`, `Promise.allSettled`, `Promise.race` 함수로 처리가 가능하다.

- `Promise.all`은 모든 프로미스가 이행될 때까지 기다렸다가 그 결괏값을 담은 배열을 반환한다. 주어진 프로미스 중 하나라도 실패하면 `Promise.all`은 거부되고, 나머지 프로미스의 결과는 무시된다.
- `Promise.allSettled`은 모든 프로미스가 처리될 때까지 기다렸다가 그 결과(객체)를 담은 배열을 반환한다. 객체는 아래와 같은 정보를 담는다.
  - `status`: `"fulfilled"` 또는 `"rejected"`
  - `value`: `status`가 `"fulfilled"`일 경우 결과값이 해당 속성에 담긴다.
  - `reason`: `status`가 `"rejected"`일 경우 에러가 해당 속성에 담긴다.
- `Promise.race` 가장 먼저 처리된 프로미스의 결과 또는 에러를 담은 프로미스를 반환한다.

```ts
let promiseList = [
  new Promise((resolve, reject) => setTimeout(() => resolve(1), 1000)),
  new Promise((resolve, reject) => setTimeout(() => resolve(2), 2000)),
  new Promise((resolve, reject) => setTimeout(() => resolve(3), 3000)),
];

let promiseListError = [
  new Promise((resolve, reject) => setTimeout(() => resolve(1), 1000)),
  new Promise((resolve, reject) => setTimeout(() => reject(new Error('에러 발생!')), 2000)),
  new Promise((resolve, reject) => setTimeout(() => resolve(3), 3000)),
];

// promiseList가 인수일 경우, then으로 넘어간다.
// promiseListError가 인수일 경우, catch로 넘어간다.
Promise.all(promiseList)
  .then((resultList) => resultList.forEach((result) => console.log(result)))
  .catch((error) => console.error(error));

// promiseList가 인수일 경우, then으로 넘어간다.
// promiseListError가 인수일 경우, then으로 넘어간다.
Promise.allSettled(promiseList).then((resultList) => {
  resultList.forEach((result, index) => {
    if (result.status == 'fulfilled') {
      console.log(`${result.value}`);
    }
    if (result.status == 'rejected') {
      console.log(`${result.reason}`);
    }
  });
});

// promiseList가 인수일 경우, then으로 넘어간다.
// promiseListError가 인수일 경우, catch로 넘어간다.
Promise.race(promiseList)
  .then((result) => console.log(result))
  .catch((error) => console.error(error));
```

## async/await

![img](images/async_await_1.gif)
![img](images/async_await_2.gif)

아래 그림 설명:

1. 실행흐름 중 `async` 함수를 만나면 해당 함수를 실행한다.

![img](images/async_await_3.gif)

아래 그림 설명:

1. `async` 함수 내부에서 `await` 키워드를 만나면 해당 `async` 함수를 마이크로태스크 큐로 넘긴다.

![img](images/async_await_4.gif)
![img](images/async_await_5.gif)

아래 그림 설명:

1. 콜 스택이 비워지면 마이크로태스크 큐에 작업을 콜 스택으로 보낸다.

![img](images/async_await_6.gif)
