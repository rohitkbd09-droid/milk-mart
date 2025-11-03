export interface Product {
  id: string;
  name: string;
  description: string;
  price: number; // Price per litre
  image: string;
}

export type OrderStatus = 'Pending' | 'Delivered' | 'Cancelled';
export type PaymentMode = 'Cash on Delivery' | 'Online Payment';

export interface OrderItem {
  productId: string;
  quantity: number; // in litres
  price: number;
}

export interface Order {
  id: string;
  userId: string;
  items: OrderItem[];
  total: number;
  status: OrderStatus;
  paymentMode: PaymentMode;
  address: string;
  date: string;
  userName: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  phone?: string;
  address?: string;
}
