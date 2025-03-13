import React from 'react';

interface Props {
  children?: React.ReactNode;
  category?: string;
}

export function CategoryBox({ category, children }: Props) {
  return (
    <div className='flex flex-wrap gap-6'>
      <p className='flex min-w-32 flex-[1_0_0] whitespace-nowrap'>{category}</p>
      <div className={'flex min-w-2xs flex-[4_0_0] flex-col gap-8'}>{children}</div>
    </div>
  );
}
