import { PlaceHolderImages } from './placeholder-images';
import type { Product, Order } from './types';

const getImage = (id: string) =>
  PlaceHolderImages.find((img) => img.id === id)?.imageUrl ??
  'https://picsum.photos/seed/default/400/300';

export const products: Product[] = [
  {
    id: '1',
    name: 'Cow Milk',
    description:
      'Fresh and natural cow milk, sourced from local farms. Rich in calcium and essential vitamins for a healthy start to your day.',
    price: 1.5,
    image: getImage('cow-milk'),
  },
  {
    id: '2',
    name: 'Buffalo Milk',
    description:
      'Creamy and rich buffalo milk, perfect for making traditional sweets and thick yogurt. Higher in fat content for a fuller taste.',
    price: 1.8,
    image: getImage('buffalo-milk'),
  },
  {
    id: '3',
    name: 'Toned Milk',
    description:
      'A healthy choice with reduced fat content, without compromising on the nutritional value. Ideal for the health-conscious.',
    price: 1.2,
    image: getImage('toned-milk'),
  },
  {
    id: '4',
    name: 'Almond Milk',
    description:
      'A delicious plant-based alternative. Our almond milk is unsweetened and fortified with vitamins D and E. Great for vegans.',
    price: 2.5,
    image: getImage('almond-milk'),
  },
  {
    id: '5',
    name: 'Oat Milk',
    description:
      'Smooth and creamy oat milk that is perfect for your coffee, cereal, or just on its own. A popular dairy-free option.',
    price: 2.8,
    image: getImage('oat-milk'),
  },
   {
    id: '6',
    name: 'Soy Milk',
    description:
      'A classic plant-based milk packed with protein. Versatile and great for cooking, baking, or drinking.',
    price: 2.2,
    image: getImage('soy-milk'),
  },
];

export const orders: Order[] = [
  {
    id: 'ORD-001',
    userId: 'USR-001',
    userName: 'Alice Johnson',
    items: [{ productId: '1', quantity: 2, price: 1.5 }],
    total: 3.0,
    status: 'Delivered',
    paymentMode: 'Online Payment',
    address: '123 Sunshine Ave, Pleasantville',
    date: '2024-07-20T10:00:00Z',
  },
  {
    id: 'ORD-002',
    userId: 'USR-002',
    userName: 'Bob Williams',
    items: [
      { productId: '2', quantity: 1, price: 1.8 },
      { productId: '3', quantity: 3, price: 1.2 },
    ],
    total: 5.4,
    status: 'Pending',
    paymentMode: 'Cash on Delivery',
    address: '456 Oak St, Mapleton',
    date: '2024-07-21T08:30:00Z',
  },
  {
    id: 'ORD-003',
    userId: 'USR-001',
    userName: 'Alice Johnson',
    items: [{ productId: '4', quantity: 1, price: 2.5 }],
    total: 2.5,
    status: 'Cancelled',
    paymentMode: 'Online Payment',
    address: '123 Sunshine Ave, Pleasantville',
    date: '2024-07-19T12:00:00Z',
  },
  {
    id: 'ORD-004',
    userId: 'USR-003',
    userName: 'Charlie Brown',
    items: [{ productId: '1', quantity: 5, price: 1.5 }],
    total: 7.5,
    status: 'Pending',
    paymentMode: 'Cash on Delivery',
    address: '789 Pine Ln, Greenwood',
    date: '2024-07-22T09:00:00Z',
  },
];
