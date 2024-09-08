---
updatedAt: 2024-02-23
directory: CSS
fileName: SCSS
title: SCSS 기록하기
description:
---

# SCSS 기록하기

- [1. 변수 (Variables)](#1-변수-variables)
  - [2. 중첩 (Nesting)](#2-중첩-nesting)
  - [3. 믹스인 (Mixins)](#3-믹스인-mixins)
  - [4. 상속 (Inheritance)](#4-상속-inheritance)
  - [5. 연산 (Operations)](#5-연산-operations)
  - [6. 파셜 (Partials) 및 임포트 (Import)](#6-파셜-partials-및-임포트-import)
  - [7. 함수 (Functions)](#7-함수-functions)

SCSS (Sassy CSS)는 CSS의 기능을 확장한 전처리기 언어로, CSS 작성의 효율성을 크게 높여줍니다. SCSS는 CSS와 거의 동일한 문법을 사용하면서도, 변수, 중첩, 믹스인 등 다양한 기능을 제공합니다. SCSS의 주요 문법 요소를 예제와 함께 설명하겠습니다.

## 1. 변수 (Variables)

변수를 사용하여 색상, 폰트 크기 등 반복되는 값을 저장하고 재사용할 수 있습니다.

```scss
$primary-color: #333;
$font-stack: Helvetica, sans-serif;

body {
  color: $primary-color;
  font-family: $font-stack;
}
```

### 2. 중첩 (Nesting)

CSS에서는 중첩이 불가능하지만, SCSS에서는 스타일 규칙을 중첩하여 부모-자식 관계를 쉽게 표현할 수 있습니다.

```scss
nav {
  ul {
    margin: 0;
    padding: 0;
    list-style: none;
  }

  li {
    display: inline-block;
  }

  a {
    text-decoration: none;
    color: $primary-color;

    &:hover {
      color: darken($primary-color, 10%);
    }
  }
}
```

### 3. 믹스인 (Mixins)

Mixin을 사용하면 코드 블록을 재사용할 수 있습니다. Mixin에는 매개변수를 전달할 수도 있습니다.

```scss
@mixin border-radius($radius) {
  -webkit-border-radius: $radius;
  -moz-border-radius: $radius;
  border-radius: $radius;
}

.box {
  @include border-radius(10px);
}
```

### 4. 상속 (Inheritance)

기존의 CSS 선택자를 상속받아 스타일을 재사용할 수 있습니다.

```scss
.message {
  border: 1px solid #ccc;
  padding: 10px;
  color: #333;
}

.success {
  @extend .message;
  border-color: green;
}
.error {
  @extend .message;
  border-color: red;
}
.warning {
  @extend .message;
  border-color: yellow;
}
```

### 5. 연산 (Operations)

SCSS에서는 산술 연산을 사용할 수 있습니다.

```scss
.container {
  width: 100%;
  padding: 16px / 2;
}
```

### 6. 파셜 (Partials) 및 임포트 (Import)

코드를 여러 파일로 분리하여 유지보수를 쉽게 할 수 있습니다. 파일명을 `_`로 시작하면 SCSS는 이를 컴파일하지 않습니다.

```scss
// _reset.scss
body {
  margin: 0;
  padding: 0;
}

// main.scss
@import 'reset';

.container {
  margin: 0 auto;
}
```

### 7. 함수 (Functions)

함수를 사용하여 복잡한 연산이나 변환을 수행할 수 있습니다.

```scss
@function px-to-rem($px, $base-font-size: 16) {
  @return #{$px / $base-font-size}rem;
}

body {
  font-size: px-to-rem(16px);
}
```

위의 예제들을 통해 SCSS의 다양한 기능을 활용하여 더욱 효율적이고 구조적인 스타일시트를 작성할 수 있습니다. SCSS는 CSS의 단순한 스타일링을 넘어서 보다 복잡한 웹 디자인 작업을 수월하게 만들어줍니다.
