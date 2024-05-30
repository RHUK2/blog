---
updatedAt: 2024-04-29
directory: react
fileName: react-hook-form
title: React Hook Form
description:
---

# React Hook Form

- [react-hook-form 제어 컴포넌트 연동](#react-hook-form-제어-컴포넌트-연동)

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
