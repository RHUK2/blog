---
folderName: regexp_note
updatedAt: 2025-02-06
title: Regexp Note
tag: regexp
isPublished: true
---

# Regexp Note

- [positive lookahed](#positive-lookahed)
- [negative lookahed](#negative-lookahed)
- [newline](#newline)
- [이스케이프 패턴](#이스케이프-패턴)

## positive lookahed

```text
/....(?=t)/g
←←←←▼
positive lookahead // 'posi'

/(?=t)..../g
   ▼→→→→
positive lookahead // 'tive'
```

## negative lookahed

```text
/....(?!t)/g
→→→→▼(t를 포함)
negative lookahead // []
 →→→→▼
negative lookahead // ['egat']
     →→→→▼
negative lookahead // ['egat', 'ive ']
         →→→→▼
negative lookahead // ['egat', 'ive ', 'look']
             →→→→▼
negative lookahead // ['egat', 'ive ', 'look', 'ahea']

/(?=t)..../g
▼→→→
negative lookahead // ['nega']
    ▼→→→(t를 포함)
negative lookahead // ['nega']
     ▼→→→
negative lookahead // ['nega', 'ive ']
         ▼→→→
negative lookahead // ['nega', 'ive ', 'look']
             ▼→→→
negative lookahead // ['nega', 'ive ', 'look', 'ahea']
```

## newline

- `\n`을 사용해서 검색
- `.`은 `\n`을 포함하지 않는 모든 문자를 의미
- `\W`, `\D`, `\s`는 `\n`을 포함
- `\w`, `\d`, `\S`는 `\n`을 포함하지 않음

## 이스케이프 패턴

```ts
const re = new RegExp('ab+c\\d', 'i'); // 첫 번째 인수로 문자열 패턴과 함께 생성자 사용
// 혹은
const re = new RegExp(/ab+c\d/, 'i'); // 첫 번째 인수로 정규 표현식 리터럴과 함께 생성자 사용

const re = new RegExp('ab+c\\.com', 'i'); // 첫 번째 인수로 문자열 패턴과 함께 생성자 사용
// 혹은
const re = new RegExp(/ab+c\.com/, 'i'); // 첫 번째 인수로 정규 표현식 리터럴과 함께 생성자 사용

const re = new RegExp('/ab+c\\d', 'i'); // 첫 번째 인수로 문자열 패턴과 함께 생성자 사용
// 혹은
const re = new RegExp(/\/ab+c\d/, 'i'); // 첫 번째 인수로 정규 표현식 리터럴과 함께 생성자 사용
```
