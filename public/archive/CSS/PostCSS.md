---
updatedAt: 2024-02-23
directory: CSS
fileName: PostCSS
title: PostCSS 기록하기
description:
---

# PostCSS 기록하기

- [주요 특징 및 기능](#주요-특징-및-기능)
  - [예제](#예제)
    - [1. 설치](#1-설치)
    - [2. 설정 파일 (postcss.config.js)](#2-설정-파일-postcssconfigjs)
    - [3. 사용 방법](#3-사용-방법)
  - [예제 CSS 파일](#예제-css-파일)
    - [input.css](#inputcss)
    - [output.css](#outputcss)
  - [결론](#결론)

PostCSS는 JavaScript 기반의 도구로, CSS를 후처리(포스트 프로세싱)하는 데 사용됩니다. 즉, CSS 파일을 입력으로 받아 다양한 플러그인을 사용하여 CSS를 변환하고 최적화합니다. PostCSS의 가장 큰 장점은 유연성과 확장성에 있습니다. 사용자는 필요한 기능만 선택적으로 추가할 수 있으며, 이를 통해 커스터마이징이 매우 용이합니다.

## 주요 특징 및 기능

1. **플러그인 기반 구조**:
   PostCSS는 기본적으로 아무런 기능도 수행하지 않으며, 모든 기능은 플러그인을 통해 추가됩니다. 이러한 플러그인들은 CSS를 변환하거나 분석하는 다양한 작업을 수행합니다.

   - **Autoprefixer**: 다양한 브라우저에 대한 벤더 프리픽스를 자동으로 추가합니다.
   - **CSSnano**: CSS 파일을 압축하여 파일 크기를 줄입니다.
   - **postcss-import**: 여러 CSS 파일을 하나로 병합합니다.
   - **postcss-nested**: SCSS처럼 CSS에서 중첩된 규칙을 사용할 수 있게 해줍니다.

2. **성능 최적화**:
   PostCSS는 매우 빠르게 동작하며, 특히 대용량의 CSS 파일을 처리할 때 그 성능이 돋보입니다. 이는 병렬 처리를 통해 이루어집니다.

3. **유연한 구성**:
   PostCSS는 프로젝트에 따라 플러그인을 자유롭게 선택하고 구성할 수 있습니다. 이를 통해 프로젝트의 요구사항에 맞게 CSS를 처리할 수 있습니다.

4. **사용자 정의 플러그인**:
   필요에 따라 사용자가 직접 플러그인을 작성할 수 있습니다. 이는 PostCSS를 매우 강력하고 확장 가능한 도구로 만들어줍니다.

### 예제

아래는 PostCSS를 설정하고 사용하는 간단한 예제입니다.

#### 1. 설치

먼저, Node.js와 npm이 설치되어 있어야 합니다. 그런 다음, PostCSS와 필요한 플러그인들을 설치합니다.

```bash
npm install postcss postcss-cli autoprefixer cssnano
```

#### 2. 설정 파일 (postcss.config.js)

PostCSS는 설정 파일을 통해 어떤 플러그인을 사용할지 정의합니다.

```javascript
module.exports = {
  plugins: [
    require('autoprefixer'),
    require('cssnano')({
      preset: 'default',
    }),
  ],
};
```

#### 3. 사용 방법

설정이 완료되면, 다음과 같이 PostCSS를 실행하여 CSS 파일을 처리할 수 있습니다.

```bash
npx postcss input.css -o output.css
```

### 예제 CSS 파일

#### input.css

```css
/* Autoprefixer가 벤더 프리픽스를 추가합니다. */
:fullscreen a {
  display: flex;
}

/* CSSnano가 CSS를 압축합니다. */
h1 {
  font-size: 24px;
  color: #333;
}
```

#### output.css

```css
/* Autoprefixer가 추가한 벤더 프리픽스 */
:-webkit-full-screen a {
  display: -webkit-box;
  display: -webkit-flex;
  display: -moz-box;
  display: -ms-flexbox;
  display: flex;
}
:fullscreen a {
  display: -webkit-box;
  display: -webkit-flex;
  display: -moz-box;
  display: -ms-flexbox;
  display: flex;
}

/* CSSnano가 압축한 결과 */
h1 {
  font-size: 24px;
  color: #333;
}
```

### 결론

PostCSS는 플러그인 기반의 유연한 구조 덕분에 다양한 작업에 활용될 수 있는 강력한 CSS 후처리 도구입니다. Autoprefixer, CSSnano 등 다양한 플러그인을 사용하여 브라우저 호환성을 높이고, 코드 최적화, 모듈화 등의 작업을 효율적으로 수행할 수 있습니다. 이를 통해 개발자는 보다 효율적이고 유지보수하기 쉬운 CSS 코드를 작성할 수 있습니다.
