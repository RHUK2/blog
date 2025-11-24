---
folderName: security_api_key
title: API 키 인증
tag: security
isPublished: true
---

# API 키 인증

- [API 키 인증이 필요한 이유](#api-키-인증이-필요한-이유)
- [API 키 생성 과정](#api-키-생성-과정)
- [설계 시 고려사항](#설계-시-고려사항)

## API 키 인증이 필요한 이유

- 사용자 인증
  - API 키는 사용자를 고유하게 식별하는 신분증 역할을 한다.
  - 인증된 사용자만 API에 접근할 수 있어 무단 사용을 방지한다.

- 접근 제어 및 권한 관리
  - API 키는 사용자가 어떤 수준의 접근 권한을 가졌는지 정의하는 데 사용된다.
  - 키를 통해 세부적인 권한 관리가 가능해 보안과 데이터 무결성을 유지한다.

- 사용량 추적 및 제한
  - API 키는 사용자를 식별해 각 사용자의 요청 횟수를 추적한다.
  - 과도한 요청으로 인한 서버 과부하를 방지하고, 공정한 사용을 보장한다.

- 보안 강화
  - API 키가 없으면 누구나 API 엔드포인트를 호출할 수 있어 악의적인 공격(예: DDoS)이나 데이터 유출 위험이 커진다.
  - API 키는 최소한의 보안 장치로 작동한다.
  - API 키가 유출되더라도, 키를 재발급하거나 접근을 차단해 피해를 줄일 수 있다.
  - 인증되지 않은 접근을 차단하고, 보안 위협을 줄인다.

- 비용 관리 및 과금
  - 상업적인 API의 경우, 사용량에 따라 요금을 부과해야 하므로 API 키는 사용량을 사용자별로 기록하는 데 사용된다.

- API 사용 분석 및 개선
  - API 키를 통해 어떤 사용자가 어떤 방식으로 API를 사용하는지 데이터를 수집할 수 있다.
  - 데이터 기반으로 API 품질을 높이고 사용자 요구를 반영한다.

- 악용 방지 및 책임 추적
  - API 키가 없으면 요청의 출처를 알 수 없어, 누가 악의적으로 사용했는지 추적하기 어렵다. 키는 요청의 책임을 명확히 한다.
  - 시스템 남용을 억제하고 문제를 빠르게 해결한다.

## API 키 생성 과정

```ts
const crypto = require('crypto');

// API 키 생성 함수
function generateApiKey() {
  return crypto.randomBytes(32).toString('hex').slice(0, 32);
}

const apiKey = generateApiKey();
console.log('Generated API Key:', apiKey); // 7ce3055d994b6d9cb4754cb8258a4094
```

```ts
const crypto = require('crypto');

// 접두사가 추가된 API 키 생성 함수
function generateFormattedApiKey() {
  const prefix = 'sk_';
  const randomPart = crypto.randomBytes(32).toString('hex').slice(0, 32);
  return `${prefix}${randomPart}`;
}

const formattedApiKey = generateFormattedApiKey();
console.log('Formatted API Key:', formattedApiKey); // sk_36dbdd2b55a5b8181f8329267c1e1201
```

## 설계 시 고려사항

- API 키는 노출되면 악용될 수 있으므로, HTTPS만 사용하도록 강제하고, 클라이언트 측에서 하드코딩하지 않도록 주의.
- API 키가 서버 측에서 민감한 작업(예: 결제, 사용자 데이터 수정 등)을 수행하지 않고, 읽기 전용이거나 제한된 권한만 가지는 경우에는 클라이언트 측에서 하드코딩 가능.
- 사용자가 키를 잃어버리거나 유출될 경우 재발급할 수 있도록 설계.
- 키에 유효 기간을 설정하거나, 주기적으로 갱신하도록 요구.
- 읽기 전용 키(`read_xxx`)와 쓰기 전용 키(`write_xxx`)를 구분해 제공할 수도 있음.
