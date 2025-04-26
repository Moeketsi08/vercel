import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { User, Mail, CreditCard, Banknote, Lock } from 'lucide-react';

const SettingsPage: React.FC = () => {
  const { user } = useAuth();

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold tracking-tight">Account Settings</h1>

      <div className="grid gap-6 md:grid-cols-2">
        {/* Profile Settings */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <User className="h-5 w-5" />
              <span>Profile Information</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Full Name</Label>
              <Input id="name" defaultValue={user?.name || ''} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <div className="flex items-center gap-2">
                <Input id="email" defaultValue={user?.email || ''} readOnly />
                <Badge variant="outline">Verified</Badge>
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone">Phone Number</Label>
              <Input id="phone" placeholder="+27 12 345 6789" />
            </div>
            <Button className="mt-4">Update Profile</Button>
          </CardContent>
        </Card>

        {/* Payment Settings */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Banknote className="h-5 w-5" />
              <span>Payment Details</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label>Preferred Payment Method</Label>
              <div className="flex gap-4">
                <Button variant="outline" className="flex-1">
                  <CreditCard className="mr-2 h-4 w-4" />
                  Bank Transfer
                </Button>
                <Button variant="outline" className="flex-1">
                  <CreditCard className="mr-2 h-4 w-4" />
                  PayPal
                </Button>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="bank">Bank Name</Label>
              <Input id="bank" placeholder="Standard Bank" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="account">Account Number</Label>
              <Input id="account" placeholder="123456789" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="branch">Branch Code</Label>
              <Input id="branch" placeholder="051001" />
            </div>
            <Button className="mt-4">Update Payment Details</Button>
          </CardContent>
        </Card>

        {/* Security Settings */}
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Lock className="h-5 w-5" />
              <span>Security</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="current">Current Password</Label>
              <Input id="current" type="password" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="new">New Password</Label>
              <Input id="new" type="password" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="confirm">Confirm New Password</Label>
              <Input id="confirm" type="password" />
            </div>
            <div className="flex justify-between items-center pt-2">
              <Button variant="destructive">Deactivate Account</Button>
              <Button>Change Password</Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default SettingsPage;