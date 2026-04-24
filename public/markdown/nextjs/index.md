---
folderName: nextjs
title: Next.js
tag: nextjs
isPublished: true
---

# Next.js

- [페이지 라우터(Page Router) 렌더링 전략](#페이지-라우터page-router-렌더링-전략)
  - [SSG • SSR • ISR • CSR 비교](#ssg--ssr--isr--csr-비교)
  - [동적 라우팅 경로 사전 생성(getStaticPaths)](#동적-라우팅-경로-사전-생성getstaticpaths)
- [앱 라우터(App Router) 핵심 개념](#앱-라우터app-router-핵심-개념)
  - [서버 컴포넌트(RSC)와 클라이언트 컴포넌트(RCC)](#서버-컴포넌트rsc와-클라이언트-컴포넌트rcc)
  - [데이터 페칭(Data Fetching)과 캐싱 전략](#데이터-페칭data-fetching과-캐싱-전략)
- [하이드레이션 에러(Hydration Error)](#하이드레이션-에러hydration-error)
  - [해결 방법](#해결-방법)
- [웹 성능 지표(Web Vitals)](#웹-성능-지표web-vitals)
- [프록시(Proxy)](#프록시proxy)
- [이미지 최적화(`next/image`)](#이미지-최적화nextimage)

## 페이지 라우터(Page Router) 렌더링 전략

### SSG • SSR • ISR • CSR 비교

- SSG(Static-Site Generation):
  - `getStaticProps`를 사용하며 빌드 시점에 HTML을 미리 생성함.
  - 속도가 매우 빠르고 CDN 캐싱에 유리함.
- SSR(Server-Side Rendering):
  - `getServerSideProps`를 사용하며 매 요청 시 서버에서 HTML을 생성함.
  - 항상 최신 데이터를 보장하지만 서버 부하가 발생할 수 있음.
- ISR(Incremental Static Regeneration):
  - `revalidate` 옵션을 통해 설정된 주기마다 정적 페이지를 백그라운드에서 갱신함.
  - SSG의 속도와 SSR의 최신성을 동시에 확보함.
- CSR(Client-Side Rendering):
  - 브라우저에서 자바스크립트를 실행하여 화면을 그림.
  - 검색 엔진 최적화(SEO)에 불리할 수 있으나 인터랙션이 많은 서비스에 적합함.

### 동적 라우팅 경로 사전 생성(getStaticPaths)

- `fallback: false`: 빌드 시 생성되지 않은 경로 접속 시 404 에러를 반환함.
- `fallback: true`: 미생성 경로 접속 시 `fallback` UI를 먼저 보여주고 백그라운드에서 정적 페이지를 생성함.
- `fallback: 'blocking'`: 미생성 경로 접속 시 SSR 방식으로 페이지가 생성될 때까지 대기함(로딩 UI 없음).

## 앱 라우터(App Router) 핵심 개념

### 서버 컴포넌트(RSC)와 클라이언트 컴포넌트(RCC)

앱 라우터의 모든 컴포넌트는 기본적으로 서버 컴포넌트(React Server Components)다.

- 서버 컴포넌트(RSC):
  - 서버에서만 실행되며 브라우저로 전송되는 자바스크립트 번들 크기를 줄여줌.
  - 데이터베이스 직접 접근이 가능하며 보안상 이점이 있음.
  - `useState`, `useEffect` 등의 훅을 사용할 수 없음.
- 클라이언트 컴포넌트(RCC):
  - 파일 최상단에 `'use client'` 지시어를 명시하여 사용함.
  - 브라우저 환경의 API(DOM 조작, 이벤트 리스너 등)를 사용하거나 인터랙션이 필요한 경우 사용함.

### 데이터 페칭(Data Fetching)과 캐싱 전략

Next.js 15부터는 `fetch` 요청의 캐싱 기본값이 `no-store`로 변경되어 기본적으로 동적 렌더링(Dynamic Rendering)을 수행한다.

- 정적 데이터 페칭: `{ cache: 'force-cache' }` 옵션을 사용하여 빌드 시 데이터를 캐싱함.
- 동적 데이터 페칭: `{ cache: 'no-store' }` 옵션을 사용하여 매 요청마다 새로운 데이터를 가져옴.
- 증분 재생성: `{ next: { revalidate: 60 } }` 옵션으로 특정 주기마다 데이터를 갱신함.

## 하이드레이션 에러(Hydration Error)

서버에서 생성한 HTML 구조와 클라이언트에서 첫 렌더링 시 생성한 구조가 일치하지 않을 때 발생한다.

- 주요 원인:
  - `window` 객체 등 브라우저 전용 API를 컴포넌트 최상위 수준에서 사용하는 경우.
  - 서버와 클라이언트의 타임존(Timezone) 차이로 인해 날짜 표기가 달라지는 경우.
  - HTML 태그 중첩 규칙 위반 (예: `p` 태그 안에 `div` 삽입).

### 해결 방법

1. `next/dynamic`으로 클라이언트 전용 렌더링 — `ssr: false` 설정으로 서버 렌더링에서 제외:

   ```tsx
   import dynamic from 'next/dynamic';

   const ClientOnlyComponent = dynamic(() => import('./MyComponent'), { ssr: false });
   ```

2. `useEffect`와 상태로 클라이언트 렌더링 제어 — 서버에서는 `null`을 반환하므로 불일치를 방지:

   ```tsx
   function MyComponent() {
     const [isClient, setIsClient] = useState(false);
     useEffect(() => setIsClient(true), []);
     if (!isClient) return null;
     return <div>{window.location.href}</div>;
   }
   ```

3. `typeof window === 'undefined'` 조건 분기 — 서버 환경에서는 렌더링하지 않음:

   ```tsx
   function MyComponent() {
     if (typeof window === 'undefined') return null;
     return <div>클라이언트에서만 렌더링된다.</div>;
   }
   ```

## 웹 성능 지표(Web Vitals)

| 지표  | 설명                                                    | 권장값     |
| :---- | :------------------------------------------------------ | :--------- |
| `LCP` | 가장 큰 콘텐츠가 렌더링되는 시점 (로딩 성능)            | 2.5초 이하 |
| `INP` | 사용자 상호작용에 대한 응답성 (상호작용 성능, FID 대체) | 200ms 이하 |
| `CLS` | 시각적 불안정성 및 레이아웃 이동 점수                   | 0.1 이하   |
| `FCP` | 첫 번째 콘텐츠가 화면에 나타나는 시점                   | 1.8초 이하 |

## 프록시(Proxy)

- Next.js 16부터 `middleware.ts`가 `proxy.ts`로, `middleware` 함수가 `proxy` 함수로 변경됨.
- 기존 엣지 런타임(Edge Runtime)에서 동작하던 것과 달리 Node.js 런타임에서 실행됨.
- 인증(Auth) 처리, 리다이렉트, 봇 탐지 등에 주로 활용됨.
- 주의: 소프트 라우팅(클라이언트 측 이동) 시 특정 브라우저 환경에서는 프록시가 예상과 다르게 동작할 수 있으므로 설계 시 주의가 필요함.

## 이미지 최적화(`next/image`)

`next/image`는 HTML `<img>` 태그를 대체하는 컴포넌트로, 이미지 관련 성능 최적화를 자동으로 처리한다.

- 자동 포맷 변환: 브라우저가 지원하는 경우 WebP, AVIF 등 최신 포맷으로 변환하여 제공함.
- 자동 리사이징: `width`, `height` props를 기반으로 디바이스 해상도에 맞는 크기로 변환함.
- 지연 로딩(Lazy Loading): 기본적으로 뷰포트에 진입할 때 이미지를 로드함. `priority` prop을 설정하면 즉시 로드함.
- CLS(누적 레이아웃 이동) 방지: `width`, `height`를 사전에 지정하여 이미지 로드 전후 레이아웃 이동을 막음.

```tsx
import Image from 'next/image'

// 로컬 이미지: width/height 자동 추론
import profile from './profile.png'
<Image src={profile} alt="profile" />

// 원격 이미지: width/height 명시 필요
<Image src="https://example.com/photo.jpg" alt="photo" width={800} height={600} />

// LCP 대상 이미지: priority 설정으로 즉시 로드
<Image src="/hero.jpg" alt="hero" width={1200} height={600} priority />
```

원격 이미지를 사용할 경우 `next.config.js`에 허용할 도메인을 명시해야 함.

```ts
// next.config.ts
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'example.com',
      },
    ],
  },
};
```
