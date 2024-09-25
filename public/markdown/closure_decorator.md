---
fileName:
updatedAt:
title:
tag:
isPublished:
---

# Example1

## 데코레이터

데코레이터는 함수를 받아서 기능을 확장시킨 새로운 함수를 반환하는 함수

데코레이터 함수 실행은 기능 추가된 함수의 반환이며 그 함수를 실행하려면 한 번 더 실행해야한다.

## 실무에서 클로저 사용 예시

이벤트에 이벤트 객체 외에 인수를 받는 함수를 연결할 경우 클로저를 사용해서 조금 더 간결하게 작성 가능하다.

```js
// 이벤트 객체와 같은 depth에서 인수를 구성한 경우
const debounce = (event, callback) => {
  ...
}

<button onClick={(event) => debounce(event, callback)}>Click</button>

// 이벤트 객체를 인수로 받는 함수를 클로저로 감싸서 함수를 실행하는 형태로 이벤트에 연결하는 경우
const debounce = (callback) => () => {
  ...
};

<button onClick={debounce(callback)}>Click</button>
```

## 구조 분해 할당

구조 분해 할당 후 기본값을 설정하는 경우, 해당 값이 `undefined`인 경우에만 기본값이 적용된다.

```js
const {
  a = 1,
  b = 2,
  c = 3,
  d = 4,
} = {
  a: null,
  b: undefined,
  c: 3,
  d: 4,
};

console.log(a, b, c, d); // null 2 3 4
```
