# CSS

- [CSS](#css)
  - [display](#display)
    - [block vs inline](#block-vs-inline)
    - [flex](#flex)
      - [Honey Tip](#honey-tip)
    - [grid](#grid)
    - [media query](#media-query)
    - [width, height](#width-height)
  - [font 설정](#font-설정)
  - [초기 CSS 설정](#초기-css-설정)
  - [box-sizing](#box-sizing)
  - [border, outline, boxShadow](#border-outline-boxshadow)
  - [white-space](#white-space)
  - [word-break, overflow-wrap](#word-break-overflow-wrap)
  - [text-overflow 속성 적용하기](#text-overflow-속성-적용하기)
  - [transition \& animation](#transition--animation)
  - [이미지](#이미지)
    - [img 태그](#img-태그)
    - [background](#background)
  - [rem](#rem)
  - [자동완성 스타일링](#자동완성-스타일링)
  - [pointer-events](#pointer-events)
  - [position](#position)
  - [user-select](#user-select)
  - [color](#color)
    - [HEX](#hex)
    - [RGB RGBA](#rgb-rgba)
    - [HSL HSLA](#hsl-hsla)

## display

### block vs inline

`inline`은 `width`, `hieght` 제어 불가능, `margin` 좌우만 가능

`block`은 `width`, `height` 제어 가능, `margin` 상하좌우 가능

### flex

`flex`는 플렉스 컨테이너와 플렉스 아이템 모두 `width`, `height` 제어 가능, `margin` 상하좌우 가능

`flex`는 해당 속성이 적힌 요소를 플렉스 컨테이너로 만들고, 자식 요소들을 플렉스 아이템으로 만들어 유연한 레이아웃을 구현할 수 있도록 해준다.

| 주요 속성        |
| ---------------- |
| `flex-direction` |
| `flex-wrap`      |
| `jutify-content` |
| `align-content`  |
| `align-items`    |
| `align-self`     |
| `flex`           |
| `gap`            |

`flex`는 `flex-direction` 값이 `row`일 때는 가로로 꼬치가 꽂힌 모습을 상상하고, `column`일 때는 세로로 꼬치가 꽂힌 모습을 상상한다. 꼬치를 기준으로 상중하 정렬을 해주는 속성이 `align-items`, 좌중우 정렬을 해주는 속성이 `justify-contents`이다.

`flex-basis`는 `flex-direction` 값이 `row`인 경우에는 너비를, `column`인 경우에는 높이를 의미한다. `flex-grow`와 `flex-shrink`는 `flex-basis` 값을 기준으로 너비나 높이가 여백을 얼마나 더 차지할지, 덜 차지할지를 의미한다.

#### Honey Tip

```css
.left-item {
  flex: 30 0 200px;
}

.right-item {
  flex: 1 0 120px;
}
```

위와 같이 설정하면 `.right-item` 요소는 고정 너비를 가진 것 처럼 보이다가 `flex-wrap: wrap` 설정을 통해 줄이 바뀌면 여백을 모두 차지하는 모양으로 바뀐다.

어지간한 반응형은 `flex`와 `flex-wrap: wrap` 속성을 통해 해결이 가능하다.

### grid

<!-- todo: 내용 보완 필요 -->

`grid`는 그리드 컨테이너와 그리드 아이템 모두 `width`, `height` 제어 가능, `margin` 상하좌우 가능

`grid`는 해당 속성이 적힌 요소를 그리드 컨테이너로 만들고, 자식 요소들을 그리드 아이템으로 만들어 유연한 레이아웃을 구현할 수 있도록 해준다.

![grid_layout](assets/grid_layout.png)

| 주요 속성               |
| ----------------------- |
| `auto-template-columns` |
| `grid-row`              |
| `grid-column`           |
| `jutify-content`        |
| `jutify-items`          |
| `jutify-self`           |
| `align-content`         |
| `align-items`           |
| `align-self`            |
| `gap`                   |

`grid`로 복잡한 레이아웃을 작업하고 `flex`로 간단한 레이아웃을 작업한다. 화면 너비에 따른 스타일 조정이 필요할 때 `media query`를 사용한다.

`grid-template-columns` 속성으로 열 지정을 기본으로 작성한다. `repeat()`, `minmax()` 등을 이용할 수 있다.

로우 높이를 일정하게 하기위해서 `grid-auto-rows` 속성을 `minmax()` 값으로 설정할 수 있다.

### media query

```css
@media (max-width: 600px) {
  /* 600px 이하의 스크린에서 적용 */
}

@media (min-width: 1200px) {
  /* 1200px 이상의 스크린에서 적용 */
}
```

### width, height

`width` 제어가 가능한 `display`인 경우 `width: auto`는 `width: 100%`에서 `margin-left` 값과 `margin-right` 값을 뺀 것이다. `width: 100%`는 부모 요소의 너비값이 없어도 부모 요소 너비의 `100%`가 설정된다.

`height` 제어가 가능한 `display`인 경우 `height: auto`는 자식 요소의 높이를 기준으로 값이 설정되고, `height: 100%`는 부모 요소의 높이값이 있어야만 부모 요소 높이의 `100%`가 설정된다.

`vw, vh`는 뷰포트 기준값인데, `width: 100vw` 사용 시 스크롤 크기를 고려하지 않기 때문에 수직 스크롤이 생기면 수평 스크롤이 생기기 때문에 사용을 지양하자.

`height: 100vh`보다는 `min-height: 100vh`를 더 사용한다. 이유는 브라우저는 항상 충분히 길어질 수 있기 때문에 레이아웃에서 고정 높이를 사용하는 것은 지양한다.

레이아웃의 최대 너비를 고정하고 가운데 정렬하고 싶은 경우에는 `max-width` 값을 지정하고 `margin: auto`를 통해 정렬한다.

반응형으로 작성 시 브라우저 너비가 매우 좁아졌을 때 컨텐츠들이 오버플로우로 인해 튀어나가는 현상을 방지하려면 컨텐츠를 감싸는 부모 요소의 `min-width` 값을 주고 `overflow-x: auto`를 통해 튀어나가는 현상을 방지하자.

`min-content`는 컨텐츠가 가질 수 있는 최소의 길이를 의미한다.
`max-content`는 컨텐츠가 가질 수 있는 최대의 길이를 의미한다.

고정 너비 및 고정 높이는 반응형으로 작성할 경우 많이 사용되지 않으므로, 반응형 작성 시 `min-width`, `max-width`, `min-height`, `max-height` 등으로 제어하자.

## font 설정

사용하고자 하는 폰트의 경량화 버전을 다운 받아 사용하는 경우, 프로젝트에 정적 자산이 놓일 폴더에 위치시켜두고 `font-face`를 아래와 같이 설정한다. `src` 속성에서 `local`은 로컬 컴퓨터에 설치된 폰트 위치 의미하고, `url`은 프로젝트 폰트 리소스의 위치를 의미한다. 보통은 `url`만 사용하는 것이 일반적이다.

CDN을 사용한다면 `@font-face` 설정은 필요없다.

`font-family` 속성에서 폰트 이름을 작성할 때 공백이 존재하면 따옴표로 감싸주어야 한다.

```css
/* ... */
@font-face {
  font-family: 'Pretendard';
  font-weight: 600;
  font-display: swap;
  src: local('Pretendard SemiBold'), url('/fonts/Pretendard-SemiBold.subset.woff2') format('woff2'), url('/fonts/Pretendard-SemiBold.subset.woff')
      format('woff');
}
@font-face {
  font-family: 'Pretendard';
  font-weight: 500;
  font-display: swap;
  src: local('Pretendard Medium'), url('/fonts/Pretendard-Medium.subset.woff2') format('woff2'), url('/fonts/Pretendard-Medium.subset.woff')
      format('woff');
}
/* ... */

body {
  font-family: 'Pretendard', -apple-system, BlinkMacSystemFont, sans-serif;
}

* {
  /* button, input 등 body의 설정만으로 적용이 안 되는 태그들이 있기에 설정 */
  font: inherit;
}
```

## 초기 CSS 설정

```css
* {
  margin: 0;
  padding: 0;
  border: 0;
  font: inherit;
  /* ...기본 타이포그래피 설정; */
}

html,
body,
#root {
  min-height: 100vh;
}

*,
:after,
:before {
  box-sizing: border-box;
}

html {
  font-size: 62.5%; /* 계산 필요없이 rem 값을 사용하기 위한 설정 */
}

a {
  text-decoration: none;
}

ul,
ol,
li {
  list-style: none;
}
```

## box-sizing

`box-sizing` 속성은 기본값이 `content-box`인데 이는 `width`, `padding`, `border` 중에 `width`만을 가지고 총 너비를 계산한다.

`border-box`는 `width`, `padding`, `border` 모두를 가지고 총 너비를 계산한다. 실무에서는 대부분 모든 요소에 `box-sizing: border-box`를 사용하여 작업을 한다.

## border, outline, boxShadow

보통 실무에서 `box-sizing: border-box` 상태의 요소를 작업한다. 이 때 `border`값이 너비에 포함되기 때문에 '어떤 요소가 포커싱되는 순간 테두리가 증가하는 동작'을 할 때 너비가 늘어나면서 주변 요소들이 움직이는 사이드 이펙트가 발생한다. 이는 너비에 영향을 주지 않는 `outline`이나 `box-shadow` 속성으로 `border` 처럼 보이게 트릭을 줘서 해결할 수 있다.

## white-space

|            | 스페이스와 탭 | 줄바꿈 | 자동 줄바꿈 |
| ---------- | ------------- | ------ | ----------- |
| `normal`   | 병합          | 병합   | O           |
| `nowrap`   | 병합          | 병합   | X           |
| `pre`      | 보존          | 보존   | X           |
| `pre-wrap` | 보존          | 보존   | O           |
| `pre-line` | 병합          | 보존   | O           |

## word-break, overflow-wrap

`word-break`과 `overflow-wrap` 모두 한 단어가 길게 이어져 부모 상자의 `width`를 넘길 때 어떻게 처리할 지에 관한 속성이다. 아래 그림을 통해서 차이를 확인하자.

![word_break](assets/word_break.png)

![overflow_wrap](assets/overflow_wrap.png)

## text-overflow 속성 적용하기

```css
div {
  display: block;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: eillipsis;
}
```

일반적으로 텍스트가 오버플로우 되려면 띄어쓰기 없이 글자 길이가 부모 박스보다 길어야 하는데, `white-space`가 `normal`이 기본값으로 설정되어 있기 때문에 자동 줄바꿈이 일어나 오버플로우가 빈번하게 발생하지는 않는다. 그래서 `white-space`를 `nowrap` 이나 `pre`로 바꿔 자동 줄바꿈을 제거해 오버플로우를 발생시킨다.

발생한 오버플로우는 `overflow: hidden`으로 가려버리고 이후에 `text-overflow: eillipsis`를 적용해 해당 텍스트의 `...`을 적용한다.

이 방식은 데이터를 자르기 때문에 작은 화면에서는 데이터를 모두 확인할 수 없기 때문에 반응형을 통해 데이터를 최대한 보여주는 방식으로 해결하는 것이 사용자 경험에 좋은 것 같다.

## transition & animation

```css
/* Apply 1 property */
transition: property-name | duration | easing-function | delay;
/* Apply multiple property */
transition: property-name | duration | easing-function | delay, property-name | duration | easing-function | delay, ...;
/* Apply All property */
transition: all | duration | easing-function | delay;

/* Apply 1 animation */
animation: duration | easing-function | delay | iteration-count | direction | fill-mode | play-state | name;
/* Apply multiple animation */
animation: duration | easing-function | delay | iteration-count | direction | fill-mode | play-state | name, animation: duration | easing-function | delay | iteration-count | direction | fill-mode | play-state | name;
```

## 이미지

### img 태그

```css
/* 반응형 이미지 */
img {
  max-width: 100%;
  height: auto;
}

/* 고정된 너비와 높이 안에서 object-fit, object-position 속성으로 이미지 제어 */
img {
  width: 300px;
  height: 150px
  object-fit: cover;
  object-position: center top;
}

/* width를 유동적으로 가져가기 위해서 컨테이너를 추가해서 이미지 제어 */
div {
  flex: 1 0 300px;
  height: 150px;
}

div > img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center top;
}
```

aspect ratio

### background

<!-- todo: 내용 보완 필요 -->

| 주요 속성             |
| --------------------- |
| `background-url`      |
| `background-size`     |
| `background-position` |
| `background-repeat`   |

## rem

<!-- todo: 내용 보완 필요 -->

```css
html {
  font-size: 62.5%;
}
```

폰트는 `rem`으로 관리하되, 계산이 용이하도록 `html`에 `font-size: 62.5%`를 설정해 `1rem=10px`로 관리한다.

## 자동완성 스타일링

자동완성의 스타일링 `!important`로 브라우저 정의가 되어있어 `box-shadow`로 배경색을 제거해주는 트릭을 사용한다.

```css
input:autofill {
  border: 1px solid grey;
  box-shadow: 0 0 0px 1000px white inset;
}
```

## pointer-events

css 속성 중 `pointer-events` 값을 `none`으로 설정하면 해당 스타일이 적용된 요소에서는 클릭 이벤트가 발생하지 않는다.

## position

|            | 배치 위치                                                                         | `top`, `bottom`, `left`, `right`, `z-index` |
| ---------- | --------------------------------------------------------------------------------- | :-----------------------------------------: |
| `static`   | 문서의 일반적인 흐름                                                              |                      X                      |
| `relative` | 문서의 일반적인 흐름                                                              |                      O                      |
| `absolute` | `position` 속성이 `relative`, `absolute`, `fixed`로 설정된 가장 가까운 부모 요소  |                      O                      |
| `fixed`    | 뷰포트                                                                            |                      O                      |
| `sticky`   | 문서의 일반적인 흐름에 따라 배치되다가, 스크롤에 의해 화면에서 없어지기 전 고정됨 |                      O                      |

## user-select

![user_select](assets/user_select.png)

## color

<!-- todo: 내용 보완 필요 -->

alpha channel vs opacity

alpha 값은 색상이 적용되는 속성에만 적용

opacity는 전체 적용

### HEX

### RGB RGBA

### HSL HSLA
