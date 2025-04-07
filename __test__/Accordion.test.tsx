import { Accordion } from '@/_clientComponent/Accordion';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

describe('Accordion', () => {
  const title = 'Title';
  const list = [
    { behavior: 'Item 1', result: '' },
    { behavior: 'Item 2', result: '' },
    { behavior: 'Item 3', result: '' },
  ];

  test('토글 시 리스트가 보여짐과 숨겨짐을 반복한다.', async () => {
    render(<Accordion title={title} list={list} />);
    const button = screen.getByRole('button');

    list.forEach((item) => {
      expect(screen.queryByText(`• ${item.behavior}`)).not.toBeInTheDocument();
    });

    await userEvent.click(button);

    list.forEach((item) => {
      expect(screen.getByText(`• ${item.behavior}`)).toBeInTheDocument();
    });

    await userEvent.click(button);

    await waitFor(
      () => {
        list.forEach((item) => {
          expect(screen.queryByText(`• ${item.behavior}`)).not.toBeInTheDocument();
        });
      },
      { timeout: 1000 },
    );
  });

  test('오픈 시 데이터 수와 리스트 수가 동일하다.', async () => {
    render(<Accordion title={title} list={list} />);
    const button = screen.getByRole('button');

    await userEvent.click(button);

    expect(screen.getAllByRole('listitem')).toHaveLength(list.length);
  });
});
