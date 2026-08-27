import Link from 'next/link';
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
        <Link key={item.href + item.label} href={item.href} className={styles.navLink}>
          {item.label}
        </Link>
      ))}
    </>
  );
}

export function SiteHeader() {
  return (
    <header className={styles.header}>
      <Container className={styles.inner}>
        <Link href="/" className={styles.brand} aria-label="بوکان پایپ — صفحه اصلی">
          <BrandMark />
        </Link>

        <nav className={styles.desktopNav} aria-label="ناوبری اصلی">
          <NavigationLinks />
        </nav>

        <div className={styles.actions}>
          <span className={styles.language} aria-label="زبان فارسی">FA</span>
          <Link href="/#quote" className={styles.quoteCta}>دریافت استعلام <span aria-hidden="true">↗</span></Link>
        </div>

        <details className={styles.mobileMenu}>
          <summary aria-label="باز کردن منوی ناوبری"><span></span><span></span><span></span></summary>
          <nav className={styles.mobileNav} aria-label="ناوبری اصلی موبایل">
            <NavigationLinks />
            <Link href="/#quote" className={styles.mobileQuote}>دریافت استعلام <span aria-hidden="true">↗</span></Link>
          </nav>
        </details>
      </Container>
    </header>
  );
}
