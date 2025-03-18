---
folderName: js_execution_context
updatedAt: 2025-02-18
title: Execution Context
tag: javascript
isPublished: true
---

# Execution Context

## Concept

![img](images/scope_1.png)

JavaScript의 실행 컨텍스트는 코드가 실행될 때 생성되는 환경을 의미한다. 이 환경은 변수, 함수 선언, 스코프 체인, 그리고 this 값과 같은 정보를 포함한다. 실행 컨텍스트는 크게 세 가지 유형으로 나뉜다: 전역 실행 컨텍스트, 함수 실행 컨텍스트, 그리고 eval 실행 컨텍스트.

1. **전역 실행 컨텍스트**: 스크립트가 처음 실행될 때 생성되며, 전역 범위에서의 코드를 관리한다. 이 컨텍스트는 프로그램이 종료될 때까지 유지된다.

2. **함수 실행 컨텍스트**: 함수가 호출될 때마다 생성된다. 각 함수 호출은 자신만의 실행 컨텍스트를 가지며, 함수 실행이 완료되면 해당 컨텍스트는 소멸된다.

3. **eval 실행 컨텍스트**: eval 함수 내에서 실행되는 코드에 대해 생성된다. 그러나 보안 및 성능 문제로 인해 eval 사용은 권장되지 않는다.

각 실행 컨텍스트는 두 단계를 거쳐 생성된다: 생성 단계와 실행 단계. 생성 단계에서는 변수와 함수 선언이 메모리에 저장되고, 스코프 체인이 형성된다. 실행 단계에서는 코드가 실제로 실행되며, 변수 할당 및 함수 호출이 이루어진다.

이러한 실행 컨텍스트는 스택 구조로 관리되며, 이를 실행 컨텍스트 스택이라고 한다. 현재 실행 중인 컨텍스트가 스택의 최상위에 위치하며, 실행이 완료되면 스택에서 제거된다. 이러한 메커니즘은 JavaScript의 비동기 처리 및 이벤트 루프와도 깊이 연관되어 있다.

실행 컨텍스트와 스코프는 서로 밀접하게 연관되어 있지만, 동일한 개념은 아니다. 실행 컨텍스트는 코드 실행 환경을 포괄적으로 설명하는 개념이며, 스코프는 변수와 함수의 접근 가능 범위를 정의하는 개념이다. 따라서 실행 컨텍스트는 스코프의 상위 개념이라기보다는, 스코프를 포함한 더 넓은 개념으로 이해하는 것이 적절하다.

### 실행 컨텍스트와 스코프의 관계

1. **실행 컨텍스트**:

   - 코드 실행 시 생성되는 환경.
   - 변수 객체(Variable Object), 스코프 체인(Scope Chain), this 값 등을 포함.
   - 전역, 함수, eval 실행 컨텍스트로 구분.

2. **스코프**:
   - 변수와 함수가 접근 가능한 범위.
   - 실행 컨텍스트 내에서 스코프 체인을 통해 구현됨.
   - 렉시컬 스코프(Lexical Scope)는 코드 작성 시점에 결정.

### 스코프 체인의 역할

- 스코프 체인은 실행 컨텍스트의 일부로, 현재 스코프에서 상위 스코프로 연결된 체인을 의미.
- 변수를 찾을 때 현재 스코프에서 시작해 상위 스코프로 올라가며 탐색.

### 결론

실행 컨텍스트는 스코프를 포함한 코드 실행 환경 전체를 설명하는 개념이며, 스코프는 그 안에서 변수와 함수의 접근 범위를 정의한다. 따라서 실행 컨텍스트는 스코프의 상위 개념이라기보다는, 스코프를 포함한 더 넓은 개념으로 이해해야 한다. 🧐

JavaScript에서 "모듈 실행 컨텍스트"라는 공식적인 용어는 존재하지 않는다. 그러나 ES6(ECMAScript 2015)에서 도입된 모듈 시스템(`import`/`export`)은 전통적인 실행 컨텍스트와는 다른 독특한 특성을 가지고 있다. 모듈은 전역 실행 컨텍스트와 유사하지만, 몇 가지 중요한 차이점이 있다.

### 모듈의 실행 환경

1. **모듈 스코프**:

   - 모듈은 자체적인 스코프를 가진다. 모듈 내에서 선언된 변수, 함수, 클래스는 기본적으로 모듈 스코프에 묶이며, 전역 스코프로 누출되지 않는다.
   - `import`와 `export`를 사용해 다른 모듈과 상호작용.

2. **엄격 모드(Strict Mode)**:

   - 모듈 코드는 기본적으로 엄격 모드로 실행된다. 따라서 `this`는 `undefined`이며, 암묵적 전역 변수 생성이 금지된다.

3. **싱글톤 실행**:

   - 모듈은 최초 로드 시 한 번만 실행된다. 이후 동일한 모듈을 `import`해도 재실행되지 않는다.

4. **비동기 로딩**:
   - 모듈은 비동기적으로 로드될 수 있으며, 이는 브라우저 환경에서 특히 중요하다.

### 모듈과 실행 컨텍스트의 관계

- 모듈은 전역 실행 컨텍스트와 유사한 환경에서 실행되지만, 독립적인 스코프와 엄격 모드 적용 등의 차이가 있다.
- 모듈은 전역 실행 컨텍스트와 별개로 생성되며, 모듈 간의 의존성은 `import`/`export`를 통해 관리된다.

### 결론

