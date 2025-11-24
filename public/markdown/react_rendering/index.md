---
folderName: react_rendering
title: React Rendering
tag: react
isPublished: true
---

# React Rendering

- [React 렌더링 과정](#react-렌더링-과정)
  - [1. 가상 DOM 생성](#1-가상-dom-생성)
  - [2. Diffing 알고리즘](#2-diffing-알고리즘)
  - [3. 재조정(Reconciliation)](#3-재조정reconciliation)
  - [최적화 기법](#최적화-기법)
  - [사용자 입력 제한의 한계](#사용자-입력-제한의-한계)
- [JSX(JavaScript XML)](#jsxjavascript-xml)
  - [주요 특징](#주요-특징)
  - [텍스트 줄바꿈](#텍스트-줄바꿈)
- [dangerouslySetInnerHTML과 DOM 조작](#dangerouslysetinnerhtml과-dom-조작)
  - [DOM 조작 메서드 비교](#dom-조작-메서드-비교)
- [조건부 렌더링](#조건부-렌더링)

## React 렌더링 과정

### 1. 가상 DOM 생성

```jsx
// JSX
<div className="container">Hello, World!</div>

// React.createElement 결과
{
  type: 'div',
  props: {
    className: 'container',
    children: 'Hello, World!'
  }
}
```

### 2. Diffing 알고리즘

React는 다음 기준으로 가상 DOM을 비교한다:

- 컴포넌트 타입: 같은 타입끼리만 비교
- Key 값: 리스트 요소의 고유성 판단
- Props 변경: 속성 변화 감지
- 위치: 같은 위치의 요소 비교

### 3. 재조정(Reconciliation)

변경된 부분만 실제 DOM에 반영하여 성능을 최적화한다.

### 최적화 기법

- React.memo: 함수형 컴포넌트의 불필요한 리렌더링 방지
- useMemo/useCallback: 값과 함수 메모이제이션
- Key 최적화: 안정적인 고유 키 사용

![img](images/virtual_dom.png)

### 사용자 입력 제한의 한계

클라이언트에서 `disabled` 속성이나 마스킹 처리로 사용자 입력을 제한해도, 개발자 도구로 우회가 가능하다. React에서는 가상 DOM을 이용해 상태 값에 의존하는 `disabled` 설정이 더 안전하지만, 서버에서의 검증이 필수다.

특히 중요한 API(가격, 사용자 정보, 결제 등)가 동작하는 입력 요소는 보안을 철저히 신경써야 한다.

## JSX(JavaScript XML)

JSX는 JavaScript의 구문 확장으로, 렌더링 로직과 마크업을 같은 컴포넌트에서 관리할 수 있게 해준다.

### 주요 특징

- 중괄호(`{}`)로 JavaScript 표현식 삽입 가능
- 단일 부모 태그 또는 Fragment(`<>`, `</>`)로 래핑 필요
- 속성명은 camelCase 사용 (`className`, `onClick` 등)
- `aria-*`, `data-*` 속성은 예외적으로 대시 사용

### 텍스트 줄바꿈

HTML에서는 `\n` 줄바꿈 특수문자를 인식하지 못해서 `<br/>` 태그를 사용하거나 Javascript를 이용해 `textContent` 값에 `\n`을 포함한 문자열을 입력한다.
React에서는 JSX를 통해 `{}` 중괄호를 이용해 쉽게 줄바꿈이 가능하다.

```jsx
// HTML에서는 <br/> 태그 필요
// React에서는 중괄호로 간단히 처리
<div>{'첫 번째 줄\n두 번째 줄'}</div>
```

## dangerouslySetInnerHTML과 DOM 조작

### DOM 조작 메서드 비교

| 메서드        | 특징                        | 용도                 |
| ------------- | --------------------------- | -------------------- |
| `innerHTML`   | HTML 태그 파싱, XSS 위험    | HTML 구조 변경       |
| `innerText`   | CSS 스타일 반영, 포맷 유지  | 보이는 텍스트만 처리 |
| `textContent` | 빠른 성능, 모든 텍스트 포함 | 단순 텍스트 처리     |

React에서는 XSS 방지를 위해 `dangerouslySetInnerHTML`을 명시적으로 사용해야 HTML을 삽입할 수 있다.

## 조건부 렌더링

조건문 사용:

```tsx
function MyComponent({ items }) (
  <div>{items.map((item) => item.shouldRender && <div key={item.id}>{item.content}</div>)}</div>
);
```

CSS display 속성 사용:

```tsx
function MyComponent({ items }) (
  <div>
    {items.map((item) => (
      <div key={item.id} style={{ display: item.shouldRender ? 'block' : 'none' }}>
        {item.content}
      </div>
    ))}
  </div>
);
```

차이 비교:

| 방식        | 장점                         | 단점          | 권장 상황                          |
| ----------- | ---------------------------- | ------------- | ---------------------------------- |
| 조건문      | 메모리 효율, DOM 크기 최소화 | 재렌더링 비용 | 요소가 자주 변경되지 않는 경우     |
| CSS display | 빠른 토글, 상태 유지         | 메모리 점유   | 요소가 자주 나타나고 사라지는 경우 |

https://www.freecodecamp.org/news/innerhtml-vs-innertext-vs-textcontent/
