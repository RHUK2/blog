---
folderName: react_query
updatedAt: 2024-07-18
title: React Query
tag: react
isPublished: true
---

# React Query

- [`staleTime` • `gcTime`](#staletime--gctime)
- [`status` • `fetchStatus`](#status--fetchstatus)
- [`select` • `initialData` • `placeholderData`](#select--initialdata--placeholderdata)
- [`useMutation`](#usemutation)

## `staleTime` • `gcTime`

1. `staleTime`
   - 해당 값은 쿼리를 `fresh` 상태로 유지할 시간을 설정한다.
   - 기본값은 `0`이며, 패칭 후에 쿼리의 상태는 `stale`이 된다.
   - `0` 이상으로 설정 시, 해당 수의 ms만큼 동안 쿼리의 상태는 `fresh`가 된다.
   - `stale` 상태의 쿼리는 다음과 같은 경우에 자동으로 새로 데이터를 불러온다.
     - 쿼리를 포함한 컴포넌트가 마운트(리렌더링 x)된 경우 (`refetchOnMount: true`)
     - 창이 다시 포커싱된 경우 (`refetchOnWindowFocus: true`)
     - 네트워크가 다시 연결된 경우 (`refetchOnReconnect: true`)
     - `refetchInterval`이 설정된 경우, 해당 시간간격마다 매번 새로 데이터를 불러온다. (`refetchInterval: 30000`)

   - `stale` 상태는 `refetch`가 발생 가능한 상태이다
   - `fresh` 상태는 `refetch`가 발생하지 않는 상태이다.

2. `gcTime`
   - 해당 값은 쿼리를 `inactive` 상태로 유지할 시간을 설정한다.
   - 기본값은 `30000`으로 5분동안 캐시된다.
   - 새로고침 시 캐시는 전부 삭제된다.
   - 쿼리를 사용하는 컴포넌트가 언마운트가 되면 `inactive` 상태가 전환된다.
   - 쿼리 데이터를 사용하는 컴포넌트가 더 이상 없을 때 `inactive` 상태로 전환된다.
   - 다른 페이지로 이동했다가 다시 돌아와도

## `status` • `fetchStatus`

1. `status`
   - pending success error
   - 데이터에 대한 정보를 제공한다. (데이터가 있는지? 없는지?)

2. `fetchStatus`
   - idle fetching pause
   - 쿼리 패칭에 대한 정보를 제공한다. (실행 중인지? 아닌지?)

## `select` • `initialData` • `placeholderData`

1. `select`
   - 서버로부터 받아온 데이터를 가공하거나 필터링하여 필요한 부분만 선택할 수 있다. 예를 들어, 객체의 특정 필드만 추출하거나, 배열을 특정 조건에 맞게 필터링할 수 있다.
   - 내부적으로 메모이제이션이 적용되어, 동일한 입력 데이터가 들어왔을 때 동일한 출력 데이터를 반환하여 불필요한 재연산을 방지한다.
   - 필요한 데이터만 선택하여 컴포넌트에 전달하므로, 불필요한 데이터로 인해 발생할 수 있는 성능 문제를 줄일 수 있다.

2. `initialData`
   - 서버에서 데이터를 가져오기 전에 기본적으로 보여줄 데이터를 제공한다.
   - 캐시가 비어 있을 때만 사용된다.
   - `initialData`로 설정된 데이터는 마치 서버에서 가져온 데이터처럼 취급된다.
   - 주로 SSR(서버 사이드 렌더링)이나 SSG(정적 사이트 생성)와 함께 사용되어 초기 데이터를 제공한다.

3. `placeholderData`
   - 데이터를 로드하는 동안 사용자에게 임시 데이터를 제공하여 화면이 덜 깜빡이도록 한다.
   - 캐시와 상관없이 항상 사용될 수 있다.
   - 사용자 경험을 개선하기 위해 로딩 중에 보여줄 임시 데이터를 설정한다.

- 사용 예시

```ts
const { data } = useQuery(
  queryKey: ['user', userId],
  queryFn: fetchUserData,
  initialData: { name: 'Loading...', age: 0 },
  placeholderData: { name: 'Loading...', age: 0 },
  select: (data) => data.filter((user) => user.name),
);
```

## `useMutation`

- `useMutation`의 `onMutate`, `onSuccess`, `onError`, `onSettled`는 모든 변이 호출에 대해 적용되며 우선순위가 높다.
- `mutate`의 `onSuccess`, `onError`, `onSettled`는 특정 변이 호출에 대해 적용된다.

```ts
useMutation({
  mutationFn: addTodo,
  onMutate: (variables) => {
    // I will fire first(1)
  },
  onSuccess: (data, variables, context) => {
    // I will fire first(2)
  },
  onError: (error, variables, context) => {
    // I will fire first(2)
  },
  onSettled: (data, error, variables, context) => {
    // I will fire first(4)
  },
});

mutate(todo, {
  onSuccess: (data, variables, context) => {
    // I will fire second!(3)
  },
  onError: (error, variables, context) => {
    // I will fire second!(3)
  },
  onSettled: (data, error, variables, context) => {
    // I will fire second!(5)
  },
});
```

- `mutate`가 호출될 때마다 뮤테이션 옵저버가 제거되었다가 다시 구독되면서, 컴포넌트가 아직 마운트되어 있는 경우에만 한 번만 실행된다.
- 반대로, `useMutation`의 `onMutate`, `onSuccess`, `onError`, `onSettled`는 각 `mutate` 호출에 대해 실행됩니다.

```ts
useMutation({
  mutationFn: addTodo,
  onSuccess: (data, variables, context) => {
    // Will be called 3 times
  },
});

const todos = ['Todo 1', 'Todo 2', 'Todo 3'];

todos.forEach((todo) => {
  mutate(todo, {
    onSuccess: (data, error, variables, context) => {
      // Will execute only once, for the last mutation (Todo 3),
      // regardless which mutation resolves first
    },
  });
});
```
