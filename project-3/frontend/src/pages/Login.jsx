import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../auth/AuthContext';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();
  const handleSubmit = async (e) => { e.preventDefault(); await login(email, password); navigate('/dashboard'); };
  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-500 to-orange-500 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-md">
        <h1 className="text-3xl font-bold text-center mb-2">HalaFlow</h1>
        <p className="text-center text-gray-500 mb-8">Event Entertainment Management</p>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-500" required />
          <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-500" required />
          <button type="submit" className="w-full bg-rose-500 text-white py-3 rounded-lg font-semibold hover:bg-rose-600">Sign In</button>
        </form>
        <p className="text-center text-sm text-gray-500 mt-6">Demo: admin@halaflow.com / admin123</p>
      </div>
    </div>
  );
}
