import { createContext, useContext, useState } from 'react';
import { config } from '../config';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(config.demo ? { id: 1, email: 'admin@gymflow.com', name: 'GymFlow Admin', role: 'ADMIN' } : null);

  const login = async (email, password) => {
    if (config.demo) {
      setUser({ id: 1, email: 'admin@gymflow.com', name: 'GymFlow Admin', role: 'ADMIN' });
      return true;
    }
    try {
      const res = await fetch(`${config.apiBase}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();
      if (res.ok) {
        setUser(data.user);
        localStorage.setItem('token', data.token);
        return true;
      }
      return false;
    } catch (err) {
      return false;
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('token');
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
