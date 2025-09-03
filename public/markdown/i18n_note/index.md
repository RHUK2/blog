---
folderName: i18n_note
updatedAt: 2025-03-13
title: I18n Note
tag: i18n
isPublished: true
---

# I18n Note

- [사용자 국가/지역 추측](#사용자-국가지역-추측)
- [시간 표준 형식](#시간-표준-형식)

## 사용자 국가/지역 추측

1. Geolocation API (가장 정확)

   ```ts
   navigator.geolocation.getCurrentPosition(
     (position) => {
       const { latitude, longitude } = position.coords;
       console.log(`위도: ${latitude}, 경도: ${longitude}`);
     },
     (error) => {
       console.error('위치 접근 거부 또는 실패:', error);
     },
   );
   ```

   - 사용자 허용 필요 (권한 요청)
   - GPS, WiFi, 셀룰러 네트워크 기반으로 정확한 위치 제공

2. 사용자 입력 기반 (가장 정확)
   - 사용자가 직접 선택/입력
   - 가장 신뢰할 수 있는 방법
   - 회원가입이 필요한 서비스에 적합

3. 서버 측 IP 기반 (가장 일반적)
   - 클라이언트 IP로 서버에서 국가/지역 판별
   - 사용자 권한 불필요
   - VPN 사용 시 부정확할 수 있음

4. 시간대 기반 추정

   ```ts
   const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
   console.log(timeZone); // "Asia/Seoul", "America/New_York" 등
   ```

   - 시간대로 대략적인 지역 추정 가능
   - 권한 불필요, 하지만 부정확

5. 언어/로케일 기반 추정

   ```ts
   const locale = navigator.language;

   console.log(locale); // "ko-KR", "en-US" 등
   ```

   - 언어 설정으로 국가 추정
   - 사용자가 언어를 변경했을 수 있어 부정확

- 파악한 국가/지역으로 DB에 저장된 UTC 형식의 시간을 변환해서 사용한다.
- 파악한 국가/지역으로 사용자에게 적절한 화폐 단위 및 요금을 제공한다.
- 파악한 국가/지역으로 사용자에게 적절한 언어를 제공한다.

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
