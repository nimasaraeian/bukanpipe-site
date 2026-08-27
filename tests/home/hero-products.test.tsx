import { render, screen } from '@testing-library/react';
import HomePage from '@/app/page';

test('homepage has one clear hero heading and primary quote CTA', () => {
  render(<HomePage />);

  expect(screen.getAllByRole('heading', { level: 1 })).toHaveLength(1);
  expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(/جریان فردا/);
  expect(screen.getByRole('link', { name: /دریافت استعلام پروژه/ })).toHaveAttribute('href', '/#quote');
});

test('product section exposes the four primary application cards as crawlable links', () => {
  render(<HomePage />);

  expect(screen.getByRole('heading', { level: 2, name: /راهکارهای پلی اتیلن/ })).toBeInTheDocument();

  for (const category of ['آبرسانی', 'گازرسانی', 'کشاورزی', 'فاضلاب و زهکشی']) {
    expect(screen.getByRole('heading', { level: 3, name: category })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: new RegExp(`مشاهده ${category}`) })).toHaveAttribute('href', '/#quote');
  }
});
