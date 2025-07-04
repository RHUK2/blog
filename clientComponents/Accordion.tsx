'use client';

import { TExperienceList } from '@/data/static/types';
import { AnimatePresence, motion, MotionConfig } from 'framer-motion';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { useState } from 'react';

interface Props {
  title: string;
  list: TExperienceList;
}

const variants = {
  visible: { x: 0, opacity: 1, width: 26 },
};

export function Accordion({ title, list }: Props) {
  const [isOpen, setIsOpen] = useState(false);

  function toggleButton() {
    setIsOpen((prev) => !prev);
  }

  return (
    <MotionConfig transition={{ duration: 0.2 }}>
      <motion.div className='flex flex-col gap-2'>
        <motion.button
          whileHover='visible'
          className='flex cursor-pointer self-start overflow-hidden'
          onClick={toggleButton}
          aria-expanded={isOpen}
        >
          <motion.span
            variants={variants}
            initial={{
              x: -10,
              opacity: 0,
              width: 0,
            }}
            animate={isOpen && 'visible'}
          >
            🔎
          </motion.span>
          <p className='flex items-center gap-1'>
            {title}
            {isOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
          </p>
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
                <li className='pb-2' key={item.behavior}>
                  <p>{`• ${item.behavior}`}</p>
                  {item.result && <p className='pl-2 text-gray-600 dark:text-gray-400'>{`→ ${item.result}`}</p>}
                </li>
              ))}
            </motion.ul>
          )}
        </AnimatePresence>
      </motion.div>
    </MotionConfig>
  );
}
