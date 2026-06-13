import { createContext, useContext, useState, useEffect } from 'react';
import config from '../config';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const savedToken = localStorage.getItem('qb_token');
    const savedUser = localStorage.getItem('qb_user');
    if (savedToken && savedUser) {
      setToken(savedToken);
      setUser(JSON.parse(savedUser));
    }
    setLoading(false);
  }, []);

  const login = async (email, password) => {
    if (config.demo) {
      const demoUser = { id: '1', email, name: email.split('@')[0], role: 'admin' };
      const demoToken = 'demo-token';
      localStorage.setItem('qb_token', demoToken);
      localStorage.setItem('qb_user', JSON.stringify(demoUser));
      setToken(demoToken);
      setUser(demoUser);
      return true;
    }
    // Real API call would go here
    return false;
  };

  const logout = () => {
    localStorage.removeItem('qb_token');
    localStorage.removeItem('qb_user');
    setToken(null);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, token, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
