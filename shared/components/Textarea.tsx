'use client';

import { DetailedHTMLProps, forwardRef, TextareaHTMLAttributes, useImperativeHandle, useRef } from 'react';
import { twMerge } from 'tailwind-merge';

export const Textarea = forwardRef(function Textarea(
  {
    className,
    onChange,
    onFocus,
    onKeyUp,
    ...textareaProps
  }: DetailedHTMLProps<TextareaHTMLAttributes<HTMLTextAreaElement>, HTMLTextAreaElement>,
  ref,
) {
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);

  useImperativeHandle(ref, () => textareaRef.current);

  return (
    <textarea
      ref={textareaRef}
      onFocus={(event) => {
        const maxHeight = parseInt(getComputedStyle(event.target).lineHeight) * 7;

        event.target.style.setProperty('max-height', `${maxHeight}px`);

        if (onFocus) onFocus(event);
      }}
      onChange={(event) => {
        event.target.style.setProperty('height', 'auto');
        event.target.style.setProperty('height', `${event.target.scrollHeight + event.target.clientTop * 2}px`);
        event.target.scrollTop = event.target.scrollHeight;

        if (onChange) onChange(event);
      }}
      onKeyUp={(event) => {
        if (event.currentTarget.value === '') {
          event.currentTarget.style.setProperty('height', 'auto');
        }

        if (onKeyUp) onKeyUp(event);
      }}
      className={twMerge(
        'resize-none rounded-md border border-gray-400 bg-transparent bg-gradient-to-br from-gray-50 to-gray-100 px-3 py-2 dark:border-gray-700 dark:from-gray-900 dark:to-gray-800',
        `${className ?? ''}`,
      )}
      {...textareaProps}
    />
  );
});
