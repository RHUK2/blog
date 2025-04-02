import { render } from '@testing-library/react';
import ArrowUp from '../public/assets/arrow-up.svg';
console.log('. / Svgr.test.tsx:3 / ArrowUp\n\n', ArrowUp);

test('mocking', () => {
  render(<ArrowUp />);
});
