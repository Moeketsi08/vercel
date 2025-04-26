import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { toast } from "sonner";
import { useAuth } from './AuthContext';

// Define types for our data
export type ItemCondition = 'New' | 'Like New' | 'Good' | 'Fair' | 'Poor';
export type OrderStatus = 'Pending' | 'Processing' | 'Shipped' | 'Delivered' | 'Cancelled';
export type PaymentStatus = 'Pending' | 'Paid' | 'Overdue';

export interface InventoryItem {
  id: string;
  name: string;
  description: string;
  images: string[];
  condition: ItemCondition;
  price: number;
  quantity: number;
  consigneeId: string;
  consigneeName: string;
  commissionRate: number;
  dateAdded: string;
  isActive: boolean;
  isConsigned: boolean;
  category: string;
}

export interface Order {
  id: string;
  orderNumber: string;
  date: string;
  customer: {
    name: string;
    email: string;
  };
  items: {
    id: string;
    name: string;
    quantity: number;
    price: number;
    isConsigned: boolean;
    consigneeId?: string;
  }[];
  status: OrderStatus;
  paymentStatus: PaymentStatus;
  totalAmount: number;
  commissionAmount: number;
}

export interface Payment {
  id: string;
  consigneeId: string;
  amount: number;
  date: string;
  status: PaymentStatus;
  orderId: string;
}

interface DataContextType {
  inventory: InventoryItem[];
  orders: Order[];
  payments: Payment[];
  addInventoryItem: (item: Omit<InventoryItem, 'id' | 'dateAdded'>) => void;
  updateInventoryItem: (id: string, updates: Partial<InventoryItem>) => void;
  deleteInventoryItem: (id: string) => void;
  getInventoryItem: (id: string) => InventoryItem | undefined;
  addOrder: (order: Omit<Order, 'id'>) => void;
  updateOrderStatus: (id: string, status: OrderStatus) => void;
  updatePaymentStatus: (id: string, status: PaymentStatus) => void;
  getConsigneeItems: (consigneeId: string) => InventoryItem[];
  getConsigneeOrders: (consigneeId: string) => Order[];
  getConsigneePayments: (consigneeId: string) => Payment[];
  shopifyConnected: boolean;
  connectToShopify: (email: string) => Promise<boolean>;
  disconnectFromShopify: () => void;
  isLoading: boolean;
}

const mockInventory: InventoryItem[] = [
  {
    id: '1',
    name: 'Vintage Leather Handbag',
    description: 'Genuine leather vintage handbag from the 80s in excellent condition',
    images: ['/placeholder.svg'],
    condition: 'Like New',
    price: 125.00,
    quantity: 1,
    consigneeId: 'consignee-001',
    consigneeName: 'Jane Smith',
    commissionRate: 40,
    dateAdded: '2023-05-15',
    isActive: true,
    isConsigned: true,
    category: 'Accessories'
  },
  {
    id: '2',
    name: 'Antique Wooden Desk',
    description: 'Early 20th century oak writing desk with original brass hardware',
    images: ['/placeholder.svg'],
    condition: 'Good',
    price: 450.00,
    quantity: 1,
    consigneeId: 'consignee-001',
    consigneeName: 'Lwazi Mazibuko',
    commissionRate: 35,
    dateAdded: '2023-06-02',
    isActive: true,
    isConsigned: true,
    category: 'T Shirts'
  },
  {
    id: '3',
    name: 'Mid-Century Modern Chair',
    description: 'Classic mid-century design chair with new upholstery',
    images: ['/placeholder.svg'],
    condition: 'Good',
    price: 350.00,
    quantity: 2,
    consigneeId: 'consignee-003',
    consigneeName: 'Luyanda Mazibuko',
    commissionRate: 35,
    dateAdded: '2023-07-12',
    isActive: true,
    isConsigned: true,
    category: 'Shoes'
  },
];

