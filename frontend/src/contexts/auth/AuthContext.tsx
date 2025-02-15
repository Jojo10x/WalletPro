import React from 'react';
import { User } from '../../types/auth.types';
import { AuthContext } from '.';

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = React.useState<User | null>(() => {
    const token = localStorage.getItem('token');
    const email = localStorage.getItem('userEmail');
    return token && email ? { token, email } : null;
  });

  const login = (userData: User) => {
    setUser(userData);
    localStorage.setItem('token', userData.token);
    localStorage.setItem('userEmail', userData.email);
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('token');
    localStorage.removeItem('userEmail');
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};