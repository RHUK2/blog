---
folderName: regexp_note
updatedAt: 2025-02-06
title: Regexp Note
tag: regexp
isPublished: true
---

# Regexp Note

- [positive lookahed](#positive-lookahed)
- [newline](#newline)

## positive lookahed

```text
/..(?=t)/
  ←←▼
positive lookahead // si

/(?=t).../
   ▼→→→
positive lookahead // tiv
```

## newline

- `\n`을 사용해서 검색
- `.`은 `\n`을 포함하지 않는 모든 문자를 의미
- `\W`, `\D`, `\s`는 `\n`을 포함
- `\w`, `\d`, `\S`는 `\n`을 포함하지 않음
