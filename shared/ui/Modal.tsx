'use client';

import { useEffect } from 'react';
import { createPortal } from 'react-dom';

interface ModalProps {
  isOpen: boolean;
  close: () => void;
  children: React.ReactNode;
}

export function Modal({ isOpen, close, children }: ModalProps) {
  useEffect(() => {
    if (!isOpen) return;

    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === 'Escape') close();
    }

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, close]);

  if (!isOpen) return null;

  return createPortal(
    <>
      <div className='fixed inset-0 z-40 h-full bg-black/50' onClick={close} />
      <div className='fixed top-1/4 left-1/2 z-50 w-full max-w-lg -translate-x-1/2 rounded-lg bg-white p-4 shadow-lg dark:bg-gray-900'>
        {children}
      </div>
    </>,
    document.body,
  );
}
