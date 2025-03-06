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
