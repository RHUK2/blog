---
updatedAt: 2024-04-29
directory: react
fileName: component
title: component
description:
---

# Component

- [제어 컴포넌트](#제어-컴포넌트)
- [비제어 컴포넌트](#비제어-컴포넌트)
- [바닐라 자바스크립트 폼 제어](#바닐라-자바스크립트-폼-제어)
- [값 수정 시](#값-수정-시)
- [다중 요소 참조](#다중-요소-참조)
- [value, checked, defaultValue, defaultChecked](#value-checked-defaultvalue-defaultchecked)
- [oninput vs onchange](#oninput-vs-onchange)
- [내가 생각하는 컴포넌트의 종류](#내가-생각하는-컴포넌트의-종류)
- [값을 반환하냐? 컴포넌트를 반환하냐?](#값을-반환하냐-컴포넌트를-반환하냐)
- [비동기 데이터가 포함된 컴포넌트](#비동기-데이터가-포함된-컴포넌트)

## 제어 컴포넌트

- 제어 컴포넌트는 `value`, `checked`와 상태를 연결하고 `onChange`에 상태 핸들링 함수를 넘겨 값을 제어할 수 있다.
- 값의 초기값은 상태값의 초기값으로 설정 가능하다.

```ts
import { ChangeEvent, FormEvent, useState } from 'react';

function App() {
  const [form, setForm] = useState({
    text: '',
    textarea: '',
    select: 'select2',
    files: {},
    radio: 'radio2',
    checkboxAll: false,
    checkbox: [
      { id: 1, checked: false },
      { id: 2, checked: false },
      { id: 3, checked: false },
    ],
    range: '0',
    color: '#ffffff',
    date: new Date().toISOString().split('T')[0],
  });

  function handleInputForm(e: ChangeEvent<HTMLInputElement>) {
    const name = e.target.name;
    const value = e.target.value;
    let result = {};

    switch (name) {
      case 'text':
        // Enter 입력 시 제출 이벤트 방지
        e.preventDefault();

        result = { text: value };
        break;
      case 'radio':
        result = { radio: value };
        break;
      case 'range':
        result = { range: value };
        break;
      case 'color':
        result = { color: value };
        break;
      case 'date':
        result = { date: value };
        break;
      default:
        break;
    }

    setForm((prev) => ({
      ...prev,
      ...result,
    }));
  }

  function handleFileForm(e: ChangeEvent<HTMLInputElement>) {
    const files = e.target.files != null ? e.target.files : {};

    setForm((prev) => ({
      ...prev,
      files: files,
    }));
  }

  function handleCheckboxForm(e: ChangeEvent<HTMLInputElement>) {
    const name = e.target.name;
    const value = e.target.value;
    const checked = e.target.checked;

    if (name === 'checkboxAll') {
      setForm((prev) => ({
        ...prev,
        checkboxAll: checked,
        checkbox: prev.checkbox.map((cb) => ({ ...cb, checked: checked })),
      }));
    } else {
      setForm((prev) => ({
        ...prev,
        checkbox: prev.checkbox.map((cb) => (cb.id === parseInt(value) ? { ...cb, checked: checked } : cb)),
      }));
      setForm((prev) => ({
        ...prev,
        checkboxAll: prev.checkbox.every((cb) => cb.checked),
      }));
    }
  }

  function handleSelectForm(e: ChangeEvent<HTMLSelectElement>) {
    const value = e.target.value;

    setForm((prev) => ({
      ...prev,
      select: value,
    }));
  }

  function handleTextareaForm(e: ChangeEvent<HTMLTextAreaElement>) {
    const value = e.target.value;

    setForm((prev) => ({
      ...prev,
      textarea: value,
    }));
  }

  function isValid() {
    // 상태 값으로 유효성 판단
    if (true) {
      return true;
    } else {
      return false;
    }
  }

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    // 제출 이벤트 방지
    e.preventDefault();

    if (isValid()) {
      // 상태 값으로 HTTP 요청
      const body = {
        text: form.text,
        textarea: form.textarea,
        select: form.select,
        files: form.files,
        radio: form.radio,
        checkbox: form.checkbox.filter((cb) => cb.checked).map((cb) => cb.id),
        range: form.range,
        color: form.color,
        date: form.date,
      };

      console.log(body);
    } else {
      // 유효성 실패
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <input type='text' name='text' value={form.text} onChange={handleInputForm} />
      <textarea value={form.textarea} onChange={handleTextareaForm} />
      <input type='file' onChange={handleFileForm} multiple />
      <select value={form.select} onChange={handleSelectForm}>
        <option value=''>-</option>
        <option value='select1'>select1</option>
        <option value='select2'>select2</option>
        <option value='select3'>select3</option>
      </select>
      <input type='radio' name='radio' value='radio1' checked={form.radio === 'radio1'} onChange={handleInputForm} />
      <input type='radio' name='radio' value='radio2' checked={form.radio === 'radio2'} onChange={handleInputForm} />
      <input type='radio' name='radio' value='radio3' checked={form.radio === 'radio3'} onChange={handleInputForm} />
      <input type='checkbox' name='checkboxAll' checked={form.checkboxAll} onChange={handleCheckboxForm} />
      {form.checkbox.map((cb) => (
        <input
          key={`checkbox_${cb.id}`}
          type='checkbox'
          name={`checkbox_${cb.id}`}
          value={cb.id.toString()}
          checked={cb.checked}
          onChange={handleCheckboxForm}
        />
      ))}
      <input type='range' name='range' value={form.range} min={0} max={50} step={0.5} onChange={handleInputForm} />
      <input type='color' name='color' value={form.color} onChange={handleInputForm} />
      <input type='date' name='date' value={form.date} onChange={handleInputForm} />
      <button type='submit'>Submit</button>
    </form>
  );
}

export default App;
```

## 비제어 컴포넌트

- 비제어 컴포넌트는 `useRef`로 요소 객체를 가져와 직접 요소 객체의 `value`, `checked` 값을 사용한다.
- 상태 값으로 제어되지 않고 기존 Javascript에서 제어하는 방식과 동일한 것이 비제어 컴포넌트이다.
- 값의 초기값은 `defaultValue`, `defaultChecked`로 설정이 가능하다. 이는 React에서 `value`와 `checked`가 상태 제어용으로 쓰이기 때문에 만들어졌다.

```ts
import { FormEvent, useEffect, useMemo, useRef } from 'react';

function App() {
  const form = useRef<HTMLFormElement>(null);
  const text = useRef<HTMLInputElement>(null);
  const textarea = useRef<HTMLTextAreaElement>(null);
  const select = useRef<HTMLSelectElement>(null);
  const files = useRef<HTMLInputElement>(null);
  const checkboxAll = useRef<HTMLInputElement>(null);
  const checkbox = useRef<(HTMLInputElement | null)[]>([]);
  const range = useRef<HTMLInputElement>(null);
  const color = useRef<HTMLInputElement>(null);
  const date = useRef<HTMLInputElement>(null);

  const ids = useMemo(() => [1, 2, 3], []);

  function isValid() {
    // ref 값으로 유효성 판단
    if (true) {
      return true;
    } else {
      return false;
    }
  }

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    // 제출 이벤트 방지
    e.preventDefault();

    if (isValid()) {
      // ref 값으로 HTTP 요청
      const body = {
        text: text.current?.value ?? '',
        textarea: textarea.current?.value ?? '',
        select: select.current?.value ?? 'select2',
        files: files.current?.files ?? null,
        radio: (form.current?.elements.namedItem('radio') as RadioNodeList).value ?? 'radio2',
        checkbox: checkbox.current?.filter((cb) => cb?.checked).map((cb) => cb?.value && parseInt(cb.value)),
        range: range.current?.value ?? '0',
        color: color.current?.value ?? '#ffffff',
        date: date.current?.value ?? new Date().toISOString().split('T')[0],
      };

      console.log(body);
    } else {
      // 유효성 실패
    }
  }

  useEffect(() => {
    if (checkboxAll.current == null) return;
    if (checkbox.current == null) return;

    const checkboxAllRef = checkboxAll.current;
    const checkboxRef = checkbox.current;

    function handleCheckboxForm(this: HTMLInputElement, e: Event) {
      const name = this.name;
      const checked = this.checked;

      if (name === 'checkboxAll') {
        checkbox.current.forEach((cb) => cb && (cb.checked = checked));
      } else {
        if (checkboxAll.current == null) return;

        checkboxAll.current.checked = checkbox.current.every((cb) => cb && cb.checked);
      }
    }

    checkboxAllRef.addEventListener('input', handleCheckboxForm);
    checkboxRef.forEach((ref) => ref?.addEventListener('input', handleCheckboxForm));

    return () => {
      checkboxAllRef.removeEventListener('input', handleCheckboxForm);
      checkboxRef.forEach((ref) => ref?.removeEventListener('input', handleCheckboxForm));
    };
  }, []);

  return (
    <form ref={form} onSubmit={onSubmit}>
      <input type='text' name='text' ref={text} />
      <textarea name='textarea' ref={textarea} />
      <input type='file' name='files' ref={files} multiple />
      <select name='select' ref={select} defaultValue={'select2'}>
        <option value=''>-</option>
        <option value='select1'>select1</option>
        <option value='select2'>select2</option>
        <option value='select3'>select3</option>
      </select>
      <input type='radio' name='radio' value='radio1' />
      <input type='radio' name='radio' value='radio2' defaultChecked />
      <input type='radio' name='radio' value='radio3' />
      <input type='checkbox' name='checkboxAll' ref={checkboxAll} />
      {ids.map((id, index) => (
        <input
          key={`checkbox_${id}`}
          type='checkbox'
          name='checkbox'
          value={id.toString()}
          ref={(elem) => (checkbox.current[index] = elem)}
        />
      ))}
      <input type='range' name='range' min={0} max={50} step={0.5} ref={range} defaultValue={'0'} />
      <input type='color' name='color' ref={color} defaultValue={'#ffffff'} />
      <input type='date' name='date' ref={date} defaultValue={new Date().toISOString().split('T')[0]} />
      <button type='submit'>Submit</button>
    </form>
  );
}

export default App;
```

## 바닐라 자바스크립트 폼 제어

```html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
  </head>
  <body>
    <form>
      <input type="text" name="text" />
      <textarea name="textarea"></textarea>
      <input type="file" name="files" multiple />
      <select name="select">
        <option value="">-</option>
        <option value="select1">select1</option>
        <option value="select2" selected>select2</option>
        <option value="select3">select3</option>
      </select>
      <input type="radio" name="radio" value="radio1" />
      <input type="radio" name="radio" value="radio2" checked />
      <input type="radio" name="radio" value="radio3" />
      <input type="checkbox" name="checkboxAll" />
      <input type="range" name="range" value="0" min="0" max="50" step="0.5" />
      <input type="color" name="color" value="#ffffff" />
      <input type="date" name="date" />
      <button type="submit">Submit</button>
    </form>
  </body>
  <script>
    const form = document.querySelector('form');
    const text = document.querySelector('input[type="text"]');
    const textarea = document.querySelector('textarea');
    const select = document.querySelector('select');
    const files = document.querySelector('input[type="file"]');
    const checkboxAll = document.querySelector('input[name="checkboxAll"]');
    const range = document.querySelector('input[type="range"]');
    const color = document.querySelector('input[type="color"]');
    const date = document.querySelector('input[type="date"]');

    date.value = new Date().toISOString().split('T')[0];

    const ids = [1, 2, 3];

    ids.map((id) => {
      const checkbox = document.createElement('input');
      checkbox.setAttribute('type', 'checkbox');
      checkbox.setAttribute('name', 'checkbox');
      checkbox.setAttribute('value', id.toString());
      form.insertBefore(checkbox, range);
    });

    const checkbox = document.querySelectorAll('input[name="checkbox"]');

    function handleCheckboxForm(e) {
      const name = e.target.name;
      const checked = e.target.checked;

      if (name === 'checkboxAll') {
        checkbox.forEach((cb) => cb && (cb.checked = checked));
      } else {
        checkboxAll.checked = Array.from(checkbox).every((cb) => cb && cb.checked);
      }
    }

    function onSubmit(e) {
      e.preventDefault();

      const body = {
        text: text.value,
        textarea: textarea.value,
        select: select.value,
        files: files.files,
        radio: form.elements.namedItem('radio').value,
        checkbox: Array.from(checkbox)
          .filter((cb) => cb.checked)
          .map((cb) => parseInt(cb.value)),
        range: range.value,
        color: color.value,
        date: date.value,
      };

      console.log(body);
    }

    function register() {
      checkboxAll.addEventListener('input', handleCheckboxForm);
      checkbox.forEach((cb) => {
        cb.addEventListener('input', handleCheckboxForm);
      });
      form.addEventListener('submit', onSubmit);
    }

    register();
  </script>
</html>
```

## 값 수정 시

사용자 입력했던 DB 값을 보여주는 디스플레이와 입력이 동시에 되는 인풋

DB 값을 보여주는 디스플레이와 입력이 분리되는 인풋

## 다중 요소 참조

```js
<Popper
  open={menuPopper}
  onClose={() => setMenuPopper(false)}
  ref={menuPopperRef.current[activeMenuPopper.index]} // <<<<-----
>
  <div css={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
    <Link to={`/admin/job/${activeMenuPopper.id}`}>
      <Button fullWidth>
        {intl.formatMessage({ id: 'text.detail.job.post', defaultMessage: '채용공고 상세보기' })}
      </Button>
    </Link>
    <Link to={`/admin/job/${activeMenuPopper.id}/recruiter`}>
      <Button fullWidth>{intl.formatMessage({ id: 'text.recruiter.manage', defaultMessage: '리크루터 관리' })}</Button>
    </Link>
    <Link to={`/admin/job/${activeMenuPopper.id}/candidate`}>
      <Button fullWidth>{intl.formatMessage({ id: 'text.candidate.manage', defaultMessage: '후보자 관리' })}</Button>
    </Link>
    <Link to={`/admin/job/${activeMenuPopper.id}/qna`}>
      <Button fullWidth>{intl.formatMessage({ id: 'text.qna.manage', defaultMessage: 'Q&A 관리' })}</Button>
    </Link>
  </div>
</Popper>
```

## value, checked, defaultValue, defaultChecked

HTML 파일에서 체크박스나 라디오 인풋의 `checked` 속성은 초기값을 설정하는 속성이다. `checked` 속성은 `Boolean` 타입으로 HTML에서 `Boolean` 타입은 해당 속성을 단순히 명시하거나 명시하지 않는 방식으로 제어한다. 아래와 같이 문자열을 넣든 빈 문자열을 넣든 명시할 경우 `true` 값이 된다.

```html
<!-- checked === true -->
<input type="checkbox" checked />
<input type="checkbox" checked="" />
<input type="checkbox" checked="false" />
<!-- checked === false -->
<input type="checkbox" />
```

## oninput vs onchange

- `oninput`: 사용자가 입력을 생성하고 수정하는 매 순간 이벤트가 발생
- `onchange`: 사용자가 입력을 생성하고 수정한 후 포커스를 잃을 때 발생

리액트에서 `onchange`는 `oninput`과 동일한 방식으로 동작하며 기본 `onchange`의 동작은 지원하지 않는다. 이유는 불분명하고 설계상 이슈일 확률이 크다.

## 내가 생각하는 컴포넌트의 종류

MUI 라이브러리와 같이 `variant`와 여러가지 속성을 통해 디자인의 변화만을 주는 컴포넌트를 디자인 컴포넌트라고 나는 정의했다. 디자인 컴포넌트는 매우 재사용성이 높다. 하지만 서버의 요청을 보내기 위해 일반적인 입력이 아닌 인풋 컴포넌트나 비동기 데이터와 연동되어 데이터를 출력하는 컴포넌트는 재사용성이 떨어진다.

그래서 나는 재사용성이 높은 디자인 컴포넌트와 해당 디자인 컴포넌트들을 사용해 단일 책임 원칙을 따르는 데이터 컴포넌트 두가지의 컴포넌트로 구성된다고 생각한다. 비동기 데이터 컴포넌트의 경우 비동기 데이터의 상태까지 같이 받아서 해당 데이터의 상태에 따라 표현하는 UI를 같이 작성하는 방향으로 생각하자

도메인, 권한 등등 분기되는 로직이 최대한 들어가지 않게 작성하도록 하며, 분기가 필요한 경우 새로운 파일에 작성하는 것이 옳다고 생각한다.

## 값을 반환하냐? 컴포넌트를 반환하냐?

만약 어떠한 값에 따라 색깔이 변경되는 컴포넌트가 있다고 하자. 처음 든 생각은 컴포넌트를 구성하는 요소에 필요한 데이터와 동적으로 변경되는 색깔 값을 객체 배열로 생성하고 해당 객체를 `map()`으로 요소와 함께 뿌려주려고 생각했다. 하지만 단순히 색깔만 고려하는 게 아니고 요소의 속성이나 요소 값이 바뀐다고 생각하면 객체 값의 재정의가 필요하고 통일성도 떨어진다. 그래서 위와 같은 상황에서는 요소 값 또는 컴포넌트 값을 리턴하는 것이 훨씬 낫다.

만약 스타일 변경 없이 단순히 입력에 따라 출력 데이터가 바뀌는 경우에는 값을 반환하는 것이 좋다.

<!-- todo: 내용 보완 필요 -->

## 비동기 데이터가 포함된 컴포넌트

비동기 데이터의 로딩 상태를 고려해서 작성해야한다.

페이지네이션 작성 시 셀렉트 리스트 데이터가 다 오지 않았는데 값을 선택하려다 보니 에러가 발생했음

데이터가 로딩된 이후에 동작되어야함.
