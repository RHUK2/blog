'use client';

import { ButtonHTMLAttributes, DetailedHTMLProps, forwardRef, useImperativeHandle, useRef } from 'react';
import { twMerge } from 'tailwind-merge';

export const MenuItem = forwardRef(function MenuItem(
  {
    children,
    className,
    ...buttonProps
  }: DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>,
  ref,
) {
  const buttonRef = useRef<HTMLButtonElement | null>(null);

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
