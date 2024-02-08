// (async () => {
(() => {
  // FOUC(Flash of Unstyled Content) 방지를 위한 동기 스크립트 삽입
  try {
    if (
      localStorage.theme === 'dark' ||
      (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)
    ) {
      document.documentElement.classList.add('dark');
      // await import('highlight.js/styles/github-dark.css');
    } else {
      document.documentElement.classList.remove('dark');
      // await import('highlight.js/styles/github.css');
    }
  } catch (_) {}
})();
