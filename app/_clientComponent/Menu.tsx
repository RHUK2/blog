'use client';

import { useEffect, useRef } from 'react';

interface MenuProps extends React.DetailedHTMLProps<React.HTMLAttributes<HTMLUListElement>, HTMLUListElement> {
  open: boolean;
  onClose: () => void;
}

export function Menu({ children, onClick, className, style, open, onClose, ...ulProps }: MenuProps) {
  const ulRef = useRef<HTMLUListElement>(null);

  useEffect(() => {
    if (ulRef.current?.parentElement == null) return;

    ulRef.current.parentElement.style.position = 'relative';
  }, []);

  useEffect(() => {
    function listener(this: HTMLElement, event: globalThis.MouseEvent) {
      if (
        ulRef.current?.parentElement?.isEqualNode(event.target as Node) ||
        ulRef.current?.isEqualNode(event.target as Node)
      )
        return;

      onClose();
    }

    document.documentElement.addEventListener('click', listener);

    return () => {
      document.documentElement.removeEventListener('click', listener);
    };
  }, [onClose]);

  return (
    <ul
      ref={ulRef}
      onClick={(event) => {
        event.stopPropagation();
        onClick && onClick(event);
      }}
      className={`absolute z-40 max-h-44 overflow-y-auto overflow-x-hidden rounded-md border border-gray-300 bg-gradient-to-br from-gray-50 to-gray-100 py-2 dark:border-gray-700 dark:from-gray-900 dark:to-gray-800 ${open ? 'block' : 'hidden'} ${className ?? ''}`}
      style={{
        top: (ulRef.current?.parentElement?.offsetHeight ?? 0) + 10,
        left: 0,
        ...style,
      }}
      {...ulProps}>
      {children}
    </ul>
  );
}
