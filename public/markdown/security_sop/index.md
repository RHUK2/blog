---
folderName: security_sop
title: Same Origin Policy
tag: security
isPublished: true
---

# Same Origin Policy

- [동일 출처 정책(Same Origin Policy)이란?](#동일-출처-정책same-origin-policy이란)
- [교차 출처로 삽입할 수 있는 리소스](#교차-출처로-삽입할-수-있는-리소스)
  - [컨텐츠 보안 정책(Content Security Policy)으로 교차 출처 삽입 접근 제어](#컨텐츠-보안-정책content-security-policy으로-교차-출처-삽입-접근-제어)
- [교차 출처 읽기를 허용하기 위한 교차 출처 자원 공유(Cross-Origin Resource Sharing)](#교차-출처-읽기를-허용하기-위한-교차-출처-자원-공유cross-origin-resource-sharing)
  - [첫 번째 시나리오 - 단순 요청 (Simple Request)](#첫-번째-시나리오---단순-요청-simple-request)
  - [두 번째 시나리오 - 사전 요청 (Preflight Request)](#두-번째-시나리오---사전-요청-preflight-request)
  - [세 번째 시나리오 - 자격 증명을 포함한 요청 (Credentialed Request)](#세-번째-시나리오---자격-증명을-포함한-요청-credentialed-request)
  - [CORS 헤더 상세](#cors-헤더-상세)

## 동일 출처 정책(Same Origin Policy)이란?

- 동일 출처 정책은 어떤 출처에서 불러온 문서나 스크립트가 다른 출처에서 가져온 리소스와 상호 작용할 수 있는 방법을 제한하는 중요한 보안 메커니즘이다.
- 출처는 프로토콜, 호스트, 포트로 구성된다. 이 세 가지가 동일한 경우에만 두 URL은 동일한 출처로 간주된다.
- 브라우저에서만 적용되는 정책이기에 서버 간의 통신에선 적용되지 않는다.

![img](images/origin.gif)

- 교차 출처 쓰기 허용(링크, 리다이렉트, 기본동작을 막지 않은 `form` 제출(응답 데이터를 읽지 않음))
- 교차 출처 삽입 허용
- 교차 출처 읽기 비허용(`AJAX`, `XMLHttpRequest` 등을 사용해 응답 데이터를 읽으려하는 행위)

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

### 컨텐츠 보안 정책(Content Security Policy)으로 교차 출처 삽입 접근 제어

- 컨텐츠 보안 정책(Content Security Policy)을 헤더에 삽입하여 접근을 제한할 수 있다.
- 브라우저에게 파일을 서빙하는 서버에서 응답 헤더(`Content-Security-Policy: ...)` 또는 HTML의 메타 태그(`<meta http-equiv="Content-Security-Policy" content="...">`)로 설정 가능하다.

```ts
const cspHeader = `
    default-src 'self';
    style-src 'self' 'unsafe-inline';
    script-src 'self' 'unsafe-eval' 'unsafe-inline' https://t1.kakaocdn.net https://cdn.channel.io https://js.sentry-cdn.com;
    img-src 'self' blob: data: https://i.ytimg.com https://cf.channel.io;
    font-src 'self';
    media-src 'self' https://cdn.channel.io;
    object-src 'self';
    connect-src 'self' https://*.channel.io wss://*.channel.io;
    form-action 'self' https://accounts.kakao.com  https://sharer.kakao.com;
    frame-src https://www.youtube.com https://www.google.com;
    frame-ancestors 'none';
    upgrade-insecure-requests;
`;
```

## 교차 출처 읽기를 허용하기 위한 교차 출처 자원 공유(Cross-Origin Resource Sharing)

CORS는 교차 출처 읽기를 허용하기 위해 브라우저의 기본 보안 정책을 완화하는 메커니즘이다. 서버에서 CORS 헤더를 설정하여 특정 출처의 요청을 허용할 수 있다.

### 첫 번째 시나리오 - 단순 요청 (Simple Request)

다음 조건을 모두 만족하는 요청은 사전 요청 없이 바로 전송된다.

- HTTP 메서드: `GET`, `HEAD`, `POST` 중 하나
- 헤더: 브라우저가 자동으로 설정하는 헤더 + 다음 헤더만 허용
  - `Accept`
  - `Accept-Language`
  - `Content-Language`
  - `Content-Type` (단, `application/x-www-form-urlencoded`, `multipart/form-data`, `text/plain`만 허용)

클라이언트 요청 예시:

```ts
// GET 요청
fetch('https://api.example.com/users', {
  method: 'GET',
  headers: {
    Accept: 'application/json',
  },
});

// POST 폼 데이터
fetch('https://api.example.com/login', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded',
  },
  body: 'username=john&password=secret',
});
```

서버 응답 헤더 설정:

```ts
// Express.js 예시
app.get('/users', (req, res) => {
  res.header('Access-Control-Allow-Origin', 'https://frontend.example.com');
  res.json({ users: [] });
});
```

### 두 번째 시나리오 - 사전 요청 (Preflight Request)

단순 요청 조건을 만족하지 않는 경우, 브라우저가 실제 요청 전에 `OPTIONS` 메서드로 사전 요청을 보낸다.

사전 요청이 필요한 경우:

- HTTP 메서드: `PUT`, `DELETE`, `PATCH` 등
- 커스텀 헤더 사용: `Authorization`, `X-Custom-Header` 등
- Content-Type: `application/json`, `application/xml` 등

클라이언트 요청 예시:

```ts
// JSON 데이터를 PUT으로 전송
fetch('https://api.example.com/users/123', {
  method: 'PUT',
  headers: {
    'Content-Type': 'application/json',
    Authorization: 'Bearer token123',
  },
  body: JSON.stringify({ name: 'John Doe' }),
});
```

브라우저가 자동으로 보내는 사전 요청:

```http
OPTIONS /users/123 HTTP/1.1
Host: api.example.com
Origin: https://frontend.example.com
Access-Control-Request-Method: PUT
Access-Control-Request-Headers: Content-Type, Authorization
```

서버 사전 요청 응답 설정:

```ts
// OPTIONS 요청 처리
app.options('/users/:id', (req, res) => {
  res.header('Access-Control-Allow-Origin', 'https://frontend.example.com');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  res.header('Access-Control-Max-Age', '86400'); // 24시간 캐시
  res.sendStatus(200);
});

// 실제 PUT 요청 처리
app.put('/users/:id', (req, res) => {
  res.header('Access-Control-Allow-Origin', 'https://frontend.example.com');
  res.json({ message: 'User updated' });
});
```

### 세 번째 시나리오 - 자격 증명을 포함한 요청 (Credentialed Request)

쿠키를 포함하는 요청이다.

클라이언트 요청 예시:

```ts
// 쿠키를 포함한 요청
fetch('https://api.example.com/protected', {
  method: 'GET',
  credentials: 'include', // 쿠키 포함
  headers: {
    Authorization: 'Bearer token123',
  },
});
```

서버 응답 헤더 설정:

```ts
app.get('/protected', (req, res) => {
  // 자격 증명을 포함한 요청에서는 와일드카드(*) 사용 불가
  res.header('Access-Control-Allow-Origin', 'https://frontend.example.com');
  res.header('Access-Control-Allow-Credentials', 'true');
  res.header('Access-Control-Allow-Headers', 'Authorization');

  // 쿠키 설정 예시
  res.cookie('sessionId', 'abc123', {
    httpOnly: true,
    secure: true,
    sameSite: 'None', // 크로스 도메인에서 쿠키 전송 허용
  });

  res.json({ data: 'protected data' });
});
```

종합 CORS 설정 예시:

```ts
// Express.js cors 미들웨어 사용
const cors = require('cors');

const corsOptions = {
  origin: function (origin, callback) {
    const allowedOrigins = ['https://frontend.example.com', 'https://admin.example.com'];

    // origin이 없는 경우(같은 도메인) 또는 허용된 도메인인 경우
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true, // 자격 증명 포함 허용
  optionsSuccessStatus: 200,
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With', 'X-Custom-Header'],
  exposedHeaders: ['X-Total-Count', 'X-Page-Count'],
};

app.use(cors(corsOptions));
```

### CORS 헤더 상세

| 헤더                               | 설명                     | 예시                          |
| ---------------------------------- | ------------------------ | ----------------------------- |
| `Access-Control-Allow-Origin`      | 허용할 출처 지정         | `https://example.com`         |
| `Access-Control-Allow-Methods`     | 허용할 HTTP 메서드       | `GET, POST, PUT, DELETE`      |
| `Access-Control-Allow-Headers`     | 허용할 헤더              | `Content-Type, Authorization` |
| `Access-Control-Allow-Credentials` | 자격 증명 포함 허용 여부 | `true`                        |
| `Access-Control-Max-Age`           | 사전 요청 캐시 시간(초)  | `86400`                       |
| `Access-Control-Expose-Headers`    | 클라이언트에 노출할 헤더 | `X-Total-Count`               |
