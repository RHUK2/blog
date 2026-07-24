import React from 'react';

interface TreeProps {
  children: React.ReactNode;
}

export function Tree({ children }: TreeProps) {
  return <div className='border-l-border flex flex-col gap-8 border-l-2 pl-4'>{children}</div>;
}

interface LeafProps {
  top?: number;
  children: React.ReactNode;
}
export function Leaf({ top = 0, children }: LeafProps) {
  const circleTop = top - 4;
  const left = 32;
  const circleLeft = left + 5;

  return (
    <div className='relative pl-4'>
      <div
        className={`bg-foreground ring-background absolute z-1 size-2.5 rounded-full ring-4`}
        style={{ transform: `translate(-${circleLeft}px, ${circleTop}px)` }}
      />
      <div
        className={`border-b-border absolute w-5 border-b-2`}
        style={{ transform: `translate(-${left}px, ${top}px)` }}
      />
      {children}
    </div>
  );
}
