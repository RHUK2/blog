'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { useState } from 'react';

interface Props {
  title: string;
  list: string[];
}

export function Accordion({ title, list }: Props) {
  const [isOpen, setIsOpen] = useState(false);

  function toggleButton() {
    setIsOpen((prev) => !prev);
  }

  return (
    <motion.div className='flex flex-col gap-2'>
      <motion.button className='cursor-pointer text-start' onClick={toggleButton}>
        {title}
      </motion.button>
      <AnimatePresence>
        {isOpen && (
          <motion.ul
            initial={{ height: 0 }}
            animate={{ height: isOpen ? 'auto' : 0 }}
            exit={{ height: 0 }}
            className='overflow-hidden'
          >
            {list.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
