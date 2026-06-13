import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

export default function QuoteBuilderLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    localStorage.setItem('qb_token', 'demo');
    localStorage.setItem('qb_user', JSON.stringify({
      id: '1',
      email: email || 'demo@quotebuilder.com',
      name: 'Demo User',
      role: 'admin'
    }));
    navigate('/quotebuilder/dashboard');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-orange-900 flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl shadow-2xl p-10 w-full max-w-md">
        <div className="text-center mb-8">
          <div className="text-4xl mb-4">📝</div>
          <h1 className="text-3xl font-extrabold text-gray-900 mb-2">QuoteBuilder</h1>
          <p className="text-gray-500">Demo Mode — Try it free</p>
        </div>
        <form onSubmit={handleLogin} className="space-y-5">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Email</label>
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="demo@quotebuilder.com" className="w-full px-5 py-4 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition" />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Password</label>
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Any password works in demo" className="w-full px-5 py-4 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition" />
          </div>
          <button type="submit" className="w-full bg-orange-600 text-white py-4 rounded-xl font-bold text-lg hover:bg-orange-700 transition shadow-lg shadow-orange-500/25">
            Enter Demo →
          </button>
        </form>
        <div className="mt-6 text-center">
          <Link to="/" className="text-sm text-gray-500 hover:text-gray-700">← Back to website</Link>
        </div>
      </div>
    </div>
  );
}
