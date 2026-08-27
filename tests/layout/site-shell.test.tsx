import { render, screen } from '@testing-library/react';
import { SiteHeader } from '@/src/components/layout/site-header';
import { SiteFooter } from '@/src/components/layout/site-footer';

test('header exposes semantic navigation and quote CTA', () => {
  render(<SiteHeader />);

  expect(screen.getByRole('navigation', { name: 'ناوبری اصلی' })).toBeInTheDocument();
  expect(screen.getAllByRole('link', { name: /دریافت استعلام/ }).length).toBeGreaterThanOrEqual(1);
  expect(screen.getByRole('link', { name: /بوکان پایپ/ })).toHaveAttribute('href', '/');
});

test('footer exposes a contact-oriented closing section', () => {
  render(<SiteFooter />);

  expect(screen.getByRole('contentinfo')).toBeInTheDocument();
  expect(screen.getByText(/زیرساختی برای جریان فردا/)).toBeInTheDocument();
});
