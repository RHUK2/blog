import RootPage from '@/app/page';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

describe('루트 페이지 통합 테스트', () => {
  test('루트 페이지 Accordion 동작 확인', () => {
    const user = userEvent.setup();
    render(<RootPage />);

    const accordionButton = screen.getAllByRole('button', { name: /경험 살펴보기/i });

    accordionButton.forEach(async (element) => {
      expect(element).toBeInTheDocument();
      expect(element).toHaveAttribute('aria-expanded', 'false');
      await user.click(element);
      expect(element).toHaveAttribute('aria-expanded', 'true');
    });
  });
});
