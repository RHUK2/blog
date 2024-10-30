---
folderName: try_catch
updatedAt:
title: try_catch
tag: javascript
isPublished:
---

## try/catch

에러가 발생하면 스크립트가 중단되고 콘솔에 에러가 출력된다. 스크립트가 중단되는 것을 방지하기 위해 `try/catch`문이 사용된다. 유효한 코드에서 발생하는 에러만 처리 가능하다.

### 실행 동작의 에러 여부와 상관없이 실행시키고 싶은 코드가 있을 때 finally

### 사용자가 직접 에러 객체를 던지고 싶을 때 throw

throw했는데 받아주는 곳 없으면 프로그램 종료되니 조심

<!-- todo: 내용 보완 필요 -->

### TypeError

```js
let undefinedVariable;
undefinedVariable.someMethod();
```

```js
try {
  let undefinedVariable;
  undefinedVariable.someMethod();
} catch (error) {
  console.error(error.message);
}
```

### ReferenceError

```js
console.log(nonExistentVariable);
```

```js
try {
  console.log(nonExistentVariable);
} catch (error) {
  console.error(error.message);
}
```

### SyntaxError

```js
JSON.parse('string');
```

```js
try {
  JSON.parse('string');
} catch (error) {
  console.error(error.message);
}
```

### RangeError

```js
let arr = new Array(-1);
```

```js
try {
  let arr = new Array(-1);
} catch (error) {
  console.error(error.message);
}
```

## 스크립트 종료 여부

브라우저에서 `throw`를 사용했을 때 스크립트가 종료되는 경우와 종료되지 않는 경우를 정리한 표는 다음과 같습니다:

| 상황                                | 설명                                         | 스크립트 종료 여부 |
|-------------------------------------|--------------------------------------------|---------------------|
| **이벤트 핸들러 내에서 throw**     | 이벤트 핸들러에서 에러를 발생시키면, 해당 핸들러만 종료되고 전체 스크립트는 계속 실행됨. | 아니오               |
| **비동기 함수 내에서 throw**      | 비동기 함수(예: `Promise`, `async/await`)에서 에러가 발생하면, 에러가 처리되지 않으면 해당 비동기 작업만 실패. | 아니오               |
| **전역 스코프에서 throw**         | 전역 스코프에서 에러가 발생하면, 해당 스크립트의 실행이 중단됨.                  | 예                   |
| **동기 함수 내에서 throw**        | 동기 함수 내에서 에러가 발생하면, 그 함수의 실행이 종료되고 호출한 곳으로 에러가 전파되지만, 처리되지 않으면 스크립트는 멈출 수 있음. | 예                   |
| **`setTimeout` 또는 `setInterval` 내에서 throw** | 타이머 콜백 내에서 에러가 발생하면, 해당 콜백만 종료되고 전체 스크립트는 계속 실행됨. | 아니오               |

이 표를 통해 `throw`를 사용하는 다양한 상황에서의 동작 방식을 쉽게 이해할 수 있습니다.