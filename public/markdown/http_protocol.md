---
fileName: http_protocol
updatedAt: 2024-04-21
title: HTTP 통신
tag: http, network
isPublished: true
---

## fetch

클라이언트에서 네트워크 오류를 처리하는 방법은 주로 HTTP 요청을 보내는 fetch나 axios와 같은 라이브러리의 에러 핸들링을 통해 이루어집니다. 네트워크 오류는 주로 HTTP 응답 코드를 통해 감지되며, 다음은 fetch와 axios를 사용하여 네트워크 오류를 처리하는 방법입니다.

### Fetch 사용 시 네트워크 오류 처리

```javascript
fetch('https://api.example.com/data')
  .then((response) => {
    if (!response.ok) {
      // 응답 했지만 상태코드가 200대가 아닌 경우
      throw new Error('Network response was not ok');
    }
    return response.json();
  })
  .then((data) => {
    // 데이터를 사용하는 로직
  })
  .catch((error) => {
    // 응답 자체를 실패한 경우
    console.error('Fetch Error:', error);
    // 에러 처리 로직
  });
```

### Axios 사용 시 네트워크 오류 처리

```javascript
axios
  .get('https://api.example.com/data')
  .then((response) => {
    // 성공적인 응답 처리
  })
  .catch((error) => {
    if (error.response) {
      // 서버가 응답했지만 상태 코드가 실패인 경우
      console.error('Axios Response Error:', error.response.data);
    } else if (error.request) {
      // 요청이 만들어졌지만 응답을 받지 못한 경우
      console.error('Axios Request Error:', error.request);
    } else {
      // 오류를 발생시킨 요청을 설정하는 과정에서 오류가 발생한 경우
      console.error('Axios Error:', error.message);
    }
    // 에러 처리 로직
  });
```

네트워크 오류를 처리할 때, 주의해야 할 점은 클라이언트와 서버 간의 통신이 실패하거나 지연될 수 있으며, 이는 여러 가지 이유로 발생할 수 있다는 점입니다. 이에 대비하여 적절한 에러 핸들링을 구현하여 사용자 경험을 향상시키는 것이 중요합니다.

## credentials, cors

`fetch` 함수는 주로 **네트워크 요청**을 처리하기 위한 API입니다. `fetch`는 **`Promise`**를 반환하며, 네트워크 요청에 성공하면 `Promise`가 **resolve**되지만, 특정 상황에서는 **reject**가 호출됩니다.

### `fetch`가 `reject`를 호출하는 경우

`fetch` 함수가 **`reject`**를 호출하는 경우는 주로 **네트워크 수준의 오류**가 발생했을 때입니다. 즉, **요청 자체가 실패한 경우**에 `Promise`가 거부됩니다. 다음은 `reject`가 호출되는 몇 가지 주요 경우입니다.

#### 1. **네트워크 오류 (Network error)**

- 서버가 다운되었거나, 인터넷 연결이 끊어진 경우, `fetch`는 네트워크 요청 자체가 실패했으므로 `Promise`가 `reject`됩니다.
- 예시:
  ```js
  fetch('https://invalid-url.com')
    .then((response) => console.log('Success:', response))
    .catch((error) => console.log('Failed:', error)); // Network error
  ```

#### 2. **CORS 정책에 의한 차단 (CORS policy block)**

- 서버가 CORS(Cross-Origin Resource Sharing) 정책을 위반하거나 잘못 설정된 경우, 요청이 차단되면서 `fetch`는 `reject`될 수 있습니다.

#### 3. **요청 중단 (Request aborted)**

- 요청이 `AbortController`를 통해 **중단(abort)**된 경우에도 `fetch`는 `reject`됩니다.
- 예시:

  ```js
  const controller = new AbortController();
  const signal = controller.signal;

  fetch('https://example.com', { signal })
    .then((response) => console.log(response))
    .catch((err) => console.log('Fetch aborted:', err));

  // 요청 중단
  controller.abort();
  ```

### `fetch`가 `resolve`되지만 실패로 간주할 수 있는 경우

한편, `fetch`는 네트워크 요청 자체가 성공한 경우, **HTTP 상태 코드에 관계없이** `Promise`가 **resolve**됩니다. 즉, HTTP 상태 코드가 **404 (Not Found)**, **500 (Server Error)**와 같은 실패 상태 코드여도 **reject**되지 않고 **resolve**되며, `response.ok` 속성을 사용해 성공 여부를 확인해야 합니다.

#### 예시:

```js
fetch('https://example.com')
  .then((response) => {
    if (!response.ok) {
      throw new Error('HTTP error! status: ' + response.status);
    }
    return response.json();
  })
  .catch((error) => {
    console.log('Fetch failed:', error);
  });
```

### 결론

`fetch`는 네트워크 요청 자체가 **불가능**하거나, **네트워크 오류**, **CORS 차단**, **요청 중단**과 같은 **네트워크 수준의 문제**가 발생했을 때 **`reject`**가 호출됩니다. 반면, HTTP 응답 상태 코드가 4xx나 5xx와 같은 **서버 오류**인 경우에도 요청 자체는 성공했으므로 **`resolve`**됩니다. 이때는 응답 객체의 `response.ok` 속성을 확인해 처리해야 합니다.
