import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useAuth } from '@/contexts/AuthContext';
import { useData } from '@/contexts/DataContext';
import { 
  Package, 
  ShoppingBag, 
  CreditCard, 
  BarChart3,
  Users,
  AlertCircle,
  Plus,
  CalendarDays
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { format } from 'date-fns';
import { Check } from 'lucide-react';
import { Alert } from '@/components/ui/alert';
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid,
} from 'recharts';


const ConsignorDashboard: React.FC = () => {
  const { user } = useAuth();
  const { inventory, orders, payments, shopifyConnected } = useData();
  const [compareType, setCompareType] = useState('7days');

  const getDateRange = (type: string) => {
    const now = new Date();
    const start = new Date();
    const prevStart = new Date();

    switch (type) {
      case 'today':
        start.setHours(0, 0, 0, 0);
        prevStart.setDate(prevStart.getDate() - 1);
        prevStart.setHours(0, 0, 0, 0);
        return { currentStart: start, previousStart: prevStart };
      case '7days':
        start.setDate(start.getDate() - 7);
        prevStart.setDate(prevStart.getDate() - 14);
        return { currentStart: start, previousStart: prevStart };
      case 'month':
        start.setDate(1);
        prevStart.setMonth(prevStart.getMonth() - 1);
        prevStart.setDate(1);
        return { currentStart: start, previousStart: prevStart };
      default:
        return { currentStart: now, previousStart: now };
    }
  };

  const { currentStart, previousStart } = getDateRange(compareType);
  
  // Recent orders
 
  const currentOrders = orders.filter(o => new Date(o.date) >= currentStart);
  const previousOrders = orders.filter(o => new Date(o.date) >= previousStart && new Date(o.date) < currentStart);

  const calcTotal = (list) => list.reduce((acc, o) => acc + o.totalAmount, 0);
  const currentSales = calcTotal(currentOrders);
  const previousSales = calcTotal(previousOrders);
  const salesDiff = previousSales > 0 ? ((currentSales - previousSales) / previousSales) * 100 : 0;

  const totalInventory = inventory.length;
  const consignedInventory = inventory.filter(item => item.isConsigned).length;
  const pendingPayments = payments.filter(payment => payment.status === 'Pending').reduce((sum, payment) => sum + payment.amount, 0);
  const recentOrders = [...orders].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()).slice(0, 5);
  const uniqueConsigneeIds = [...new Set(inventory.map(item => item.consigneeId))];
  const consigneeCount = uniqueConsigneeIds.length;
  const totalSales = orders.reduce((sum, order) => sum + order.totalAmount, 0);

    //Sales overview
    const data = [
      { consignor: 'Consignors', sales: 350 },
      { consignor: 'Trending', sales: 125 },
      // Add more consignors here
    ];

  return (
    <div className="space-y-6 animate-fade-in">
    <div className="space-y-6 animate-fade-in">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Store Dashboard</h1>
          <p className="text-muted-foreground">
            Complete overview of your consignment business
          </p>
        </div>
        <div className="flex gap-2 items-center">
          <CalendarDays className="h-4 w-4 text-muted-foreground" />
          <select
            value={compareType}
            onChange={e => setCompareType(e.target.value)}
            className="border rounded px-2 py-1 text-sm"
          >
            <option value="today">Today vs Yesterday</option>
            <option value="7days">Last 7 Days vs Prev 7</option>
            <option value="month">This Month vs Last</option>
          </select>
        </div>
      </div>
      {shopifyConnected ? (
  <Card className="bg-green-50">
    <CardContent className="p-4 flex items-center gap-4">
      <Check className="h-5 w-5 text-green-500" />
      <div className="flex-1">
        <p className="font-medium text-green-700">
          Your Shopify store is connected
        </p>
        <p className="text-sm text-green-600">
          Inventory and sales data are syncing
        </p>
      </div>
    </CardContent>
  </Card>
) : (
  <Card className="bg-yellow-50">
    <CardContent className="p-4 flex items-center gap-4">
      <AlertCircle className="h-5 w-5 text-yellow-500" />
      <div className="flex-1">
        <p className="font-medium text-yellow-700">
          Your Shopify store is not connected
        </p>
        <p className="text-sm text-yellow-600">
          Connect your Shopify store to synchronize inventory and sales data
        </p>
      </div>
      <Link to="/consignor/shopify">
        <Button variant="outline" className="bg-white">
          Connect Now
        </Button>
      </Link>
    </CardContent>
  </Card>
  )}


      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card className="hover:shadow-md transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Inventory</CardTitle>
            <Package className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalInventory} items</div>
            <div className="mt-2 space-y-1">
              <p className="text-xs text-muted-foreground">
                {consignedInventory} consigned items ({totalInventory > 0 ? Math.round((consignedInventory / totalInventory) * 100) : 0}%)
              </p>
              <Progress value={totalInventory > 0 ? (consignedInventory / totalInventory) * 100 : 0} />
            </div>
          </CardContent>
        </Card>

        <Card className="hover:shadow-md transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Sales</CardTitle>
            <ShoppingBag className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${currentSales.toFixed(2)}</div>
            <p className={`text-xs mt-2 ${salesDiff >= 0 ? 'text-green-600' : 'text-red-600'}`}>
              {salesDiff >= 0 ? '+' : ''}{salesDiff.toFixed(1)}% vs previous
            </p>
          </CardContent>
        </Card>

        <Card className="hover:shadow-md transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending Payouts</CardTitle>
            <CreditCard className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${pendingPayments.toFixed(2)}</div>
            <p className="text-xs text-muted-foreground mt-2">
              To {payments.filter(payment => payment.status === 'Pending').length} consignees
            </p>
          </CardContent>
        </Card>

        <Card className="hover:shadow-md transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Consignees</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{consigneeCount}</div>
            <p className="text-xs text-muted-foreground mt-2">
              Consignees with active inventory
            </p>
          </CardContent>
        </Card>
      </div>

    </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Inventory</CardTitle>
            <Package className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalInventory} items</div>
            <div className="mt-2 space-y-1">
              <p className="text-xs text-muted-foreground">
                {consignedInventory} consigned items ({totalInventory > 0 ? Math.round((consignedInventory / totalInventory) * 100) : 0}%)
              </p>
              <Progress value={totalInventory > 0 ? (consignedInventory / totalInventory) * 100 : 0} />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Sales</CardTitle>
            <ShoppingBag className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${totalSales.toFixed(2)}</div>
            <p className="text-xs text-muted-foreground mt-2">
              {orders.length} completed orders
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending Payouts</CardTitle>
            <CreditCard className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${pendingPayments.toFixed(2)}</div>
            <p className="text-xs text-muted-foreground mt-2">
              To {payments.filter(payment => payment.status === 'Pending').length} consignees
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Consignees</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{consigneeCount}</div>
            <p className="text-xs text-muted-foreground mt-2">
              Consignees with active inventory
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Card className="col-span-1">
          <CardHeader className="flex flex-row items-center justify-between space-y-0">
            <div>
              <CardTitle>Recent Orders</CardTitle>
              <CardDescription>
                Latest sales transactions
              </CardDescription>
            </div>
            <Link to="/consignor/orders">
              <Button variant="ghost" size="sm">
                View All
              </Button>
            </Link>
          </CardHeader>
          <CardContent>
            {recentOrders.length > 0 ? (
              <div className="space-y-4">
                {recentOrders.map(order => (
                  <div key={order.id} className="flex justify-between items-center">
                    <div>
                      <p className="font-medium">{order.orderNumber}</p>
                      <p className="text-sm text-muted-foreground">
                        {new Date(order.date).toLocaleDateString()} · {order.customer.name}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="font-medium">${order.totalAmount.toFixed(2)}</p>
                      <span className={`text-xs px-2 py-1 rounded-full ${
                        order.status === 'Delivered' ? 'bg-green-100 text-green-700' : 
                        order.status === 'Shipped' ? 'bg-blue-100 text-blue-700' :
                        order.status === 'Processing' ? 'bg-yellow-100 text-yellow-700' :
                        'bg-gray-100 text-gray-700'
                      }`}>
                        {order.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-muted-foreground text-center py-4">No recent orders to display</p>
            )}
          </CardContent>
        </Card>

        <Card className="col-span-1">
          <CardHeader>
            <CardTitle>Sales Overview</CardTitle>
            <CardDescription>
              Monthly revenue from consignment sales
            </CardDescription>
          </CardHeader>
          <CardContent className="h-[220px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="consignor" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="sales" fill="#4f46e5" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Card className="col-span-1">
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-2">
              <Link to="/consignor/inventory/add">
                <Button variant="outline" className="w-full justify-start">
                  <Plus className="mr-2 h-4 w-4" />
                  Add Item
                </Button>
              </Link>
              <Link to="/consignor/orders/create">
                <Button variant="outline" className="w-full justify-start">
                  <Plus className="mr-2 h-4 w-4" />
                  Create Order
                </Button>
              </Link>
              <Link to="/consignor/consignees">
                <Button variant="outline" className="w-full justify-start">
                  <Users className="mr-2 h-4 w-4" />
                  View Consignees
                </Button>
              </Link>
              <Link to="/consignor/payments">
                <Button variant="outline" className="w-full justify-start">
                  <CreditCard className="mr-2 h-4 w-4" />
                  Process Payments
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};


export default ConsignorDashboard;
