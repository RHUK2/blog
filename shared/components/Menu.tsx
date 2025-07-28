'use client';

import { DetailedHTMLProps, forwardRef, HTMLAttributes, useEffect, useImperativeHandle, useRef } from 'react';
import { createPortal } from 'react-dom';
import { twMerge } from 'tailwind-merge';

interface Props extends DetailedHTMLProps<HTMLAttributes<HTMLUListElement>, HTMLUListElement> {
  anchorEl: HTMLElement | null;
  open: boolean;
  onClose: () => void;
}

export const Menu = forwardRef(function Menu({ anchorEl, open, onClose, children, className, ...ulProps }: Props, ref) {
  const ulRef = useRef<HTMLUListElement | null>(null);

  const rafId = useRef<number | null>(null);

  useImperativeHandle(ref, () => ulRef.current);

  useEffect(() => {
    if (open === false) return;

    function listener() {
      if (rafId.current != null) return;

      rafId.current = requestAnimationFrame((t) => {
        if (anchorEl == null) return;
        if (ulRef.current == null) return;

        const { bottom, left } = anchorEl.getBoundingClientRect();

        ulRef.current.style.setProperty(
          'transform',
          `translate(${left + window.scrollX}px, ${bottom + window.scrollY + 10}px)`,
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

  return (
    <>
      {open &&
        createPortal(
          <ul
            ref={ulRef}
            className={twMerge(
              'absolute top-0 left-0 z-40 max-h-44 overflow-x-hidden overflow-y-auto rounded-md border border-gray-300 bg-gradient-to-br from-gray-50 to-gray-100 py-2 dark:border-gray-700 dark:from-gray-900 dark:to-gray-800',
              `${className ?? ''}`,
            )}
            {...ulProps}
          >
            {children}
          </ul>,
          document.body,
        )}
    </>
  );
});
