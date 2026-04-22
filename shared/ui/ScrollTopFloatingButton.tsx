'use client';

import { ChevronUp } from 'lucide-react';
import { motion } from 'motion/react';

export function ScrollTopFloatingButton() {
  function scrollTop() {
    window.scrollTo(0, 0);
  }

  return (
    <div className='sticky bottom-8 flex justify-end'>
      <motion.button
        onClick={scrollTop}
        className='flex h-12 w-12 cursor-pointer items-center justify-center rounded-full bg-gray-100 shadow-md ring-1 ring-gray-300 hover:bg-gray-200 dark:bg-gray-800 dark:ring-gray-700 dark:hover:bg-gray-700'
        whileHover={{
          scale: 1.1,
        }}
        whileFocus={{
          scale: 1.1,
        }}
      >
        <ChevronUp />
      </motion.button>
    </div>
  );
}
