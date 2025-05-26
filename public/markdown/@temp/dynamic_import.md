리액트 애플리케이션을 개발할 때, Server-Side Rendering(SSR)이나 Static Site Generation(SSG)을 사용하는 경우, "Hydration 불일치(hydration mismatch)"라는 문제가 발생할 수 있습니다. 이는 클라이언트에서 렌더링된 HTML과 서버에서 생성된 초기 HTML이 다를 때 발생하며, React가 이를 일치시키는 데 실패하는 문제를 말합니다. 흔히 발생하는 시나리오 중 하나는 lazy loading(지연 로딩)을 사용하지 않을 때입니다.

이를 회피하기 위해 특정 요소를 클라이언트에서 렌더링될 때까지 지연(lazy load)시키는 접근법에 대해 설명하겠습니다.

---

## 1. Hydration 불일치란?

React 애플리케이션은 첫 번째로 서버나 빌드 과정에서 HTML을 생성하고, 클라이언트에서 이를 기반으로 React의 Virtual DOM을 통해 상호작용 가능한 애플리케이션으로 "hydrate"합니다.

하지만 클라이언트와 서버의 HTML 출력이 불일치할 경우, React는 이를 경고(React 18 이후에 보면 `Hydration failed` 메시지)하며 문제를 일으킬 수 있습니다. 이는 주로 다음과 같은 상황에서 발생할 수 있습니다:

- 클라이언트에서만 가능한 동적 값이 초기 상태에 의존.
- 서버에서 컴포넌트가 렌더링되는 동안 브라우저 환경 관련 요소(`window`, `document` 등)에 접근하려 할 때.
- 특정 컴포넌트를 조건에 따라 렌더링하려 할 때.

---

## 2. Lazy Loading으로 Hydration 불일치 방지

`lazy loading`은 서버 사이드와 클라이언트 사이드에서 렌더링되는 컴포넌트를 분리하거나 조건부로 렌더링하여, 클라이언트 HTML이 준비될 때까지 특정 코드를 지연시키는 방법입니다. 다음과 같은 기술을 활용할 수 있습니다.

---

### 접근 방법 1: Dynamic Import와 Next.js `dynamic()` 사용

Next.js는 동적 컴포넌트 로딩을 위한 `dynamic()` 함수를 제공합니다. 이 방법은 특정 컴포넌트를 서버 사이드 렌더링에서 제외하거나 CSR(Client-Side Rendering)에서만 렌더링되도록 설정할 수 있습니다.

#### 예시 코드:

```tsx
import dynamic from 'next/dynamic';

const DynamicComponent = dynamic(() => import('./MyComponent'), {
  ssr: false, // 서버 사이드 렌더링을 비활성화
});

function App() {
  return (
    <div>
      <h1>Hello, Next.js!</h1>
      <DynamicComponent />
    </div>
  );
}
```

- `ssr: false` 옵션을 사용하면 해당 컴포넌트는 초기 서버 사이드 렌더링에서 제외되고, 클라이언트가 로드된 후 렌더링됩니다.
- 이는 `window`나 `document` 객체같이 클라이언트 환경에 의존하는 코드가 포함된 컴포넌트에 유용합니다.

---

### 접근 방법 2: useEffect를 활용한 클라이언트 렌더링 제어

React의 `useEffect`는 클라이언트에서만 실행되기 때문에, 클라이언트에서 렌더링해야 하는 컴포넌트를 조건부로 제어할 수 있습니다.

#### 예시 코드:

```tsx
import { useEffect, useState } from 'react';

function MyLazyComponent() {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    // 클라이언트에서만 true로 변경됨
    setIsClient(true);
  }, []);

  if (!isClient) {
    // 클라이언트가 아니면 렌더링하지 않음
    return null;
  }

  return <div>This is client-side rendered only!</div>;
}

export default function App() {
  return (
    <div>
      <h1>Hello!</h1>
      <MyLazyComponent />
    </div>
  );
}
```

- 서버에서 이 컴포넌트는 아무것도 렌더링하지 않으며, 클라이언트에서만 렌더링됩니다.
- 이는 HTML 내용의 일관성을 보장하여 "Hydration 불일치"를 방지합니다.

---

### 접근 방법 3: React `Suspense`와 `lazy` 사용 (CSR 전용)

React의 `React.lazy()`와 `Suspense`를 결합하면 컴포넌트를 지연 로드할 수 있습니다. 서버에서 HTML을 렌더링하면서 미리 정의된 Fallback UI를 렌더링하고, 동적 컴포넌트를 클라이언트에서 로드합니다.

#### 예시 코드:

```tsx
import React, { lazy, Suspense } from 'react';

const LazyComponent = lazy(() => import('./MyLazyComponent'));

function App() {
  return (
    <div>
      <h1>Hello, React!</h1>
      <Suspense fallback={<div>Loading...</div>}>
        <LazyComponent />
      </Suspense>
    </div>
  );
}

export default App;
```

- `Suspense`의 `fallback`은 동적 컴포넌트를 로드하는 동안 보여줄 UI를 정의합니다.
- 주의: React 18 이전에는 `Suspense`가 SSR 환경에서 제한적으로 지원되었습니다. React 18에서는 `streaming SSR`이 도입되어 이런 방식을 더 잘 지원합니다.

---

### 접근 방법 4: 컴포넌트 조건부 렌더링 (클라이언트 환경 전용)

특정 컴포넌트를 클라이언트에서만 렌더링하게 하려면 간단히 조건을 추가하여 동적으로 렌더링할 수 있습니다.

#### 예시 코드:

```tsx
function MyComponent() {
  if (typeof window === 'undefined') {
    // 서버 환경에서는 아무것도 렌더링하지 않음
    return null;
  }

  return <div>This is dynamically rendered!</div>;
}

export default MyComponent;
```

- 서버에서는 컴포넌트가 렌더링되지 않으므로 불일치가 발생하지 않습니다.
- 클라이언트에서만 조건적으로 렌더링이 활성화됩니다.

---

## 3. 결론

Hydration 불일치는 React 애플리케이션에서 서버와 클라이언트 렌더링이 일치하지 않을 때 발생하는 복잡한 문제입니다. 이를 방지하기 위해:

- 동적인 컴포넌트를 `dynamic`으로 로드하거나,
- `useEffect`와 상태를 기반으로 조건부 렌더링을 활용하거나,
- `Suspense`와 `lazy`로 컴포넌트를 지연 로드하세요.

이 방식들은 서로 상호보완적이므로, 사용하는 애플리케이션의 요구사항에 따라 적절히 선택할 수 있습니다.
