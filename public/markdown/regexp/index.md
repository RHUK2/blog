---
folderName: regexp_note
updatedAt: 2025-02-06
title: Regexp Note
tag: regexp
isPublished: true
---

# Regexp Note

- [positive lookahed, negative lookahed](#positive-lookahed-negative-lookahed)
- [줄바꿈도 검색하기](#줄바꿈도-검색하기)

## positive lookahed, negative lookahed

조건문에 따라 찾은 위치 기준으로 앞에서 찾냐 뒤에서 찾냐

```regexp
/.(?=t)/
  ←▼
positive lookahed

/(?=t)./
    ▼→
positive lookahed
```

```regexp
/.(?!t)/
   ←▼
positive lookahed

/(?!t)./
    ▼→
positive lookahed
```

## 줄바꿈도 검색하기

[\w\W]
