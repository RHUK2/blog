---
updatedAt: 2024-02-23
directory: Cheatsheet
fileName: VSCode_Cheat_Sheet
title: VSCode Cheat Sheet
description: 자주 사용하는 VSCode 단축키 정리
---

# VScode Cheat Sheet

- [VScode Cheat Sheet](#vscode-cheat-sheet)
  - [IntelliSense](#intellisense)
  - [단축키](#단축키)

## IntelliSense

- VSCode는 `jsconfig.json`이 있는 디렉토리를 자바스크립트 프로젝트로 간주하고 IntelliSense를 지원한다.
- VSCode는 `tsconfig.json`이 있는 디렉토리를 타입스크립트 프로젝트로 간주하고 IntelliSense를 지원한다.
- VSCode는 npm 모듈들의 IntelliSense를 지원하기 위해 자동 유형 획득(ATA)이라는 기능을 사용한다. ATA는 `package.json`에서 참조하는 npm 모듈에 대한 npm 유형 선언 파일(`*.d.ts`)을 가져온다. 이 방식으로 VSCode는 `node`, `axios`, `react` 등과 같은 여러 라이브러리들의 자동완성을 제공해준다.

## 단축키

| 단축키                      | 설명                                            |
| --------------------------- | ----------------------------------------------- |
| -                           | **접기/펼치기 관련**                            |
| Ctrl + K + Ctrl + 0         | 전체 모두 접기                                  |
| Ctrl + K + J                | 전체 모두 펼치기                                |
| Ctrl + K + [                | 커서 위치의 블록에서 자식까지 모두 접기         |
| Ctrl + K + ]                | 커서 위치의 블록에서 자식까지 모두 펼치기       |
| Ctrl + Shift + [            | 커서 위치의 블록만 접기                         |
| Ctrl + Shift + ]            | 커서 위치의 블록만 펼치기                       |
| Ctrl + K + -                | 커서 위치의 블록과 자식 제외하고 모두 접기      |
| Ctrl + K + =                | 커서 위치의 블록과 자식 제외하고 모두 펼치기    |
| -                           | **창 제어 관련**                                |
| Ctrl + J                    | 터미널 패널 토글                                |
| Ctrl + Shift + 5            | 터미널 확장하기                                 |
| Ctrl + \                    | 창 분할하기                                     |
| Ctrl + PgUp                 | 그룹 상관 없이 좌측으로 창 변경                 |
| Ctrl + PgDn                 | 그룹 상관 없이 우측으로 창 변경                 |
| Ctrl + Tab                  | 그룹 내에서 창 변경                             |
| Ctrl + Alt + ←              | 좌측 그룹으로 창 이동                           |
| Ctrl + Alt + →              | 우측 그룹으로 창 이동                           |
| Ctrl + K + ← or → or ↑ or ↓ | 화살표 방향으로 그룹 이동                       |
| Ctrl + W                    | 현재 창 닫기                                    |
| Ctrl + K + W                | 모든 창 닫기                                    |
| Ctrl + Click                | go                                              |
| -                           | **유틸 관련**                                   |
| Ctrl + K + M or F1          | 원하는 언어 파일 생성하기                       |
| Ctrl + P or E               | 파일명으로 파일 찾고 이동                       |
| Ctrl + O                    | 파일 경로로 파일 찾고 이동                      |
| Ctrl + R                    | 최근 연 파일 및 폴더                            |
| Ctrl + Shift + P(>)         | 모든 명령어 보기 및 사용                        |
| Ctrl + Shift + O(@)         | 현재 파일 안에서 심볼 찾기                      |
| Ctrl + T(#)                 | 현재 워크스페이스 상에서 심볼 찾기              |
| Ctrl + G(:)                 | 입력한 라인으로 이동                            |
| Ctrl + Home                 | 파일 내에서 커서 위치 맨 처음 라인으로 이동     |
| Ctrl + End                  | 파일 내에서 커서 위치 맨 마지막 라인으로 이동   |
| Ctrl + Alt + ↑ or ↓         | 커서 추가하기                                   |
| Alt + Click                 | 클릭 위치에 커서 추가하기                       |
| Shift + Alt + Click         | 커서 위치와 동일한 위치에서 드래그              |
| Alt + Shift + ↑ or ↓        | 커서가 위치한 라인 또는 드래그된 구역 복사      |
| Alt + ↑ or ↓                | 커서가 위치한 라인 또는 드래그된 구역 라인 이동 |
| Ctrl + Shift + K            | 커서가 위치한 라인 또는 드래그된 구역 삭제      |
| Ctrl + X                    | 커서가 위치한 라인 또는 드래그된 구역 잘라내기  |
| Ctrl + L                    | 라인 선택하기                                   |
| F12                         | 정의로 이동                                     |
| Shift + F12                 | 참조로 이동                                     |
| Ctrl + Shift + \            | 대응하는 브라켓으로 이동                        |
| Ctrl + Alt + Backspace      | 브라켓 제거                                     |
| Ctrl + D                    | 일치하는 것 찾기                                |
| Ctrl + Shift + L            | 일치하는 것 모두 찾기                           |
| F2                          | 심볼명 수정하기                                 |
| Alt + Shift + A             | 블록 레벨 주석 토글                             |
| Ctrl + /                    | 라인 레벨 주석 토글                             |
| Ctrl + .                    | 빠른 수정 팁 보여주기                           |
| Ctrl + Space                | 추천 항목 보여주기                              |
| Ctrl + Shift + Space        | 파라미터 힌트 보여주기                          |
| Ctrl + Alt                  | 타입 힌트 보여주기                              |
| -                           | **확장프로그램 단축키 관련**                    |
| Ctrl + Alt + N              | Code Runner 실행                                |
| Ctrl + Alt + L              | 자동 console.log 생성                           |
| Alt + A                     | 브라켓 영역 드래그                              |
| Ctrl + '                    | 따옴표 토글                                     |
