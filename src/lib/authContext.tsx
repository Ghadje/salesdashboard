'use client'

import React, { createContext, useContext, useState, useEffect } from 'react';
import Cookies from 'js-cookie';

interface AuthContextType {
  token: string | null;
  login: (token: string) => void;
  logout: () => void;
  isAuthenticated: boolean;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType>({
  token: null,
  login: () => {},
  logout: () => {},
  isAuthenticated: false,
  loading: true, // Default to `true` as we're initially checking for the token
});

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true); // Start in a loading state

  useEffect(() => {
    const storedToken = Cookies.get('token');
    console.log("🚀 Checking for stored token:", storedToken);

    if (storedToken) {
      setToken(storedToken);
    }

    setLoading(false); // Mark loading as complete
  }, []);

  const login = (token: string) => {
    console.log("🚀 Logging in with token:", token);
    Cookies.set('token', token, { expires: 7 }); // Save token for 7 days
    setToken(token);
  };

  const logout = () => {
    console.log("🚀 Logging out...");
    Cookies.remove('token');
    setToken(null);
    window.location.href = '/'; // Redirect to home or login page
  };

  const isAuthenticated = !!token;

  return (
    <AuthContext.Provider value={{ token, login, logout, isAuthenticated, loading }}>
      {loading ? <p>Loading...</p> : children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
