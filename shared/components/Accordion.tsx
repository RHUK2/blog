'use client';

import { AnimatePresence, motion, MotionConfig } from 'framer-motion';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { createContext, useContext, useState } from 'react';
import invariant from 'tiny-invariant';

interface AccordionContext {
  isOpen: boolean;
  toggle: () => void;
}

const AccordionContext = createContext<AccordionContext>({
  isOpen: false,
  toggle: () => {},
});

export function useAccordionContext() {
  const context = useContext(AccordionContext);

  invariant(context, 'useAccordionContext must be used within an Accordion');

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
  children: React.ReactNode;
}

const variants = {
  visible: { x: 0, opacity: 1, width: 26 },
};

export function AccordionTrigger({ children }: AccordionTriggerProps) {
  const { isOpen, toggle } = useAccordionContext();

  return (
    <motion.button
      whileHover='visible'
      className='flex cursor-pointer self-start overflow-hidden'
      onClick={toggle}
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
        {children}
        {isOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
      </p>
    </motion.button>
  );
}

interface AccordionContentProps {
  children: React.ReactNode;
  as?: React.ElementType;
}

export function AccordionContent({ as, children }: AccordionContentProps) {
  const { isOpen } = useAccordionContext();

  const Component = motion.create(as || 'div');

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
