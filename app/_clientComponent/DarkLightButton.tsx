'use client';

import { useEffect, useState } from 'react';

export function DarkLightButton() {
  const [mode, setMode] = useState('dark');

  function handleMode() {
    setMode((mode) => {
      const updateValue = mode === 'dark' ? '' : 'dark';

      if (updateValue === 'dark') {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }

      return updateValue;
    });
  }

  useEffect(() => {
    setMode((mode) => {
      const updateValue = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : '';

      if (updateValue === 'dark') {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }

      return updateValue;
    });
  }, []);

  return (
    <>
      <button onClick={handleMode} className='min-w-10 dark:hidden'>
        LIGHT
      </button>
      <button onClick={handleMode} className='hidden min-w-10 dark:block'>
        DARK
      </button>
    </>
  );
}
