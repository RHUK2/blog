import { DarkLightButton } from '@/clientComponents';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

describe('DarkLightButton', () => {
  const mockMatchMedia = (matches: boolean) =>
    Object.defineProperty(window, 'matchMedia', {
      writable: true,
      value: jest.fn().mockImplementation((query) => ({
        matches: matches,
        media: query,
        onchange: null,
        addListener: jest.fn(), // deprecated
        removeListener: jest.fn(), // deprecated
        addEventListener: jest.fn(),
        removeEventListener: jest.fn(),
        dispatchEvent: jest.fn(),
      })),
    });

  beforeEach(() => {
    localStorage.clear();
    document.documentElement.classList.remove('dark');
  });

  test('사용자 시스템이 다크 모드일 때 다크 모드로 초기화된다.', () => {
    mockMatchMedia(true);
    render(<DarkLightButton />);

    expect(localStorage.getItem('theme')).toBe('dark');
    expect(document.documentElement.classList.contains('dark')).toBe(true);
    expect(screen.getByRole('button')).toHaveClass('justify-start');
  });

  test('사용자 시스템이 라이트 모드일 때 라이트 모드로 초기화된다.', () => {
    mockMatchMedia(false);
    render(<DarkLightButton />);

    expect(localStorage.getItem('theme')).toBe('light');
    expect(document.documentElement.classList.contains('dark')).toBe(false);
    expect(screen.getByRole('button')).toHaveClass('justify-end');
  });

  test('localStorage에 저장된 테마가 있을 경우 해당 테마로 초기화된다.', () => {
    mockMatchMedia(true);
    localStorage.setItem('theme', 'light');
    render(<DarkLightButton />);

    expect(localStorage.getItem('theme')).toBe('light');
    expect(document.documentElement.classList.contains('dark')).toBe(false);
    expect(screen.getByRole('button')).toHaveClass('justify-end');
  });

  test('버튼 클릭 시 테마가 토글되어야 한다.', async () => {
    mockMatchMedia(false);
    render(<DarkLightButton />);
    const button = screen.getByRole('button');

    expect(localStorage.getItem('theme')).toBe('light');
    expect(document.documentElement.classList.contains('dark')).toBe(false);
    expect(button).toHaveClass('justify-end');

    await userEvent.click(button);

    expect(localStorage.getItem('theme')).toBe('dark');
    expect(document.documentElement.classList.contains('dark')).toBe(true);
    expect(button).toHaveClass('justify-start');

    await userEvent.click(button);

    expect(localStorage.getItem('theme')).toBe('light');
    expect(document.documentElement.classList.contains('dark')).toBe(false);
    expect(button).toHaveClass('justify-end');
  });
});
