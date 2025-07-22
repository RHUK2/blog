'use client';

import {
  DetailedHTMLProps,
  forwardRef,
  HTMLAttributes,
  RefObject,
  useEffect,
  useImperativeHandle,
  useRef,
} from 'react';
import { createPortal } from 'react-dom';
import { twMerge } from 'tailwind-merge';

interface Props extends DetailedHTMLProps<HTMLAttributes<HTMLUListElement>, HTMLUListElement> {
  control: RefObject<HTMLElement> | null;
  open: boolean;
  onClose: () => void;
}

export const Menu = forwardRef(function Menu(
  { control, open, onClose, children, onClick, className, ...ulProps }: Props,
  ref,
) {
  const rafId = useRef<number | null>(null);

  const ulRef = useRef<HTMLUListElement | null>(null);

  useImperativeHandle(ref, () => ulRef.current);

  useEffect(() => {
    if (open === false) return;
    if (control?.current == null) return;

    function updateMenuPosition() {
      if (rafId.current == null) {
        rafId.current = requestAnimationFrame(() => {
          if (control?.current == null) return;
          if (ulRef?.current == null) return;

          const { bottom, left } = control.current.getBoundingClientRect();

          ulRef.current.style.setProperty(
            'transform',
            `translate(${left + window.scrollX}px, ${bottom + window.scrollY + 10}px)`,
          );

          rafId.current = null;
        });
      }
    }

    updateMenuPosition();

    const observer = new ResizeObserver(updateMenuPosition);

    observer.observe(document.documentElement);

    return () => {
      observer.disconnect();

      if (rafId.current !== null) {
        cancelAnimationFrame(rafId.current);
        rafId.current = null;
      }
    };
  }, [control, open]);

  useEffect(() => {
    function menuCloseListener(this: HTMLElement, event: globalThis.MouseEvent) {
      if (control?.current?.isEqualNode(event.target as Node)) return;

      onClose();
    }

    document.documentElement.addEventListener('click', menuCloseListener);

    return () => {
      document.documentElement.removeEventListener('click', menuCloseListener);
    };
  }, [control, onClose]);

  return (
    <>
      {open &&
        createPortal(
          <ul
            ref={ulRef}
            onClick={(event) => {
              if (onClick) {
                onClick(event);
              }
            }}
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
