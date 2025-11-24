---
folderName: browser_debug
title: 브라우저 디버깅
tag: browser
isPublished: true
---

# 브라우저 디버깅

- [이벤트 리스너 확인](#이벤트-리스너-확인)
- [네트워크 이슈](#네트워크-이슈)
  - [initial connection](#initial-connection)
  - [mixed content](#mixed-content)
- [렌더링 이슈](#렌더링-이슈)
  - [CSS가 적용되지 않는 경우](#css가-적용되지-않는-경우)
  - [화면이 하얗게 뜨는 경우 (White Screen of Death)](#화면이-하얗게-뜨는-경우-white-screen-of-death)
- [리소스 로드 이슈](#리소스-로드-이슈)
  - [이미지 미리보기가 안 되는 경우](#이미지-미리보기가-안-되는-경우)

## 이벤트 리스너 확인

크롬 개발자 도구 콘솔(Console)에서 다음 명령어로 등록된 이벤트 리스너를 확인할 수 있다. (단, 이 API는 표준이 아니며 크롬 개발자 도구에서만 동작한다.)

```javascript
getEventListeners($0); // 현재 선택된 요소의 리스너 확인
getEventListeners(window);
getEventListeners(document);
```

또는 개발자 도구의 Elements 탭에서 요소를 선택 후 우측 패널의 Event Listeners 탭을 통해 시각적으로 확인할 수 있다.

![img](images/devtool_tab.png)

## 네트워크 이슈

### initial connection

리액트 프로젝트를 배포 후 사이트에 접속했을 때 매우 느리게 로드되는 문제가 발생했다. 체감상 30초 정도 걸렸다.

처음에는 SPA의 첫 로드가 오래 걸린다고 생각했지만, 번들 파일 크기가 1.2MB 정도였다. 폰트 용량 문제라고 생각해 경량화 폰트를 적용했으나 이슈는 해결되지 않았다.

개발자 도구의 Network 탭에서 Timing 탭을 자세히 살펴보니 진입점 파일인 `index.html`을 불러오는데 약 20초가 걸렸다. 원인은 Initial connection 단계에서의 지연이었다.

![img](images/initial_connection.png)

이는 프론트엔드 코드 수정으로 해결될 문제가 아니라 네트워크/인프라 이슈였다. 도메인 연결을 검토한 결과, 연결한 도메인이 유효하지 않은 IP나 여러 IP에 잘못 연결되어 있어 타임아웃이 발생한 후 올바른 IP를 찾는 과정에서 지연이 발생한 것이었다.

해당 이슈가 다시 발생하면 DNS 설정과 도메인 연결 상태를 우선적으로 검토해야 한다.

### mixed content

HTTPS 사이트에서 HTTP 리소스(이미지, 스크립트, API 요청 등)를 로드하려고 할 때 발생한다. 보안상의 이유로 브라우저가 차단하므로, 모든 요청 URL을 HTTPS로 변경해야 한다.

## 렌더링 이슈

### CSS가 적용되지 않는 경우

1. 브라우저 호환성: 사용자의 브라우저 버전이 낮을 경우 최신 CSS 속성이 지원되지 않을 수 있다. Can I Use 사이트에서 호환성을 확인하고, 벤더 프리픽스(`-webkit-`, `-moz-` 등)를 추가하거나 폴백 스타일을 제공해야 한다.
2. 우선순위(Specificity) 문제: 다른 CSS 규칙에 의해 덮어씌워졌을 수 있다. 개발자 도구 Elements 탭의 Styles 패널에서 취소선이 그어져 있는지 확인한다.

### 화면이 하얗게 뜨는 경우 (White Screen of Death)

주로 JavaScript 실행 중 치명적인 에러가 발생하여 렌더링이 중단된 경우다.

1. 문법/참조 에러: `undefined`의 속성을 읽으려 하거나 함수가 아닌 것을 호출했을 때 발생한다.
2. 콘솔 확인: 개발자 도구 Console 탭에서 빨간색 에러 메시지를 확인하여 원인을 파악해야 한다.
3. React Error Boundary: 리액트의 경우 Error Boundary를 설정하여 전체 앱이 붕괴되는 것을 방지하고 에러 UI를 보여줄 수 있다.

## 리소스 로드 이슈

### 이미지 미리보기가 안 되는 경우

![img](images/preview_image.png)

```javascript
async function getResource() {
  try {
    const response = await fetch('/images/images/test.png');
    // response.blob()을 호출하면 스트림을 읽어버리기 때문에
    // 이후 개발자 도구 등에서 response 본문을 다시 읽을 수 없게 될 수 있다.
    const blob = await response.blob();
    return new File([blob], 'images/test.png');
  } catch (error) {
    console.log(error);
  }
}
```

`fetch`로 가져온 자원은 개발자 도구 Network 탭의 Preview 또는 Response 탭에서 내용을 확인할 수 있다.

하지만 코드 내에서 `response.blob()`, `response.json()` 등의 메서드를 사용하여 응답 본문(Body) 스트림을 이미 읽어버린(consumed) 경우, 브라우저 정책이나 타이밍에 따라 개발자 도구에서 해당 응답 내용을 더 이상 표시하지 못할 수 있다. 디버깅 시에는 데이터를 읽기 전 시점을 확인하거나, 네트워크 탭의 기록을 활용해야 한다.
