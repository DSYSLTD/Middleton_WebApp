import React, { createContext, useContext, useState, useEffect } from 'react';

export interface UserProfile {
  name: string;
  email: string;
  phone: string;
  profilePic?: string;
  relationship?: string;
  memberSince?: string;
  role: 'member' | 'superadmin';
  isLoggedIn: boolean;
}

interface AuthContextType {
  user: UserProfile | null;
  login: (email: string, role?: 'member' | 'superadmin', name?: string) => void;
  logout: () => void;
  registerUser: (userData: Omit<UserProfile, 'isLoggedIn'>) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<UserProfile | null>(() => {
    const saved = localStorage.getItem('middleton_auth_user');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        return null;
      }
    }
    return null;
  });

  useEffect(() => {
    if (user) {
      localStorage.setItem('middleton_auth_user', JSON.stringify(user));
    } else {
      localStorage.removeItem('middleton_auth_user');
    }
  }, [user]);

  const login = (email: string, role: 'member' | 'superadmin' = 'member', name?: string) => {
    const currentYear = new Date().getFullYear().toString();
    const newUser: UserProfile = {
      name: name || (email.includes('admin') ? 'Super Administrator' : 'Registered Member'),
      email,
      phone: '952 486-2871',
      role,
      isLoggedIn: true,
      relationship: role === 'superadmin' ? 'Funeral Director / Administrator' : 'Family Representative',
      memberSince: currentYear,
      profilePic: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80',
    };
    setUser(newUser);
  };

  const logout = () => {
    setUser(null);
  };

  const registerUser = (userData: Omit<UserProfile, 'isLoggedIn'>) => {
    const currentYear = new Date().getFullYear().toString();
    const newUser: UserProfile = {
      ...userData,
      relationship: userData.relationship || 'Family Representative',
      memberSince: userData.memberSince || currentYear,
      isLoggedIn: true,
    };
    setUser(newUser);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, registerUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
