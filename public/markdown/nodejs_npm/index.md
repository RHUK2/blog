---
folderName: nodejs_npm
title: NPM
tag: nodejs
isPublished: true
---

# NPM과 패키지 관리(NPM & Package Management)

- [NPM 레지스트리와 패키지 구조](#npm-레지스트리와-패키지-구조)
- [package.json 주요 필드](#packagejson-주요-필드)
- [시멘틱 버저닝(Semantic Versioning)](#시멘틱-버저닝semantic-versioning)
- [의존성 관리와 호이스팅(Hoisting)](#의존성-관리와-호이스팅hoisting)
- [npx의 동작 방식](#npx의-동작-방식)
- [npm install vs npm ci](#npm-install-vs-npm-ci)

## NPM 레지스트리와 패키지 구조

- NPM 레지스트리(Registry)는 패키지의 메타데이터(이름, 버전, 의존성 등)를 관리하는 거대한 데이터베이스다.
- 사용자가 패키지를 검색하면 레지스트리의 메타데이터를 참조하며, 설치 시 실제 소스 코드를 다운로드함.
- `node_modules` 폴더 내의 라이브러리는 별도의 경로 지정 없이 패키지명만으로 참조가 가능하다.

## package.json 주요 필드

| 속성               | 설명                                                                        |
| :----------------- | :-------------------------------------------------------------------------- |
| `name`             | 패키지 식별을 위한 고유 이름임.                                             |
| `version`          | 패키지의 현재 버전을 명시함.                                                |
| `dependencies`     | 실행 시 필요한 라이브러리 목록임.                                           |
| `devDependencies`  | 개발 환경(테스트, 빌드 등)에서만 필요한 라이브러리임.                       |
| `peerDependencies` | 해당 패키지가 정상 동작하기 위해 설치되어 있어야 할 라이브러리임.           |
| `scripts`          | `npm run <명령어>` 형태로 실행할 커맨드 라인을 정의함.                      |
| `main`             | 패키지의 진입점(Entry Point) 파일을 지정함.                                 |
| `workspaces`       | 모노레포(Monorepo) 구조에서 여러 패키지를 하나의 루트에서 관리할 때 사용함. |

## 시멘틱 버저닝(Semantic Versioning)

NPM은 `Major.Minor.Patch` 형식의 시멘틱 버저닝(SemVer) 규칙을 따른다.

- Major: 기존 버전과 호환되지 않는 중대한 변경(Breaking Changes)이 있을 때 증가함.
- Minor: 기존 버전과 호환되면서 새로운 기능(Features)이 추가될 때 증가함.
- Patch: 기존 버전과 호환되는 버그 수정(Bug Fixes)이 있을 때 증가함.
- 기호 의미:
  - `^` (Caret): Major 버전을 고정하고 Minor 및 Patch 업데이트를 허용함 (예: `^1.2.0` -> `1.x.x`).
  - `~` (Tilde): Patch 버전 범위 내에서 최신 버전으로 업데이트함 (예: `~1.2.0` -> `1.2.x`).

## 의존성 관리와 호이스팅(Hoisting)

- 초기 NPM은 각 패키지 내부에 독립적으로 `node_modules`를 두는 중첩 구조를 가졌으나, 용량 낭비와 설치 속도 저하 문제가 있었음.
- NPM v3부터 평평한 구조(Flat Tree)를 도입하여 공통 의존성을 루트로 끌어올리는 호이스팅(Hoisting)을 수행함.
- 중복된 패키지라도 버전이 다르면 충돌 방지를 위해 하위 `node_modules`에 별도로 설치된다.

## npx의 동작 방식

- `npx`는 패키지를 전역(Global)으로 설치하지 않고도 실행할 수 있게 해주는 도구다.
- 동작 원리:
  1. 로컬 `node_modules/.bin` 폴더에서 해당 명령어를 찾음.
  2. 없다면 환경 변수 `PATH`를 확인하여 전역 설치 여부를 점검함.
  3. 둘 다 없다면 최신 버전의 패키지를 임시로 내려받아 실행한 후 삭제한다.
- 매번 최신 버전을 실행하거나, 일회성 도구(예: `create-next-app`)를 사용할 때 매우 효율적임.

## npm install vs npm ci

- `npm install`:
  - `package.json`과 `package-lock.json`을 비교하며 최신 호환 버전을 설치할 수 있음.
  - `package-lock.json`이 없으면 새로 생성하거나 업데이트한다.
- `npm ci`:
  - `package-lock.json`의 내용을 엄격하게 준수하여 설치함.
  - 기존 `node_modules`를 삭제하고 새로 설치하므로 CI/CD 환경에서 일관된 빌드를 보장한다.
