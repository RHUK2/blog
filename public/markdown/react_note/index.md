---
folderName: react_note
updatedAt: 2025-02-06
title: React Note
tag: react
isPublished: true
---

- [커스텀 훅 vs 일반 함수](#커스텀-훅-vs-일반-함수)
- [StrictMode](#strictmode)
- [useState](#usestate)
- [useReducer](#usereducer)
- [useRef](#useref)
  - [forwardRef](#forwardref)
  - [useImperativeHandle](#useimperativehandle)
- [useEffect](#useeffect)
  - [종속성 줄이기](#종속성-줄이기)
  - [useEffect 내부에서 타이머 사용하기](#useeffect-내부에서-타이머-사용하기)
- [useMemo](#usememo)
- [useCallback](#usecallback)
- [memo](#memo)
- [Context API](#context-api)

## 커스텀 훅 vs 일반 함수

사용자 정의 훅은 로직을 재사용하기 위해서 리액트의 훅들을 이용해 개발자가 직접 작성하는 훅이다. 일반 함수와 구분짓기 위해 함수명의 접두사로 `use`를 사용해야 한다.

일반 함수와의 차이점은 리액트에서 제공하는 훅을 사용할 수 있냐 없냐의 차이다.

사용자 정의 훅, 리액트 훅은 컴포넌트의 최상위 레벨에서만 호출할 수 있다. 루프나 조건 내부에서는 호출할 수 없다.

커스텀 훅은 매번 독립적인 상태를 반환한다. 같은 인스턴스를 공유하려면 Context API 사용

## StrictMode

개발 환경의 `<StrictMode>`에서는 다음과 같은 동작이 활성화된다.

- 컴포넌트가 불완전한 렌더링으로 인한 버그를 찾기 위해 한 번 더 렌더링한다.

  - React는 모든 컴포넌트를 순수한 함수라고 가정한다. 즉, 컴포넌트는 동일한 입력(`props`, `state`, `context`)이 주어졌을 때 항상 동일한 JSX를 반환해야 한다.

    이 규칙을 위반하는 컴포넌트는 예측할 수 없는 동작을 하며 버그를 유발한다. 실수로 발생한 버그를 찾을 수 있도록 `<StrictMode>`는 일부 함수(순수해야 하는 함수만)를 두 번 호출한다. 일부 함수는 다음과 같다.

    - 컴포넌트 함수 본문(최상위 로직만 포함하므로 이벤트 핸들러 내부의 코드는 포함되지 않음)

    - `useState`, `set` 함수에 전달한 함수, `useMemo` 또는 `useReducer`에 전달한 함수

    순수 함수는 매번 동일한 결과를 생성하므로 함수가 순수하면 두 번 실행해도 동작이 변경되지 않는다. 그러나 함수가 불순한 경우 두 번 실행하면 눈에 띄는 경향이 있으므로 버그를 조기에 발견하고 수정하는 데 도움이 됩니다.

- 컴포넌트가 정리 함수가 누락되어 발생한 버그를 찾기 위해 마운트 시에 설정 함수 -> 정리 함수 -> 설정 함수 사이클을 실행한다.

- 더 이상 사용되지 않는 리액트 API를 찾아준다.

`<StrictMode>`로 래핑된 트리 내부에서는 `<StrictMode>`를 해제할 수 있는 방법이 없다. 이러면 모든 컴포넌트가 검사된다는 확신을 가질 수 있다. 앱을 작업하는 개발자 사이에 검사의 가치에 대해 의견이 달라 검사 범위를 축소해야할 경우, 트리에서 `<StrictMode>`를 아래로 이동시켜야 한다.

## useState

```ts
const [state, setState] = useState(initialState);
```

- 두 개의 값을 가진 배열을 반환한다.
  - 현재 상태 값(`state`)
  - 상태를 다른 값으로 업데이트하고 다시 렌더링을 트리거할 수 있는 `set` 함수
- `state`는 immutable하다
- `useState`의 인수로 값을 전달하면 해당 값을 초기 상태로 설정한다.
- `useState`의 인수로 함수를 전달하면 이 함수의 반환값을 초기 상태로 설정한다.
  - 초기화 함수는 순수해야 하고 인수를 받지 않아야 하며 무조건 값을 반환해야 한다.
- 초기 상태는 컴포넌트가 처음 렌더링되는 시점에만 설정되고, 이후에는 무시된다.
- 최상위 레벨 또는 자체 Hook에서만 호출할 수 있다. 루프나 조건 내부에서는 호출할 수 없다.

```ts
setState({ foo: 'bar' });
setState((prevState) => ({
  ...prevState,
  foo: 'bar',
}));
```

- `set` 함수의 인수로 모든 유형의 값이 될 수 있고, 함수에 대해서는 특별한 동작이 있다.
- `set` 함수의 인수로 함수를 전달하면 업데이트 함수로 취급된다. 순수해야 하고, 이전 상태 값을 유일한 인수로 사용해야 하며, 다음 상태를 반환해야 한다.
- `set` 함수에는 반환값이 없다.
- `Object.is` 비교에 의해 제공한 새 값이 현재 상태와 동일한 경우, React는 컴포넌트와 그 자식들을 다시 렌더링하는 것을 건너뛴다.
- `set` 함수로 업데이트된 값은 트리거된 렌더링 이후에 적용된다. `set` 함수를 호출한 후 렌더링 전에 상태 변수를 읽으면 호출 전 화면에 있던 이전 값을 계속 가져온다.
- React는 상태 업데이트를 처리하기 전에 이벤트 핸들러의 모든 코드가 실행될 때까지 기다린다. 이후 일괄로 상태 업데이트를 처리한다.
- 클릭처럼 여러 번 이벤트 핸들러가 실행되면, 각 클릭을 개별적으로 처리한다. 예를 들어, 첫 클릭에 양식을 `disabled` 시키면 두번째 클릭에 양식을 사용할 수 없다.
- 렌더링 도중 `set` 함수를 호출하는 것은 현재 렌더링 중인 컴포넌트 내에서만 허용된다. React는 해당 출력을 버리고 즉시 새로운 상태로 다시 렌더링을 시도한다.

## useReducer

`useState`로 관리하기에는 더 복잡한 상태를 구조적으로 다루고 싶을 때 `useReducer`를 사용한다.

```ts
export interface State {
  isIdle: boolean;
  isLoading: boolean;
  isSuccess: boolean;
  isError: boolean;
  data: Data | null;
  error: Error | null;
}

interface Data {
  isAuthenticated: boolean;
}

export const initAuthState: State = {
  isIdle: true,
  isLoading: false,
  isSuccess: false,
  isError: false,
  data: null,
  error: null,
};

export interface Action {
  type: 'idle_auth' | 'execute_auth' | 'success_auth' | 'fail_auth';
  payload?: Data;
  error?: Error;
}

function authReducer(state: State, action: Action): State {
  switch (action.type) {
    case 'idle_auth':
      return initAuthState;
    case 'execute_auth':
      return {
        ...initAuthState,
        isIdle: false,
        isLoading: true,
      };
    case 'success_auth':
      return {
        ...initAuthState,
        isIdle: false,
        isSuccess: true,
        data: action.payload ?? null,
      };
    case 'fail_auth':
      return {
        ...initAuthState,
        isIdle: false,
        isError: true,
        error: action.error ?? null,
      };
    default:
      return initAuthState;
  }
}

export function useAuthReducer() {
  return useReducer(authReducer, initAuthState);
}
```

## useRef

```ts
const ref = useRef(initialValue);
```

- `current` 속성을 가진 객체(`ref`)를 반환한다.
- `ref` 객체는 mutable하다.
- `useRef`의 인수로 값을 전달하면 해당 값을 `current`의 값으로 설정한다.
- 초기 값은 컴포넌트가 처음 렌더링되는 시점에만 설정되고, 이후에는 무시된다.
- `ref` 객체는 변경돼어도 렌더링을 트리거하지 않는다.
  - `ref`는 일반 자바스크립트 객체이기 때문에 React는 해당 값의 변경 여부를 추적하지 못한다.
- `ref` 객체를 JSX 요소의 `ref` 속성으로 전달하면 요소가 렌더링됐을 때 `current`에 요소의 객체가 담긴다.
- 기본적으로 React는 가상 DOM을 이용해 실제 DOM을 추상화하고 관리하기 때문에 리액트의 메커니즘이 아닌 기존 바닐라 자바스크립트 메커니즘으로 실제 DOM을 수정하려고 할 경우 문제가 생길 수 있다. 그렇기 때문에 DOM 노드를 참조해서 기능을 생성할 때 스타일 수정, 포커스 관리, 스크롤 위치 수정과 같은 비파괴적인 작업은 상관없지만 `appendChild()`, `remove()`와 같은 파괴적인 작업은 예기치 못한 오류를 낼 수 있다.

```ts
function App() {
  const ref = useRef<HTMLButtonElement | null>(null);
  // 다중 Ref 설정 방법
  const refArray = [useRef<HTMLButtonElement | null>(null), useRef<HTMLButtonElement | null>(null), useRef<HTMLButtonElement | null>(null)];


  function handleClick() {
    if(ref.current != null) console.dir(ref.current);
  }

  return (
    // ref 설정 방법
    // <button ref={(element) => { ref.current = element }} onClick={handleClick}>
    // ref 설정 방법 축약 버전
    <button ref={ref} onClick={handleClick}>
        Button
    </button>
  );
}
```

### forwardRef

부모 컴포넌트에서 사용자 정의 컴포넌트의 내부 요소를 참조하려는 경우 `forwardRef()` 메서드를 사용해야 한다.

```ts
const MyButton = forwardRef((props, ref) => {
  return (
    <button ref={ref} {...props}>
      Button
    </button>
  );
});

function App() {
  const ref = useRef(null);

  function handleClick() {
    console.dir(ref.current);
  }

  return (
    <MyButton ref={ref} onClick={handleClick}>
      Button
    </MyButton>
  );
}
```

### useImperativeHandle

`forwardRef()`로 감싸진 컴포넌트는 `ref` 객체가 요소와 연결되면 해당 요소를 컴포넌트 내부에서 조작을 할 수 없게 된다. `useImperativeHandle()`이라는 리액트에서 제공해주는 훅을 사용하면 컴포넌트 내부에서 요소의 연결된 `ref` 객체를 조작할 수 있고 `ref` 객체를 상위 컴포넌트에 내보낼 때 필요한 기능만 커스텀해서 보낼 수 있다.

```ts
// useImperativeHandle 사용 전
const FileInput = forwardRef(({ buttonProps, ...inputProps }, ref) => {
  return (
    <div>
      <input css={{ display: 'none' }} ref={ref} type='file' {...inputProps} />

      <button onClick={(e) => /* input 요소를 클릭하게 하고싶다.. */} {...buttonProps}>
        Button
      </button>
    </div>
  );
});

// useImperativeHandle 사용 후
const FileInput = forwardRef(({ buttonProps, ...inputProps }, ref) => {
  const inputRef = useRef(null);

  useImperativeHandle(ref, () => inputRef.current);

  return (
    <div>
      <input css={{ display: 'none' }} ref={inputRef} type='file' {...inputProps} />

      <Button onClick={(e) => inputRef.current.click()} {...buttonProps}>
        Button
      </Button>
    </div>
  );
});
```

## useEffect

```ts
useEffect(function setup () {
  // ...
  return function cleanup?  () {
    // ...
  }
}, dependencies?);
```

- 설정 함수는 선택적으로 정리 함수를 반환할 수 있다.
- 컴포넌트가 DOM에 추가되면 React는 설정 함수를 실행한다.
- 컴포넌트가 DOM에서 제거되면 React는 정리 함수를 실행한다.
- 종속성은 설정 코드 내부에서 참조된 모든 반응형 값의 목록이다.
- `[]`와 같이 종속성이 작성된 경우, 컴포넌트가 DOM에 추가될 때만 설정 함수를 실행한다.
- 종속성이 없는 경우, 렌더링을 할 때마다 React는 먼저 이전 값으로 정리 함수(제공한 경우)를 실행한 다음 새 값으로 설정 함수를 실행한다.
- `[dep1, dep2, dep3]`와 같이 종속성이 작성된 경우, 종속성 변경됨과 함께 렌더링을 할 때마다 React는 먼저 이전 값으로 정리 함수(제공한 경우)를 실행한 다음 새 값으로 설정 함수를 실행한다.
- 종속성의 변경됨은 `Object.is()`를 사용하여 이전 값과 얕은 비교를 통해 확인한다.

### 종속성 줄이기

종속성 중 일부가 컴포넌트 내부에 정의된 객체나 함수인 경우 이펙트가 필요 이상으로 자주 다시 실행될 위험이 있다. 이 문제를 해결하려면 아래와 같이 조치를 취한다.

- `useEffect` 내부에 객체 선언하기
- `useEffect` 내부에 함수 선언하기
- 컴포넌트 상위 단에 정의된 상태 변수 쓰지않기
- `set` 함수 함수를 제공해 이전 상태 값을 활용하기

### useEffect 내부에서 타이머 사용하기

```ts
// setTimeout
const [count, setCount] = useState(0);

const timerId = useRef<NodeJS.Timeout | null>(null);

useEffect(() => {
  timerId.current = setTimeout(() => {
    setCount((prev) => ++prev);
  }, 1000);

  return () => {
    if (timerId.current != null) clearTimeout(timerId.current);
  };
}, [count]); // <--
```

```ts
// setInterval
const [count, setCount] = useState(0);

const timerId = useRef<NodeJS.Timeout | null>(null);

useEffect(() => {
  timerId.current = setInterval(() => {
    setCount((prev) => ++prev);
  }, 1000);

  return () => {
    if (timerId.current != null) clearInterval(timerId.current);
  };
}, []); // <--
```

## useMemo

```ts
const cachedValue = useMemo(function calculateFunction {
  return calculateValue;
}, dependencies)
```

- `useMemo`는 인수로 캐시하려는 값을 계산하는 함수를 받는다. 순수해야 하고 인수를 받지 않아야 하며 모든 유형의 값을 반환해야 한다.
- React는 초기 렌더링 중에 계산 함수를 호출해서 결과를 저장한다.
- 초기 렌더링이 지난 후 React는 마지막 렌더링 이후 종속성이 변경되지 않은 경우 동일한 값을 다시 반환한다.
- 종속성이 변경된 경우 계산 함수를 호출하고 결과를 반환한 후 나중에 재사용할 수 있도록 저장한다.
- 종속성은 인수로 받은 함수 내에서 참조된 모든 반응형 값의 목록이다.
- 종속성의 변경됨은 `Object.is()`를 사용하여 이전 값과 얕은 비교를 통해 확인한다.
- `useMemo`는 성능 최적화를 위해 사용되며, 남용하면 오히려 성능이 떨어질 수 있다. 평소에는 사용하지 않다가 필요하다고 생각하는 경우에만 적용하는 것이 좋다.
- 컴퓨팅 자원이 많이 드는 재계산을 매 렌더링마다 반복하지 않으려 할 때 사용한다.
- 다른 훅의 종속성을 메모화할 때 사용한다.

## useCallback

```ts
const cachedFn = useCallback(function fn {
  // ...
}, dependencies)
```

- `useCallback`은 인수로 캐시하려는 함수를 받는다. 어떤 인수를 받거나 어떤 값도 반환할 수 있다.
- React는 초기 렌더링 중에 함수를 다시 반환한다.
- 초기 렌더링이 지난 후 React는 마지막 렌더링 이후 종속성이 변경되지 않은 경우 동일한 함수를 다시 제공한다.
- 종속성이 변경된 경우 현재 렌더링 중에 전달된 함수를 제공하고 나중에 재사용할 수 있도록 저장한다.
- 함수를 호출하지 않고 사용자에게 반환되므로 사용자는 언제 호출할지 결정할 수 있다.
- 종속성은 인수로 받은 함수 내에서 참조된 모든 반응형 값의 목록이다.
- 종속성의 변경됨은 `Object.is()`를 사용하여 이전 값과 얕은 비교를 통해 확인한다.
- `useCallback`은 성능 최적화를 위해 사용되며, 남용하면 오히려 성능이 떨어질 수 있다. 평소에는 사용하지 않다가 필요하다고 생각하는 경우에만 적용하는 것이 좋다.
- 다른 훅의 종속성을 메모화할 때 사용한다.

## memo

```ts
const MemoizedComponent = memo(SomeComponent);
```

- `meom`는 이 컴포넌트를 수정하지 않고 메모화된 새 컴포넌트를 반환한다.
- 함수 및 `forwardRef` 컴포넌트를 포함한 모든 유효한 React 컴포넌트를 사용할 수 있다.
- 부모 컴포넌트가 다시 렌더링될 때 소품이 변경되지 않는 한 메모화된 컴포넌트는 항상 다시 렌더링하지는 않는다.
- `useMemo`와 `useCallback`과의 조합으로 컴포넌트의 리렌더링을 줄이는 데에 사용한다.

## Context API

Context API는 아래와 같은 경우 사용된다.

- 전역에 값을 선언하여 여러 컴포넌트들에게 제공해야 하는 경우
- 동일한 값을 같은 컴포넌트들에게 제공해야 하는 경우

```ts
// Group.tsx
interface Context {
  name: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

// 1. Context 생성
const GroupContext = createContext<Context>({
  name: '',
  onChange: () => {},
});

interface Props {
  children: React.ReactNode;
  name: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

// 2. Provider로 내보낼 value 정의
export function Group({ children, name, onChange }: Props) {
  const field = useMemo(
    () => ({
      name,
      onChange,
    }),
    [name, onChange],
  );

  return <GroupContext.Provider value={field}>{children}</GroupContext.Provider>;
}

// 3. 커스텀 훅 작성
export function useGroup() {
  return useContext(GroupContext);
}
```

```ts
// Radio.tsx
interface Props { value: string }

// 4. 자식 컴포넌트에서 커스텀 훅 사용
function Radio({ value }: Props) {
  const { name, onChange } = useGroup();

  return <input type='radio' name={name} value={value} onChange={onChange} />;
}
```

```ts
// App.tsx
export default function App() {
  const [value, setValue] = useState('');

  return (
    <div className='App'>
      <Group
        name='radio'
        onChange={(e) => {
          setValue(e.target.value);
        }}>
        <Radio value='foo' />
        <Radio value='bar' />
        <Radio value='baz' />
      </Group>
    </div>
  );
}
```
