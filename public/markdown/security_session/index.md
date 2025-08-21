---
folderName: security_session
updatedAt: 2025-02-06
title: Session 인증
tag: security
isPublished: true
---

# Session 인증

- [Session 특징](#session-특징)
- [`express-session`을 사용한 예제](#express-session을-사용한-예제)
- [Session 저장소](#session-저장소)
- [Session 인증 흐름](#session-인증-흐름)

## Session 특징

| 특징          | Session                           |
| ------------- | --------------------------------- |
| 상태 관리     | 서버에서 상태를 유지              |
| 저장 위치     | 서버 메모리 또는 데이터베이스     |
| 유효성 검증   | 서버에서 직접 관리                |
| 확장성        | 서버에 의존적, 수평적 확장 어려움 |
| 로그아웃 처리 | 서버에서 세션 삭제                |
| 환경          | Same Origin                       |

## `express-session`을 사용한 예제

```ts
app.use(cookieParser(process.env.COOKIE_SECRET);

app.use(session({
  secure: true, // https 환경에서만 session 정보를 주고받도록처리
  secret: process.env.COOKIE_SECRET, // 암호화하는 데 쓰일 키
  resave: false, // 세션을 언제나 저장할지 설정함
  saveUninitialized: true, // 세션에 저장할 내역이 없더라도 처음부터 세션을 생성할지 설정
  cookie: { //세션 쿠키 설정 (세션 관리 시 클라이언트에 보내는 쿠키)
    httpOnly: true, // 자바스크립트를 통해 세션 쿠키를 사용할 수 없도록 함
    Secure: true
  },
  name: 'session-cookie' // 세션 쿠키명 디폴트값은 connect.sid이지만 다른 이름을 줄수도 있다.
}));

app.get('/', (req, res, next) => {
 // 세션에 데이터를 설정하면, 모든 세션이 설정되는게아니라, 요청 받은 고유의 세션 사용자의 값만 설정 된다.
 // 즉, 개인의 저장 공간이 생긴 것과 같다.
 req.session.id = "hello";
}
```

## Session 저장소

| 저장 방식   | 설명                                       | 장점                                     | 단점                                               |
| ----------- | ------------------------------------------ | ---------------------------------------- | -------------------------------------------------- |
| 서버 메모리 | 서버의 메모리에 저장                       | 빠른 접근 속도                           | 서버 재시작 시 데이터 손실, 서버 확장 시 문제 발생 |
| 인메모리 DB | Redis 등의 인메모리 데이터베이스에 저장    | 빠른 접근 속도, 데이터 복제 및 분산 가능 | 휘발성 데이터베이스이므로 데이터 영속성 낮음       |
| 디스크 DB   | MySQL 등의 디스크 기반 데이터베이스에 저장 | 데이터 영속성 보장, 데이터 백업 가능     | 접근 속도 상대적으로 느림                          |
| 파일 시스템 | 파일 형태로 서버의 파일 시스템에 저장      | 구현이 간단, 데이터 영속성 보장          | 파일 읽기/쓰기 속도 느림, 파일 시스템에 의존적     |

## Session 인증 흐름

![img](images/session_auth.png)
