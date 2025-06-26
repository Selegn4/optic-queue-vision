
import React, { createContext, useContext, useState } from 'react';
import { useToast } from '@/hooks/use-toast';

interface User {
  id: string;
  email: string;
  name: string;
  role: 'admin' | 'sales' | 'cashier';
}

interface AuthContextType {
  user: User | null;
  login: (username: string, password: string) => Promise<boolean>;
  logout: () => void;
  hasRole: (role: string) => boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const { toast } = useToast();

  // Define users with role hierarchy: Admin > Sales > Cashier
  const users = [
    { id: '1', username: 'admin', password: 'admin', email: 'admin@escaoptical.com', name: 'System Administrator', role: 'admin' as const },
    { id: '2', username: 'ace', password: 'sales123', email: 'ace@escaoptical.com', name: 'Ace', role: 'sales' as const },
    { id: '3', username: 'yhel', password: 'sales123', email: 'yhel@escaoptical.com', name: 'Yhel', role: 'sales' as const },
    { id: '4', username: 'jil', password: 'sales123', email: 'jil@escaoptical.com', name: 'Jil', role: 'sales' as const },
    { id: '5', username: 'mel', password: 'sales123', email: 'mel@escaoptical.com', name: 'Mel', role: 'sales' as const },
    { id: '6', username: 'jeselle', password: 'sales123', email: 'jeselle@escaoptical.com', name: 'Jeselle', role: 'sales' as const },
    { id: '7', username: 'eric', password: 'sales123', email: 'eric@escaoptical.com', name: 'Eric', role: 'sales' as const },
    { id: '8', username: 'john', password: 'sales123', email: 'john@escaoptical.com', name: 'John', role: 'sales' as const },
    { id: '9', username: 'cashier', password: 'cashier123', email: 'cashier@escaoptical.com', name: 'Cashier', role: 'cashier' as const },
  ];

  const login = async (username: string, password: string): Promise<boolean> => {
    try {
      const foundUser = users.find(u => u.username === username && u.password === password);
      
      if (foundUser) {
        const { username: _, password: __, ...userWithoutCredentials } = foundUser;
        setUser(userWithoutCredentials);
        
        toast({
          title: "Success",
          description: `Welcome back, ${foundUser.name}!`
        });
        return true;
      } else {
        toast({
          title: "Error",
          description: "Invalid username or password",
          variant: "destructive"
        });
        return false;
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Login failed. Please try again.",
        variant: "destructive"
      });
      return false;
    }
  };

  const logout = () => {
    setUser(null);
    toast({
      title: "Success",
      description: "Successfully logged out"
    });
  };

  const hasRole = (role: string): boolean => {
    if (!user) return false;
    
    // Admin has access to everything
    if (user.role === 'admin') return true;
    
    // Sales employee has access to sales and cashier features (but not admin)
    if (user.role === 'sales' && (role === 'sales' || role === 'cashier')) return true;
    
    // Cashier only has access to cashier features
    if (user.role === 'cashier' && role === 'cashier') return true;
    
    return false;
  };

  const value = {
    user,
    login,
    logout,
    hasRole,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
