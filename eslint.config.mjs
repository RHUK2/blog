import coreWebVitals from 'eslint-config-next/core-web-vitals';
import typescript from 'eslint-config-next/typescript';
import prettier from 'eslint-config-prettier';
import onlyWarn from 'eslint-plugin-only-warn';

const config = [
  { ignores: ['dist/**', '.next/**', 'node_modules/**'] },
  ...coreWebVitals,
  ...typescript,
  prettier,
  { plugins: { onlyWarn } },
];

export default config;
