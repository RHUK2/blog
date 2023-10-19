# Web

- [Web](#web)
  - [웹 브라우저란?](#웹-브라우저란)
    - [렌더링 과정](#렌더링-과정)
  - [웹 서버란?](#웹-서버란)
  - [브라우저와 서버의 의사소통](#브라우저와-서버의-의사소통)
  - [브라우저의 주소 표시창에 URL을 입력했을 때 발생하는 동작](#브라우저의-주소-표시창에-url을-입력했을-때-발생하는-동작)
  - [URL(Uniform Resource Locator)](#urluniform-resource-locator)
  - [자바스크립트 등장 이전의 웹 동작 방식](#자바스크립트-등장-이전의-웹-동작-방식)
    - [자바스크립트 등장 이후의 웹 동작 방식](#자바스크립트-등장-이후의-웹-동작-방식)
    - [AJAX 등장 이전의 웹 방식](#ajax-등장-이전의-웹-방식)
    - [AJAX 등장 이후의 웹 방식](#ajax-등장-이후의-웹-방식)
  - [렌더링 방법 비교](#렌더링-방법-비교)
    - [CSR(Client Side Rendering)](#csrclient-side-rendering)
    - [SSR(Server Side Rendering)](#ssrserver-side-rendering)
    - [SSG(Static Site Generator)](#ssgstatic-site-generator)
  - [마크업 언어(Markup Language)](#마크업-언어markup-language)
    - [HTML(Hyper Text Markup Language)](#htmlhyper-text-markup-language)
    - [Markdown](#markdown)
    - [XML(eXtensible Markup Language)](#xmlextensible-markup-language)
    - [JSON(JavaScript Object Notation)](#jsonjavascript-object-notation)
    - [YAML(Yet Another Markup Language)](#yamlyet-another-markup-language)
  - [MIME 타입](#mime-타입)
  - [텍스트 데이터와 바이너리 데이터](#텍스트-데이터와-바이너리-데이터)
    - [텍스트 데이터](#텍스트-데이터)
    - [바이너리 데이터](#바이너리-데이터)
  - [HTTP 통신 시 바이너리 데이터를 다루는 방법](#http-통신-시-바이너리-데이터를-다루는-방법)
    - [Base64 인코딩해서 다루기](#base64-인코딩해서-다루기)
    - [바이너리 데이터 그대로 다루기](#바이너리-데이터-그대로-다루기)
    - [MultiPart Form-Data](#multipart-form-data)
    - [브라우저 캐시 이용하기](#브라우저-캐시-이용하기)
  - [브라우저 캐시 vs 브라우저 메모리](#브라우저-캐시-vs-브라우저-메모리)
  - [HTTP 헤더](#http-헤더)
    - [일반 헤더 (General Headers)](#일반-헤더-general-headers)
    - [요청 헤더 (Request Headers)](#요청-헤더-request-headers)
    - [응답 헤더 (Response Headers)](#응답-헤더-response-headers)
    - [표현 헤더 (Representation Headers)](#표현-헤더-representation-headers)
    - [쿠키 관련 헤더](#쿠키-관련-헤더)
    - [CORS (Cross-Origin Resource Sharing) 관련 헤더](#cors-cross-origin-resource-sharing-관련-헤더)
  - [디버깅](#디버깅)
    - [initial connection](#initial-connection)
    - [blocked:mixed-content](#blockedmixed-content)
    - [content-disposition](#content-disposition)
    - [CSS가 안 먹히는 경우](#css가-안-먹히는-경우)
    - [화면이 하얗게 뜨는 경우](#화면이-하얗게-뜨는-경우)
    - [Lightsail DB 연결](#lightsail-db-연결)

## 웹 브라우저란?

브라우저는 HTTP 프로토콜을 해석할 수 있는 프로그램이며, HTTP 요청으로 응답한 컨텐츠를 브라우저 상에 보여주는 역할을 한다. 컨텐츠는 주로 HTML, CSS, JavaScript, JSON, 이미지, 폰트, 미디어 등 여러가지가 존재하는데, 그 중에서 HTML, CSS, JavaScript는 브라우저 내부에 렌더링 엔진과 자바스크립트 엔진에 의해 파싱 되어 렌더 트리를 생성한 후 화면에 표현한다.

### 렌더링 과정

![browser_rendering](browser_rendering.png)

## 웹 서버란?

웹 서버는 HTTP 프로콜을 해석할 수 있는 프로그램이 돌아가고 있는 컴퓨터를 말한다.

아래는 기본적으로 HTTP/HTTPS 요청을 받는 웹서버를 바탕으로 하고 사용성에 따라 구분해 보았다.

API 서버: DB와 연결되어 사용자의 요청에 따라 GET/POST/PUT/DELETE 동작을 수행하는 서버

SSR 서버: DB와 연결되어 사용자의 요청에 따라 알맞은 데이터를 넣어 렌더링된 HTML 파일을 응답하는 서버

Static 서버: 사용자가 요청한 정적 파일(HTML, JavaScript, CSS, Image, Font 등)을 응답하는 서버

## 브라우저와 서버의 의사소통

```mermaid
flowchart LR
    A("Browser")
    B("Cloud Computer(IP)")
    C("Ngnix(:443)")
    D("Front-end Application Server(:3000)")
    A --> |HTML, JavaScript 등 요청| B --> |HTTPS 요청| C --> |포트 포워딩| D
    D --> |HTML, JavaScript 등 응답| C --> |HTTPS 응답| B --> |HTML, JavaScript 등 응답| A
```

```mermaid
flowchart LR
    A("Browser")
    B("Cloud Computer(Lightsail)")
    C("Ngnix(:443)")
    D("Back-end Application Server(:8080)")
    E[("Database(:3306)")]
    A --> |API 요청| B --> |HTTPS 요청| C --> |포트 포워딩| D --> |데이터 요청| E
    E --> |데이터 응답| D --> |API 응답| C --> |HTTPS 응답| B --> |API 응답| A
```

## 브라우저의 주소 표시창에 URL을 입력했을 때 발생하는 동작

![browser_url_input](browser_url_input.jpg)

## URL(Uniform Resource Locator)

![url](url.png)

URL은 말 그대로 자원(리소스)을 가리키는 지시자이다. 자원의 종류는 아래와 같다.

- 웹 페이지 (HTML 문서)
- 이미지
- 스타일 시트 (CSS)
- 스크립트 (JavaScript)
- 멀티미디어 (동영상, 오디오)
- 문서 (PDF, 문서 파일 등)
- 데이터 (JSON, XML)
- 기타 리소스 (폰트, 아이콘 등)

이 외에도 웹은 다양한 유형의 자원을 포함하고 있으며, URL을 통해 이러한 자원들에 접근할 수 있다. URL은 프로토콜(예: http, https), 호스트, 포트, 경로 및 쿼리 매개변수 등을 포함하여 자원의 위치와 접근 방법을 지정한다.

## 자바스크립트 등장 이전의 웹 동작 방식

자바스크립트가 등장하기 전의 웹은 정적인 내용으로 구성되었다. 웹 페이지의 내용은 서버에서 생성되어 클라이언트에게 전송되고, 클라이언트는 해당 내용을 받아 브라우저에서 렌더링하여 표시했다. 사용자와의 상호작용은 주로 링크를 클릭하거나 폼을 제출하는 등의 방식으로 이루어졌다. 이렇게 정적인 웹 페이지에서는 페이지 갱신이 발생하면 새로운 페이지를 서버에서 요청하고 받아와야 했다. 이로 인해 사용자 경험이 제한되었고, 웹 페이지 갱신이 느렸다.

### 자바스크립트 등장 이후의 웹 동작 방식

자바스크립트의 등장으로 웹 페이지에 동적인 기능을 추가할 수 있게 되었다. 자바스크립트는 클라이언트 측에서 실행되는 스크립트 언어로, 웹 페이지의 내용을 변경하거나 사용자와의 상호작용을 처리할 수 있다. 이로 인해 웹 페이지는 더 동적이고 반응적으로 동작할 수 있게 되었다. 예를 들어, 사용자가 버튼을 클릭하면 자바스크립트를 사용하여 페이지 내용을 변경하거나 서버와 통신하여 데이터를 동적으로 가져올 수 있다.

### AJAX 등장 이전의 웹 방식

AJAX가 등장하기 전의 웹 방식에서는 페이지 갱신이 발생할 때마다 새로운 페이지를 서버에서 요청하고 응답을 받아와 전체 페이지를 다시 렌더링했다. 이로 인해 사용자 경험이 제한되었고, 페이지 갱신 시간이 오래 걸렸다.

### AJAX 등장 이후의 웹 방식

AJAX(Asynchronous JavaScript and XML) 자바스크립트와 XML을 이용한 비동기적 데이터 교환을 의미한다. 그러나 현재에는 XML보다는 사용자 편의성이나 보안 측면에서 유리한 JSON이 보편적으로 사용된다.

AJAX의 등장으로 웹 페이지의 일부분만 갱신하거나 데이터를 비동기적으로 서버와 주고받을 수 있게 되었다. 이는 사용자 경험을 향상시키고 페이지 갱신 시간을 줄이는 데 큰 영향을 미쳤다. AJAX를 통해 데이터를 서버와 주고받을 때 페이지 전체를 새로 렌더링할 필요 없이, 필요한 부분만 업데이트할 수 있다. 이로 인해 웹 애플리케이션은 빠르고 동적인 동작을 보여줄 수 있게 되었다.

요약하면, 자바스크립트의 등장 이전에는 정적인 웹 페이지가 주를 이루었으며, 자바스크립트와 함께 웹 페이지는 동적이고 반응적인 동작을 하게 되었다. 또한, AJAX의 등장으로 웹 페이지의 일부분만 갱신하거나 데이터를 비동기적으로 주고받을 수 있게 되어 사용자 경험과 성능이 크게 향상되었다.

## 렌더링 방법 비교

### CSR(Client Side Rendering)

CSR은 클라이언트(브라우저)에서 렌더링을 한다. 한 번 요청해서 받으면 변하지 않는 정적 자산들인 빈 HTML(도화지)과 자바스크립트(붓)를 Static 서버에 요청해서 받아온 후 작성된 자바스크립트 코드에 따라 브라우저는 화면을 그리고 동적인 데이터가 들어가는 부분은 API 서버에 데이터를 요청해서 데이터를 업데이트한다.

### SSR(Server Side Rendering)

SSR은 SSR 서버에서 렌더링을 한다. SSR 서버는 첫 요청에서 초기값을 넣어 렌더링된 HTML 파일을 응답한다. 이 후 상호작용을 통해 데이터가 변경될 때 서버로 요청이 들어오면 그 시점의 알맞은 데이터를 넣어 렌더링이 완료된 HTML을 보내는 방식이다.

### SSG(Static Site Generator)

미리 작성해놓은 정적인 파일들을 Static 서버에 저장해놓고 클라이언트가 요청하면 해당 파일을 보여주는 방식이며, 동적인 변화가 불가능하다.

![compare_rendering](compare_rendering.png)

## 마크업 언어(Markup Language)

문서가 화면에 표시되는 형식을 나타내거나 데이터의 논리적인 구조를 명시하기 위한 규칙들을 정의한 언어의 일종이다. 데이터를 기술한 언어라는 점에서 프로그래밍 언어와는 분명한 차이가 있다.

### HTML(Hyper Text Markup Language)

HTML은 태그를 사용하여 웹 페이지의 구조와 내용을 정의합니다. 제목, 단락, 링크, 이미지, 양식 등 다양한 요소를 지원합니다. HTML 문서는 웹 브라우저에 의해 시각적으로 표시됩니다.

### Markdown

Markdown은 간단한 구문 (강조를 위한 별표, 제목을 위한 해시태그 등)을 사용하여 일반 텍스트를 구조화된 콘텐츠로 서식 지정합니다. 원시 형식으로 읽기 쉽고, 게시를 위해 HTML이나 다른 형식으로 변환할 수 있습니다. Markdown은 HTML만큼 다양한 기능을 제공하지는 않지만, 기본 콘텐츠를 간단하고 빠르게 생성하는 데 적합합니다.

### XML(eXtensible Markup Language)

기존의 HTML과 달리 웹상에서 구조화된 문서를 전송가능하도록 설계되었다. 이게 무슨 뜻이냐면 예를 들어 HTML에서는 "CPU 2.83GHz"라는 데이터를 표기할 때 어디부터가 데이터 명이고 어디부터가 실제 데이터인지 표시할 수 있는 마땅한 방법이 없다.

이런 문제를 해결하기 위해 XML을 이용하면 어디부터 어디까지가 데이터 이름이고 어디부터 어디까지가 실제 데이터이며 어디부터 어디까지가 데이터 단위인지도 표현이 가능하다. 즉, 데이터에 의미를 부여하는 메타데이터를 기술할 수 있다. XML은 바로 이러한 목적으로 탄생했다. 위의 예를 XML로 바꾸면 데이터 명은 `<dataname>CPU</dataname>`가 되고 데이터 값은 `<datavalue>2.83</datavalue>`이 된다.

이런 XML의 특징은 수많은 종류의 데이터를 유연하고 자유롭게 기술하는 데 적용할 수 있어서 다양한 용도로 응용할 수 있으며, 인터넷으로 연결된 시스템끼리 쉽게 식별 가능한 데이터를 주고받을 수 있게 된다. 게임 모드 등을 시도해 봤다면 설정파일이 XML로 된 것을 본 경험이 있을 것이다.

### JSON(JavaScript Object Notation)

서버와 클라이언트간의 데이터를 교환할 때 사용하는 데이터 포맷이다. 클라이언트가 사용하는 언어에 관계 없이 통일된 데이터를 주고받을 수 있도록, 일정한 패턴을 지닌 문자열을 생성해 내보내면 클라이언트는 그를 해석해 데이터를 자기만의 방식으로 온전히 저장, 표시할 수 있게 된다.

과거 웹 초기 시절부터 사용된 XML은 헤더와 태그 등의 여러 요소로 가독성이 떨어지고, 쓸데없이 용량을 잡아먹는다는 단점을 항상 지적받았다. 이에 대응해 간결하고 통일된 양식으로 각광을 받고 있는 것이 JSON이다.

`{ }`​은 객체를 의미하며, `[ ]`은 배열, 객체 안에 객체를 넣을 수도 있어서 XML처럼 복잡한 구조 또한 표현이 가능하다. 표현할 수 있는 값의 자료형은 `{ }​`로 표기되는 객체, `[ ]`로 표기되는 배열, 문자열, 숫자, 불리언, `null`로 6가지가 전부다. 또한 `null`의 존재에서 알 수 있듯, JSON은 JavaScript 이외의 언어에서 사용될 상황을 다분히 고려하고 있다.

### YAML(Yet Another Markup Language)

기존에 주로 사용되던 포맷인 JSON의 불편함을 해소하기 위해 만들어진 superset(상위 호환)이다.

## MIME 타입

MIME(Multipurpose Internet Mail Extensions) 타입은 파일의 형식이나 유형을 식별하기 위한 표준화된 문자열이다. MIME 타입은 주로 웹에서 사용되며, 웹 브라우저와 서버가 파일의 내용을 올바르게 처리하도록 도와준다. MIME 타입은 파일의 확장자나 내용의 특성에 따라 결정되며, 파일의 실제 형식을 정확하게 식별할 수 있도록 도와준다.

- multipart/form-data: 여러 데이터 유형(텍스트, 이미지, 파일 등)을 동시에 HTTP 요청으로 전송할 수 있으며 주로 파일 업로드와 폼 데이터 전송에 사용됨
  - 각 파트에 Content-Type 및 Content-Disposition 헤더가 부여됨
- application/json: JSON 데이터를 요청 보낼 때 사용
- application/octet-stream 아무런 특별한 분류나 변환 없이 원시 바이트 데이터로 이루어진 스트림
- application/x-www-form-urlencoded: 웹 폼 데이터를 URL 인코딩하여 서버로 전송
- application/JavaScript
- application/xml
- application/zip
- application/pdf
- application/sql
- application/graphql
- application/ld+json
- application/msword (.doc)
- application/vnd.openxmlformats-officedocument.wordprocessingml.document(.docx)
- application/vnd.ms-excel (.xls)
- application/vnd.openxmlformats-officedocument.spreadsheetml.sheet (.xlsx)
- application/vnd.ms-powerpoint (.ppt)
- application/vnd.openxmlformats-officedocument.presentationml.presentation (.pptx)
- application/vnd.oasis.opendocument.text (.odt)
- audio/mpeg
- audio/vorbis
- text/css
- text/html
- text/csv
- text/plain
- image/png
- image/jpeg
- image/gif

## 텍스트 데이터와 바이너리 데이터

컴퓨터에 저장되는 모든 데이터의 궁극적인 저장 및 표현 형태는 바이너리다. 그렇기 때문에 텍스트 데이터도 기본적으로는 바이너리 형태로 저장된다. 그러나 "텍스트 데이터"와 "바이너리 데이터"라는 용어의 차이점은 그 데이터의 해석 및 사용 방식에 기인한다.

### 텍스트 데이터

텍스트 데이터는 일반적으로 사람이 읽을 수 있는 문자로 된다. 이 텍스트들은 텍스트 전용 인코딩 방식 (예: UTF-8, ASCII, ISO-8859-1 등)을 사용하여 바이트로 변환된다. 텍스트 파일을 열 때, 우리는 이 바이트들을 해당 인코딩 방식을 사용하여 다시 문자로 디코딩한다.

대부분의 프로그램에서는 텍스트 편집 기능과 텍스트 인코딩&디코딩을 지원하기 때문에 텍스트 데이터는 대부분 표현이 된다.

### 바이너리 데이터

바이너리 데이터는 이미지, 음악 파일, 프로그램 실행 파일처럼 사람이 직접 읽기 어려운 데이터를 말한다. 이 데이터도 0과 1로 구성되어 있지만, 텍스트 에디터로 열면 의미 없는 기호나 문자로 보인다. 이 데이터를 제대로 보려면 해당 형식을 이해할 수 있는 프로그램이 필요하다. 예를 들어, 이미지 뷰어로 이미지 파일을 열거나 뮤직 플레이어로 음악 파일을 들을 수 있다.

## HTTP 통신 시 바이너리 데이터를 다루는 방법

### Base64 인코딩해서 다루기

바이너리 데이터를 Base64로 인코딩해서 텍스트 데이터로 변경 후 이를 HTTP 요청 시 body 값의 JSON 형태로 전송한다.

HTTP 응답 시 바이너리 데이터를 받아서 Base64로 인코딩해서 사용하거나, Base64 포맷으로 데이터를 받아서 사용할 수 있다.

이 방식은 데이터의 크기를 약 33% 정도 증가시키기 때문에 파일의 크기가 작을 때 사용하는 것이 좋다.

### 바이너리 데이터 그대로 다루기

Content-Type 헤더를 "application/octet-stream"으로 설정 후 body ㄱ
blob -> createObjectUrl

### MultiPart Form-Data

MultiPart Form-Data는 여러 부분으로 나누어진 데이터를 전송하는 방식입니다. 바이너리 데이터는 다른 필드와 함께 멀티파트 폼 데이터 형식으로 요청에 추가된다.
blob -> createObjectUrl

### 브라우저 캐시 이용하기

<img src>

## 브라우저 캐시 vs 브라우저 메모리

저장 내용: 브라우저 캐시는 웹 페이지에서 사용되는 이미지, 스크립트, 스타일시트, 폰트 및 기타 웹 자원을 저장한다.
용도: 브라우저 캐시는 동일한 자원을 나중에 다시 다운로드하지 않고 재사용할 수 있도록 돕는다. 이로써 렌더링 속도를 높이고 대역폭 사용을 줄이는 데 사용된다.
저장 위치: 브라우저 캐시는 주로 디스크 공간에 저장된다. 캐시된 데이터는 브라우저의 캐시 폴더에 저장되며, 디스크에 캐싱된다.
유지 기간: 캐시된 데이터는 보통 웹 서버에서 지정한 만료 기간 또는 캐시 제어 헤더를 기반으로 관리됩니다. 만료 기간이 지나면 브라우저는 데이터를 새로 다운로드합니다.
Google Chrome: C:\Users\<사용자 이름>\AppData\Local\Google\Chrome\User Data\Default\Cache

저장 내용: 브라우저 메모리는 JavaScript 코드, DOM (문서 객체 모델) 요소, 변수 및 객체와 같은 웹 페이지의 실행에 필요한 데이터를 저장한다.
용도: 브라우저 메모리는 웹 페이지의 동적 상태를 관리하고 JavaScript 코드가 실행 중에 필요한 데이터와 변수를 저장한다. 이것은 웹 페이지의 실행 환경을 제어하는 데 사용된다.
저장 위치: 브라우저 메모리는 RAM (Random Access Memory) 내에 저장된다. 이것은 빠르게 액세스할 수 있는 메모리로, 웹 페이지의 실행에 필요한 데이터와 코드를 저장한다.
유지 기간: 브라우저 메모리에 저장된 데이터 및 객체는 해당 웹 페이지나 웹 애플리케이션의 실행 중에만 유지됩니다. 웹 페이지를 새로 고치거나 닫을 때 메모리에서 데이터가 제거됩니다.

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

## 디버깅

### initial connection

리액트 프로젝트를 배포 후에 사이트에 접속해보니 사이트가 매우 느리게 로드되었다. 거의 체감상 30초 정도 걸린 것 같다.

처음에는 SPA니까 첫 로드가 오래 걸린다 생각했지만, 그러기엔 번들 파일의 크기가 1.2MB정도였다. 개발 중에 급하게 폰트를 적용했었는데 해당 폰트가 경량화 폰트가 아니라서 폰트 용량 문제라고 생각했으나, 경량화 폰트를 적용해도 해당 이슈는 사라지지 않았다.

그래서 개발자 도구를 좀 더 디테일하게 살펴보니 진입점 파일인 index.html을 불러오는데 약 20초 정도가 걸렸다. 원인은 아래 사진과 같이 initial connection 이슈였다. 이걸 보니 단순히 프론트 쪽에 코드를 수정해서 될 일이 아니라 네트워크 쪽 이슈 같았다. 백엔드 개발자가 도메인 연결 쪽을 검토해줬는데 연결한 도메인이 다른 IP에도 연결되어 있어서 해당 IP를 잘 찾지못해서 일어난 이슈였다.

![initial_connection](initial_connection.png)

해당 이슈가 다시 발생한다면 도메인 연결을 검토해보자.

### blocked:mixed-content

https 사이트에서 http 통신을 할 경우 발생한다.

### content-disposition

content-dispositon의 경우 서버에서 값을 노출시켜주지 않으면 axios에서 보여지지 않으므로 설정을 따로 해야한다.

Access-Control-Expose-Headers: Content-Disposition
Content-Type: application/octet-stream
Content-Disposition: attachment; filename="example.dat"

### CSS가 안 먹히는 경우

사용자의 브라우저 버전이 낮을 경우 해당 요소에 적용된 스타일이 지원이 안되는 경우가 있다. 브라우저 업데이트를 요구한다.

### 화면이 하얗게 뜨는 경우

자바스크립트에서 메서드 참조를 못하거나 값을 참조하지 못했을 때 발생할 확률이 크다

### Lightsail DB 연결

Lightsail의 DB는 동일한 Lightsail 계정에 있는 Lightsail 리소스(인스턴스, 로드 밸런서 등)에서만 액세스할 수 있다. 그래서 SSH Tunnel이 필요하다. 일반적으로 공개되어 있는 Lightsail 인스턴스와 공개적으로 액세스할 수 없는 Lightsail DB를 생성하여 연결한다. 다만 Lightsail DB를 퍼블릭 모드로 설정한다면 데이터베이스 접속 정보만으로 접속 가능하다.
