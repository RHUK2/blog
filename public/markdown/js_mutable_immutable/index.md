---
folderName: js_mutable_immutable
updatedAt: 2025-03-17
title: Mutable vs Immutable
tag: javascript
isPublished: true
---

# Mutable vs Immutable

- [Immutable(Pass By Value)](#immutablepass-by-value)
- [Mutable(Pass By Reference)](#mutablepass-by-reference)
- [Mutable 데이터를 Immutable 데이터처럼 다루기](#mutable-데이터를-immutable-데이터처럼-다루기)
  - [얕은 복사](#얕은-복사)
  - [깊은 복사](#깊은-복사)
    - [직렬화(`JSON.stringify()`)가 불가능한 객체](#직렬화jsonstringify가-불가능한-객체)
    - [`null` • `undefined` 직렬화 차이](#null--undefined-직렬화-차이)
- [Immutable 데이터를 사용하는 이유](#immutable-데이터를-사용하는-이유)

## Immutable(Pass By Value)

![img](images/pass_by_value_1.png)
![img](images/pass_by_value_2.png)
![img](images/pass_by_value_3.png)
![img](images/pass_by_value_4.png)

## Mutable(Pass By Reference)

![img](images/pass_by_reference_1.png)
![img](images/pass_by_reference_2.png)
![img](images/pass_by_reference_3.png)
![img](images/pass_by_reference_4.png)

## Mutable 데이터를 Immutable 데이터처럼 다루기

### 얕은 복사

객체의 최상위 수준만 복사, 내부 객체는 참조로 복사된다.

```ts
const arr = [1, 2, 3];
const copyArr = [...originalArr, 4];

const obj = { name: 'Alice', age: 25 };
const copyObj = { ...originalObj, age: 26 };

console.log(arr === copyArr); // false
console.log(obj === copyObj); // false
```

### 깊은 복사

객체의 모든 수준을 재귀적으로 복사, 내부 객체도 새로 생성된다.

```ts
const object = {
  person: {
    age: 20,
    name: 'Tomas',
  },
  country: 'Korea',
};

const copyObject = JSON.parse(JSON.stringify(object));

console.log(object === copyObject); // false
```

#### 직렬화(`JSON.stringify()`)가 불가능한 객체

- 함수

  - 함수는 직렬화할 수 없다. 함수는 코드와 상태를 가지고 있어 일련의 바이트로 단순히 표현하기 어렵다.

- 심볼

  - ES6에서 추가된 심볼(Symbol)은 직렬화할 수 없다.

- 특별한 객체

  - 일부 브라우저나 환경에서 제공하는 특수한 객체들은 직렬화가 불가능할 수 있다.

- 일부 자바스크립트 내장 객체

  - 특정 내장 객체들은 직렬화가 어려울 수 있다. 예를 들어, `Error` 객체와 같은 것들은 일부 직렬화 형식에서는 문제를 일으킬 수 있다.

#### `null` • `undefined` 직렬화 차이

```js
console.log(
  JSON.stringfy({
    name: null,
    age: 30,
    gender: undefine,
  }),
); // {"name":null,"age":30}
```

`null`의 경우 값으로 인정되고, `undefined`의 경우 삭제해버린다.

## Immutable 데이터를 사용하는 이유

- 예측 가능성

  - 데이터가 변경되지 않으므로, 프로그램의 동작을 예측하기 쉬움.
  - 버그 발생 가능성이 줄어듦.

- 성능 최적화

  - 변경 불가능한 데이터는 메모리에서 재사용 가능(예: 문자열 풀링).
  - React 등의 라이브러리에서 상태 변경 감지 시, 얕은 비교(shallow comparison)만으로도 변경 여부를 판단 가능.

- 동시성 및 멀티스레딩

  - 데이터가 변경되지 않으므로, 동시성 문제(예: 경쟁 조건)가 발생하지 않음.
  - 멀티스레드 환경에서 안전하게 사용 가능.

- 디버깅 및 테스트 용이성

  - 데이터가 변경되지 않으므로, 디버깅 시 상태 추적이 용이.
  - 테스트 케이스 작성이 간편해짐.

- 함수형 프로그래밍 지원

  - 순수 함수와 조합하여 사용하기 적합.
  - 부수 효과(side effect)가 없어, 코드의 신뢰성이 높아짐.
