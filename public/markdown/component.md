---
updatedAt: 2024-07-15
directory: react
fileName: component
title: Component
description: ✅
---

# Component

- [내가 생각하는 컴포넌트의 종류](#내가-생각하는-컴포넌트의-종류)
- [맵으로 요소를 뿌려줄 때 객체 배열? 컴포넌트 배열?](#맵으로-요소를-뿌려줄-때-객체-배열-컴포넌트-배열)
- [제어 컴포넌트](#제어-컴포넌트)
- [비제어 컴포넌트](#비제어-컴포넌트)
- [바닐라 자바스크립트 폼 제어](#바닐라-자바스크립트-폼-제어)

## 내가 생각하는 컴포넌트의 종류

1. 디자인 컴포넌트

   - MUI 라이브러리와 같이 `variant`와 여러가지 속성을 통해 디자인의 변화만을 주는 컴포넌트
   - 재사용성이 높다.

2. 레이아웃 컴포넌트

   - `flex`, `grid`를 이용해 레이아웃을 잡는 박스를 의미한다.
   - 페이지 레이아웃을 잡거나, 디자인 컴포넌트를 조합할 때 사용한다.
   - 재사용성이 높다.

3. 데이터 출력 컴포넌트

   - 단일 또는 다중 디자인 컴포넌트의 조합으로 구성된다.
   - `props`로 비동기 데이터가 넘어올 경우, 비동기 데이터 상태도 넘겨 받아 UI로 표현해준다.
   - 재사용성이 낮다

4. 데이터 입력 컴포넌트

   - 단일 또는 다중 디자인 컴포넌트의 조합으로 구성된다.
   - 입력 값과 해당 입력 값이 서버를 거쳐 나온 응답값의 포맷이 동일하지 않은 경우, 응답값을 출력하는 UI도 같이 작성한다.
   - 재사용성이 낮다

5. 데이터 출력 + 입력 컴포넌트

   - 단일 또는 다중 디자인 컴포넌트의 조합으로 구성된다.
   - `props`로 비동기 데이터가 넘어올 경우, 비동기 데이터 상태도 넘겨 받아 UI로 표현해준다.
   - 입력 값과 해당 입력 값이 서버를 거쳐 나온 응답값의 포맷이 동일하지 않은 경우, 응답값을 출력하는 UI도 같이 작성한다.
   - 재사용성이 낮다

- 도메인과 권한과 같은 분기되는 로직은 최대한 들어가지 않게 작성하고, 분기가 필요하다면 새로운 컴포넌트를 생성하는 것이 옳다고 생각한다.

## 맵으로 요소를 뿌려줄 때 객체 배열? 컴포넌트 배열?

맵으로 요소를 뿌려줄 때, 배열에 컴포넌트의 속성 데이터가 담긴 객체들을 담는 것이 좋다. 이유는 아래와 같다.

1. 성능 향상

   - 컴포넌트를 직접 배열에 담고 이를 맵핑할 경우, 매번 리렌더링 시 컴포넌트 인스턴스가 다시 생성된다. 이는 불필요한 성능 저하를 초래할 수 있다.
   - 객체 데이터를 배열에 담아 컴포넌트를 생성하면, 리렌더링 시 변경된 데이터에 대해서만 렌더링을 수행할 수 있어 성능이 향상된다.

2. 유지보수 용이

   - 데이터와 뷰가 분리되어 있어 유지보수가 용이하다. 데이터를 조작하거나 변형하는 로직이 명확하게 분리되기 때문에 코드를 이해하고 수정하기 쉬워진다.
   - 재사용성이 높아져 다른 컴포넌트나 부분에서 동일한 데이터를 다양한 방식으로 사용할 수 있다.

3. 상태 관리
   - 데이터와 컴포넌트를 분리하면 상태 관리가 더 쉬워진다. 상태 변경 시 데이터만 변경하면 되기 때문에 컴포넌트의 불필요한 리렌더링을 방지할 수 있다.

## 제어 컴포넌트

- 제어 컴포넌트는 `value`, `checked`와 상태를 연결하고 `onChange`에 상태 핸들링 함수를 넘겨 값을 제어할 수 있다.
- 값의 초기값은 상태값의 초기값으로 설정 가능하다.
- 리액트에서 `onchange`는 `oninput`과 동일한 방식으로 동작하며 기본 `onchange`의 동작은 지원하지 않는다. 이유는 불분명하고 설계상 이슈일 확률이 크다.
- 라디오, 체크박스 입력은 `value` 값을 할당하지 않으면 자동으로 `'on'` 값을 할당 받는다.

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
- `oninput`: 사용자가 입력을 생성하고 수정하는 매 순간 이벤트가 발생
- `onchange`: 사용자가 입력을 생성하고 수정한 후 포커스를 잃을 때 발생
- 라디오, 체크박스 입력은 `value` 값을 할당하지 않으면 자동으로 `'on'` 값을 할당 받는다.

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

- `document.querySelector` 메서드로 요소 객체를 가져와 직접 요소 객체의 `value`, `checked` 값을 사용한다.
- `value`, `checked`, `selected` 속성으로 초기값을 설정한다.
- `oninput`: 사용자가 입력을 생성하고 수정하는 매 순간 이벤트가 발생
- `onchange`: 사용자가 입력을 생성하고 수정한 후 포커스를 잃을 때 발생
- 라디오, 체크박스 입력은 `value` 값을 할당하지 않으면 자동으로 `'on'` 값을 할당 받는다.

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
