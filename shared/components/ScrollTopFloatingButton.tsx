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
        className='bg-muted ring-border hover:bg-muted/80 flex size-12 cursor-pointer items-center justify-center rounded-full shadow-md ring-1'
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
