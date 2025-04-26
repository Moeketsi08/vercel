// types.ts
export interface InventoryItem {
    id: string;
    name: string;
    quantity: number;
    price: number;
    isConsigned: boolean;
    consigneeId?: string;
    status?: 'active' | 'sold' | 'dead'; // Add status property
    listedDate?: string; // Add listedDate
    soldDate?: string; // Add soldDate
    commissionRate?: number; // Add commissionRate
  }
  
  export interface Order {
    id: string;
    name: string;
    orderNumber: string;
    quantity: number;
    price: number;
    isConsigned: boolean;
    date: string;
    totalAmount: number;
    items: InventoryItem[];
    storeName: string;
    listedDate?: string;  // Add listedDate, make it optional if not always present
    soldDate?: string;  // Add soldDate, make it optional if not always present
    status: 'active' | 'sold' | 'dead';  // Add the status property

  }
  
  export type PaymentStatus = 'pending' | 'paid' | 'failed';
  
  export interface Payment {
    id: string;
    amount: number;
    date: string;
    status: PaymentStatus;
    method: string;
  }

  // types.ts
export interface Order {
  id: string;
  date: string;
  totalAmount: number;
  items: InventoryItem[];
}
