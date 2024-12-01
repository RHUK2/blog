'use client';

import { useEffect, useState } from 'react';

let isInit = false;

export function DarkLightButton() {
  const [mode, setMode] = useState({
    theme: 'dark',
    isInit: false,
  });

  function handleMode() {
    setMode((mode) => {
      const updateValue = mode.theme === 'dark' ? 'light' : 'dark';
      localStorage.setItem('theme', updateValue);

      if (updateValue === 'dark') {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }

      return {
        ...mode,
        theme: updateValue,
      };
    });
  }

  useEffect(() => {
    if (!isInit) {
      isInit = true;

      const item = localStorage.getItem('theme');

      let updateValue = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';

      if (item) {
        updateValue = item;
      }

      if (updateValue === 'dark') {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }

      localStorage.setItem('theme', updateValue);

      setMode({
        theme: updateValue,
        isInit: true,
      });
    }
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
