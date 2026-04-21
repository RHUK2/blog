---
folderName: react
title: React
tag: react
isPublished: true
---

# React

- [커스텀 훅(Custom Hooks) vs 일반 함수](#커스텀-훅custom-hooks-vs-일반-함수)
- [엄격 모드(Strict Mode)](#엄격-모드strict-mode)
- [상태 관리 훅(State Hooks)](#상태-관리-훅state-hooks)
  - [useState](#usestate)
  - [useReducer](#usereducer)
  - [useActionState (React 19)](#useactionstate-react-19)
- [참조 및 DOM 제어(Refs)](#참조-및-dom-제어refs)
  - [useRef](#useref)
  - [forwardRef](#forwardref)
  - [useImperativeHandle](#useimperativehandle)
- [부수 효과 관리(Side Effects)](#부수-효과-관리side-effects)
  - [useEffect](#useeffect)
  - [useTransition](#usetransition)
- [성능 최적화(Performance Optimization)](#성능-최적화performance-optimization)
  - [useMemo](#usememo)
  - [useCallback](#usecallback)
  - [memo](#memo)
  - [useCallback + memo](#usecallback--memo)
- [컨텍스트 API(Context API)](#컨텍스트-apicontext-api)
- [상태 설계 패턴](#상태-설계-패턴)
- [dangerouslySetInnerHTML](#dangerouslysetinnerhtml)
  - [기본 사용법](#기본-사용법)
  - [XSS 위험과 보안 고려사항](#xss-위험과-보안-고려사항)
  - [권장 대안](#권장-대안)

## 커스텀 훅(Custom Hooks) vs 일반 함수

- 커스텀 훅(Custom Hooks)은 리액트의 내장 훅을 조합하여 로직을 재사용하기 위해 정의하는 함수다.
- 규칙:
  - 함수명은 반드시 `use` 접두사로 시작해야 함.
  - 리액트 내장 훅(useState, useEffect 등)을 내부에서 호출할 수 있는 유일한 사용자 정의 함수임.
  - 컴포넌트의 최상위 레벨에서만 호출 가능하며 조건문이나 반복문 내에서는 호출할 수 없음.
  - 매 호출마다 독립적인 상태를 생성하며, 상태 공유가 필요한 경우 컨텍스트 API(Context API)와 병행함.

## 엄격 모드(Strict Mode)

- 엄격 모드(Strict Mode)는 개발 환경에서 애플리케이션의 잠재적인 문제를 감지하기 위한 도구다.
- 주요 동작:
  - 컴포넌트를 두 번 렌더링하여 순수 함수(Pure Function) 규칙 위반 여부를 확인함.
  - 마운트 -> 언마운트 -> 마운트 사이클을 통해 정리 함수(Cleanup Function) 누락을 점검함.
  - 폐기된(Deprecated) API 사용 시 경고를 발생시킴.
- React는 모든 컴포넌트가 동일한 입력에 대해 동일한 결과를 반환하는 순수성을 유지한다고 가정한다.

## 상태 관리 훅(State Hooks)

### useState

- `useState`는 컴포넌트에 상태 변수를 추가할 때 사용하는 훅이다.
- 특징:
  - 현재 상태 값과 업데이트 함수를 담은 배열을 반환함.
  - 상태는 불변성(Immutability)을 유지해야 하며, 직접 수정 대신 업데이트 함수를 통해 교체해야 함.
  - 업데이트 함수에 콜백을 전달하면 이전 상태(prev)를 기반으로 안전하게 업데이트 가능함.
  - `Object.is` 비교를 통해 이전 값과 동일할 경우 리렌더링을 건너뛴다.

### useReducer

- 복잡한 상태 로직을 구조적으로 관리하고 싶을 때 사용함.
- `(state, action) => newState` 형태의 리듀서 함수를 통해 상태 변경 로직을 컴포넌트 외부로 분리할 수 있다.

```tsx
type Action = { type: 'increment' } | { type: 'decrement' };

function reducer(state: number, action: Action): number {
  switch (action.type) {
    case 'increment':
      return state + 1;
    case 'decrement':
      return state - 1;
  }
}

function Counter() {
  const [count, dispatch] = useReducer(reducer, 0);

  return (
    <>
      <span>{count}</span>
      <button onClick={() => dispatch({ type: 'increment' })}>+</button>
      <button onClick={() => dispatch({ type: 'decrement' })}>-</button>
    </>
  );
}
```

### useActionState (React 19)

- 비동기 액션의 진행 상태와 결과 데이터를 선언적으로 관리하는 최신 훅이다.
- 펜딩(Pending) 상태와 에러 처리를 내장하고 있어 폼 제출 등의 비동기 로직을 단순화함.

```tsx
async function submitAction(_prev: string, formData: FormData): Promise<string> {
  await fetch('/api/submit', { method: 'POST', body: formData });
  return '제출 완료';
}

function SubmitForm() {
  const [result, action, isPending] = useActionState(submitAction, '');

  return (
    <form action={action}>
      <input name='email' type='email' />
      <button type='submit' disabled={isPending}>
        {isPending ? '처리 중...' : '제출'}
      </button>
      {result && <p>{result}</p>}
    </form>
  );
}
```

## 참조 및 DOM 제어(Refs)

### useRef

- `current` 속성을 가진 가변(Mutable) 객체를 반환하며, 값이 변경되어도 리렌더링을 트리거하지 않음.
- 실제 DOM 노드에 접근하거나 렌더링 주기와 무관한 값을 유지할 때 사용한다.

### forwardRef

- 부모 컴포넌트가 자식 컴포넌트 내부의 DOM 노드에 직접 접근할 수 있도록 `ref`를 전달하는 기능임.

### useImperativeHandle

- `forwardRef`와 함께 사용하며, 부모에게 노출할 자식 컴포넌트의 인스턴스 메서드를 커스텀함.

```tsx
interface InputHandle {
  focus: () => void;
}

// 자식: 내부 DOM 대신 커스텀 메서드만 노출
const FancyInput = forwardRef<InputHandle>((_, ref) => {
  const inputRef = useRef<HTMLInputElement>(null);

  useImperativeHandle(ref, () => ({
    focus: () => inputRef.current?.focus(),
  }));

  return <input ref={inputRef} />;
});

// 부모: ref를 통해 focus() 호출
function Parent() {
  const ref = useRef<InputHandle>(null);
  return (
    <>
      <FancyInput ref={ref} />
      <button onClick={() => ref.current?.focus()}>포커스</button>
    </>
  );
}
```

## 부수 효과 관리(Side Effects)

### useEffect

- 외부 시스템(API, 타이머, 직접적인 DOM 조작)과 컴포넌트를 동기화할 때 사용함.
- 의존성 배열(Dependencies)을 통해 실행 시점을 제어하며, 배열 내부의 값이 하나라도 변경되면 재실행됨.
- 정리 함수(Cleanup)를 통해 구독 해제나 타이머 제거 등의 리소스 관리를 수행한다.

### useTransition

- UI 업데이트의 우선순위를 낮춰 브라우저의 차단을 방지하는 동시성(Concurrency) 훅이다.
- 대량의 데이터 렌더링 중에도 사용자 입력을 즉시 처리할 수 있게 함.

```tsx
function SearchPage() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<string[]>([]);
  const [isPending, startTransition] = useTransition();

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setQuery(e.target.value); // 즉시 반영 (높은 우선순위)

    startTransition(() => {
      setResults(heavyFilter(e.target.value)); // 낮은 우선순위로 처리
    });
  }

  return (
    <>
      <input value={query} onChange={handleChange} />
      {isPending ? <p>검색 중...</p> : <List items={results} />}
    </>
  );
}
```

## 성능 최적화(Performance Optimization)

- 리액트는 기본적으로 가상 DOM(Virtual DOM) 비교를 통해 최소한의 업데이트를 수행하지만, 복잡한 계산이나 불필요한 리렌더링 방지를 위해 메모이제이션(Memoization)을 활용함.

### useMemo

- 계산 비용이 큰 함수의 반환값을 메모이제이션함. 의존성 배열의 값이 변경될 때만 재계산한다.

### useCallback

- 함수 정의 자체를 메모이제이션하여 자식 컴포넌트에 props로 전달할 때 참조 동일성을 유지함.

### memo

- 고차 컴포넌트(HOC)로, props가 변경되지 않았다면 해당 컴포넌트의 리렌더링을 건너뛴다.

### useCallback + memo

`useCallback`과 `memo`는 함께 사용할 때 효과가 있다. `memo`로 감싼 자식은 props의 참조가 바뀌지 않아야 리렌더링을 건너뛸 수 있으므로, 핸들러를 `useCallback`으로 고정해야 한다.

```tsx
// 자식: props가 동일하면 리렌더링 생략
const Item = memo(function Item({ label, onClick }: { label: string; onClick: () => void }) {
  return <button onClick={onClick}>{label}</button>;
});

// 부모: handleClick 참조를 고정하여 Item의 불필요한 리렌더링 방지
function List() {
  const [count, setCount] = useState(0);

  const handleClick = useCallback(() => {
    console.log('clicked');
  }, []); // 의존성이 없으므로 최초 한 번만 생성

  return (
    <>
      <span>{count}</span>
      <button onClick={() => setCount((c) => c + 1)}>증가</button>
      <Item label='항목' onClick={handleClick} />
    </>
  );
}
```

## 컨텍스트 API(Context API)

- 단계별 props 전달(Props Drilling) 없이 트리 전체에 데이터를 공유하는 메커니즘이다.
- `Provider`를 통해 값을 공급하고 `useContext`를 통해 소비함.

## 상태 설계 패턴

- 상태 끌어올리기(Lifting State Up): 하위 컴포넌트들의 공통 상태를 가장 가까운 공통 조상으로 옮겨 관리함.
- 제어권 위임: 자식은 콜백 함수를 통해 데이터를 전달하고, 부모는 이를 받아 전체적인 비즈니스 로직과 상태를 결정한다.

## dangerouslySetInnerHTML

`dangerouslySetInnerHTML`은 React에서 DOM 요소의 `innerHTML`을 직접 설정하는 prop이다. 브라우저의 `element.innerHTML`에 대응하며, HTML 문자열을 그대로 삽입한다.

### 기본 사용법

`__html` 키를 가진 객체를 전달해야 한다. 이 설계는 개발자가 위험성을 명시적으로 인지하도록 의도된 것이다.

```tsx
function Article({ htmlContent }: { htmlContent: string }) {
  return <div dangerouslySetInnerHTML={{ __html: htmlContent }} />;
}
```

`dangerouslySetInnerHTML`을 설정한 요소는 `children`을 가질 수 없다. React는 두 방식을 동시에 사용하면 오류를 발생시킨다.

```tsx
// ❌ incorrect: children과 함께 사용 불가
<div dangerouslySetInnerHTML={{ __html: html }}>
  <span>자식 요소</span>
</div>

// ✅ correct: 별도 컨테이너로 분리
<>
  <div dangerouslySetInnerHTML={{ __html: html }} />
  <span>자식 요소</span>
</>
```

또한 `dangerouslySetInnerHTML`은 React의 가상 DOM diffing을 우회하므로, 삽입된 HTML 내부를 React가 관리하지 않는다. 이 영역에서 발생하는 DOM 변경은 React 렌더링 사이클 외부에서 이루어진다.

### XSS 위험과 보안 고려사항

React는 JSX 표현식 내의 값을 자동으로 이스케이프하여 XSS(Cross-Site Scripting) 공격을 방지한다. 그러나 `dangerouslySetInnerHTML`은 이 보호를 우회하여 HTML을 그대로 삽입하므로, 사용자 입력이 포함된 경우 XSS 취약점이 발생한다.

```tsx
// ❌ incorrect: 사용자 입력을 그대로 삽입 — XSS 취약점
const userInput = '<img src=x onerror="alert(document.cookie)">';
<div dangerouslySetInnerHTML={{ __html: userInput }} />;

// ✅ correct: DOMPurify 등으로 sanitize 후 삽입
import DOMPurify from 'dompurify';
const sanitized = DOMPurify.sanitize(userInput);
<div dangerouslySetInnerHTML={{ __html: sanitized }} />;
```

- 신뢰할 수 없는 출처(사용자 입력, 외부 API 응답 등)의 HTML은 반드시 sanitize 후 삽입해야 함.
- 신뢰할 수 있는 정적 콘텐츠(CMS에서 가져온 마크다운 변환 결과 등)라면 sanitize를 생략할 수 있음.
- `script` 태그는 `innerHTML`로 삽입해도 실행되지 않지만, 이벤트 핸들러 속성(`onerror`, `onclick` 등)을 통한 공격은 여전히 가능함.

### 권장 대안

HTML 문자열 삽입이 필요한 상황 대부분은 대안으로 대체할 수 있다.

| 상황                           | 대안                                      |
| ------------------------------ | ----------------------------------------- |
| 마크다운 렌더링                | `react-markdown`, `marked` + sanitize     |
| 서버에서 받은 HTML 콘텐츠 표시 | `DOMPurify.sanitize()` 후 삽입            |
| 동적 스타일/클래스 적용        | React `style` prop, `className` 조합      |
| 텍스트에 줄바꿈 포함           | `white-space: pre-wrap` CSS 또는 `<br />` |
