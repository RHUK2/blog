'use client';

import { ButtonHTMLAttributes, DetailedHTMLProps, forwardRef, useEffect, useImperativeHandle, useRef } from 'react';
import { twMerge } from 'tailwind-merge';

interface MenuItemProps extends DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement> {
  active?: boolean;
}

export const MenuItem = forwardRef(function MenuItem(
  { children, className, active, ...buttonProps }: MenuItemProps,
  ref,
) {
  const buttonRef = useRef<HTMLButtonElement | null>(null);

  useImperativeHandle(ref, () => buttonRef.current);

  useEffect(() => {
    if (active) {
      buttonRef.current?.scrollIntoView({ block: 'center' });
    }
  }, [active]);

  return (
    <li>
      <button
        ref={buttonRef}
        className={twMerge(
          'min-w-16 cursor-pointer px-3 py-2 text-center whitespace-nowrap hover:bg-gray-100 hover:font-bold dark:hover:bg-gray-800',
          active && 'bg-gray-200 font-medium dark:bg-gray-700',
          className,
        )}
        {...buttonProps}
      >
        {children}
      </button>
    </li>
  );
});
