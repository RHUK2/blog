---
folderName: prototype
updatedAt: 2024-04-29
title: Prototype
tag: javascript
isPublished: true
---

# Prototype

![img](images/prototype_1.gif)
![img](images/prototype_2.png)
![img](images/prototype_3.gif)
![img](images/prototype_4.gif)
![img](images/prototype_5.gif)
![img](images/prototype_6.gif)
![img](images/prototype_7.gif)
![img](images/prototype_8.png)
![img](images/prototype_9.gif)
![img](images/prototype_10.gif)

## class

```js
class MyClass {
  prop = value; // 프로퍼티(instance 속성)
  static prop = value; // (class 속성)

  constructor(...) { // 생성자 메서드(prototype 속성)
    // ...
  }

  method(...) {} // 메서드(prototype 속성)

  get something(...) {} // getter 메서드(prototype 속성)
  set something(...) {} // setter 메서드(prototype 속성)

  [Symbol.iterator]() {} // 계산된 이름(computed name)을 사용해 만드는 메서드 (심볼)(prototype 속성)
  // ...
}
```
