import Link from 'next/link';
import { Container } from '@/src/components/ui/container';
import styles from './home.module.css';

const products = [
  {
    slug: 'water',
    title: 'آبرسانی',
    english: 'WATER',
    description: 'راهکارهای انتقال آب برای پروژه‌های شهری، صنعتی و شبکه‌های زیرساختی.',
    meta: ['انتقال آب', 'شبکه‌های فشار'],
    variant: 'featured',
  },
  {
    slug: 'gas',
    title: 'گازرسانی',
    english: 'GAS',
    description: 'راهکارهای پلی اتیلن برای شبکه‌های گازرسانی با تمرکز بر الزامات فنی پروژه.',
    meta: ['شبکه گاز', 'کنترل کیفیت'],
    variant: 'compact',
  },
  {
    slug: 'agriculture',
    title: 'کشاورزی',
    english: 'AGRICULTURE',
    description: 'انتقال و توزیع آب برای آبیاری و زیرساخت‌های کشاورزی.',
    meta: ['آبیاری', 'انتقال آب'],
    variant: 'compact',
  },
  {
    slug: 'drainage',
    title: 'فاضلاب و زهکشی',
    english: 'DRAINAGE',
    description: 'راهکارهای انتقال سیالات و زهکشی برای پروژه‌های عمرانی و زیرساختی.',
    meta: ['زهکشی', 'زیرساخت'],
    variant: 'wide',
  },
] as const;

type Product = (typeof products)[number];

function ProductArtwork({ product }: { product: Product }) {
  return (
    <div className={`${styles.cardArtwork} ${styles[`art-${product.slug}`]}`} aria-hidden="true">
      <div className={styles.artPipeLarge}><span /></div>
      <div className={styles.artPipeSmall}><span /></div>
      <div className={styles.artLine} />
      <span className={styles.artLabel}>{product.english}</span>
    </div>
  );
}

export function ProductShowcase() {
  return (
    <section className={styles.productsSection} id="products" aria-labelledby="products-title">
      <Container>
        <div className={styles.sectionIntro}>
          <div>
            <p className={styles.lightEyebrow}>PRODUCT UNIVERSE</p>
            <h2 id="products-title">راهکارهای پلی اتیلن برای پروژه‌های واقعی</h2>
          </div>
          <p>
            ساختار محصولات را بر اساس کاربرد پروژه طراحی کرده‌ایم تا مسیر انتخاب، بررسی مشخصات
            و دریافت استعلام سریع و روشن باشد.
          </p>
        </div>

        <div className={styles.productGrid}>
          {products.map((product) => (
            <article
              className={`${styles.productCard} ${styles[`card-${product.variant}`]}`}
              key={product.slug}
            >
              <ProductArtwork product={product} />
              <div className={styles.cardOverlay} />
              <div className={styles.cardContent}>
                <div className={styles.cardTopline}>
                  <span>{product.english}</span>
                  <span>BUKAN PIPE</span>
                </div>
                <div className={styles.cardBody}>
                  <h3>{product.title}</h3>
                  <p>{product.description}</p>
                </div>
                <div className={styles.cardFooter}>
                  <div className={styles.cardMeta}>
                    {product.meta.map((item) => <span key={item}>{item}</span>)}
                  </div>
                  <Link href="/#quote" aria-label={`مشاهده ${product.title}`}>
                    <span>مشاهده</span><b aria-hidden="true">↗</b>
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>
      </Container>
    </section>
  );
}
