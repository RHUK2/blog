'use client';

import React from 'react';
import { twJoin, twMerge } from 'tailwind-merge';

type PolymorphicProps<T extends React.ElementType> = {
  as?: T;
} & React.ComponentPropsWithoutRef<T>;

export function Badge<T extends React.ElementType>(props: PolymorphicProps<T>) {
  const { as: Component = 'div', children, className, ...rest } = props;
  const mergedClassName = twMerge(
    twJoin(
      [
        'flex w-min items-center gap-1 rounded-xl border border-gray-300 bg-gray-100 px-2 py-1',
        'text-xs font-medium whitespace-nowrap',
        'dark:border-gray-700 dark:bg-gray-800',
      ],
      className,
    ),
  );

  return (
    <Component className={mergedClassName} {...rest}>
      {children}
    </Component>
  );
}
