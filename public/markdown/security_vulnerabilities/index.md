---
folderName: security_vulnerabilities
title: 웹 애플리케이션 보안 취약점
tag: security
isPublished: true
---

# 웹 애플리케이션 보안 취약점

- [사이트 간 요청 위조(CSRF)](#사이트-간-요청-위조csrf)
- [사이트 간 스크립팅(XSS)](#사이트-간-스크립팅xss)
- [네트워크 스니핑(Network Sniffing)](#네트워크-스니핑network-sniffing)
- [인증 방식별 보안 취약점 및 대응 방안](#인증-방식별-보안-취약점-및-대응-방안)
  - [쿠키 기반 인증(Cookie-based Authentication)](#쿠키-기반-인증cookie-based-authentication)
  - [토큰 기반 인증(Token-based Authentication)](#토큰-기반-인증token-based-authentication)
  - [리프레시 토큰 로테이션(Refresh Token Rotation)](#리프레시-토큰-로테이션refresh-token-rotation)

## 사이트 간 요청 위조(CSRF)

CSRF(Cross-Site Request Forgery)는 사용자가 자신의 의지와 무관하게 공격자가 의도한 행위(수정, 삭제, 등록 등)를 특정 웹사이트에 요청하게 하는 공격임.

- 공격 조건:
  - 사용자가 대상 사이트에 로그인하여 쿠키 기반 세션이 유지되고 있어야 함.
  - 공격자가 유도한 악성 페이지를 사용자가 방문해야 함.

- 방어 기법:
  - SameSite 쿠키 속성 활용: `Strict` 또는 `Lax` 설정을 통해 제3자 사이트에서의 쿠키 전송을 제한함.
  - CSRF 토큰(Anti-CSRF Token): 요청 시마다 서버가 발급한 임의의 토큰을 포함하여 서버 측에서 유효성을 검증함.
  - 사용자 재인증: 결제나 비밀번호 변경 등 민감한 작업 시 비밀번호 재입력이나 2차 인증(2FA)을 요구함.

## 사이트 간 스크립팅(XSS)

XSS(Cross-Site Scripting)는 공격자가 웹 페이지에 악성 스크립트를 삽입하여 사용자의 브라우저에서 실행되게 하는 취약점임.

- 공격 유형:
  - 저장형(Stored) XSS: 게시판, 프로필 등 서버 DB에 악성 스크립트가 저장되어 여러 사용자에게 노출됨.
  - 반사형(Reflected) XSS: URL 파라미터 등에 포함된 스크립트가 응답 페이지에 그대로 포함되어 실행됨.
  - DOM 기반 XSS: 클라이언트 측 스크립트가 URL 해시 등을 안전하지 않게 처리하여 발생함.

- 방어 기법:
  - 출력 인코딩(Output Encoding): 사용자의 입력을 HTML 엔티티(예: `<` → `&lt;`)로 변환하여 브라우저가 코드로 인식하지 않게 함.
  - 콘텐츠 보안 정책(CSP): 신뢰할 수 있는 출처의 스크립트만 실행되도록 브라우저 지침을 설정함.
  - HttpOnly 쿠키: 자바스크립트의 `document.cookie` 접근을 차단하여 세션 토큰 탈취를 방지함.

## 네트워크 스니핑(Network Sniffing)

네트워크상에서 전송되는 데이터를 가로채서 읽거나 분석하는 행위임.

- 대응 방안:
  - 전송 계층 보안(TLS/SSL): HTTPS를 통해 모든 통신 데이터를 암호화하여 중간자 공격(MITM)을 방지함.
  - HSTS(HTTP Strict Transport Security): 브라우저가 항상 HTTPS로만 접속하도록 강제하는 헤더를 설정함.

## 인증 방식별 보안 취약점 및 대응 방안

취약점을 결정하는 두 축은 저장 위치와 전송 방식이다.

- 저장 위치: `HttpOnly` 쿠키에 저장하면 JS 접근이 차단되어 XSS로 탈취 불가. `localStorage`, `sessionStorage`, non-HttpOnly 쿠키는 모두 JS로 읽힌다.
- 전송 방식: 브라우저가 쿠키를 자동으로 포함하는 특성이 CSRF의 원인임. `Authorization` 헤더는 JS가 직접 값을 설정해야 하므로 공격자가 위조 요청에 포함할 수 없어 CSRF에 안전함.

이 두 축을 기준으로 각 저장 방식의 취약점을 정리하면 다음과 같다.

| 저장 위치                         | 전송 방식                 | XSS  | CSRF |
| --------------------------------- | ------------------------- | ---- | ---- |
| `localStorage` / `sessionStorage` | Authorization 헤더 (수동) | 취약 | 안전 |
| non-HttpOnly 쿠키                 | Authorization 헤더 (수동) | 취약 | 안전 |
| non-HttpOnly 쿠키                 | 쿠키 자동 전송            | 취약 | 취약 |
| HttpOnly 쿠키                     | 쿠키 자동 전송            | 안전 | 취약 |

non-HttpOnly 쿠키에 저장하고 JS로 읽어 Authorization 헤더에 담아 전송하면 CSRF는 방어되지만 XSS 취약성은 `localStorage`와 동일하다. 저장 위치가 쿠키라는 사실 자체가 XSS를 방어하지는 않으며, `HttpOnly` 속성이 핵심이다.

### 쿠키 기반 인증(Cookie-based Authentication)

세션 ID를 `HttpOnly` 쿠키에 저장하고 브라우저의 자동 전송에 의존하는 방식임.

- 취약점: 브라우저가 쿠키를 자동으로 포함하는 특성으로 인해 CSRF 공격에 취약함.
- 대응 코드:

```ts
// 서버 응답 헤더 설정 예시
res.cookie('sessionId', 'value', {
  httpOnly: true, // JS 접근 차단 → XSS로 인한 탈취 방지
  secure: true, // HTTPS 환경에서만 전송
  sameSite: 'Lax', // 교차 출처 요청 시 쿠키 자동 전송 제한 → CSRF 방지
  maxAge: 3600000,
});
```

### 토큰 기반 인증(Token-based Authentication)

JWT 등의 토큰을 클라이언트에 저장하고 `Authorization` 헤더에 수동으로 담아 전송하는 방식임. `Authorization` 헤더는 브라우저가 자동으로 포함하지 않으므로 CSRF 공격에 안전하다.

- 취약점: 토큰을 `localStorage`나 `sessionStorage`에 저장하면 XSS 발생 시 직접 탈취됨. non-HttpOnly 쿠키에 저장한 후 JS로 읽어 전송하는 경우도 XSS 취약성은 동일함.
- 대응 방안:
  - 액세스 토큰은 JS 메모리(변수)에만 보관하여 `localStorage`나 쿠키보다 노출 위험을 낮춤. 단, 페이지 새로고침 시 유실되므로 유효 기간을 짧게 설정함.
  - 리프레시 토큰은 `HttpOnly` 쿠키에 저장하여 XSS로 인한 탈취를 방지함. 토큰 갱신 전용 엔드포인트에만 전달되도록 경로를 제한하고, `SameSite` 설정으로 CSRF를 완화함.
  - 화이트리스트 기반의 CORS 설정을 통해 허용된 도메인에서만 API 요청이 가능하도록 제한함.

```text
액세스 토큰  → JS 메모리(변수) 보관 → Authorization 헤더로 수동 전송 (CSRF 안전, XSS 노출 최소화)
리프레시 토큰 → HttpOnly 쿠키 보관  → 갱신 엔드포인트에 자동 전송 (XSS 안전, SameSite로 CSRF 완화)
```

### 리프레시 토큰 로테이션(Refresh Token Rotation)

리프레시 토큰을 사용할 때마다 새 리프레시 토큰을 발급하고 기존 토큰을 즉시 무효화하는 방식임. 탈취된 토큰이 재사용되면 서버가 이를 감지하여 해당 사용자의 모든 세션을 강제 종료할 수 있다.

- 재사용 감지 흐름:

```text
1. 클라이언트 → 서버: RT_1 전송
2. 서버: RT_1 무효화 후 새 AT + RT_2 발급
3. 공격자가 RT_1 재사용 시도
4. 서버: RT_1이 이미 무효화됨을 감지 → 동일 패밀리 토큰 전체 무효화 → 강제 로그아웃
```

- 구현 시 고려 사항:
  - 토큰 패밀리(Token Family): 로그인 시점부터 로테이션으로 이어진 토큰을 하나의 패밀리로 묶어 관리함. 패밀리 내 어느 토큰이라도 재사용이 감지되면 전체를 무효화함.
  - 서버 상태 저장: DB 또는 Redis에 토큰 상태를 저장해야 즉각적인 무효화가 가능함. 무상태(Stateless) 방식으로는 구현할 수 없음.
  - 경합 조건(Race Condition): 병렬 요청으로 동일 토큰이 짧은 시간 내 두 번 사용될 수 있음. 유예 윈도우(grace window)나 분산 락(Distributed Lock)으로 정상 요청과 구분함.

