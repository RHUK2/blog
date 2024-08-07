---
updatedAt: 2024-05-20
directory: security
fileName: auth
title: 인증
description:
---

# 인증과 보안

- [브라우저 저장소](#브라우저-저장소)
  - [보충 설명](#보충-설명)
  - [쿠키 옵션 설명](#쿠키-옵션-설명)
    - [`SameSite` 옵션 값 설명](#samesite-옵션-값-설명)
- [credentials, cors](#credentials-cors)
- [CORS](#cors)
  - [세션 저장소](#세션-저장소)
  - [세션 인증 과정](#세션-인증-과정)
- [JWT](#jwt)
  - [구조](#구조)
  - [대칭키 방식의 JWT 생성 및 검증](#대칭키-방식의-jwt-생성-및-검증)
  - [비대칭키 방식의 JWT 생성 및 검증](#비대칭키-방식의-jwt-생성-및-검증)
  - [Access Token, Refresh Token](#access-token-refresh-token)
  - [JWT 인증 과정](#jwt-인증-과정)
- [MFA](#mfa)
  - [MFA의 동작 원리](#mfa의-동작-원리)
    - [1. 사용자 입력](#1-사용자-입력)
    - [2. 추가 인증 요청](#2-추가-인증-요청)
    - [3. 추가 인증 요소 제공](#3-추가-인증-요소-제공)
    - [4. 인증 확인 및 접근 허용](#4-인증-확인-및-접근-허용)
  - [MFA의 예시](#mfa의-예시)
  - [MFA의 장점](#mfa의-장점)
  - [MFA의 단점](#mfa의-단점)
- [QR코드 원리](#qr코드-원리)

## 브라우저 저장소

브라우저 저장소에 저장된 데이터는 브라우저 메모리에 저장된 데이터가 아니기에, 새로고침 시에도 데이터가 남아있다.

| 특징             | 로컬 스토리지 (Local Storage)   | 세션 스토리지 (Session Storage)      | 쿠키 (Cookie)                |
| ---------------- | ------------------------------- | ------------------------------------ | ---------------------------- |
| 데이터 저장 기간 | 영구적 (삭제 시까지)            | 세션 종료 시 (브라우저 탭 닫기)      | 설정된 만료 시간까지         |
| 저장 용량        | 약 5~10MB                       | 약 5~10MB                            | 약 4KB                       |
| 데이터 접근      | 클라이언트 측 (자바스크립트)    | 클라이언트 측 (자바스크립트)         | 클라이언트 및 서버 측        |
| 데이터 전송      | 전송되지 않음                   | 전송되지 않음                        | 매 요청마다 서버로 전송 가능 |
| 보안             | XSS에 취약                      | XSS에 취약                           | XSS 및 CSRF에 취약           |
| 범위             | 도메인 전체                     | 도메인 및 브라우저 탭                | 도메인 및 경로               |
| 사용 예          | 사용자 설정, 장기적인 상태 저장 | 일시적인 상태 저장, 세션 기반 데이터 | 사용자 인증, 세션 관리       |

### 보충 설명

1. 로컬 스토리지 (Local Storage)

   - 공유 범위: 동일한 도메인 내의 모든 탭과 창에서 데이터를 공유할 수 있다.
   - 브라우저 간 공유: 다른 브라우저 간에는 공유되지 않는다.
   - 사용 예: 사용자 설정, 장기적인 상태 저장 (예: 테마 설정, 사용자 선호도 등).

2. 세션 스토리지 (Session Storage)

   - 공유 범위: 같은 브라우저의 동일한 도메인 내의 단일 탭 또는 창에서만 데이터를 공유할 수 있다.
   - 다른 탭 간 공유: 동일한 도메인이라도 다른 탭이나 창 간에는 공유되지 않는다.
   - 브라우저 간 공유: 다른 브라우저 간에도 공유되지 않는다.
   - 사용 예: 일시적인 상태 저장, 세션 기반 데이터 (예: 일시적인 폼 데이터, 일시적인 애플리케이션 상태).

3. 쿠키 (Cookie)

   - 공유 범위: 기본적으로 동일한 도메인 내의 모든 탭과 창에서 데이터를 공유할 수 있다.
   - 도메인 제어: 쿠키의 `Domain` 속성을 설정하여 서브 도메인 간에도 데이터를 공유할 수 있다. 예를 들어, `example.com`에서 설정한 쿠키를 `sub.example.com`에서도 접근 가능하게 할 수 있다.
   - 브라우저 간 공유: 브라우저 간에는 공유되지 않는다.
   - 사용 예: 사용자 인증, 세션 관리 (예: 로그인 세션, 사용자 식별 정보).

### 쿠키 옵션 설명

| 옵션       | 설명                                       | 역할 및 특징                                                                                                                                   |
| ---------- | ------------------------------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------- |
| `Name`     | 쿠키의 이름                                | 쿠키를 식별하는 데 사용된다. 동일한 도메인 내에서 고유해야 한다.                                                                               |
| `Value`    | 쿠키의 값                                  | 쿠키에 저장되는 데이터입니다. 보안에 민감한 정보는 포함하지 않는 것이 좋다.                                                                    |
| `Domain`   | 쿠키를 사용할 수 있는 도메인               | 특정 도메인 또는 하위 도메인에서만 쿠키를 사용할 수 있게 제한한다. 예: `.example.com` 설정 시 모든 하위 도메인에서도 쿠키가 사용된다.          |
| `Path`     | 쿠키를 사용할 수 있는 경로                 | 특정 경로에서만 쿠키를 사용할 수 있게 제한한다. 예: `/account` 설정 시 `/account`와 그 하위 경로에서만 쿠키가 사용된다.                        |
| `Expires`  | 쿠키의 만료 날짜                           | 쿠키의 유효 기간을 설정한다. 날짜를 지정하지 않으면 세션 쿠키가 되며, 브라우저를 닫으면 삭제된다. 예: `expires=Wed, 21 Oct 2021 07:28:00 GMT`. |
| `Max-Age`  | 쿠키의 수명 (초 단위)                      | `expires` 대신 사용할 수 있으며, 초 단위로 유효 기간을 설정한다. 예: `max-age=3600` 설정 시 1시간 후에 쿠키가 만료된다.                        |
| `Secure`   | 쿠키가 HTTPS 연결에서만 전송되도록 설정    | 이 옵션을 설정하면 쿠키가 HTTPS 연결에서만 전송된다. 이를 통해 네트워크 상의 스니핑 공격을 방지할 수 있다.                                     |
| `SameSite` | 쿠키의 크로스 사이트 요청에 대한 제한 설정 | `Strict`, `Lax`, `None` 중 하나를 선택할 수 있으며, 이를 통해 CSRF 공격을 방지할 수 있다.                                                      |
| `HttpOnly` | JavaScript에서 쿠키 접근을 방지            | 이 옵션을 설정하면 JavaScript에서 쿠키에 접근할 수 없으므로 XSS 공격에 대한 보호를 강화한다.(이 옵션은 서버에서만 설정할 수 있다.)             |

#### `SameSite` 옵션 값 설명

- `Strict`: 쿠키가 동일 사이트 요청에서만 전송된다. 타 사이트에서의 모든 요청에는 쿠키가 전송되지 않는다.
- `Lax`: 쿠키가 동일 사이트 요청과 일부 타 사이트 요청(GET 메서드 등 안전한 방법)에서만 전송된다.
- `None`: 모든 크로스 사이트 요청에서 쿠키가 전송된다. 이 옵션을 사용할 경우 `Secure` 옵션도 함께 설정해야 한다.

## credentials, cors

## CORS

### 세션 저장소

| 저장 방식   | 설명                                       | 장점                                     | 단점                                               | 예시                |
| ----------- | ------------------------------------------ | ---------------------------------------- | -------------------------------------------------- | ------------------- |
| 서버 메모리 | 서버의 메모리에 저장                       | 빠른 접근 속도                           | 서버 재시작 시 데이터 손실, 서버 확장 시 문제 발생 | HTTP 세션 관리      |
| 인메모리 DB | Redis 등의 인메모리 데이터베이스에 저장    | 빠른 접근 속도, 데이터 복제 및 분산 가능 | 휘발성 데이터베이스이므로 데이터 영속성 낮음       | Redis, Memcached    |
| 디스크 DB   | MySQL 등의 디스크 기반 데이터베이스에 저장 | 데이터 영속성 보장, 데이터 백업 가능     | 접근 속도 상대적으로 느림                          | MySQL, PostgreSQL   |
| 파일 시스템 | 파일 형태로 서버의 파일 시스템에 저장      | 구현이 간단, 데이터 영속성 보장          | 파일 읽기/쓰기 속도 느림, 파일 시스템에 의존적     | 로컬 파일 저장, NFS |

### 세션 인증 과정

![session_auth](images/session_auth.png)

## JWT

JWT는 JSON Web Token의 약자로, JSON 객체를 안전하게 전송하기 위한 웹 표준이다. 주로 인증 및 정보 교환에 사용된다.

JWT는 그 자체로 정보를 안전하게 전송할 수 있는 방법이지만, 항상 HTTPS를 사용하여 전송하는 것이 중요하다. JWT를 사용함으로써 인증 메커니즘이 간소화되고, 확장성이 높아지는 장점을 가질 수 있다.

### 구조

1. header:

   ```json
   {
     "alg": "HS256",
     "typ": "JWT"
   }
   ```

   - 토큰 유형과 해싱 알고리즘 정보를 포함한다.

2. payload:

   ```json
   {
     "sub": "1234567890",
     "name": "John Doe",
     "iat": 1516239022
   }
   ```

   - 토큰에 담길 실제 데이터를 포함한다. 일반적으로 사용자의 정보나 만료 시간 등이 들어간다.

3. signature:

   ```ts
   HMACSHA256(base64UrlEncode(header) + '.' + base64UrlEncode(payload), secret);
   ```

   - 토큰의 무결성을 검증하기 위해 사용된다. 헤더와 페이로드를 합친 후 비밀 키로 서명한다.

### 대칭키 방식의 JWT 생성 및 검증

```ts
const crypto = require('crypto');

// Base64 URL 인코딩 함수
function base64urlEncode(str) {
  return Buffer.from(str).toString('base64').replace(/=/g, '').replace(/\+/g, '-').replace(/\//g, '_');
}

// Base64 URL 디코딩 함수
function base64urlDecode(str) {
  str = str.replace(/-/g, '+').replace(/_/g, '/');
  return Buffer.from(str, 'base64').toString('utf8');
}

// HMAC-SHA256 해싱 함수
function hmacSHA256(data, secret) {
  return crypto.createHmac('sha256', secret).update(data).digest('base64url');
}

// JWT 생성 함수
function generateToken(payload, secret, expiresIn = '1h') {
  const header = {
    alg: 'HS256',
    typ: 'JWT',
  };

  const iat = Math.floor(Date.now() / 1000);
  let exp = iat;

  // 만료 시간 계산
  if (expiresIn.endsWith('h')) {
    exp += parseInt(expiresIn) * 60 * 60;
  } else if (expiresIn.endsWith('m')) {
    exp += parseInt(expiresIn) * 60;
  } else if (expiresIn.endsWith('s')) {
    exp += parseInt(expiresIn);
  }

  const extendedPayload = {
    ...payload,
    iat,
    exp,
  };

  const encodedHeader = base64urlEncode(JSON.stringify(header));
  const encodedPayload = base64urlEncode(JSON.stringify(extendedPayload));
  const signature = hmacSHA256(`${encodedHeader}.${encodedPayload}`, secret);

  return `${encodedHeader}.${encodedPayload}.${signature}`;
}

// JWT 검증 함수
function verifyToken(token, secret) {
  const [encodedHeader, encodedPayload, signature] = token.split('.');

  const data = `${encodedHeader}.${encodedPayload}`;
  const validSignature = hmacSHA256(data, secret);

  if (signature !== validSignature) {
    return null;
  }

  const payload = JSON.parse(base64urlDecode(encodedPayload));
  const currentTime = Math.floor(Date.now() / 1000);

  if (currentTime > payload.exp) {
    return null;
  }

  return payload;
}

// 예제 데이터
const secretKey = 'your-256-bit-secret';
const payload = {
  userId: 123,
  username: 'exampleUser',
};

// 토큰 생성
const token = generateToken(payload, secretKey);
console.log('Generated Token:', token);

// 토큰 검증
const decoded = verifyToken(token, secretKey);
if (decoded) {
  console.log('Decoded Payload:', decoded);
} else {
  console.log('Invalid or expired token');
}
```

### 비대칭키 방식의 JWT 생성 및 검증

```ts
const crypto = require('crypto');

// Base64 URL 인코딩 함수
function base64urlEncode(str) {
  return Buffer.from(str).toString('base64').replace(/=/g, '').replace(/\+/g, '-').replace(/\//g, '_');
}

// Base64 URL 디코딩 함수
function base64urlDecode(str) {
  str = str.replace(/-/g, '+').replace(/_/g, '/');
  return Buffer.from(str, 'base64').toString('utf8');
}

// RSA-SHA256 서명 생성 함수
function sign(data, privateKey) {
  const sign = crypto.createSign('RSA-SHA256');
  sign.update(data);
  sign.end();
  return sign.sign(privateKey, 'base64').replace(/=/g, '').replace(/\+/g, '-').replace(/\//g, '_');
}

// RSA-SHA256 서명 검증 함수
function verify(data, signature, publicKey) {
  const verify = crypto.createVerify('RSA-SHA256');
  verify.update(data);
  verify.end();
  return verify.verify(publicKey, signature.replace(/-/g, '+').replace(/_/g, '/'), 'base64');
}

// JWT 생성 함수
function generateToken(payload, privateKey, expiresIn = '1h') {
  const header = {
    alg: 'RS256',
    typ: 'JWT',
  };

  const iat = Math.floor(Date.now() / 1000);
  let exp = iat;

  // 만료 시간 계산
  if (expiresIn.endsWith('h')) {
    exp += parseInt(expiresIn) * 60 * 60;
  } else if (expiresIn.endsWith('m')) {
    exp += parseInt(expiresIn) * 60;
  } else if (expiresIn.endsWith('s')) {
    exp += parseInt(expiresIn);
  }

  const extendedPayload = {
    ...payload,
    iat,
    exp,
  };

  const encodedHeader = base64urlEncode(JSON.stringify(header));
  const encodedPayload = base64urlEncode(JSON.stringify(extendedPayload));
  const signature = sign(`${encodedHeader}.${encodedPayload}`, privateKey);

  return `${encodedHeader}.${encodedPayload}.${signature}`;
}

// JWT 검증 함수
function verifyToken(token, publicKey) {
  const [encodedHeader, encodedPayload, signature] = token.split('.');

  const data = `${encodedHeader}.${encodedPayload}`;

  if (!verify(data, signature, publicKey)) {
    return null;
  }

  const payload = JSON.parse(base64urlDecode(encodedPayload));
  const currentTime = Math.floor(Date.now() / 1000);

  if (currentTime > payload.exp) {
    return null;
  }

  return payload;
}

// RSA 키 생성
const { publicKey, privateKey } = crypto.generateKeyPairSync('rsa', {
  modulusLength: 2048,
});

// 예제 데이터
const payload = {
  userId: 123,
  username: 'exampleUser',
};

// 토큰 생성
const token = generateToken(payload, privateKey);
console.log('Generated Token:', token);

// 토큰 검증
const decoded = verifyToken(token, publicKey);
if (decoded) {
  console.log('Decoded Payload:', decoded);
} else {
  console.log('Invalid or expired token');
}
```

### Access Token, Refresh Token

| 항목        | 액세스 토큰                                               | 리프레시 토큰                                        |
| ----------- | --------------------------------------------------------- | ---------------------------------------------------- |
| 목적        | 리소스 서버에 접근하여 보호된 리소스에 대한 권한을 증명   | 새로운 액세스 토큰을 발급받기 위한 권한을 증명       |
| 용도        | API 호출 시 인증을 위해 사용                              | 액세스 토큰이 만료되었을 때 갱신을 위해 사용         |
| 유효 기간   | 짧음 (몇 분에서 몇 시간)                                  | 길음 (몇 일에서 몇 주)                               |
| 보안 위험성 | 만료 시간이 짧아 상대적으로 적음                          | 만료 시간이 길어 유출 시 위험성 큼                   |
| 만료될 경우 | 새로운 액세스 토큰 발급 필요                              | 재로그인 필요                                        |
| 저장 위치   | 주로 클라이언트 측                                        | 주로 클라이언트 측                                   |
| 페이로드    | 사용자 ID, 권한, 만료 시간, 발급자 정보                   | 사용자 ID, 토큰 ID, 만료 시간                        |
| 발급 주체   | 인증 서버                                                 | 인증 서버                                            |
| 전송 방식   | HTTP 헤더에 포함 (`Authorization: Bearer <access_token>`) | HTTP 요청의 바디에 포함 (토큰 갱신을 위한 POST 요청) |

### JWT 인증 과정

- 일반적인 방식

![jwt_auth_1](images/jwt_auth_1.png)

- Refresh Token Rotation을 이용한 보안이 강화된 방식

![jwt_auth_2](images/jwt_auth_2.png)

## MFA

다중 인증(Multi-Factor Authentication, MFA)은 사용자가 로그인할 때 둘 이상의 인증 요소를 사용하여 보안을 강화하는 방법입니다. MFA는 보안의 추가 레이어를 제공하여, 단일 인증 요소(예: 비밀번호)만으로는 보호되지 않는 계정을 보다 안전하게 보호합니다. MFA는 일반적으로 다음 세 가지 범주 중 두 가지 이상을 결합하여 사용합니다:

1. 알고 있는 것(Knowledge): 사용자만이 알고 있는 정보, 예를 들어 비밀번호, PIN 번호, 보안 질문의 답변 등.
2. 가지고 있는 것(Possession): 사용자만이 소유한 물건, 예를 들어 스마트폰, 보안 토큰, 인증서 등이 있습니다.
3. 사용자인 것(Inherence): 사용자의 고유한 생체 정보, 예를 들어 지문, 얼굴 인식, 홍채 인식, 음성 인식 등이 있습니다.

### MFA의 동작 원리

MFA의 동작 원리는 다음과 같은 단계로 구성됩니다:

#### 1. 사용자 입력

사용자가 로그인 시도 시, 먼저 기본 인증 요소(예: 사용자 이름과 비밀번호)를 입력합니다. 이는 첫 번째 인증 단계입니다.

#### 2. 추가 인증 요청

첫 번째 인증 요소가 확인되면, 시스템은 두 번째 인증 요소를 요청합니다. 이 추가 인증 요소는 사용자가 미리 설정해둔 것에 따라 다를 수 있습니다.

#### 3. 추가 인증 요소 제공

사용자는 시스템이 요청하는 두 번째 인증 요소를 제공합니다. 예를 들어:

- One-Time Password (OTP): 사용자에게 일회용 비밀번호(OTP)를 전송하는 방법입니다. OTP는 보통 SMS, 이메일, 인증 애플리케이션(예: Google Authenticator) 등을 통해 전달됩니다.
- 보안 토큰: 사용자가 보안 토큰(하드웨어 토큰 또는 소프트웨어 토큰)을 통해 생성된 코드를 입력합니다.
- 생체 인증: 사용자 자신의 생체 정보를 제공합니다. 예를 들어 지문 스캔, 얼굴 인식 등을 통해 인증합니다.

#### 4. 인증 확인 및 접근 허용

시스템이 추가 인증 요소를 확인하여 유효성을 검증하면, 사용자는 접근 권한을 부여받습니다. 이로써 두 가지 이상의 인증 요소가 검증되어, 계정 접근이 승인됩니다.

### MFA의 예시

1. SMS 기반 OTP:
   - 사용자가 비밀번호를 입력하여 로그인 시도.
   - 시스템이 사용자에게 SMS로 일회용 비밀번호(OTP)를 전송.
   - 사용자가 OTP를 입력하여 추가 인증을 완료.
2. Authenticator App 기반 OTP:

   - 사용자가 비밀번호를 입력하여 로그인 시도.
   - 시스템이 사용자에게 Google Authenticator 또는 다른 인증 앱에서 생성된 OTP를 요청.
   - 사용자가 인증 앱에서 생성된 OTP를 입력하여 추가 인증을 완료.

3. 생체 인증:
   - 사용자가 비밀번호를 입력하여 로그인 시도.
   - 시스템이 사용자에게 지문 또는 얼굴 인식을 요청.
   - 사용자가 생체 정보를 제공하여 추가 인증을 완료.

### MFA의 장점

- 향상된 보안: 비밀번호가 유출되더라도 추가 인증 요소가 필요하므로, 계정을 보호할 수 있습니다.
- 사이버 공격 방지: 피싱, 키로깅, 브루트포스 공격 등 다양한 사이버 공격으로부터 보호할 수 있습니다.
- 규제 준수: 많은 산업에서 MFA 사용을 권장하거나 요구합니다. 예를 들어, 금융 서비스, 의료, 정부 기관 등.

### MFA의 단점

- 사용자 불편: 추가 인증 단계가 있어 사용자가 로그인하는 데 시간이 더 걸릴 수 있습니다.
- 구현 비용: 기업이 MFA를 구현하고 관리하는 데 추가 비용이 발생할 수 있습니다.
- 의존성 문제: 휴대전화나 인증 장치가 없을 경우 로그인에 어려움을 겪을 수 있습니다.

MFA는 보안 강화와 데이터 보호를 위해 점점 더 널리 사용되고 있으며, 개인 사용자뿐만 아니라 기업에서도 필수적인 보안 조치로 자리 잡고 있습니다.

## QR코드 원리
