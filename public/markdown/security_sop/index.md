---
folderName: security_sop
updatedAt: 2025-02-06
title: Same Origin Policy
tag: security
isPublished: true
---

# Same Origin Policy

- [출처의 정의](#출처의-정의)
- [교차 출처로 삽입할 수 있는 리소스](#교차-출처로-삽입할-수-있는-리소스)
- [교차 출처 리소스 공유](#교차-출처-리소스-공유)

동일 출처 정책은 웹 보안 모델의 핵심 개념 중 하나로, 웹 브라우저에서 실행되는 스크립트가 서로 다른 출처에서 가져온 리소스에 접근하는 것을 제한하는 규칙이다.

## 출처의 정의

- 출처는 프로토콜, 호스트, 포트로 구성된다. 이 세 가지가 동일한 경우에만 두 URL은 동일한 출처로 간주된다.
- `http://store.company.com/dir/page.html`과 `http://store.company.com/dir/other.html`은 동일한 출처다.

![img](images/origin.gif)

## 교차 출처로 삽입할 수 있는 리소스

- `<script src="…"></script>`를 사용하는 JavaScript

  - 구문 오류에 대한 오류 세부 정보는 동일 출처 스크립트에서만 사용할 수 있다.

- `<link rel="stylesheet" href="…">`로 적용된 CSS

  - CSS의 완화된 구문 규칙으로 인해 교차 출처 CSS에는 올바른 Content-Type 헤더가 요구된다.
  - 브라우저는 MIME 유형이 올바르지 않고 리소스가 유효한 CSS 구성으로 시작하지 않는 교차 출처 로드인 경우 스타일시트 로드를 차단한다.

- `<img>`로 표시하는 이미지
- `<video>`와 `<audio>`로 재생하는 미디어
- `<object>`와 `<embed>`로 삽입하는 외부 리소스
- `@font-face`로 적용하는 글꼴
- `<iframe>`으로 삽입하는 모든 것

▾ 접근 제한 방법:

- 컨텐츠 보안 정책(CSP)을 헤더에 삽입하여 접근을 제한할 수 있다.

```ts
const cspHeader = `
    default-src 'self';
    connect-src *;
    script-src 'self' 'unsafe-eval' 'unsafe-inline' https://t1.kakaocdn.net;
    style-src 'self' 'unsafe-inline';
    img-src 'self' blob: data: https://i.ytimg.com;
    font-src 'self';
    frame-src https://www.youtube.com https://www.google.com;
    object-src 'none';
    base-uri 'self';
    form-action 'self' https://accounts.kakao.com  https://sharer.kakao.com;
    frame-ancestors 'none';
`;
```

## 교차 출처 리소스 공유
