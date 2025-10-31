---
folderName: regexp_note
updatedAt: 2025-02-06
title: Regexp Note
tag: regexp
isPublished: true
---

# Regexp Note

- [positive lookahead](#positive-lookahead)
- [negative lookahead](#negative-lookahead)
- [newline](#newline)
- [이스케이프 패턴](#이스케이프-패턴)
- [`RegExp.test()`](#regexptest)
- [`RegExp.exec()`](#regexpexec)
- [`RegExp.flags`](#regexpflags)
- [`RegExp.global`](#regexpglobal)
- [`RegExp.ignoreCase`](#regexpignorecase)
- [`RegExp.multiline`](#regexpmultiline)
- [`RegExp.source`](#regexpsource)
- [`RegExp.lastIndex`](#regexplastindex)
- [`String.match()`](#stringmatch)
- [`String.replace()`](#stringreplace)
- [`String.search()`](#stringsearch)
- [`String.split()`](#stringsplit)

## positive lookahead

매칭된 문자열 바로 뒤에 붙는 글자가 `t`인 것을 찾습니다.

```text
/....(?=t)/g
←←←←▼
positive lookahead // 'posi'
```

매칭된 문자열에서 첫 글자가 `t`인 것을 찾습니다.

```text
/(?=t)..../g
    ▼→→→
positive lookahead // 'tive'
```

## negative lookahead

매칭된 문자열 바로 뒤에 붙는 글자가 `t`가 아닌 것을 찾습니다.

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
```

매칭된 문자열에서 첫 글자가 `t`가 아닌 것을 찾습니다.

```text
/(?!t)..../g
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

| 의도         | 정규식 리터럴 | 문자열 패턴               |
| ------------ | ------------- | ------------------------- |
| 숫자         | `/\d/`        | `'\\d'`                   |
| 마침표(.)    | `/\./`        | `'\\.'`                   |
| 슬래시(/)    | `/\//`        | `'/'` (이스케이프 불필요) |
| 백슬래시(\\) | `/\\/`        | `'\\\\'` (4개!)           |
| 단어 경계    | `/\b/`        | `'\\b'`                   |
| 공백         | `/\s/`        | `'\\s'`                   |

## `RegExp.test()`

패턴이 문자열과 일치하는지 boolean 값으로 반환

```ts
const regex = /hello/i;
console.log(regex.test('Hello World')); // true
console.log(regex.test('Hi there')); // false
```

## `RegExp.exec()`

일치하는 정보를 배열로 반환 (일치하지 않으면 null)

```ts
const regex = /(\d{4})-(\d{2})-(\d{2})/;
const result = regex.exec('2024-12-25');
// ['2024-12-25', '2024', '12', '25', index: 0, input: '2024-12-25', groups: undefined]
```

## `RegExp.flags`

정규 표현식의 플래그를 문자열로 반환

```ts
const regex = /hello/gim;
console.log(regex.flags); // 'gim'
```

## `RegExp.global`

전역 검색 플래그(g)의 유무를 boolean으로 반환

```ts
const regex = /hello/g;
console.log(regex.global); // true
```

## `RegExp.ignoreCase`

대소문자 무시 플래그(i)의 유무를 boolean으로 반환

```ts
const regex = /hello/i;
console.log(regex.ignoreCase); // true
```

## `RegExp.multiline`

멀티라인 플래그(m)의 유무를 boolean으로 반환

```ts
const regex = /^hello/m;
console.log(regex.multiline); // true
```

## `RegExp.source`

정규 표현식의 패턴 문자열을 반환

```ts
const regex = /hello/gi;
console.log(regex.source); // 'hello'
```

## `RegExp.lastIndex`

다음 검색을 시작할 인덱스 (global 플래그와 함께 사용)

```ts
const regex = /\d+/g;
const str = '123 456 789';
console.log(regex.exec(str)); // ['123', ...]
console.log(regex.lastIndex); // 3
console.log(regex.exec(str)); // ['456', ...]
console.log(regex.lastIndex); // 7
```

## `String.match()`

문자열에서 정규 표현식과 일치하는 부분을 찾음

```ts
const str = 'The price is $100 and $200';
const regex = /\$(\d+)/g;
console.log(str.match(regex)); // ['$100', '$200']
```

## `String.replace()`

일치하는 부분을 다른 문자열로 치환

```ts
const str = 'Hello World';
const regex = /world/i;
console.log(str.replace(regex, 'JavaScript')); // 'Hello JavaScript'
```

## `String.search()`

일치하는 첫 번째 위치의 인덱스를 반환

```ts
const str = 'Hello World';
const regex = /world/i;
console.log(str.search(regex)); // 6
```

## `String.split()`

정규 표현식을 구분자로 사용하여 문자열을 분할

```ts
const str = 'apple,banana;orange:grape';
const regex = /[,;:]/;
console.log(str.split(regex)); // ['apple', 'banana', 'orange', 'grape']
```
