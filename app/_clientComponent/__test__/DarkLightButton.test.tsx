import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { DarkLightButton } from '../DarkLightButton';

describe('DarkLightButton', () => {
  const mockMatchMedia = (matches: boolean) =>
    Object.defineProperty(window, 'matchMedia', {
      writable: true,
      value: vi.fn().mockImplementation((query) => ({
        matches: matches,
        media: query,
        onchange: null,
        addListener: vi.fn(), // deprecated
        removeListener: vi.fn(), // deprecated
        addEventListener: vi.fn(),
        removeEventListener: vi.fn(),
        dispatchEvent: vi.fn(),
      })),
    });

  beforeEach(() => {
    localStorage.clear();
    document.documentElement.classList.remove('dark');
  });

  test('시스템이 다크 모드일 때 다크 테마로 초기화', () => {
    mockMatchMedia(true);
    render(<DarkLightButton />);

    expect(localStorage.getItem('theme')).toBe('dark');
    expect(document.documentElement.classList.contains('dark')).toBe(true);
    expect(screen.getByRole('button')).toHaveClass('justify-start');
  });

  test('시스템이 라이트 모드일 때 라이트 테마로 초기화', () => {
    mockMatchMedia(false);
    render(<DarkLightButton />);

    expect(localStorage.getItem('theme')).toBe('light');
    expect(document.documentElement.classList.contains('dark')).toBe(false);
    expect(screen.getByRole('button')).toHaveClass('justify-end');
  });

  test('localStorage에 저장된 테마가 있을 경우 해당 테마로 초기화', () => {
    mockMatchMedia(true); // 시스템은 다크 모드지만
    localStorage.setItem('theme', 'light'); // localStorage에는 라이트 모드가 저장됨
    render(<DarkLightButton />);

    expect(localStorage.getItem('theme')).toBe('light');
    expect(document.documentElement.classList.contains('dark')).toBe(false);
    expect(screen.getByRole('button')).toHaveClass('justify-end');
  });

  test('버튼 클릭 시 테마가 토글되어야 함', async () => {
    mockMatchMedia(false);
    render(<DarkLightButton />);
    const button = screen.getByRole('button');

    // 초기 상태 (라이트)
    expect(localStorage.getItem('theme')).toBe('light');
    expect(document.documentElement.classList.contains('dark')).toBe(false);
    expect(button).toHaveClass('justify-end');

    // 다크 모드로 토글
    await userEvent.click(button);

    expect(localStorage.getItem('theme')).toBe('dark');
    expect(document.documentElement.classList.contains('dark')).toBe(true);
    expect(button).toHaveClass('justify-start');

    // 다시 라이트 모드로 토글
    await userEvent.click(button);

    expect(localStorage.getItem('theme')).toBe('light');
    expect(document.documentElement.classList.contains('dark')).toBe(false);
    expect(button).toHaveClass('justify-end');
  });
});
