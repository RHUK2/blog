---
folderName: js_note
updatedAt: 2024-10-08
title: 자바스크립트 노트
tag: javascript
isPublished: true
---

# 자바스크립트 노트

- [논리 연산자 단락 평가](#논리-연산자-단락-평가)
- [배열 • 이터러블 객체 • 유사배열 객체](#배열--이터러블-객체--유사배열-객체)
- [브라우저 환경 감지하기](#브라우저-환경-감지하기)
- [인수 • 인자](#인수--인자)
- [순수 함수 • 비순수 함수](#순수-함수--비순수-함수)
- [값, 리터럴, 표현식, 문](#값-리터럴-표현식-문)
- [parse](#parse)
- [sort](#sort)
- [Number() vs parseInt()](#number-vs-parseint)
- [구조 분해 할당](#구조-분해-할당)
- [일급 객체](#일급-객체)

## 논리 연산자 단락 평가

```ts
const a = null || null || null || 'end';

console.log(a); // 'end'

const b = 'value' && 'value' && 'value' && 'end';

console.log(b); // 'end'
```

논리 연산자 `||`는 단락 평가 시 `null`, `undefined`, `''`, `0`, `NaN`, `false` 값을 만나면 다음으로 이동하고 만나지 않으면 해당 값을 출력한다.

논리 연산자 `&&`는 단락 평가 시 `null`, `undefined`, `''`, `0`, `NaN`, `false` 값을 만나면 해당 값을 출력하고 만나지 않으면 다음으로 이동한다.

## 배열 • 이터러블 객체 • 유사배열 객체

| 구분          | 유사 배열 (Array-like)        | 이터레이터 (Iterator)                 |
| ------------- | ----------------------------- | ------------------------------------- |
| 본질          | 배열처럼 생긴 객체            | 반복 동작을 위한 인터페이스           |
| 구성          | `length`와 인덱스로 접근 가능 | `next()` 메서드로 순차 접근           |
| 이터러블 여부 | 기본적으로 이터러블이 아님    | 이터러블 객체에서 생성됨              |
| 사용 예       | `arguments`, `NodeList`       | `for...of`, 스프레드 연산자 등에 활용 |
| 배열 메서드   | 직접 사용 불가 (변환 필요)    | 이터러블이면 간접적으로 사용 가능     |

## 브라우저 환경 감지하기

```ts
// window 객체가 정의되지 않은 환경(예: Node.js)에서 에러 발생
if (window) {
  // ...
}

// 개선된 코드
if (typeof window !== 'undefined') {
  // ...
}
```

## 인수 • 인자

| 구분      | 인수(Argument)                | 인자(Parameter)                    |
| --------- | ----------------------------- | ---------------------------------- |
| 정의      | 함수 호출 시 전달되는 실제 값 | 함수 선언 시 정의되는 변수         |
| 예시      | `sum(3, 5)`에서 `3`과 `5`     | `function sum(a, b)`에서 `a`와 `b` |
| 동적 특성 | 런타임에 결정됨               | 컴파일 타임에 결정됨               |

## 순수 함수 • 비순수 함수

▾ 순수 함수

- 입력값에 의해서만 결과가 결정되며, 외부 상태를 변경하지 않는다.

```ts
function add(a, b) {
  return a + b;
}
```

▾ 비순수 함수

- 외부 상태에 의존하거나 외부 상태를 변경할 수 있으며, 같은 입력값에 대해 항상 같은 결과를 보장하지 않는다.

```ts
let count = 0;

function increment() {
  count += 1;
  return count;
}
```

## 값, 리터럴, 표현식, 문

1. 값(Value)

   - 메모리에 저장된 데이터를 의미.
   - 변수에 할당되거나, 연산의 결과로 생성될 수 있음.

2. 리터럴(Literal)

   - 소스 코드에서 고정된 값을 직접 표현한 것.
   - 값의 표기법으로, 변수나 표현식 없이 직접 사용.
   - 예: `100`, `3.14`, `'A'`, `"World"`

3. 표현식(Expression)

   - 값으로 평가될 수 있는 코드 조각.
   - 리터럴, 변수, 연산자, 함수 호출 등이 포함될 수 있음.
   - 예: `5 + 3`, `x * 2`, `Math.sqrt(16)`

4. 문(Statement)
   - 프로그램의 실행 단위.
   - 표현식이 포함될 수 있지만, 그 자체로는 값으로 평가되지 않음.
   - 예: `int x = 10;`, `if (x > 0) { ... }`, `return x;`

## parse

보통 라이브러리는 여러가지 메서드를 가진 거대한 객체로 구성이 되고, 해당 객체에 변경할 데이터를 넣은 후 여러 메서드를 사용하여 원하는 형태의 데이터를 얻어낼 수 있다. 반대로 데이터를 기반으로 거대한 객체를 구성할 때 사용하는 것이 `parse()` 파싱 관련 메서드이다. 개발을 하다보면 데이터를 다시 조작해서 다른 데이터를 얻어내고 싶을 경우가 있을 것이다. 이런 경우 데이터를 파싱해서 거대한 객체를 다시 만들어내고 데이터를 바탕으로 만들어진 거대한 객체를 통해 다시 사용자가 원하는 형태의 데이터를 출력한다.

## sort

배열은 각 문자의 유니 코드 코드 포인트 값에 따라 정렬되기 때문에 숫자 정렬이 생각한대로 정렬되지 않을 수 있다. 원 배열이 정렬되며, 복사본이 만들어지는 것이 아니다.

`compareFunction(a, b) < 0`인 경우, `a`를 `b`보다 낮은 인덱스로 정렬한다. 즉, `a`가 먼저 온다.
`compareFunction(a, b) === 0`인 경우, `a`와 `b`를 서로에 대해 변경하지 않는다.
`compareFunction(a, b) > 0`인 경우, `b`를 `a`보다 낮은 인덱스로 정렬한다. 즉, `b`가 먼저 온다.

## Number() vs parseInt()

## 구조 분해 할당

구조 분해 할당 후 기본값을 설정하는 경우, 해당 값이 `undefined`인 경우에만 기본값이 적용된다.

```ts
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

## 일급 객체

일급 객체(First-class Object)는 프로그래밍 언어에서 특정 조건을 만족하는 객체를 지칭하는 용어입니다.

주요 조건은 다음과 같습니다:

1. 변수에 할당 가능
2. 함수의 인자로 전달 가능
3. 함수의 반환값으로 사용 가능
4. 자료구조(배열, 객체 등)에 저장 가능

JavaScript에서 함수는 일급 객체의 조건을 모두 만족합니다. 예를 들어:

```ts
// 1. 변수에 할당
const foo = function () {
  console.log('Hello');
};

// 2. 함수의 인자로 전달
function bar(func) {
  func();
}
bar(foo);

// 3. 함수의 반환값으로 사용
function baz() {
  return function () {
    console.log('World');
  };
}
const qux = baz();
qux();

// 4. 자료구조에 저장
const arr = [foo, qux];
arr.forEach((func) => func());
```

이처럼 JavaScript에서 함수는 일급 객체로서 다양한 방식으로 활용될 수 있습니다. 이러한 특성은 고차 함수, 클로저, 콜백 패턴 등 함수형 프로그래밍 기법을 가능하게 하는 기반이 됩니다.
