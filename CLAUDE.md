# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## 명령어

```bash
npm run dev        # 개발 서버 실행 (포트 3003)
npm run build      # 프로덕션 빌드
npm run lint       # ESLint 실행
npm run prettier   # 모든 .tsx 파일 포맷
npm run test       # Jest 실행
npm run test:watch # Jest watch 모드
```

## 아키텍처

Next.js 16 (App Router) 기반 개인 블로그로, 주요 라우트는 세 가지다.

- `/markdown` — 태그 필터링 및 페이지네이션이 있는 아티클 목록
- `/markdown/[folderName]/detail` — 정적 마크다운 아티클 상세 페이지 (`generateStaticParams`로 SSG)
- `/llm` — 멀티 모델 LLM 채팅 인터페이스 (OpenAI + DeepSeek 스트리밍)

### 마크다운 콘텐츠 파이프라인

아티클은 `public/markdown/{folderName}/index.md`에 YAML 프론트매터(`folderName`, `title`, `tag`, `isPublished`)와 함께 저장된다. 임시/초안 아티클은 `public/markdown/@temp/`에 둔다.

메타데이터 인덱스는 `entities/markdown/list.json`에 저장되며 저장소에 커밋된다. `entities/markdown/data.ts` 하단에 주석 처리된 `writeMarkdownMetaList()` 호출을 해제하고 실행하면 재생성된다. 이후 `list.json`을 다시 커밋해야 한다. 상세 페이지는 `dynamicParams = false`로 설정되어 있고 `generateStaticParams`에서 `list.json`을 읽으므로, 빌드 전에 반드시 최신 상태여야 한다.

### 경로 별칭

`@/*`는 저장소 루트로 매핑된다(`tsconfig.json` 참고). 모든 import는 상대 경로 대신 `@/`를 사용한다.

### 디렉터리 구조

- `app/` — Next.js App Router 페이지 및 API 라우트
- `entities/` — 기능 단위 데이터, 타입, 컴포넌트 (markdown, chat, profile)
- `shared/` — 디자인 시스템 컴포넌트, 공통 타입/데이터 (`NavList` 등)
- `store/` — 클라이언트 전용 글로벌 설정 (`GlobalClientConfig`) 및 React Query 프로바이더
- `utils/` — 상수, 커스텀 훅
- `public/markdown/` — 아티클 콘텐츠 및 이미지
- `styles/` — 전역 CSS 및 구문 강조 CSS

### API 라우트

- `POST /api/chat` — LLM 응답 스트리밍. `body.model` 값에 따라 OpenAI 또는 DeepSeek 클라이언트를 선택한다. `OPENAI_API_KEY`, `DEEPSEEK_API_KEY` 환경 변수가 필요하다.
- `POST /api/mail` — 스텁 (빈 핸들러).

### 테마

다크/라이트 모드는 `theme` 쿠키에 저장되며, `app/layout.tsx`에서 서버 사이드로 읽어 `<html>` 클래스에 적용한다. `DarkLightButton` 컴포넌트가 클라이언트에서 쿠키를 쓴다.

### 스타일링

Tailwind CSS v4와 마크다운 prose를 위한 `@tailwindcss/typography`를 사용한다. 조건부 클래스 병합에는 `tailwind-merge`를 사용하고, 포맷 시 `prettier-plugin-tailwindcss`가 클래스 순서를 정렬한다.

## 아티클 작성

전체 작성 규칙은 저장소 루트의 `markdown.md`를 참고한다. 주요 사항은 다음과 같다.

- 프론트매터 필드: `folderName` (snake_case, 폴더명과 동일), `title`, `tag` (쉼표 구분), `isPublished`
- `public/markdown/` 하위 폴더마다 `index.md` 하나; 이미지는 `public/markdown/{folderName}/images/`에 저장
- 아티클 추가/수정 후 `writeMarkdownMetaList()`를 실행하여 `list.json`을 재생성하고 커밋
- 말투: 한국어 기술 문서 스타일, 평서형 종결어미(`-다`), 볼드체(`**`) 및 이모지 사용 금지
