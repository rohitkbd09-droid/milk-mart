'use client';

import { products } from '@/lib/data';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Minus, Plus, ShoppingCart } from 'lucide-react';
import { useState } from 'react';
import Link from 'next/link';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { useToast } from '@/hooks/use-toast';

export default function ProductPage({ params }: { params: { id: string } }) {
  const { toast } = useToast();
  const [quantity, setQuantity] = useState(1);
  const product = products.find((p) => p.id === params.id);

  if (!product) {
    notFound();
  }
  
  const placeholder = PlaceHolderImages.find(p => p.imageUrl === product.image);
  const imageHint = placeholder?.imageHint ?? 'milk';

  const handleAddToCart = () => {
    toast({
        title: "Added to cart!",
        description: `${quantity} litre(s) of ${product.name} added to your cart.`,
    });
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="grid md:grid-cols-2 gap-8 lg:gap-16 items-start">
        <div className="aspect-[4/3] relative rounded-lg overflow-hidden shadow-lg">
          <Image
            src={product.image}
            alt={product.name}
            fill
            className="object-cover"
            data-ai-hint={imageHint}
          />
        </div>

        <div className="flex flex-col gap-6">
          <div className='space-y-2'>
            <h1 className="text-3xl md:text-4xl font-bold font-headline">
              {product.name}
            </h1>
            <p className="text-2xl font-semibold text-primary">
              ${product.price.toFixed(2)} / litre
            </p>
            <p className="text-muted-foreground">{product.description}</p>
          </div>

          <div className="flex items-center gap-4">
            <p className="font-medium">Quantity (litres):</p>
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="icon"
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
              >
                <Minus className="h-4 w-4" />
              </Button>
              <Input
                type="number"
                className="w-16 text-center"
                value={quantity}
                onChange={(e) => setQuantity(Number(e.target.value))}
                min="1"
              />
              <Button
                variant="outline"
                size="icon"
                onClick={() => setQuantity(quantity + 1)}
              >
                <Plus className="h-4 w-4" />
              </Button>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4">
            <Button size="lg" className="flex-1" onClick={handleAddToCart}>
              <ShoppingCart className="mr-2 h-5 w-5" /> Add to Cart
            </Button>
             <Button size="lg" variant="secondary" className="flex-1" asChild>
                <Link href="/checkout">
                    Proceed to Checkout
                </Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
