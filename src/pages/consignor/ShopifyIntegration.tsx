import React, { useState, useEffect } from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useData } from '@/contexts/DataContext';
import { Store, Link2, Check, Loader2 } from 'lucide-react';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger
} from '@/components/ui/tabs';

const ShopifyIntegration: React.FC = () => {
  const {
    connectToShopify,
    disconnectFromShopify,
    shopifyConnected,
    isLoading
  } = useData();

  const [email, setEmail] = useState('');
  const [shopName, setShopName] = useState('');
  const [connectedShopName, setConnectedShopName] = useState('');
  const [lastVerified, setLastVerified] = useState<string | null>(null);

  useEffect(() => {
    setShopName('sneakerhub');
    setEmail('owner@sneakerhub.com');
  }, []);

  const handleConnect = async (e: React.FormEvent) => {
    e.preventDefault();
    await connectToShopify(email);
    setConnectedShopName(shopName);
    setLastVerified(
      new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    );
  };

  const handleDisconnect = () => {
    disconnectFromShopify();
    setConnectedShopName('');
    setShopName('');
    setEmail('');
  };

  const handleVerify = () => {
    setLastVerified(
      new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    );
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">
          Shopify Integration
        </h1>
        <p className="text-muted-foreground">
          Connect and manage your Shopify store
        </p>
      </div>

      <Tabs defaultValue={shopifyConnected ? 'manage' : 'connect'}>
        <TabsList>
          <TabsTrigger value="connect">Connect Store</TabsTrigger>
          <TabsTrigger value="manage" disabled={!shopifyConnected}>
            Manage Settings
          </TabsTrigger>
          <TabsTrigger value="sync" disabled={!shopifyConnected}>
            Sync Options
          </TabsTrigger>
        </TabsList>

        <TabsContent value="connect" className="mt-6">
          {!shopifyConnected ? (
            <Card>
              <CardHeader>
                <div className="flex items-center gap-2">
                  <Store className="h-5 w-5 text-primary" />
                  <CardTitle>Connect to Shopify</CardTitle>
                </div>
                <CardDescription>
                  Link your Shopify store to synchronize inventory and sales
                  data
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleConnect} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="shopName">Shopify Store Name</Label>
                    <div className="flex">
                      <Input
                        id="shopName"
                        value={shopName}
                        onChange={(e) => setShopName(e.target.value)}
                        placeholder="yourstore"
                        className="rounded-r-none"
                      />
                      <div className="bg-muted flex items-center px-3 rounded-r-md border border-l-0 border-input">
                        .myshopify.com
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email">Shopify Admin Email</Label>
                    <Input
                      id="email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="you@example.com"
                    />
                    <p className="text-sm text-muted-foreground">
                      We'll send an authorization request to this email
                    </p>
                  </div>

                  <div className="pt-4">
                    <Button
                      type="submit"
                      className="w-full"
                      disabled={isLoading || !email || !shopName}
                    >
                      {isLoading ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Connecting...
                        </>
                      ) : (
                        <>
                          <Link2 className="mr-2 h-4 w-4" />
                          Connect to Shopify
                        </>
                      )}
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          ) : (
            <Card className="bg-green-50 border-green-100">
              <CardContent className="pt-6">
                <div className="flex items-center gap-4">
                  <div className="bg-green-100 text-green-700 p-3 rounded-full">
                    <Check className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="text-lg font-medium text-green-800">
                      Successfully Connected
                    </h3>
                    <p className="text-green-700">
                      Your Shopify store is connected and syncing data
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="manage" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Shopify Connection Settings</CardTitle>
              <CardDescription>
                Manage your Shopify integration settings
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between items-center pb-4 border-b">
                  <div>
                    <h3 className="font-medium">Connected Store</h3>
                    <p className="text-sm text-muted-foreground">
                      {connectedShopName || 'yourstore'}.myshopify.com
                    </p>
                  </div>
                  <Button variant="outline" size="sm" onClick={handleDisconnect}>
                    Disconnect
                  </Button>
                </div>

                <div className="flex justify-between items-center pb-4 border-b">
                  <div>
                    <h3 className="font-medium">API Access</h3>
                    <p className="text-sm text-muted-foreground">
                      Last verified: {lastVerified || 'Never'}
                    </p>
                  </div>
                  <Button variant="outline" size="sm" onClick={handleVerify}>
                    Verify
                  </Button>
                </div>

                <div className="flex justify-between items-center">
                  <div>
                    <h3 className="font-medium">Data Sync Status</h3>
                    <p className="text-sm text-muted-foreground">
                      All systems operational
                    </p>
                  </div>
                  <Button variant="outline" size="sm">
                    Sync Now
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="sync" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Sync Options</CardTitle>
              <CardDescription>
                Configure what data gets synchronized between systems
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <SyncOption
                  title="Products & Inventory"
                  description="Sync product details and inventory levels"
                  checked={true}
                />
                <SyncOption
                  title="Orders"
                  description="Sync orders from Shopify to ConsignConnect"
                  checked={true}
                />
                <SyncOption
                  title="Customer Data"
                  description="Sync customer information with orders"
                  checked={true}
                />
                <SyncOption
                  title="Automatic Notifications"
                  description="Send automatic notifications to consignees on sales"
                  checked={false}
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

interface SyncOptionProps {
  title: string;
  description: string;
  checked: boolean;
}

const SyncOption: React.FC<SyncOptionProps> = ({
  title,
  description,
  checked
}) => {
  const [isChecked, setIsChecked] = useState(checked);

  return (
    <div className="flex items-center space-x-4 pb-4 border-b">
      <div className="flex-1">
        <h3 className="font-medium">{title}</h3>
        <p className="text-sm text-muted-foreground">{description}</p>
      </div>
      <div className="flex items-center h-5">
        <input
          type="checkbox"
          checked={isChecked}
          onChange={() => setIsChecked(!isChecked)}
          className="h-4 w-4 text-primary border-gray-300 rounded"
        />
      </div>
    </div>
  );
};

export default ShopifyIntegration;

