```ts
html,
body {
    height: 100%;
}
```

이후 각 페이지마다 main 높이를 minHeight: 100%, height: 100%를 유동적으로 적용한다.

그 중 중요한 것 하나는 페이지 내 <form> 요소의 id를 받을 수 있는 form 특성으로, <form> 바깥의 <fieldset> 요소를 해당 양식에 포함해야 할 때 사용합니다. 다른 하나는 disabled로, <fieldset>의 모든 콘텐츠를 한 번에 비활성화할 수 있습니다.
