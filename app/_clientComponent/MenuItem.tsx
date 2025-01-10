'use client';

import { forwardRef, useImperativeHandle, useRef } from 'react';
import { twMerge } from 'tailwind-merge';

export const MenuItem = forwardRef(function MenuItem(
  {
    children,
    className,
    ...buttonProps
  }: React.DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>,
  ref,
) {
  const buttonRef = useRef<HTMLButtonElement>(null);

  useImperativeHandle(ref, () => buttonRef.current);

  return (
    <li>
      <button
        ref={buttonRef}
        className={twMerge('m-auto min-w-12 cursor-pointer py-1 text-center', ` ${className ?? ''}`)}
        {...buttonProps}
      >
        {children}
      </button>
    </li>
  );
});
