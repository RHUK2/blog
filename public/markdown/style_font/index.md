---
folderName: style_font
updatedAt: 2025-02-06
title: Font
tag: style
isPublished: true
---

# Font

- [`font-family`](#font-family)
- [`font-face`](#font-face)
- [`rem` • `em`](#rem--em)
- [`white-space`](#white-space)
- [`word-break`](#word-break)
- [`text-overflow`](#text-overflow)
- [문자 수평 맞추기](#문자-수평-맞추기)
- [폰트 파일 동작 원리](#폰트-파일-동작-원리)
  - [아이콘 폰트 파일 동작 원리](#아이콘-폰트-파일-동작-원리)

## `font-family`

- `font-family` 설정이 따로 없다면, 기본적으로 각 운영체제의 설치된 시스템 기본 글꼴을 사용하게 된다.
- 일반적으로 사용하려는 폰트명과 해당 글꼴이 없는 경우 대체할 폰트명을 나열한다.
- 폰트명에 띄어쓰기가 존재하면 따옴표로 감싸주어야 인식한다.

```css
body {
  font-family: Times, 'Times New Roman', Georgia, serif;
}
```

## `font-face`

- 로컬 컴퓨터에 설치된 폰트뿐 아니라 외부 리소스를 가져와서 폰트를 정의하기 위해 사용된다.
- `local()`은 로컬 컴퓨터에 설치된 폰트를 가리키기 위해 사용된다.
- `url()`은 외부 리소스(폰트)를 가리키기 위해 사용된다.
- `format()` 폰트 파일의 확장자를 명시하기 위해 사용된다.

```css
/* ... */
@font-face {
  font-family: 'Pretendard';
  font-weight: 600;
  font-display: swap;
  src:
    local('Pretendard SemiBold'),
    url('/fonts/Pretendard-SemiBold.subset.woff2') format('woff2'),
    url('/fonts/Pretendard-SemiBold.subset.woff') format('woff');
}
@font-face {
  font-family: 'Pretendard';
  font-weight: 500;
  font-display: swap;
  src:
    local('Pretendard Medium'),
    url('/fonts/Pretendard-Medium.subset.woff2') format('woff2'),
    url('/fonts/Pretendard-Medium.subset.woff') format('woff');
}
/* ... */

body {
  font-family: Pretendard, Times, 'Times New Roman', Georgia, serif;
}
```

## `rem` • `em`

`rem`과 `em`은 CSS 글꼴 크기와 요소의 크기를 정의하는 데 사용되는 상대 단위이다.

▾ `rem`:

`rem`은 문서의 루트 요소인 `<html>`의 `font-size` 속성값을 기준으로 한다.

브라우저 글꼴 크기 설정 변경 시 모든 `rem` 단위가 동일한 비율로 조정되어 일관성 있는 레이아웃을 유지할 수 있다.

▾ `em`:

`em`은 해당 단위가 사용되고 있는 요소의 `font-size` 속성값을 기준으로 한다.

`em` 단위의 특성상 형제 요소의 스타일에 영향을 받을 수 있기 때문에, 필요한 경우가 아니라면 `rem` 단위를 사용하는 것이 좋다.

▾ 예시:

```ts
h1: {
  fontFamily: ""Roboto", "Helvetica", "Arial", sans-serif"
  fontWeight: 300;
  fontSize: "6rem";
  lineHeight: 1.167;
  letterSpacing: "-0.01562em";
}
```

## `white-space`

| `white-space`     | 스페이스(`\s`)와 탭(`\t`) | 줄바꿈(\n)            | 줄바꿈(\n)에 관계없이 오버플로우 시 줄바꿈 |
| ----------------- | ------------------------- | --------------------- | ------------------------------------------ |
| `normal`(default) | 한 개의 공백으로 변경     | 한 개의 공백으로 변경 | O                                          |
| `nowrap`          | 한 개의 공백으로 변경     | 한 개의 공백으로 변경 | X                                          |
| `pre`             | 그대로 보존               | 그대로 보존           | X                                          |
| `pre-wrap`        | 그대로 보존               | 그대로 보존           | O                                          |
| `pre-line`        | 한 개의 공백으로 변경     | 그대로 보존           | O                                          |

## `word-break`

- CJK(Chinese/Japanese/Korean): 띄어쓰기 없이 이어진 중국어, 일본어, 한국어 단어
- Non-CJK: 띄어쓰기 없이 이어진 중국어, 일본어, 한국어 제외 단어(영어, 숫자 등)
- 단어 중간에 특수문자가 있으면 예상대로 동작하지 않을 수 있다. 이럴 땐 `white-space` 속성을 같이 사용한다.

| `word-break`      | 오버플로우 시 Non-CJK 자름 여부 | 오버플로우 시 CJK 자름 여부 |
| ----------------- | ------------------------------- | --------------------------- |
| `normal`(default) | X                               | O                           |
| `break-all`       | O                               | O                           |
| `keep-all`        | X                               | X                           |

## `text-overflow`

텍스트가 오버플로우되는 상황은 부모 박스의 너비를 초과하는 경우 발생한다.
`white-space`를 `nowrap` 이나 `pre`로 바꿔 자동 줄바꿈을 제거해 오버플로우를 발생시킨다.

발생한 오버플로우는 `overflow: hidden`으로 가려버리고 이후에 `text-overflow: eillipsis`를 적용해 해당 텍스트의 `...`을 적용한다.

```css
div {
  display: block;
  white-space: nowrap; /* 자동 줄바꿈 제거 */
  overflow: hidden; /* 오버플로우 가려버리기 */
  text-overflow: eillipsis; /* 오버플로우 시 말줄임표 적용 */
}
```

## 문자 수평 맞추기

▾ 수평 정렬이 안맞는 경우:

- 크기가 서로 다른 문자끼리 수평인 경우
- 문자와 아이콘 또는 이미지와 수평인 경우

▾ 해결 방법:

- `line-height: 1`로 설정해본다.

## 폰트 파일 동작 원리

폰트는 유니코드를 입력받으면, 해당 유니코드에 대응하는 글리프 인덱스를 cmap 테이블에서 조회한다. 이후, 조회된 글리프 인덱스를 기반으로 해당 글리프를 렌더링하는 방식으로 동작한다.

```text
A → U+0041 → "65" : 4
```

`A`는 유니코드 `U+0041`이고, 이는 10진수로 `65`이다. 이 값은 글리프 인덱스 `4`에 매핑된다.

▾ 글리프:

![img](images/glyph_1.png)

▾ cmap(Character To Glyph Index Mapping Table):

![img](images/cmap.png)

### 아이콘 폰트 파일 동작 원리

아이콘 폰트는 일반적으로 PUA(Private Use Area, E000–F8FF)에 위치한 유니코드와 해당 글리프를 매핑하여 저장한다. 따라서 아이콘 폰트 제공자는 사용자의 접근성을 고려하여 PUA 내 유니코드에 접근할 수 있는 다양한 방법을 제공한다.

▾ FontAwesome 폰트 파일의 접근 방식:

```css
.fas {
  font-family: 'FontAwesome';
}
.fa-home::before {
  content: '\f015'; /* 집 아이콘의 유니코드(U+F015) */
}
```

```html
<i class="fas fa-home"></i>
```

▾ Material Icons 폰트 파일의 접근 방식:

```css
.material-icons {
    font-family: 'Material Icons';
    ...
}
```

```html
<span class="material-icons">error</span>
```

`"error"`가 `glyphNameIndexs`와 `names`를 이용해 `glyphIndex`와 매핑되는 과정은 PostScript 테이블의 구조를 기반으로 설명할 수 있다.

▾ PostScript 테이블 구조:

- `glyphNameIndexs` 배열: 각 글리프 인덱스에 대응하는 글리프 이름의 참조값을 저장한다.
  - 값이 0–257인 경우: 표준 글리프 이름(예: `.notdef`, `A`, `B` 등)을 참조한다.
  - 값이 258 이상인 경우: `names` 배열의 인덱스를 참조한다 (`glyphNameIndex[i] - 258`).
- `names` 배열: 사용자 정의 글리프 이름을 저장한다.

▾ 매핑 과정:

- `names` 배열에서 값이 `"error"`인 위치를 찾는다. (`names[260]`)
- `glyphNameIndexs` 배열에서 값이 `258 + 260 = 518`인 위치를 찾는다. (`glyphNameIndexs[262]`).
- 해당 위치의 인덱스가 `"error"`의 글리프 인덱스다. (`262`)
- 글리프 인덱스를 사용하여 GLYF 테이블에서 글리프 데이터를 조회한다.
- 글리프 데이터를 기반으로 아이콘을 화면에 렌더링한다.

▾ 글리프:

![img](images/glyph_2.png)

▾ post(PostScript Table):

![img](images/post.png)
