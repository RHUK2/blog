---
updatedAt:
directory: Security
fileName: Auth
title: 인증
description:
---

# Security

- [Security](#security)
  - [새로고침 시 데이터](#새로고침-시-데이터)

<!-- todo: 내용 보완 필요 -->

## 새로고침 시 데이터

새로고침 시 자바스크립트 상에서 작성한 데이터는 모두 휘발되며 재업데이트가 필요하다.

이런 재업데이트 현상으로 원하지 않는 사이드 이펙트가 발생할 수 있는데,

새로고침 시에도 데이터를 유지하면서 사이드 이펙트를 없애려면 브라우저 저장소를 적극 활용하자.

보안적인 측면에서는, 개인정보 같은 데이터는 인증된 사용자에 한해서는 브라우저에 존재해도 된다고 생각한다.

암호화에 대한 개념 서술

웹 스토리지, 쿠키는 모두 인증된 사용자에 한해서 데이터가 저장된다는 생각을 기반으로 설계된 놈들이기에 암호화 기능이 없다.

그러므로 해당 스토리지들에는 인증이 끝난 사용자에 한해서는 데이터가 저장되서는 안된다.

session storage를 이용하는 것이 권장된다. 브라우저가 종료되면 데이터가 휘발되기 떄문에

자동 로그인 같은 경우 사용자의 동의를 받고 데이터가 노출될 수 있음을 알려야 한다.

자동 로그인 트렌드는 본인이 신뢰할 수 있는 기기인지를 등록하여 사용하게 된다.

웹 스토리지, 쿠키, 세션에 대한 차이 서술

ui 제어로 보안 불가능 개발자 도구에서 얼마든지 뚫을 수 있음, disabled -> enabled

로그인 과정

권한

동시 접속 제한

액세스 토큰

리프레시 토큰

토큰 만료 시 리다이렉트

미들웨어를 이용한 라우팅 가드

axios 인터셉터를 이용한 인증 만료된 토큰 처리

로그인 시 라우팅

로그아웃 토큰 제거
