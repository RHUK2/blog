---
folderName: regexp
title: 정규 표현식(RegExp)
tag: regexp
isPublished: true
---

# Regexp

- [그룹화 및 캡처(Grouping \& Capturing)](#그룹화-및-캡처grouping--capturing)
  - [캡처 그룹(Capturing Group)](#캡처-그룹capturing-group)
  - [비캡처 그룹(Non-capturing Group)](#비캡처-그룹non-capturing-group)
- [전후방 탐색(Lookaround)](#전후방-탐색lookaround)
  - [전방 탐색(Lookahead)](#전방-탐색lookahead)
  - [후방 탐색(Lookbehind)](#후방-탐색lookbehind)
- [개행 문자(Newline)](#개행-문자newline)
- [이스케이프 패턴(Escape Pattern)](#이스케이프-패턴escape-pattern)

## 그룹화 및 캡처(Grouping & Capturing)

정규 표현식에서 괄호`()`를 사용하여 패턴의 일부를 그룹으로 묶음.

### 캡처 그룹(Capturing Group)

- 패턴의 일부를 `(pattern)` 형태로 묶어 일치하는 부분을 메모리에 저장함.
- `exec()` 또는 `match()` 메서드 호출 시 결과 배열의 인덱스에 포함됨.

### 비캡처 그룹(Non-capturing Group)

- 패턴을 그룹화하되 메모리에 저장(캡처)하지 않음.
- 형식: `(?:pattern)`
- 캡처가 필요 없는 단순 그룹화로 성능을 최적화하고 캡처 인덱스의 혼동을 방지함.

## 전후방 탐색(Lookaround)

특정 패턴의 앞이나 뒤에 오는 문자를 확인하지만, 결과 문자열에는 포함하지 않는 기법임.

### 전방 탐색(Lookahead)

대상 문자열의 오른쪽(앞)을 탐색함.

- 긍정 전방 탐색(Positive Lookahead): `(?=pattern)`. 뒤에 특정 패턴이 오는 경우에만 매칭됨.
- 부정 전방 탐색(Negative Lookahead): `(?!pattern)`. 뒤에 특정 패턴이 오지 않는 경우에만 매칭됨.

```text
// 긍정: 탐색 조건이 패턴 뒤에 위치할 때 (←←←← 방향으로 4자리 탐색)
/....(?=t)/g
←←←←▼
positive lookahead // 'posi'

// 긍정: 탐색 조건이 패턴 앞에 위치할 때 (▼→→→ 방향으로 4자리 탐색)
/(?=t)..../g
    ▼→→→
positive lookahead // 'tive'
```

```text
// 부정: 탐색 조건이 패턴 뒤에 위치할 때
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

// 부정: 탐색 조건이 패턴 앞에 위치할 때
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

```ts
// 긍정: 단위(px)가 붙은 숫자만 추출
//
//  "100px"   "200em"   "300px"
//   ^^^                 ^^^
//   매칭                매칭     ("px" 앞의 숫자만 반환, "px"는 결과에 포함되지 않음)

const pos = /\d+(?=px)/g;
'100px 200em 300px'.match(pos); // ['100', '300']
```

```ts
// 부정: 단위(px)가 붙지 않은 숫자만 추출
//
//  "100px"   "200em"   "300px"
//             ^^^
//             매칭      ("px"가 없는 숫자만 반환)

const neg = /\d+(?!px)/g;
'100px 200em 300px'.match(neg); // ['10', '200', '30']
// 주의: '100px'에서 '10'이 매칭됨 — '0' 뒤에는 'px'가 없기 때문
```

전방 탐색은 패턴 맨 앞에 위치시킬 수도 있다. 문자를 소비하지 않는 특성을 이용해 동일한 시작 위치에서 여러 조건을 동시에 검사할 때 유용함.

```ts
// 비밀번호 유효성 검사:
// 대문자 포함, 숫자 포함, 8자 이상을 동시에 검사
//
// (?=.*[A-Z])  → 어딘가에 대문자가 있는지 확인 (위치 이동 없음)
// (?=.*\d)     → 어딘가에 숫자가 있는지 확인  (위치 이동 없음)
// .{8,}        → 실제 매칭: 8자 이상

const password = /(?=.*[A-Z])(?=.*\d).{8,}/;

password.test('abcdefgh'); // false — 대문자, 숫자 없음
password.test('Abcdefgh'); // false — 숫자 없음
password.test('Abcdefg1'); // true
```

### 후방 탐색(Lookbehind)

대상 문자열의 왼쪽(뒤)을 탐색함.

- 긍정 후방 탐색(Positive Lookbehind): `(?<=pattern)`. 앞에 특정 패턴이 있는 경우에만 매칭됨.
- 부정 후방 탐색(Negative Lookbehind): `(?<!pattern)`. 앞에 특정 패턴이 없는 경우에만 매칭됨.

```ts
// 긍정: '$' 기호 뒤의 숫자만 추출
//
//  "$100"   "200"   "€300"
//    ^^^
//    매칭             ("$" 뒤의 숫자만 반환, "$"는 결과에 포함되지 않음)

const pos = /(?<=\$)\d+/g;
'$100 200 €300'.match(pos); // ['100']
```

```ts
// 부정: '$' 기호가 없는 숫자만 추출
//
//  "$100"   "200"   "€300"
//            ^^^      ^^^
//            매칭     매칭

const neg = /(?<!\$)\d+/g;
'$100 200 €300'.match(neg); // ['200', '300']
```

## 개행 문자(Newline)

- `\n`을 사용하여 검색함.
- 마침표(`.`)는 기본적으로 `\n`을 포함하지 않는 모든 문자를 의미함.
- `\W`, `\D`, `\s`는 `\n`을 포함함.
- `\w`, `\d`, `\S`는 `\n`을 포함하지 않음.

## 이스케이프 패턴(Escape Pattern)

특수 문자를 문자로 인식시키기 위해 백슬래시(`\`)를 사용함.

| 의도         | 정규식 리터럴 | 문자열 패턴 |
| ------------ | ------------- | ----------- |
| 숫자         | `/\d/`        | `'\\d'`     |
| 마침표(.)    | `/\./`        | `'\\.'`     |
| 슬래시(/)    | `/\//`        | `'/'`       |
| 백슬래시(\\) | `/\\/`        | `'\\\\'`    |
| 단어 경계    | `/\b/`        | `'\\b'`     |
