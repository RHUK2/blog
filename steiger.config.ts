import { defineConfig } from 'steiger';
import fsd from '@feature-sliced/steiger-plugin';

export default defineConfig([
  ...fsd.configs.recommended,
  {
    // search-markdown은 헤더 외의 다른 위치에서도 재사용될 수 있는 독립 검색 기능이라 유지.
    rules: { 'fsd/insignificant-slice': 'off' },
  },
  {
    // entities/markdown/api는 fs를 쓰는 서버 전용 모듈이라 슬라이스 공개 API에서 제외했다.
    // 공개 API에 두면 클라이언트 컴포넌트가 슬라이스를 import할 때 fs가 브라우저 번들로 끌려온다.
    // 서버 컴포넌트인 아래 페이지들에서만 세그먼트 직접 import를 허용한다.
    files: ['app/markdown/**'],
    rules: { 'fsd/no-public-api-sidestep': 'off' },
  },
  {
    // shared/components는 shadcn CLI 기본 경로(components/ui) 관례를 그대로 따르기 위해 유지.
    // 외부에서는 반드시 shared/ui(공개 API)를 통해서만 import한다.
    files: ['shared/components/**'],
    rules: {
      'fsd/no-reserved-folder-names': 'off',
      'fsd/public-api': 'off',
      'fsd/segments-by-purpose': 'off',
    },
  },
]);
