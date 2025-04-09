import { Accordion } from '@/_clientComponent/Accordion';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

describe('Accordion', () => {
  const title = 'Title';
  const list = [
    { behavior: 'behavior 1', result: 'result 1' },
    { behavior: 'behavior 2', result: 'result 2' },
    { behavior: 'behavior 3', result: 'result 3' },
  ];

  test('토글 시 리스트가 보여짐과 숨겨짐을 반복한다.', async () => {
    render(<Accordion title={title} list={list} />);
    const button = screen.getByRole('button');

    expect(screen.queryAllByRole('listitem')).toHaveLength(0);

    await userEvent.click(button);

    expect(screen.getAllByRole('listitem')).toHaveLength(list.length);

    await userEvent.click(button);

    await waitFor(
      () => {
        expect(screen.queryAllByRole('listitem')).toHaveLength(0);
      },
      { timeout: 1000 },
    );
  });
});
