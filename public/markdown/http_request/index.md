---
folderName: http_request
updatedAt:
title: 다양한 HTTP 요청 방법
tag: network
isPublished:
---

## HTTP 헤더

HTTP 헤더는 요청과 응답 모두에 사용되며, 다양한 메타데이터와 제어 정보를 전송하는 데 사용된다. 실무에서 자주 사용되는 HTTP 헤더 속성은 다음과 같다

### 일반 헤더 (General Headers)

Cache-Control: 캐싱 동작을 지정합니다.
Connection: 네트워크 연결 관리를 위한 지시어를 제공합니다.
Date: 메시지가 생성된 날짜와 시간을 나타냅니다.

### 요청 헤더 (Request Headers)

Accept: 클라이언트가 이해할 수 있는 미디어 타입을 나타냅니다.
Authorization: 사용자 인증 정보를 포함합니다.
Host: 요청의 대상 서버와 포트 번호를 나타냅니다.
User-Agent: 클라이언트 응용 프로그램의 정보를 제공합니다.
Referer: 현재 요청 URL을 호출한 이전 웹 페이지의 URL을 나타냅니다.

### 응답 헤더 (Response Headers)

Location: 새로운 URL로 리다이렉션하는 데 사용됩니다.
Server: 웹 서버의 소프트웨어 정보를 나타냅니다.
WWW-Authenticate: 클라이언트에게 인증 방법을 알려주는 데 사용됩니다.

### 표현 헤더 (Representation Headers)

Content-Type: 본문의 미디어 타입을 나타냅니다.
Content-Length: 응답 본문의 길이를 바이트 단위로 나타냅니다.
Content-Encoding: 본문 데이터의 인코딩 방식을 나타냅니다.
Content-Disposition: 본문을 표시할 것인지, 파일로 다운로드할 것인지를 나타내는 지시어를 포함합니다.

### 쿠키 관련 헤더

Set-Cookie: 서버에서 클라이언트로 쿠키를 전송하는 데 사용됩니다.
Cookie: 클라이언트에서 서버로 쿠키를 전송하는 데 사용됩니다.

### CORS (Cross-Origin Resource Sharing) 관련 헤더

Access-Control-Allow-Origin: 리소스에 액세스할 수 있는 외부 도메인을 지정합니다.
Access-Control-Allow-Methods: 허용되는 HTTP 메서드를 지정합니다.
Access-Control-Allow-Headers: 허용되는 헤더를 지정합니다.

## 외부 API 연동

보통 외부 서비스에서 만든 API를 사용하기 위해서는 서비스 제공자가 제공해주는 API 키를 요청에 함께 보내야한다.

그래야 신뢰성 있는 사용자인지 파악이 가능하기 때문이다.

보통 오픈된 API의 경우에는 따로 API 키가 필요하지 않다.

무튼 외부에 무언가와 소통할 때는 거기서 주는 어떠한 신뢰를 증명하는 것을 받고 그걸 같이 보여주는 식이다.

## fetch vs axios vs XMLHttpRequest vs form action

## curl

## script src

## img src

## browser 주소창

## form action

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

axios와는 다름

### 결론

`fetch`는 네트워크 요청 자체가 **불가능**하거나, **네트워크 오류**, **CORS 차단**, **요청 중단**과 같은 **네트워크 수준의 문제**가 발생했을 때 **`reject`**가 호출됩니다. 반면, HTTP 응답 상태 코드가 4xx나 5xx와 같은 **서버 오류**인 경우에도 요청 자체는 성공했으므로 **`resolve`**됩니다. 이때는 응답 객체의 `response.ok` 속성을 확인해 처리해야 합니다.

## 멀티미디어 태그의 src 속성

HTML 태그 중 `<img />`, `<video />`, `<audio />`와 같은 멀티미디어 태그들은 `src` 속성을 입력해야 한다.

- HTML 파싱: 브라우저는 HTML 문서를 파싱하고, 멀티미디어 태그를 만나면 멀티미디어를 로드해야 함을 인식한다. 멀티미디어 태그의 src 속성에 지정된 URL로 리소스를 찾는다.

- 리소스 요청: 브라우저는 멀티미디어 태그의 src 속성에 지정된 URL로 HTTP GET 요청을 생성하여 리소스를 서버에 요청한다.

- 서버 응답: 서버는 리소스 요청을 받고, 해당 리소스를 찾아 브라우저에 응답한다. 서버 응답은 HTTP 상태 코드와 리소스 데이터로 구성된다.

- 리소스 다운로드: 브라우저는 서버로부터 받은 리소스를 다운로드하고 메모리에 저장한다. 이 과정에서 리소스의 크기와 형식에 따라 시간이 소요될 수 있다.

- 멀티미디어 렌더링: 멀티미디어 다운로드가 완료되면 브라우저는 리소스를 렌더링하여 화면에 표시한다.

- 캐싱: 리소스가 캐시 가능한 경우, 브라우저는 리소스를 로컬 캐시에 저장하여 나중에 동일한 리소스에 대한 요청 시 네트워크 요청을 피할 수 있다. 리소스의 캐시 유효 기간은 서버의 응답 헤더에서 제공된다.

- 오류 처리: 만약 리소스를 찾을 수 없거나 다운로드 중에 오류가 발생하면 브라우저는 대체 텍스트(alt 속성의 값)나 기본 오류 리소스를 표시할 수 있다.

### 외부 서버 주소로 파일 요청

가장 흔한 경우는 외부 정적 자산 서버에서 호스팅되는 외부 이미지 파일의 URL을 `src` 속성에 지정하는 것이다.

```html
<img src="https://www.example.com/images/myimage.jpg" alt="My Image" />
```

### 현재 웹 페이지와 동일한 서버인 경우 상대 경로

파일이 현재 웹 페이지와 동일한 서버에 있는 경우, 상대 경로를 사용하여 `src` 속성에 지정할 수 있다.

```html
<img src="images/myimage.jpg" alt="My Image" />
```

### Base64 인코딩

파일을 Base64로 인코딩하여 `src` 속성에 지정할 수 있다. 큰 이미지의 경우 데이터 URL은 페이지 크기를 크게 늘릴 수 있다.

```html
<img src="data:images/image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAA..." alt="Base64 Image" />
```
