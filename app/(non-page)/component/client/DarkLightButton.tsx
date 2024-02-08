'use client';

import { useEffect, useState } from 'react';

export function DarkLightButton() {
  const [mode, setMode] = useState('');

  function handleMode() {
    setMode((mode) => {
      const updateValue = mode === 'dark' ? '' : 'dark';

      localStorage.setItem('theme', updateValue);

      if (updateValue === 'dark') {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }

      return updateValue;
    });
  }

  useEffect(() => {
    setMode(() => document.documentElement.getAttribute('class') ?? '');
  }, []);

  return (
    <>
      <button onClick={handleMode} className='dark:hidden min-w-10'>
        ☀️
      </button>
      <button onClick={handleMode} className='hidden dark:block min-w-10'>
        🌙
      </button>
    </>
  );
}
