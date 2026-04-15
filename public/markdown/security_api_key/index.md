---
folderName: security_api_key
title: API 키 인증
tag: security
isPublished: true
---

# API 키 인증

- [API 키 인증(API Key Authentication) 개요](#api-키-인증api-key-authentication-개요)
- [API 키 인증이 필요한 이유](#api-키-인증이-필요한-이유)
- [API 키 생성 과정](#api-키-생성-과정)
- [보안 설계 시 고려사항](#보안-설계-시-고려사항)

## API 키 인증(API Key Authentication) 개요

- API 키는 클라이언트 애플리케이션을 식별하고 인증하기 위해 사용되는 고유한 문자열임.
- 주로 서버 간 통신(Server-to-Server)이나 모바일 앱, 데스크톱 애플리케이션에서 API 접근 권한을 확인하는 용도로 활용됨.
- 쿠키(Cookie) 기반 인증과 달리 브라우저에 의해 자동으로 전송되지 않으므로 CSRF(Cross-Site Request Forgery) 공격으로부터 상대적으로 안전함.

## API 키 인증이 필요한 이유

- 사용자 및 애플리케이션 식별:
  - API 키는 호출자를 고유하게 식별하는 신분증 역할을 수행함.
  - 인증된 사용자나 서비스만 API에 접근할 수 있도록 제한하여 무단 사용을 방지함.

- 접근 제어(Access Control) 및 권한 관리:
  - API 키를 통해 사용자가 접근 가능한 자원의 범위와 권한을 정의함.
  - 세부적인 권한 할당을 통해 데이터 무결성과 보안을 유지함.

- 사용량 제한(Rate Limiting) 및 추적:
  - 식별된 키별로 요청 횟수를 추적하고 할당량을 제어함.
  - 특정 사용자의 과도한 요청으로 인한 서버 부하를 방지하고 서비스 가용성을 보장함.

- 비용 관리 및 과금(Billing):
  - 상업용 API 서비스에서 사용자별 실제 사용량을 기록하고 과금하는 근거로 활용함.

- 악용 방지 및 책임 추적:
  - 모든 요청에 식별자가 포함되므로 문제 발생 시 로그 분석을 통해 요청의 출처를 명확히 파악할 수 있음.

## API 키 생성 과정

- 보안을 위해 충분한 엔트로피를 가진 난수를 사용하여 생성해야 함.
- 일반적으로 `crypto` 모듈을 사용하여 예측 불가능한 문자열을 생성함.

```ts
import crypto from 'crypto';

// 256비트 난수를 생성하여 16진수 문자열로 변환
function generateApiKey(): string {
  return crypto.randomBytes(32).toString('hex');
}

const apiKey = generateApiKey();
// 예: 7ce3055d994b6d9cb4754cb8258a4094
```

- 용도 구분을 위해 접두사(Prefix)를 추가하는 방식을 권장함.

```ts
import crypto from 'crypto';

// 용도별 접두사가 포함된 API 키 생성
function generateFormattedApiKey(prefix: string = 'my_app_'): string {
  const randomPart = crypto.randomBytes(32).toString('hex');
  return `${prefix}${randomPart}`;
}

const secretKey = generateFormattedApiKey('my_app_');
// 예: my_app_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
```

## 보안 설계 시 고려사항

- 전송 계층 보안:
  - 반드시 HTTPS를 통해서만 전송해야 함. 평문 통신 시 중간자 공격(MITM)에 의해 키가 탈취될 위험이 있음.

- 클라이언트 측 노출 주의:
  - 프론트엔드 코드나 모바일 앱 바이너리에 키를 하드코딩하지 않아야 함.
  - 브라우저 환경에서 부득이하게 사용할 경우, 도메인 제한(Referer Restriction)이나 IP 화이트리스트를 설정하여 오남용을 방지함.

- 최소 권한 원칙(Principle of Least Privilege):
  - 읽기 전용(`read_only`)과 쓰기 가능(`write_access`) 키를 분리하여 제공함.
  - 특정 API 엔드포인트에만 접근 가능한 범위를 지정함.

- 키 순환(Key Rotation) 및 만료:
  - 주기적으로 키를 갱신하도록 유도하고, 유출 의심 시 즉시 무효화할 수 있는 관리 기능을 제공해야 함.
  - 키 생성 시 생성 일시를 함께 저장하여 만료 정책을 적용함.

- 저장 방식:
  - 서버 DB에는 API 키를 평문으로 저장하지 않고, 해시(Hash) 처리하여 저장하는 것이 안전함. 인증 시에는 클라이언트가 보낸 키를 동일한 알고리즘으로 해싱하여 비교함.
