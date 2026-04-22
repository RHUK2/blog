'use client';

import Cookies from 'js-cookie';
import { Moon, Sun } from 'lucide-react';
import { motion } from 'motion/react';
import { useEffect, useState } from 'react';

export function DarkLightButton() {
  const [theme, setTheme] = useState<'dark' | 'light' | undefined>();

  function updateTheme() {
    setTheme((prev) => {
      const updateValue = prev === 'dark' ? 'light' : 'dark';
      Cookies.set('theme', updateValue);

      if (updateValue === 'dark') {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }

      return updateValue;
    });
  }

  useEffect(() => {
    let systemTheme: 'dark' | 'light' = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';

    const theme = Cookies.get('theme');

    if (theme === 'dark' || theme === 'light') {
      systemTheme = theme;
    }

    if (systemTheme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }

    Cookies.set('theme', systemTheme);

    setTheme(systemTheme);
  }, []);

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
