'use client';

import { ButtonHTMLAttributes, ReactNode, forwardRef, useImperativeHandle, useRef } from 'react';

const Button = forwardRef(function Button(
  {
    children,
    className,
    buttonProps,
  }: { children: ReactNode; className?: string; buttonProps?: ButtonHTMLAttributes<HTMLButtonElement> },
  ref,
) {
  const buttonRef = useRef(null);

  useImperativeHandle(ref, () => buttonRef.current);

  return (
    <button
      ref={buttonRef}
      className={`min-h-8 min-w-12 rounded-md border border-gray-200 bg-gradient-to-br from-gray-100 from-30% to-gray-50 to-70% px-2 dark:border-gray-700 dark:from-gray-900 dark:to-gray-800  ${className ?? ''}`}
      {...buttonProps}>
      {children}
    </button>
  );
});

export default Button;
