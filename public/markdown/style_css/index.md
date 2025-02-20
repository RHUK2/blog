---
folderName: style_css
updatedAt: 2025-02-06
title: CSS
tag: style
isPublished: true
---

# CSS

- [CSS 명시도](#css-명시도)
- [CSS 연동](#css-연동)
- [Variable](#variable)
- [Pseudo class](#pseudo-class)
- [Pesudo element](#pesudo-element)
  - [`attr()`](#attr)
- [Module CSS 사용 이슈](#module-css-사용-이슈)
- [`color`](#color)
- [`outline` • `box-shadow`](#outline--box-shadow)
- [`transition` • `animation`](#transition--animation)
- [`pointer-events` • `user-select`](#pointer-events--user-select)

## CSS 명시도

CSS 명시도 브라우저가 어떤 CSS 규칙을 적용할지 결정하는 데 사용되는 점수 시스템이다. 명시도는 선택자의 유형과 조합에 따라 계산되며, 더 높은 명시도를 가진 규칙이 우선적으로 적용된다.

▾ 명시도 계산 방법:

| 선택자 유형                                                               | 점수 |
| ------------------------------------------------------------------------- | ---- |
| 인라인 스타일 (`style` 속성)                                              | 1000 |
| ID 선택자 (`#id`)                                                         | 100  |
| 클래스, 속성, 가상 클래스 선택자 (`.class`, `[type="text"]`, `:hover` 등) | 10   |
| 요소, 가상 요소 선택자 (`div`, `p`, `::before` 등)                        | 1    |

- 명시도가 동일한 경우, 나중에 선언된 스타일이 우선 적용된다.
- `!important`는 명시도를 무시하고 가장 높은 우선순위를 가진다.

▾ 예시:

```css
#header .nav a {
  color: blue;
} /* 명시도: 100 + 10 + 1 = 111 */

.nav a {
  color: red;
} /* 명시도: 10 + 1 = 11 */

a {
  color: green;
} /* 명시도: 1 */
```

## CSS 연동

▾ `<link>`:

html 문서의 `<head>` 섹션 내에 `<link>` 태그를 사용하여 외부 css 파일을 연동할 수 있다. 이 방법은 HTML 문서가 로드될 때 지정된 css 파일이 적용되도록 한다.

```html
<link rel="stylesheet" href="styles.css" />
```

▾ css 파일 내부 `@import`:

css 파일 내부에서 다른 css 파일을 불러오는 방법으로, `@import` 규칙을 사용한다.

```css
@import url('reset.css');
```

▾ js 파일 내부 모듈 번들러를 이용한 `import`:

모듈 번들러가 적용된 프로젝트에서는 js 파일에서 css 파일을 직접 `import` 할 수 있다.

```ts
import './styles.css';
```

## Variable

```css
/* 변수 선언 */
:root {
  --user-color: #ffffff;
  --user-background-color: #000000;
}

/* 변수 사용 */
body {
  color: var(--user-color);
  background-color: var(--user-background-color);
}
```

## Pseudo class

의사 클래스는 요소의 상태나 특성에 따라 스타일을 다르게 적용하는 데 사용된다.

| 의사 클래스            | 설명                                                     |
| ---------------------- | -------------------------------------------------------- |
| `:hover`               | 마우스를 요소 위로 올렸을 때 스타일 적용                 |
| `:focus`               | 요소가 포커스를 받을 때 스타일 적용                      |
| `:active`              | 요소가 활성 상태(클릭 중)일 때 스타일 적용               |
| `:checked`             | 선택된 상태(주로 체크박스나 라디오 버튼)에 스타일 적용   |
| `:disabled`            | 비활성화된 요소에 스타일 적용                            |
| `:enabled`             | 활성화된 요소에 스타일 적용                              |
| `:visited`             | 방문한 링크에 스타일 적용                                |
| `:link`                | 방문하지 않은 링크에 스타일 적용                         |
| `:first-child`         | 부모 요소의 첫 번째 자식 요소에 스타일 적용              |
| `:last-child`          | 부모 요소의 마지막 자식 요소에 스타일 적용               |
| `:nth-child(n)`        | 부모 요소의 n번째 자식 요소에 스타일 적용                |
| `:nth-last-child(n)`   | 부모 요소의 뒤에서 n번째 자식 요소에 스타일 적용         |
| `:only-child`          | 부모 요소의 유일한 자식 요소에 스타일 적용               |
| `:first-of-type`       | 동일한 형제 중 첫 번째 특정 타입 요소에 스타일 적용      |
| `:last-of-type`        | 동일한 형제 중 마지막 특정 타입 요소에 스타일 적용       |
| `:nth-of-type(n)`      | 동일한 형제 중 n번째 특정 타입 요소에 스타일 적용        |
| `:nth-last-of-type(n)` | 동일한 형제 중 뒤에서 n번째 특정 타입 요소에 스타일 적용 |
| `:only-of-type`        | 동일한 형제 중 유일한 특정 타입 요소에 스타일 적용       |

## Pesudo element

의사 요소는 특정 요소의 특정 부분을 선택하여 스타일을 적용하는 데 사용된다.

| 의사 요소        | 설명                                                |
| ---------------- | --------------------------------------------------- |
| `::before`       | 요소의 콘텐츠 앞에 생성되는 가상 요소에 스타일 적용 |
| `::after`        | 요소의 콘텐츠 뒤에 생성되는 가상 요소에 스타일 적용 |
| `::first-letter` | 요소의 첫 번째 글자에 스타일 적용                   |
| `::first-line`   | 요소의 첫 번째 줄에 스타일 적용                     |
| `::selection`    | 사용자가 선택한 텍스트 부분에 스타일 적용           |
| `::placeholder`  | 입력 요소의 placeholder 텍스트에 스타일 적용        |

### `attr()`

`attr()` 함수는 요소의 속성 값을 참조하여 스타일을 적용할 수 있도록 해주는 기능이다. 예를 들어, `content: attr(data-custom)`와 같이 사용하면 해당 요소의 `data-custom` 속성 값을 가져와서 콘텐츠로 표시할 수 있다. 하지만 `attr()`은 현재 CSS에서 제한적으로 사용되며, 주로 `content` 속성에서만 지원되는 점에 유의해야 한다.

## Module CSS 사용 이슈

- CSS 모듈은 클래스 이름을 해시값으로 변환하여 고유하게 만든다.

```css
/* markdown.module.css */

/* markdown_markdown-body__7I_LX */
.markdown-body {
  ...
}

/* markdown_markdown-body__7I_LX pre code.markdown_hljs__5I_E3.markdown_language-text__D3_ZM */
.markdown-body pre code.hljs.language-text {
  ...
}
```

- `styles.hljs`와 `styles.language-text`는 각각 해시된 클래스 이름을 반환하므로, CSS 모듈의 스타일이 적용된다.
- 문자열로 클래스를 지정하면, CSS 모듈이 생성한 해시값과 일치하지 않아 스타일이 적용되지 않는다.

```ts
import styles from './markdown.module.css'

fucntion App() {

  return (
    <div className={styles["markdown-body"]}>
      <pre>
        <code className={`${styles.hljs} ${styles.language-text}`}> // 해당 됨
        <code className='hljs language-text'> // 해당 안됨
      </pre>
    </div>
  )
}
```

## `color`

```css
color: ##1ae61a; /* 16진수 */
color: ##1ae61a80; /* 16진수 + 투명도 */
color: rgb(26, 230, 26); /* 레드, 그린, 블루 */
color: rgba(26, 230, 26, 0.5); /* 레드, 그린, 블루 + 투명도 */
color: hsl(120, 80%, 50%); /* 색상, 채도, 명도 */
color: hsla(120, 80%, 50%, 0.5); /* 색상, 채도, 명도 + 투명도 */
color: transparent; /* rgba(0, 0, 0, 0) */
background: currentColor; /* 현재 요소의 color 속성값 */
border: 1px solid currentColor; /* 현재 요소의 color 속성값 */
```

- 알파 채널은 특정 색상에 대한 투명도를 정의하며, 이는 픽셀 단위로 적용된다.
- `opacity` 속성은 요소 전체의 투명도를 조절하여, 그 안의 모든 색상과 내용에 동일하게 영향을 미친다.

## `outline` • `box-shadow`

- `border` 값을 동적으로 조작하게 되면 주변 레이아웃들의 영향을 주기 때문에 영향을 주지 않고 스타일링을 하기 위해서는 `outline` 또는 `box-shadow` 속성으로 스타일링을 한다.
- `outline` 또는 `box-shadow` 속성은 동적으로 제어해도 주변 레이아웃에 영향을 주지 않는다.
- 일부 픽셀이 잘리는 경우 `margin` 값을 적용해서 방지할 수 있다.
- 입력 자동완성의 스타일링은 `!important`로 브라우저 정의가 되어있어 `box-shadow`로 배경색을 제거해주는 트릭을 사용한다.

  ```css
  '& input:autofill': {
      boxShadow: `0 0 0px 1000px ${theme.palette.grey[100]} inset`, /* x y blur spread color inset */
    },
  ```

## `transition` • `animation`

```css
/* Apply 1 property */
transition: property-name | duration | easing-function | delay;
/* Apply multiple property */
transition:
  property-name | duration | easing-function | delay,
  property-name | duration | easing-function | delay,
  ...;
/* Apply All property */
transition: all | duration | easing-function | delay;

/* Apply 1 animation */
animation: duration | easing-function | delay | iteration-count | direction | fill-mode | play-state | name;
/* Apply multiple animation */
animation:
  duration | easing-function | delay | iteration-count | direction | fill-mode | play-state | name,
  duration | easing-function | delay | iteration-count | direction | fill-mode | play-state | name;
```

## `pointer-events` • `user-select`

- `pointer-events: none`으로 설정하면 해당 속성이 적용된 요소에서는 클릭 이벤트가 발생하지 않는다.
- `user-select: none`이면 텍스트가 클릭이나 드래그로 선택되는 것을 막는다.
- `user-select: all`이면 클릭 한 번으로 텍스트가 선택된다.
