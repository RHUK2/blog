---
folderName: react_component
title: React Component
tag: react
isPublished: true
---

# React 컴포넌트(React Component)

- [컴포넌트 설계 원칙](#컴포넌트-설계-원칙)
- [아토믹 디자인(Atomic Design)](#아토믹-디자인atomic-design)
- [프레젠테이셔널/컨테이너 패턴](#프레젠테이셔널컨테이너-패턴)
- [복합 컴포넌트(Compound Component) 패턴](#복합-컴포넌트compound-component-패턴)
- [렌더 프롭(Render Prop) 패턴](#렌더-프롭render-prop-패턴)
- [폴리모픽(Polymorphic) 패턴](#폴리모픽polymorphic-패턴)
- [훅과 렌더링 컴포넌트 분리](#훅과-렌더링-컴포넌트-분리)
- [asChild와 Slot 패턴](#aschild와-slot-패턴)
- [제어 컴포넌트(Controlled Component)](#제어-컴포넌트controlled-component)
- [비제어 컴포넌트(Uncontrolled Component)](#비제어-컴포넌트uncontrolled-component)

## 컴포넌트 설계 원칙

- 컴포넌트는 UI를 구성하는 독립적이고 재사용 가능한 단위다.
- 단일 책임 원칙(SRP)에 따라 하나의 컴포넌트는 하나의 역할만 수행해야 한다.
- 분기가 복잡해질 경우 새로운 컴포넌트로 분리하는 것이 유지보수에 유리하다.

## 아토믹 디자인(Atomic Design)

아토믹 디자인은 Brad Frost가 2013년에 제안한 디자인 시스템 방법론으로, UI를 화학 원소의 계층처럼 5단계로 분류한다.

1. Atoms(원자)
   - 더 이상 분리할 수 없는 가장 작은 UI 단위다.
   - `Button`, `Input`, `Label` 등 HTML 기본 요소에 스타일을 적용한 컴포넌트가 해당한다.
2. Molecules(분자)
   - 2개 이상의 원자가 결합하여 하나의 기능을 수행하는 단위다.
   - `Label` + `Input` + `Button`이 결합된 검색 폼이 예시다.
3. Organisms(유기체)
   - 분자들이 결합하여 독립적인 UI 섹션을 구성하는 단위다.
   - 헤더, 네비게이션 바, 카드 목록이 해당한다.
4. Templates(템플릿)
   - 유기체를 배치하여 페이지의 레이아웃 구조만을 정의한다.
   - 실제 데이터 없이 와이어프레임 수준의 뼈대 역할을 한다.
5. Pages(페이지)
   - 템플릿에 실제 데이터를 채운 최종 결과물이다.
   - React에서는 라우트 단위 컴포넌트가 이 레벨에 해당한다.

실무에서는 Atoms, Molecules, Organisms 3단계를 중심으로 적용하는 경우가 많다.

## 프레젠테이셔널/컨테이너 패턴

Dan Abramov가 2015년에 제안한 패턴으로, 컴포넌트를 역할에 따라 두 종류로 분리한다.

- 프레젠테이셔널(Presentational) 컴포넌트는 UI 렌더링만 담당하고, 데이터와 콜백을 props로 받는다.
- 컨테이너(Container) 컴포넌트는 데이터 페칭, 상태 관리, 비즈니스 로직을 담당하고 프레젠테이셔널 컴포넌트에 props를 전달한다.

```tsx
// 프레젠테이셔널: UI만 담당
function UserList({ users, onSelect }: { users: User[]; onSelect: (id: string) => void }) {
  return (
    <ul>
      {users.map((user) => (
        <li key={user.id} onClick={() => onSelect(user.id)}>
          {user.name}
        </li>
      ))}
    </ul>
  );
}

// 컨테이너: 데이터와 로직을 담당
function UserListContainer() {
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    fetchUsers().then(setUsers);
  }, []);

  const handleSelect = (id: string) => {
    console.log('selected:', id);
  };

  return <UserList users={users} onSelect={handleSelect} />;
}
```

Dan Abramov 본인이 React Hooks 도입(2019년) 이후 이 패턴을 더 이상 권장하지 않는다고 밝혔으며, 현재는 커스텀 훅을 이용한 로직 분리 패턴으로 대체된다.

## 복합 컴포넌트(Compound Component) 패턴

복합 컴포넌트(Compound Component)는 여러 하위 컴포넌트들이 협력하여 하나의 기능을 완성하는 패턴이다.

- 부모 컴포넌트가 상태를 관리하고, 하위 컴포넌트들이 Context를 통해 이를 공유한다.
- `props drilling`을 방지하고 유연한 UI 구조를 제공한다.
- 사용자가 컴포넌트의 내부 구조를 자유롭게 배치할 수 있다.

```tsx
const Select = ({ children }: { children: React.ReactNode }) => {
  const [selected, setSelected] = useState('');
  return (
    <SelectContext.Provider value={{ selected, setSelected }}>
      <div>{children}</div>
    </SelectContext.Provider>
  );
};

Select.Option = ({ value, children }: { value: string; children: React.ReactNode }) => {
  const { setSelected } = useContext(SelectContext);
  return <button onClick={() => setSelected(value)}>{children}</button>;
};

// 사용
<Select>
  <Select.Option value='a'>항목 A</Select.Option>
  <Select.Option value='b'>항목 B</Select.Option>
</Select>;
```

## 렌더 프롭(Render Prop) 패턴

렌더 프롭은 컴포넌트가 함수 형태의 prop을 받아 렌더링 로직을 외부에서 제어하도록 하는 패턴이다.

- 컴포넌트의 내부 상태나 데이터를 호출부에서 직접 활용할 수 있다.
- 훅이 도입되기 전 로직 재사용의 주요 수단이었으며, 현재는 커스텀 훅으로 대체되는 경우가 많다.
- `children`을 함수로 전달하는 방식이 일반적이다.

```tsx
type MousePosition = { x: number; y: number };

function MouseTracker({ children }: { children: (pos: MousePosition) => React.ReactNode }) {
  const [position, setPosition] = useState<MousePosition>({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent) => {
    setPosition({ x: e.clientX, y: e.clientY });
  };

  return <div onMouseMove={handleMouseMove}>{children(position)}</div>;
}

// 사용
<MouseTracker>
  {({ x, y }) => (
    <p>
      마우스 위치: {x}, {y}
    </p>
  )}
</MouseTracker>;
```

## 폴리모픽(Polymorphic) 패턴

폴리모픽 패턴은 `as` prop으로 렌더링할 HTML 요소나 컴포넌트를 동적으로 지정하는 패턴이다.

- 동일한 스타일과 동작을 유지하면서 의미론적으로 올바른 HTML 요소를 선택할 수 있다.
- TypeScript와 함께 사용하면 지정된 요소의 prop 타입을 자동으로 추론할 수 있다.

```tsx
import { ComponentPropsWithoutRef, ElementType } from 'react';

type TextProps<T extends ElementType> = {
  as?: T;
} & ComponentPropsWithoutRef<T>;

function Text<T extends ElementType = 'span'>({ as, ...props }: TextProps<T>) {
  const Component = as || 'span';
  return <Component {...props} />;
}

// 사용
<Text as='h1'>제목</Text>
<Text as='p'>문단</Text>
<Text as='label' htmlFor='input-id'>라벨</Text>
```

## 훅과 렌더링 컴포넌트 분리

React 16.8(2019년)에서 Hooks가 도입된 이후, 로직을 커스텀 훅으로 추출하고 컴포넌트는 렌더링에만 집중하는 패턴이 정착되었다.

- 비즈니스 로직과 UI를 분리하여 각각 독립적으로 테스트하고 재사용할 수 있다.
- 커스텀 훅은 상태 관리, 사이드 이펙트, 데이터 페칭을 담당한다.
- Presentational/Container 패턴의 현대적 대안으로 사용된다.

```tsx
// 로직: 커스텀 훅
function useUserList() {
  const [users, setUsers] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchUsers().then((data) => {
      setUsers(data);
      setIsLoading(false);
    });
  }, []);

  return { users, isLoading };
}

// 렌더링: 컴포넌트
function UserList() {
  const { users, isLoading } = useUserList();

  if (isLoading) return <Spinner />;
  return (
    <ul>
      {users.map((user) => (
        <li key={user.id}>{user.name}</li>
      ))}
    </ul>
  );
}
```

## asChild와 Slot 패턴

`asChild` prop은 컴포넌트의 루트 HTML 요소를 자식 컴포넌트로 교체하는 패턴이다. Radix UI가 2021년경 폴리모픽 패턴의 대안으로 고안하여 널리 알려졌다.

- `as` prop과 달리 실제 자식 컴포넌트가 루트 역할을 하므로, 불필요한 래퍼 DOM 노드가 생기지 않는다.
- 부모의 props(이벤트 핸들러, `className` 등)가 자식 컴포넌트에 병합(merge)된다.
- 이 병합 로직을 담당하는 컴포넌트가 `Slot`이다.

```tsx
import { Slot } from '@radix-ui/react-slot';

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  asChild?: boolean;
};

function Button({ asChild, ...props }: ButtonProps) {
  const Component = asChild ? Slot : 'button';
  return <Component {...props} />;
}

// button 대신 a 태그로 렌더링되면서 Button의 스타일·이벤트를 유지
<Button asChild>
  <a href='/home'>홈으로</a>
</Button>;
```

`Slot`은 단일 자식의 props를 자신의 props와 병합하여 자식 요소로 렌더링한다.

```tsx
// Slot 직접 사용 예
<Slot onClick={handleClick} className='btn'>
  <a href='/home'>홈으로</a>
</Slot>
// 렌더링 결과: <a href="/home" onClick={handleClick} className="btn">홈으로</a>
```

## 제어 컴포넌트(Controlled Component)

제어 컴포넌트(Controlled Component)는 React의 `state`가 입력 양식의 값을 제어하는 방식이다.

- 입력값과 상태가 항상 동기화되어 실시간 유효성 검사 등에 유리하다.
- React의 `onChange`는 브라우저의 `oninput`과 유사하게 동작하여 입력 시마다 상태를 업데이트한다.

```tsx
import { ChangeEvent, useState } from 'react';

function ControlledInput() {
  const [value, setValue] = useState('');

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  return <input type='text' value={value} onChange={handleChange} />;
}
```

## 비제어 컴포넌트(Uncontrolled Component)

비제어 컴포넌트(Uncontrolled Component)는 DOM 자체에서 폼 데이터를 관리하는 방식이다.

- `useRef`를 사용하여 필요할 때만 DOM 요소에서 직접 값을 읽어온다.
- 리렌더링 횟수를 줄일 수 있어 성능 최적화가 필요한 대규모 폼에 적합하다.
- `defaultValue`나 `defaultChecked` 속성으로 초기값을 설정한다.
