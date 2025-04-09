'use client';

import { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { twJoin } from 'tailwind-merge';

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
    if (!mode.isInit) {
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
  }, [mode.isInit]);

  return (
    <motion.button
      aria-label='theme-mode'
      onClick={handleMode}
      className={twJoin(
        'flex h-6 w-12 cursor-pointer items-center rounded-2xl border border-gray-700 bg-slate-50 bg-gradient-to-br from-gray-900 to-gray-800 px-1',
        'dark:border-gray-400 dark:from-gray-50 dark:to-gray-100',
        `${mode.theme === 'dark' ? 'justify-start' : 'justify-end'}`,
      )}
    >
      <motion.div
        layout
        className={twJoin(
          'h-4 w-4 rounded-[50%] border-gray-400 bg-slate-50 bg-gradient-to-br from-gray-50 to-gray-100',
          'dark:border-gray-700 dark:from-gray-900 dark:to-gray-800',
        )}
      ></motion.div>
    </motion.button>
  );
}
