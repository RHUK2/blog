---
folderName: browser_seo
title: SEO
tag: browser
isPublished: true
---

# SEO

- [메타 태그(Meta Tag)](#메타-태그meta-tag)
  - [기본 메타 태그](#기본-메타-태그)
  - [Open Graph 태그](#open-graph-태그)
- [robots.txt vs HTML 메타 태그](#robotstxt-vs-html-메타-태그)

## 메타 태그(Meta Tag)

HTML `<head>` 내에 위치하며 검색 엔진과 소셜 플랫폼에 페이지 정보를 제공한다.

### 기본 메타 태그

```html
<title>페이지 제목</title>
<meta name="description" content="페이지 설명" />
<meta name="viewport" content="width=device-width, initial-scale=1" />
<meta name="robots" content="noindex, nofollow" />
```

- `robots`: 크롤러의 색인화(indexing)와 링크 추적(follow) 여부를 제어함.
  - `noindex`: 검색 결과에 이 페이지를 포함하지 않음.
  - `nofollow`: 이 페이지의 링크를 추적하지 않음.

### Open Graph 태그

소셜 미디어에서 링크를 공유할 때 미리보기 정보로 사용된다.

```html
<meta property="og:title" content="페이지 제목" />
<meta property="og:description" content="페이지 설명" />
<meta property="og:image" content="/images/og_img.png" />
<meta property="og:url" content="https://example.com/page" />
<meta property="og:site_name" content="사이트명" />
<meta property="og:type" content="website" />
```

## robots.txt vs HTML 메타 태그

두 가지 모두 크롤러의 동작을 제어하지만 역할이 다르다.

- `robots.txt`: 크롤러가 특정 페이지나 디렉터리에 아예 접근하지 못하도록 차단하는 역할을 함. 크롤링 자체를 막음.
- HTML `<meta name="robots">`: 크롤러가 페이지를 방문한 이후 색인화(indexing) 여부를 제어함.

우선순위 관계:

- `robots.txt`에서 `Disallow`로 차단된 페이지는 크롤러가 접근하지 못하므로 HTML 메타 태그를 읽을 기회 자체가 없음.
- `robots.txt`에서 접근을 허용한 페이지에 한해 크롤러가 방문하고 메타 태그의 `noindex` 지시를 따른다.

| 목적                        | 수단                                      |
| --------------------------- | ----------------------------------------- |
| 크롤링 자체를 차단          | `robots.txt`의 `Disallow`                 |
| 색인화 방지 (크롤링은 허용) | `<meta name="robots" content="noindex">`  |
| 링크 추적 방지              | `<meta name="robots" content="nofollow">` |
