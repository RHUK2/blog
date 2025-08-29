---
folderName: browser_debug
updatedAt: 2024-10-11
title: 브라우저 디버깅
tag: browser
isPublished: true
---

# 브라우저 디버깅

- [이벤트 리스너 확인](#이벤트-리스너-확인)
- [네트워크 이슈](#네트워크-이슈)
  - [initial connection](#initial-connection)
  - [mixed-content](#mixed-content)
- [렌더링 이슈](#렌더링-이슈)
  - [CSS가 적용되지 않는 경우](#css가-적용되지-않는-경우)
  - [화면이 하얗게 뜨는 경우](#화면이-하얗게-뜨는-경우)
- [리소스 로드 이슈](#리소스-로드-이슈)
  - [이미지 미리보기가 안 되는 경우](#이미지-미리보기가-안-되는-경우)

## 이벤트 리스너 확인

콘솔에서 다음 명령어로 등록된 이벤트 리스너를 확인할 수 있다:

```ts
getEventListeners($0);
getEventListeners(window);
getEventListeners(document);
```

또는 개발자 도구의 Elements 탭에서 요소를 선택 후 Event Listeners 패널을 통해 확인할 수 있다.

![img](images/devtool_tab.png)

## 네트워크 이슈

### initial connection

리액트 프로젝트를 배포 후 사이트에 접속했을 때 매우 느리게 로드되는 문제가 발생했다. 체감상 30초 정도 걸렸다.

처음에는 SPA의 첫 로드가 오래 걸린다고 생각했지만, 번들 파일 크기가 1.2MB 정도였다. 폰트 용량 문제라고 생각해 경량화 폰트를 적용했으나 이슈는 해결되지 않았다.

개발자 도구를 자세히 살펴보니 진입점 파일인 `index.html`을 불러오는데 약 20초가 걸렸다. 원인은 initial connection 이슈였다.

![img](images/initial_connection.png)

이는 프론트엔드 코드 수정으로 해결될 문제가 아니라 네트워크 이슈였다. 도메인 연결을 검토한 결과, 연결한 도메인이 다른 IP에도 연결되어 있어서 올바른 IP를 찾지 못해 발생한 문제였다.

해당 이슈가 다시 발생하면 도메인 연결을 검토해야 한다.

### mixed-content

HTTPS 사이트에서 HTTP 통신을 할 경우 발생한다. 모든 요청을 HTTPS로 변경해야 한다.

## 렌더링 이슈

### CSS가 적용되지 않는 경우

사용자의 브라우저 버전이 낮을 경우 해당 요소에 적용된 스타일이 지원되지 않을 수 있다. 브라우저 업데이트를 요구하거나 폴백 스타일을 제공해야 한다.

### 화면이 하얗게 뜨는 경우

JavaScript에서 메서드 참조를 못하거나 값을 참조하지 못했을 때 발생할 확률이 크다. 콘솔에서 에러 메시지를 확인해야 한다.

## 리소스 로드 이슈

### 이미지 미리보기가 안 되는 경우

![img](images/preview_image.png)

```ts
async function getResource() {
  try {
    const response = await fetch('/images/images/test.png');
    const blob = await response.blob();
    return new File([blob], 'images/test.png');
  } catch (error) {
    console.log(error);
  }
}
```

`fetch`로 가져온 자원은 개발자 도구 Network 탭에서 미리보기가 가능하다. 하지만 `blob()` 메서드를 적용하면 `response`의 타입이 변경되어 미리보기가 불가능해진다.
