'use client';

import { ReactNode, useEffect, useRef } from 'react';

export function Menu({ children, open, onClose }: { children: ReactNode; open: boolean; onClose: () => void }) {
  const ulRef = useRef<HTMLUListElement>(null);

  useEffect(() => {
    if (ulRef.current?.parentElement == null) return;

    ulRef.current.parentElement.style.position = 'relative';
  }, []);

  useEffect(() => {
    function listener(this: HTMLElement, ev: globalThis.MouseEvent) {
      if (ulRef.current?.parentElement?.isEqualNode(ev.target as Node) || ulRef.current?.isEqualNode(ev.target as Node))
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
      onClick={(event) => event.stopPropagation()}
      className={`absolute z-40 max-h-44 overflow-y-auto overflow-x-hidden
        rounded-md bg-gradient-to-br from-gray-100 from-30% to-gray-50 to-70% py-2 shadow-inner
        dark:from-gray-900 dark:to-gray-800 dark:shadow-gray-600 ${open ? 'block' : 'hidden'}`}
      style={{
        top: (ulRef.current?.parentElement?.offsetHeight ?? 0) + 10,
        left: 0,
      }}>
      {children}
    </ul>
  );
}
