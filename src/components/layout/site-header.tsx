import { BrandMark } from './brand-mark';
import { Container } from '@/src/components/ui/container';
import styles from './site-header.module.css';

const navigation = [
  { href: '/', label: 'صفحه اصلی' },
  { href: '/#products', label: 'محصولات' },
  { href: '/#projects', label: 'پروژه‌ها' },
  { href: '/#laboratory', label: 'آزمایشگاه' },
  { href: '/#knowledge', label: 'دانش فنی' },
  { href: '/#about', label: 'درباره ما' },
  { href: '/#contact', label: 'تماس با ما' },
] as const;

function NavigationLinks() {
  return (
    <>
      {navigation.map((item) => (
        <a key={item.href + item.label} href={item.href} className={styles.navLink}>
          {item.label}
        </a>
      ))}
    </>
  );
}

export function SiteHeader() {
  return (
    <header className={styles.header}>
      <Container className={styles.inner}>
        <a href="/" className={styles.brand} aria-label="بوکان پایپ — صفحه اصلی">
          <BrandMark />
        </a>

        <nav className={styles.desktopNav} aria-label="ناوبری اصلی">
          <NavigationLinks />
        </nav>

        <div className={styles.actions}>
          <span className={styles.language} aria-label="زبان فارسی">FA</span>
          <a href="/#quote" className={styles.quoteCta}>دریافت استعلام <span aria-hidden="true">↗</span></a>
        </div>

        <details className={styles.mobileMenu}>
          <summary aria-label="باز کردن منوی ناوبری"><span></span><span></span><span></span></summary>
          <nav className={styles.mobileNav} aria-label="ناوبری اصلی موبایل">
            <NavigationLinks />
            <a href="/#quote" className={styles.mobileQuote}>دریافت استعلام <span aria-hidden="true">↗</span></a>
          </nav>
        </details>
      </Container>
    </header>
  );
}
