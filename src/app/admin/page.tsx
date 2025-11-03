import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { DollarSign, ShoppingCart, Users, Package } from 'lucide-react';

export default function AdminDashboardPage() {
  const stats = [
    { title: 'Total Revenue', value: '$1,250.50', icon: <DollarSign className="h-4 w-4 text-muted-foreground" /> },
    { title: 'Orders', value: '150', icon: <ShoppingCart className="h-4 w-4 text-muted-foreground" /> },
    { title: 'New Customers', value: '+25', icon: <Users className="h-4 w-4 text-muted-foreground" /> },
    { title: 'Products', value: '6', icon: <Package className="h-4 w-4 text-muted-foreground" /> },
  ];

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold font-headline">Dashboard</h1>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map(stat => (
           <Card key={stat.title}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                {stat.title}
              </CardTitle>
              {stat.icon}
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
            </CardContent>
          </Card>
        ))}
      </div>
      <Card>
        <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
        </CardHeader>
        <CardContent>
            <p className="text-muted-foreground">Recent activity will be shown here.</p>
        </CardContent>
      </Card>
    </div>
  );
}
