---
folderName: react_hook_form
title: React Hook Form
tag: react
isPublished: true
---

# React Hook Form

- [RHF 주요 특징 및 주의사항](#rhf-주요-특징-및-주의사항)
- [기본값 설정(Default Values)](#기본값-설정default-values)
- [유효성 검증(Validation)](#유효성-검증validation)
  - [Zod 연동](#zod-연동)
- [setValue vs field.onChange](#setvalue-vs-fieldonchange)
- [useFieldArray 활용](#usefieldarray-활용)
  - [key prop 설정](#key-prop-설정)
  - [리렌더링 동작 비교](#리렌더링-동작-비교)
- [폼 구조](#폼-구조)

## RHF 주요 특징 및 주의사항

- 성능 최적화:
  - 비제어 컴포넌트(Uncontrolled Component) 방식을 사용하여 전체 폼의 불필요한 리렌더링을 방지함.
  - 필요한 필드만 개별적으로 구독(Subscribe)하여 업데이트할 수 있어 대규모 폼에서 유리하다.
- 값 처리 규칙:
  - `undefined`는 필드를 등록되지 않은 상태(Unregistered)로 간주하므로 지양해야 함.
  - `null`은 제어 컴포넌트 환경에서 경고를 유발할 수 있으므로 빈 문자열(`''`)을 권장한다.
  - 중첩 객체 사용 시 `isDirty` 상태가 정확히 반영되려면 하위 필드까지 초기값을 선언해야 함.

## 기본값 설정(Default Values)

React Hook Form에서 `defaultValues`는 폼의 초기 상태를 정의하며, 비제어 컴포넌트 기반으로 동작하기 때문에 초기값이 매우 중요하다.

| 자료형     | 기본값      | 비고                                                       |
| :--------- | :---------- | :--------------------------------------------------------- |
| `string`   | `''`        | `null` 사용 시 input에 "null" 문자열이 노출될 수 있음      |
| `number`   | `0`         | 빈 값 허용 시 `''` 사용 가능 (`type="number"` 대응)        |
| `boolean`  | `false`     | 체크박스, 스위치 등에 사용함                               |
| `array`    | `[]`        | `undefined`로 두면 `map()` 순회 시 런타임 에러 위험이 있음 |
| `object`   | `{}`        | 중첩 객체는 내부 필드까지 구체적으로 명시함                |
| `Date`     | `undefined` | Date Picker는 주로 Nullable로 관리함                       |
| `nullable` | `null`      | `undefined`와 명확한 구분이 필요한 경우에만 사용함         |

## 유효성 검증(Validation)

- React Hook Form은 유효성 검증(Validation) 시 `undefined` 값을 제외하고 처리를 수행함.
- Zod나 Yup과 같은 외부 스키마 라이브러리와 연동하여 복잡한 검증 로직을 선언적으로 작성할 수 있다.

### Zod 연동

Zod의 `transform`/`trim`은 RHF에서 두 가지 시점에만 작동한다.

1. 유효성 검사 — 입력값 기준으로 에러 판단 (" " → trim → "" → min(1) 실패)
2. handleSubmit 데이터 — 콜백으로 넘어오는 data가 transform 적용된 값

필드 자체 표시값(input에 보이는 값)은 건드리지 않는다. 그래서 사용자 입력 경험은 그대로 유지되고, 실제
처리 시점에만 정제된 값을 쓰는 구조다.

## setValue vs field.onChange

`setValue`와 `field.onChange`는 둘 다 필드 값을 변경하는 함수지만, 사용 맥락과 동작 방식이 다르다.

### field.onChange

`Controller` 컴포넌트 또는 `useController` 훅을 사용할 때 `field` 객체를 통해 제공되는 함수다. 입력 이벤트에 직접 바인딩하여 사용하며, RHF 내부적으로 `isDirty`, `isTouched` 등 `formState`를 자동으로 갱신한다.

```tsx
import { Controller, useForm } from 'react-hook-form';

function App() {
  const { control, handleSubmit } = useForm({ defaultValues: { name: '' } });

  return (
    <form onSubmit={handleSubmit(console.log)}>
      <Controller
        control={control}
        name="name"
        render={({ field }) => (
          // field.onChange를 onChange에 연결하면 dirty, touched, 유효성 상태가 자동 갱신된다.
          <input {...field} />
        )}
      />
    </form>
  );
}
```

### setValue

`useForm()`이 반환하는 함수로, 폼 외부 또는 이벤트 핸들러와 무관한 시점에 명령형으로 값을 변경할 때 사용한다. 기본적으로 `formState`를 갱신하지 않으며, 옵션을 명시해야 원하는 상태가 함께 업데이트된다.

| 옵션             | 기본값  | 설명                                            |
| :--------------- | :------ | :---------------------------------------------- |
| `shouldValidate` | `false` | `true`이면 값 변경 후 유효성 검사를 즉시 실행함 |
| `shouldDirty`    | `false` | `true`이면 `dirtyFields`와 `isDirty`를 갱신함   |
| `shouldTouch`    | `false` | `true`이면 해당 필드를 touched 상태로 표시함    |

```tsx
import { useForm } from 'react-hook-form';

function App() {
  const { register, setValue } = useForm({ defaultValues: { city: '' } });

  const handleFillAddress = () => {
    // 옵션 없이 호출하면 값만 변경되고 formState는 갱신되지 않는다.
    setValue('city', '서울');

    // 옵션을 명시하면 dirty, touched, 유효성 상태가 함께 갱신된다.
    setValue('city', '서울', { shouldValidate: true, shouldDirty: true, shouldTouch: true });
  };

  return (
    <form>
      <input {...register('city')} />
      <button type="button" onClick={handleFillAddress}>
        주소 자동 완성
      </button>
    </form>
  );
}
```

### 비교

| 구분                | `field.onChange`                            | `setValue`                                       |
| :------------------ | :------------------------------------------ | :----------------------------------------------- |
| 사용 위치           | `Controller` / `useController` 내부         | `useForm()`을 호출한 컴포넌트 어디서든 사용 가능 |
| formState 자동 갱신 | dirty, touched, 유효성 자동 갱신            | 옵션을 명시하지 않으면 갱신되지 않음             |
| 주요 사용 사례      | 입력 이벤트를 직접 바인딩하는 제어 컴포넌트 | 외부 이벤트, API 응답, 연동 필드 값 설정         |
| RHF 권장 방식       | Controller 사용 시 setValue 대신 권장       | register 방식이나 외부 트리거 시 사용            |

RHF 공식 문서는 `Controller`를 사용할 때 `field.onChange` 대신 `setValue`를 직접 호출하는 방식을 지양하도록 안내한다. `field.onChange`는 필드 상태 전체를 일관되게 관리하지만, `setValue`를 직접 호출하면 `isDirty`나 `isTouched`가 누락되어 `formState`가 실제 입력 상태와 어긋날 수 있다.

반대로 `register` 방식으로 등록한 필드를 프로그램적으로 변경하거나, 다른 필드 값의 변화에 반응하여 별도 필드를 채워야 하는 경우에는 `setValue`가 적합하다.

```tsx
import { useEffect } from 'react';
import { useForm, useWatch } from 'react-hook-form';

function App() {
  const { register, control, setValue } = useForm({
    defaultValues: { country: '', region: '' },
  });

  // country 값이 바뀌면 region을 초기화하는 연동 예시
  const country = useWatch({ control, name: 'country' });

  useEffect(() => {
    setValue('region', '', { shouldDirty: false });
  }, [country, setValue]);

  return (
    <form>
      <input {...register('country')} />
      <input {...register('region')} />
    </form>
  );
}
```

## useFieldArray 활용

### key prop 설정

`useFieldArray`를 사용할 때는 자동으로 생성되는 고유 식별자인 `id`를 `key`로 사용해야 한다. 배열의 인덱스(`index`)를 `key`로 사용하면 리스트의 추가, 삭제, 정렬 시 React의 가상 DOM(Virtual DOM)이 변경 사항을 정확히 추적하지 못해 예상치 못한 UI 오류가 발생할 수 있음.

```tsx
// ✅ correct: 고유 ID 사용
{
  fields.map((field, index) => <input key={field.id} {...register(`items.${index}.name`)} />);
}

// ❌ incorrect: 인덱스 사용 지양
{
  fields.map((field, index) => <input key={index} {...register(`items.${index}.name`)} />);
}
```

### 리렌더링 동작 비교

`key` 설정 방식에 따른 React의 렌더링 효율성 차이를 이해하는 것이 중요하다. 고유한 값을 `key`로 전달해야 리스트 변경 시 실제 변경된 요소만 브라우저 DOM에 반영되어 성능이 최적화된다.

```tsx
import { useFieldArray, useForm } from 'react-hook-form';

function FieldArrayExample() {
  const { control, register } = useForm({
    defaultValues: { test: [{ name: 'item1' }] },
  });
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'test',
  });

  return (
    <div>
      {fields.map((item, index) => (
        <div key={item.id}>
          <input {...register(`test.${index}.name`)} />
          <button onClick={() => remove(index)}>Delete</button>
        </div>
      ))}
      <button onClick={() => append({ name: 'new item' })}>Add</button>
    </div>
  );
}
```

## 폼 구조

1. RHF per step + Zustand 누적 저장

   | 구분 | 내용                                                               |
   | ---- | ------------------------------------------------------------------ |
   | 장점 | 스텝별 RHF 인스턴스가 독립적 → 이전 스텝 언마운트 시 메모리 정리   |
   | 장점 | 스텝별 schema가 분리되어 있어 유지보수 쉬움                        |
   | 장점 | 스텝 순서 변경/추가/제거가 쉬움                                    |
   | 단점 | Zustand에 저장하는 시점(`handleSubmit`)과 실제 입력 사이 간극 존재 |
   | 단점 | `getValues()`가 아닌 Zustand에서 읽어야 해서 데이터 출처가 두 곳   |
   | 단점 | 최종 제출 시 Zustand 데이터가 최신인지 보장 로직 필요              |

2. FormProvider 단일 인스턴스 + Zustand UI 상태

   | 구분 | 내용                                                              |
   | ---- | ----------------------------------------------------------------- |
   | 장점 | 폼 데이터 출처가 단일 (form 하나)                                 |
   | 장점 | 어느 스텝에서든 `getValues()`로 전체 데이터 접근 가능             |
   | 장점 | `form.reset(apiData)`로 서버 데이터 초기화 자연스러움             |
   | 단점 | 전체 폼 schema를 하나로 합쳐야 해서 커지면 복잡해짐               |
   | 단점 | 스텝이 많을수록 FormProvider 하위 컴포넌트 리렌더링 관리 필요     |
   | 단점 | 스텝별 독립 검증이 `trigger(['field1', 'field2'])` 직접 지정 필요 |

---

핵심 차이: 1번은 스텝이 독립적일 때, 2번은 데이터가 스텝 간 연결될 때 자연스럽다.
