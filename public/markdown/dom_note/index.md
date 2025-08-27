---
folderName: dom_note
updatedAt: 2025-02-05
title: DOM Note
tag: dom
isPublished: true
---

# DOM Note

- [script](#script)
- [window vs document](#window-vs-document)
- [file input 동일한 파일 입력 시 onChange 동작](#file-input-동일한-파일-입력-시-onchange-동작)
- [특징 resize 이벤트 ResizeObserver](#특징-resize-이벤트-resizeobserver)

## script

둘다 비동기적으로 스크립트를 불러오는 것이나 작동방식의 약간으 ㅣ차이가 존재

```
// <script defer>
// <script async>
```

## window vs document

window 객체는 브라우저 탭에 존재하는 자바스크립트 전역 최상위 객체이다. 따라서 window로 어디서든 접근이 가능하다.(서버사이드 렌더링 시엔 브라우저 렌더링이 아니기 때문에 window 객체가 없다)
window 객체 안에는 document 객체가 존재하고, document에는 잠재적으로 보여질 수 있는 dom에 대한 정보가 저장되어 있다. document객체는 window.document 혹은 document로 접근이 가능하다. (그 이유는 바로 다음 줄에)
window 객체는 전역으로 선언되어 있기 때문에 window객체 안에 있는 요소는 "window."와 같이 window객체를 참조하지 않고도 property 이름으로 바로 접근이 가능하다. 예컨대 window.innerHeight는 그냥 innerHeight로 접근이 가능하다. ( 오... 신기... 하지만 혼동이나 scope 등의 문제로 window.innerHeight 이런 식으로 사용하는 게 좋을 것 같다. )
document객체와 window객체에서 수용 가능한 eventList가 다르기 때문에, 같은 addEventListener이 있다고 하더라도, 각 용도에 맞게 호출해야 한다.

## file input 동일한 파일 입력 시 onChange 동작

`<input type='file' />`의 경우 사용자가 파일을 입력한 후 동일한 파일을 다시 입력하면 `value` 값이 동일하기 때문에 `onChange`가 동작하지 않는다.

`onChange`는 `value` 값이 변경되어야만 동작하므로 `onChange`가 일어나기 전에 `onClick`이 발생할 때 `event.target.value = ''`를 통해 `value` 값을 초기화해준다.

어쩌피 우리가 관심있는 값은 `event.target.files`에 있는 `File` 객체이기 때문에 위 동작은 값에 영향을 주지 않는다.

```ts
<input type='file' onClick={(event) => event.target.value = ''} onChange={(event) => console.log(event.target.files)}>
```

## 특징 resize 이벤트 ResizeObserver

감지 대상 window (브라우저 창) 특정 DOM 요소
범위 전역 개별 요소
정밀도 브라우저 창 크기 변화만 감지 특정 요소의 모든 크기 변화 감지
성능 빈번한 호출, debounce/throttle 필요 효율적, 필요한 시점에만 호출
용도 전역 레이아웃 조정 특정 컴포넌트, 요소의 반응형 디자인
API 형태 이벤트 리스너 객체 인스턴스, 콜백 함수
