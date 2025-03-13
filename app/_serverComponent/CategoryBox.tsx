import React from 'react';

interface Props {
  children?: React.ReactNode;
  category?: string;
}

export function CategoryBox({ category, children }: Props) {
  return (
    <div className='flex gap-6'>
      <p className='flex-[1_0_0] whitespace-nowrap'>{category}</p>
      <div className={'flex flex-[4_0_0] flex-col gap-8'}>{children}</div>
    </div>
  );
}
