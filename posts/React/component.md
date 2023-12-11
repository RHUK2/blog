# Component

- [Component](#component)
  - [제어 컴포넌트 vs 비제어 컴포넌트](#제어-컴포넌트-vs-비제어-컴포넌트)
  - [forwardRef()](#forwardref)
  - [useImperativeHandle](#useimperativehandle)
  - [react-hook-form 제어 컴포넌트 연동](#react-hook-form-제어-컴포넌트-연동)
  - [내가 생각하는 컴포넌트의 종류](#내가-생각하는-컴포넌트의-종류)
  - [값이 아니라 컴포넌트를 반환하자](#값이-아니라-컴포넌트를-반환하자)
  - [한 개의 input 요소로 output을 만드는 제어 컴포넌트](#한-개의-input-요소로-output을-만드는-제어-컴포넌트)
  - [여러 개의 input 요소로 output을 만드는 제어 컴포넌트](#여러-개의-input-요소로-output을-만드는-제어-컴포넌트)
  - [Wrapper로 감싸지면 그룹핑되는 컴포넌트](#wrapper로-감싸지면-그룹핑되는-컴포넌트)

## 제어 컴포넌트 vs 비제어 컴포넌트

제어 컴포넌트와 비제어 컴포넌트는 `input` 요소의 상태 관리 방식을 의미한다.

제어 컴포넌트는 React의 상태값과 입력 필드값이 동기화되고 입력 필드값이 변경됐을 때, 상태값을 조작하고 리렌더링을 발생시키는 핸들러가 동작하는 방식으로 제어된다. 상태를 활용하므로 React가 값을 추적하면서 유효성 검사, 값을 수정 또는 가공하는 등의 추가적인 로직을 구현하기에 용이하다.

비제어 컴포넌트는 React의 상태를 사용하지 않고 입력 필드값을 직접 처리한다. 바닐라 자바스크립트에 동작과 동일하다고 보면 된다. React는 입력 필드의 값을 추적하지 않고, 직접 DOM에서 값을 가져오거나 업데이트합니다. `ref`를 사용하여 입력 필드의 DOM 요소에 접근하고, 이벤트 핸들러를 이용해 값의 변경을 감지한다. 값을 추적하거나 수정하는 데 제한적이며, 유효성 검사나 추가적인 로직을 구현하기에는 제한적이다.

`props`로 `value`와 `onChange`를 받는다면 `useEffect`를 이용해 값 업데이트도 필요하다.

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
      Button
    </button>
  );
}
```

버튼을 클릭하면 해당 버튼 요소의 정보가 콘솔에 출력된다.

사용자 정의 컴포넌트 내부 요소의 `ref` 속성을 참조하려는 경우 `forwardRef()` 메서드를 사용해야 한다.

```js
const MyButton = forwardRef((props, ref) => {
  return (
    <button ref={ref} {...props}>
      Button
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
      Button
    </MyButton>
  );
}
```

버튼을 클릭하면 사용자 정의 버튼 요소의 정보가 콘솔에 출력된다.

기본적으로 React는 가상 DOM을 이용해 실제 DOM을 추상화하고 관리하기 때문에 리액트의 메커니즘이 아닌 기존 바닐라 자바스크립트 메커니즘으로 실제 DOM을 수정하려고 할 경우 문제가 생길 수 있다. 그렇기 때문에 DOM 노드를 참조해서 기능을 생성할 때 포커스 관리, 스크롤 위치 수정과 같은 비파괴적인 작업은 상관없지만 `remove()`와 같이 해당 노드를 삭제하는 행위는 리액트에서 오류를 분출한다.

## useImperativeHandle

`forwardRef()`로 감싸진 컴포넌트는 `ref`가 요소와 연결되면 해당 요소를 컴포넌트 내부에서 조작을 할 수 없게 된다. `useImperativeHandle()`이라는 리액트에서 제공해주는 훅을 사용하면 컴포넌트 내부에서 요소의 연결된 `ref`를 조작할 수 있고 `ref`를 상위 컴포넌트에 내보낼 때 `ref`를 커스텀해서 보낼 수 있다.

```js
// useImperativeHandle 사용 전
const FileInput = forwardRef(({ buttonProps, ...inputProps }, ref) => {
  return (
    <div>
      <input css={{ display: 'none' }} ref={ref} type='file' {...inputProps} />

      <Button onClick={(e) => /* input 요소를 클릭하게 하고싶다.. */} {...buttonProps}>
        <span className='material-icons'>file_upload</span>
      </Button>
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
        <span className='material-icons'>file_upload</span>
      </Button>
    </div>
  );
});

```

## react-hook-form 제어 컴포넌트 연동

`useController`, `Controller` API를 이용해서 제어 컴포넌트와 연동한다.

사실상 리액트에서 비제어 컴포넌트로 커스텀 컴포넌트를 제작하는 건 좋지 않고 어렵기도 하다.

비제어로 연결해서 사용할 컴포넌트는 최대한 html 입력 태그와 연동하고,

해당 태그들로 제작이 어려운 커스텀 컴포넌트의 경우 제어 컴포넌트로 제작 후 위 api와 연동한다.

```js
// 디테일한 정보는 공식 문서에서 확인
<Controller
  name='select'
  control={control}
  render={({ field }) => <Select id='select' value={field.value} onChange={field.onChange} />}
/>
```

<!-- todo: 내용 보완 필요 -->

## 내가 생각하는 컴포넌트의 종류

MUI 라이브러리와 같이 `variant`와 여러가지 속성을 통해 디자인의 변화만을 주는 컴포넌트를 디자인 컴포넌트라고 나는 정의했다.
디자인 컴포넌트는 매우 재사용성이 높다.
하지만 서버의 요청을 보내기 위해 알맞은 입력을 주기 위한 인풋 컴포넌트나
비동기 데이터와 연동되어 데이터를 출력하는 컴포넌트는 재사용성이 떨어진다.

그래서 나는 재사용성이 높은 디자인 컴포넌트와 해당 디자인 컴포넌트들을 사용해 단일 책임 원칙을 따르는 데이터 컴포넌트 두가지의 컴포넌트로 구성된다고 생각한다.

- 도메인에 따라 분기되는 로직이 없다.
- 권한에 따라 분기되는 로직이 없다.
- 단일 책임의 원칙을 따른다.

비동기 데이터 컴포넌트의 경우 비동기 데이터의 상태까지 같이 넣어서 해당 로딩 상태를 표현하는 UI를 같이 작성해주도록 하자

## 값이 아니라 컴포넌트를 반환하자

만약 어떠한 값에 따라 색깔이 변경되는 컴포넌트가 있다고 하자. 처음 든 생각은 컴포넌트를 구성하는 요소에 필요한 데이터와 동적으로 변경되는 색깔 값을 객체 배열로 생성하고 해당 객체를 `map()`으로 요소와 함께 뿌려주려고 생각했다. 하지만 단순히 색깔만 고려하는 게 아니고 요소의 속성이나 요소 값이 바뀐다고 생각하면 객체 값의 재정의가 필요하고 통일성도 떨어진다. 그래서 위와 같은 상황에서는 요소 값 또는 컴포넌트 값을 리턴하는 것이 훨씬 낫다.

## 한 개의 input 요소로 output을 만드는 제어 컴포넌트

```js
const Switch = forwardRef(({ checked = false, onChange = () => {}, ...inputProps }, ref) => {
  const [isOn, setIsOn] = useState(checked);
  const [isClickable, setIsClickable] = useState(true);

  const inputRef = useRef(null);

  useImperativeHandle(ref, () => inputRef.current);

  function handleSwitch(e) {
    setIsOn(checked);
    onChange(e);
  }

  useEffect(() => {
    if (isOn !== checked) setIsOn(checked);
  }, [checked, isOn]);

  return (
    <div
      css={{
        transition: isClickable === false ? 'background-color 0.3s cubic-bezier(0.25, 1, 0.5, 1)' : 'none',
        display: 'flex',
        alignItems: 'center',
        padding: '0px 5px',
        width: 50,
        height: 25,
        borderRadius: 20,
        backgroundColor: isOn ? $color.primary : $color.grey[5],
        cursor: 'pointer',
        boxShadow: 'inset 2px 2px 2px rgba(0, 0, 0, 0.16)',
      }}
      onClick={() => {
        if (isClickable) {
          inputRef.current.click();
          setIsClickable(false);
          return;
        }
      }}
      onTransitionEnd={() => setIsClickable(true)}
    >
      <div
        css={{
          transition: isClickable === false ? 'transform 0.3s cubic-bezier(0.25, 1, 0.5, 1)' : 'none',
          width: 15,
          height: 15,
          borderRadius: '50%',
          backgroundColor: 'white',
          boxShadow: '-3px 3px 3px rgba(0, 0, 0, 0.16)',
          transform: isOn ? 'translateX(25px)' : 'translateX(0px)',
        }}
      ></div>
      <input
        ref={inputRef}
        type='checkbox'
        checked={isOn}
        css={{ display: 'none' }}
        onChange={handleSwitch}
        {...inputProps}
      />
    </div>
  );
});
```

## 여러 개의 input 요소로 output을 만드는 제어 컴포넌트

```js
// ? @param output 'string' or [{ object }, 'object key string']

function TextListInput({ output = 'string', disabled = false, value = [], onChange = () => {}, ...inputProps }) {
  const intl = useIntl();

  const [text, setText] = useState('');

  const [textList, setTextList] = useState(value);

  function handleClick(e) {
    const targetValue = e.target.dataset.value;

    const copyTextList = [...textList];

    if (output === 'string') {
      const value = targetValue;
      const index = copyTextList.findIndex((text) => text === value);

      copyTextList.splice(index, index !== -1 ? 1 : 0);
    } else if (Array.isArray(output) && output.length === 2) {
      const value = {
        ...output[0],
        [output[1]]: targetValue,
      };
      const index = copyTextList.findIndex((object) => object[output[1]] === value[output[1]]);

      copyTextList.splice(index, index !== -1 ? 1 : 0);
    }

    setTextList(copyTextList);
    onChange(copyTextList);
  }

  function handleKeyUp(e) {
    const targetValue = e.target.value.replace(/\s/g, '');

    if (targetValue.length === 0) return;

    if (e.key === 'Enter' || e.key === ' ') {
      const copyTextList = [...textList];
      let updatedValue = [];

      if (output === 'string') {
        const value = targetValue;

        updatedValue = copyTextList.includes(value) ? copyTextList : copyTextList.concat(targetValue);
      } else if (Array.isArray(output) && output.length === 2) {
        const value = {
          ...output[0],
          [output[1]]: targetValue,
        };

        updatedValue = copyTextList.find((object) => object[output[1]] === value[output[1]])
          ? copyTextList
          : copyTextList.concat(value);
      }

      setText('');
      setTextList(updatedValue);
      onChange(updatedValue);
    }
  }

  useEffect(() => {
    setTextList(value);
  }, [value]);

  return (
    <div
      css={{
        position: 'relative',
        display: 'flex',
        alignItems: 'center',
        flexWrap: 'wrap',
        gap: 8,
        padding: 8,
        backgroundColor: disabled ? $color.disabled : $color.white,
        color: disabled ? $color.disabledText : 'canvastext',
        border: `1px solid ${$color.divider}`,
        borderRadius: 4,
        minHeight: 40,
        '&:hover': {
          boxShadow: disabled ? 'none' : $boxShadow.shallow,
        },
        '&:focus-within': {
          outline: `${$color.black} solid 1px`,
          boxShadow: $boxShadow.shallow,
        },
      }}
    >
      {textList.map((text, index) => (
        <span
          key={`${text}${index}`}
          css={{
            borderRadius: 8,
            padding: '0 8px',
            backgroundColor: disabled ? $color.grey[2] : $color.grey[1],
            cursor: disabled ? 'not-allowed' : 'pointer',
          }}
          data-value={output === 'string' ? text : text[output[1]]}
          onClick={disabled ? () => {} : (e) => handleClick(e, index)}
        >
          {output === 'string' ? text : text[output[1]]}
        </span>
      ))}
      <input
        css={{
          backgroundColor: 'transparent',
          border: 'none',
          padding: 0,
          flex: '1 0 0',
          minWidth: 40,
          '&:focus': {
            outline: 'none',
          },
        }}
        type='text'
        inputMode='search'
        disabled={disabled}
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder={intl.formatMessage({ id: 'placeholder.input', defaultMessage: '입력' })}
        onKeyUp={handleKeyUp}
        {...inputProps}
      />
    </div>
  );
}
```

## Wrapper로 감싸지면 그룹핑되는 컴포넌트

```js
// CheckboxGroup.js
const CheckBoxGroupContext = createContext();

const CheckBoxGroup = ({ value = [], onChange = () => {}, children, ...inputProps }) => {
  const [group, setGroup] = useState(value);

  return (
    <>
      <CheckBoxGroupContext.Provider value={[group, setGroup, onChange]}>{children}</CheckBoxGroupContext.Provider>
    </>
  );
};

// Checkbox.js
const CheckBox = forwardRef(({ checked = false, value = '', onChange = () => {}, ...inputProps }, ref) => {
  const [group, setGroup, onGroupChange] = useContext(CheckBoxGroupContext) ?? [null, null];

  const [_checked, setChecked] = useState(checked);

  function handleChecked(e) {
    const value = e.target.value;

    if (group !== null) {
      const copyGroup = [...group];

      if (!group.includes(value)) {
        const result = copyGroup.includes(value) ? copyGroup : copyGroup.concat(value);
        setGroup(result);
        onGroupChange({
          ...e,
          target: {
            value: result,
          },
        });
      } else {
        const result = copyGroup.filter((item) => item !== value);
        setGroup(result);
        onGroupChange({
          ...e,
          target: {
            value: result,
          },
        });
      }
    }

    setChecked(e.target.checked);
    onChange(e);
  }

  return (
    <input
      ref={ref}
      css={{
        appearance: 'none',
        cursor: 'pointer',
        minWidth: 16,
        maxWidth: 16,
        height: 16,
        padding: 0,
        outline: `1px solid ${$color.grey[6]}`,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        '&:checked': {
          outline: 'none',
          backgroundColor: $color.primary,
        },
        '&:checked:after': {
          content: '"✓"',
          color: $color.white,
        },
        '&:hover': {
          outline: `3px solid rgba(0, 0, 0, 0.2)`,
        },
        '&:disabled': {
          outline: 'none',
          opacity: 0.5,
        },
      }}
      type='checkbox'
      value={value.toString()}
      checked={group !== null ? group.includes(value.toString()) : _checked}
      onChange={handleChecked}
      {...inputProps}
    />
  );
});
```
