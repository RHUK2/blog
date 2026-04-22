---
folderName: js_mutable_immutable
title: 가변성(Mutable)과 불변성(Immutable)
tag: javascript
isPublished: true
---

# 가변성(Mutable)과 불변성(Immutable)

- [원시 타입과 참조 타입의 메모리 할당](#원시-타입과-참조-타입의-메모리-할당)
  - [불변 객체(Immutable Object)](#불변-객체immutable-object)
  - [가변 객체(Mutable Object)](#가변-객체mutable-object)
- [불변성을 유지하며 데이터 조작하기](#불변성을-유지하며-데이터-조작하기)
  - [배열 조작 (추가, 삭제, 삽입, 교환)](#배열-조작-추가-삭제-삽입-교환)
  - [객체 및 배열 수정 (Update, Replace)](#객체-및-배열-수정-update-replace)
  - [객체 불변성 강제 (Object.freeze / Object.seal)](#객체-불변성-강제-objectfreeze--objectseal)
- [복사(Copy)의 종류](#복사copy의-종류)
  - [얕은 복사(Shallow Copy)](#얕은-복사shallow-copy)
  - [깊은 복사(Deep Copy)](#깊은-복사deep-copy)
- [불변성이 중요한 이유](#불변성이-중요한-이유)

## 원시 타입과 참조 타입의 메모리 할당

자바스크립트에서 데이터 타입은 메모리에 저장되는 방식에 따라 크게 두 가지로 나뉜다.

### 불변 객체(Immutable Object)

원시 타입(Primitive Type)은 한 번 생성되면 그 값을 변경할 수 없다. 변수에 새로운 값을 할당하면 기존 메모리 공간의 값을 바꾸는 것이 아니라, 새로운 메모리 공간을 확보하여 값을 저장하고 변수가 그곳을 가리키게 한다.

- 종류: `Number`, `String`, `Boolean`, `null`, `undefined`, `Symbol`, `BigInt`
- 특징: 값 자체가 복사되어 전달됨(Pass by Value)

### 가변 객체(Mutable Object)

참조 타입(Reference Type)은 객체의 내용이 변경되어도 메모리 주소(참조값)는 그대로 유지될 수 있다. 프로퍼티를 추가하거나 삭제할 때 기존 객체 자체가 수정된다.

- 종류: `Object`, `Array`, `Function`, `RegExp` 등 모든 객체
- 특징: 주소값이 복사되어 전달됨(Pass by Reference)

## 불변성을 유지하며 데이터 조작하기

원본 데이터를 직접 수정하지 않고, 새로운 객체나 배열을 생성하여 반환하는 방식이다.

### 배열 조작 (추가, 삭제, 삽입, 교환)

- 추가(Append/Prepend): 전개 연산자(`...`)를 사용해 새 배열을 생성함
  - `const append = (arr, item) => [...arr, item];`
  - `const prepend = (arr, item) => [item, ...arr];`
- 삭제(Remove): `filter` 메서드를 사용해 조건에 맞는 요소만 제외한 새 배열을 생성함
  - `const remove = (arr, id) => arr.filter(item => item.id !== id);`
- 삽입(Insert): `slice`로 분할한 뒤 결합함
  - `const insert = (arr, index, item) => [...arr.slice(0, index), item, ...arr.slice(index)];`
- 교환(Swap): 복사본에서 구조 분해 할당을 사용함
  - `const swap = (arr, i, j) => { const next = [...arr]; [next[i], next[j]] = [next[j], next[i]]; return next; };`

전통적인 방법은 임시 변수에 한쪽 값을 먼저 보관한 뒤 순서대로 덮어쓴다.

```ts
const temp = next[i]; // 1. next[i] 값을 임시 저장
next[i] = next[j]; // 2. next[i] 자리에 next[j] 값을 씀
next[j] = temp; // 3. next[j] 자리에 보관해둔 원래 next[i] 값을 씀
```

구조 분해 할당을 사용하면 임시 변수 없이 한 줄로 같은 결과를 얻을 수 있다.

```ts
[next[i], next[j]] = [next[j], next[i]];
```

우변 `[next[j], next[i]]`는 새 배열 리터럴로, 평가 시점에 `next[j]`와 `next[i]`의 현재 값을 순서대로 읽어 **임시 배열**을 생성한다. 이후 좌변 패턴에 따라 첫 번째 값이 `next[i]`에, 두 번째 값이 `next[j]`에 각각 할당된다. 우변이 먼저 완전히 평가되므로, 할당 도중 원래 값이 덮어써지는 문제가 발생하지 않는다.

### 객체 및 배열 수정 (Update, Replace)

- 부분 수정(Update): `map`과 객체 전개 연산자를 조합함
  - `const update = (arr, id, newName) => arr.map((item) => (item.id === id ? { ...item, name: newName } : item));`
- 전체 교체(Replace): ES2023에 추가된 배열 전용 메서드인 `Array.prototype.with()`를 사용하면 간결하게 특정 인덱스의 값을 교체한 새 배열을 얻을 수 있음
  - `const replace = (arr, index, newItem) => arr.with(index, newItem);`

### 객체 불변성 강제 (Object.freeze / Object.seal)

새 객체를 생성하는 방식과 달리, 런타임에서 기존 객체의 변경 자체를 차단하는 방법이다.

- `Object.freeze(obj)`: 속성 추가·삭제·수정을 모두 차단함. 단, 중첩 객체에는 적용되지 않는 얕은 동결(Shallow Freeze)임
- `Object.seal(obj)`: 속성 추가·삭제는 차단하지만 기존 속성 값의 수정은 허용함

| 동작           | `Object.freeze`    | `Object.seal` |
| -------------- | ------------------ | ------------- |
| 속성 추가      | 불가               | 불가          |
| 속성 삭제      | 불가               | 불가          |
| 속성 값 수정   | 불가               | 가능          |
| 중첩 객체 적용 | 미적용 (얕은 동결) | 미적용        |

## 복사(Copy)의 종류

### 얕은 복사(Shallow Copy)

객체의 최상위 속성만 복사하며, 내부에 중첩된 객체는 참조 주소를 공유한다. 전개 연산자나 `Object.assign()`이 이 방식에 해당한다.

### 깊은 복사(Deep Copy)

중첩된 객체까지 모두 새로운 메모리 공간에 복사한다.

- `JSON.parse(JSON.stringify(obj))`: 간편하지만 함수, `Symbol`, `undefined` 등은 유실됨
- `structuredClone(obj)`: 최신 브라우저 표준 API로, 대부분의 데이터 타입을 안전하게 깊은 복사함

## 불변성이 중요한 이유

- 예측 가능성: 데이터가 변하지 않으므로 부수 효과(Side Effect)를 방지하고 디버깅을 쉽게 만듦
- 동시성 안전: 여러 곳에서 동시에 데이터를 참조해도 값이 변할 염려가 없어 안전함
- 이력 관리: 이전 상태의 참조를 유지할 수 있어 실행 취소(Undo) 기능을 구현하기 쉬움
