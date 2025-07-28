import React from 'react';

interface TreeProps {
  children: React.ReactNode;
}

export function Tree({ children }: TreeProps) {
  return <div className='flex flex-col gap-8 border-l border-l-gray-400 pl-4 dark:border-l-gray-600'>{children}</div>;
}

interface LeafProps {
  top?: number;
  children: React.ReactNode;
}
export function Leaf({ top = 0, children }: LeafProps) {
  const circleTop = top - 2;
  const left = 32;
  const circleLeft = left + 4;

  return (
    <div className='relative pl-4'>
      <div
        className={`absolute z-1 h-1.5 w-1.5 rounded-full bg-black dark:bg-white`}
        style={{ transform: `translate(-${circleLeft}px, ${circleTop}px)` }}
      />
      <div
        className={`absolute w-5 border-b border-b-gray-400 dark:border-b-gray-600`}
        style={{ transform: `translate(-${left}px, ${top}px)` }}
      />
      {children}
    </div>
  );
}
