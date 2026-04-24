'use client';

import Cookies from 'js-cookie';
import { Moon, Sun } from 'lucide-react';
import { motion } from 'motion/react';
import { useEffect, useState } from 'react';

function getInitialTheme(): 'dark' | 'light' | undefined {
  if (typeof window === 'undefined') return undefined;
  const cookieTheme = Cookies.get('theme');
  if (cookieTheme === 'dark' || cookieTheme === 'light') return cookieTheme;
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}

export function DarkLightButton() {
  const [theme, setTheme] = useState<'dark' | 'light' | undefined>(getInitialTheme);

  useEffect(() => {
    if (!theme) return;
    Cookies.set('theme', theme);
    document.documentElement.classList.toggle('dark', theme === 'dark');
  }, [theme]);

  function updateTheme() {
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));
  }

  return (
    <>
      {theme && (
        <motion.button
          aria-label='theme-mode'
          onClick={updateTheme}
          className='cursor-pointer'
          whileHover={{
            scale: 1.2,
          }}
          whileFocus={{
            scale: 1.2,
          }}
        >
          {theme === 'dark' ? <Moon size={20} /> : <Sun size={20} />}
        </motion.button>
      )}
    </>
  );
}
