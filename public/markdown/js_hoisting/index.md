---
folderName: js_hoisting
updatedAt: 2024-04-29
title: Hoisting
tag: javascript
isPublished: true
---

# Hoisting

호이스팅(Hoisting)은 JavaScript에서 변수 및 함수 선언이 스코프의 최상단으로 끌어올려지는 현상을 의미한다. 이는 코드 실행 전에 JavaScript 엔진이 변수와 함수 선언을 메모리에 먼저 저장하기 때문이다.

- 변수 호이스팅: `var`로 선언된 변수는 선언부만 호이스팅되며, 초기화는 원래 위치에서 이루어진다. 따라서 선언 전에 접근 시 `undefined`가 반환된다.
- 함수 호이스팅: 함수 선언식(`function declaration`)은 전체가 호이스팅되어 선언 전에도 호출이 가능하다. 반면, 함수 표현식(`function expression`)은 변수 호이스팅과 동일하게 동작한다.

주의: `let`과 `const`는 호이스팅되지만, TDZ(Temporal Dead Zone)로 인해 선언 전에 접근 시 에러가 발생한다. 🚨

TDZ(Temporal Dead Zone)는 `let`과 `const`로 선언된 변수가 선언되기 전까지 접근할 수 없는 구간을 의미한다. 이는 JavaScript의 블록 스코핑(block scoping)과 관련된 중요한 개념이다.

- TDZ의 시작: 블록 스코프({})가 시작되는 지점부터 변수가 선언된 위치까지.
- TDZ의 종료: 변수가 선언된 위치에서 TDZ가 종료되며, 이후부터 변수에 접근 가능.

### 예시

```javascript
console.log(x); // ReferenceError: Cannot access 'x' before initialization
let x = 10;
```

- 위 코드에서 `x`는 선언 전에 접근하려고 하면 TDZ에 의해 `ReferenceError`가 발생한다.

### 특징

1. `let`과 `const`만 TDZ의 영향을 받는다.
2. `var`는 TDZ가 없으며, 호이스팅 시 `undefined`로 초기화된다.
3. TDZ는 코드의 안정성을 높이고, 실수를 방지하는 데 도움을 준다.

🚨 주의: TDZ는 개발자가 변수를 선언하기 전에 실수로 접근하는 것을 방지하여 버그를 줄이는 역할을 한다.

![img](images/hoisting_1.gif)
![img](images/hoisting_2.gif)
![img](images/hoisting_3.gif)
![img](images/hoisting_4.gif)
![img](images/hoisting_5.gif)
![img](images/hoisting_6.gif)
![img](images/hoisting_7.gif)
