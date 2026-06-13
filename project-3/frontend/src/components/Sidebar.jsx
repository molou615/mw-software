import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../auth/AuthContext';

const navItems = [
  { path: '/dashboard', label: 'Dashboard', icon: '📊' },
  { path: '/bookings', label: 'Bookings', icon: '📅' },
  { path: '/performers', label: 'Performers', icon: '🎭' },
  { path: '/packages', label: 'Packages', icon: '📦' },
];

export default function Sidebar() {
  const location = useLocation();
  const { user, logout } = useAuth();
  return (
    <div className="w-64 bg-gray-900 text-white min-h-screen p-4">
      <div className="mb-8"><h1 className="text-2xl font-bold">HalaFlow</h1><span className="text-xs bg-rose-600 px-2 py-1 rounded">Demo</span></div>
      <nav className="space-y-2">
        {navItems.map((item) => (
          <Link key={item.path} to={item.path} className={`flex items-center gap-3 px-4 py-3 rounded-lg transition ${location.pathname === item.path ? 'bg-rose-600' : 'hover:bg-gray-800'}`}>
            <span>{item.icon}</span><span>{item.label}</span>
          </Link>
        ))}
      </nav>
      <div className="absolute bottom-4 left-4 right-4">
        <div className="text-sm text-gray-400 mb-2">{user?.name}</div>
        <button onClick={logout} className="w-full text-left px-4 py-2 text-red-400 hover:bg-gray-800 rounded-lg">Logout</button>
      </div>
    </div>
  );
}
