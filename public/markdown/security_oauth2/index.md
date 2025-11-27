---
folderName: security_oauth2
title: OAuth2
tag: security
isPublished: false
---

# OAuth2

## HTTP 인증 방식

HTTP 요청 시 `Authorization` 헤더를 통해 클라이언트가 서버에 인증 정보를 전달하는 방식이다.

Basic 인증:

- 형식: `Authorization: Basic <Base64로 인코딩된 ID:PW>`
- 설명:
  - 사용자 이름과 비밀번호를 `username:password` 형태로 결합하고 Base64로 인코딩하여 전송한다.
  - 예: `user:pass` → `dXNlcjpwYXNz`
- 특징:
  - 구현이 매우 간단하다.
  - Base64는 암호화가 아닌 인코딩이므로, 탈취 시 ID/PW가 그대로 노출된다. 반드시 HTTPS와 함께 사용해야 한다.

Bearer 인증:

- 형식: `Authorization: Bearer <Token>`
- 설명:
  - OAuth 2.0이나 JWT(JSON Web Token)와 같은 토큰 기반 인증에서 사용된다.
  - "이 토큰을 가진 자(Bearer)에게 권한을 부여하라"는 의미이다.
- 특징:
  - 서버는 토큰의 유효성(서명, 만료 시간 등)만 검증하면 되므로 세션 저장소가 필요 없는 Stateless 인증이 가능하다.
  - 모바일 앱이나 SPA(Single Page Application)에서 주로 사용된다.
