import { Menu } from '@/_clientComponent/Menu';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { useRef, useState } from 'react';

describe('Menu', () => {
  const TestComponent = () => {
    const controlRef = useRef<HTMLButtonElement>(null);
    const [open, setOpen] = useState(false);

    return (
      <>
        <button ref={controlRef} onClick={() => setOpen((prev) => !prev)}>
          Toggle Menu
        </button>
        <Menu control={controlRef} open={open} onClose={() => setOpen(false)}>
          <li>Item 1</li>
          <li>Item 2</li>
        </Menu>
      </>
    );
  };

  test('클릭으로 토글 시 리스트가 열림과 닫힘을 반복한다.', async () => {
    render(<TestComponent />);
    const toggleButton = screen.getByRole('button', { name: 'Toggle Menu' });

    expect(screen.queryAllByRole('listitem')).toHaveLength(0);

    await userEvent.click(toggleButton);

    expect(screen.queryAllByRole('listitem')).toHaveLength(2);

    await userEvent.click(toggleButton);

    expect(screen.queryAllByRole('listitem')).toHaveLength(0);
  });

  test('Enter 키로 토글 시 리스트가 열림과 닫힘을 반복한다.', async () => {
    render(<TestComponent />);
    const toggleButton = screen.getByRole('button', { name: 'Toggle Menu' });

    expect(screen.queryAllByRole('listitem')).toHaveLength(0);

    toggleButton.focus();
    await userEvent.keyboard('{Enter}');

    expect(screen.queryAllByRole('listitem')).toHaveLength(2);

    await userEvent.keyboard('{Enter}');

    expect(screen.queryAllByRole('listitem')).toHaveLength(0);
  });

  test('토글 버튼 외 영역 클릭 시 리스트가 닫힌다.', async () => {
    render(<TestComponent />);
    const toggleButton = screen.getByRole('button', { name: 'Toggle Menu' });

    expect(screen.queryAllByRole('listitem')).toHaveLength(0);

    await userEvent.click(toggleButton);

    expect(screen.queryAllByRole('listitem')).toHaveLength(2);

    await userEvent.click(document.body);

    expect(screen.queryAllByRole('listitem')).toHaveLength(0);

    await userEvent.click(toggleButton);

    expect(screen.queryAllByRole('listitem')).toHaveLength(2);

    await userEvent.click(screen.getByText('Item 1'));

    expect(screen.queryAllByRole('listitem')).toHaveLength(0);
  });
});
