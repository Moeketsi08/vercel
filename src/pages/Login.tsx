
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Package, Store } from 'lucide-react';
import { useAuth, UserRole } from '@/contexts/AuthContext';

const Login: React.FC = () => {
  const navigate = useNavigate();
  const { login, isLoading } = useAuth();
  const [formData, setFormData] = useState({
    consigneeEmail: 'jane@example.com',
    consigneePassword: 'password',
    consignorEmail: 'store@example.com',
    consignorPassword: 'password'
  });
  const [activeRole, setActiveRole] = useState<UserRole>('consignee');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent, role: UserRole) => {
    e.preventDefault();
    
    const email = role === 'consignee' ? formData.consigneeEmail : formData.consignorEmail;
    const password = role === 'consignee' ? formData.consigneePassword : formData.consignorPassword;
    
    const success = await login(email, password, role);
    
    if (success) {
      navigate(role === 'consignee' ? '/consignee/dashboard' : '/consignor/dashboard');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-blue-100 p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-6">
          <h1 className="text-3xl font-bold text-primary">Consign Connect</h1>
          <p className="text-muted-foreground">Streamlined Consignment Management</p>
        </div>
        
        <Tabs defaultValue="consignee" onValueChange={(value) => setActiveRole(value as UserRole)}>
          <TabsList className="grid grid-cols-2 mb-6">
            <TabsTrigger value="consignee" className="flex items-center gap-2">
              <Package className="h-4 w-4" />
              <span>Consignee</span>
            </TabsTrigger>
            <TabsTrigger value="consignor" className="flex items-center gap-2">
              <Store className="h-4 w-4" />
              <span>Store Admin</span>
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="consignee">
            <Card className="border-none shadow-lg">
              <CardHeader>
                <CardTitle>Consignee Login</CardTitle>
                <CardDescription>
                  Access your consigned items, track sales and manage payments
                </CardDescription>
              </CardHeader>
              <form onSubmit={(e) => handleSubmit(e, 'consignee')}>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="consigneeEmail">Email</Label>
                    <Input
                      id="consigneeEmail"
                      name="consigneeEmail"
                      value={formData.consigneeEmail}
                      onChange={handleChange}
                      placeholder="your@email.com"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="consigneePassword">Password</Label>
                    <Input
                      id="consigneePassword"
                      name="consigneePassword"
                      type="password"
                      value={formData.consigneePassword}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </CardContent>
                <CardFooter>
                  <Button type="submit" className="w-full" disabled={isLoading}>
                    {isLoading ? 'Logging in...' : 'Login'}
                  </Button>
                </CardFooter>
              </form>
            </Card>
          </TabsContent>
          
          <TabsContent value="consignor">
            <Card className="border-none shadow-lg">
              <CardHeader>
                <CardTitle>Store Admin Login</CardTitle>
                <CardDescription>
                  Manage all consignment inventory, sales and consignee relationships
                </CardDescription>
              </CardHeader>
              <form onSubmit={(e) => handleSubmit(e, 'consignor')}>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="consignorEmail">Email</Label>
                    <Input
                      id="consignorEmail"
                      name="consignorEmail"
                      value={formData.consignorEmail}
                      onChange={handleChange}
                      placeholder="store@example.com"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="consignorPassword">Password</Label>
                    <Input
                      id="consignorPassword"
                      name="consignorPassword"
                      type="password"
                      value={formData.consignorPassword}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </CardContent>
                <CardFooter>
                  <Button type="submit" className="w-full" disabled={isLoading}>
                    {isLoading ? 'Logging in...' : 'Login'}
                  </Button>
                </CardFooter>
              </form>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Login;
