# SQL Cheat Sheet

- [SQL Cheat Sheet](#sql-cheat-sheet)
  - [특정 테이블에서 컬럼 데이터 확인하기 및 별칭 지정](#특정-테이블에서-컬럼-데이터-확인하기-및-별칭-지정)
  - [조건문](#조건문)
  - [정렬](#정렬)
  - [출력 갯수 제한](#출력-갯수-제한)
  - [조인](#조인)

## 특정 테이블에서 컬럼 데이터 확인하기 및 별칭 지정

```sql
SELECT * FROM user
SELECT id FROM user
SELECT id, name FROM user
SELECT post.id, user.name FROM user, post
SELECT post.id, user.* FROM user, post
SELECT post.id AS postId, user.* FROM user, post
```

## 조건문

```sql
SELECT * FROM user WHERE id = 50
SELECT * FROM user WHERE name LIKE "%현%" # %는 길이와 값 상관없는 모든 문자 데이터와 매칭
SELECT * FROM user WHERE name LIKE "_현_" # _는 값 상관없이 한 개의 문자 데이터와 매칭
SELECT * FROM user WHERE id = 50 AND name LIKE "%현%"
SELECT * FROM user WHERE id = 50 OR name LIKE "%현%"
SELECT * FROM user WHERE id IN (3, 20, 25)
SELECT * FROM user WHERE id NOT IN (3, 20, 25)
SELECT * FROM user WHERE id BETWEEN 20 AND 50
SELECT * FROM user WHERE id IS NULL
SELECT * FROM user WHERE id IS NOT NULL
```

## 정렬

```sql
SELECT * FROM user name LIKE "%현%" ORDER BY id ASC
SELECT * FROM user name LIKE "%현%" ORDER BY id DESC
```

## 출력 갯수 제한

```sql
SELECT * FROM user name LIKE "%현%" ORDER BY id ASC LIMIT 10
SELECT * FROM user name LIKE "%현%" ORDER BY id ASC LIMIT 5,100
```

## 조인

```sql
SELECT * FROM user LEFT JOIN post ON user.id = post.user_id
SELECT * FROM user LEFT JOIN post ON user.id = post.user_id WHERE user.id = 20
SELECT * FROM user INNER JOIN post ON user.id = post.user_id
```
