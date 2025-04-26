
import React from 'react';
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { useAuth } from '@/contexts/AuthContext';
import { ConsigneeNavbar } from './ConsigneeNavbar';
import { ConsignorNavbar } from './ConsignorNavbar';

interface MainLayoutProps {
  children: React.ReactNode;
}

export const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  const { user } = useAuth();

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        {user?.role === 'consignee' && <ConsigneeNavbar />}
        {user?.role === 'consignor' && <ConsignorNavbar />}
        <main className="flex-1 p-6 md:p-10">
          <div className="container mx-auto">
            {user && <SidebarTrigger className="mb-4 md:hidden" />}
            {children}
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
};
