import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function GymFlowLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    localStorage.setItem('gymflow_token', 'demo');
    localStorage.setItem('gymflow_user', JSON.stringify({
      id: '1',
      email: email || 'admin@gymflow.com',
      name: 'Gym Admin',
      role: 'Admin'
    }));
    navigate('/gymflow/dashboard');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-600 to-purple-700 flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl shadow-2xl p-10 w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-extrabold text-gray-900 mb-2">GymFlow</h1>
          <p className="text-gray-500">Demo Mode — Try it free</p>
        </div>
        <form onSubmit={handleLogin} className="space-y-5">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Email</label>
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="admin@gymflow.com" className="w-full px-5 py-4 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition" />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Password</label>
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Any password works in demo" className="w-full px-5 py-4 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition" />
          </div>
          <button type="submit" className="w-full bg-blue-600 text-white py-4 rounded-xl font-bold text-lg hover:bg-blue-700 transition shadow-lg shadow-blue-500/25">
            Enter Demo →
          </button>
        </form>
        <div className="mt-6 text-center">
          <a href="/" className="text-sm text-gray-500 hover:text-gray-700">← Back to website</a>
        </div>
      </div>
    </div>
  );
}
