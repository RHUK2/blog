import * as React from 'react';

import { cn } from '@/shared/lib';

function Textarea({ className, onChange, onFocus, onKeyUp, ...props }: React.ComponentProps<'textarea'>) {
  return (
    <textarea
      data-slot='textarea'
      onFocus={(event) => {
        const maxHeight = parseInt(getComputedStyle(event.target).lineHeight) * 7;

        event.target.style.setProperty('max-height', `${maxHeight}px`);

        onFocus?.(event);
      }}
      onChange={(event) => {
        event.target.style.setProperty('height', 'auto');
        event.target.style.setProperty('height', `${event.target.scrollHeight + event.target.clientTop * 2}px`);
        event.target.scrollTop = event.target.scrollHeight;

        onChange?.(event);
      }}
      onKeyUp={(event) => {
        if (event.currentTarget.value === '') {
          event.currentTarget.style.setProperty('height', 'auto');
        }

        onKeyUp?.(event);
      }}
      className={cn(
        'border-input placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:border-destructive aria-invalid:ring-destructive/20 dark:bg-input/30 dark:aria-invalid:border-destructive/50 dark:aria-invalid:ring-destructive/40 flex field-sizing-content min-h-16 w-full rounded-md border bg-transparent px-2.5 py-2 text-base shadow-xs transition-[color,box-shadow] outline-none focus-visible:ring-3 disabled:cursor-not-allowed disabled:opacity-50 aria-invalid:ring-3 md:text-sm',
        className,
      )}
      {...props}
    />
  );
}

export { Textarea };
