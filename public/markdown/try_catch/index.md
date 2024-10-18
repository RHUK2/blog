---
folderName: try_catch
updatedAt:
title: try_catch
tag: javascript
isPublished:
---

## try/catch

에러가 발생하면 스크립트가 중단되고 콘솔에 에러가 출력된다. 스크립트가 중단되는 것을 방지하기 위해 `try/catch`문이 사용된다. 유효한 코드에서 발생하는 에러만 처리 가능하다.

### 실행 동작의 에러 여부와 상관없이 실행시키고 싶은 코드가 있을 때 finally

### 사용자가 직접 에러 객체를 던지고 싶을 때 throw

throw했는데 받아주는 곳 없으면 프로그램 종료되니 조심

<!-- todo: 내용 보완 필요 -->

### TypeError

```js
let undefinedVariable;
undefinedVariable.someMethod();
```

```js
try {
  let undefinedVariable;
  undefinedVariable.someMethod();
} catch (error) {
  console.error(error.message);
}
```

### ReferenceError

```js
console.log(nonExistentVariable);
```

```js
try {
  console.log(nonExistentVariable);
} catch (error) {
  console.error(error.message);
}
```

### SyntaxError

```js
JSON.parse('string');
```

```js
try {
  JSON.parse('string');
} catch (error) {
  console.error(error.message);
}
```

### RangeError

```js
let arr = new Array(-1);
```

```js
try {
  let arr = new Array(-1);
} catch (error) {
  console.error(error.message);
}
```
