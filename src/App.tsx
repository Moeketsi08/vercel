
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Index from "./pages/Index";
import Login from "./pages/Login";
import NotFound from "./pages/NotFound";
import { AuthProvider, useAuth } from "./contexts/AuthContext";
import { DataProvider } from "./contexts/DataContext";
import { MainLayout } from "./components/layout/MainLayout";
import AddNewItemAsConsignee from "./pages/consignee/AddNewItem";
import AddNewItemAsConsignor from "./pages/consignor/AddStock";
import Orders from "./pages/consignor/Orders";

// Consignee Routes
import ConsigneeDashboard from "./pages/consignee/Dashboard";
import ConsigneeInventory from "./pages/consignee/Inventory";

// Consignor Routes
import ConsignorDashboard from "./pages/consignor/Dashboard";
import ConsignorInventory from "./pages/consignor/Inventory";
import ShopifyIntegration from "./pages/consignor/ShopifyIntegration";
import Consignees from "./pages/consignor/Consignees";
import Payments from "./pages/consignor/Payments";

const queryClient = new QueryClient();

// Protected route component
const ProtectedRoute = ({ children, role }: { children: React.ReactNode; role: 'consignee' | 'consignor' | null }) => {
  const { user, isAuthenticated } = useAuth();
  
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  
  if (role && user?.role !== role) {
    return <Navigate to="/" replace />;
  }
  
  return <MainLayout>{children}</MainLayout>;
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <DataProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/login" element={<Login />} />
              
              {/* Consignee Routes */}
              <Route path="/consignee/dashboard" element={
                <ProtectedRoute role="consignee">
                  <ConsigneeDashboard />
                </ProtectedRoute>
              } />
              <Route path="/consignee/inventory" element={
                <ProtectedRoute role="consignee">
                  <ConsigneeInventory />
                </ProtectedRoute>
              } />
              
              {/* Consignor Routes */}
              <Route path="/consignor/dashboard" element={
                <ProtectedRoute role="consignor">
                  <ConsignorDashboard />
                </ProtectedRoute>
              } />
              <Route path="/consignor/inventory" element={
                <ProtectedRoute role="consignor">
                  <ConsignorInventory />
                </ProtectedRoute>
              } />
              <Route path="/consignor/shopify" element={
                <ProtectedRoute role="consignor">
                  <ShopifyIntegration />
                </ProtectedRoute>
              } />
              <Route path="/consignor/orders" element={
                <ProtectedRoute role="consignor">
                  <Orders />
                </ProtectedRoute>
              } />
              <Route path="/consignor/consignees" element={
                <ProtectedRoute role="consignor">
                  <Consignees />
                </ProtectedRoute>
              } />
              <Route path="/consignor/payments" element={
                <ProtectedRoute role="consignor">
                  <Payments />
                </ProtectedRoute>
              } />
              <Route path="/consignee/inventory/add" element={<AddNewItemAsConsignee />} />
              <Route path="/consignor/inventory/add" element={<AddNewItemAsConsignor />} />
              <Route path="/consignor/inventory/orders" element={<Orders />} />



              
              {/* Catch-all route */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </DataProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
