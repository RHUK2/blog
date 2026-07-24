import { defineConfig, globalIgnores } from 'eslint/config';
import nextVitals from 'eslint-config-next/core-web-vitals';
import nextTs from 'eslint-config-next/typescript';
import prettier from 'eslint-config-prettier';
import betterTailwindcss from 'eslint-plugin-better-tailwindcss';
import onlyWarn from 'eslint-plugin-only-warn';

const config = defineConfig([
  ...nextVitals,
  ...nextTs,
  prettier,
  { plugins: { onlyWarn } },
  {
    ...betterTailwindcss.configs.correctness,
    rules: {
      ...betterTailwindcss.configs.correctness.rules,
      'better-tailwindcss/enforce-canonical-classes': 'error',
      'better-tailwindcss/no-unknown-classes': [
        'error',
        // shadcn/typeset(styles/typeset.css)이 정의하는 커스텀 클래스 — @utility가 아닌 순수 CSS라 인식되지 않음
        { ignore: ['^typeset$', '^typeset-scroll$', '^not-typeset$'] },
      ],
    },
    settings: {
      'better-tailwindcss': {
        entryPoint: 'styles/globals.css',
      },
    },
  },
  // shadcn 등 vendored 컴포넌트는 upstream 원본을 그대로 유지 — lint가 원본과 다른 표기를 강제하면
  // diff/update 시 노이즈만 커진다.
  {
    ignores: ['shared/components/ui/**'],
  },
  // Override default ignores of eslint-config-next.
  globalIgnores([
    // Default ignores of eslint-config-next:
    '.next/**',
    'out/**',
    'build/**',
    'next-env.d.ts',
    // 마크다운 아티클에 첨부된 예제 코드 (린트 대상 아님):
    'public/**',
  ]),
]);

export default config;
