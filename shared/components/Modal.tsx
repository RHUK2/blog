import { createContext, useContext } from 'react';
import invariant from 'tiny-invariant';

interface ModalContext {
  isOpen: boolean;
  close: () => void;
}

const ModalContext = createContext<ModalContext | null>(null);

interface ModalProps {
  isOpen: boolean;
  close: () => void;
  children: React.ReactNode;
}

export function Modal({ isOpen, close, children }: ModalProps) {
  return (
    <ModalContext.Provider value={{ isOpen, close }}>
      <div>{children}</div>
    </ModalContext.Provider>
  );
}

function useModal() {
  const context = useContext(ModalContext);

  invariant(context, 'useModal must be used within a Modal');

  return context;
}

export function ModalHeader() {
  const { isOpen, close } = useModal();

  return (
    <div className={`modal-header ${isOpen ? 'open' : ''}`}>
      <h2>Modal Title</h2>
      <button onClick={close} className='close-button'>
        &times;
      </button>
    </div>
  );
}

export function ModalContent() {
  const { isOpen, close } = useModal();

  return <div></div>;
}

export function ModalFooter() {
  const { isOpen, close } = useModal();

  return <div></div>;
}

export function ModalOverlay() {
  const { isOpen, close } = useModal();

  return <div></div>;
}
