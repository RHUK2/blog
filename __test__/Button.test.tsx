import { Button } from '@/_clientComponent';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

describe('Button', () => {
  test('twMerge로 className이 머지된다.', () => {
    render(<Button className='custom-class'>Test Button</Button>);

    const button = screen.getByRole('button');

    expect(button).toHaveClass('custom-class');
  });

  test('forwardRef를 통해 ref가 전달된다.', () => {
    const ref = { current: null };
    render(<Button ref={ref}>Test Button</Button>);

    expect(ref.current).toBeInstanceOf(HTMLButtonElement);
  });

  test('클릭 이벤트가 제대로 처리된다.', async () => {
    const handleClick = jest.fn();
    render(<Button onClick={handleClick}>Test Button</Button>);

    const button = screen.getByRole('button');

    await userEvent.click(button);

    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  test('button type의 기본값은 button이다.', () => {
    render(<Button>Test Button</Button>);

    const button = screen.getByRole('button');

    expect(button).toHaveAttribute('type', 'button');
  });

  test('추가적인 Props가 제대로 전달된다.', () => {
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
