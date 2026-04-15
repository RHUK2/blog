---
folderName: style_css
title: CSS
tag: style
isPublished: true
---

# CSS

- [CSS 박스 모델(Box Model)](#css-박스-모델box-model)
- [CSS 명시도(Specificity)](#css-명시도specificity)
  - [`style` • `className`](#style--classname)
- [CSS 연동 방식](#css-연동-방식)
  - [Module CSS 사용 이슈](#module-css-사용-이슈)
- [가상 클래스 • 가상 요소(Pseudo Class • Pseudo Element)](#가상-클래스--가상-요소pseudo-class--pseudo-element)
  - [가상 클래스(Pseudo Class)](#가상-클래스pseudo-class)
  - [가상 요소(Pseudo Element)](#가상-요소pseudo-element)
- [CSS 변수(Variable)](#css-변수variable)
- [색상 표기법(Color)](#색상-표기법color)
  - [알파 채널 vs `opacity`](#알파-채널-vs-opacity)
- [`pointer-events` • `user-select`](#pointer-events--user-select)

## CSS 박스 모델(Box Model)

모든 HTML 요소는 박스(Box) 형태의 영역을 가진다. 박스 모델은 콘텐츠, 패딩, 테두리, 마진의 4단계 계층으로 구성된다.

- 구성 요소:
  - 콘텐츠(Content): 텍스트나 이미지가 표시되는 실제 영역임.
  - 패딩(Padding): 콘텐츠와 테두리 사이의 안쪽 여백임.
  - 테두리(Border): 패딩과 마진 사이의 경계선임.
  - 마진(Margin): 테두리 밖의 바깥 여백이며, 다른 요소와의 간격을 결정함.
- 박스 크기 계산 방식(`box-sizing`):
  - `content-box` (기본값): 설정한 `width/height`에 패딩과 테두리 두께가 추가되어 전체 크기가 커짐.
  - `border-box`: 설정한 `width/height` 내에 패딩과 테두리가 포함되어 크기가 고정됨. 레이아웃 계산이 직관적이어서 실무에서 주로 사용됨.

## CSS 명시도(Specificity)

브라우저가 어떤 스타일 규칙을 우선적으로 적용할지 결정하는 점수 체계다.

| 선택자 유형                 | 점수 | 예시                              |
| :-------------------------- | :--- | :-------------------------------- |
| 인라인 스타일               | 1000 | `style="..."`                     |
| ID 선택자                   | 100  | `#header`                         |
| 클래스 • 가상 클래스 • 속성 | 10   | `.nav`, `:hover`, `[type="text"]` |
| 요소 • 가상 요소            | 1    | `div`, `::before`                 |

- 동일한 명시도일 경우 나중에 선언된 스타일이 우선함.
- `!important`는 명시도 체계를 무시하고 최우선 적용되므로 사용에 주의가 필요함.

### `style` • `className`

- `className`은 빌드타임에 정적으로 정의된 CSS 클래스명을 참조할 때 사용한다.
- `style`은 런타임에 동적으로 계산된 값이나 변수를 기반으로 스타일을 적용할 때 사용한다.

```tsx
// className 사용 - 정적 스타일
<div className="primary-button" />

// style 사용 - 동적 스타일
<div style={{ width: `${progress}%`, backgroundColor: dynamicColor }} />
```

## CSS 연동 방식

외부 CSS 파일을 HTML과 연결하거나 JavaScript 환경에서 불러오는 방법이다.

- `<link>` 태그: HTML `<head>` 내부에서 외부 파일을 연결함. 브라우저가 HTML을 파싱하면서 병렬로 로드함.
- `@import`: CSS 파일 내부에서 다른 CSS 파일을 불러옴. 직렬로 로드되어 성능에 영향을 줄 수 있음.
- CSS 모듈: JavaScript 파일에서 `import` 하여 사용함. 빌드 도구를 통해 클래스명을 고유하게 변환하여 충돌을 방지함.

### Module CSS 사용 이슈

- 클래스명 해싱: CSS 모듈은 클래스명을 `파일명_클래스명__해시` 형태로 변환함.
- 참조 방식: JavaScript에서 객체 형태로 가져온 클래스명을 사용해야 하며, 일반 문자열 클래스명은 스타일이 적용되지 않음.

```css
/* Button.module.css */
.button {
  background-color: blue;
  color: white;
}
```

```tsx
import styles from './Button.module.css';

/* 올바른 사용 - styles 객체를 통해 참조 */
<button className={styles.button}>클릭</button>

/* 잘못된 사용 - 해싱된 실제 클래스명과 일치하지 않아 스타일이 적용되지 않음 */
<button className="button">클릭</button>
```

## 가상 클래스 • 가상 요소(Pseudo Class • Pseudo Element)

선택자에 추가하는 키워드로, 특정 상태나 특정 부분에 스타일을 입힐 때 사용한다.

- 차이점:
  - 가상 클래스(`:`): 요소의 특정 상태(State)를 선택함 (예: 마우스 오버, 포커스 등).
  - 가상 요소(`::`): 요소의 특정 부분(Part)을 선택하여 스타일을 부여하거나 가상 콘텐츠를 생성함.

### 가상 클래스(Pseudo Class)

| 가상 클래스          | 설명                                                              |
| :------------------- | :---------------------------------------------------------------- |
| `:hover`             | 요소 위에 마우스 포인터가 올라갔을 때임                           |
| `:focus`             | 요소가 포커스를 받았을 때(입력창 등)임                            |
| `:focus-within`      | 요소 내부의 자식 요소가 포커스를 받았을 때임                      |
| `:active`            | 요소를 클릭하는 순간(마우스 버튼을 누르고 있는 동안)임            |
| `:visited`           | 이미 방문한 링크에 적용됨                                         |
| `:checked`           | 체크박스, 라디오 버튼 등이 선택된 상태임                          |
| `:disabled`          | 비활성화된 폼 요소에 적용됨                                       |
| `:placeholder-shown` | 입력창에 힌트 텍스트가 표시되고 있을 때임                         |
| `:first-child`       | 부모 요소의 첫 번째 자식 요소를 선택함                            |
| `:last-child`        | 부모 요소의 마지막 자식 요소를 선택함                             |
| `:nth-child(n)`      | 부모 요소의 n번째 자식 요소를 선택함                              |
| `:nth-of-type(n)`    | 같은 태그 유형 중 n번째 요소를 선택함                             |
| `:only-child`        | 부모의 유일한 자식 요소를 선택함                                  |
| `:empty`             | 자식 요소와 텍스트가 모두 없는 요소를 선택함                      |
| `:not(selector)`     | 특정 선택자를 제외한 나머지 요소를 선택함                         |
| `:is(selector)`      | 여러 선택자를 하나로 묶어 간결하게 표현함                         |
| `:where(selector)`   | `:is()`와 유사하지만 명시도가 0으로 계산됨                        |
| `:has(selector)`     | 특정 하위 요소를 포함하고 있는 부모를 선택함 (최신 브라우저 지원) |

```css
/* 폼 필드 전체가 포커스를 받으면 라벨도 강조 */
.form-group:focus-within label {
  color: blue;
}

/* 마지막 항목의 하단 구분선 제거 */
li:last-child {
  border-bottom: none;
}

/* 짝수 행 배경색 지정 */
tr:nth-child(even) {
  background-color: #f5f5f5;
}

/* 버튼이 아닌 입력창에만 스타일 적용 */
input:not([type='submit']) {
  border: 1px solid #ccc;
}

/* input을 포함한 label을 직접 선택 */
label:has(input:checked) {
  font-weight: bold;
}

/* h2, h3에 공통 스타일 적용 */
:is(h2, h3) {
  margin-top: 1.5rem;
}
```

### 가상 요소(Pseudo Element)

| 가상 요소                | 설명                                               |
| :----------------------- | :------------------------------------------------- |
| `::before`               | 요소의 앞부분에 가상의 콘텐츠를 생성함             |
| `::after`                | 요소의 뒷부분에 가상의 콘텐츠를 생성함             |
| `::placeholder`          | 입력창의 힌트 텍스트 스타일을 지정함               |
| `::selection`            | 사용자가 드래그로 선택한 텍스트의 영역임           |
| `::first-line`           | 블록 요소의 첫 번째 줄 텍스트를 선택함             |
| `::first-letter`         | 블록 요소의 첫 번째 글자를 선택함                  |
| `::marker`               | `<li>` 요소의 불릿(bullet) 또는 번호 마커를 선택함 |
| `::file-selector-button` | `<input type="file">`의 버튼 부분을 선택함         |

```css
/* 링크 앞에 아이콘 삽입 */
a.external::after {
  content: ' ↗';
  font-size: 0.8em;
}

/* 드래그 선택 텍스트 색상 변경 */
::selection {
  background-color: #264f78;
  color: #fff;
}

/* 리스트 마커 커스텀 */
li::marker {
  color: tomato;
  font-size: 1.2em;
}

/* 첫 글자 드롭캡 효과 */
p::first-letter {
  font-size: 2em;
  float: left;
  line-height: 1;
  margin-right: 0.1em;
}

/* placeholder 스타일 */
input::placeholder {
  color: #aaa;
  font-style: italic;
}

/* 파일 업로드 버튼 커스텀 */
input[type='file']::file-selector-button {
  padding: 0.4rem 0.8rem;
  border: none;
  background-color: #0070f3;
  color: #fff;
  cursor: pointer;
}
```

## CSS 변수(Variable)

사용자 지정 속성(Custom Properties)을 사용하여 코드 재사용성을 높인다.

```css
:root {
  --main-color: #3498db;
}

.button {
  background-color: var(--main-color);
}
```

## 색상 표기법(Color)

- `rgb() / rgba()`: 빨강, 초록, 파랑 조합과 투명도를 사용함.
- `hex`: 16진수 코드를 사용함. `#RRGGBB` 또는 `#RRGGBBAA` 형식으로 투명도를 포함할 수 있음.
- `hsl() / hsla()`: 색상, 채도, 명도를 사용하여 직관적인 색상 조절이 가능함.
- `oklch()`: 인간의 지각 특성을 반영한 최신 색상 모델이며, 넓은 색 영역을 지원함.
- `currentColor`: 해당 요소에 적용된 `color` 속성 값을 참조함. `border`, `box-shadow`, `fill` 등에 활용하면 색상을 한 곳에서 일괄 제어할 수 있음.
- `transparent`: 완전히 투명한 색상으로, `rgba(0, 0, 0, 0)`과 동일함. 배경 제거나 `transition` 시작/끝 값으로 주로 사용됨.
- `inherit`: 부모 요소의 색상 값을 그대로 상속함.

### 알파 채널 vs `opacity`

투명도를 표현하는 방법은 두 가지이며, 적용 범위에서 차이가 있다.

- 알파 채널(`rgba()`, `#RRGGBBAA` 등): 해당 색상 값 자체에만 투명도를 적용함. 배경색만 반투명하게 하면서 텍스트는 불투명하게 유지하는 것이 가능함.
- `opacity`: 요소 전체(배경, 텍스트, 자식 요소 포함)에 투명도를 적용함. 자식 요소에도 상속되며, 개별적으로 되돌릴 수 없음.

```css
/* 배경만 반투명, 텍스트는 불투명 유지 */
.box {
  background-color: rgba(0, 0, 0, 0.5);
  color: #fff;
}

/* 요소 전체(텍스트 포함)가 반투명 */
.box {
  opacity: 0.5;
}
```

## `pointer-events` • `user-select`

- `pointer-events: none`: 해당 요소에서 클릭 이벤트가 발생하지 않음.
- `user-select: none`: 텍스트가 클릭이나 드래그로 선택되는 것을 막음.
- `user-select: all`: 클릭 한 번으로 텍스트 전체가 선택됨.
