import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../auth/AuthContext';
import { demoBookings } from '../demoData';
import { useState } from 'react';

const navItems = [
  { path: '/dashboard', label: 'Dashboard', icon: '📊' },
  { path: '/classes', label: 'Classes', icon: '📅' },
  { path: '/members', label: 'Members', icon: '👥' },
  { path: '/bookings', label: 'Bookings', icon: '🎟️' },
];

function Sidebar() {
  const location = useLocation();
  const { user, logout } = useAuth();
  return (
    <div className="w-64 bg-gray-900 text-white min-h-screen p-4">
      <div className="mb-8"><h1 className="text-2xl font-bold">GymFlow</h1></div>
      <nav className="space-y-2">
        {navItems.map((item) => (
          <Link key={item.path} to={item.path} className={`flex items-center gap-3 px-4 py-3 rounded-lg transition ${location.pathname === item.path ? 'bg-blue-600' : 'hover:bg-gray-800'}`}>
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

export default function Bookings() {
  const [filter, setFilter] = useState('all');
  const bookings = demoBookings.filter(b => filter === 'all' || b.status === filter.toUpperCase());

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar />
      <div className="flex-1 p-8">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold">Bookings</h2>
          <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">+ New Booking</button>
        </div>

        <div className="flex gap-2 mb-6">
          {['all', 'confirmed', 'cancelled'].map((f) => (
            <button key={f} onClick={() => setFilter(f)} className={`px-4 py-2 rounded-lg capitalize ${filter === f ? 'bg-blue-600 text-white' : 'bg-white text-gray-700 hover:bg-gray-200'}`}>
              {f}
            </button>
          ))}
        </div>

        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="text-left px-6 py-3 text-xs font-medium text-gray-500 uppercase">Member</th>
                <th className="text-left px-6 py-3 text-xs font-medium text-gray-500 uppercase">Class</th>
                <th className="text-left px-6 py-3 text-xs font-medium text-gray-500 uppercase">Date</th>
                <th className="text-left px-6 py-3 text-xs font-medium text-gray-500 uppercase">Time</th>
                <th className="text-left px-6 py-3 text-xs font-medium text-gray-500 uppercase">Status</th>
                <th className="text-right px-6 py-3 text-xs font-medium text-gray-500 uppercase">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {bookings.map((b) => (
                <tr key={b.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 font-medium">{b.member.name}</td>
                  <td className="px-6 py-4 text-gray-500">{b.class.classType.name}</td>
                  <td className="px-6 py-4 text-gray-500">{b.class.date}</td>
                  <td className="px-6 py-4 text-gray-500">{b.class.startTime}</td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 rounded-full text-sm ${b.status === 'CONFIRMED' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                      {b.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button className="text-green-600 hover:text-green-800 mr-3">Check In</button>
                    <button className="text-red-600 hover:text-red-800">Cancel</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
