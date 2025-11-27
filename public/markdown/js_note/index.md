---
folderName: js_note
title: Javascript Note
tag: javascript
isPublished: true
---

# Javascript Note

- [논리 연산자 단락 평가](#논리-연산자-단락-평가)
- [배열 • 이터러블 객체 • 유사배열 객체](#배열--이터러블-객체--유사배열-객체)
- [브라우저 환경 감지하기](#브라우저-환경-감지하기)
- [인수 • 인자](#인수--인자)
- [순수 함수 • 비순수 함수](#순수-함수--비순수-함수)
- [값 • 리터럴 • 표현식 • 문](#값--리터럴--표현식--문)
- [`sort`](#sort)
- [`Number` • `parseInt` • `parseFloat`](#number--parseint--parsefloat)
- [구조 분해 할당 기본값](#구조-분해-할당-기본값)
- [일급 객체(First-class Object)](#일급-객체first-class-object)
- [`%`(모듈러)](#모듈러)
- [타입에 따른 변수값 초기화](#타입에-따른-변수값-초기화)
- [루프](#루프)
  - [JavaScript String 메서드 비교](#javascript-string-메서드-비교)
  - [자바스크립트 바이너리 데이터 객체](#자바스크립트-바이너리-데이터-객체)
- [Tagged Template Literal](#tagged-template-literal)

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

순수 함수:

- 입력값에 의해서만 결과가 결정되며, 외부 상태를 변경하지 않는다.

```ts
function add(a, b) {
  return a + b;
}
```

비순수 함수:

- 외부 상태에 의존하거나 외부 상태를 변경할 수 있으며, 같은 입력값에 대해 항상 같은 결과를 보장하지 않는다.

```ts
let count = 0;

function increment() {
  count += 1;
  return count;
}
```

## 값 • 리터럴 • 표현식 • 문

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

## `sort`

`sort` 메서드는 원본 배열을 정렬하며, 별도의 비교 함수를 제공하지 않으면 문자열로 변환 후 유니코드 코드 포인트 순서로 정렬한다.

문자열 정렬:

```ts
let fruits = ['banana', 'apple', 'cherry'];
fruits.sort();
console.log(fruits); // ["apple", "banana", "cherry"]
```

숫자열 정렬:

```ts
let numbers = [10, 5, 100, 25];
numbers.sort((a, b) => a - b);
console.log(numbers); // [5, 10, 25, 100]
numbers.sort((a, b) => b - a);
console.log(numbers); // [100, 25, 10, 5]
```

다국어 정렬:

```ts
let words = ['äpple', 'zebra', 'österreich'];
// 기본 비교
words.sort();
console.log(words); // ["zebra", "äpple", "österreich"] (ä, ö가 z 뒤로)
// localeCompare 사용 (스웨덴어 로케일)
words.sort((a, b) => a.localeCompare(b, 'sv'));
console.log(words); // ["äpple", "österreich", "zebra"] (스웨덴어 규칙 적용)

let words = ['Zebra', 'apple', 'Banana'];
// 기본 비교
words.sort();
console.log(words); // ["Banana", "Zebra", "apple"] (대문자 우선)
// localeCompare로 대소문자 무시
words.sort((a, b) => a.localeCompare(b, 'en', { sensitivity: 'base' }));
console.log(words); // ["apple", "Banana", "Zebra"]

let files = ['file10.txt', 'file2.txt', 'file100.txt'];
// 기본 비교
files.sort();
console.log(files); // ["file10.txt", "file100.txt", "file2.txt"] (문자열 순서)
// localeCompare로 숫자 인식
files.sort((a, b) => a.localeCompare(b, 'en', { numeric: true }));
console.log(files); // ["file2.txt", "file10.txt", "file100.txt"]
```

- `sensitivity: "base"`: 대소문자와 악센트 무시.
- `sensitivity: "accent"`: 대소문자는 구분, 악센트는 무시.
- `sensitivity: "case"`: 악센트는 구분, 대소문자는 무시.
- `sensitivity: "variant"`: 대소문자와 악센트 모두 구분 (기본값).

## `Number` • `parseInt` • `parseFloat`

|             | `Number`     | `parseInt`     | `parseFloat`   |
| ----------- | ------------ | -------------- | -------------- |
| 반환 타입   | 정수/소수    | 정수           | 소수           |
| 소수점 처리 | 포함         | 버림           | 포함           |
| 문자 허용   | 불가 (`NaN`) | 숫자 이후 무시 | 숫자 이후 무시 |
| 진법 지정   | 불가         | 가능           | 불가           |

```ts
console.log(Number('123')); // 123 (정수)
console.log(Number('123.45')); // 123.45 (소수)
console.log(Number('12.34.56')); // NaN (잘못된 형식)
console.log(Number('123abc')); // NaN (숫자 뒤 문자 포함)
console.log(Number('')); // 0 (빈 문자열)
console.log(Number(' ')); // 0 (공백)

console.log(parseInt('123')); // 123 (정수)
console.log(parseInt('123.45')); // 123 (소수점 이하 버림)
console.log(parseInt('123abc')); // 123 (숫자 이후 무시)
console.log(parseInt('abc123')); // NaN (숫자로 시작 안 함)
console.log(parseInt('12.34.56')); // 12 (첫 번째 숫자까지만)
console.log(parseInt('0xFF')); // 255 (16진수 인식)
console.log(parseInt('10', 2)); // 2 (2진수로 해석)

console.log(parseFloat('123')); // 123 (정수도 가능)
console.log(parseFloat('123.45')); // 123.45 (소수점 유지)
console.log(parseFloat('123.45abc')); // 123.45 (숫자 이후 무시)
console.log(parseFloat('abc123')); // NaN (숫자로 시작 안 함)
console.log(parseFloat('12.34.56')); // 12.34 (첫 번째 소수점까지만)
```

## 구조 분해 할당 기본값

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

## 일급 객체(First-class Object)

일급 객체는 프로그래밍 언어에서 아래 조건을 만족하는 객체를 지칭하는 용어다.

1. 변수에 할당 가능
2. 함수의 인자로 전달 가능
3. 함수의 반환값으로 사용 가능
4. 자료구조(배열, 객체 등)에 저장 가능

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

## `%`(모듈러)

```ts
console.log(5 % 3); // 2
console.log(-5 % 3); // -2
console.log(5 % 0); // NaN
console.log(-5 % 0); // NaN
```

## 타입에 따른 변수값 초기화

```ts
let num: number = 0;
let str: string = '';
let bool: boolean = false;
let arr: string[] = [];
let obj: Record<string, string> = {};
let obj: Record<string, string> | null = null;
```

## 루프

```ts
// 1. 전통적인 for 루프
for (let i = 0; i < array.length; i++) {
  console.log(array[i]);
}

// 2. for...in (객체의 키 순회)
for (let key in object) {
  console.log(key, object[key]);
}

// 3. for...of (이터러블 객체의 값 순회)
for (let value of array) {
  console.log(value);
}

// 4. for await...of (비동기 이터러블)
for await (let value of asyncIterable) {
  console.log(value);
}
```

```ts
// 1. forEach - 각 요소 실행 (반환값 없음)
array.forEach((item, index) => console.log(item));

// 2. map - 새 배열 반환
const newArray = array.map((item) => item * 2);

// 3. filter - 조건에 맞는 요소들로 새 배열
const filtered = array.filter((item) => item > 5);

// 4. find - 첫 번째 조건 만족 요소
const found = array.find((item) => item > 5);

// 5. findIndex - 첫 번째 조건 만족 요소의 인덱스
const index = array.findIndex((item) => item > 5);

// 6. some - 하나라도 조건 만족하면 true
const hasMatch = array.some((item) => item > 5);

// 7. every - 모든 요소가 조건 만족하면 true
const allMatch = array.every((item) => item > 0);

// 8. reduce - 누적값 계산
const sum = array.reduce((acc, item) => acc + item, 0);
```

- `for...in`: 객체 키, 배열 인덱스 (순서 보장 안됨)
- `for...of`: 배열 값, 문자열, Map, Set 등
- `forEach`: 반환값 없음, break/continue 불가
- `map`: 새 배열 반환, 1:1 변환
- `filter`: 조건 필터링, 새 배열
- `reduce`: 단일값으로 축약

### JavaScript String 메서드 비교

JavaScript의 문자열 처리 메서드는 구버전(UTF-16 기준)과 현대 버전(유니코드 전체 기준)으로 나뉜다. 이모지(Emoji)와 같이 2바이트를 초과하는 문자를 처리할 때 차이가 발생한다.

| 구분          | 메서드                                         | 특징                                                             | 비고      |
| :------------ | :--------------------------------------------- | :--------------------------------------------------------------- | :-------- |
| 현대 메서드   | `fromCodePoint()`, `.at()`, `.codePointAt()`   | 전체 유니코드 기준. 이모지 등 4바이트 문자도 완벽하게 처리함.    | 권장      |
| 구버전 메서드 | `fromCharCode()`, `.charAt()`, `.charCodeAt()` | UTF-16 조각(16비트) 기준. 이모지 처리 시 깨지거나 조각만 반환함. | 사용 지양 |

### 자바스크립트 바이너리 데이터 객체

| 이름        | 환경     | 설명                                                                            |
| :---------- | :------- | :------------------------------------------------------------------------------ |
| ArrayBuffer | 공통     | 고정 길이의 순수 바이너리 데이터 버퍼.                                          |
| TypedArray  | 공통     | ArrayBuffer를 특정 타입(Uint8, Float32 등)으로 해석하고 조작하기 위한 뷰(View). |
| Blob        | 브라우저 | 불변(Immutable)의 바이너리 데이터 덩어리. (멀티미디어 파일 등)                  |
| File        | 브라우저 | Blob을 상속받아 파일명, 수정일 등 파일 시스템 관련 메타데이터가 추가된 객체.    |
| Buffer      | Node.js  | Node.js 전용 바이너리 버퍼. (`Uint8Array`를 상속받아 구현됨)                    |

## Tagged Template Literal
