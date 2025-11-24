---
folderName: js_hoisting
title: 호이스팅(Hoisting)
tag: javascript
isPublished: true
---

# 호이스팅(Hoisting)

- [호이스팅(Hoisting)이란?](#호이스팅hoisting이란)
- [호이스팅 종류](#호이스팅-종류)
- [과정](#과정)

## 호이스팅(Hoisting)이란?

- 호이스팅은 JavaScript에서 변수 및 함수 선언이 스코프의 최상단으로 끌어올려지는 현상을 의미한다.
- 코드 실행 전에 JavaScript 엔진이 변수와 함수 선언을 메모리에 먼저 저장한다.

## 호이스팅 종류

- 변수 호이스팅
  - `var`로 선언된 변수는 선언부만 호이스팅되며, 초기화는 원래 위치에서 이루어진다. 따라서 선언 전에 접근 시 `undefined`가 반환된다.
  - `let`과 `const`는 호이스팅되지만, TDZ(Temporal Dead Zone)로 인해 선언 전에 접근 시 에러가 발생한다.

    ```ts
    console.log(x); // ReferenceError: Cannot access 'x' before initialization

    let x = 10;
    ```

  - TDZ는 변수가 선언된 위치부터 초기화가 완료될 때까지의 구간을 의미한다. 이는 `var`로 선언된 변수와는 달리, 호이스팅이 발생하지만 초기화 전까지 접근이 불가능한 특성을 가진다.

- 함수 호이스팅
  - 함수 선언식(`function declaration`)은 전체가 호이스팅되어 선언 전에도 호출이 가능하다. 반면, 함수 표현식(`function expression`)은 변수 호이스팅과 동일하게 동작한다.

## 과정

코드 실행 전 과정:

![img](images/hoisting_1.gif)
![img](images/hoisting_2.gif)
![img](images/hoisting_3.gif)

코드 실행 후 과정:

![img](images/hoisting_4.gif)
![img](images/hoisting_5.gif)
![img](images/hoisting_6.gif)
![img](images/hoisting_7.gif)
