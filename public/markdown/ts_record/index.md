---
folderName: typescript_record
updatedAt: 2024-06-18
title: Typescript 기록하기
tag: typescript
isPublished: false
---

# Typescript 기록하기

- [타입은 집합이다](#타입은-집합이다)
  - [`any`](#any)
  - [`unknown`](#unknown)
  - [`never`](#never)
  - [유니온(`|`) 타입과 인터섹션(`&`) 타입](#유니온-타입과-인터섹션-타입)
- [옵셔널 프로퍼티](#옵셔널-프로퍼티)
- [분배적 조건부 타입](#분배적-조건부-타입)
- [`.ts`와 `.d.ts`](#ts와-dts)
- [ReturnType](#returntype)

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

### 유니온(`|`) 타입과 인터섹션(`&`) 타입

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

## `.ts`와 `.d.ts`

`.ts` 파일:

- 실제 구현과 타입 정보를 모두 포함한다.

`d.ts` 파일:

- 실제 구현은 포함하지 않고, 오직 타입 정보만 포함한다.
- 일반적으로 JavaScript 라이브러리와 함께 사용하여 TypeScript가 해당 라이브러리를 인식하도록 도와준다.

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

## ReturnType<typeof setTimeout>
