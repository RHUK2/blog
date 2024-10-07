---
fileName: issue_form_page_init
updatedAt: 2024-10-02
title: 폼 수정 페이지의 초기화 이슈
tag: react, error
isPublished: true
---

```ts
import { useEffect, useState } from 'react';

export function App() {
  const [list, setList] = useState<string[]>([]);

  useEffect(() => {
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
        <ul id='no_key_group'>
          {list.map((item) => {
            return <li data-key='no_key'>{item.slice(0, 7)}</li>;
          })}
        </ul>
        <ul id='Math.random()_key_group'>
          {list.map((item) => {
            return (
              <li key={Math.random()} data-key={Math.random()}>
                {item.slice(0, 7)}
              </li>
            );
          })}
        </ul>
        <ul id='index_key_group'>
          {list.map((item, index) => {
            return (
              <li key={index} data-key={index}>
                {item.slice(0, 7)}
              </li>
            );
          })}
        </ul>
        <ul id='unique_key_group'>
          {list.map((item) => {
            return (
              <li key={item} data-key={item}>
                {item.slice(0, 7)}
              </li>
            );
          })}
        </ul>
      </div>

      <div style={{ display: 'flex', gap: 8 }}>
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
  );
}
```

react-hook-form의 비제어 업데이트를 사용

렌더링 되기 전 값을 리셋시키고 렌더링해야했음

그러나 나는 렌더링이 ㅇ

하.... 대참사네..

```ts
useFieldArray automatically generates a unique identifier named id which is used for key prop. For more information why this is required: https://react.dev/learn/rendering-lists

The field.id (and not index) must be added as the component key to prevent re-renders breaking the fields:
// ✅ correct:
{fields.map((field, index) => <input key={field.id} ... />)}

// ❌ incorrect:
{fields.map((field, index) => <input key={index} ... />)}
```

```ts
useEffect(() => {
  reset();

  if (subProjectQuestionsStatus !== 'success') return;

  if (subProjectQuestionsData.questions == null || subProjectQuestionsData.questions.length <= 0) return;

  const newQuestions: ComputedQuestionResponse<ReviewerQuestionResponse>[] = [];

  let title: string | null = null;
  let subtitle: string | null = null;

  subProjectQuestionsData.questions.forEach((question) => {
    if (question.category1 === t('text.category.title')) {
      title = question.description != null && question.description.length === 0 ? null : question.description;
      return;
    } else if (question.category1 === t('text.category.description')) {
      subtitle = question.description != null && question.description.length === 0 ? null : question.description;
      return;
    }

    newQuestions.push({
      ...question,
      title,
      subtitle,
    });
  });

  const initialAnswers = newQuestions.map((question) => ({
    data: question,
    value: question.score ? (question.score.toString() ?? '') : (question.answer ?? ''),
  }));

  replace(initialAnswers);

  const answers = getValues('answers');

  if (answers.every((answer) => answer.value.length === 0)) return;

  const result = answers
    .map((answer, answer_index) => (answer.value ? null : answer_index))
    .filter((answerIndex) => answerIndex != null);

  setNoResponseList(result);
}, [subProjectQuestionsStatus, subProjectQuestionsData, reset, replace, getValues, t]);
```
