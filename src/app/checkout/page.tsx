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
import { useState, useEffect } from 'react';
import { auth, db } from '@/lib/firebase';
import { collection, addDoc } from 'firebase/firestore';
import { onAuthStateChanged } from 'firebase/auth';

// Mock cart data
const cartItems = [
  { productId: '1', quantity: 2 },
  { productId: '2', quantity: 1 },
];

export default function CheckoutPage() {
  const { toast } = useToast();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState<any>(null);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    zip: '',
    paymentMethod: 'cod',
  });

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      if (!currentUser) {
        router.push('/login');
      }
    });
    return () => unsubscribe();
  }, [router]);

  const cartDetails = cartItems.map(item => {
      const product = products.find(p => p.id === item.productId);
      return {...item, ...product, total: (product?.price ?? 0) * item.quantity};
  })

  const subtotal = cartDetails.reduce((acc, item) => acc + item.total, 0);
  const deliveryFee = 2.0;
  const total = subtotal + deliveryFee;

  const handlePlaceOrder = async () => {
    if (!user) {
      toast({
        title: 'Error',
        description: 'Please login to place an order',
        variant: 'destructive',
      });
      router.push('/login');
      return;
    }

    if (!formData.name || !formData.phone || !formData.address || !formData.city || !formData.state || !formData.zip) {
      toast({
        title: 'Error',
        description: 'Please fill in all delivery information',
        variant: 'destructive',
      });
      return;
    }

    setLoading(true);
    try {
      const orderData = {
        userId: user.uid,
        userName: formData.name,
        email: user.email,
        items: cartDetails.map(item => ({
          productId: item.productId,
          quantity: item.quantity,
          price: item.price,
        })),
        total: total,
        subtotal: subtotal,
        deliveryFee: deliveryFee,
        status: 'Pending',
        paymentMode: formData.paymentMethod === 'cod' ? 'Cash on Delivery' : 'Online Payment',
        address: `${formData.address}, ${formData.city}, ${formData.state} ${formData.zip}`,
        phone: formData.phone,
        date: new Date().toISOString(),
        createdAt: new Date(),
      };

      await addDoc(collection(db, 'orders'), orderData);

      toast({
        title: "Order Placed!",
        description: "Thank you! Your order has been successfully placed.",
      });
      router.push('/orders');
    } catch (error: any) {
      toast({
        title: 'Error',
        description: error.message || 'Failed to place order',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
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
                    <Input
                      id="name"
                      placeholder="John Doe"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      required
                      disabled={loading}
                    />
                 </div>
                 <div className="grid gap-2">
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input
                      id="phone"
                      placeholder="+1 234 567 890"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      required
                      disabled={loading}
                    />
                 </div>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="address">Address</Label>
                <Input
                  id="address"
                  placeholder="123 Main St, Anytown"
                  value={formData.address}
                  onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                  required
                  disabled={loading}
                />
              </div>
              <div className="grid sm:grid-cols-3 gap-4">
                 <div className="grid gap-2">
                    <Label htmlFor="city">City</Label>
                    <Input
                      id="city"
                      placeholder="Anytown"
                      value={formData.city}
                      onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                      required
                      disabled={loading}
                    />
                 </div>
                 <div className="grid gap-2">
                    <Label htmlFor="state">State</Label>
                    <Input
                      id="state"
                      placeholder="CA"
                      value={formData.state}
                      onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                      required
                      disabled={loading}
                    />
                 </div>
                 <div className="grid gap-2">
                    <Label htmlFor="zip">ZIP Code</Label>
                    <Input
                      id="zip"
                      placeholder="12345"
                      value={formData.zip}
                      onChange={(e) => setFormData({ ...formData, zip: e.target.value })}
                      required
                      disabled={loading}
                    />
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
                <RadioGroup
                  value={formData.paymentMethod}
                  onValueChange={(value) => setFormData({ ...formData, paymentMethod: value })}
                  className="grid gap-4"
                  disabled={loading}
                >
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
                 <Button className="w-full" size="lg" onClick={handlePlaceOrder} disabled={loading}>
                   {loading ? 'Placing Order...' : 'Place Order'}
                 </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
}
