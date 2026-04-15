import React, { createContext, useContext, useState } from 'react';

interface User {
  nickname: string;
  tags: string[];
  joinedAt: string;
  attendedEvents: string[];
}

interface AppContextType {
  isAuthenticated: boolean;
  user: User | null;
  login: (code: string) => boolean;
  logout: () => void;
  updateUser: (user: Partial<User>) => void;
  toggleEventAttendance: (eventId: string) => void;
}

const AppContext = createContext<AppContextType | null>(null);

const INVITE_CODES = ['LEV2026', 'SINGULARITY', 'LEVCLUB'];

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return localStorage.getItem('lev_auth') === 'true';
  });

  const [user, setUser] = useState<User | null>(() => {
    const stored = localStorage.getItem('lev_user');
    return stored ? JSON.parse(stored) : null;
  });

  const login = (code: string): boolean => {
    if (INVITE_CODES.includes(code.trim().toUpperCase())) {
      setIsAuthenticated(true);
      localStorage.setItem('lev_auth', 'true');
      if (!user) {
        const newUser: User = {
          nickname: '',
          tags: [],
          joinedAt: new Date().toISOString(),
          attendedEvents: [],
        };
        setUser(newUser);
        localStorage.setItem('lev_user', JSON.stringify(newUser));
      }
      return true;
    }
    return false;
  };

  const logout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem('lev_auth');
  };

  const updateUser = (updates: Partial<User>) => {
    setUser((prev) => {
      const updated = { ...prev!, ...updates };
      localStorage.setItem('lev_user', JSON.stringify(updated));
      return updated;
    });
  };

  const toggleEventAttendance = (eventId: string) => {
    setUser((prev) => {
      if (!prev) return prev;
      const attended = prev.attendedEvents.includes(eventId)
        ? prev.attendedEvents.filter((id) => id !== eventId)
        : [...prev.attendedEvents, eventId];
      const updated = { ...prev, attendedEvents: attended };
      localStorage.setItem('lev_user', JSON.stringify(updated));
      return updated;
    });
  };

  return (
    <AppContext.Provider value={{ isAuthenticated, user, login, logout, updateUser, toggleEventAttendance }}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useApp must be used within AppProvider');
  return ctx;
};
