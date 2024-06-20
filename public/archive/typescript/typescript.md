---
updatedAt: 2024-06-18
directory: typescript
fileName: typescript
title: Typescript 기록하기
description: ✅
---

# Typescript 기록하기

- [any vs unknown vs never](#any-vs-unknown-vs-never)
- [옵셔널 프로퍼티](#옵셔널-프로퍼티)
- [분배적 조건부 타입 (Distributive Conditional Types)](#분배적-조건부-타입-distributive-conditional-types)
- [.d.ts](#dts)

## any vs unknown vs never

| 특성           | any                      | unknown                 | never                  |
| -------------- | ------------------------ | ----------------------- | ---------------------- |
| 사용           | 모든 타입에 할당 가능    | 모든 타입에 할당 가능   | 절대 할당 불가능       |
| 타입 검사 여부 | x                        | O                       | X                      |
| 타입 안정성    | 타입 안정성이 낮음       | 타입 안정성이 높음      | 타입 안정성이 높음     |
| 사용 예시      | Legacy 코드, 타입 미지정 | 동적 데이터, API 응답   | 함수의 반환 타입, 예외 |
| 사용 권장      | 최소한으로 사용          | 타입 안정성이 필요한 곳 | 특정 상황에서만 사용   |

## 옵셔널 프로퍼티

타입스크립트에서 옵셔널 프로퍼티(`?`)는 해당 변수가 `undefined`일 수 있다는 것을 유니온 타입으로 정의해준다.

`null` 타입은 적용되지 않으므로 따로 유니온 타입으로 정의해주어야 한다.

```ts
interface Person {
  name: string;
  age?: number; // number | undefined
  hobby?: string | null; // number | null | undefined
}
```

옵셔널 프로퍼티가 정의된 매개변수에는 초기값을 부여할 수 없다. 초기값을 부여하려면 옵셔널 프로퍼티를 제거하고 정의해야 한다.

```ts
function init(a: number, b?: number = 0) {
  ...
} // ❌

function init(a: number, b?: number) {
  ...
} // ⭕
```

## 분배적 조건부 타입 (Distributive Conditional Types)

조건부 타입은 분배적으로 동작한다. 분배적 조건부 타입은 유니온 타입에서 각 구성 요소에 대해 개별적으로 조건부 타입을 적용한다.

```ts
// Exclude null and undefined from T
type NonNullable<T> = T extends null | undefined ? never : T;

type Example = NonNullable<string | undefined | null>;
// string
```

## .d.ts

TypeScript는 정적 타입 시스템을 도입하여 JavaScript 코드의 타입 안정성을 높이고 개발자가 실수를 미연에 방지하는 데 초점을 맞추었다. 그러나 이미 존재하는 JavaScript 라이브러리와의 호환성 문제가 발생했다. 이 문제를 해결하기 위해 `.d.ts` 파일이 등장하게 되었다.

`.d.ts` 파일은 TypeScript 컴파일러에 의해 인식되어 타입 검사를 수행할 때 사용된다. 이 파일들은 JavaScript 라이브러리의 API를 설명하는 TypeScript 타입 선언을 포함하고 있다. 이러한 타입 선언 파일을 사용하면 외부 라이브러리와의 상호작용 시에도 정적 타입 검사를 수행할 수 있다. 또한, 코드 자동 완성과 IDE의 IntelliSense 기능을 향상시키는 데에도 도움이 된다.

`.ts` 파일은 표준 타입스크립트 파일로 타입스크립트 컴파일러에 의해 일반 자바스크립트 문법으로 변환되지만 `.d.ts` 파일은 타입스크립트 컴파일러에서 참조만 할 뿐 컴파일 결과물에 포함되지 않는다.

```ts
// *.js

// 변수 선언
var num = 10;

// 함수 선언
function double(x) {
  return x * 2;
}

// 객체 속성
var person = {
  name: 'Alice',
  age: 25,
  isAdmin: false,
};

// 배열
var numbers = [1, 2, 3, 4, 5];

// 콜백 함수
function processArray(arr, callback) {
  for (var i = 0; i < arr.length; i++) {
    callback(arr[i]);
  }
}
```

>

```ts
// *.d.ts

// 변수 선언
declare var num: number;

// 함수 선언
declare function double(x: number): number;

// 객체 속성
interface Person {
  name: string;
  age: number;
  isAdmin: boolean;
}
declare var person: Person;

// 배열
declare var numbers: number[];

// 콜백 함수
declare function processArray(arr: any[], callback: (item: any) => void): void;
```
