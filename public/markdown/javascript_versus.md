---
fileName: javascript_versus
updatedAt: 2024-09-25
title: 자바스크립트 관련 VS 모음
tag: javascript
isPublished: true
---

# 자바스크립트 관련 VS 모음

- [target vs currentTarget](#target-vs-currenttarget)
- [onclick vs addEventListener('click')](#onclick-vs-addeventlistenerclick)
  - [onclick](#onclick)
  - [addEventListener('click')](#addeventlistenerclick)
- [window vs document](#window-vs-document)
- [배열, 이터러블 객체, 유사배열 객체](#배열-이터러블-객체-유사배열-객체)
- [인수 vs 인자](#인수-vs-인자)
- [순수 함수 vs 비순수 함수](#순수-함수-vs-비순수-함수)
- [JavaScript vs ECMAScript](#javascript-vs-ecmascript)

## target vs currentTarget

이벤트 발생 시 콜백 함수에는 `Event` 객체를 인수로 받게 되는데, 해당 객체의 `target` 속성은 이벤트가 발생하고 버블링되는 과정에서 첫번째 단계의 엘리먼트를 가리킨다. `currentTarget`은 버블링을 따라 올라오면서 이벤트와 직접 바인딩된 엘리먼트를 가리킨다. `currentTarget`은 `console`로 찍어보면 `null`로 나타나게 되는데, 해당 데이터는 이벤트가 처리되는 동안에만 사용되기 때문이다.

## onclick vs addEventListener('click')

onclick과 addEventListener는 이벤트 처리를 위해 사용되는 JavaScript의 메커니즘이다. 하지만 두 가지 접근 방식에는 몇 가지 중요한 차이점이 있다.

### onclick

- HTML 요소의 onclick 속성을 통해 한 번에 하나의 이벤트 핸들러만 연결할 수 있다.
- HTML 요소의 onclick 속성은 HTML 코드에서 직접 지정되며, 정적으로 할당되기 때문에 바꾸기가 어렵다.
- onclick 속성으로 할당된 핸들러는 다른 핸들러보다 우선순위가 높다.
- onclick 속성에 빈 문자열을 설정하여 이벤트 핸들러를 제거할 수 있다.

### addEventListener('click')

- 하나의 요소에 여러 개의 이벤트 핸들러를 연결할 수 있다.
- 동적으로 이벤트 핸들러를 추가하거나 제거할 수 있따. 이는 런타임 중에 이벤트 핸들러를 동적으로 조작하고 업데이트하는 데 유용하다.
- 여러 개의 핸들러를 등록한 경우, 등록된 순서대로 호출된다. 이를 통해 여러 핸들러 간에 순서를 조절할 수 있다.
- removeEventListener를 사용하여 등록한 이벤트 핸들러를 제거할 수 있다. 단, 제거하려는 핸들러는 반드시 동일한 함수의 참조여야 한다.

## window vs document

window 객체는 브라우저 탭에 존재하는 자바스크립트 전역 최상위 객체이다. 따라서 window로 어디서든 접근이 가능하다.(서버사이드 렌더링 시엔 브라우저 렌더링이 아니기 때문에 window 객체가 없다)
window 객체 안에는 document 객체가 존재하고, document에는 잠재적으로 보여질 수 있는 dom에 대한 정보가 저장되어 있다. document객체는 window.document 혹은 document로 접근이 가능하다. (그 이유는 바로 다음 줄에)
window 객체는 전역으로 선언되어 있기 때문에 window객체 안에 있는 요소는 "window."와 같이 window객체를 참조하지 않고도 property 이름으로 바로 접근이 가능하다. 예컨대 window.innerHeight는 그냥 innerHeight로 접근이 가능하다. ( 오... 신기... 하지만 혼동이나 scope 등의 문제로 window.innerHeight 이런 식으로 사용하는 게 좋을 것 같다. )
document객체와 window객체에서 수용 가능한 eventList가 다르기 때문에, 같은 addEventListener이 있다고 하더라도, 각 용도에 맞게 호출해야 한다.

## 배열, 이터러블 객체, 유사배열 객체

이터러블: 심볼 이터레이터를 포함하며 for in 구문 사용 가능한 객체
유사배열 객체: 인덱스와 length 프로퍼티가 있으나 배열 메서드를 사용할 수 없는 객체

위 두 객체는 배열이 아니기 때문에 Array.from으로 배열로 만들어서 사용 가능

## 인수 vs 인자

| 구분      | 인수(Argument)                       | 인자(Parameter)                               |
| --------- | ------------------------------------ | --------------------------------------------- |
| 정의      | 함수 호출 시 전달되는 실제 값        | 함수 선언 시 정의되는 변수                    |
| 위치      | 함수가 호출될 때 사용됨              | 함수가 선언될 때 사용됨                       |
| 역할      | 함수를 호출하면서 함수에 넘겨주는 값 | 함수가 호출될 때 전달받을 값을 담기 위한 변수 |
| 예시      | `sum(3, 5)`에서 `3`과 `5`            | `function sum(a, b)`에서 `a`와 `b`            |
| 동적 특성 | 런타임에 결정됨                      | 컴파일 타임에 결정됨                          |

## 순수 함수 vs 비순수 함수

| 구분 | 순수 함수(Pure Function)                                                       | 비순수 함수(Impure Function)                                              |
| ---- | ------------------------------------------------------------------------------ | ------------------------------------------------------------------------- |
| 정의 | 동일한 인수에 대해 항상 동일한 결과를 반환하고, 외부 상태를 변경하지 않음      | 동일한 인수에 대해 항상 동일한 결과를 반환하지 않거나, 외부 상태를 변경함 |
| 특징 | - 부수 효과(side effect)가 없음<br> - 참조 투명성(reference transparency) 보장 | - 부수 효과가 있음<br> - 참조 투명성 보장되지 않음                        |

## JavaScript vs ECMAScript

JavaScript는 ECMAScript 언어의 구현 중 하나로, 대부분의 모던 웹 브라우저에서 지원하며 Node.js와 같은 서버 측 환경에서도 사용된다.

ECMAScript는 JavaScript의 표준 사양을 정의하는 언어이다. 프로그래밍 언어의 규격과 특성을 명시화하여 JavaScript 엔진 개발자와 웹 개발자 간의 일관된 작업 환경을 제공한다. 즉, ECMAScript는 JavaScript의 핵심 기능 및 구문을 정의하고 있으며, JavaScript 엔진 제작자 및 브라우저 개발자는 이 사양을 준수하여 JavaScript를 구현한다. JavaScript는 ECMAScript의 구현 중 하나로, 보통 브라우저나 Node.js 환경에서 실행된다. 여기에 브라우저나 환경에 따라 추가된 다양한 기능과 API를 제공한다.
