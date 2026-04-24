---
folderName: js
title: JavaScript
tag: javascript
isPublished: true
---

# 자바스크립트(Javascript)

- [기초 개념](#기초-개념)
  - [코드의 구성 요소 (값 • 리터럴 • 표현식 • 문)](#코드의-구성-요소-값--리터럴--표현식--문)
  - [프로그래밍 기초 개념 (인수 • 인자 • 함수)](#프로그래밍-기초-개념-인수--인자--함수)
  - [일급 객체(First-class Object)](#일급-객체first-class-object)
- [연산자와 구문](#연산자와-구문)
  - [논리 연산자 단락 평가](#논리-연산자-단락-평가)
  - [구조 분해 할당 기본값](#구조-분해-할당-기본값)
  - [태그드 템플릿 리터럴(Tagged Template Literal)](#태그드-템플릿-리터럴tagged-template-literal)
- [자료구조와 내장 메서드](#자료구조와-내장-메서드)
  - [데이터 구조 비교 (유사 배열 • 이터러블)](#데이터-구조-비교-유사-배열--이터러블)
  - [sort 메서드와 다국어 정렬](#sort-메서드와-다국어-정렬)
  - [숫자 변환 함수 비교](#숫자-변환-함수-비교)
- [바이너리 데이터 객체](#바이너리-데이터-객체)

## 기초 개념

### 코드의 구성 요소 (값 • 리터럴 • 표현식 • 문)

1. 값(Value): 식(Expression)이 평가되어 생성된 결과물임
2. 리터럴(Literal): 사람이 이해할 수 있는 문자나 기호를 사용하여 값을 생성하는 표기법임 (예: `10`, `'Hello'`, `{}`)
3. 표현식(Expression): 값으로 평가될 수 있는 문(Statement)의 조각임
4. 문(Statement): 프로그램을 구성하는 기본 단위이자 최소 실행 단위임 (예: 선언문, 할당문, 조건문, 반복문)

### 프로그래밍 기초 개념 (인수 • 인자 • 함수)

- 인수(Argument): 함수를 호출할 때 전달하는 실제 값임
- 인자(Parameter): 함수 정의 시 선언하는 매개변수 변수임
- 순수 함수(Pure Function):
  - 동일한 입력에 대해 항상 동일한 결과를 반환함
  - 부수 효과(Side Effect)가 없어 외부 상태를 변경하지 않음
- 비순수 함수(Impure Function):
  - 외부 상태에 의존하거나 값을 변경하여 결과가 달라질 수 있음

### 일급 객체(First-class Object)

자바스크립트의 함수는 일급 객체로 취급된다.

- 변수나 자료구조에 할당 가능함
- 다른 함수의 인자로 전달 가능함
- 함수의 반환값으로 사용 가능함

## 연산자와 구문

### 논리 연산자 단락 평가

단락 평가(Short-circuit Evaluation)는 논리 연산 시 결과가 확정된 시점에서 평가를 중단하는 방식이다.

- `||` (OR) 연산자:
  - 첫 번째 '참(Truthy)' 값을 만나면 평가를 멈추고 해당 값을 반환함
  - 모든 값이 '거짓(Falsy)'이면 마지막 값을 반환함
- `&&` (AND) 연산자:
  - 첫 번째 '거짓' 값을 만나면 평가를 멈추고 해당 값을 반환함
  - 모든 값이 '참'이면 마지막 값을 반환함

```ts
const a = null || undefined || 'fallback'; // 'fallback'
const b = 'value' && 'end'; // 'end'
```

### 구조 분해 할당 기본값

구조 분해 할당 시 설정한 기본값은 해당 값이 정확히 `undefined`일 때만 적용된다. `null`, `0`, `false` 등은 값으로 취급되어 기본값이 적용되지 않는다.

### 태그드 템플릿 리터럴(Tagged Template Literal)

템플릿 리터럴을 함수로 파싱하여 처리하는 방식이다. 문자열 조각 배열과 표현식의 결과값들을 인자로 받는다.

```ts
function highlight(strings, ...values) {
  return strings.reduce((acc, str, i) => `${acc}${str}<span>${values[i] || ''}</span>`, '');
}

const name = 'Alice';
const result = highlight`Hello, ${name}!`;
// result: "Hello, <span>Alice</span>!"
```

## 자료구조와 내장 메서드

### 데이터 구조 비교 (유사 배열 • 이터러블)

| 구분 | 유사 배열 객체(Array-like Object)     | 이터러블 객체(Iterable Object)       |
| ---- | ------------------------------------- | ------------------------------------ |
| 본질 | `length` 속성과 인덱스를 가진 객체    | `Symbol.iterator` 메서드를 가진 객체 |
| 순회 | `for...of` 사용 불가 (배열 변환 필요) | `for...of`, 전개 연산자 사용 가능    |
| 예시 | `arguments`, `NodeList`, `String`     | `Array`, `Map`, `Set`, `String`      |
| 특징 | 배열 메서드를 직접 호출할 수 없음     | 순회(Iteration) 프로토콜을 준수함    |

### sort 메서드와 다국어 정렬

`sort()`는 기본적으로 요소를 문자열로 변환하여 유니코드 포인트 순으로 정렬한다.

- 숫자 정렬: `(a, b) => a - b` 형태의 비교 함수가 필요함
- 다국어 및 대소문자 정렬: `localeCompare()`를 사용하여 언어별 규칙을 적용함

```ts
const list = ['äpple', 'zebra', 'österreich'];
list.sort((a, b) => a.localeCompare(b, 'sv')); // 스웨덴어 기준 정렬
```

### 숫자 변환 함수 비교

- `Number()`: 전체가 숫자여야 변환 가능하며, 빈 문자열은 `0`으로 처리함
- `parseInt()`: 정수만 추출하며, 숫자 뒤에 문자가 있어도 앞부분만 변환함
- `parseFloat()`: 소수점을 포함하여 변환하며, `parseInt`와 유사하게 동작함

## 바이너리 데이터 객체

- `ArrayBuffer`: 고정 길이의 순수 바이너리 데이터 버퍼임
- `TypedArray`: `ArrayBuffer`의 내용을 특정 타입(Uint8 등)으로 읽고 쓰는 뷰(View)임
- `Blob`: 불변의 바이너리 데이터 덩어리(이미지, 파일 등)임
- `Buffer`: Node.js 전용 바이너리 처리 객체임
