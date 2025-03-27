
import React, { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { supabase } from '@/integrations/supabase/client';

// Define types
type User = {
  id: string;
  username: string;
  role: 'admin';
};

type AuthContextType = {
  user: User | null;
  isLoading: boolean;
  login: (username: string, password: string) => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
};

// Create context
const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = localStorage.getItem('admin_user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setIsLoading(false);
  }, []);

  // Login function
  const login = async (username: string, password: string) => {
    setIsLoading(true);
    
    try {
      // Get admin user from Supabase
      const { data, error } = await supabase
        .from('admin_users')
        .select('id, username, password_hash')
        .eq('username', username)
        .eq('password_hash', password)
        .single();
      
      if (error || !data) {
        toast.error("Invalid username or password");
        throw new Error('Invalid credentials');
      }
      
      const user = {
        id: data.id,
        username: data.username,
        role: 'admin' as const
      };
      
      setUser(user);
      localStorage.setItem('admin_user', JSON.stringify(user));
      toast.success("Login successful!");
      navigate('/admin/dashboard');
    } catch (error) {
      console.error("Login error:", error);
      toast.error("Login failed");
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('admin_user');
    toast.info("You have been logged out");
    navigate('/admin/login');
  };

  return (
    <AuthContext.Provider value={{ user, isLoading, login, logout, isAuthenticated: !!user }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
