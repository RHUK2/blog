---
folderName: browser_note
title: Browser Note
tag: browser
isPublished: true
---

# Browser Note

- [웹 브라우저란?](#웹-브라우저란)
  - [렌더링 과정](#렌더링-과정)
- [VSync (Vertical Synchronization) 신호](#vsync-vertical-synchronization-신호)
  - [핵심 개념](#핵심-개념)
  - [렌더링 핵심](#렌더링-핵심)

## 웹 브라우저란?

브라우저는 사용자가 선택한 자원(HTML, 이미지 등)을 서버에 요청하고 브라우저에 표시하는 소프트웨어다. HTTP 프로토콜을 통해 서버와 통신하며, HTML, CSS, JavaScript는 렌더링 엔진과 JavaScript 엔진에 의해 파싱되어 렌더 트리를 생성하고 화면에 표현된다.

### 렌더링 과정

![img](images/browser_rendering.png)

1. DOM 트리 생성: HTML을 파싱하여 DOM 트리를 만든다.
2. CSSOM 트리 생성: CSS를 파싱하여 CSSOM 트리를 만든다.
3. 렌더 트리 생성: DOM과 CSSOM을 결합하여 렌더 트리를 만든다. (display: none 요소 제외)
4. 레이아웃 (Reflow): 뷰포트 내에서 각 노드의 정확한 위치와 크기를 계산한다.
5. 페인트 (Repaint): 계산된 위치에 픽셀을 채워 넣는다.
6. 컴포지트 (Composite): 레이어들을 합성하여 최종 화면을 그린다.

## VSync (Vertical Synchronization) 신호

- 정의: 디스플레이가 새로운 프레임을 그릴 준비가 되었음을 알리는 하드웨어 신호
- 주기: 60Hz 화면에서 약 16.6ms마다 발생 (144Hz는 약 6.94ms)
- 목적: 티어링(화면 찢김) 방지를 위해 GPU의 프레임 생성 속도와 디스플레이의 주사율(Refresh Rate)을 동기화

### 핵심 개념

- VSync는 "디스플레이가 다음 프레임을 받을 준비가 되었음"을 알리는 신호다.
- 브라우저 렌더링 엔진은 VSync 주기에 맞춰 프레임을 생성하려 노력한다.
- `requestAnimationFrame`은 VSync 신호에 맞춰 콜백을 실행하도록 예약한다.
- 메인 스레드가 VSync 주기(16.6ms) 내에 작업을 완료하지 못하면 프레임 드롭(Jank)이 발생하여 화면이 버벅거린다.

### 렌더링 핵심

- 렌더링 파이프라인: JavaScript 실행 -> 스타일 계산 -> 레이아웃 -> 페인트 -> 컴포지트
- 최적화 전략:
  - 레이아웃/페인트 최소화: `transform`, `opacity` 속성 사용 권장 (컴포지터 스레드에서 처리됨)
  - 메인 스레드 차단 방지: 긴 작업은 Web Worker로 분리하거나 작업을 잘게 쪼개어(Time Slicing) 실행
  - requestAnimationFrame 활용: 애니메이션 관련 로직은 `setTimeout` 대신 `rAF` 사용
- 이벤트 루프와 렌더링: 렌더링 업데이트는 마이크로태스크 큐가 비워진 후, 다음 매크로태스크 실행 전에 발생할 수 있다.
