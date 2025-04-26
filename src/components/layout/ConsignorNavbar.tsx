
import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Sidebar, 
  SidebarContent, 
  SidebarHeader, 
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton
} from "@/components/ui/sidebar";
import { 
  Package, 
  ShoppingBag, 
  Users, 
  CreditCard, 
  BarChart3, 
  Settings, 
  LogOut,
  Store 
} from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

export const ConsignorNavbar: React.FC = () => {
  const { user, logout } = useAuth();

  const navItems = [
    { name: 'Dashboard', icon: BarChart3, path: '/consignor/dashboard' },
    { name: 'Inventory', icon: Package, path: '/consignor/inventory' },
    { name: 'Orders', icon: ShoppingBag, path: '/consignor/orders' },
    { name: 'Consignees', icon: Users, path: '/consignor/consignees' },
    { name: 'Payments', icon: CreditCard, path: '/consignor/payments' },
    { name: 'Shopify', icon: Store, path: '/consignor/shopify' },
    { name: 'Settings', icon: Settings, path: '/consignor/settings' },
  ];

  return (
    <Sidebar>
      <SidebarHeader>
        <Link to="/consignor/dashboard" className="flex items-center gap-2 px-4 py-3">
          <span className="text-2xl font-bold text-primary">ConsignStore</span>
        </Link>
      </SidebarHeader>
      
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Store Administration</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {navItems.map((item) => (
                <SidebarMenuItem key={item.name}>
                  <SidebarMenuButton asChild>
                    <Link to={item.path} className="flex items-center gap-2">
                      <item.icon className="h-5 w-5" />
                      <span>{item.name}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter>
        <div className="p-4">
          <div className="flex items-center gap-4 mb-4">
            <Avatar>
              <AvatarImage src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${user?.name}`} />
              <AvatarFallback>{user?.name?.substring(0, 2)}</AvatarFallback>
            </Avatar>
            <div>
              <p className="font-medium">{user?.name}</p>
              <p className="text-sm text-muted-foreground">{user?.email}</p>
            </div>
          </div>
          <button 
            onClick={logout} 
            className="w-full flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground"
          >
            <LogOut className="h-4 w-4" />
            <span>Logout</span>
          </button>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
};
