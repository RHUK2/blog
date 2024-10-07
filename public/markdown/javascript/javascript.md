---
updatedAt: 2024-04-29
directory: javascript
fileName: javascript
title: Javascript 기록하기
description:
---

# Javascript 기록하기

- [값, 리터럴, 표현식, 문](#값-리터럴-표현식-문)
- [parse](#parse)
- [논리 연산자 단락 평가](#논리-연산자-단락-평가)
- [자바스크립트 값의 종류](#자바스크립트-값의-종류)
- [file input 동일한 파일 입력 시 onChange 동작](#file-input-동일한-파일-입력-시-onchange-동작)
- [sort](#sort)
- [class](#class)
- [시간 구하기](#시간-구하기)
- [2차원 배열 생성 시 Array.fill](#2차원-배열-생성-시-arrayfill)

## 값, 리터럴, 표현식, 문

| 종류               | 설명                                                                                                                                                                                                                                                                     |
| ------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| 값(Value)          | 표현식이 평가되어 생성된 결과                                                                                                                                                                                                                                            |
| 리터럴(Literal)    | 다양한 자료형을 가진 값을 생성하려면 이를 텍스트로 구분 짓는 것이 필요한데, 이를 위해 미리 약속된 표기법 규칙을 말한다.                                                                                                                                                  |
| 표현식(Expression) | 표현식은 값을 생성하거나 조작하는 코드 구문이다. 표현식은 값, 변수, 리터럴, 연산자, 함수 호출 등의 조합으로 구성될 수 있다. 표현식은 평가되어 값을 반환한다.                                                                                                             |
| 문(Statement)      | 문은 프로그램에서 실행되는 동작이나 작업을 나타낸다. 문은 프로그램의 동작을 제어하거나 조작하는 데 사용된다. 문은 변수 선언, 할당, 조건문(`if`/`else`), 반복문(`for`, `while`), 함수 선언 등의 구조를 가질 수 있습니다. 문은 세미콜론(`;`)으로 끝나는 것이 일반적입니다. |

## parse

보통 라이브러리는 여러가지 메서드를 가진 거대한 객체로 구성이 되고, 해당 객체에 변경할 데이터를 넣은 후 여러 메서드를 사용하여 원하는 형태의 데이터를 얻어낼 수 있다. 반대로 데이터를 기반으로 거대한 객체를 구성할 때 사용하는 것이 `parse()` 파싱 관련 메서드이다. 개발을 하다보면 데이터를 다시 조작해서 다른 데이터를 얻어내고 싶을 경우가 있을 것이다. 이런 경우 데이터를 파싱해서 거대한 객체를 다시 만들어내고 데이터를 바탕으로 만들어진 거대한 객체를 통해 다시 사용자가 원하는 형태의 데이터를 출력한다.

## 논리 연산자 단락 평가

```js
const a = null || null || null || 'end'

console.log(a) // 'end'

const b = 'value' && 'value' && 'value' && 'end'

console.log(b) 'end'
```

논리 연산자 `||`는 단락 평가 시 `null`, `undefined`, `''`, `0`, `NaN`, `false` 값을 만나면 다음으로 이동하고 만나지 않으면 해당 값을 출력한다.

논리 연산자 `&&`는 단락 평가 시 `null`, `undefined`, `''`, `0`, `NaN`, `false` 값을 만나면 해당 값을 출력하고 만나지 않으면 다음으로 이동한다.

## 자바스크립트 값의 종류

|             | `typeof`    | 원시값 | 특이사항 | 설명                                                                               |
| ----------- | ----------- | ------ | -------- | ---------------------------------------------------------------------------------- |
| `null`      | "object"    | O      | X        | `null`의 `typeof` 연산은 "object"인데, 이는 언어상 오류다. `null`은 객체가 아니다. |
| `undefined` | "undefined" | O      | X        |                                                                                    |
| Boolean     | "boolean"   | O      | X        |                                                                                    |
| Number      | "number"    | O      | X        |                                                                                    |
| `NaN`       | "number"    | O      | X        | `NaN === NaN`은 같지 않다.                                                         |
| `Infinity`  | "number"    | O      | X        |                                                                                    |
| BigInt      | "number"    | O      | X        |                                                                                    |
| String      | "string"    | O      | X        |                                                                                    |
| Symbol      | "symbol"    | O      | X        |                                                                                    |
| Object      | "object"    | X      | O        |                                                                                    |
| Array       | "object"    | X      | O        |                                                                                    |
| Function    | "function"  | X      | O        |                                                                                    |

## file input 동일한 파일 입력 시 onChange 동작

`<input type='file' />`의 경우 사용자가 파일을 입력한 후 동일한 파일을 다시 입력하면 `value` 값이 동일하기 때문에 `onChange`가 동작하지 않는다.

`onChange`는 `value` 값이 변경되어야만 동작하므로 `onChange`가 일어나기 전에 `onClick`이 발생할 때 `event.target.value = ''`를 통해 `value` 값을 초기화해준다.

어쩌피 우리가 관심있는 값은 `event.target.files`에 있는 `File` 객체이기 때문에 위 동작은 값에 영향을 주지 않는다.

```js
<input type='file' onClick={(event) => event.target.value = ''} onChange={(event) => console.log(event.target.files)}>
```

## sort

배열은 각 문자의 유니 코드 코드 포인트 값에 따라 정렬되기 때문에 숫자 정렬이 생각한대로 정렬되지 않을 수 있다. 원 배열이 정렬되며, 복사본이 만들어지는 것이 아니다.

`compareFunction(a, b) < 0`인 경우, `a`를 `b`보다 낮은 인덱스로 정렬한다. 즉, `a`가 먼저 온다.
`compareFunction(a, b) === 0`인 경우, `a`와 `b`를 서로에 대해 변경하지 않는다.
`compareFunction(a, b) > 0`인 경우, `b`를 `a`보다 낮은 인덱스로 정렬한다. 즉, `b`가 먼저 온다.

## class

```js
class MyClass {
  prop = value; // 프로퍼티(instance 속성)
  static prop = value; // (class 속성)

  constructor(...) { // 생성자 메서드(prototype 속성)
    // ...
  }

  method(...) {} // 메서드(prototype 속성)

  get something(...) {} // getter 메서드(prototype 속성)
  set something(...) {} // setter 메서드(prototype 속성)

  [Symbol.iterator]() {} // 계산된 이름(computed name)을 사용해 만드는 메서드 (심볼)(prototype 속성)
  // ...
}
```

## 시간 구하기

10분짜리 오디오 초로 변환: 600초

번역 걸리는 시간: 15초

오디오 초로 번역 시간을 알아내기: 600 / x = 15

x = 40, 600을 40으로 나누면 15초 나옴

15초를 interval 0.2초 간격으로 나누면 총 75회 카운트

75회 카운트 동안 100퍼센트를 채우려면 1.333...%씩

보더 길이를 채우려면 보더 총 길이 / 75

## 2차원 배열 생성 시 Array.fill

```ts
Array(100).fill(Array(100).fill(0));

Array.from({ length: 100 }, () => Array(100).fill(0));
```

`fill` 메서드의 인수는 배열을 채울 값이다. 배열의 모든 요소는 이 정확한 값이 된다. 값이 객체인 경우 배열의 각 슬롯은 해당 객체를 참조한다.
