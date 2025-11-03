import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { orders, products } from '@/lib/data';
import type { OrderStatus } from '@/lib/types';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { cn } from '@/lib/utils';
import { PackageCheck, PackageX, History } from 'lucide-react';

const statusStyles: { [key in OrderStatus]: string } = {
  Pending: 'bg-yellow-100 text-yellow-800 border-yellow-200',
  Delivered: 'bg-green-100 text-green-800 border-green-200',
  Cancelled: 'bg-red-100 text-red-800 border-red-200',
};

const statusIcons: { [key in OrderStatus]: React.ReactNode } = {
    Pending: <History className="h-4 w-4" />,
    Delivered: <PackageCheck className="h-4 w-4" />,
    Cancelled: <PackageX className="h-4 w-4" />,
}

export default function OrdersPage() {
  // Assuming a logged-in user with ID 'USR-001'
  const userOrders = orders.filter((order) => order.userId === 'USR-001');

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-center mb-8 font-headline">
          My Orders
        </h1>
        <div className="space-y-6">
          {userOrders.map((order) => {
            const orderItemsDetails = order.items.map(item => {
                const product = products.find(p => p.id === item.productId);
                return {...item, name: product?.name, image: product?.image}
            });

            return (
              <Card key={order.id} className="overflow-hidden">
                <CardHeader className="flex flex-row justify-between items-start bg-muted/50 p-4">
                  <div className='grid gap-1'>
                    <CardTitle className="text-base font-semibold">
                      Order #{order.id}
                    </CardTitle>
                    <CardDescription>
                      {new Date(order.date).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                      })}
                    </CardDescription>
                  </div>
                   <Badge className={cn('text-xs', statusStyles[order.status])}>
                       {statusIcons[order.status]}
                       <span>{order.status}</span>
                    </Badge>
                </CardHeader>
                <CardContent className="p-4">
                  <div className="space-y-4">
                    {orderItemsDetails.map(item => (
                        <div key={item.productId} className="flex items-center justify-between">
                            <div className="flex items-center gap-4">
                                <div className="relative h-16 w-16 rounded-md overflow-hidden">
                                     <Image src={item.image ?? ''} alt={item.name ?? ''} fill className="object-cover" />
                                </div>
                                <div>
                                    <p className="font-medium">{item.name}</p>
                                    <p className="text-sm text-muted-foreground">Qty: {item.quantity}L</p>
                                </div>
                            </div>
                             <p className="text-sm font-medium">${(item.price * item.quantity).toFixed(2)}</p>
                        </div>
                    ))}
                  </div>
                </CardContent>
                <CardFooter className="bg-muted/50 p-4 flex flex-col sm:flex-row items-center justify-between gap-4">
                    <div className='text-sm'>
                       <span className="text-muted-foreground">Total: </span>
                       <span className="font-bold text-lg">${order.total.toFixed(2)}</span>
                    </div>
                    <div className="flex gap-2">
                        <Button variant="outline" size="sm">View Details</Button>
                        <Button variant="outline" size="sm">Reorder</Button>
                    </div>
                </CardFooter>
              </Card>
            );
          })}
        </div>
      </div>
    </div>
  );
}
