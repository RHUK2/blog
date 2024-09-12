---
fileName: build
updatedAt: 2024-09-12
title: 프레임워크 빌드 프로세스
tag: react, nextjs, build
isPublished: true
---

# 프레임워크 빌드 프로세스

- [react-scripts 빌드](#react-scripts-빌드)

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
