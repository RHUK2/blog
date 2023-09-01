# Component

- [Component](#component)
  - [제어 컴포넌트 vs 비제어 컴포넌트](#제어-컴포넌트-vs-비제어-컴포넌트)
  - [forwardRef()](#forwardref)
  - [useImperativeHandle](#useimperativehandle)
  - [재사용 가능한 컴포넌트의 특징](#재사용-가능한-컴포넌트의-특징)
  - [값이 아니라 컴포넌트를 반환하자](#값이-아니라-컴포넌트를-반환하자)

## 제어 컴포넌트 vs 비제어 컴포넌트

제어 컴포넌트와 비제어 컴포넌트는 `input` 요소의 상태 관리 방식을 의미한다.

제어 컴포넌트는 React의 상태값과 입력 필드값이 동기화되고 입력 필드값이 변경됐을 때, 상태값을 조작하고 리렌더링을 발생시키는 핸들러가 동작하는 방식으로 제어된다. 상태를 활용하므로 React가 값을 추적하면서 유효성 검사, 값을 수정 또는 가공하는 등의 추가적인 로직을 구현하기에 용이하다.

비제어 컴포넌트는 React의 상태를 사용하지 않고 입력 필드값을 직접 처리한다. 바닐라 자바스크립트에 동작과 동일하다고 보면 된다. React는 입력 필드의 값을 추적하지 않고, 직접 DOM에서 값을 가져오거나 업데이트합니다. `ref`를 사용하여 입력 필드의 DOM 요소에 접근하고, 이벤트 핸들러를 이용해 값의 변경을 감지한다. 값을 추적하거나 수정하는 데 제한적이며, 유효성 검사나 추가적인 로직을 구현하기에는 제한적이다.

```js
// Controlled Component
function ControlledComponentExample() {
  const [value, setValue] = useState('');

  const handleChange = (event) => {
    setValue(event.target.value);
  };

  return <input type='text' value={value} onChange={handleChange} />;
}

// Uncontrolled Component
function UncontrolledComponentExample() {
  const inputRef = useRef(null);

  const handleSubmit = () => {
    const value = inputRef.current.value;
    // 값 처리 로직
  };

  return (
    <div>
      <input type='text' ref={inputRef} />
      <button onClick={handleSubmit}>Submit</button>
    </div>
  );
}
```

## forwardRef()

리액트에 의해 관리되는 DOM 노드에 참조하는 방법은 아래와 같다.

```js
function App() {
  const myRef = useRef(null);

  function handleClick() {
    console.dir(myRef.current);
  }

  return (
    <button ref={myRef} onClick={handleClick}>
      Hi
    </button>
  );
}
```

버튼을 클릭하면 해당 버튼 요소의 정보가 콘솔에 출력된다.

사용자 정의 컴포넌트 내부에 `ref` 속성을 참조하려는 경우 `forwardRef()` 메서드를 사용해야 한다.

```js
const MyButton = forwardRef((props, ref) => {
  return (
    <button ref={ref} {...props}>
      Hi
    </button>
  );
});

function App() {
  const myRef = useRef(null);

  function handleClick() {
    console.dir(myRef.current);
  }

  return (
    <MyButton ref={myRef} onClick={handleClick}>
      Hi
    </MyButton>
  );
}
```

버튼을 클릭하면 사용자 정의 버튼 요소의 정보가 콘솔에 출력된다.

기본적으로 React는 가상 DOM을 이용해 실제 DOM을 추상화하고 관리하기 때문에 리액트의 메커니즘이 아닌 기존 바닐라 자바스크립트 메커니즘으로 실제 DOM을 수정하려고 할 경우 문제가 생길 수 있다. 그렇기 때문에 DOM 노드를 참조해서 기능을 생성할 때 포커스 관리, 스크롤 위치 수정과 같은 비파괴적인 작업은 상관없지만 `remove()`와 같이 해당 노드를 삭제하는 행위는 리액트에서 오류를 분출한다.

## useImperativeHandle

useImperativeHandle(ref, () => inputRef.current);

## 재사용 가능한 컴포넌트의 특징

- 도메인에 따라 분기되는 로직이 없다.
- 권한에 따라 분기되는 로직이 없다.

## 값이 아니라 컴포넌트를 반환하자
