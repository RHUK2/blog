'use client';

import { forwardRef, useEffect, useImperativeHandle, useRef } from 'react';
import { twMerge } from 'tailwind-merge';

interface MenuProps extends React.DetailedHTMLProps<React.HTMLAttributes<HTMLUListElement>, HTMLUListElement> {
  control: React.RefObject<HTMLElement> | null;
  open: boolean;
  onClose: () => void;
}

export const Menu = forwardRef(function Menu(
  { control, open, onClose, children, onClick, className, ...ulProps }: MenuProps,
  ref,
) {
  const rafId = useRef<number | null>(null);

  const ulRef = useRef<HTMLUListElement>(null);

  useImperativeHandle(ref, () => ulRef.current);

  useEffect(() => {
    function listener() {
      if (rafId.current == null) {
        rafId.current = requestAnimationFrame((t) => {
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

    listener();

    window.addEventListener('resize', listener);

    return () => {
      window.removeEventListener('resize', listener);
    };
  }, [control]);

  useEffect(() => {
    function listener(this: HTMLElement, event: globalThis.MouseEvent) {
      if (
        (control && control.current?.isEqualNode(event.target as Node)) ||
        ulRef.current?.isEqualNode(event.target as Node)
      )
        return;

      onClose();
    }

    document.documentElement.addEventListener('click', listener);

    return () => {
      document.documentElement.removeEventListener('click', listener);
    };
  }, [control, onClose]);

  return (
    <ul
      ref={ulRef}
      onClick={(event) => {
        event.stopPropagation();
        if (onClick) {
          onClick(event);
        }
      }}
      className={twMerge(
        'absolute left-0 top-0 z-40 max-h-44 overflow-y-auto overflow-x-hidden rounded-md border border-gray-300 bg-gradient-to-br from-gray-50 to-gray-100 py-2 dark:border-gray-700 dark:from-gray-900 dark:to-gray-800',
        `${open ? 'block' : 'hidden'} ${className ?? ''}`,
      )}
      {...ulProps}
    >
      {children}
    </ul>
  );
});
