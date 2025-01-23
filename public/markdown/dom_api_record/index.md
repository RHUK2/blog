---
folderName: dom_api_record
updatedAt:
title: DOM API 관련 기록
tag:
isPublished:
---

# DOM API 관련 기록

- [script](#script)
- [event bubble](#event-bubble)
- [target vs currentTarget](#target-vs-currenttarget)
- [onclick vs addEventListener('click')](#onclick-vs-addeventlistenerclick)
- [window vs document](#window-vs-document)
- [file input 동일한 파일 입력 시 onChange 동작](#file-input-동일한-파일-입력-시-onchange-동작)

## script

둘다 비동기적으로 스크립트를 불러오는 것이나 작동방식의 약간으 ㅣ차이가 존재

```
// <script defer>
// <script async>
```

## event bubble

부모 태그에도 이벤트가 붙어있고, 자식 태그에도 이벤트가 붙어있는데 같은 이벤트라면 버블링에 유의하자!

## target vs currentTarget

- 이벤트 발생 시 콜백 함수에는 `Event` 객체를 인수로 받게 되는데, 해당 객체의 `target` 속성은 이벤트가 발생하고 버블링되는 과정에서 첫번째 단계의 엘리먼트를 가리킨다.
- `currentTarget`은 버블링을 따라 올라오면서 이벤트와 직접 바인딩된 엘리먼트를 가리킨다.
- `currentTarget`은 `console`로 찍어보면 `null`로 나타나게 되는데, 해당 데이터는 이벤트가 처리되는 동안에만 사용되기 때문이다.

## onclick vs addEventListener('click')

onclick:

- HTML 요소의 onclick 속성을 통해 한 번에 하나의 이벤트 핸들러만 연결할 수 있다.
- HTML 요소의 onclick 속성은 HTML 코드에서 직접 지정되며, 정적으로 할당되기 때문에 바꾸기가 어렵다.
- onclick 속성으로 할당된 핸들러는 다른 핸들러보다 우선순위가 높다.
- onclick 속성에 빈 문자열을 설정하여 이벤트 핸들러를 제거할 수 있다.

addEventListener('click'):

- 하나의 요소에 여러 개의 이벤트 핸들러를 연결할 수 있다.
- 동적으로 이벤트 핸들러를 추가하거나 제거할 수 있따. 이는 런타임 중에 이벤트 핸들러를 동적으로 조작하고 업데이트하는 데 유용하다.
- 여러 개의 핸들러를 등록한 경우, 등록된 순서대로 호출된다. 이를 통해 여러 핸들러 간에 순서를 조절할 수 있다.
- removeEventListener를 사용하여 등록한 이벤트 핸들러를 제거할 수 있다. 단, 제거하려는 핸들러는 반드시 동일한 함수의 참조여야 한다.

## window vs document

window 객체는 브라우저 탭에 존재하는 자바스크립트 전역 최상위 객체이다. 따라서 window로 어디서든 접근이 가능하다.(서버사이드 렌더링 시엔 브라우저 렌더링이 아니기 때문에 window 객체가 없다)
window 객체 안에는 document 객체가 존재하고, document에는 잠재적으로 보여질 수 있는 dom에 대한 정보가 저장되어 있다. document객체는 window.document 혹은 document로 접근이 가능하다. (그 이유는 바로 다음 줄에)
window 객체는 전역으로 선언되어 있기 때문에 window객체 안에 있는 요소는 "window."와 같이 window객체를 참조하지 않고도 property 이름으로 바로 접근이 가능하다. 예컨대 window.innerHeight는 그냥 innerHeight로 접근이 가능하다. ( 오... 신기... 하지만 혼동이나 scope 등의 문제로 window.innerHeight 이런 식으로 사용하는 게 좋을 것 같다. )
document객체와 window객체에서 수용 가능한 eventList가 다르기 때문에, 같은 addEventListener이 있다고 하더라도, 각 용도에 맞게 호출해야 한다.

## file input 동일한 파일 입력 시 onChange 동작

`<input type='file' />`의 경우 사용자가 파일을 입력한 후 동일한 파일을 다시 입력하면 `value` 값이 동일하기 때문에 `onChange`가 동작하지 않는다.

`onChange`는 `value` 값이 변경되어야만 동작하므로 `onChange`가 일어나기 전에 `onClick`이 발생할 때 `event.target.value = ''`를 통해 `value` 값을 초기화해준다.

어쩌피 우리가 관심있는 값은 `event.target.files`에 있는 `File` 객체이기 때문에 위 동작은 값에 영향을 주지 않는다.

```js
<input type='file' onClick={(event) => event.target.value = ''} onChange={(event) => console.log(event.target.files)}>
```
