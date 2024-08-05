---
updatedAt: 2024-08-05
directory: Browser
fileName: web_api
title: Web API 기록하기
description:
---

# Web API 기록하기

- [외부 API 연동](#외부-api-연동)

## Clipboard API

로컬호스트 및 HTTPS 통신에서만 동작함

## History API

window.location.href = '/'
history.pushState
history.replaceState

history.state 세션 유지됨

## Location API

## 외부 API 연동

보통 외부 서비스에서 만든 API를 사용하기 위해서는 서비스 제공자가 제공해주는 API 키를 요청에 함께 보내야한다.

그래야 신뢰성 있는 사용자인지 파악이 가능하기 때문이다.

보통 오픈된 API의 경우에는 따로 API 키가 필요하지 않다.

무튼 외부에 무언가와 소통할 때는 거기서 주는 어떠한 신뢰를 증명하는 것을 받고 그걸 같이 보여주는 식이다.
