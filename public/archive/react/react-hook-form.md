---
updatedAt: 2024-04-29
directory: react
fileName: react-hook-form
title: React Hook Form
description:
---

# React Hook Form

- [react-hook-form 제어 컴포넌트 연동](#react-hook-form-제어-컴포넌트-연동)
- [setValues](#setvalues)

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

## setValues

다음 조건에서만 다시 렌더링이 트리거됩니다:

값 업데이트로 인해 오류가 트리거되거나 수정된 경우

더티 및 터치와 같이 setValue가 상태 업데이트를 유발하는 경우.

중첩 객체의 경우 내부 속성을 타켓팅해서 업데이트하면 리렌더링 발생안함

객체를 타겟팅해서 내부 속성을 변경하면 리렌더링 발생
