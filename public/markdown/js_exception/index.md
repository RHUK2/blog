---
folderName: js_exception
updatedAt: 2025-03-13
title: 예외 처리(Exception)
tag: javascript
isPublished: true
---

# 예외 처리(Exception)

- [try/catch](#trycatch)
  - [실행 동작의 에러 여부와 상관없이 실행시키고 싶은 코드가 있을 때 finally](#실행-동작의-에러-여부와-상관없이-실행시키고-싶은-코드가-있을-때-finally)
  - [사용자가 직접 에러 객체를 던지고 싶을 때 throw](#사용자가-직접-에러-객체를-던지고-싶을-때-throw)
  - [TypeError](#typeerror)
  - [ReferenceError](#referenceerror)
  - [SyntaxError](#syntaxerror)
  - [RangeError](#rangeerror)
- [스크립트 종료 여부](#스크립트-종료-여부)
- [프로미스의 에러 다시 던지기와 try/catch의 에러 다시기 방식은 다르다..](#프로미스의-에러-다시-던지기와-trycatch의-에러-다시기-방식은-다르다)
  - [1. Promise의 에러 다시 던지기](#1-promise의-에러-다시-던지기)
  - [2. try/catch의 에러 다시 던지기](#2-trycatch의-에러-다시-던지기)
  - [요약](#요약)
  - [1. Promise의 에러 다시 던지기](#1-promise의-에러-다시-던지기-1)
  - [2. try/catch의 에러 다시 던지기](#2-trycatch의-에러-다시-던지기-1)
  - [요약](#요약-1)
  - [1. `unhandledrejection` 이벤트](#1-unhandledrejection-이벤트)
  - [2. `error` 이벤트](#2-error-이벤트)
  - [요약](#요약-2)
- [react-error-boundary](#react-error-boundary)
- [404 page](#404-page)
- [500 page](#500-page)

## try/catch

에러가 발생하면 스크립트가 중단되고 콘솔에 에러가 출력된다. 스크립트가 중단되는 것을 방지하기 위해 `try/catch`문이 사용된다. 유효한 코드에서 발생하는 에러만 처리 가능하다.

### 실행 동작의 에러 여부와 상관없이 실행시키고 싶은 코드가 있을 때 finally

### 사용자가 직접 에러 객체를 던지고 싶을 때 throw

throw했는데 받아주는 곳 없으면 프로그램 종료되니 조심

<!-- todo: 내용 보완 필요 -->

### TypeError

```ts
let undefinedVariable;
undefinedVariable.someMethod();
```

```ts
try {
  let undefinedVariable;
  undefinedVariable.someMethod();
} catch (error) {
  console.error(error.message);
}
```

### ReferenceError

```ts
console.log(nonExistentVariable);
```

```ts
try {
  console.log(nonExistentVariable);
} catch (error) {
  console.error(error.message);
}
```

### SyntaxError

```ts
JSON.parse('string');
```

```ts
try {
  JSON.parse('string');
} catch (error) {
  console.error(error.message);
}
```

### RangeError

```ts
let arr = new Array(-1);
```

```ts
try {
  let arr = new Array(-1);
} catch (error) {
  console.error(error.message);
}
```

## 스크립트 종료 여부

브라우저에서 `throw`를 사용했을 때 스크립트가 종료되는 경우와 종료되지 않는 경우를 정리한 표는 다음과 같습니다:

| 상황                                         | 설명                                                                                                                                  | 스크립트 종료 여부 |
| -------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------- | ------------------ |
| 이벤트 핸들러 내에서 throw                   | 이벤트 핸들러에서 에러를 발생시키면, 해당 핸들러만 종료되고 전체 스크립트는 계속 실행됨.                                              | 아니오             |
| 비동기 함수 내에서 throw                     | 비동기 함수(예: `Promise`, `async/await`)에서 에러가 발생하면, 에러가 처리되지 않으면 해당 비동기 작업만 실패.                        | 아니오             |
| 전역 스코프에서 throw                        | 전역 스코프에서 에러가 발생하면, 해당 스크립트의 실행이 중단됨.                                                                       | 예                 |
| 동기 함수 내에서 throw                       | 동기 함수 내에서 에러가 발생하면, 그 함수의 실행이 종료되고 호출한 곳으로 에러가 전파되지만, 처리되지 않으면 스크립트는 멈출 수 있음. | 예                 |
| `setTimeout` 또는 `setInterval` 내에서 throw | 타이머 콜백 내에서 에러가 발생하면, 해당 콜백만 종료되고 전체 스크립트는 계속 실행됨.                                                 | 아니오             |

이 표를 통해 `throw`를 사용하는 다양한 상황에서의 동작 방식을 쉽게 이해할 수 있습니다.

자바스크립트 엔진 관점에서 `Uncaught 에러`는 자바스크립트 코드 실행 중 예외 처리가 되지 않은 오류가 발생할 때 나타납니다. 이 에러는 발생 위치에 따라 두 가지로 나눌 수 있습니다: 콜 스택에서 발생한 에러와 비동기 작업에서 발생한 에러입니다

## 프로미스의 에러 다시 던지기와 try/catch의 에러 다시기 방식은 다르다..

https://ko.javascript.info/promise-error-handling

네, Promise의 에러를 다시 던지는 것과 try/catch의 에러를 다시 던지는 것은 다릅니다. 각각의 동작 방식은 다음과 같습니다:

### 1. Promise의 에러 다시 던지기

Promise에서 에러가 발생하면, `catch` 블록에서 에러를 처리할 수 있습니다. 이때, 에러를 다시 던지면 호출한 곳에서 다시 처리할 수 있습니다.

```ts
function myPromiseFunction() {
  return new Promise((resolve, reject) => {
    // 에러 발생
    reject(new Error('Something went wrong'));
  });
}

myPromiseFunction()
  .then((result) => {
    // 성공 처리
  })
  .catch((error) => {
    console.error('Error caught:', error);
    // 에러를 다시 던짐
    throw error;
  })
  .catch((error) => {
    // 다시 던진 에러 처리
    console.error('Re-caught error:', error);
  });
```

### 2. try/catch의 에러 다시 던지기

`try/catch` 구문에서 발생한 에러를 다시 던지면, 해당 블록 밖에서 처리할 수 있습니다. 이 경우, `try` 블록에서 예외가 발생하면 `catch` 블록이 실행되고, 그 안에서 `throw`를 사용하여 에러를 다시 던질 수 있습니다.

```ts
function myFunction() {
  try {
    // 에러 발생
    throw new Error('Something went wrong');
  } catch (error) {
    console.error('Error caught:', error);
    // 에러를 다시 던짐
    throw error;
  }
}

try {
  myFunction();
} catch (error) {
  console.error('Re-caught error:', error);
}
```

### 요약

- Promise에서는 `catch` 블록에서 에러를 처리하고, 필요에 따라 다시 던져서 연쇄적으로 처리할 수 있습니다.
- try/catch에서는 동기적인 코드에서 발생한 예외를 처리하고, 다시 던질 수 있습니다.

이 두 방식은 비동기 처리와 동기 처리의 차이를 반영합니다.

다시 던진 에러를 잡을 곳이 없을 때 두 방식은 다음과 같이 동작합니다:

### 1. Promise의 에러 다시 던지기

Promise에서 다시 던진 에러는 해당 Promise 체인의 마지막에 있는 `catch`가 없는 경우, 해당 에러가 uncaught exception이 됩니다. 이렇게 되면, Node.js의 경우 프로세스가 종료되거나 브라우저에서는 오류 메시지가 표시됩니다.

```ts
function myPromiseFunction() {
  return new Promise((resolve, reject) => {
    // 에러 발생
    reject(new Error('Something went wrong'));
  });
}

myPromiseFunction()
  .then((result) => {
    // 성공 처리
  })
  .catch((error) => {
    console.error('Error caught:', error);
    // 에러를 다시 던짐
    throw error; // 다시 던지면 처리할 catch가 없으면 uncaught error가 됨
  });

// 여기에는 catch가 없으므로, 에러가 잡히지 않고 uncaught exception이 발생
```

이 경우 브라우저 콘솔이나 Node.js에서는 다음과 같은 메시지가 표시될 수 있습니다:

```
Uncaught Error: Something went wrong
```

### 2. try/catch의 에러 다시 던지기

`try/catch`에서 다시 던진 에러는 해당 `try/catch` 블록 외부에 처리할 `catch`가 없으면, uncaught exception이 발생하게 됩니다. 이 경우에도 프로그램의 흐름이 중단되고, 에러 메시지가 콘솔에 표시됩니다.

```ts
function myFunction() {
  try {
    // 에러 발생
    throw new Error('Something went wrong');
  } catch (error) {
    console.error('Error caught:', error);
    // 에러를 다시 던짐
    throw error; // 다시 던진 에러는 외부에서 잡히지 않으면 uncaught error
  }
}

try {
  myFunction();
} catch (error) {
  // 처리할 catch가 없다면 이 부분이 실행되지 않음
}

// 여기에는 catch가 없으므로, 에러가 잡히지 않고 uncaught exception이 발생
```

이 경우도 비슷하게 다음과 같은 메시지가 표시될 수 있습니다:

```
Uncaught Error: Something went wrong
```

### 요약

- Promise의 경우: 다시 던진 에러는 Promise 체인에 추가적인 `catch`가 없으면 uncaught exception으로 처리됩니다.
- try/catch의 경우: 다시 던진 에러가 외부 `catch`에서 처리되지 않으면 역시 uncaught exception이 됩니다.

이 두 경우 모두 uncaught exception은 에러를 처리하지 않는 불완전한 상태로 남아 있으며, 이는 개발 중 디버깅을 위한 중요한 지표가 됩니다.

`unhandledrejection`과 `error` 이벤트는 JavaScript에서 비동기 처리 중 발생하는 오류를 다루는 데 사용됩니다. 두 이벤트의 주요 차이점은 다음과 같습니다:

### 1. `unhandledrejection` 이벤트

- 발생 시점: Promise가 reject되었지만, 해당 reject를 처리하는 `catch` 핸들러가 없는 경우에 발생합니다.
- 용도: 비동기 코드에서 발생한 오류를 감지하기 위해 사용됩니다. 이는 Promise가 reject될 때 예외 처리를 누락했음을 나타냅니다.
- 사용 예:

  ```ts
  window.addEventListener('unhandledrejection', (event) => {
    console.error('Unhandled promise rejection:', event.reason);
  });

  // 예제: reject 처리 누락
  new Promise((_, reject) => {
    reject(new Error('Promise rejected'));
  });
  ```

### 2. `error` 이벤트

- 발생 시점: 주로 DOM 요소에서 발생하는 오류나 일반적인 JavaScript 오류를 다루기 위해 사용됩니다. 예를 들어, 이미지 로딩 실패, 스크립트 실행 중 발생한 오류 등에서 발생합니다.
- 용도: 전반적인 오류를 감지하는 데 사용되며, DOM과 관련된 에러에 유용합니다.
- 사용 예:

  ```ts
  window.addEventListener('error', (event) => {
    console.error('Error occurred:', event.message);
  });

  // 예제: 스크립트 오류 발생
  nonExistentFunction(); // 정의되지 않은 함수 호출
  ```

### 요약

- `unhandledrejection`: 비동기 Promise의 reject가 처리되지 않았을 때 발생하는 이벤트.
- `error`: DOM 요소나 JavaScript 코드에서 발생하는 일반적인 오류를 다루는 이벤트.

이 두 이벤트 모두 오류를 처리하는 데 중요한 역할을 하며, 애플리케이션에서 발생하는 문제를 디버깅하는 데 유용합니다.

```ts
function init() {
  const promise = new Promise((resolve, reject) => {
    resolve(1);
    // reject(1)
  })
    .then((result) => {
      //   return 1;
      // throw 1;
      return new Promise((resolve, reject) => {
        resolve(1);
        // reject(1);
      }).then(() => {
        return 'a';
      });
    })
    .then((a) => alert(a));

  // query 구조
  try {
    throw 123;
  } catch (error) {
    try {
      //   Promise.reject(1);
      return Promise.reject(1);
      throw error;
    } catch (error) {
      // 조치 x
    }
  }
}
```

## react-error-boundary

## 404 page

## 500 page
