import { Button } from '@/_clientComponent/Button';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

describe('Button', () => {
  test('children을 제대로 출력하는지 확인', () => {
    render(<Button>Test Button</Button>);
    expect(screen.getByText('Test Button')).toBeInTheDocument();
  });

  test('custom className을 제대로 적용하는지 확인', () => {
    render(<Button className='custom-class'>Test Button</Button>);
    const button = screen.getByRole('button');
    expect(button).toHaveClass('custom-class');
  });

  test('ref를 제대로 전달하는지 확인', () => {
    const ref = { current: null };
    render(<Button ref={ref}>Test Button</Button>);
    expect(ref.current).toBeInstanceOf(HTMLButtonElement);
  });

  test('클릭 이벤트를 제대로 처리하는지 확인', async () => {
    const handleClick = jest.fn();
    render(<Button onClick={handleClick}>Test Button</Button>);

    const button = screen.getByRole('button');
    await userEvent.click(button);

    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  test('default type이 button인지 확인', () => {
    render(<Button>Test Button</Button>);
    const button = screen.getByRole('button');
    expect(button).toHaveAttribute('type', 'button');
  });

  test('추가적인 props를 제대로 적용하는지 확인', () => {
    render(
      <Button data-testid='test-button' aria-label='test'>
        Test Button
      </Button>,
    );
    const button = screen.getByRole('button');
    expect(button).toHaveAttribute('data-testid', 'test-button');
    expect(button).toHaveAttribute('aria-label', 'test');
  });
});
