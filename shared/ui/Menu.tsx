'use client';

import { DetailedHTMLProps, forwardRef, HTMLAttributes, useEffect, useImperativeHandle, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { twMerge } from 'tailwind-merge';

interface Props extends DetailedHTMLProps<HTMLAttributes<HTMLUListElement>, HTMLUListElement> {
  anchorEl: HTMLElement | null;
  open: boolean;
  onClose: () => void;
}

export const Menu = forwardRef(function Menu({ anchorEl, open, onClose, children, className, ...ulProps }: Props, ref) {
  const ulRef = useRef<HTMLUListElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const rafId = useRef<number | null>(null);
  const [showFade, setShowFade] = useState(false);

  useImperativeHandle(ref, () => ulRef.current);

  useEffect(() => {
    if (!open || !ulRef.current) return;
    const { scrollHeight, clientHeight } = ulRef.current;
    setShowFade(scrollHeight > clientHeight);
  }, [open]);

  useEffect(() => {
    if (open === false) return;

    function listener() {
      if (rafId.current != null) return;

      rafId.current = requestAnimationFrame(() => {
        if (anchorEl == null) return;
        if (containerRef.current == null) return;

        const { bottom, left, width } = anchorEl.getBoundingClientRect();
        const menuWidth = containerRef.current.offsetWidth;

        containerRef.current.style.setProperty(
          'transform',
          `translate(${left + window.scrollX + width / 2 - menuWidth / 2}px, ${bottom + window.scrollY + 10}px)`,
        );

        rafId.current = null;
      });
    }

    listener();

    window.addEventListener('resize', listener);

    return () => {
      window.removeEventListener('resize', listener);

      if (rafId.current != null) {
        cancelAnimationFrame(rafId.current);
        rafId.current = null;
      }
    };
  }, [anchorEl, open]);

  useEffect(() => {
    function listener(this: Window, event: globalThis.MouseEvent) {
      if (anchorEl?.contains(event?.target as HTMLElement)) return;

      onClose();
    }

    window.addEventListener('click', listener);

    return () => {
      window.removeEventListener('click', listener);
    };
  }, [anchorEl, onClose]);

  function handleScroll(event: React.UIEvent<HTMLUListElement>) {
    const { scrollTop, scrollHeight, clientHeight } = event.currentTarget;
    setShowFade(scrollTop + clientHeight < scrollHeight - 1);
  }

  return (
    <>
      {open &&
        createPortal(
          <div
            ref={containerRef}
            className='absolute top-0 left-0 z-40 rounded-md border border-gray-300 bg-gray-100 shadow-lg shadow-black/5 dark:border-gray-700 dark:bg-gray-800 dark:shadow-black/20'
          >
            <ul
              ref={ulRef}
              className={twMerge(
                'hide-scrollbar max-h-44 overflow-x-hidden overflow-y-auto py-2',
                `${className ?? ''}`,
              )}
              onScroll={handleScroll}
              {...ulProps}
            >
              {children}
            </ul>
            {showFade && (
              <div className='pointer-events-none absolute right-0 bottom-0 left-0 h-12 rounded-b-md bg-linear-to-t from-gray-100 from-40% to-transparent dark:from-gray-800' />
            )}
          </div>,
          document.body,
        )}
    </>
  );
});
