---
folderName: react_hook_form
title: React Hook Form
tag: react
isPublished: true
---

useFieldArray automatically generates a unique identifier named id which is used for key prop. For more information why this is required: https://react.dev/learn/rendering-lists

The field.id (and not index) must be added as the component key to prevent re-renders breaking the fields:

```ts
// ✅ correct:
{fields.map((field, index) => <input key={field.id} ... />)}

// ❌ incorrect:
{fields.map((field, index) => <input key={index} ... />)}
```

```tsx
import { useEffect, useState } from 'react';

export function App() {
  const [list, setList] = React.useState<string[]>([]);

  React.useEffect(() => {
    setList([crypto.randomUUID(), crypto.randomUUID(), crypto.randomUUID()]);
  }, []);

  return (
    <div>
      <div style={{ display: 'flex', gap: 8, marginTop: 2 }}>
        <button
          style={{ border: '1px solid black', padding: 4, cursor: 'pointer' }}
          onClick={() => {
            setList((prev) => [crypto.randomUUID(), crypto.randomUUID(), crypto.randomUUID()]);
          }}
        >
          reset
        </button>
        <button
          style={{ border: '1px solid black', padding: 4, cursor: 'pointer' }}
          onClick={() => {
            setList((prev) => [crypto.randomUUID(), ...prev]);
          }}
        >
          unshift
        </button>
        <button
          style={{ border: '1px solid black', padding: 4, cursor: 'pointer' }}
          onClick={() => {
            setList((prev) => [...prev, crypto.randomUUID()]);
          }}
        >
          push
        </button>
        <button
          style={{ border: '1px solid black', padding: 4, cursor: 'pointer' }}
          onClick={() => {
            setList((prev) => [...prev.slice(0, 2), crypto.randomUUID(), ...prev.slice(2)]);
          }}
        >
          middle add
        </button>
        <button
          style={{ border: '1px solid black', padding: 4, cursor: 'pointer' }}
          onClick={() => {
            setList((prev) => [...prev.slice(1)]);
          }}
        >
          shift
        </button>
        <button
          style={{ border: '1px solid black', padding: 4, cursor: 'pointer' }}
          onClick={() => {
            setList((prev) => [...prev.slice(0, -1)]);
          }}
        >
          pop
        </button>
        <button
          style={{ border: '1px solid black', padding: 4, cursor: 'pointer' }}
          onClick={() => {
            setList((prev) => [...prev.slice(0, 2), ...prev.slice(3)]);
          }}
        >
          middle delete
        </button>
        <button
          style={{ border: '1px solid black', padding: 4, cursor: 'pointer' }}
          onClick={() => {
            setList((prev) => {
              const copy = [...prev];
              copy.reverse();
              return copy;
            });
          }}
        >
          sort
        </button>
      </div>

      <div style={{ display: 'flex', gap: 8 }}>
        <div>
          <p>no_key_group</p>
          <ul id='no_key_group'>
            {list.map((item) => {
              return <li data-key='no_key'>{item.slice(0, 7)}</li>;
            })}
          </ul>
          <ul id='no_key_checkbox_group'>
            {list.map((item) => {
              return (
                <div data-key='no_key'>
                  <input type='checkbox' />
                  <label>{item.slice(0, 7)}</label>
                </div>
              );
            })}
          </ul>
        </div>
        <div>
          <p>index_key_group</p>
          <ul id='index_key_group'>
            {list.map((item, index) => {
              return (
                <li key={index} data-key={index}>
                  {item.slice(0, 7)}
                </li>
              );
            })}
          </ul>
          <ul id='index_key_checkbox_group'>
            {list.map((item, index) => {
              return (
                <div key={index} data-key={index}>
                  <input type='checkbox' />
                  <label>{item.slice(0, 7)}</label>
                </div>
              );
            })}
          </ul>
        </div>
        <div>
          <p>Math.random()_key_group</p>
          <ul id='Math.random()_key_group'>
            {list.map((item) => {
              return (
                <li key={Math.random()} data-key={Math.random()}>
                  {item.slice(0, 7)}
                </li>
              );
            })}
          </ul>
          <ul id='Math.random()_key_checkbox_group'>
            {list.map((item) => {
              return (
                <div key={Math.random()} data-key={Math.random()}>
                  <input type='checkbox' />
                  <label>{item.slice(0, 7)}</label>
                </div>
              );
            })}
          </ul>
        </div>
        <div>
          <p>unique_key_group</p>
          <ul id='unique_key_group'>
            {list.map((item) => {
              return (
                <li key={item} data-key={item}>
                  {item.slice(0, 7)}
                </li>
              );
            })}
          </ul>
          <ul id='unique_key_checkbox_group'>
            {list.map((item) => {
              return (
                <div key={item} data-key={item}>
                  <input type='checkbox' />
                  <label>{item.slice(0, 7)}</label>
                </div>
              );
            })}
          </ul>
        </div>
      </div>
    </div>
  );
}
```
