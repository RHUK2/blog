---
folderName: i18n_note
updatedAt: 2025-03-13
title: I18n Note
tag: i18n
isPublished: true
---

# I18n Note

- [시간 표준 형식](#시간-표준-형식)
- [브라우저 시간 처리](#브라우저-시간-처리)
- [언어 설정](#언어-설정)
- [요금 체계](#요금-체계)
  - [서버 측에서 IP 기반 국가 판별](#서버-측에서-ip-기반-국가-판별)
  - [서버 측에서 요금 데이터 직접 제공](#서버-측에서-요금-데이터-직접-제공)
- [로케일 동기화](#로케일-동기화)
- [HTTP 요청 언어 설정](#http-요청-언어-설정)

## 시간 표준 형식

국제 표준(ISO 8601)에 따르면 24시간 형식으로 시간을 표기한다.

- 시: `hh` (00-23)
- 분: `mm` (00-59)
- 초: `ss` (00-59)

시간 표기 방법은 다음과 같다:

```text
hhmmss 또는 hh:mm:ss
```

날짜와 시간을 함께 표기할 때는 사이에 `T`를 넣고, 맨 뒤에는 표준 시간대를 붙인다.

- 표준 시간대: `+hh`, `+hhmm`, `+hh:mm` 형식
- UTC일 경우: `Z`를 붙인다

```text
2001-01-01T00:00:00+09:00  // 한국 표준시
2001-01-01T00:00:00Z       // UTC
```

## 브라우저 시간 처리

브라우저에서 시간은 사용자의 시스템 시간(위치)을 따른다.

일반적인 시간 처리 흐름:

1. **데이터베이스 저장**: UTC 형식으로 저장
2. **클라이언트 표시**: UTC를 시스템 시간에 맞춰서 현지 시간으로 변환하여 제공

```js
// UTC 시간을 현지 시간으로 변환
const utcTime = '2023-01-01T12:00:00Z';
const localTime = new Date(utcTime).toLocaleString();
```

## 언어 설정

사용자의 언어 설정은 브라우저의 언어 설정을 따른다.

```js
// 브라우저 언어 감지
const userLanguage = navigator.language || navigator.languages[0];
console.log(userLanguage); // 'ko-KR', 'en-US' 등
```

## 요금 체계

사용자의 거주 국가에 따른 요금 체계는 두 가지 방법으로 구현할 수 있다.

### 서버 측에서 IP 기반 국가 판별

1. 서버에서 사용자의 IP 주소로 거주 국가를 판별한다
2. 판별된 국가 정보를 응답값으로 클라이언트에 전달한다
3. 클라이언트에서 해당 국가에 맞는 요금을 표시한다

### 서버 측에서 요금 데이터 직접 제공

1. 서버에서 사용자의 IP 주소로 거주 국가를 판별한다
2. 해당 국가에 맞는 요금 데이터를 서버에서 직접 계산하여 전달한다

## 로케일 동기화

날짜 라이브러리를 사용할 때는 애플리케이션의 로케일 설정과 동기화해야 한다.

```js
// dayjs 예시
import dayjs from 'dayjs';
import 'dayjs/locale/ko';

dayjs.locale('ko');
const formattedDate = dayjs().format('YYYY년 MM월 DD일');
```

## HTTP 요청 언어 설정

API 요청 시 `Accept-Language` 헤더를 사용하여 언어 설정을 동기화한다.

```js
// fetch 요청 시 Accept-Language 헤더 설정
fetch('/api/data', {
  headers: {
    'Accept-Language': navigator.language || 'en-US',
  },
});
```

서버에서는 해당 헤더를 읽어 적절한 언어로 응답을 제공할 수 있다.
