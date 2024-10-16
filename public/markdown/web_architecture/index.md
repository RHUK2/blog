---
folderName: web_architecture
updatedAt: 2024-10-15
title: 웹 서비스 구조
tag: web
isPublished: true
---

# 웹 서비스 구조

- [초기 웹(1990년대 중반)](#초기-웹1990년대-중반)
- [동적 웹의 등장(2000년대 초반)](#동적-웹의-등장2000년대-초반)
- [MVC 패턴과 풀스택 개발의 확산(2010년대 초반)](#mvc-패턴과-풀스택-개발의-확산2010년대-초반)
- [마이크로서비스와 컨테이너 기반 아키텍처(2020년대)](#마이크로서비스와-컨테이너-기반-아키텍처2020년대)

## 초기 웹(1990년대 중반)

- 클라이언트(브라우저): HTML 문서를 요청하여 정적 페이지를 렌더링하는 역할이었다. 당시의 클라이언트는 기본적으로 HTTP를 통해 서버로부터 정적인 HTML 파일을 받아왔다.
- 웹 서버: Apache와 같은 웹 서버가 등장하여 클라이언트의 요청을 받아 정적 파일을 반환했다. 이 시기에는 서버가 HTML, 이미지 등 정적 자원을 제공하는 것이 주된 역할이었다.
- 웹 어플리케이션 서버: 거의 사용되지 않았다. 모든 로직이 웹 서버나 클라이언트 측에서 처리되었다.
- 데이터베이스: RDBMS(관계형 데이터베이스)가 주로 사용되었으며, Oracle, MySQL, PostgreSQL 등이 데이터 저장소로 활용되었다.
- 인프라: 물리 서버 기반. 데이터 센터에 서버를 직접 두고 관리하는 방식이었다.

## 동적 웹의 등장(2000년대 초반)

- 클라이언트(브라우저): 정적 페이지 외에도 동적으로 생성된 페이지를 지원하게 되었으며, JavaScript가 널리 사용되기 시작했다. 이를 통해 클라이언트에서의 상호작용과 화면 전환이 좀 더 부드럽게 이루어졌다.
- 웹 서버: Apache 외에 Microsoft의 IIS(Internet Information Services) 등이 사용되었다. 요청에 따라 서버 측에서 동적으로 페이지를 생성하는 CGI, PHP, ASP 등이 사용되었다.
- 웹 어플리케이션 서버: 동적 페이지 생성을 위해 애플리케이션 로직을 처리하는 별도의 서버가 필요해졌다. Java 기반의 Servlet 컨테이너(Tomcat), Microsoft의 .NET Framework 등이 웹 어플리케이션 서버로 사용되었다.
- 데이터베이스: MySQL, PostgreSQL 같은 오픈 소스 RDBMS가 급격히 성장했다. 웹 애플리케이션과 데이터베이스 간의 상호작용이 점점 더 중요해졌다.
- 인프라: 여전히 물리 서버 기반이지만, 서버 팜(farm)과 같은 클러스터링 기술이 도입되어 트래픽을 분산시킬 수 있었다.

## MVC 패턴과 풀스택 개발의 확산(2010년대 초반)

- 클라이언트(브라우저): Ajax와 JSON을 이용한 비동기 통신이 보편화되며, 클라이언트에서 더욱 복잡한 작업을 처리하게 되었다. 프론트엔드 프레임워크인 AngularJS, React 등이 등장하여 클라이언트 측 애플리케이션 로직이 더 복잡하고 정교해졌다.
- 웹 서버: Nginx가 새로운 웹 서버로 떠오르며, 더 가벼운 리소스 사용량과 높은 성능을 제공했다. Apache와 함께 Nginx는 웹 서버 시장을 양분했다.
- 웹 어플리케이션 서버: Ruby on Rails, Django(Python) 등 MVC 패턴을 지원하는 프레임워크가 보편화되었다. Node.js는 비동기 이벤트 기반 서버로 많은 주목을 받았고, 특히 JavaScript를 서버 측에서 사용할 수 있게 했다.
- 데이터베이스: NoSQL 데이터베이스(MongoDB, Cassandra 등)가 RDBMS와 함께 사용되며 비정형 데이터를 처리할 수 있는 옵션을 제공했다.
- 인프라: 가상화 기술이 발전하면서 클라우드 서비스가 본격적으로 확산되었다. Amazon Web Services(AWS), Microsoft Azure, Google Cloud Platform(GCP) 등의 클라우드 인프라를 통해 물리 서버를 직접 관리하지 않고도 확장 가능한 인프라를 구축할 수 있게 되었다.

## 마이크로서비스와 컨테이너 기반 아키텍처(2020년대)

- 클라이언트(브라우저): React, Vue.js, Svelte 같은 현대적인 프론트엔드 프레임워크가 광범위하게 사용된다. 클라이언트가 더욱 복잡한 SPA(Single Page Application)를 구성하게 되며, 웹소켓 등을 통한 실시간 통신도 점점 더 중요해졌다.
- 웹 서버: Nginx는 여전히 인기를 끌고 있으며, 서버리스(Serverless) 구조가 AWS Lambda나 Azure Functions와 같은 서비스와 결합되어 웹 서버의 개념이 변화하고 있다.
- 웹 어플리케이션 서버: 전통적인 단일 서버 기반 애플리케이션에서 벗어나 마이크로서비스 아키텍처로 전환되었다. 이로 인해 개별 서비스가 독립적으로 배포되고 유지보수될 수 있게 되었으며, Kubernetes 같은 오케스트레이션 도구가 이를 지원한다.
- 데이터베이스: RDBMS와 NoSQL이 혼합된 하이브리드 아키텍처가 많아졌다. Redis, ElasticSearch 등도 중요한 역할을 하고 있으며, 데이터베이스는 각 마이크로서비스에서 분리될 수 있다.
- 인프라: 컨테이너화 기술이 표준으로 자리 잡았다. Docker와 Kubernetes가 일반적으로 사용되며, 클라우드 네이티브 애플리케이션이 기본이 되었다. 클라우드 제공자의 서비스 매니지드 인프라(AWS ECS, GKE 등)도 점점 더 활용되고 있다.
