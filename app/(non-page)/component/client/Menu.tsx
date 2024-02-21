'use client';

import { ReactNode, RefObject, useEffect, useState } from 'react';

export function Menu({
  children,
  elementRef,
  open,
  onClose,
}: {
  children: ReactNode;
  elementRef: RefObject<HTMLButtonElement>;
  open: boolean;
  onClose: () => void;
}) {
  const [pos, setPos] = useState({
    bottom: 0,
    height: 0,
    left: 0,
    right: 0,
    top: 0,
    width: 0,
    x: 0,
    y: 0,
  });

  useEffect(() => {
    if (elementRef.current == null) return;

    const elementPosition = elementRef.current?.getBoundingClientRect();

    setPos((prev) => ({
      ...prev,
      bottom: elementPosition.bottom,
      height: elementPosition.height,
      left: elementPosition.left,
      right: elementPosition.right,
      top: elementPosition.top,
      width: elementPosition.width,
      x: elementPosition.x,
      y: elementPosition.y,
    }));
  }, [elementRef]);

  useEffect(() => {
    function listener(this: HTMLElement, ev: globalThis.MouseEvent) {
      if (
        document.querySelector('#menu-button')?.isEqualNode(ev.target as Node) ||
        document.querySelector('#menu')?.isEqualNode(ev.target as Node)
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
      id='menu'
      onClick={(event) => event.stopPropagation()}
      className={`absolute z-40 max-h-44 overflow-y-auto rounded-md bg-gradient-to-br from-gray-100 from-30% to-gray-50 to-70% py-2 shadow-md dark:from-gray-900 dark:to-gray-800 dark:shadow-gray-600 ${open ? 'block' : 'hidden'}`}
      style={{
        top: pos.bottom + 10,
        left: pos.left,
      }}>
      {children}
    </ul>
  );
}
