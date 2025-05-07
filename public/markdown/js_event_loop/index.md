---
folderName: js_event_loop
updatedAt: 2025-03-18
title: 이벤트 루프(Event Loop)
tag: javascript
isPublished: true
---

# 이벤트 루프(Event Loop)

- [이벤트 루프란(브라우저 환경 기준)?](#이벤트-루프란브라우저-환경-기준)
- [마이크로태스크 큐(Microtask Queue)](#마이크로태스크-큐microtask-queue)
- [매크로태스크 큐(Macrotask Queue)](#매크로태스크-큐macrotask-queue)
- [이벤트 루프의 작업 처리 사이클](#이벤트-루프의-작업-처리-사이클)

## 이벤트 루프란(브라우저 환경 기준)?

- 이벤트 루프는 단일 스레드로 동작하는 브라우저가 비동기 프로그래밍 환경에서 작업을 관리하고 실행 순서를 조정하는 메커니즘.
- 이벤트 루프는 콜 스택, 매크로태스크 큐, 마이크로태스크 큐와 상호작용한다.

## 마이크로태스크 큐(Microtask Queue)

1. `Promise` 콜백(`then` • `catch` • `finally`)
2. `MutationObserver` 콜백
3. `queueMicrotask` 콜백

## 매크로태스크 큐(Macrotask Queue)

1. `setTimeout` • `setInterval` 콜백
2. DOM 이벤트 핸들러
3. `fetch` 요청
4. `<script>` 태그

## 이벤트 루프의 작업 처리 사이클

![img](images/event_loop.png)

1. 동기 코드 실행
2. 마이크로태스크 큐의 모든 작업 처리
3. 매크로태스크 큐에서 하나의 작업 처리
