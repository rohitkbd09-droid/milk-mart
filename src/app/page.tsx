import { ProductCard } from '@/components/product-card';
import { Button } from '@/components/ui/button';
import { products } from '@/lib/data';
import Link from 'next/link';

export default function Home() {
  return (
    <div className="container mx-auto px-4 py-8">
      <section className="text-center bg-primary/10 rounded-xl p-8 md:p-16 mb-12">
        <h1 className="text-4xl md:text-5xl font-bold font-headline text-primary-foreground/90 mb-4">
          Freshness Delivered Daily
        </h1>
        <p className="text-lg md:text-xl text-primary-foreground/70 max-w-2xl mx-auto mb-8">
          Start your day with the purest milk, brought straight from the farm to
          your doorstep.
        </p>
        <Button asChild size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90">
          <Link href="#products">Browse Products</Link>
        </Button>
      </section>

      <section id="products">
        <h2 className="text-3xl font-bold text-center mb-8 font-headline">
          Our Products
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>
    </div>
  );
}
