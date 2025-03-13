---
folderName: react_build
updatedAt: 2024-09-12
title: React Build
tag: react
isPublished: true
---

# React Build

- [react-scripts 빌드](#react-scripts-빌드)
- [(create-react-app) manifest.json](#create-react-app-manifestjson)
- [(create-react-app) react에서 환경변수](#create-react-app-react에서-환경변수)

## react-scripts 빌드

`react-scripts build` 명령어를 실행하면, 다음과 같은 작업을 수행한다.

1. 프로덕션 모드 설정

   - `NODE_ENV`를 `production`으로 설정하여 최적화된 빌드를 생성한다.

2. 코드 번들링 및 최적화

   - Webpack을 사용하여 JavaScript 파일들을 번들링한다.
   - Babel을 사용하여 최신 JavaScript 코드가 구형 브라우저에서도 동작하도록 트랜스파일링한다.
   - 코드 압축(UglifyJS) 및 최적화(Dead Code Elimination) 작업이 수행된다.
   - CSS 파일이 별도로 추출되어 최적화된다.

3. 빌드 결과물 생성

   - `build/` 디렉토리에 최종 빌드 결과물이 생성된다.
   - 이 디렉토리에는 번들된 JavaScript 파일, 최적화된 CSS 파일, 그리고 `index.html` 파일이 포함된다.
   - 결과적으로, `build/` 디렉토리의 파일들을 웹 서버에 배포한다.

## (create-react-app) manifest.json

`manifest.json` 파일은 Progressive Web App(PWA)에서 사용되는 파일로, 해당 웹 앱의 메타데이터와 구성 요소를 정의하는 역할을 한다. PWA는 웹과 네이티브 앱의 장점을 결합한 형태이다.

![img](images/pwa_install.png)

CRA로 리액트 프로젝트 생성 시 `public` 폴더 아래에 해당 파일이 있는데 PWA를 지원하지 않으려면 삭제해도 된다. `index.html`의 관련 코드도 같이 삭제해야 한다.

## (create-react-app) react에서 환경변수

![img](images/react_env.png)

CRA에 의해 `.env` 파일에 규칙을 가지고 작성된 환경변수는 빌드 타임에 `process.env`로 객체화되서 클라이언트에서 접근이 가능한 형태가 된다.
