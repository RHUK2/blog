---
folderName: i18n_note
title: I18n Note
tag: i18n
isPublished: true
---

# I18n Note

- [사용자 국가 추측 우선순위](#사용자-국가-추측-우선순위)
- [사용자 언어 추측 우선순위](#사용자-언어-추측-우선순위)
- [ISO 8601](#iso-8601)

## 사용자 국가 추측 우선순위

1. 사용자 입력 기반: 사용자가 직접 선택한 국가 설정 (가장 확실)
2. Geolocation API: 사용자의 현재 물리적 위치 (권한 필요)
3. 서버 측 IP 기반: 접속 IP를 통한 국가 판별 (일반적)
4. 시간대 기반: 시스템 시간대 설정 (`Intl.DateTimeFormat().resolvedOptions().timeZone`)
5. 언어/로케일 기반: 브라우저 언어 설정 (`navigator.language`)

## 사용자 언어 추측 우선순위

1. 사용자 입력 기반: 사용자가 직접 선택한 언어 설정 (가장 확실)
2. URL 경로/파라미터: `example.com/ko/` 또는 `?lang=ko`
3. 브라우저 언어 설정: `navigator.languages` (선호 언어 목록) 또는 `navigator.language`
4. IP 기반 추정: 접속 국가의 주 사용 언어 (부정확할 수 있음)
5. 기본값: 서비스의 기본 언어 (예: 영어)

## ISO 8601

날짜와 시간의 표기에 관한 국제 표준 규격이다.

- 형식: `YYYY-MM-DDTHH:mm:ss.sssZ`
  - `T`: 날짜와 시간을 구분하는 구분자
  - `Z`: UTC(협정 세계시)를 의미 (Zero offset)
- 예시: `2023-10-05T14:30:00Z` (UTC 기준 2023년 10월 5일 14시 30분)
- 장점:
  - 전 세계적으로 통용되는 명확한 형식
  - 문자열 정렬 시 시간 순서대로 정렬됨
  - 데이터베이스 및 API 통신에서 표준으로 널리 사용됨
