import { createContext, useContext, useState } from 'react';
import { config } from '../config';
const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(config.demo ? { id: 1, email: 'admin@halaflow.com', name: 'HalaFlow Admin', role: 'ADMIN' } : null);
  const login = async (email, password) => { setUser({ id: 1, email: 'admin@halaflow.com', name: 'HalaFlow Admin', role: 'ADMIN' }); return true; };
  const logout = () => setUser(null);
  return <AuthContext.Provider value={{ user, login, logout }}>{children}</AuthContext.Provider>;
}

export function useAuth() { return useContext(AuthContext); }
