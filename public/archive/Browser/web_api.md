---
updatedAt: 2024-08-05
directory: Browser
fileName: web_api
title: Web API 기록하기
description:
---

# Web API 기록하기

- [외부 API 연동](#외부-api-연동)

## Clipboard API

로컬호스트 및 HTTPS 통신에서만 동작함

## Fetch API

## History API

클라이언트 사이드 라우팅의 핵심

window.location.href = '/'
history.pushState
history.replaceState

history.state 세션 유지됨

## Location API

## 외부 API 연동

보통 외부 서비스에서 만든 API를 사용하기 위해서는 서비스 제공자가 제공해주는 API 키를 요청에 함께 보내야한다.

그래야 신뢰성 있는 사용자인지 파악이 가능하기 때문이다.

보통 오픈된 API의 경우에는 따로 API 키가 필요하지 않다.

무튼 외부에 무언가와 소통할 때는 거기서 주는 어떠한 신뢰를 증명하는 것을 받고 그걸 같이 보여주는 식이다.

History API와 `window.location`은 웹 브라우저에서 페이지의 URL을 관리하고 조작하는 데 사용되지만, 그 목적과 사용 방식에 차이가 있습니다. 이 두 가지를 비교하여 차이점을 설명하겠습니다.

### History API

History API는 HTML5에서 도입된 기능으로, 브라우저의 세션 기록을 프로그래밍적으로 조작할 수 있게 해줍니다. 이를 통해 사용자는 페이지의 이동이나 상태를 변경할 수 있습니다. 주요 메서드는 다음과 같습니다:

1. **`history.pushState(state, title, url)`**:

   - 현재 URL을 변경하고 새로운 항목을 세션 기록에 추가합니다.
   - 페이지를 새로 로드하지 않고도 URL을 변경할 수 있습니다.
   - 예: `history.pushState({page: 1}, "title 1", "/page1");`

2. **`history.replaceState(state, title, url)`**:

   - 현재 기록 항목을 새로운 상태와 URL로 대체합니다.
   - 페이지를 새로 로드하지 않고 URL을 변경할 수 있습니다.
   - 예: `history.replaceState({page: 2}, "title 2", "/page2");`

3. **`history.back()`**, **`history.forward()`**, **`history.go(n)`**:
   - 브라우저 기록에서 앞뒤로 이동합니다.
   - `n`은 이동할 기록 항목의 수를 나타냅니다.

History API를 사용하면 사용자가 페이지를 탐색하는 동안 페이지를 새로 고침하지 않고도 URL을 동적으로 변경할 수 있습니다. 이는 특히 SPA(Single Page Application)에서 많이 사용됩니다.

### `window.location`

`window.location` 객체는 브라우저 창의 현재 URL을 나타내며, URL을 변경하거나 현재 페이지를 새로 고치는 기능을 제공합니다. 주요 속성과 메서드는 다음과 같습니다:

1. **`window.location.href`**:

   - 현재 페이지의 전체 URL을 나타냅니다.
   - 이 값을 변경하면 페이지가 해당 URL로 이동합니다.
   - 예: `window.location.href = "https://example.com";`

2. **`window.location.assign(url)`**:

   - 주어진 URL로 페이지를 이동시킵니다.
   - 현재 페이지는 브라우저 기록에 남습니다.
   - 예: `window.location.assign("https://example.com");`

3. **`window.location.replace(url)`**:

   - 주어진 URL로 페이지를 이동시킵니다.
   - 현재 페이지를 브라우저 기록에 남기지 않습니다.
   - 예: `window.location.replace("https://example.com");`

4. **`window.location.reload()`**:
   - 현재 페이지를 새로 고칩니다.
   - 예: `window.location.reload();`

`window.location` 객체를 사용하면 페이지를 새로 고침하거나 다른 페이지로 이동할 때 사용되며, 이는 보통 페이지 전환이나 외부 링크로의 이동을 위해 사용됩니다.

### 요약

- **History API**:

  - 페이지를 새로 고침하지 않고 URL을 변경.
  - 세션 기록을 조작하고 SPA에서 유용.
  - `pushState`, `replaceState` 등을 사용.

- **`window.location`**:
  - 현재 URL을 나타내고 페이지를 이동.
  - 페이지 새로 고침이나 외부 링크로의 이동.
  - `href`, `assign`, `replace`, `reload` 등을 사용.

이러한 차이점을 이해하면 두 API를 적절히 사용하여 웹 애플리케이션의 동작을 더 유연하고 사용자 친화적으로 만들 수 있습니다.
