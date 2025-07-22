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
        className='flex h-12 w-12 cursor-pointer items-center justify-center rounded-full bg-gradient-to-br from-gray-100 from-30% to-gray-50 to-70% ring-2 dark:from-gray-900 dark:to-gray-800 dark:shadow-gray-700'
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
