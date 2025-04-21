import '@testing-library/jest-dom';
global.scrollTo = jest.fn();
global.ResizeObserver = jest.fn().mockReturnValue({
  observe: jest.fn(),
  unobserve: jest.fn(),
  disconnect: jest.fn(),
});
