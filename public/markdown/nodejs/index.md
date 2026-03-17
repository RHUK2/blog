---
folderName: nodejs
title: Node.js
tag: nodejs
isPublished: true
---

# Node.js

- [이벤트 루프(Event Loop)의 구조](#이벤트-루프event-loop의-구조)
  - [주요 단계(Phases)](#주요-단계phases)
- [버퍼(Buffer)와 스트림(Stream)](#버퍼buffer와-스트림stream)
  - [버퍼(Buffer)](#버퍼buffer)
  - [스트림(Stream)](#스트림stream)
- [경로 관리 및 파일 시스템 API](#경로-관리-및-파일-시스템-api)
- [HTTP 응답 제어(Response Handling)](#http-응답-제어response-handling)
  - [res.end vs res.send](#resend-vs-ressend)
  - [res.writeHead vs res.setHeader](#reswritehead-vs-ressetheader)
- [Web API와 Node.js 환경](#web-api와-nodejs-환경)
- [Express 미들웨어(Middleware)](#express-미들웨어middleware)

## 이벤트 루프(Event Loop)의 구조

Node.js는 단일 스레드 기반의 비동기(Asynchronous) 이벤트 주도 아키텍처를 가진다. 이벤트 루프는 여러 단계(Phases)를 거치며 콜백 함수를 실행함.

### 주요 단계(Phases)

1. Timers: `setTimeout`, `setInterval`에 의해 예약된 콜백을 실행함.
2. Pending Callbacks: 다음 루프 반복으로 연기된 I/O 콜백을 실행함.
3. Idle, Prepare: 내부적으로만 사용되는 단계임.
4. Poll: 새로운 I/O 이벤트를 검색하고 관련 콜백을 실행함. 가장 오랫동안 머무는 단계다.
5. Check: `setImmediate` 콜백을 즉시 실행함.
6. Close Callbacks: `socket.on('close', ...)`와 같은 종료 이벤트 콜백을 실행함.

## 버퍼(Buffer)와 스트림(Stream)

데이터를 효율적으로 처리하기 위해 Node.js는 두 가지 주요 방식을 제공한다.

### 버퍼(Buffer)

- 고정된 크기의 메모리 덩어리에 바이너리 데이터를 직접 저장하는 방식임.
- 전체 데이터를 메모리에 모두 올린 후 처리를 시작하므로, 대용량 파일 처리 시 메모리 부족 위험이 있음.

### 스트림(Stream)

- 데이터를 작은 조각(Chunks)으로 나누어 연속적으로 처리하는 방식임.
- 메모리 사용량을 최소화하며 데이터 로딩 중에도 처리가 가능함.
- 종류: Readable(읽기 전용), Writable(쓰기 전용), Duplex(양방향), Transform(변환 가능).

## 경로 관리 및 파일 시스템 API

- `__dirname`: 현재 실행 중인 모듈 파일이 위치한 폴더의 절대 경로임.
- `__filename`: 현재 실행 중인 모듈 파일의 전체 경로임.
- `process.cwd()`: Node.js 프로세스가 시작된 작업 디렉토리 경로임.
- ESM 환경에서는 `import.meta.url`을 활용하여 위 경로들을 수동으로 구성해야 한다.

```ts
// CJS (CommonJS)
console.log(__dirname); // /home/user/project/src
console.log(__filename); // /home/user/project/src/app.js
console.log(process.cwd()); // /home/user/project (실행 위치 기준)

// ESM (ES Modules) - __dirname, __filename 미지원
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// path.join으로 OS에 무관한 경로 생성
const filePath = join(__dirname, 'data', 'config.json');
```

`fs` 모듈을 사용하여 파일을 읽고 쓸 수 있다. 비동기 처리가 필요한 경우 `fs/promises`를 사용함.

```ts
import { readFile, writeFile } from 'fs/promises';
import { join } from 'path';

const filePath = join(__dirname, 'data.json');

// 파일 읽기
const raw = await readFile(filePath, 'utf-8');
const data = JSON.parse(raw);

// 파일 쓰기
await writeFile(filePath, JSON.stringify(data, null, 2), 'utf-8');
```

## HTTP 응답 제어(Response Handling)

### res.end vs res.send

- `res.end()`: 표준 Node.js 메서드로, 추가 데이터 없이 응답을 종료할 때 사용함.
- `res.send()`: Express.js 확장 메서드로, 데이터 타입에 따라 `Content-Type`을 자동 설정하고 응답을 종료한다.

### res.writeHead vs res.setHeader

- `res.writeHead()`: 상태 코드와 헤더를 한 번에 작성하며 즉시 네트워크로 전송함.
- `res.setHeader()`: 개별 헤더를 설정하며, 실제 응답 전송 전까지 수정이 가능하다.

## Web API와 Node.js 환경

Node.js는 브라우저 외부 환경이지만 개발 편의를 위해 다양한 Web API를 표준으로 채택하고 있다.

- 지원 API: `Fetch API`, `URL`, `TextEncoder`, `Performance`, `Timer(setTimeout 등)`.
- 차이점:
  - 브라우저는 `window` 객체를 전역으로 사용하지만 Node.js는 `global` 객체를 사용함.
  - DOM 조작 API는 Node.js에서 기본적으로 지원되지 않는다.

## Express 미들웨어(Middleware)

![img](images/express_middleware.png)

미들웨어는 요청(req)과 응답(res) 사이에서 실행되는 함수다. `next()`를 호출하여 다음 미들웨어로 제어를 넘기며, 호출하지 않으면 요청 처리가 그 시점에서 멈춤.

```ts
(req, res, next) => {
  // 로직 처리
  next(); // 다음 미들웨어로 이동
};
```

- 종류:
  - 애플리케이션 미들웨어: `app.use()`로 등록하며 모든 요청에 적용됨.
  - 라우터 미들웨어: 특정 경로에만 적용됨. `app.use('/api', router)` 형태로 사용함.
  - 내장 미들웨어: Express가 기본 제공. `express.json()`, `express.static()` 등.
  - 서드파티 미들웨어: `cors`, `helmet`, `morgan` 등 외부 패키지.
  - 에러 처리 미들웨어: 인자가 4개(`err, req, res, next`)인 경우 에러 처리 미들웨어로 인식됨. 반드시 다른 미들웨어 등록 이후 마지막에 위치해야 함.

```ts
import express from 'express';

const app = express();

// 내장 미들웨어
app.use(express.json());

// 애플리케이션 미들웨어: 모든 요청에 실행
app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
});

// 라우터 미들웨어: /api 경로에만 실행
app.use('/api', (req, res, next) => {
  // 인증 처리 등
  next();
});

// 에러 처리 미들웨어: 반드시 마지막에 등록
app.use((err: Error, req, res, next) => {
  res.status(500).json({ message: err.message });
});
```
