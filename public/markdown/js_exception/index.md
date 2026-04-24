---
folderName: js_exception
title: 예외 처리(Exception)
tag: javascript
isPublished: true
---

# 예외 처리(Exception)

- [try/catch 구문](#trycatch-구문)
  - [finally 블록](#finally-블록)
  - [throw 문](#throw-문)
  - [표준 에러 객체 유형](#표준-에러-객체-유형)
- [스크립트 종료 및 에러 전파](#스크립트-종료-및-에러-전파)
  - [상황별 스크립트 종료 여부](#상황별-스크립트-종료-여부)
- [에러 다시 던지기(Rethrowing)](#에러-다시-던지기rethrowing)
  - [Promise에서의 에러 다시 던지기](#promise에서의-에러-다시-던지기)
  - [try/catch에서의 에러 다시 던지기](#trycatch에서의-에러-다시-던지기)
- [전역 에러 핸들링](#전역-에러-핸들링)
  - [unhandledrejection 이벤트](#unhandledrejection-이벤트)
  - [error 이벤트](#error-이벤트)

## try/catch 구문

에러가 발생하면 스크립트가 즉시 중단되고 콘솔에 에러가 출력된다. `try/catch` 구문을 사용하면 스크립트 중단을 방지하고 에러를 제어할 수 있다.

- `try` 블록: 실행할 코드 작성
- `catch(err)` 블록: 에러 발생 시 실행될 코드 작성. `err` 변수에는 에러 객체가 담김
- `try/catch`는 동기적으로 동작함. `setTimeout`과 같은 비동기 코드 내부에서 발생한 에러는 외부 `try/catch`에서 잡을 수 없음

### finally 블록

에러 발생 여부와 상관없이 무조건 실행되어야 하는 코드를 작성한다. 보통 리소스 해제(네트워크 연결 종료, 임시 파일 삭제 등) 목적으로 사용한다.

### throw 문

사용자가 직접 에러를 발생시키고 싶을 때 사용한다. 에러 객체뿐만 아니라 원시 타입도 던질 수 있으나, 디버깅을 위해 `Error` 생성자로 만든 객체를 던지는 것이 권장된다.

```ts
function divide(a, b) {
  if (b === 0) {
    throw new Error('0으로 나눌 수 없음');
  }
  return a / b;
}
```

### 표준 에러 객체 유형

- `TypeError`: 값이 기대한 자료형이 아닐 때 발생함
- `ReferenceError`: 존재하지 않는 변수를 참조했을 때 발생함
- `SyntaxError`: 문법이 잘못되었을 때 발생함 (주로 `JSON.parse` 시 발생)
- `RangeError`: 수치형 변수나 인자가 허용 범위를 벗어났을 때 발생함

## 스크립트 종료 및 에러 전파

발생한 에러를 처리하지 않으면(Uncaught Error) 해당 스레드의 실행이 중단된다. 브라우저 환경에서는 에러가 발생한 지점에 따라 영향 범위가 달라진다.

### 상황별 스크립트 종료 여부

| 상황 | 설명 | 스크립트 종료 여부 |
| ---- | ---- | ------------------ |
| 전역 스코프(Global Scope) | 실행 도중 처리되지 않은 에러 발생 시 해당 스크립트 중단됨 | 예 |
| 동기 함수 내부 | 에러가 상위 호출 스택으로 전파되며, 끝까지 처리되지 않으면 중단됨 | 예 |
| 이벤트 핸들러 | 해당 핸들러의 실행만 중단되고 브라우저의 다른 동작은 유지됨 | 아니오 |
| 비동기 콜백 (setTimeout 등) | 콜백 내부의 실행만 중단되며 메인 스레드에 영향을 주지 않음 | 아니오 |
| Promise / async await | 처리되지 않은 거부(Rejection) 발생 시 비동기 작업만 실패함 | 아니오 |

## 에러 다시 던지기(Rethrowing)

에러를 잡았으나 현재 블록에서 처리할 수 없는 종류일 때, 상위 블록으로 에러를 다시 넘기는 기법이다.

### Promise에서의 에러 다시 던지기

Promise 체인의 `catch` 블록에서 `throw`를 사용하면 다음 `catch`로 에러가 전달된다. 만약 이후에 `catch`가 없다면 `unhandledrejection`이 발생한다.

```ts
fetch('https://api.example.com')
  .then(response => response.json())
  .catch(error => {
    console.error('네트워크 에러:', error);
    throw error; // 에러를 다시 던져 상위 체인에서 처리하게 함
  });
```

### try/catch에서의 에러 다시 던지기

`catch` 블록 내에서 `throw`를 사용하여 호출 스택의 상위로 에러를 전파한다.

```ts
function processData(data) {
  try {
    parse(data);
  } catch (err) {
    if (err instanceof SyntaxError) {
      console.log('데이터 형식 오류');
    } else {
      throw err; // 알 수 없는 에러는 다시 던짐
    }
  }
}
```

## 전역 에러 핸들링

애플리케이션 전역에서 발생하는 예상치 못한 에러를 포착하기 위해 window 객체의 이벤트를 활용한다.

### unhandledrejection 이벤트

- 발생 시점: Promise가 거부(Reject)되었으나 `catch` 핸들러가 없을 때 발생함
- 용도: 비동기 작업의 누락된 에러 처리를 감지함

```ts
window.addEventListener('unhandledrejection', (event) => {
  console.error('처리되지 않은 프로미스 거부:', event.reason);
});
```

### error 이벤트

- 발생 시점: 스크립트 실행 에러, 이미지/스크립트 로딩 실패 시 발생함
- 용도: 전반적인 런타임 에러 및 리소스 로드 실패를 모니터링함

```ts
window.addEventListener('error', (event) => {
  console.error('런타임 에러 발생:', event.message);
});
```
