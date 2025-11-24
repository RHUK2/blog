---
folderName: browser_routing
title: 브라우저 라우팅
tag: browser
isPublished: true
---

# 브라우저 라우팅

- [Location 인터페이스](#location-인터페이스)
- [History API](#history-api)
- [Navigation API](#navigation-api)
- [하드 라우팅, 소프트 라우팅](#하드-라우팅-소프트-라우팅)

## Location 인터페이스

현재 문서의 URL 정보를 담고 있으며, URL을 조작하거나 페이지를 이동시키는 기능을 제공한다. `window.location` 또는 `document.location`으로 접근한다.

주요 프로퍼티와 메서드:

- `location.href`: 전체 URL을 반환하거나, 새로운 값을 할당하여 페이지를 이동시킨다.
- `location.assign(url)`: 주어진 URL로 페이지를 이동하며 히스토리에 기록을 남긴다.
- `location.replace(url)`: 현재 페이지를 새로운 URL로 교체하며, 히스토리에 기록을 남기지 않는다(뒤로 가기 불가).
- `location.reload()`: 현재 페이지를 새로고침한다.
- `location.pathname`, `location.search`, `location.hash`: URL의 경로, 쿼리 스트링, 해시 값에 접근하거나 변경한다.

## History API

브라우저의 세션 기록(history stack)을 제어하는 데 사용된다. SPA에서 URL을 변경하면서 페이지 전체를 새로고침하지 않고 동적 콘텐츠를 로드하는 데 주로 사용된다.

주요 메서드:

- `history.pushState(state, title, url)`: 새로운 상태를 세션 기록 스택에 추가한다. URL은 변경되지만 브라우저는 페이지를 로드하지 않는다.
- `history.replaceState(state, title, url)`: 현재 세션 기록 항목을 새로운 상태로 교체한다.
- `history.back()`, `history.forward()`, `history.go(n)`: 브라우저 기록 내에서 특정 위치로 이동한다.
- `history.state`: 현재 히스토리 항목과 연관된 상태 객체를 반환하며, 페이지를 새로고침해도 유지된다.

## Navigation API

최신 브라우저(주로 Chrome 계열)에서 지원하는 API로, 기존 History API의 복잡성과 한계를 해결하기 위해 도입되었다. SPA의 라우팅을 더 직관적이고 강력하게 제어할 수 있다.

주요 기능:

- `navigation.navigate(url, options)`: 페이지 탐색을 시작하며, `history.pushState`와 달리 실제 탐색 이벤트를 발생시킨다.
- `navigation.reload()`: 현재 페이지를 새로고침한다.
- `navigation.currentEntry`: 현재 페이지의 탐색 항목(Entry)에 접근할 수 있다.
- 이벤트: `navigate` 이벤트를 통해 탐색을 가로채고(`intercept`) SPA 라우팅을 처리할 수 있다.

## 하드 라우팅, 소프트 라우팅

하드 라우팅 (Hard Routing):

- 전통적인 방식의 페이지 이동.
- URL이 변경되면 서버에 새로운 HTML 문서를 요청하고 페이지 전체를 다시 로드한다.
- `<a>` 태그 클릭이나 `location.href` 변경 시 발생한다.
- 장점: 구현이 단순하고 SEO에 유리하다(SSR).
- 단점: 페이지 깜빡임이 발생하고 불필요한 리소스 재요청이 일어날 수 있다.

소프트 라우팅 (Soft Routing / Client-side Routing):

- SPA(Single Page Application)에서 사용하는 방식.
- URL이 변경되어도 서버에 HTML을 요청하지 않고, 자바스크립트를 사용하여 필요한 데이터만 받아와 화면을 갱신한다.
- `History API`나 `Navigation API`를 사용하여 구현한다.
- 장점: 페이지 전환이 부드럽고 사용자 경험(UX)이 좋다.
- 단점: 초기 로딩 속도가 느릴 수 있고, SEO 최적화를 위해 별도의 설정(SSR, Prerendering 등)이 필요할 수 있다.
