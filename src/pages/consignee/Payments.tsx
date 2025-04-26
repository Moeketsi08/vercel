import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useAuth } from '@/contexts/AuthContext';
import { useData } from '@/contexts/DataContext';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Download, ArrowUpRight, Clock, CheckCircle, XCircle } from 'lucide-react';

const PaymentsPage: React.FC = () => {
  const { user } = useAuth();
  const { getConsigneePayments } = useData();
  const payments = user ? getConsigneePayments(user.id) : [];

  // Calculate totals
  const totalPaid = payments.filter(p => p.status === 'paid').reduce((sum, p) => sum + p.amount, 0);
  const pendingPayment = payments.filter(p => p.status === 'pending').reduce((sum, p) => sum + p.amount, 0);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold tracking-tight">Payments</h1>
        <Button>
          <ArrowUpRight className="mr-2 h-4 w-4" />
          Request Payment
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total Paid</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">R{totalPaid.toFixed(2)}</div>
            <p className="text-xs text-muted-foreground mt-1">
              Lifetime payments received
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Pending</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">R{pendingPayment.toFixed(2)}</div>
            <p className="text-xs text-muted-foreground mt-1">
              {payments.filter(p => p.status === 'pending').length} pending payments
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Next Payment</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {payments.find(p => p.status === 'pending') ? 
                new Date(payments.find(p => p.status === 'pending')?.date || '').toLocaleDateString() : 
                'No pending'}
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              Estimated processing date
            </p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle>Payment History</CardTitle>
            <Button variant="outline" size="sm">
              <Download className="mr-2 h-4 w-4" />
              Export
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          {payments.length > 0 ? (
            <div className="space-y-4">
              {payments.map(payment => (
                <div key={payment.id} className="grid grid-cols-12 items-center p-4 border rounded-lg hover:bg-muted/50 transition-colors">
                  <div className="col-span-4">
                    <p className="font-medium">Payment #{payment.id}</p>
                    <p className="text-sm text-muted-foreground">
                      {new Date(payment.date).toLocaleDateString()}
                    </p>
                  </div>
                  <div className="col-span-3">
                    <p className="text-sm">{payment.method}</p>
                  </div>
                  <div className="col-span-3 text-right">
                    <p className="font-medium">R{payment.amount.toFixed(2)}</p>
                  </div>
                  <div className="col-span-2 text-right">
                    <Badge 
                      variant={payment.status === 'paid' ? 'success' : payment.status === 'failed' ? 'destructive' : 'secondary'}
                      className="capitalize"
                    >
                      {payment.status}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12 space-y-2">
              <CreditCard className="mx-auto h-10 w-10 text-muted-foreground" />
              <p className="text-muted-foreground">No payment history</p>
              <p className="text-sm text-muted-foreground">Payments will appear here once processed</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default PaymentsPage;