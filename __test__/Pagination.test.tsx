import { Pagination } from '@/_clientComponent';
import { render, screen } from '@testing-library/react';
import { useRouter, usePathname, useSearchParams } from 'next/navigation';

jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
  usePathname: jest.fn(),
  useSearchParams: jest.fn(),
}));

describe('Pagination Cdomponent', () => {
  const mockPush = jest.fn();
  const mockPathname = '/test-path';
  const mockSearchParams = new URLSearchParams();

  beforeEach(() => {
    jest.clearAllMocks();
    (useRouter as jest.Mock).mockReturnValue({ push: mockPush });
    (usePathname as jest.Mock).mockReturnValue(mockPathname);
    (useSearchParams as jest.Mock).mockReturnValue(mockSearchParams);
  });

  it('renders the pagination buttons correctly', () => {
    render(<Pagination totalCount={50} size={10} />);

    expect(screen.getByText('<')).toBeInTheDocument();
    expect(screen.getByText('1')).toBeInTheDocument();
    expect(screen.getByText('>')).toBeInTheDocument();
  });

  //   it('navigates to the previous page when the "<" button is clicked', () => {
  //     mockSearchParams.set('page', '1');
  //     render(<Pagination totalCount={50} size={10} />);

  //     fireEvent.click(screen.getByText('<'));
  //     expect(mockPush).toHaveBeenCalledWith(`${mockPathname}?page=0`);
  //   });

  //   it('navigates to the next page when the ">" button is clicked', () => {
  //     mockSearchParams.set('page', '1');
  //     render(<Pagination totalCount={50} size={10} />);

  //     fireEvent.click(screen.getByText('>'));
  //     expect(mockPush).toHaveBeenCalledWith(`${mockPathname}?page=2`);
  //   });

  //   it('opens the menu when the current page button is clicked', () => {
  //     render(<Pagination totalCount={50} size={10} />);

  //     const currentPageButton = screen.getByText('1');
  //     fireEvent.click(currentPageButton);

  //     expect(screen.getByRole('menu')).toBeInTheDocument();
  //   });

  //   it('navigates to the selected page when a menu item is clicked', () => {
  //     render(<Pagination totalCount={50} size={10} />);

  //     const currentPageButton = screen.getByText('1');
  //     fireEvent.click(currentPageButton);

  //     const menuItem = screen.getByText('3');
  //     fireEvent.click(menuItem);

  //     expect(mockPush).toHaveBeenCalledWith(`${mockPathname}?page=2`);
  //   });
});
