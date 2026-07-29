'use client';

import Cookies from 'js-cookie';
import { Moon, Sun } from 'lucide-react';
import { motion } from 'motion/react';

export function DarkLightButton() {
  function updateTheme() {
    const isDark = document.documentElement.classList.toggle('dark');
    Cookies.set('theme', isDark ? 'dark' : 'light');
  }

  return (
    <motion.button
      aria-label='theme-mode'
      onClick={updateTheme}
      className='cursor-pointer'
      whileHover={{ scale: 1.2 }}
      whileFocus={{ scale: 1.2 }}
    >
      <Moon size={20} className='hidden dark:block' />
      <Sun size={20} className='dark:hidden' />
    </motion.button>
  );
}
