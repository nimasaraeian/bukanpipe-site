import { render, screen } from '@testing-library/react';
import HomePage from '@/app/page';

test('renders a single Bukan Pipe homepage heading', () => {
  render(<HomePage />);
  const heading = screen.getByRole('heading', { level: 1 });
  expect(heading).toHaveTextContent(/بوکان پایپ|جریان فردا/);
});
