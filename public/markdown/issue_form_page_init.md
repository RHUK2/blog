---
fileName: issue_form_page_init
updatedAt: 2024-10-02
title: 폼 수정 페이지의 초기화 이슈
tag: react, error
isPublished: true
---

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
