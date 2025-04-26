import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useAuth } from '@/contexts/AuthContext';
import { useData } from '@/contexts/DataContext';
import { useState } from 'react';
import { Package, ShoppingBag, CreditCard, TrendingUp, Plus } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { PieChart, Pie, Cell, Legend } from 'recharts';
import { Progress } from "@/components/ui/progress";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';


const ranges = [
  { label: "Today vs Yesterday", value: "today" },
  { label: "Last 7 Days vs Previous", value: "7days" },
  { label: "This Month vs Last Month", value: "month" },
  { label: "This Quarter vs Last Quarter", value: "quarter" },
];

const COLORS = ['#6366f1', '#a855f7', '#10b981', '#f59e0b', '#ef4444'];
const payoutTarget = 1000;

const ConsigneeDashboard: React.FC = () => {
  const { user } = useAuth();
  const { getConsigneeItems, getConsigneeOrders, getConsigneePayments } = useData();

  const items = user ? getConsigneeItems(user.id) : [];
  const orders = user ? getConsigneeOrders(user.id) : [];
  const payments = user ? getConsigneePayments(user.id) : [];

  const activeItems = items.filter(item => item.isActive).length;
  const totalSales = orders.reduce((sum, order) => sum + order.totalAmount, 0);
  const pendingPayments = payments.filter(p => p.status === 'Pending').reduce((sum, p) => sum + p.amount, 0);
  const lastWeekSales = orders.filter(order => {
    const date = new Date(order.date);
    const weekAgo = new Date();
    weekAgo.setDate(weekAgo.getDate() - 7);
    return date >= weekAgo;
  }).reduce((sum, order) => sum + order.totalAmount, 0);
  const payoutProgress = Math.min((totalSales / payoutTarget) * 100, 100);
  const trend = totalSales > 0 ? ((lastWeekSales / totalSales) * 100).toFixed(1) : '0.0';
  const avgCommission = items.length > 0
    ? (items.reduce((sum, item) => sum + item.commissionRate, 0) / items.length).toFixed(1)
    : 'N/A';

  const recentSales = orders.slice(0, 3);
  const salesTrendData = orders.slice(0, 7).map(order => ({
    date: new Date(order.date).toLocaleDateString(),
    amount: order.totalAmount,
  })).reverse();

  const categoryData = items.reduce((acc, item) => {
    const cat = item.category || 'Other';
    acc[cat] = (acc[cat] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);
  const pieChartData = Object.entries(categoryData).map(([name, value]) => ({ name, value }));

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Welcome back, {user?.name}</h1>
        <p className="text-muted-foreground">Here’s your consignment performance at a glance.</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {[
          { title: 'Active Items', value: activeItems, icon: <Package className="h-4 w-4 text-muted-foreground" />, desc: 'Currently listed for sale' },
          { title: 'Total Sales', value: `R${totalSales.toFixed(2)}`, icon: <ShoppingBag className="h-4 w-4 text-muted-foreground" />, desc: 'All-time earnings' },
          { title: 'Pending Payments', value: `R${pendingPayments.toFixed(2)}`, icon: <CreditCard className="h-4 w-4 text-muted-foreground" />, desc: 'To be received' },
          { title: 'Avg. Commission', value: `${avgCommission}%`, icon: <TrendingUp className="h-4 w-4 text-muted-foreground" />, desc: 'Across your listings' },
        ].map(({ title, value, icon, desc }) => (
          <Card key={title}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{title}</CardTitle>
              {icon}
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{value}</div>
              <p className="text-xs text-muted-foreground">{desc}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Items by Category</CardTitle>
          <CardDescription>Distribution of your listings</CardDescription>
        </CardHeader>
        <CardContent className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie data={pieChartData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={80} label>
                {pieChartData.map((_, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Sales Over Time</CardTitle>
            <CardDescription>Last 7 orders</CardDescription>
          </CardHeader>
          <CardContent className="h-[300px]">
            {salesTrendData.length > 0 ? (
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={salesTrendData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis />
                  <Tooltip />
                  <Line type="monotone" dataKey="amount" stroke="#4f46e5" strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
            ) : (
              <p className="text-muted-foreground text-center">No sales data yet.</p>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Payout Progress</CardTitle>
            <CardDescription>Target: R{payoutTarget.toFixed(2)}</CardDescription>
          </CardHeader>
          <CardContent>
            <Progress value={payoutProgress} />
            <p className="text-sm text-muted-foreground mt-2">
              R{totalSales.toFixed(2)} / R{payoutTarget.toFixed(2)}
            </p>
            <p className="text-xs text-muted-foreground mt-2">
              {Number(trend) > 0 ? '📈' : '📉'} {trend}% of total sales this week
            </p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Insights</CardTitle>
          <CardDescription>Automated observations</CardDescription>
        </CardHeader>
        <CardContent>
          <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
            <li>You're averaging {avgCommission}% commission.</li>
            <li>You had R{lastWeekSales.toFixed(2)} in sales this week.</li>
            {pendingPayments > 0 && <li>Pending payout: R{pendingPayments.toFixed(2)}</li>}
          </ul>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
          <CardDescription>Frequently used actions</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-2">
            <Link to="/consignee/inventory">
              <Button variant="outline" className="w-full justify-start">
                <Package className="mr-2 h-4 w-4" />
                View My Inventory
              </Button>
            </Link>
            <Link to="/consignee/inventory/add">
              <Button variant="outline" className="w-full justify-start">
                <Plus className="mr-2 h-4 w-4" />
                Add New Item
              </Button>
            </Link>
            <Link to="/consignee/sales">
              <Button variant="outline" className="w-full justify-start">
                <ShoppingBag className="mr-2 h-4 w-4" />
                View Sales History
              </Button>
            </Link>
            <Link to="/consignee/payments">
              <Button variant="outline" className="w-full justify-start">
                <CreditCard className="mr-2 h-4 w-4" />
                View Payment History
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Recent Sales</CardTitle>
          <CardDescription>3 most recent orders</CardDescription>
        </CardHeader>
        <CardContent>
          {recentSales.length > 0 ? (
            <ul className="space-y-4">
              {recentSales.map(order => (
                <li key={order.id} className="flex justify-between items-center">
                  <div>
                    <p className="font-medium">{order.items[0].name}</p>
                    <p className="text-sm text-muted-foreground">Order #{order.orderNumber}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium">R{order.totalAmount.toFixed(2)}</p>
                    <p className="text-sm text-muted-foreground">
                      {new Date(order.date).toLocaleDateString()}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-muted-foreground text-center py-4">No recent sales to show</p>
          )}
        </CardContent>
      </Card>
    </div>
  );
};



export default ConsigneeDashboard;

