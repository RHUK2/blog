TypeScript의 `Index Signature`와 `Mapped Type`은 각각 TypeScript에서 객체를 더 유연하게 다루거나, 특정 타입에 대해 변환된 타입을 생성하기 위한 강력한 도구입니다. 아래에서 이 둘의 개념과 차이점, 사용법을 설명하겠습니다.

---

### 1. **Index Signature (인덱스 시그니처)**

`Index Signature`는 객체의 키가 미리 정해지지 않았을 때, 객체의 키와 값의 타입을 설명하는 데 사용됩니다. 즉, 객체가 동일한 타입의 값을 갖는 **동적 키**를 가질 때 유용하게 사용됩니다.

#### 문법:

```typescript
interface MyObject {
  [key: string]: number;
}
```

- 여기서 `[key: string]: number`는 아래의 의미를 가집니다:
  - `key`는 프로퍼티 이름(키)이며, 반드시 문자열(`string`)이어야 함.
  - 각 키에 해당하는 값은 반드시 숫자(`number`)이어야 함.

#### 예제:

```typescript
interface Scores {
  [name: string]: number;
}

const scores: Scores = {
  alice: 90,
  bob: 85,
  charlie: 88,
};

// 가능
scores['dave'] = 78;

// 오류: 값의 타입이 number가 아니기 때문
// scores["eve"] = "95"; // TS Error
```

#### 주요 특징:

1. `Index Signature`를 사용하면 객체의 프로퍼티 키와 값을 동적으로 정의할 수 있습니다.
2. 키의 타입은 `string`, `number`, 또는 `symbol`만 사용할 수 있습니다.
   - `number` 키를 사용할 경우, 실제로는 문자열로 변환됩니다. (JavaScript 객체의 특성)

---

### 2. **Mapped Type (매핑된 타입)**

`Mapped Type`은 기존 타입을 기반으로 새로운 타입을 정의하는 방법을 제공합니다. 이를 통해 타입 변환과 반복적인 타입 정의를 더 간단하고 정교하게 처리할 수 있습니다.

#### 문법:

```typescript
type NewType = { [P in K]: T };
```

- 여기서 `[P in K]`는 아래의 의미를 가집니다:
  - `K`는 매핑할 키의 집합 (들어갈 수도 있는 프로퍼티 이름들).
  - `P`는 `K`에서 순회(iterate)하는 각 프로퍼티 이름.
  - `T`는 해당 프로퍼티의 값의 타입.

#### 예제:

```typescript
type User = { id: string; name: string; age: number };

// 모든 프로퍼티를 읽기 전용으로 변경:
type ReadonlyUser = {
  [K in keyof User]: User[K];
};

// 결과:
type ReadonlyUser = {
  readonly id: string;
  readonly name: string;
  readonly age: number;
};
```

TypeScript는 `keyof` 키워드를 사용하여 기존 객체 타입의 키만 추출합니다. `Mapped Type`과 함께 활용하면 매우 강력해집니다.

##### Mapped Type 일반 예제:

```typescript
type Optional<T> = {
  [K in keyof T]?: T[K]; // 모든 프로퍼티를 선택적으로 변환
};

type PartialUser = Optional<User>;
// 결과:
type PartialUser = {
  id?: string;
  name?: string;
  age?: number;
};
```

#### 주요 특징:

1. **키 집합 순회:** `Mapped Type`은 `keyof`와 `in` 키워드를 사용하여 기존 객체 타입의 키를 기반으로 새 타입을 정의합니다.
2. **유틸리티 타입:** TypeScript 내장 유틸리티 타입 (`Readonly<T>`, `Partial<T>`, `Record<K, T>`, 등)은 `Mapped Type`으로 동작합니다.

   - 예: `Partial<T>`는 모든 필드를 선택적으로 만드는 타입:

   ```typescript
   type Partial<T> = {
     [P in keyof T]?: T[P];
   };
   ```

3. 조건부 타입과 조합하여 더욱 복잡한 타입 구조를 정의할 수 있습니다.

---

### `Index Signature`와 `Mapped Type`의 차이점

| 특징          | Index Signature                         | Mapped Type                              |
| ------------- | --------------------------------------- | ---------------------------------------- |
| **목적**      | 객체의 동적 키와 값의 타입을 정의       | 기존 객체의 타입을 변형시키거나 변환     |
| **키 타입**   | 주로 `string`, `number`, 또는 `symbol`  | 기존 타입에서 `keyof`를 사용해 키를 제한 |
| **타입 유추** | 키의 타입과 값의 타입을 명시적으로 지정 | 기존 타입에서 자동으로 키와 값을 추론    |
| **예제**      | `[key: string]: number`                 | `[K in keyof T]: T[K]`                   |

---

### **결합 사용 예제**

아래는 `Index Signature`와 `Mapped Type`을 조합하여 사용하는 예제입니다:

#### 예제:

```typescript
interface MyObject {
  [key: string]: string;
}

// 모든 키를 읽기 전용으로 변환
type ReadonlyMyObject = {
  readonly [K in keyof MyObject]: MyObject[K];
};

const obj: ReadonlyMyObject = {
  name: 'Alice',
  city: 'Seoul',
};

// obj.name = "Bob"; // TS Error: 읽기 전용 속성
```

---

### 결론

- `Index Signature`는 객체의 **동적 키와 값**을 정의할 때 사용됩니다.
- `Mapped Type`은 **기존 타입 변환**에 매우 강력하게 활용되며, 이를 통해 반복적인 작업을 줄일 수 있습니다.
- 두 개념 모두 객체 타입 시스템을 다룰 때 중요한 역할을 하며 보완적으로 사용할 수 있습니다.
