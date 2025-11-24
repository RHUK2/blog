---
folderName: js_mutable_immutable
title: Mutable vs Immutable
tag: javascript
isPublished: true
---

# Mutable vs Immutable

- [Immutable(Pass By Value)](#immutablepass-by-value)
- [Mutable(Pass By Reference)](#mutablepass-by-reference)
- [Mutable 데이터를 Immutable 데이터처럼 다루기](#mutable-데이터를-immutable-데이터처럼-다루기)
  - [Append (뒤에 추가)](#append-뒤에-추가)
  - [Prepend (앞에 추가)](#prepend-앞에-추가)
  - [Remove (삭제)](#remove-삭제)
  - [Insert (중간 삽입)](#insert-중간-삽입)
  - [Swap (위치 교환)](#swap-위치-교환)
  - [Move (이동)](#move-이동)
  - [Update (부분 수정)](#update-부분-수정)
  - [Replace (교체)](#replace-교체)
  - [얕은 복사](#얕은-복사)
  - [깊은 복사](#깊은-복사)
    - [직렬화(`JSON.stringify()`)가 불가능한 객체](#직렬화jsonstringify가-불가능한-객체)
    - [`null` • `undefined` 직렬화 차이](#null--undefined-직렬화-차이)
  - [2차원 배열 생성](#2차원-배열-생성)
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

### Append (뒤에 추가)

기존 배열을 펼치고(`...`) 맨 뒤에 새 요소를 붙인다.

```ts
const append = (arr, newItem) => [...arr, newItem];
```

### Prepend (앞에 추가)

새 요소를 먼저 놓고, 그 뒤에 기존 배열을 펼친다.

```ts
const prepend = (arr, newItem) => [newItem, ...arr];
```

### Remove (삭제)

`filter`를 사용하여 특정 조건(인덱스나 ID)에 맞지 않는 요소만 남긴다.

```ts
// 인덱스로 삭제
const removeByIndex = (arr, indexToRemove) => arr.filter((_, index) => index !== indexToRemove);

// ID로 삭제
const removeById = (arr, id) => arr.filter((item) => item.id !== id);
```

### Insert (중간 삽입)

`slice`를 사용하여 삽입할 위치 앞부분과 뒷부분을 자르고 그 사이에 새 요소를 넣는다.

```ts
const insert = (arr, index, newItem) => [...arr.slice(0, index), newItem, ...arr.slice(index)];
```

### Swap (위치 교환)

배열을 복사한 후, 구조 분해 할당을 이용해 두 인덱스의 값을 맞바꾼다.

```ts
const swap = (arr, indexA, indexB) => {
  const next = [...arr]; // 복사
  [next[indexA], next[indexB]] = [next[indexB], next[indexA]]; // 교환
  return next;
};
```

### Move (이동)

배열을 복사한 후, 요소를 잘라내고(`splice`) 새로운 위치에 다시 끼워 넣는다(`splice`).

```ts
const move = (arr, fromIndex, toIndex) => {
  const next = [...arr];
  const [item] = next.splice(fromIndex, 1); // 추출
  next.splice(toIndex, 0, item); // 삽입
  return next;
};
```

### Update (부분 수정)

배열 내 객체의 특정 속성만 변경하고 나머지 속성은 유지할 때 사용한다.
`map`을 순회하며 조건에 맞는 요소를 찾고, 전개 연산자(`...item`)를 사용하여 기존 값을 복사한 뒤 변경할 속성만 덮어쓴다.

```ts
// id가 targetId인 요소의 name만 변경
const update = (arr, targetId, newName) =>
  arr.map((item) =>
    item.id === targetId
      ? { ...item, name: newName } // 기존 속성 유지(...item) + name만 변경
      : item,
  );
```

### Replace (교체)

배열 내의 요소를 완전히 새로운 값으로 대체할 때 사용한다.
이전 객체의 속성을 유지할 필요가 없을 때 유용하다.

방법 A: 조건으로 교체 (`map` 사용)

```ts
// id가 targetId인 요소를 newItem으로 통째로 교체
const replaceById = (arr, targetId, newItem) => arr.map((item) => (item.id === targetId ? newItem : item));
```

방법 B: 인덱스로 교체 (복사 후 할당)
인덱스를 이미 알고 있다면 배열을 복사한 후 직접 할당하는 것이 직관적이다.

```ts
const replaceAt = (arr, index, newItem) => {
  const next = [...arr]; // 1. 배열 복사
  next[index] = newItem; // 2. 해당 인덱스 값 교체
  return next; // 3. 반환
};
```

방법 C: 인덱스로 교체 (ES2023 `with` 메서드)
최신 자바스크립트 환경에서는 `with`를 사용하여 더 간결하게 작성할 수 있다. (불변성 자동 유지)

```ts
const replaceAt = (arr, index, newItem) => arr.with(index, newItem);
```

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

```ts
console.log(
  JSON.stringfy({
    name: null,
    age: 30,
    gender: undefine,
  }),
); // {"name":null,"age":30}
```

`null`의 경우 값으로 인정되고, `undefined`의 경우 삭제해버린다.

### 2차원 배열 생성

```ts
Array.from({ length: 5 }, () => Array.from({ length: 5 }, (_, index) => ({ id: index })));
```

- `Array.from`을 사용하여 외부 배열과 내부 배열을 각각 독립적으로 생성함.
- 내부 배열의 요소는 새로운 객체로, 각 객체는 독립적인 메모리 공간을 가짐.
- `arr[0][0].id = 1`과 같이 특정 요소를 수정해도 다른 요소에는 영향을 미치지 않음.

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
