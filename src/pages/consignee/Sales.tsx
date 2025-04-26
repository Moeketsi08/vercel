import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useAuth } from '@/contexts/AuthContext';
import { useData } from '@/contexts/DataContext';
import { Button } from '@/components/ui/button';
import { CheckCircle, AlertCircle, Clock, Download, Filter, Search } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

const SalesPage: React.FC = () => {
  const { user } = useAuth();
  const { getConsigneeOrders } = useData();
  const orders = user ? getConsigneeOrders(user.id) : [];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold tracking-tight">My Sales</h1>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <Download className="mr-2 h-4 w-4" />
            Export
          </Button>
          <Button variant="outline" size="sm">
            <Filter className="mr-2 h-4 w-4" />
            Filter
          </Button>
        </div>
      </div>

      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle>Sales History</CardTitle>
            <div className="relative w-64">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search sales..."
                className="w-full pl-10 pr-4 py-2 text-sm border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {orders.length > 0 ? (
            <div className="space-y-4">
              {orders.map(order => {
                const status = order.items.some(i => i.status === 'dead') ? 'dead' : 
                             order.items.every(i => i.status === 'sold') ? 'sold' : 'active';
                return (
                  <div key={order.id} className="grid grid-cols-12 items-center p-4 border rounded-lg hover:bg-muted/50 transition-colors">
                    <div className="col-span-5 flex items-center gap-3">
                      <div className={`p-2 rounded-full ${
                        status === 'sold' ? 'bg-green-100 text-green-600' :
                        status === 'dead' ? 'bg-red-100 text-red-600' : 'bg-blue-100 text-blue-600'
                      }`}>
                        {status === 'sold' ? <CheckCircle className="h-5 w-5" /> :
                         status === 'dead' ? <AlertCircle className="h-5 w-5" /> : <Clock className="h-5 w-5" />}
                      </div>
                      <div>
                        <p className="font-medium">Order #{order.orderNumber}</p>
                        <p className="text-sm text-muted-foreground">
                          {order.items.length} items • {new Date(order.date).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                    <div className="col-span-3">
                      <p className="text-sm">{order.storeName}</p>
                    </div>
                    <div className="col-span-2 text-right">
                      <p className="font-medium">R{order.totalAmount.toFixed(2)}</p>
                    </div>
                    <div className="col-span-2 text-right">
                      <Badge 
                        variant={status === 'sold' ? 'success' : status === 'dead' ? 'destructive' : 'secondary'}
                        className="capitalize"
                      >
                        {status}
                      </Badge>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="text-center py-12 space-y-2">
              <ShoppingBag className="mx-auto h-10 w-10 text-muted-foreground" />
              <p className="text-muted-foreground">No sales records found</p>
              <p className="text-sm text-muted-foreground">Your sales will appear here once items are sold</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default SalesPage;