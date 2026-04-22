---
folderName: style_animation
title: 애니메이션(Animation)
tag: style
isPublished: true
---

# Animation

- [변형 및 애니메이션(Transform • Transition • Animation)](#변형-및-애니메이션transform--transition--animation)

## 변형 및 애니메이션(Transform • Transition • Animation)

- `transform`: 회전, 크기 조절, 기울기 등을 적용함. 인라인(`inline`) 요소에서는 동작하지 않음.
- `transition`: 속성 값의 변화를 일정 시간에 걸쳐 부드럽게 표현함.
- `animation`: 키프레임(`@keyframes`)을 사용하여 복잡한 상태 변화를 정의함.

```css
/* 단일 속성 */
transition: property-name | duration | easing-function | delay;
/* 다중 속성 */
transition:
  property-name | duration | easing-function | delay,
  property-name | duration | easing-function | delay;
/* 전체 속성 */
transition: all | duration | easing-function | delay;

/* 단일 애니메이션 */
animation: duration | easing-function | delay | iteration-count | direction | fill-mode | play-state | name;
/* 다중 애니메이션 */
animation:
  duration | easing-function | delay | iteration-count | direction | fill-mode | play-state | name,
  duration | easing-function | delay | iteration-count | direction | fill-mode | play-state | name;
```
