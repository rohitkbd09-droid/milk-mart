'use client';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardFooter,
  CardDescription,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  RadioGroup,
  RadioGroupItem,
} from '@/components/ui/radio-group';
import { Separator } from '@/components/ui/separator';
import { products } from '@/lib/data';
import Image from 'next/image';
import { useToast } from '@/hooks/use-toast';
import { useRouter } from 'next/navigation';

// Mock cart data
const cartItems = [
  { productId: '1', quantity: 2 },
  { productId: '2', quantity: 1 },
];

export default function CheckoutPage() {
  const { toast } = useToast();
  const router = useRouter();

  const cartDetails = cartItems.map(item => {
      const product = products.find(p => p.id === item.productId);
      return {...item, ...product, total: (product?.price ?? 0) * item.quantity};
  })

  const subtotal = cartDetails.reduce((acc, item) => acc + item.total, 0);
  const deliveryFee = 2.0;
  const total = subtotal + deliveryFee;

  const handlePlaceOrder = () => {
    toast({
        title: "Order Placed!",
        description: "Thank you! Your order has been successfully placed.",
    });
    // In a real app, you'd also clear the cart and redirect.
    router.push('/orders');
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold text-center mb-8 font-headline">
        Checkout
      </h1>
      <div className="grid md:grid-cols-3 gap-8">
        <div className="md:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Delivery Information</CardTitle>
            </CardHeader>
            <CardContent className="grid gap-4">
              <div className="grid sm:grid-cols-2 gap-4">
                 <div className="grid gap-2">
                    <Label htmlFor="name">Full Name</Label>
                    <Input id="name" placeholder="John Doe" />
                 </div>
                 <div className="grid gap-2">
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input id="phone" placeholder="+1 234 567 890" />
                 </div>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="address">Address</Label>
                <Input id="address" placeholder="123 Main St, Anytown" />
              </div>
              <div className="grid sm:grid-cols-3 gap-4">
                 <div className="grid gap-2">
                    <Label htmlFor="city">City</Label>
                    <Input id="city" placeholder="Anytown" />
                 </div>
                 <div className="grid gap-2">
                    <Label htmlFor="state">State</Label>
                    <Input id="state" placeholder="CA" />
                 </div>
                 <div className="grid gap-2">
                    <Label htmlFor="zip">ZIP Code</Label>
                    <Input id="zip" placeholder="12345" />
                 </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="md:col-span-1 space-y-8">
          <Card>
            <CardHeader>
              <CardTitle>Order Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {cartDetails.map(item => (
                <div key={item.productId} className="flex justify-between items-center text-sm">
                    <div className="flex items-center gap-2">
                        <div className="relative h-10 w-10 rounded-md overflow-hidden">
                            <Image src={item.image ?? ''} alt={item.name ?? ''} fill className="object-cover" />
                        </div>
                        <div>
                            <p className="font-medium">{item.name}</p>
                            <p className="text-muted-foreground">Qty: {item.quantity}</p>
                        </div>
                    </div>
                    <p className="font-medium">${item.total.toFixed(2)}</p>
                </div>
              ))}
              <Separator />
               <div className="flex justify-between text-sm">
                    <p className="text-muted-foreground">Subtotal</p>
                    <p>${subtotal.toFixed(2)}</p>
               </div>
               <div className="flex justify-between text-sm">
                    <p className="text-muted-foreground">Delivery</p>
                    <p>${deliveryFee.toFixed(2)}</p>
               </div>
               <Separator />
               <div className="flex justify-between font-bold text-lg">
                    <p>Total</p>
                    <p>${total.toFixed(2)}</p>
               </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
                <CardTitle>Payment Method</CardTitle>
                <CardDescription>Choose how you&apos;d like to pay.</CardDescription>
            </CardHeader>
            <CardContent>
                <RadioGroup defaultValue="cod" className="grid gap-4">
                    <div>
                        <RadioGroupItem value="cod" id="cod" className="peer sr-only" />
                        <Label htmlFor="cod" className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary">
                            Cash on Delivery
                        </Label>
                    </div>
                    <div>
                        <RadioGroupItem value="online" id="online" className="peer sr-only" />
                        <Label htmlFor="online" className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary">
                            Online Payment
                        </Label>
                    </div>
                </RadioGroup>
            </CardContent>
            <CardFooter>
                 <Button className="w-full" size="lg" onClick={handlePlaceOrder}>Place Order</Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
}
