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
          <a className={styles.cta} href="/#quote">درخواست مشاوره <span aria-hidden="true">↗</span></a>
        </div>

        <div className={styles.grid}>
          <a href="/" className={styles.brand} aria-label="بوکان پایپ — صفحه اصلی"><BrandMark /></a>
          <div>
            <strong>محصولات</strong>
            <a href="/#products">کاربردهای لوله پلی اتیلن</a>
            <a href="/#featured-material">PE100</a>
          </div>
          <div>
            <strong>دسترسی سریع</strong>
            <a href="/#projects">پروژه‌ها</a>
            <a href="/#laboratory">آزمایشگاه</a>
            <a href="/#knowledge">دانش فنی</a>
          </div>
          <div>
            <strong>شرکت</strong>
            <a href="/#about">درباره ما</a>
            <a href="/#quote">دریافت استعلام</a>
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
