// src/pages/consignor/Orders.tsx

import React, { useEffect, useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from '@/components/ui/table';
import { format } from 'date-fns';
import axios from 'axios';

interface Order {
  id: string;
  customer: string;
  date: Date;
  total: number;
  commission: number;
  fulfilled: boolean;
}

const sampleOrders: Order[] = [
  {
    id: 'ORD001',
    customer: 'John Doe',
    date: new Date(),
    total: 420,
    commission: 63,
    fulfilled: false,
  },
  {
    id: 'ORD002',
    customer: 'Jane Smith',
    date: new Date(),
    total: 300,
    commission: 45,
    fulfilled: true,
  },
  {
    id: 'ORD003',
    customer: 'Emily Carter',
    date: new Date(),
    total: 500,
    commission: 75,
    fulfilled: false,
  },
];

const Orders: React.FC = () => {
  const [orders, setOrders] = useState(sampleOrders);
  const [search, setSearch] = useState('');

  const handleFulfill = (id: string) => {
    setOrders(prev =>
      prev.map(order =>
        order.id === id ? { ...order, fulfilled: true } : order
      )
    );
  };

  const filteredOrders = orders.filter(order =>
    order.customer.toLowerCase().includes(search.toLowerCase()) ||
    order.id.toLowerCase().includes(search.toLowerCase())
  );

  const [orders1, setOrders1] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get('http://localhost:5000/api/shopify/orders')
      .then((res) => setOrders1(res.data))
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Orders</h1>
        <p className="text-muted-foreground">Manage and view all consigned orders</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Consignees Orders</CardTitle>
          <div className="pt-4">
            <Input
              placeholder="Search by order ID or customer..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Order ID</TableHead>
                <TableHead>Customer</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Total</TableHead>
                <TableHead>Commission</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredOrders.map((order) => (
                <TableRow key={order.id}>
                  <TableCell>{order.id}</TableCell>
                  <TableCell>{order.customer}</TableCell>
                  <TableCell>{format(order.date, 'MMM dd, yyyy')}</TableCell>
                  <TableCell>${order.total.toFixed(2)}</TableCell>
                  <TableCell>${order.commission.toFixed(2)}</TableCell>
                  <TableCell>
                    <Badge variant={order.fulfilled ? "default" : "secondary"}>
                      {order.fulfilled ? 'Fulfilled' : 'Pending'}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    {!order.fulfilled && (
                      <Button size="sm" onClick={() => handleFulfill(order.id)}>
                        Mark as Fulfilled
                      </Button>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
      <Card>
  <CardHeader>
    <CardTitle>Store Orders</CardTitle>
  </CardHeader>
  <CardContent>
    {loading ? (
      <p className="pt-4">Loading orders...</p>
    ) : orders1.length === 0 ? (
      <p className="pt-4">No orders available.</p>
    ) : (
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Order ID</TableHead>
            <TableHead>Processed At</TableHead>
            <TableHead>Total Price</TableHead>
            <TableHead>Subtotal</TableHead>
            <TableHead>Tax</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="text-right">View</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {orders1.map((order: any) => (
            <TableRow key={order.id}>
              <TableCell>{order.name}</TableCell>
              <TableCell>{new Date(order.processed_at).toLocaleDateString()}</TableCell>
              <TableCell>R {parseFloat(order.total_price).toFixed(2)}</TableCell>
              <TableCell>R {parseFloat(order.subtotal_price).toFixed(2)}</TableCell>
              <TableCell>R {parseFloat(order.total_tax).toFixed(2)}</TableCell>
              <TableCell>
                <Badge variant={order.financial_status === "paid" ? "default" : "secondary"}>
                  {order.financial_status === "paid" ? "Paid" : "Unpaid"}
                </Badge>
              </TableCell>
              <TableCell className="text-right">
                <a
                  href={order.order_status_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:underline text-sm"
                >
                  View Order
                </a>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    )}
  </CardContent>
      </Card>


    </div>
  );
};

export default Orders;
