---
updatedAt: 2024-04-29
directory: React
fileName: exhaustive-deps
title: exhaustive-deps
description:
---

# exhaustive-deps

eslint와 함께 개발을 진행하다보면 아래와 같은 오류를 많이 접하게 된다.

"React Hook useEffect has a missing dependency: 'state'. Either include it or remove the dependency array."

이는 의존성 배열을 사용하는 리액트 훅(`useEffect`, `useMemo`, `useCallback` 등)에서 발생한다. 특히, 의존성 배열을 빈 배열로 사용하려고 할 때 많이 마주치게 된다. 이는 의존성 배열이 빈 배열일 때를 "컴포넌트가 마운트된 후 한 번만 실행하고 싶을 때"라고 이해하고 있기 때문이다. 기존 리액트 라이프 사이클과 연관지어 이해하다 보니 생긴 오류라고 생각한다.

기본적으로 리액트는 여러 크고 작은 함수형 컴포넌트로 조립되어 있고, 해당 컴포넌트 내에서 상태가 변경되면 해당 함수를 다시 호출해서 리렌더링하는 방식이다. 즉, 매 렌더링마다 내부에 작성한 변수나 함수는 매번 선언되고 할당된다. 변수나 함수는 매 렌더링마다 같은 값을 가질 수도 있고, 변경될 수도 있다.

`useEffect`, `useMemo`, `useCallback`과 같이 콜백 함수와 의존성 배열을 인자로 받는 훅들은 콜백 함수가 "리렌더링에 의해 같은 값일 수도 있고 다른 값일 수도 있는 변수나 함수"로 작성되기 때문에 해당 값들이 변경되면 결과물이 달라진다. 그래서 해당되는 값들과 동기화되기 위해서는 의존성 배열 작성이 필요한 것이다.

결론적으로는, 라이프 사이클 관점이 아닌 함수형 컴포넌트 내부 값들과의 동기화 관점으로 바라보아야 한다는 것이다.

## 실무 경험

아래는 `select` 요소의 `option` 요소로 들어갈 값들을 배열로 받는 사용자 훅을 작성한 것이다. `useIntl` 훅을 사용해야 해서 굳이 아래와 같이 작성한 것으로 기억한다.

```js
export function useOptions(type) {
  const intl = useIntl();

  switch (type) {
    // ...생략
    case SELECT_TYPE_CLIENT.SEARCH_TYPE_EMPLOYER:
      return [
        {
          key: SEARCH_TYPE_EMPLOYER.CANDIDATE,
          text: intl.formatMessage({
            id: 'option.candidate',
            defaultMessage: '후보자',
          }),
        },
        {
          key: SEARCH_TYPE_EMPLOYER.RECRUITER,
          text: intl.formatMessage({
            id: 'option.recruiter',
            defaultMessage: '리크루터',
          }),
        },
      ];
    // ...생략
    default:
      return [];
  }
}
```

`useEffect`가 `user`의 데이터가 변경되지 않았는데도 매 렌더링마다 호출되는 이슈가 발생했었다. 이 이슈는 값이 변경될거라 생각하지도 못한 `countryCodeOptions`가 변경되면서 일어난 이슈였다. 위에서 작성한 훅은 매 렌더링마다 함수가 호출되면서 새로운 참조를 가진 배열을 던졌고, 참조가 계속 바뀌는 배열 값을 의존성 배열에서 동기화하고 있어서 계속 호출이 일어났던 것이다.

```js
const countryCodeOptions = useOptions(SELECT_TYPE_CLIENT.COUNTRY_CODE);

useEffect(() => {
  const phoneCode = user.recruiter?.phone
    ? countryCodeOptions.find((option) => user.recruiter.phone.includes(option.text))?.key ?? '+82'
    : '+82';
  const phone = user.recruiter?.phone ? user.recruiter.phone.replace(phoneCode, '') : '';
  // ...생략
}, [user, setValue, countryCodeOptions]);
```

이 이슈를 해결하기 위해 사용자 훅 내부에서 `useMemo`를 사용하여 값의 변경이 필요한 시기에만 변경되도록 수정하여 해결하였다.

```js
export function useOptions(type) {
  const intl = useIntl();

  const options = useMemo(() => {
    switch (type) {
      // ...생략
      case SELECT_TYPE_CLIENT.SEARCH_TYPE_EMPLOYER:
        return [
          {
            key: SEARCH_TYPE_EMPLOYER.CANDIDATE,
            text: intl.formatMessage({
              id: 'option.candidate',
              defaultMessage: '후보자',
            }),
          },
          {
            key: SEARCH_TYPE_EMPLOYER.RECRUITER,
            text: intl.formatMessage({
              id: 'option.recruiter',
              defaultMessage: '리크루터',
            }),
          },
        ];
      // ...생략
      default:
        return [];
    }
  }, [intl, type]);

  return options;
}
```
