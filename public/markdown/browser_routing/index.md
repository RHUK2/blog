---
folderName: browser_routing
updatedAt: 2025-01-02
title: 브라우저 라우팅
tag: browser
isPublished: true
---

# 브라우저 라우팅

- [History API](#history-api)
- [Navigation API](#navigation-api)
- [Location 인터페이스](#location-인터페이스)
- [URL 인코딩](#url-인코딩)

## History API

브라우저의 세션 기록(history stack)을 제어하는 데 사용된다. SPA에서 URL을 유지하면서 동적 콘텐츠를 로드하는 데 주로 사용된다.

주요 메서드:

- `history.pushState(state, title, url)`: 새로운 상태를 세션 기록에 추가한다. URL만 변경되고 페이지는 새로고침되지 않는다
- `history.replaceState(state, title, url)`: 현재 상태를 새 상태로 교체한다
- `history.back()`, `history.forward()`, `history.go(n)`: 특정 위치로 이동한다
- `history.state`는 새로고침해도 삭제되지 않는다

## Navigation API

현재 개발 중인 표준으로 기존 History API를 대체하거나 보완할 수 있는 기능들을 포함한다.

주요 기능:

- `navigate()`: 페이지 간의 탐색을 제어한다
- `reload()`: 현재 페이지를 새로고침한다
- `abort()`: 현재 진행 중인 탐색을 중단한다
- 이벤트: `navigatesuccess`, `navigateerror` 등 다양한 탐색 관련 이벤트를 제공한다

## Location 인터페이스

현재 문서의 URL을 나타내며 URL을 조작하고 새로고침하거나 다른 페이지로 이동하는 기능을 제공한다.

주요 프로퍼티와 메서드:

- `location.href`: 현재 페이지의 URL을 가져오거나 설정한다
- `location.assign(url)`: 주어진 URL로 이동한다
- `location.replace(url)`: 현재 페이지를 새 페이지로 대체한다. 뒤로 가기 버튼으로 돌아올 수 없다
- `location.reload()`: 현재 페이지를 새로고침한다
- `location.pathname`, `location.search`, `location.hash`: URL의 특정 부분에 접근하거나 변경한다

## URL 인코딩

| 함수                 | 인코딩 대상                                   | 사용 예시                      |
| -------------------- | --------------------------------------------- | ------------------------------ |
| `encodeURI`          | URL 전체, 구조 문자(`:/=?&`) 제외             | 전체 URL 인코딩                |
| `encodeURIComponent` | 개별 구성 요소, 구조 문자까지 인코딩          | 쿼리 파라미터 값 인코딩        |
| `decodeURI`          | `encodeURI`로 인코딩된 URL 디코딩             | 인코딩된 URL 복원              |
| `decodeURIComponent` | `encodeURIComponent`로 인코딩된 문자열 디코딩 | 인코딩된 쿼리 파라미터 값 복원 |
