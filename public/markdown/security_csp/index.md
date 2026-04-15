---
folderName: security_csp
title: 콘텐츠 보안 정책(CSP)
tag: security
isPublished: true
---

# 콘텐츠 보안 정책(CSP)

- [적용 방법](#적용-방법)
- [소스 값](#소스-값)
- [주요 디렉티브](#주요-디렉티브)
- [실행 제어: nonce와 hash](#실행-제어-nonce와-hash)
  - [nonce 방식](#nonce-방식)
  - [hash 방식](#hash-방식)
  - [nonce와 hash 비교](#nonce와-hash-비교)
- [사용 예시](#사용-예시)
- [위반 보고](#위반-보고)

CSP(Content Security Policy)는 허용된 출처의 리소스만 로드·실행되도록 브라우저에 지침을 내리는 보안 표준이다. XSS, Clickjacking, 데이터 인젝션 등의 공격을 완화한다.

## 적용 방법

HTTP 응답 헤더로 설정하거나 HTML `<meta>` 태그로 정의한다.

```http
Content-Security-Policy: default-src 'self'; script-src 'self' https://apis.google.com; style-src 'self' 'unsafe-inline'
```

```html
<meta http-equiv="Content-Security-Policy" content="default-src 'self'; script-src 'self'" />
```

단, `<meta>` 태그 방식은 `frame-ancestors`, `sandbox`, `report-uri` 디렉티브를 지원하지 않으므로 HTTP 헤더 방식을 권장한다.

## 소스 값

디렉티브의 허용 범위는 소스 값으로 지정한다.

| 소스 값               | 설명                                                               |
| --------------------- | ------------------------------------------------------------------ |
| `'none'`              | 모든 출처 차단                                                     |
| `'self'`              | 동일 출처만 허용                                                   |
| `https://example.com` | 특정 URL 허용                                                      |
| `https:`              | HTTPS 스킴 전체 허용                                               |
| `*.example.com`       | 서브도메인 와일드카드 허용                                         |
| `'unsafe-inline'`     | 인라인 스크립트·스타일 허용 (XSS 위험)                             |
| `'unsafe-eval'`       | `eval()` 등 문자열 코드 실행 허용 (XSS 위험)                       |
| `'strict-dynamic'`    | nonce/hash로 신뢰된 스크립트가 동적으로 로드하는 스크립트도 신뢰함 |
| `'nonce-{value}'`     | 해당 nonce가 일치하는 인라인 스크립트만 허용                       |
| `'sha256-{hash}'`     | 해시가 일치하는 인라인 스크립트만 허용                             |

## 주요 디렉티브

지정되지 않은 디렉티브는 `default-src`의 값을 상속한다.

리소스 로드 제어:

| 디렉티브          | 제어 대상                                                        |
| ----------------- | ---------------------------------------------------------------- |
| `default-src`     | 다른 디렉티브의 기본값                                           |
| `script-src`      | JS 파일 및 인라인 스크립트 전체                                  |
| `script-src-elem` | `<script src="">` 외부 파일만                                    |
| `script-src-attr` | `onclick` 등 인라인 이벤트 핸들러만                              |
| `style-src`       | CSS 파일 및 인라인 스타일 전체                                   |
| `style-src-elem`  | `<link rel="stylesheet">`, `<style>` 태그                        |
| `style-src-attr`  | `style=""` 인라인 속성만                                         |
| `img-src`         | 이미지 (`<img>`, CSS `background-image` 등)                      |
| `font-src`        | 웹 폰트 (`@font-face`)                                           |
| `media-src`       | `<audio>`, `<video>`                                             |
| `object-src`      | `<object>`, `<embed>` (Flash 등 플러그인). `'none'` 권장         |
| `frame-src`       | `<iframe>` 로드 출처                                             |
| `worker-src`      | Web Worker, SharedWorker, ServiceWorker                          |
| `manifest-src`    | Web App Manifest                                                 |
| `connect-src`     | `fetch`, `XHR`, `WebSocket`, `EventSource` 등 네트워크 요청 대상 |

문서·탐색 제어:

| 디렉티브                    | 설명                                                                                                              |
| --------------------------- | ----------------------------------------------------------------------------------------------------------------- |
| `base-uri`                  | `<base href="">` 에 허용할 URL을 제한함. 미설정 시 공격자가 base URL을 변조하여 상대 경로 리소스를 탈취할 수 있음 |
| `form-action`               | `<form action="">` 제출 대상 URL을 제한함                                                                         |
| `frame-ancestors`           | 이 페이지를 `<iframe>`으로 삽입할 수 있는 출처를 제한함. `X-Frame-Options`를 대체함                               |
| `sandbox`                   | 페이지에 `<iframe sandbox>`와 동일한 제약을 적용함. 스크립트 실행·팝업·폼 제출 등을 선택적으로 차단 가능          |
| `upgrade-insecure-requests` | 페이지 내 HTTP 리소스 요청을 자동으로 HTTPS로 업그레이드함                                                        |

보고:

| 디렉티브     | 설명                                                                               |
| ------------ | ---------------------------------------------------------------------------------- |
| `report-uri` | 정책 위반 발생 시 JSON 보고서를 전송할 엔드포인트. 현재 deprecated                 |
| `report-to`  | `Reporting-Endpoints` 헤더와 연동하여 위반 보고를 전송함. `report-uri`의 후속 표준 |

## 실행 제어: nonce와 hash

인라인 스크립트를 허용해야 하는 경우 `'unsafe-inline'` 대신 nonce 또는 hash로 특정 코드만 허용할 수 있다.

### nonce 방식

서버가 요청마다 예측 불가능한 임의 값(nonce)을 생성하여 CSP 헤더와 `<script>` 태그 양쪽에 동시에 포함한다. 브라우저는 태그의 nonce 속성 값이 헤더의 값과 일치하는 스크립트만 실행한다.

```text
[요청]
클라이언트 → 서버: GET /page

[응답]
서버: nonce 값 생성 (예: crypto.randomUUID())
서버 → 클라이언트:
  헤더: Content-Security-Policy: script-src 'nonce-r4nd0mV4lu3'
  HTML:  <script nonce="r4nd0mV4lu3">...</script>

[브라우저]
nonce 속성 값 == 헤더 nonce 값 → 실행 허용
nonce 없거나 불일치 → 차단
```

nonce는 요청마다 새로 생성해야 한다. 고정 값을 사용하면 공격자가 값을 알아내어 악성 스크립트에 동일한 nonce를 삽입할 수 있다.

```ts
// Next.js 미들웨어에서 nonce 생성 예시
import { NextResponse } from 'next/server';

export function middleware() {
  const nonce = Buffer.from(crypto.randomUUID()).toString('base64');
  const csp = `script-src 'self' 'nonce-${nonce}'`;

  const response = NextResponse.next();
  response.headers.set('Content-Security-Policy', csp);
  response.headers.set('x-nonce', nonce); // 렌더링 시 참조용
  return response;
}
```

### hash 방식

허용할 인라인 스크립트의 내용을 SHA-256 등으로 해시한 값을 CSP 헤더에 명시한다. 브라우저가 실행 전 스크립트 내용을 직접 해시하여 헤더에 등록된 값과 비교한다.

```text
[빌드 타임]
개발자: 인라인 스크립트 내용의 SHA-256 해시값 계산
      → echo -n 'console.log("hi")' | openssl dgst -sha256 -binary | base64

[응답 헤더]
Content-Security-Policy: script-src 'sha256-계산된해시값'

[브라우저]
실행 전 스크립트 내용 해시 계산 → 헤더 값과 비교
일치 → 실행 허용 / 불일치 → 차단
```

스크립트 내용이 바뀌면 해시값도 달라지므로 내용 변경 시 헤더도 함께 갱신해야 한다. 서버가 동적으로 값을 주입하지 않는 정적 인라인 스크립트에 적합하다.

```html
<!-- 헤더: Content-Security-Policy: script-src 'sha256-RFWPLDbv2BY+rCkDzsE+0fr8ylGr2R2faWMhq4lfEQc=' -->
<script>
  console.log('hi');
</script>
```

### nonce와 hash 비교

| 구분            | nonce                                    | hash                               |
| --------------- | ---------------------------------------- | ---------------------------------- |
| 적합한 스크립트 | 서버가 동적으로 생성하는 인라인 스크립트 | 내용이 고정된 정적 인라인 스크립트 |
| 값 생성 시점    | 요청마다 서버에서 실시간 생성            | 빌드 타임에 미리 계산              |
| 내용 변경 시    | 자동 대응 (nonce만 교체)                 | 헤더의 해시값도 함께 갱신 필요     |
| 외부 파일 적용  | 불가 (인라인 전용)                       | 불가 (인라인 전용)                 |

## 사용 예시

엄격한 SPA 정책 — 외부 스크립트 차단, nonce로 인라인만 허용:

```http
Content-Security-Policy:
  default-src 'self';
  script-src 'self' 'nonce-{서버생성값}' 'strict-dynamic';
  style-src 'self' 'unsafe-inline';
  img-src 'self' data: https://cdn.example.com;
  font-src 'self' https://fonts.gstatic.com;
  connect-src 'self' https://api.example.com;
  object-src 'none';
  base-uri 'self';
  form-action 'self';
  frame-ancestors 'none';
  upgrade-insecure-requests;
  report-to default
```

외부 CDN 및 분석 도구 허용:

```http
Content-Security-Policy:
  default-src 'self';
  script-src 'self' https://cdn.jsdelivr.net https://www.googletagmanager.com;
  style-src 'self' https://fonts.googleapis.com;
  font-src 'self' https://fonts.gstatic.com;
  img-src 'self' https://www.google-analytics.com;
  connect-src 'self' https://www.google-analytics.com;
  frame-ancestors 'self'
```

Clickjacking 방지만 적용:

```http
Content-Security-Policy: frame-ancestors 'none'
```

## 위반 보고

`Reporting-Endpoints` 헤더로 엔드포인트를 먼저 정의한 뒤 `report-to`로 연결한다.

```http
Reporting-Endpoints: default="https://example.com/csp-report"
Content-Security-Policy: default-src 'self'; report-to default
```

위반 발생 시 브라우저가 해당 엔드포인트로 전송하는 JSON 페이로드 예시:

```json
{
  "type": "csp-violation",
  "body": {
    "documentURL": "https://example.com/page",
    "violatedDirective": "script-src",
    "blockedURL": "https://evil.com/malicious.js",
    "disposition": "enforce"
  }
}
```

정책을 바로 적용하지 않고 위반 사항만 수집하려면 `Content-Security-Policy-Report-Only` 헤더를 사용한다.

```http
Content-Security-Policy-Report-Only: default-src 'self'; report-to default
```
