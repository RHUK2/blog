---
updatedAt: 2024-04-29
directory: react
fileName: react-library
title: React Library 기록하기
description:
---

# React Library 기록하기

- [(create-react-app) CRA 빌드](#create-react-app-cra-빌드)
- [(create-react-app) manifest.json](#create-react-app-manifestjson)
- [(create-react-app) react에서 환경변수](#create-react-app-react에서-환경변수)
- [(react-query) 사용 시 애니메이션 렌더링 문제](#react-query-사용-시-애니메이션-렌더링-문제)
- [(react-query)](#react-query)
- [(react-query) staleTime, gcTime](#react-query-staletime-gctime)
- [(react-query) status, fetchStatus](#react-query-status-fetchstatus)
- [(react-query) initialData, placeholderData](#react-query-initialdata-placeholderdata)
  - [`placeholderData`](#placeholderdata)
  - [차이점 요약](#차이점-요약)
  - [결론](#결론)
- [(react-query) useQuery](#react-query-usequery)
- [(react-query) useMutation](#react-query-usemutation)

## (create-react-app) CRA 빌드

`react-scripts build` 명령어를 실행하면, 다음과 같은 작업을 수행한다.

1. 프로덕션 모드 설정

   - NODE_ENV를 production으로 설정하여 최적화된 빌드를 생성한다.

2. 코드 번들링 및 최적화

   - Webpack을 사용하여 JavaScript 파일들을 번들링한다.
   - Babel을 사용하여 최신 JavaScript 코드가 구형 브라우저에서도 동작하도록 트랜스파일링한다.
   - 코드 압축(UglifyJS) 및 최적화(Dead Code Elimination) 작업이 수행된다.
   - CSS 파일이 별도로 추출되어 최적화된다.

3. 빌드 결과물 생성

   - `build/` 디렉토리에 최종 빌드 결과물이 생성된다.
   - 이 디렉토리에는 번들된 JavaScript 파일, 최적화된 CSS 파일, 그리고 `index.html` 파일이 포함된다.
   - 결과적으로, `build/` 디렉토리의 파일들을 웹 서버에 배포한다.

## (create-react-app) manifest.json

`manifest.json` 파일은 Progressive Web App(PWA)에서 사용되는 파일로, 해당 웹 앱의 메타데이터와 구성 요소를 정의하는 역할을 한다. PWA는 웹과 네이티브 앱의 장점을 결합한 형태이다.

![pwa_install](images/pwa_install.png)

CRA로 리액트 프로젝트 생성 시 `public` 폴더 아래에 해당 파일이 있는데 PWA를 지원하지 않으려면 삭제해도 된다. `index.html`의 관련 코드도 같이 삭제해야 한다.

## (create-react-app) react에서 환경변수

![react_env](images/react_env.png)

CRA에 의해 `.env` 파일에 규칙을 가지고 작성된 환경변수는 빌드 타임에 `process.env`로 객체화되서 클라이언트에서 접근이 가능한 형태가 된다.

## (react-query) 사용 시 애니메이션 렌더링 문제

아래와 같은 어드민 패널에 진행과정 메일링을 보면 Switch 컴포넌트가 적용되어 있는데, 이 컴포넌트는 클릭 시 상태에 따라 트랜지션이 일어나고 리액트 쿼리로 리스트 값을 업데이트하는 API 요청을 하게 된다. 그리고 성공 시 해당 화면에 정보를 다시 불러와서 업데이트한다.

![switch_rendering](images/switch_rendering.png)

이 과정에서 연속으로 상태를 바꿀 경우 새로 불러오는 데이터와 버튼의 상태 데이터가 충돌해서 애니메이션이 왔다갔다하는 경우를 발견할 수 있다. 이를 해결하기 위해 리스트 값을 업데이트하지 않고 리액트 쿼리의 `cacheTime` 속성을 `0`으로 설정하여 해결했다.

## (react-query)

queryClient.getQueryState
queryClient.getQueryData

useQuery 키공유

상태 동기화가 잘 안됨

## (react-query) staleTime, gcTime

staleTime 기본값은 `0` 패칭 후 무조건 `stale`됨, staleTime 설정 시 설정 시간 후에 `stale`됨

cacheTime은 보통 staleTime 보다 길게 설정 stale 이후 재요청 시 cache된 데이터를 이용해서 로딩 작업을 없애야하는데 짧아서 제거되버리면 로딩해야함

cacheTime은 refresh, stale 상태가 아닌 inactive 상태의 쿼리에서 시간이 흘러가기 시작 staleTime보다 길 필요 없음

새로고침 시 캐시는 전부 삭제됨

오래된 쿼리는 다음과 같은 경우에 백그라운드에서 자동으로 새로 고쳐진다.

- 쿼리의 새 인스턴스가 마운트됨
- 창이 다시 포커싱됨
- 네트워크가 다시 연결됨
- 쿼리가 선택적으로 새로 고침 간격으로 구성됨

## (react-query) status, fetchStatus

상태는 데이터에 대한 정보를 제공합니다: 데이터가 있는지 없는지?
fetchStatus는 쿼리Fn에 대한 정보를 제공합니다: 실행 중인가요, 아닌가요?

## (react-query) initialData, placeholderData

`initialData`와 `placeholderData`는 React Query에서 데이터를 로드할 때 사용자 경험을 향상시키기 위해 사용되는 두 가지 옵션이다. 둘 다 페이지 로드 시 사용자에게 임시 데이터를 제공하는 역할을 하지만, 사용하는 목적과 방식에 차이가 있다.

`initialData`는 쿼리가 처음 실행될 때 사용할 초기 데이터를 제공한다. 이 데이터는 쿼리가 실제 데이터를 가져올 때까지 사용되며, 캐시에도 저장된다.

- **용도**

  - 서버에서 데이터를 가져오기 전에 기본적으로 보여줄 데이터를 제공한다.
  - 캐시가 비어 있을 때만 사용된다.
  - `initialData`로 설정된 데이터는 마치 서버에서 가져온 데이터처럼 취급된다.
  - 주로 SSR(서버 사이드 렌더링)이나 SSG(정적 사이트 생성)와 함께 사용되어 초기 데이터를 제공한다.

- **사용 예시**

  ```javascript
  const queryConfig = {
    queryKey: ['user', userId],
    queryFn: fetchUserData,
    initialData: { name: 'Loading...', age: 0 },
  };

  const { data } = useQuery(queryConfig);
  ```

### `placeholderData`

`placeholderData`는 쿼리가 데이터를 가져오는 동안 사용자에게 보여줄 임시 데이터를 제공한다. 이 데이터는 캐시에 저장되지 않으며, 데이터가 로드되면 즉시 실제 데이터로 교체된다.

- **용도**

  - 데이터를 로드하는 동안 사용자에게 임시 데이터를 제공하여 화면이 덜 깜빡이도록 한다.
  - 캐시와 상관없이 항상 사용될 수 있다.
  - 사용자 경험을 개선하기 위해 로딩 중에 보여줄 임시 데이터를 설정한다.

- **사용 예시**

  ```javascript
  const queryConfig = {
    queryKey: ['user', userId],
    queryFn: fetchUserData,
    placeholderData: { name: 'Loading...', age: 0 },
  };

  const { data } = useQuery(queryConfig);
  ```

### 차이점 요약

- **캐시와의 관계**

  - `initialData`: 쿼리가 처음 실행될 때만 사용되며, 캐시에 저장된다.
  - `placeholderData`: 데이터가 로드될 때까지 임시로 사용되며, 캐시에 저장되지 않는다.

- **사용 시점**

  - `initialData`: 쿼리가 처음 실행될 때, 초기 데이터를 제공하고자 할 때 사용된다.
  - `placeholderData`: 데이터를 로드하는 동안, 사용자 경험을 향상시키기 위해 임시 데이터를 제공하고자 할 때 사용된다.

- **데이터 갱신**
  - `initialData`: 쿼리 함수가 실행되고, 실제 데이터가 로드되면 캐시가 업데이트된다.
  - `placeholderData`: 쿼리 함수가 실행되고, 실제 데이터가 로드되면 즉시 임시 데이터가 교체된다.

### 결론

- `initialData`는 초기 데이터를 제공하고 이를 캐시에 저장하여 SSR이나 SSG 환경에서 유용하다.
- `placeholderData`는 데이터 로드 중 사용자 경험을 향상시키기 위해 임시 데이터를 제공하며, 캐시에 저장되지 않는다.

사용자는 이러한 속성들을 상황에 맞게 활용하여, 데이터를 로드하는 동안 더 나은 사용자 경험을 제공할 수 있다.

## (react-query) useQuery

select 속성으로 비동기 데이터 가공 가능

## (react-query) useMutation

```ts
useMutation({
  mutationFn: addTodo,
  onMutate: (variables) => {
    // 1
    // I will fire first
  },
  onSuccess: (data, variables, context) => {
    // 2
    // I will fire first
    // occur 3times
  },
  onError: (error, variables, context) => {
    // 2
    // I will fire first
  },
  onSettled: (data, error, variables, context) => {
    // 3
    // I will fire first
  },
});

mutate(todo, {
  onSuccess: (data, variables, context) => {
    // 4
    // I will fire second!
  },
  onError: (error, variables, context) => {
    // 4
    // I will fire second!
  },
  onSettled: (data, error, variables, context) => {
    // 5
    // I will fire second!
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
