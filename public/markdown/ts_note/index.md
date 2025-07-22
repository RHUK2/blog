---
folderName: ts_note
updatedAt: 2025-02-06
title: Typescript Note
tag: typescript
isPublished: true
---

# Typescript Note

- [타입은 집합이다](#타입은-집합이다)
  - [`any`](#any)
  - [`unknown`](#unknown)
  - [`never`](#never)
  - [유니온(`|`) 타입 • 인터섹션(`&`) 타입](#유니온-타입--인터섹션-타입)
- [옵셔널 프로퍼티](#옵셔널-프로퍼티)
- [분배적 조건부 타입](#분배적-조건부-타입)
- [`declare`](#declare)
- [`ReturnType`](#returntype)
- [`null` • `undefined` 한번에 체크하기](#null--undefined-한번에-체크하기)
- [`extends` 키워드](#extends-키워드)
  - [인터페이스 확장](#인터페이스-확장)
  - [제네릭 제약 (Generic Constraints)](#제네릭-제약-generic-constraints)
  - [조건부 타입 (Conditional Types)](#조건부-타입-conditional-types)
  - [infer 키워드와 함께 사용](#infer-키워드와-함께-사용)
- [Promise](#promise)
- [as const](#as-const)
- [`as const`의 주요 동작 원리 및 효과](#as-const의-주요-동작-원리-및-효과)
  - [1. 리터럴 타입으로 추론 (Narrowing Literal Types)](#1-리터럴-타입으로-추론-narrowing-literal-types)
  - [2. 읽기 전용(Readonly) 속성 부여](#2-읽기-전용readonly-속성-부여)
- [`as const` 사용 시 주의사항](#as-const-사용-시-주의사항)
- [`as const`의 활용 예시](#as-const의-활용-예시)
  - [1. 유니언 타입 활용](#1-유니언-타입-활용)
  - [2. 함수 인자의 불변성 보장](#2-함수-인자의-불변성-보장)

## 타입은 집합이다

![img](images/type_hierarchy.png)

- 위 계층도는 타입스크립트 컴파일러 옵션 중 `strictNullCheck` 옵션이 `true`인 경우에 해당한다.
- 타입을 집합으로 생각하면 상위 집합에 하위 집합을 할당할 수 있지만, 하위 집합에 상위 집합은 할당 불가능하다.

### `any`

- `any`는 `unknown`을 제외하면 전체 집합이고, 다른 모든 타입의 상위 타입이기 때문에 다른 모든 타입은 `any`로 할당 가능하다.

```ts
  const a: any = 1; // number -> any
  const b: any = 'hello'; // string -> any
  const c: any = true; // boolean -> any
  const d: any = null; // null -> any
  const e: any = undefined; // undefined -> any
  const f: any = []; // Array -> any
  const g: any = {}; // Object -> any
  const h: any = () => {}; // Function -> any
  ...
```

- `any`는 타입 시스템의 제약을 제거하므로, 타입 안정성을 포기해야 한다. 가능한 사용을 피해야한다.

### `unknown`

- `unknown`은 전체 집합이고, 다른 모든 타입의 상위 타입이기 때문에 다른 모든 타입은 `unknown`으로 할당 가능하다.

  ```ts
  const a: unknown = 1; // number -> unknown
  const b: unknown = 'hello'; // string -> unknown
  const c: unknown = true; // boolean -> unknown
  const d: unknown = null; // null -> unknown
  const e: unknown = undefined; // undefined -> unknown
  const f: unknown = []; // Array -> unknown
  const g: unknown = {}; // Object -> unknown
  const h: unknown = () => {}; // Function -> unknown
  ...
  ```

- 예외적으로 `any` 타입으로 다운캐스팅이 가능하다.

  ```ts
  let ANY: any;
  let UNKNOWN: unknown;

  ANY = UNKNOWN; // unknown -> any
  ```

- `unknown` 타입의 경우 타입 가드를 통해 타입을 좁혀주어야 하기 때문에 타입 안정성이 존재한다.

  ```ts
  try {
    // ...
  } catch (error) {
    if (error instanceof TypeError) {
      // ...
    } else if (error instanceof ReferenceError) {
      // ...
    } else {
      // ...
    }
  }
  ```

### `never`

- `never`는 공집합이고, 다른 모든 타입의 하위 타입이기 때문에 다른 모든 타입으로 할당 가능하다.

  ```ts
  function throwError(message: string): never {
    throw new Error(message);
  }

  let neverVar: never = throwError('error');

  const a: number = neverVar; // never -> number
  const b: string = neverVar; // never -> string
  const c: boolean = neverVar; // never -> boolean
  const d: null = neverVar; // never -> null
  const e: undefined = neverVar; // never -> undefined
  const f: [] = neverVar; // never -> Array
  const g: {} = neverVar; // never -> Object
  const h: () => {} = neverVar; // never -> Function
  ...
  ```

- `never` 타입은 결코 발생할 수 없는 값을 나타내며, 주로 예외를 던지거나 무한 루프를 표현할 때 사용된다.

  ```ts
  // 함수가 오류를 발생시킬 때:
  function throwError(message: string): never {
    throw new Error(message);
  }
  ```

  ```ts
  // 함수가 무한 루프를 돌 때:
  function infiniteLoop(): never {
    while (true) {}
  }
  ```

  ```ts
  // 타입에 따라 절대 발생하지 않을 케이스를 처리할 때:
  type SomeType = 'A' | 'B';

  function handleType(x: SomeType): string {
    switch (x) {
      case 'A':
        return 'Type A';
      case 'B':
        return 'Type B';
      default:
        const check: never = x;
        return check;
    }
  }
  ```

- `never` 타입을 이용하여 코드를 작성할 때, 모든 가능한 케이스를 처리하고 있음을 보장할 수 있다. 이로 인해 코드의 안전성과 예측 가능성이 향상된다.

### 유니온(`|`) 타입 • 인터섹션(`&`) 타입

```ts
type Type1 = number | string; // 서로소 합집합
function foo1(bar1: Type1) {
  // bar1 : number | string(타입 좁히기 전 공통메서드 사용 가능)
  if (typeof bar1 === 'number') {
    // bar1: number
  } else if (typeof bar1 === 'string') {
    // bar1: string
  } else {
    const never: never = bar1;
    return never;
  }
}

type Type2 = number & string; // 서로소 교집합(공집합)
function foo2(bar2: Type2) {
  const never: never = bar2;
  return never;
}

type Type3 = 3 | number; // 상위/하위집합 합집합
function foo3(bar3: Type3) {
  if (typeof bar3 === 'number') {
    // bar3: number
  } else {
    const never: never = bar3;
    return never;
  }
}

type Type4 = 3 & number; // 상위/하위집합 교집합
function foo4(bar4: Type4) {
  if (bar4 === 3) {
    // bar4: 3
  } else {
    const never: never = bar4;
    return never;
  }
}

interface A {
  a: number;
  b: number;
  c: number;
}

interface B {
  a: number;
  b: string;
  d: number;
}

type Type5 = A | B; // 합집합
function foo5(bar5: Type5) {
  // bar5.a: number
  // bar5.b: number | string(타입 좁히기 전 공통메서드 사용 가능)
  if ('c' in bar5) {
    // bar5: interface A
  } else if ('d' in bar5) {
    // bar5: interface B
  } else {
    const never: never = bar5;
    return never;
  }
}

type Type6 = A & B; // 교집합
function foo6(bar6: Type6) {
  // bar6.a: number
  // bar6.b: never
  // bar6.c: number
  // bar6.d: number
}

interface C {
  x: number;
}

interface D {
  x: number;
  y: number;
}

type Type7 = C | D; // 상위/하위집합 합집합
function foo7(bar7: Type7) {
  // bar7.x: number
}

type Type8 = C & D; // 상위/하위집합 교집합
function foo8(bar8: Type8) {
  // bar8.x: number
  // bar8.y: number
}
```

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
function init(a: number , b?: number = 0) {
  ...
} // ❌

function init(a: number, b: number = 0) {
  ...
} // ⭕
```

## 분배적 조건부 타입

조건부 타입은 분배적으로 동작한다. 분배적 조건부 타입은 유니온 타입에서 각 구성 요소에 대해 개별적으로 조건부 타입을 적용한다.

```ts
// Exclude null and undefined from T
type NonNullable<T> = T extends null | undefined ? never : T;

type Example = NonNullable<string | undefined | null>;
// typeof Example === 'string'
```

## `declare`

- `declare`는 타입 정보만 제공하며, 실제 구현은 포함하지 않는다.
- `declare` 없이 타입을 정의하면, TypeScript는 해당 코드가 구현되어 있다고 가정한다.

▾ 사용 예시:

- 외부 자바스크립트 라이브러리의 타입 선언

  ```ts
  declare module 'my-library' {
    export function doSomething(): void;
  }
  ```

- 전역 스코프에 존재하는 변수나 함수의 타입을 선언

  ```ts
  declare const Kakao: Kakao;

  declare const turnstile: Turnstile.Turnstile;
  ```

- 타입 정의 파일(`.d.ts`)에서 사용

|             | `.ts`                             | `.d.ts`                          |
| ----------- | --------------------------------- | -------------------------------- |
| 내용        | 실제 구현 코드와 타입 정보를 포함 | 타입 정보만 포함                 |
| 컴파일 대상 | JavaScript로 컴파일됨             | 컴파일되지 않음 타입 정보만 제공 |

## `ReturnType`

`ReturnType`은 함수 타입으로부터 반환 타입을 추론하는 데 사용된다. 즉, 특정 함수가 반환하는 값의 타입을 추출한다.

```ts
type returnFuncType = ReturnType<typeof func>;
```

▾ 실무 사용 사례:

브라우저의 Web API와 Node.js의 환경에 따라 `setTimeout`이 반환하는 값이 다를 수 있다.

- 브라우저 환경에서는 `setTimeout`이 `number`를 반환한다. (`timer ID`: 특정 타이머를 식별하기 위한 숫자)
- Node.js 환경에서는 `setTimeout`이 `NodeJS.Timeout` 객체를 반환한다.

`ReturnType<typeof setTimeout>`을 사용하면 환경에 따른 반환 타입 차이를 자동으로 처리할 수 있다.

```ts
type TimerType = ReturnType<typeof setTimeout>;

let timer: TimerType;

timer = setTimeout(() => console.log('Hello'), 1000);

clearTimeout(timer);
```

## `null` • `undefined` 한번에 체크하기

```ts
const temp = null;

if (temp == null) {
  console.log(temp); // null
}
```

```ts
const temp = undefined;

if (temp == null) {
  console.log(temp); // undefined
}
```

## `extends` 키워드

TypeScript에서 `extends` 키워드는 상속, 제네릭 제약, 조건부 타입 등 다양한 용도로 사용된다.

### 인터페이스 확장

```ts
interface Shape {
  color: string;
}

interface Square extends Shape {
  sideLength: number;
}

interface Circle extends Shape {
  radius: number;
}

// 다중 확장
interface ColoredSquare extends Shape, Square {
  border: string;
}
```

### 제네릭 제약 (Generic Constraints)

```ts
// T는 반드시 length 프로퍼티를 가져야 함
function logLength<T extends { length: number }>(arg: T): T {
  console.log(arg.length);
  return arg;
}

logLength('hello'); // ✅ string has length
logLength([1, 2, 3]); // ✅ array has length
logLength({ length: 10, value: 3 }); // ✅ object has length
// logLength(123); // ❌ number doesn't have length
```

```ts
// keyof를 사용한 제약
function getProperty<T, K extends keyof T>(obj: T, key: K): T[K] {
  return obj[key];
}

const person = { name: 'John', age: 30, city: 'Seoul' };
const name = getProperty(person, 'name'); // string
const age = getProperty(person, 'age'); // number
// const invalid = getProperty(person, "invalid"); // ❌ 존재하지 않는 키
```

### 조건부 타입 (Conditional Types)

```ts
// T가 string을 확장하면 true, 아니면 false
type IsString<T> = T extends string ? true : false;

type Test1 = IsString<string>; // true
type Test2 = IsString<number>; // false
type Test3 = IsString<'hello'>; // true (string literal은 string을 확장)
```

```ts
// 내장 유틸리티 타입들의 구현 예시
type MyNonNullable<T> = T extends null | undefined ? never : T;
type MyReturnType<T> = T extends (...args: any[]) => infer R ? R : never;
type MyParameters<T> = T extends (...args: infer P) => any ? P : never;

function example(a: string, b: number): boolean {
  return true;
}

type ExampleReturn = MyReturnType<typeof example>; // boolean
type ExampleParams = MyParameters<typeof example>; // [string, number]
```

### infer 키워드와 함께 사용

```ts
// 배열 요소 타입 추출
type ArrayElement<T> = T extends (infer U)[] ? U : never;

type StringArray = ArrayElement<string[]>; // string
type NumberArray = ArrayElement<number[]>; // number
type NotArray = ArrayElement<string>; // never
```

```ts
// Promise 내부 타입 추출
type Awaited<T> = T extends Promise<infer U> ? U : T;

type PromiseString = Awaited<Promise<string>>; // string
type RegularString = Awaited<string>; // string
```

## Promise<T>

```ts
function temp() {
  return new Promise((resolve, reject) => {
    try {
      setTimeout(() => {
        resolve('Temporary function executed');
      }, 1000);
    } catch (error) {
      reject(error);
    }
  });
}

function temp2() {
  return Promise.resolve('Temporary function executed');
}

function temp3() {
  return Promise.reject('Temporary function executed');
}

function temp4() {
  return new Promise((resolve: (value: string) => void, reject: (reason?: any) => void) => {
    try {
      setTimeout(() => {
        resolve('Temporary function executed');
      }, 1000);
    } catch (error) {
      reject(error);
    }
  })
    .then((result) => {
      console.log(result);
      return result;
    })
    .catch((error) => {
      console.error(error);
      throw error;
    });
}
```

## as const

---

`as const`는 TypeScript에서 타입 추론을 더 **엄격하고 구체적으로** 만들 때 사용하는 \*\*단언(Assertion)\*\*입니다. 변수나 리터럴에 `as const`를 붙이면, TypeScript는 해당 값의 타입을 **최대한 좁은(narrowed)** 형태로 추론하고, 그 값을 \*\*읽기 전용(readonly)\*\*으로 만듭니다.

이는 자바스크립트의 `const` 키워드와는 다릅니다. 자바스크립트의 `const`는 변수 재할당을 막을 뿐, 변수가 참조하는 값 내부의 변경은 막지 못합니다. 하지만 TypeScript의 `as const`는 **값 자체의 불변성**을 타입 수준에서 강제합니다.

---

## `as const`의 주요 동작 원리 및 효과

### 1\. 리터럴 타입으로 추론 (Narrowing Literal Types)

일반적으로 TypeScript는 리터럴 값을 만날 때 더 넓은(general) 타입으로 추론하는 경향이 있습니다. 하지만 `as const`를 사용하면 정확한 리터럴 값 타입으로 추론합니다.

```typescript
// 일반적인 추론
let str = 'hello'; // 타입: string
let num = 123; // 타입: number

// as const를 사용한 추론
let constStr = 'hello' as const; // 타입: "hello" (리터럴 타입)
let constNum = 123 as const; // 타입: 123 (리터럴 타입)

// 일반적인 객체/배열 추론
let arr = [1, 2, 3]; // 타입: number[]
let obj = { a: 1, b: 'x' }; // 타입: { a: number; b: string; }

// as const를 사용한 객체/배열 추론
let constArr = [1, 2, 3] as const;
// 타입: readonly [1, 2, 3] (tuple 타입 + readonly)

let constObj = { a: 1, b: 'x' } as const;
// 타입: { readonly a: 1; readonly b: "x"; } (리터럴 타입 + readonly)
```

위 예시에서 볼 수 있듯이, `as const`를 사용하면 문자열 `"hello"`는 `string`이 아닌 `"hello"`라는 **리터럴 타입**으로, 숫자 `123`은 `number`가 아닌 `123`이라는 **리터럴 타입**으로 추론됩니다. 이는 특히 유니언 타입이나 특정 상숫값을 다룰 때 유용합니다.

### 2\. 읽기 전용(Readonly) 속성 부여

`as const`는 객체나 배열(튜플)의 모든 속성을 \*\*재귀적으로 읽기 전용(readonly)\*\*으로 만듭니다. 이는 해당 값의 내용을 변경할 수 없음을 타입 시스템이 보장하게 합니다.

```typescript
const arr = [1, 2, 3] as const;
// arr.push(4);    // Error: Property 'push' does not exist on type 'readonly [1, 2, 3]'.
// arr[0] = 10;    // Error: Cannot assign to '0' because it is a read-only property.

const obj = {
  name: 'Alice',
  age: 30,
  skills: ['TypeScript', 'React'],
} as const;

// obj.age = 31; // Error: Cannot assign to 'age' because it is a read-only property.
// obj.skills.push("Node.js"); // Error: Property 'push' does not exist on type 'readonly ["TypeScript", "React"]'.
```

이렇게 `as const`를 사용하면, TypeScript는 해당 데이터 구조가 **절대 변경되지 않을 것임**을 확신하고 더 안전한 코드를 작성하는 데 도움을 줍니다. 이는 순수 함수(Pure Function)의 인자나 불변성(Immutability)을 강조하는 아키텍처에서 특히 유용합니다.

---

## `as const` 사용 시 주의사항

- **컴파일 시점에만 작동:** `as const`는 TypeScript의 타입 시스템에서만 동작하는 단언입니다. 런타임 자바스크립트 코드에는 영향을 미치지 않습니다. 즉, `as const`를 적용했더라도, 자바스크립트 코드만 본다면 여전히 변경 가능한 객체나 배열로 보입니다.
- **리터럴 값에만 적용:** `as const`는 리터럴 값에만 적용할 수 있습니다. 변수에 직접 적용하는 것은 의미가 없거나 오류가 발생할 수 있습니다.
  ```typescript
  let x = 5;
  // let y = x as const; // 오류 또는 의도와 다른 동작
  // `x` 자체가 이미 `number` 타입이므로 `y`도 `number`로 추론됩니다.
  // `as const`는 `5`와 같은 리터럴에 직접 적용될 때 강력합니다.
  ```
- **외부 모듈의 값:** 외부 모듈에서 임포트한 변수나 함수 반환 값에는 `as const`를 직접 적용하기 어렵습니다. 해당 모듈이 이미 읽기 전용 타입을 제공하거나, `as const`를 적용할 수 있는 형태로 값을 export 해야 합니다.

---

## `as const`의 활용 예시

### 1\. 유니언 타입 활용

`as const`를 사용하여 특정 문자열 리터럴들의 배열을 정의하고, 이를 유니언 타입으로 활용할 때 매우 유용합니다.

```typescript
const COLORS = ['red', 'green', 'blue'] as const;
// COLORS의 타입: readonly ["red", "green", "blue"]

type Color = (typeof COLORS)[number];
// Color의 타입: "red" | "green" | "blue" (유니언 타입)

let myColor: Color = 'red'; // OK
// let anotherColor: Color = "yellow"; // Error: Type '"yellow"' is not assignable to type 'Color'.
```

이렇게 하면 `COLORS` 배열에 새로운 색상이 추가될 때 `Color` 타입도 자동으로 업데이트되어 타입 안전성을 유지할 수 있습니다.

### 2\. 함수 인자의 불변성 보장

함수 인자가 객체나 배열일 때, 그 내용이 함수 내부에서 변경되지 않음을 보장하고 싶을 때 `as const`를 사용할 수 있습니다.

```typescript
function processConfig(config: { readonly debugMode: boolean; readonly settings: readonly string[] }) {
  // config.debugMode = true; // Error: Cannot assign to 'debugMode' because it is a read-only property.
  // config.settings.push("newSetting"); // Error: Property 'push' does not exist on type 'readonly string[]'.
  console.log(config);
}

const myConfig = {
  debugMode: false,
  settings: ['log', 'cache'],
} as const;

processConfig(myConfig); // OK, 타입 안전하게 전달
```