const mockOrders: Order[] = [
  {
    id: '1',
    orderNumber: 'ORD-2023-001',
    date: '2023-08-15',
    customer: {
      name: 'Lwazozo Mazibuko',
      email: 'Lwazzo@example.com'
    },
    items: [
      {
        id: '1',
        name: 'Vintage Leather Handbag',
        quantity: 1,
        price: 125.00,
        isConsigned: true,
        consigneeId: 'consignee-001'
      }
    ],
    status: 'Delivered',
    paymentStatus: 'Paid',
    totalAmount: 125.00,
    commissionAmount: 50.00
  },
  {
    id: '2',
    orderNumber: 'ORD-2023-002',
    date: '2023-09-20',
    customer: {
      name: 'List Mazibuko',
      email: 'lisa@example.com'
    },
    items: [
      {
        id: '3',
        name: 'Mid-Century Modern Chair',
        quantity: 1,
        price: 350.00,
        isConsigned: true,
        consigneeId: 'consignee-003'
      }
    ],
    status: 'Shipped',
    paymentStatus: 'Paid',
    totalAmount: 350.00,
    commissionAmount: 122.50
  }
];

const mockPayments: Payment[] = [
  {
    id: '1',
    consigneeId: 'consignee-001',
    amount: 75.00,
    date: '2023-08-30',
    status: 'Paid',
    orderId: '1'
  },
  {
    id: '2',
    consigneeId: 'consignee-003',
    amount: 227.50,
    date: '2023-10-05',
    status: 'Pending',
    orderId: '2'
  }
];

const DataContext = createContext<DataContextType | undefined>(undefined);

export const DataProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const { user } = useAuth();
  const [inventory, setInventory] = useState<InventoryItem[]>(mockInventory);
  const [orders, setOrders] = useState<Order[]>(mockOrders);
  const [payments, setPayments] = useState<Payment[]>(mockPayments);
  const [shopifyConnected, setShopifyConnected] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const addInventoryItem = (item: Omit<InventoryItem, 'id' | 'dateAdded'>) => {
    const newItem: InventoryItem = {
      ...item,
      id: `inv-${Date.now()}`,
      dateAdded: new Date().toISOString().split('T')[0]
    };
    setInventory(prev => [...prev, newItem]);
    toast.success("Item added to inventory successfully");
  };

  const updateInventoryItem = (id: string, updates: Partial<InventoryItem>) => {
    setInventory(prev => prev.map(item => item.id === id ? { ...item, ...updates } : item));
    toast.success("Item updated successfully");
  };

  const deleteInventoryItem = (id: string) => {
    setInventory(prev => prev.filter(item => item.id !== id));
    toast.success("Item removed from inventory");
  };

  const getInventoryItem = (id: string) => inventory.find(item => item.id === id);

  const addOrder = (order: Omit<Order, 'id'>) => {
    const newOrder: Order = {
      ...order,
      id: `ord-${Date.now()}`
    };
    setOrders(prev => [...prev, newOrder]);
    toast.success("Order created successfully");
  };

  const updateOrderStatus = (id: string, status: OrderStatus) => {
    setOrders(prev => prev.map(order => order.id === id ? { ...order, status } : order));
    toast.success(`Order status updated to ${status}`);
  };

  const updatePaymentStatus = (id: string, status: PaymentStatus) => {
    setPayments(prev => prev.map(payment => payment.id === id ? { ...payment, status } : payment));
    toast.success(`Payment status updated to ${status}`);
  };

  const getConsigneeItems = (consigneeId: string) => inventory.filter(item => item.consigneeId === consigneeId);

  const getConsigneeOrders = (consigneeId: string) => orders.filter(order => order.items.some(item => item.consigneeId === consigneeId));

  const getConsigneePayments = (consigneeId: string) => payments.filter(payment => payment.consigneeId === consigneeId);

  const connectToShopify = async (email: string): Promise<boolean> => {
    setIsLoading(true);
    return new Promise((resolve) => {
      setTimeout(() => {
        setShopifyConnected(true);
        setIsLoading(false);
        toast.success("Successfully connected to Shopify!");
        resolve(true);
      }, 2000);
    });
  };

  const disconnectFromShopify = () => {
    setShopifyConnected(false);
    toast("Disconnected from Shopify");
  };

  useEffect(() => {
    // Future enhancement: filter or fetch data based on user
  }, [user]);

  const value: DataContextType = {
    inventory,
    orders,
    payments,
    addInventoryItem,
    updateInventoryItem,
    deleteInventoryItem,
    getInventoryItem,
    addOrder,
    updateOrderStatus,
    updatePaymentStatus,
    getConsigneeItems,
    getConsigneeOrders,
    getConsigneePayments,
    shopifyConnected,
    connectToShopify,
    disconnectFromShopify,
    isLoading,
  };

  return <DataContext.Provider value={value}>{children}</DataContext.Provider>;
};

export const useData = () => {
  const context = useContext(DataContext);
  if (context === undefined) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context;
};
