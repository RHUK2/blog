---
folderName: security_sop
updatedAt: 2025-02-06
title: Same Origin Policy
tag: security
isPublished: true
---

# Same Origin Policy

- [동일 출처 정책(Same Origin Policy)이란?](#동일-출처-정책same-origin-policy이란)
- [교차 출처로 삽입할 수 있는 리소스](#교차-출처로-삽입할-수-있는-리소스)
- [교차 출처 리소스 공유](#교차-출처-리소스-공유)
  - [1. HttpOnly 쿠키에 저장](#1-httponly-쿠키에-저장)
  - [2. 로컬 스토리지(Local Storage)에 저장](#2-로컬-스토리지local-storage에-저장)
  - [3. 세션 스토리지(Session Storage)에 저장](#3-세션-스토리지session-storage에-저장)
  - [4. 일반적인 선택 기준](#4-일반적인-선택-기준)
  - [5. 업계 표준 및 권장 사항](#5-업계-표준-및-권장-사항)
  - [6. 결론](#6-결론)

## 동일 출처 정책(Same Origin Policy)이란?

- 동일 출처 정책은 어떤 출처에서 불러온 문서나 스크립트가 다른 출처에서 가져온 리소스와 상호 작용할 수 있는 방법을 제한하는 중요한 보안 메커니즘이다.
- 출처는 프로토콜, 호스트, 포트로 구성된다. 이 세 가지가 동일한 경우에만 두 URL은 동일한 출처로 간주된다.

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

- 컨텐츠 보안 정책(Content Security Policy)을 헤더에 삽입하여 접근을 제한할 수 있다.
- 브라우저에게 파일을 서빙하는 서버에서 응답 헤더(`Content-Security-Policy: ...)`로 설정 가능하다.
- HTML의 메타 태그(`<meta http-equiv="Content-Security-Policy" content="...">`)로 설정 가능하다.

```ts
const cspHeader = `
    default-src 'self'; // 모든 리소스
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

---

JWT(JSON Web Token)를 사용한 로그인 시, 토큰을 브라우저에 저장하는 일반적인 방법은 다음과 같습니다. 각 방법의 특징과 장단점을 간략히 정리하겠습니다.

### 1. HttpOnly 쿠키에 저장

- 설명: JWT를 `HttpOnly`, `Secure`, `SameSite` 속성이 설정된 쿠키에 저장합니다. 백엔드 서버가 `Set-Cookie` 헤더로 쿠키를 발급하고, 브라우저는 이후 요청 시 자동으로 쿠키를 포함합니다.
- 일반적인 사용 사례:
  - 프론트엔드와 백엔드가 동일 도메인 또는 서브도메인에서 동작하거나, 크로스 도메인 인증을 위해 `SameSite=None; Secure`를 설정한 경우.
  - 로컬 환경에서는 `Secure`를 비활성화하거나 HTTPS를 설정해 테스트.
- 장점:
  - `HttpOnly`로 설정하면 JavaScript로 접근할 수 없어 XSS(크로스 사이트 스크립팅) 공격에 상대적으로 안전.
  - 브라우저가 쿠키를 자동으로 관리하므로 프론트엔드 코드가 간단.
  - CSRF 방지를 위해 `SameSite=Strict` 또는 `Lax` 사용 가능.
- 단점:
  - CSRF(크로스 사이트 요청 위조) 공격 가능성이 있으므로 CSRF 토큰이나 추가 검증 필요.
  - 크로스 도메인 환경에서는 CORS와 `SameSite=None; Secure` 설정이 필요해 복잡할 수 있음.
  - 로컬 환경에서 HTTPS 없이 테스트하려면 `Secure`를 비활성화해야 함.
- 예시 (백엔드 - Express):
  ```javascript
  res.cookie('jwt', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production', // 배포 시 true, 로컬 시 false
    sameSite: 'Lax', // 크로스 도메인 시 None
    maxAge: 24 * 60 * 60 * 1000, // 1일
  });
  ```

### 2. 로컬 스토리지(Local Storage)에 저장

- 설명: JWT를 브라우저의 `localStorage`에 저장하고, API 요청 시 프론트엔드에서 `Authorization: Bearer <token>` 헤더로 전송합니다.
- 일반적인 사용 사례:
  - 프론트엔드와 백엔드가 완전히 다른 도메인에 있거나, SPA(예: React, Vue)에서 인증 헤더를 직접 관리하려는 경우.
- 장점:
  - 크로스 도메인 환경에서 쿠키보다 설정이 간단 (CORS만 처리하면 됨).
  - 프론트엔드에서 토큰을 쉽게 읽고 관리 가능.
  - CSRF 공격에 영향을 받지 않음 (쿠키를 사용하지 않으므로).
- 단점:
  - XSS 공격에 취약. JavaScript로 `localStorage`에 접근 가능하므로, 악성 스크립트가 토큰을 탈취할 수 있음.
  - 토큰을 수동으로 헤더에 추가해야 하므로 프론트엔드 코드가 약간 복잡.
- 보안 강화 방법:
  - XSS 방지를 위해 CSP(Content Security Policy) 헤더 설정.
  - 짧은 유효 기간의 액세스 토큰과 리프레시 토큰 조합 사용.
- 예시 (프론트엔드 - JavaScript):

  ```javascript
  // 저장
  localStorage.setItem('jwt', token);

  // 요청
  fetch('https://api.backend.com/protected', {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('jwt')}`,
    },
  });
  ```

### 3. 세션 스토리지(Session Storage)에 저장

- 설명: JWT를 `sessionStorage`에 저장하며, 사용 방식은 로컬 스토리지와 유사합니다. 단, 브라우저 탭이 닫히면 토큰이 삭제됩니다.
- 일반적인 사용 사례:
  - 세션이 종료될 때마다 로그아웃되길 원하는 경우 (예: 은행 앱).
- 장점:
  - 탭별로 독립적인 저장소이므로 탭 간 간섭 없음.
    CSRF에 영향을 받지 않음.
- 단점:
  - 로컬 스토리지와 마찬가지로 XSS 공격에 취약.
  - 탭이 닫히면 토큰이 사라지므로, 지속적인 로그인 상태 유지가 필요한 경우 적합하지 않음.
- 예시:

  ```javascript
  // 저장
  sessionStorage.setItem('jwt', token);

  // 요청
  fetch('https://api.backend.com/protected', {
    headers: {
      Authorization: `Bearer ${sessionStorage.getItem('jwt')}`,
    },
  });
  ```

### 4. 일반적인 선택 기준

- HttpOnly 쿠키:
  - XSS 방지가 우선순위이고, 백엔드와 프론트엔드가 동일/유사 도메인에서 동작하거나, CSRF 방지책을 마련할 수 있는 경우.
  - 로컬 환경에서는 `Secure`를 비활성화하거나 HTTPS 설정 필요.
- 로컬 스토리지:
  - 크로스 도메인 환경이거나, 프론트엔드에서 토큰을 직접 관리해야 하는 경우.
  - XSS 방지책(CSP, 입력 검증 등)이 충분히 마련된 경우.
- 세션 스토리지:
  - 짧은 세션 기반 인증이 필요하거나, 탭 종료 시 로그아웃을 강제하려는 경우.

### 5. 업계 표준 및 권장 사항

- HttpOnly 쿠키 선호: 보안 관점에서 XSS에 강한 `HttpOnly` 쿠키가 더 안전한 선택으로 간주됩니다. OWASP(Open Web Application Security Project)에서도 인증 토큰을 `HttpOnly` 쿠키에 저장할 것을 권장.
- 리프레시 토큰 사용: 액세스 토큰의 유효 기간을 짧게 설정(예: 15분)하고, 리프레시 토큰을 별도로 발급해 보안 강화.
  - 리프레시 토큰은 `HttpOnly` 쿠키에 저장하는 것이 일반적.
- 로컬 환경 고려: 로컬 개발 시 `Secure` 속성이나 HTTPS 설정이 제한적이라면, `HttpOnly` 쿠키를 사용하되 `Secure=false`로 설정하거나, 로컬 스토리지를 사용해 테스트 후 배포 시 쿠키로 전환.

### 6. 결론

- 가장 일반적인 방법: `HttpOnly`, `Secure`, `SameSite=Lax` (또는 크로스 도메인 시 `None`) 쿠키에 JWT를 저장하는 방식. XSS 방지와 브라우저의 자동 쿠키 관리로 인해 선호됨.
- 로컬 환경: `Secure`를 비활성화하거나, HTTPS를 설정하지 않는 경우 로컬 스토리지를 임시로 사용할 수 있지만, 배포 시 `HttpOnly` 쿠키로 전환 권장.
- 보안 우선: XSS와 CSRF를 모두 고려해 `HttpOnly` 쿠키 + CSRF 토큰 + 짧은 유효 기간의 JWT 조합이 이상적.

혹시 특정 프론트엔드(예: React)나 백엔드(예: Node.js) 환경에 맞춘 코드 예제나 추가적인 보안 설정(예: CSRF 방지)이 필요하시면 말씀해주세요!
