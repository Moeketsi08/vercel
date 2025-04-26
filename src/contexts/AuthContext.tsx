
import React, { createContext, useContext, useState, ReactNode } from 'react';
import { toast } from "sonner";

export type UserRole = 'consignee' | 'consignor' | null;

type User = {
  id: string;
  name: string;
  email: string;
  role: UserRole;
};

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string, role: UserRole) => Promise<boolean>;
  logout: () => void;
  isAuthenticated: boolean;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Mock user data
const MOCK_USERS = {
  consignee: {
    id: 'consignee-001',
    name: 'Jane Smith',
    email: 'jane@example.com',
    role: 'consignee' as UserRole,
    password: 'password'
  },
  consignor: {
    id: 'consignor-001',
    name: 'Consign Store',
    email: 'store@example.com', 
    role: 'consignor' as UserRole,
    password: 'password'
  }
};

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const login = async (email: string, password: string, role: UserRole): Promise<boolean> => {
    setIsLoading(true);
    
    // Simulate API call
    return new Promise((resolve) => {
      setTimeout(() => {
        let mockUser: Omit<User, 'password'> | null = null;
        
        if (role === 'consignee' && email === MOCK_USERS.consignee.email && password === MOCK_USERS.consignee.password) {
          mockUser = { ...MOCK_USERS.consignee };
          // mockUser is already of type Omit<User, 'password'>, no need to destructure
          mockUser = { ...mockUser };
        } else if (role === 'consignor' && email === MOCK_USERS.consignor.email && password === MOCK_USERS.consignor.password) {
          mockUser = { ...MOCK_USERS.consignor };
          const { password, ...userWithoutPassword } = MOCK_USERS.consignor;
          mockUser = userWithoutPassword;
        }

        if (mockUser) {
          setUser(mockUser);
          toast.success("Login successful!");
          resolve(true);
        } else {
          toast.error("Invalid credentials");
          resolve(false);
        }
        setIsLoading(false);
      }, 1000);
    });
  };

  const logout = () => {
    setUser(null);
    toast.success("Logged out successfully");
  };

  const value = {
    user,
    login,
    logout,
    isAuthenticated: !!user,
    isLoading
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
