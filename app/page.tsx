import { HeroSection } from '@/src/components/home/hero-section';
import { ProductShowcase } from '@/src/components/home/product-showcase';

export default function HomePage() {
  return (
    <main>
      <HeroSection />
      <ProductShowcase />
      <section id="quote" aria-label="دریافت استعلام" />
    </main>
  );
}
