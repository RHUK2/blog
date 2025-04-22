jest.mock('next/navigation');
import { Footer } from '@/_clientComponent';
import { render, screen } from '@testing-library/react';
import { usePathname } from 'next/navigation';

describe('Footer', () => {
  test('"/"에서 Footer가 보인다.', () => {
    jest.mocked(usePathname).mockReturnValue('/');
    render(<Footer />);

    const footer = screen.getByRole('contentinfo');
    expect(footer).not.toHaveClass('hidden');
  });

  test('"/llm" Footer가 숨겨진다.', () => {
    jest.mocked(usePathname).mockReturnValue('/llm');
    render(<Footer />);

    const footer = screen.getByRole('contentinfo');
    expect(footer).toHaveClass('hidden');
  });
});
