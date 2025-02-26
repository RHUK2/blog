import { render, screen } from '@testing-library/react';
import { Footer } from '../Footer';
import { usePathname } from 'next/navigation';

// next/navigation 모킹
vi.mock('next/navigation');

describe('Footer', async () => {
  test('기본 경로에서 Footer가 보이는지 확인', () => {
    vi.mocked(usePathname).mockReturnValue('/');
    render(<Footer />);

    const footer = screen.getByRole('contentinfo');
    expect(footer).toBeVisible();
    expect(footer).toHaveClass('w-full');
  });

  test('/llm 경로에서 Footer가 숨겨지는지 확인', () => {
    vi.mocked(usePathname).mockReturnValue('/llm');
    render(<Footer />);

    const footer = screen.getByRole('contentinfo');
    expect(footer).toHaveClass('hidden');
  });
});
