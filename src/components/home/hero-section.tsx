import Link from 'next/link';
import { Container } from '@/src/components/ui/container';
import styles from './home.module.css';

function PipeScene() {
  return (
    <div className={styles.pipeScene} aria-hidden="true">
      <div className={`${styles.pipe} ${styles.pipeA}`}><span /></div>
      <div className={`${styles.pipe} ${styles.pipeB}`}><span /></div>
      <div className={`${styles.pipe} ${styles.pipeC}`}><span /></div>
      <div className={`${styles.pipe} ${styles.pipeD}`}><span /></div>
      <div className={styles.sceneGlow} />
      <span className={`${styles.sceneTag} ${styles.tagTop}`}>POLYETHYLENE</span>
      <span className={`${styles.sceneTag} ${styles.tagBottom}`}>ENGINEERED FLOW</span>
    </div>
  );
}

const trustItems = [
  ['01', 'تولید صنعتی'],
  ['02', 'کنترل کیفیت'],
  ['03', 'راهکارهای زیرساختی'],
  ['04', 'پشتیبانی فنی'],
] as const;

export function HeroSection() {
  return (
    <section className={styles.hero} aria-labelledby="hero-title">
      <div className={styles.heroGrid} aria-hidden="true" />
      <Container className={styles.heroContainer}>
        <div className={styles.heroCopy}>
          <p className={styles.eyebrow}>BUKAN PIPE / INDUSTRIAL SYSTEMS</p>
          <h1 id="hero-title">زیرساختی برای <span>جریان فردا.</span></h1>
          <p className={styles.heroLead}>
            راهکارهای لوله پلی اتیلن برای پروژه‌های آبرسانی، گازرسانی، کشاورزی و زیرساخت؛
            با تمرکز بر انتخاب فنی، کیفیت و اجرای مطمئن.
          </p>
          <div className={styles.heroActions}>
            <Link className={styles.primaryCta} href="/#quote">
              دریافت استعلام پروژه <span aria-hidden="true">↗</span>
            </Link>
            <Link className={styles.secondaryCta} href="/#products">
              مشاهده راهکارها <span aria-hidden="true">↓</span>
            </Link>
          </div>
          <div className={styles.heroMeta}>
            <span>WATER</span><i />
            <span>GAS</span><i />
            <span>AGRICULTURE</span><i />
            <span>INFRASTRUCTURE</span>
          </div>
        </div>

        <div className={styles.heroVisual}>
          <PipeScene />
        </div>
      </Container>

      <div className={styles.trustBar}>
        <Container className={styles.trustGrid}>
          {trustItems.map(([index, label]) => (
            <div className={styles.trustItem} key={label}>
              <span>{index}</span>
              <strong>{label}</strong>
            </div>
          ))}
        </Container>
      </div>
    </section>
  );
}
