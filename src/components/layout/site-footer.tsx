import Link from 'next/link';
import { BrandMark } from './brand-mark';
import { Container } from '@/src/components/ui/container';
import styles from './site-footer.module.css';

export function SiteFooter() {
  return (
    <footer id="contact" className={styles.footer}>
      <Container>
        <div className={styles.topline}>
          <div>
            <span className={styles.eyebrow}>BUKAN PIPE</span>
            <h2>زیرساختی برای جریان فردا</h2>
            <p>برای انتخاب محصول و بررسی نیاز پروژه، با تیم بوکان پایپ در ارتباط باشید.</p>
          </div>
          <Link className={styles.cta} href="/#quote">درخواست مشاوره <span aria-hidden="true">↗</span></Link>
        </div>

        <div className={styles.grid}>
          <Link href="/" className={styles.brand} aria-label="بوکان پایپ — صفحه اصلی"><BrandMark /></Link>
          <div>
            <strong>محصولات</strong>
            <Link href="/#products">کاربردهای لوله پلی اتیلن</Link>
            <Link href="/#featured-material">PE100</Link>
          </div>
          <div>
            <strong>دسترسی سریع</strong>
            <Link href="/#projects">پروژه‌ها</Link>
            <Link href="/#laboratory">آزمایشگاه</Link>
            <Link href="/#knowledge">دانش فنی</Link>
          </div>
          <div>
            <strong>شرکت</strong>
            <Link href="/#about">درباره ما</Link>
            <Link href="/#quote">دریافت استعلام</Link>
          </div>
        </div>

        <div className={styles.bottom}>
          <span>© {new Date().getFullYear()} Bukan Pipe</span>
          <span>طراحی شده برای سرعت، دسترس‌پذیری و جست‌وجوی بهتر</span>
        </div>
      </Container>
    </footer>
  );
}
