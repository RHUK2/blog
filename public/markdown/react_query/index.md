---
folderName: react_query
title: React Query
tag: react
isPublished: true
---

# React Query

- [캐시 수명 관리(staleTime • gcTime)](#캐시-수명-관리staletime--gctime)
  - [1. 상태 전환 흐름](#1-상태-전환-흐름)
  - [2. 신선도 유지 시간(staleTime)](#2-신선도-유지-시간staletime)
  - [3. 가비지 컬렉션 타임(gcTime)](#3-가비지-컬렉션-타임gctime)
- [쿼리 상태 정보(status • fetchStatus)](#쿼리-상태-정보status--fetchstatus)
  - [1. status](#1-status)
  - [2. fetchStatus](#2-fetchstatus)
- [데이터 가공 및 초기값 설정(select • initialData • placeholderData)](#데이터-가공-및-초기값-설정select--initialdata--placeholderdata)
  - [1. 데이터 선택(select)](#1-데이터-선택select)
  - [2. 초기 데이터(initialData)](#2-초기-데이터initialdata)
  - [3. 플레이스홀더 데이터(placeholderData)](#3-플레이스홀더-데이터placeholderdata)
- [데이터 변이(useMutation)](#데이터-변이usemutation)
- [낙관적 업데이트(Optimistic Update)](#낙관적-업데이트optimistic-update)

## 캐시 수명 관리(staleTime • gcTime)

React Query는 서버 상태(Server State)를 효율적으로 관리하기 위해 데이터의 신선도를 기준으로 캐싱 전략을 수행함.

### 1. 상태 전환 흐름

서버 응답 데이터는 `fresh` → `stale` → `inactive` → `deleted(gc)` 순서로 상태가 전환된다.

- `fresh`: 데이터 페칭 직후 상태임. `staleTime` 동안 유지되며, 이 시간이 경과하면 `stale`로 전환됨.
- `stale`: `staleTime` 초과 후 진입하는 상태임. `refetchOnMount` • `refetchOnWindowFocus` • `refetchOnReconnect` 트리거 조건에서 자동 재요청 대상이 됨.
- `inactive`: 쿼리를 구독하는 컴포넌트가 모두 언마운트된 상태임. 이 시점부터 `gcTime` 타이머가 시작됨.
- `deleted(gc)`: `gcTime` 초과 후 캐시 메모리에서 완전히 제거된 상태임.

### 2. 신선도 유지 시간(staleTime)

- 쿼리 데이터가 `fresh`(신선함) 상태에서 `stale`(신선하지 않음) 상태로 전환되는 데 걸리는 시간임.
- 기본값은 `0`이며, 데이터를 가져온 즉시 `stale` 상태가 된다.

### 3. 가비지 컬렉션 타임(gcTime)

- 데이터가 `inactive`(사용되지 않음) 상태일 때 메모리에 유지되는 시간임.
- 기본값은 5분(`300,000ms`)이며, 이 시간이 지나면 캐시 메모리에서 제거됨.
- 캐시가 유지되는 동안 페이지 재방문 시 즉시 데이터를 보여줄 수 있음.

## 쿼리 상태 정보(status • fetchStatus)

### 1. status

- 쿼리의 결과 데이터 존재 여부를 나타냄.
- `pending`: 데이터가 없고 아직 가져오는 중임.
- `success`: 데이터를 성공적으로 가져옴.
- `error`: 데이터 패칭 중 에러가 발생함.

### 2. fetchStatus

- 쿼리 함수의 실행 상태를 나타냄.
- `fetching`: 데이터를 활발히 가져오는 중임.
- `paused`: 네트워크 연결 끊김 등으로 인해 중단됨.
- `idle`: 아무런 작업도 수행하고 있지 않음.

## 데이터 가공 및 초기값 설정(select • initialData • placeholderData)

### 1. 데이터 선택(select)

- 서버 응답 데이터를 컴포넌트에서 필요한 형태로 가공하거나 필터링함.
- 원본 데이터가 변경되지 않으면 재연산을 수행하지 않는 메모이제이션이 적용됨. 단, `select`에 인라인 함수를 전달하면 렌더마다 새 참조가 생성되어 메모이제이션이 동작하지 않는다. 안정적인 참조가 필요한 경우 `useCallback`으로 감싸야 한다.
- `queryFn` 내부에서 가공하는 것과 캐시 저장 방식에서 차이가 있음:
  - `queryFn`에서 가공하면 가공된 데이터가 캐시에 저장됨. 동일한 `queryKey`를 사용하는 모든 구독자가 가공된 데이터를 받음.
  - `select`에서 가공하면 캐시에는 원본 서버 응답이 유지됨. 가공은 구독 컴포넌트별로 독립적으로 수행되므로, 같은 쿼리를 여러 컴포넌트에서 각기 다른 형태로 파생할 수 있음.
  - 메모이제이션 덕분에 캐시 데이터가 변경되지 않으면 `select` 연산이 재실행되지 않아 불필요한 렌더링이 억제됨.
  - 네트워크 요청 결과를 정규화하거나 공유 포맷으로 저장해야 할 경우엔 `queryFn`에서, 특정 컴포넌트 전용 파생 데이터가 필요할 경우엔 `select`에서 가공하는 것이 적절함.

### 2. 초기 데이터(initialData)

- 캐시가 비어있을 때 사용할 초기값을 설정하며, 이 값은 즉시 캐시에 저장되고 `fresh` 상태로 취급됨.
- SSR(Server Side Rendering) 데이터와 동기화할 때 주로 사용한다.

### 3. 플레이스홀더 데이터(placeholderData)

- 데이터를 로딩하는 동안 보여줄 임시 데이터임. 캐시에 저장되지 않으며 사용자 경험(UX) 향상을 위해 사용함.

## 데이터 변이(useMutation)

- 서버의 데이터를 생성, 수정, 삭제하는 액션에 사용함.
- 콜백 실행 시점은 다음과 같음:
  - `onMutate`: `mutationFn` 실행 전에 호출됨. 서버 요청이 나가기 전 시점임.
  - `onSuccess`: `mutationFn`이 성공적으로 완료된 후 호출됨.
  - `onError`: `mutationFn`이 실패한 후 호출됨.
  - `onSettled`: 성공/실패 무관하게 완료 후 항상 호출됨.
- `useMutation`에 전달한 콜백은 모든 변이 호출에 적용되며, `mutate`에 직접 전달한 콜백보다 먼저 실행됨.
- `mutate`에 직접 전달한 콜백은 해당 호출에만 적용됨.

```ts
useMutation({
  mutationFn: addTodo,
  onMutate: (variables) => {
    // 1순위 실행
  },
  onSuccess: (data, variables, context) => {
    // 2순위 실행
  },
  onError: (error, variables, context) => {
    // 2순위 실행
  },
  onSettled: (data, error, variables, context) => {
    // 4순위 실행
  },
});

mutate(todo, {
  onSuccess: (data, variables, context) => {
    // 3순위 실행
  },
  onError: (error, variables, context) => {
    // 3순위 실행
  },
  onSettled: (data, error, variables, context) => {
    // 5순위 실행
  },
});
```

- `mutate`를 연속으로 여러 번 호출하면 `useMutation`의 콜백은 호출 횟수만큼 실행되지만, `mutate`에 직접 전달한 콜백은 마지막 호출에 대해서만 실행됨.

```ts
useMutation({
  mutationFn: addTodo,
  onSuccess: (data, variables, context) => {
    // 3번 실행됨
  },
});

['Todo 1', 'Todo 2', 'Todo 3'].forEach((todo) => {
  mutate(todo, {
    onSuccess: (data, variables, context) => {
      // 마지막 호출(Todo 3)에 대해서만 1번 실행됨
    },
  });
});
```

## 낙관적 업데이트(Optimistic Update)

서버 응답을 기다리지 않고 UI를 먼저 변경한 뒤, 요청 실패 시 이전 상태로 롤백하는 패턴임. 대부분의 요청은 성공한다는 가정 하에 사용자에게 즉각적인 피드백을 제공한다.

- 일반 방식: 요청 전송 → 서버 응답 대기 → 성공 시 UI 반영
- 낙관적 업데이트: UI 먼저 반영 → 요청 전송 → 실패 시 롤백

`onMutate`의 반환값은 이후 콜백의 `context` 인자로 전달된다. 이를 이용해 롤백에 필요한 이전 상태를 `onError`에서 참조할 수 있음.

```ts
useMutation({
  mutationFn: addTodo,
  onMutate: async (newTodo) => {
    // 진행 중인 refetch가 낙관적 업데이트를 덮어쓰지 않도록 취소함
    await queryClient.cancelQueries({ queryKey: ['todos'] });
    // 롤백을 위해 현재 캐시 상태를 스냅샷으로 저장함
    const previousTodos = queryClient.getQueryData(['todos']);
    // 서버 응답 전에 캐시를 먼저 업데이트하여 UI에 즉시 반영함
    queryClient.setQueryData(['todos'], (old) => [...old, newTodo]);
    // 반환값은 onError, onSettled의 context 인자로 전달됨
    return { previousTodos };
  },
  onError: (err, newTodo, context) => {
    // 실패 시 onMutate에서 저장한 스냅샷으로 캐시를 복원함
    queryClient.setQueryData(['todos'], context.previousTodos);
  },
  onSettled: () => {
    // 성공/실패 무관하게 서버 상태와 동기화함
    queryClient.invalidateQueries({ queryKey: ['todos'] });
  },
});
```
