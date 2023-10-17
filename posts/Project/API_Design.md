# API Design

- [API Design](#api-design)
  - [관계형 DB의 관계](#관계형-db의-관계)
    - [일대일 관계 (One-to-One Relationship)](#일대일-관계-one-to-one-relationship)
    - [일대다 관계 (One-to-Many Relationship)](#일대다-관계-one-to-many-relationship)
    - [다대일 관계 (Many-to-One Relationship)](#다대일-관계-many-to-one-relationship)
    - [다대다 관계 (Many-to-Many Relationship)](#다대다-관계-many-to-many-relationship)

## 관계형 DB의 관계

### 일대일 관계 (One-to-One Relationship)

한 테이블의 각 레코드가 다른 테이블의 레코드와 1:1 관계를 가진다.

```mermaid
erDiagram
USER {
  number id PK
  string name
  number age
}
PHONE {
  number user_id PK
  number phone
}
GENDER {
  number user_id PK
  string gender
}
USER ||--o| PHONE: "1:0 or 1:1"
USER ||--|| GENDER: "1:1"
```

### 일대다 관계 (One-to-Many Relationship)

한 테이블의 레코드가 다른 테이블의 여러 레코드와 관련이 있는 경우이다.
일대다 관계에서 "일"쪽의 PK 값을 알면 연관된 모든 "다"를 알 수 있지만, 특정 "다"를 알려면 추가적인 정보가 요구된다.

```mermaid
erDiagram
PARENT {
  number id PK
  string name
  string gender
  number age
}
CHILD {
  number id PK
  string name
  string gender
  number age
  number parent_id FK
}
HOUSE {
  number id PK
  boolean purchase
  string location
  number price
  number parent_id FK
}
PARENT ||--o{ CHILD: "1:0 or 1:N"
PARENT ||--|{ HOUSE: "1:N"
```

### 다대일 관계 (Many-to-One Relationship)

다수의 레코드가 다른 테이블의 한 레코드와 관련이 있는 경우입니다.
다대일 관계에서 특정한 "다"는 FK 값을 통해서 연결된 "일"의 관계를 알 수 있다.

```mermaid
erDiagram
PARENT {
  number id PK
  string name
  string gender
  number age
}
CHILD {
  number id PK
  string name
  string gender
  number age
  number parent_id FK
}
HOUSE {
  number id PK
  boolean purchase
  string location
  number price
  number parent_id FK
}
CHILD }o--|| PARENT: "0:1 or N:1"
HOUSE }|--|| PARENT: "N:1"
```

### 다대다 관계 (Many-to-Many Relationship)

다수의 레코드가 다른 테이블의 다수의 레코드와 관련이 있는 경우입니다.

```mermaid
erDiagram
BOOK {
  number id PK
  string title
  string category
  number price
}
PERSON {
  number id PK
  string name
  string gender
  number age
}
LOAN {
  number id PK
  number book_id FK
  number person_id FK
  string loan_date
  string return_date
  number late_fee
}
BOOK ||--o{ LOAN: "1:0 or 1:N"
PERSON ||--o{ LOAN: "1:0 or 1:N"
```
