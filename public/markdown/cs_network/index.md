---
folderName: cs_network
updatedAt: 2025-03-13
title: 네트워크
tag: cs
isPublished: true
---

# 네트워크

- [논 스트림 방식 • 스트림 방식](#논-스트림-방식--스트림-방식)
  - [버퍼(Buffer)](#버퍼buffer)
- [MIME(Multipurpose Internet Mail Extensions)](#mimemultipurpose-internet-mail-extensions)
- [SMTP](#smtp)
- [서버와 클라이언트의 개념](#서버와-클라이언트의-개념)
- [포트](#포트)
  - [질문 1: 도메인을 구매하면 서브도메인은 무수히 많이 생산 가능?](#질문-1-도메인을-구매하면-서브도메인은-무수히-많이-생산-가능)
    - [세부 사항](#세부-사항)
  - [질문 2: 도메인과 서브도메인 모두 DNS 레코드 연결 가능?](#질문-2-도메인과-서브도메인-모두-dns-레코드-연결-가능)
    - [예](#예)
    - [주요 항목](#주요-항목)
    - [예시](#예시)
  - [질문 3: 많은 서브도메인을 하나의 IP에 연결해서 리버스 프록시로 각기 다른 포트로 도달하게 가능?](#질문-3-많은-서브도메인을-하나의-ip에-연결해서-리버스-프록시로-각기-다른-포트로-도달하게-가능)
    - [동작 방식:](#동작-방식)
    - [구성 예:](#구성-예)
  - [장점:](#장점)
  - [추가 주의점:](#추가-주의점)
  - [결론:](#결론)
- [도메인](#도메인)
- [CDN](#cdn)

## 논 스트림 방식 • 스트림 방식

▾ 논 스트림 방식

- 논 스트림 방식에서는 서버로부터 자원(예: HTML, JSON, 이미지 등)을 요청하면, 브라우저는 해당 데이터가 완전히 수신될 때까지 기다린 뒤, 그 이후에 렌더링이나 후속 작업을 시작한다.

- 동작 과정

  1. 클라이언트(브라우저)가 서버에 HTTP 요청을 보냄.
  2. 서버가 응답을 준비하고, 전체 데이터를 한 번에 전송.
  3. 브라우저는 데이터가 모두 도착할 때까지 대기.
  4. 데이터 수신이 완료되면 이를 파싱하거나 렌더링.

- 특징

  - 데이터가 완전한 상태로 도착하므로, 처리 로직이 단순하고 안정적임.
  - 데이터 크기가 크거나 네트워크 속도가 느리면 응답 시간이 길어질 수 있음.

▾ 스트림 방식

- 스트림 방식에서는 데이터를 한 번에 모두 받는 대신, 작은 조각(chunk) 단위로 나누어 데이터가 도착하는 대로 즉시 처리할 수 있어 대기 시간이 줄어든다.

- 동작 과정

  1. 클라이언트가 서버에 요청을 보냄.
  2. 서버가 데이터를 스트림 형태로 전송.
  3. 브라우저는 데이터 조각이 도착할 때마다 실시간으로 처리.
  4. 모든 데이터가 도착하지 않아도 작업을 시작할 수 있음.

- 특징

  - 대용량 데이터나 실시간 데이터를 효율적으로 처리 가능. 초기 응답 시간이 빠르고, 메모리 사용이 최적화됨.
  - 구현이 더 복잡하고, 데이터가 순차적으로 도착하므로 중간에 오류가 발생하면 처리가 까다로울 수 있음.

### 버퍼(Buffer)

- 브라우저는 수신된 데이터 조각을 버퍼라는 임시 저장소에 저장한다.
- 버퍼는 단기적인 재생을 위한 임시 메모리일 뿐, 디스크에 영구 저장되는 캐시와는 다르다.
- 버퍼의 크기는 처리 속도와 데이터 도착 속도에 따라 동적으로 조절될 수 있다.

- 버퍼 동작과정

  1. 서버는 데이터를 작은 조각 단위로 브라우저에 전송하면 브라우저는 이 데이터를 버퍼에 채운다.
  2. 버퍼에 데이터가 충분히 쌓이면 처리가 시작되고, 처리됨에 따라 버퍼에서 데이터가 소진된다.
  3. 동시에 브라우저는 네트워크를 통해 새로운 데이터를 계속 받아와 버퍼를 채운다. 이 과정에서 네트워크 속도가 느리면 버퍼가 비워지는 속도가 빨라져 버퍼링 상태(재생 중단)가 발생할 수 있다.
  4. 브라우저는 버퍼에 최소한의 데이터를 유지하려고 한다. 이를 최소 버퍼 임계값이라고 하는데, 이 값에 도달하면 재생을 멈추고 데이터를 더 채우기를 기다린다.
  5. 반대로 버퍼가 가득 차면, 브라우저는 서버에 데이터 전송을 일시적으로 느리게 요청하거나 중단할 수 있다.

## MIME(Multipurpose Internet Mail Extensions)

- MIME 타입은 파일의 형식이나 유형을 식별하기 위한 표준화된 문자열이다.
- 형태는 type/subtype(주요 콘텐츠 유형/해당 유형의 구체적인 하위 분류)이다.

▾ `multipart/form-data`

- 여러 데이터 유형(텍스트, 이미지, 파일 등)을 동시에 HTTP 요청의 `body` 값으로 전송할 수 있으며 주로 파일 업로드와 폼 데이터를 같이 전송할 때 사용된다.
- 각 파트에 `Content-Type` 및 `Content-Disposition` 헤더가 부여된다.
- 자바스크립트에서 바이너리 데이터를 다룰 때 `blob` 객체로 다뤄지는데 `multipart/form-data`를 사용하면 해당 객체를 자동으로 바이너리 데이터로 변환하고 서버로 전송한다.

![img](images/payload_multipart1.png)

![img](images/payload_multipart2.png)

▾ `application/json`

- HTTP 요청의 `body` 값으로 JSON 데이터를 보낼 때 사용한다.

![img](images/payload_json1.png)

- 바이너리 데이터를 Base64 형식으로 인코딩해서 보내는 경우는 아래와 같다.

![img](images/payload_json2.png)

▾ `application/octet-stream`

- HTTP 요청의 `body` 값으로 아무런 특별한 분류나 변환 없이 원시 바이트 데이터로 이루어진 스트림을 전송할 때 사용한다.
- 어떤 종류의 파일인지 알 수 있는 바이너리 데이터는 다른 MIME 타입을 사용해서 명시해준다.
- 자바스크립트에서 바이너리 데이터를 다룰 때 `blob` 객체로 다뤄지는데 `application/octet-stream`을 사용하면 해당 객체를 바이너리 데이터로 변환 후에 서버로 전송해야 한다.

![img](images/payload_octet_stream.png)

▾ `application/x-www-form-urlencoded`

- HTML 폼 방식으로 HTTP 요청을 할 때 기본값으로 설정되며, HTTP 요청의 `body` 값으로 데이터를 URL 인코딩하여 보낼 때 사용한다.

![img](images/payload_form_urlencoded1.png)

![img](images/payload_form_urlencoded2.png)

▾ etc

- application/xml
- application/zip
- application/pdf
- application/sql
- application/json
- application/graphql
- application/javaScript
- application/msword (.doc)
- application/vnd.openxmlformats-officedocument.wordprocessingml.document(.docx)
- application/vnd.ms-excel (.xls)
- application/vnd.openxmlformats-officedocument.spreadsheetml.sheet (.xlsx)
- application/vnd.ms-powerpoint (.ppt)
- application/vnd.openxmlformats-officedocument.presentationml.presentation (.pptx)
- text/css
- text/csv
- text/html
- text/plain
- audio/wav
- audio/ogg
- audio/mpeg
- video/mp4
- video/webm
- video/quicktime
- image/gif
- image/svg
- image/jpeg
- image/webp

## SMTP

POP3

IMAP

SMTP

## 서버와 클라이언트의 개념

웹 서버, 이메일 서버 등 특정 프로토콜을 이용해서 통신이 필요한

## 포트

1 ip 1 A domain
N C domain 1 A domain

1 server process 1 port listening
1 client process no port listening

CNAME 레코드를 고정 IP 주소에 직접 매핑하는 것은 DNS(Domain Name System)에서 허용되지 않는 동작입니다. 이렇게 할 경우 다음과 같은 문제가 발생할 수 있습니다:

1. DNS 구조 규칙 위반: DNS에서 CNAME 레코드는 다른 도메인 이름에 대한 별칭으로 사용되어야 합니다. 직접적인 IP 주소에 대한 CNAME 레코드는 DNS의 구조 규칙을 위반하며, 일반적으로 허용되지 않습니다.

2. DNS 오류 및 불일치: DNS 서버가 CNAME 레코드를 고정 IP 주소에 직접 매핑하도록 설정된 경우, DNS 오류가 발생할 수 있습니다. 또한, 이러한 설정은 DNS 쿼리에 대한 응답이 예상대로 되지 않도록 만들 수 있습니다.

3. 유지보수 및 관리의 어려움: 고정 IP 주소를 직접적으로 CNAME 레코드에 매핑하는 것은 DNS의 목적과 용도에 맞지 않으며, 유지보수와 관리를 어렵게 만들 수 있습니다. 이는 IP 주소 변경 시 DNS 레코드를 업데이트하는 작업을 더욱 복잡하게 만들 수 있습니다.

따라서 고정 IP 주소를 직접적으로 CNAME 레코드에 매핑하는 것은 일반적으로 권장되지 않습니다. 대신, 해당 도메인 이름을 서비스하는 호스트의 도메인 이름에 대한 CNAME 레코드를 사용하는 것이 바람직합니다.

### 질문 1: 도메인을 구매하면 서브도메인은 무수히 많이 생산 가능?

네, 일반적으로 도메인 하나를 구매하면 서브도메인은 제한 없이 생성이 가능합니다. 즉, `example.com` 도메인을 구매하면 `sub1.example.com`, `sub2.example.com`, `sub3.example.com` 등을 마음껏 생성할 수 있습니다.

#### 세부 사항

- 서브도메인의 생성은 실제로 도메인 관리 시스템(DNS 설정)을 통해 필요에 따라 추가 설정하는 작업입니다.
- 대부분의 도메인 등록 업체와 DNS 관리 시스템에서는 서브도메인 생성에 제한을 두지 않으며, 추가 비용 없이 무제한으로 서브도메인을 구성할 수 있습니다.
- 단, 서버나 하드웨어 리소스 사용 측면에서는 생성된 서브도메인을 실제로 올바르게 운영하려면 서브도메인을 처리할 서버의 리소스와 네트워크 설정이 적절해야 합니다.

### 질문 2: 도메인과 서브도메인 모두 DNS 레코드 연결 가능?

네, 도메인(루트 도메인)과 서브도메인 모두 각각의 DNS 레코드를 설정하고 연결할 수 있습니다.

#### 예

1. 루트 도메인:

   - `example.com` → A 레코드로 특정 IP 주소 연결 가능.
   - `example.com` → CNAME 레코드로 다른 도메인 이름과 연결 가능.

2. 서브도메인:
   - `api.example.com` → A 레코드로 특정 IP를 연결하거나 CNAME 레코드로 다른 도메인으로 링크 가능.
   - `blog.example.com` → TXT, MX, A 등의 레코드와 함께 설정할 수 있음.

#### 주요 항목

- 도메인과 서브도메인은 독립적으로 레코드를 설정할 수 있어 각각 다른 서비스를 실행할 수 있습니다.
- 서브도메인을 CNAME 레코드로 참조하거나 별도의 서버(IP 주소)로 연결하는 것도 가능합니다.
- 루트 도메인에서 A 레코드를 설정하거나 CNAME을 사용할 때의 제한이란 점도 있습니다. (예 루트 도메인은 CNAME과 A 레코드를 동시에 사용할 수 없음).

#### 예시

| 도메인 이름        | DNS 레코드 타입 | 연결 대상        |
| ------------------ | --------------- | ---------------- |
| `example.com`      | A               | 123.45.67.89     |
| `api.example.com`  | CNAME           | api-backend.com  |
| `blog.example.com` | A               | 234.56.78.90     |
| `shop.example.com` | CNAME           | shop.service.com |

---

### 질문 3: 많은 서브도메인을 하나의 IP에 연결해서 리버스 프록시로 각기 다른 포트로 도달하게 가능?

답변:  
네, 가능합니다.  
이는 리버스 프록시 서버(예: Nginx 또는 Apache)를 사용하여 설정할 수 있습니다. 서브도메인은 하나의 공통 IP로 요청을 보내고, 요청이 도착한 이후의 처리는 리버스 프록시가 전달 경로를 결정하도록 설정하는 방식입니다.

#### 동작 방식:

1. 여러 서브도메인(`sub1.example.com`, `sub2.example.com`, 등)을 하나의 공용 IP 주소로 DNS에서 연결합니다.  
   (예: `A` 레코드에서 모든 서브도메인을 동일한 IP로 연결)
2. 리버스 프록시 서버(Nginx, Apache 등)가 동일한 IP와 포트를 듣고 있다가, 도메인 이름(Host 헤더)를 기준으로 각기 다른 포트 또는 백엔드 서버로 요청을 전달합니다.

#### 구성 예:

1. DNS 설정:

   ```text
   A  sub1.example.com → 123.45.67.89
   A  sub2.example.com → 123.45.67.89
   A  sub3.example.com → 123.45.67.89
   ```

2. 리버스 프록시 설정 (Nginx):
   Nginx에서는 `server` 지시문을 사용하여 호스트 이름에 따라 요청을 분기할 수 있습니다.

   ```nginx
   # sub1.example.com → 8081로 전달
   server {
       listen 80;
       server_name sub1.example.com;
       location / {
           proxy_pass http://localhost:8081;
       }
   }

   # sub2.example.com → 8082로 전달
   server {
       listen 80;
       server_name sub2.example.com;
       location / {
           proxy_pass http://localhost:8082;
       }
   }

   # sub3.example.com → 8083로 전달
   server {
       listen 80;
       server_name sub3.example.com;
       location / {
           proxy_pass http://localhost:8083;
       }
   }
   ```

3. 결과:
   - `sub1.example.com` 요청 👉 리버스 프록시가 `localhost:8081`로 전달.
   - `sub2.example.com` 요청 👉 리버스 프록시가 `localhost:8082`로 전달.
   - `sub3.example.com` 요청 👉 리버스 프록시가 `localhost:8083`로 전달.

---

### 장점:

- 서버 하나의 IP로 다양한 서브도메인을 처리 가능.
- 서브도메인별로 백엔드 과정을 분리하여, 앱이나 마이크로서비스 등의 요구사항에 맞도록 유연한 구성을 지원.
- DNS 관리가 단순해짐(A 레코드만 하나의 공통 IP로 설정).

---

### 추가 주의점:

1. SSL/TLS (HTTPS):
   - 각 서브도메인별로 SSL 인증서를 설정해야 하는 경우 추가 작업이 필요합니다.
   - 쉽게 관리하려면 와일드카드 인증서(예: `*.example.com`)를 사용하는 것을 추천합니다.
2. 포트 제한:
   - HTTP(포트 80) 및 HTTPS(포트 443)가 일반적으로 공용 네트워크에서 사용되므로 클라이언트가 포트를 명시하지 않을 수 있습니다.
   - 따라서 프록시 서버가 요청을 처리한 뒤 내부에서만 포트를 다르게 매핑해야 합니다.

---

### 결론:

- 질문 1: 서브도메인은 수량 제한 없이 생성이 가능.
- 질문 2: 도메인과 서브도메인 모두 개별적인 DNS 레코드 연결이 가능.
- 질문 3: 리버스 프록시와 함께 서브도메인을 특정 IP 내의 각기 다른 포트로 분기시키는 것이 완벽히 가능합니다.  
  Nginx, Apache, 또는 Traefik을 사용하여 효율적으로 구현해보세요! :)

  - 모든 프로세스가 포트를 가지는 것은 아님
  - 네트워크 통신을 수행하지 않는 프로세스는 포트를 할당받지 않음
  - 예: 로컬 계산 작업, 파일 처리 등

- 포트 사용 조건

  - TCP/UDP 통신을 하는 프로세스만 해당
  - 웹 서버(80/443), DB(3306) 등 특정 포트에 바인딩

- 확인 방법
  ```bash
  netstat -tuln  # Linux/Mac
  Get-NetTCPConnection  # Windows PowerShell
  ```

💡 핵심: 포트는 네트워크 프로세스의 통신 엔드포인트일 뿐, 모든 프로세스의 필수 속성이 아님.

## 도메인

도메인 구매 - 네임서버에 저장 - 도메인 입력 시 -> 네임서버에서 찾아서 -> ip 반환

A 레코드 구매
CNAME 레코드는 A 레코드의 alias

도메인, 서브 도메인, A 레코드, C 레코드의 차이를 잘 구분해서 작성해보자 설명을

프록시 서버에서 보통 CNAME을 통해 포트 구분해서 프로세스 배분

## CDN

CDN은 Content Delivery Network의 약자로, 지리적인 제약 없이 전 세계 사용자에게 빠르게 정적 콘텐츠(이미지, 동영상, 음악, HTML, JavaScript 등)를 전송하는 기술이다.

콘텐츠를 전송할 때 물리적인 거리가 멀수록 콘텐츠를 불러올 때 소요되는 시간이 길어진다. 이를 해결하기 위해 전 세계 곳곳에 캐싱 서버를 두고 해당 서버에 콘텐츠를 캐싱한 뒤 같은 콘텐츠에 대한 요청이 오면 물리적으로 제일 가까운 거리에 캐싱 서버에서 응답을 준다.

![img](images/cdn.png)

작동원리에 대해 간단히 설명하면 아래와 같다.

- 사용자로부터 요청이 발생한다.
- 요청이 발생한 캐싱 서버는 요청이 발생한 데이터에 대하여 캐싱 여부를 확인한다.
- 캐싱 데이터가 존재하면 사용자에 요청에 맞게 응답하고 존재하지 않으면 Origin Server로 요청한다.
- 요청 받은 데이터에 대해 Origin Server로부터 전달 받은 캐싱 서버는 데이터를 캐싱하고 사용자에게 응답한다.

다국적 서비스를 리액트로 제작한다고 하면, 배포 시에 한국 리전에만 호스팅 서버를 두고 Cloudflare, AWS, Google 등이 제공하는 CDN 서비스를 이용해서 서버 비용 절감 및 웹사이트 로딩 속도를 높일 수 있다.

![img](images/proxy.jpg)
