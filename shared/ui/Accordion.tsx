'use client';

import { ChevronDown, ChevronUp } from 'lucide-react';
import { AnimatePresence, MotionConfig, motion } from 'motion/react';
import { createContext, useContext, useState } from 'react';
import invariant from 'tiny-invariant';

interface AccordionContext {
  isOpen: boolean;
  toggle: () => void;
}

const AccordionContext = createContext<AccordionContext | null>(null);

export function useAccordion() {
  const context = useContext(AccordionContext);

  invariant(context, 'useAccordion must be used within an Accordion');

  return context;
}

interface AccordionProps {
  children: React.ReactNode;
}

export function Accordion({ children }: AccordionProps) {
  const [isOpen, setIsOpen] = useState(false);

  function toggle() {
    setIsOpen((prev) => !prev);
  }

  return (
    <AccordionContext.Provider value={{ isOpen, toggle }}>
      <div className='flex flex-col gap-2'>{children}</div>
    </AccordionContext.Provider>
  );
}

interface AccordionTriggerProps {
  icon?: React.ReactNode;
  children: React.ReactNode;
}

const variants = {
  hidden: { x: -10, opacity: 0, width: 0 },
  visible: { x: 0, opacity: 1, width: 26 },
};

export function AccordionTrigger({ icon, children }: AccordionTriggerProps) {
  const { isOpen, toggle } = useAccordion();

  return (
    <MotionConfig transition={{ duration: 0.2 }}>
      <motion.button
        initial='hidden'
        whileHover='visible'
        className='flex cursor-pointer self-start overflow-hidden transition-opacity hover:opacity-70'
        onClick={toggle}
        aria-expanded={isOpen}
      >
        {icon && (
          <motion.span variants={variants} animate={isOpen && 'visible'}>
            {icon}
          </motion.span>
        )}
        <motion.span className='flex items-center gap-1'>
          {children}
          {isOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
        </motion.span>
      </motion.button>
    </MotionConfig>
  );
}

const motionComponents = {
  div: motion.div,
  ul: motion.ul,
  ol: motion.ol,
  section: motion.section,
  article: motion.article,
} as const;

type MotionTag = keyof typeof motionComponents;

interface AccordionContentProps {
  children: React.ReactNode;
  as?: MotionTag;
}

export function AccordionContent({ as = 'div', children }: AccordionContentProps) {
  const { isOpen } = useAccordion();

  const Component = motionComponents[as];

  return (
    <AnimatePresence>
      {isOpen && (
        <Component
          initial={{ height: 0 }}
          animate={{ height: isOpen ? 'auto' : 0 }}
          exit={{ height: 0 }}
          transition={{ duration: 0.2 }}
          className='overflow-hidden'
        >
          {children}
        </Component>
      )}
    </AnimatePresence>
  );
}