모듈 실행 컨텍스트라는 공식적인 용어는 없지만, 모듈은 독립적인 스코프와 엄격 모드 적용 등의 특성을 가진 실행 환경을 제공한다. 따라서 모듈은 전통적인 실행 컨텍스트와는 다른 독특한 실행 환경을 가진다고 볼 수 있다. 🧐

## context와 this

자바스크립트 컨텍스트와 this의 상관관계

1. 컨텍스트

자바스크립트 컨텍스트는 코드 실행 환경을 의미하며, 크게 전역 컨텍스트와 함수 컨텍스트로 나눌 수 있습니다.
컨텍스트는 변수 및 함수의 스코프를 결정하고, 호이스팅에 영향을 미치며, this 키워드의 값을 결정합니다. 2. this

this 키워드는 현재 실행 중인 코드의 컨텍스트 객체를 참조합니다.
컨텍스트 객체는 함수 컨텍스트에서는 함수 객체이며, 전역 컨텍스트에서는 전역 객체(브라우저 환경에서는 window 객체)입니다. 3. 컨텍스트와 this의 상관관계

this 키워드는 함수가 어떻게 호출되었는지에 따라 값이 결정됩니다.
함수가 독립적으로 호출되면 this는 전역 객체를 참조합니다.
함수가 객체의 메서드로 호출되면 this는 해당 객체를 참조합니다.
함수가 call(), apply(), bind() 메서드를 사용하여 호출되면 this는 첫 번째 인수로 전달된 객체를 참조합니다.

화살표 함수는 this가 없음

모듈 스코프일 경우 undefined

```js
const noObjThis = this; // window

function Func() {
  return this; // window
}
const ArrowFunc = () => {
  return this; // window
};

const obj = {
  name: 'Tomas',
  age: 30,
  objThis: this, // window
  objFunc() {
    return this; // obj
  },
  objArrowFunc: () => {
    return this; // window
  },
  nestedObjFunc1() {
    console.log(this); // obj
    return function () {
      return this; // window
    };
  },
  nestedObjFunc2() {
    console.log(this); // obj
    return () => {
      return this; // obj
    };
  },
  nestedObjFunc3: () => {
    console.log(this); // window
    return () => {
      return this; // window
    };
  },
  nestedObjFunc4: () => {
    console.log(this); // window
    return () => {
      return this; // window
    };
  },
};

function wrapperFunc1(callback, localVar1) {
  const localVar2 = 'localVar2';

  return function (...arguments) {
    console.log(localVar1);
    console.log(localVar2);
    return callback(...arguments); // window
  };
}

function wrapperFunc2(callback, localVar1) {
  const localVar2 = 'localVar2';

  return (...arguments) => {
    console.log(localVar1);
    console.log(localVar2);
    return callback(...arguments); // window
  };
}

function wrapperFunc3(callback, localVar1) {
  const localVar2 = 'localVar2';

  return function (...arguments) {
    console.log(localVar1);
    console.log(localVar2);
    return callback.call(this, ...arguments); // obj
  };
}

function wrapperFunc4(callback, localVar1) {
  const localVar2 = 'localVar2';

  return (...arguments) => {
    console.log(localVar1);
    console.log(localVar2);
    return callback.call(this, ...arguments); // window
  };
}
```

### 요약: 자바스크립트 실행 컨텍스트(Execution Context)와 콜스택(Call Stack)

1. **실행 컨텍스트(Execution Context)**

   - 실행 컨텍스트는 코드 실행에 필요한 환경 정보를 모아놓은 객체.
   - 전역 컨텍스트와 함수 컨텍스트로 구분.
   - 콜스택에 쌓여 순서와 환경을 보장.

2. **콜스택(Call Stack)**

   - FILO(First In, Last Out) 구조.
   - 전역 컨텍스트가 먼저 쌓이고, 함수 호출 시 해당 함수의 실행 컨텍스트가 쌓임.
   - 함수 실행이 끝나면 실행 컨텍스트가 제거됨.

3. **실행 컨텍스트 구성 요소**

   - **VariableEnvironment**: 현재 컨텍스트의 식별자 정보와 외부 환경 정보 저장.
   - **LexicalEnvironment**: VariableEnvironment의 초기 상태를 복사하고, 변경 사항 실시간 반영.
     - **environmentRecord**: 현재 컨텍스트의 식별자와 값 기록.
     - **outerEnvironmentReference**: 외부 환경의 LexicalEnvironment 참조 (스코프 체인).
   - **ThisBinding**: 실행 컨텍스트의 `this` 값.

4. **호이스팅(Hoisting)**

   - 변수와 함수 선언이 코드 최상단으로 끌어올려지는 것처럼 동작.
   - 실제로는 실행 컨텍스트 생성 시 `environmentRecord`에 식별자 정보를 미리 수집.

5. **스코프 체인(Scope Chain)**

   - `outerEnvironmentReference`를 통해 상위 스코프의 변수에 접근.
   - 현재 스코프에서 변수를 찾지 못하면 상위 스코프로 이동하여 탐색.

6. **ThisBinding**
   - 함수 실행 시 `this`가 가리키는 객체.
   - 메서드 내부에서는 해당 객체, 함수 표현식에서는 전역 객체를 가리킴.
   - 화살표 함수는 상위 스코프의 `this`를 그대로 사용.

### 결론

실행 컨텍스트는 자바스크립트 코드 실행의 핵심 메커니즘.  
콜스택, 호이스팅, 스코프 체인, `this` 바인딩 등을 이해하면 코드 동작 원리를 명확히 파악 가능.  
이를 통해 디버깅과 코드 최적화에 큰 도움.

---

이해하기 쉽게 요약했으니 참고 바람.
