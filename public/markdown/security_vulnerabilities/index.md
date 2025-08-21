---
folderName: security_vulnerabilities
updatedAt: 2025-02-06
title: 웹 취약점
tag: security
isPublished: true
---

# 웹 취약점

- [CSRF](#csrf)
- [XSS](#xss)
- [Network Sniffing](#network-sniffing)
- [인증 방식별 보안 취약점 및 조치 방법](#인증-방식별-보안-취약점-및-조치-방법)
  - [Same-Origin + 서버 측 쿠키 인증](#same-origin--서버-측-쿠키-인증)
  - [Cross-Origin + 서버 측 쿠키 인증](#cross-origin--서버-측-쿠키-인증)
  - [Same-Origin + 클라이언트 측 저장소 인증](#same-origin--클라이언트-측-저장소-인증)
  - [Cross-Origin + 클라이언트 측 저장소 인증](#cross-origin--클라이언트-측-저장소-인증)
  - [상황에 따른 권장 방식](#상황에-따른-권장-방식)

## CSRF

CSRF(Cross-Site Request Forgery)는 사용자가 인증된 상태에서 의도하지 않은 요청을 서버에 보내도록 유도하는 공격이다.

▾ 공격 과정

1. 사용자가 웹사이트에 로그인하여 인증된 세션 유지
2. 악의적인 웹사이트 방문
3. 악성 사이트가 사용자 대신 인증된 사이트에 요청 전송

▾ 방어 방법

- CSRF 토큰: 서버가 발급한 고유 토큰으로 요청 검증
- SameSite 쿠키: 제3자 사이트 요청에 쿠키 포함 방지
- Referer 헤더 확인: 요청 출처 검증

## XSS

XSS(Cross-Site Scripting)는 공격자가 악성 스크립트를 웹 페이지에 삽입하여 사용자 브라우저에서 실행시키는 공격이다.

▾ 공격 유형

1. 반사형 XSS: URL에 포함된 스크립트가 즉시 실행
2. 저장형 XSS: 서버에 저장된 스크립트가 다른 사용자에게 실행
3. DOM 기반 XSS: 클라이언트 측 DOM 조작으로 실행

▾ 방어 방법

- 출력 인코딩: HTML 특수문자 이스케이프 처리
- 입력 검증: 사용자 입력 필터링 및 검증
- CSP: Content Security Policy로 스크립트 실행 제한
- 프레임워크 보안 기능: React, Vue 등의 자동 이스케이프 기능 활용

## Network Sniffing

네트워크를 통해 전송되는 데이터를 가로채어 분석하는 공격이다.

▾ 공격 유형

- 패킷 스니핑: 네트워크 패킷 캡처 및 분석
- MITM(Man-in-the-Middle): 통신 당사자 사이에 위치하여 데이터 가로채기
- ARP 스푸핑: ARP 패킷 조작으로 트래픽 우회

▾ 방어 방법

- 암호화: HTTPS, TLS/SSL 등 데이터 암호화
- VPN/IPsec: 보안 프로토콜 사용
- 네트워크 세분화: 중요 데이터와 일반 네트워크 분리
- 네트워크 모니터링: 비정상 활동 감지 시스템 구축

## 인증 방식별 보안 취약점 및 조치 방법

### Same-Origin + 서버 측 쿠키 인증

▾ 취약점

- XSS: 악성 스크립트가 쿠키에 접근 가능
- CSRF: 악의적 사이트에서 인증된 요청 전송 가능
- 세션 고정: 세션 ID 고정 공격 위험

▾ 조치 방법

```ts
// 서버 설정 예시
res.cookie('sessionId', sessionValue, {
  httpOnly: true, // XSS 방지
  secure: true, // HTTPS 전용
  sameSite: 'Strict', // CSRF 방지
  maxAge: 3600000, // 1시간
});
```

- CSP 헤더 설정으로 XSS 방지
- CSRF 토큰 사용
- 세션 재생성 (로그인 시)

### Cross-Origin + 서버 측 쿠키 인증

▾ 취약점

- 쿠키 전송 차단: SameSite 정책으로 쿠키 미전송
- CORS 설정 오류: 잘못된 CORS 설정으로 보안 취약점
- Preflight 요청 문제: 복잡한 CORS 처리

▾ 조치 방법

```ts
// 서버 설정
res.cookie('sessionId', sessionValue, {
  httpOnly: true,
  secure: true,
  sameSite: 'None', // Cross-origin 허용
  domain: '.example.com', // 서브도메인 공유
});

// CORS 설정
app.use(
  cors({
    origin: 'https://frontend.example.com',
    credentials: true,
  }),
);
```

- 명시적 CORS 설정
- `credentials: true` 설정
- 도메인별 Origin 제한

### Same-Origin + 클라이언트 측 저장소 인증

▾ 취약점

- XSS: localStorage/sessionStorage 접근으로 토큰 탈취
- 토큰 노출: 개발자 도구에서 토큰 확인 가능
- 자동 만료 처리 부재: 수동 토큰 관리 필요

▾ 조치 방법

```ts
// 토큰 저장 및 사용
const token = localStorage.getItem('authToken');
fetch('/api/protected', {
  headers: {
    Authorization: `Bearer ${token}`,
    'X-Requested-With': 'XMLHttpRequest',
  },
});

// 토큰 만료 처리
if (isTokenExpired(token)) {
  refreshToken();
}
```

- CSP 설정으로 XSS 방지
- 짧은 토큰 유효기간 (15분)
- 리프레시 토큰 분리 저장
- 토큰 암호화 저장

### Cross-Origin + 클라이언트 측 저장소 인증

▾ 취약점

- XSS: 토큰 탈취 위험
- CORS Preflight: 복잡한 헤더로 인한 Preflight 요청
- 토큰 전송 실패: CORS 설정 오류로 요청 차단

▾ 조치 방법

```ts
// 클라이언트 설정
const api = axios.create({
  baseURL: 'https://api.example.com',
  withCredentials: false, // 쿠키 미사용
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('authToken');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// 서버 CORS 설정
app.use(
  cors({
    origin: ['https://app1.com', 'https://app2.com'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  }),
);
```

- 명시적 Origin 허용 리스트
- 표준 Authorization 헤더 사용
- 토큰 로테이션 구현

### 상황에 따른 권장 방식

| 상황              | 권장 방식                   | 이유                   |
| ----------------- | --------------------------- | ---------------------- |
| 전통적 웹앱       | Same-Origin + HttpOnly 쿠키 | 최고 보안, 간단한 구현 |
| SPA + API         | Cross-Origin + localStorage | 유연성, CORS 호환성    |
| 모바일 하이브리드 | localStorage + 토큰         | 플랫폼 호환성          |
| 금융/의료 서비스  | HttpOnly 쿠키 + 2FA         | 최고 보안 요구사항     |
| 마이크로서비스    | JWT + 서비스간 검증         | 분산 환경 적합         |

▾ 모든 방식에서 공통으로 적용해야 할 보안 조치

1. HTTPS 필수: 모든 통신 암호화
2. CSP 헤더: XSS 공격 방지
3. 토큰 로테이션: 정기적 토큰 갱신
4. 로그 모니터링: 비정상 접근 탐지
5. 입력 검증: 모든 사용자 입력 검증
6. 최소 권한 원칙: 필요한 권한만 부여
