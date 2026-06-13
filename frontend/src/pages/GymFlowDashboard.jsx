import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const classes = [
  { id: '1', name: 'Morning HIIT', instructor: 'Sarah', time: '7:00 AM', capacity: 20, booked: 14, day: 'Monday' },
  { id: '2', name: 'Yoga Flow', instructor: 'Mike', time: '9:00 AM', capacity: 15, booked: 12, day: 'Monday' },
  { id: '3', name: 'Spin Class', instructor: 'Emma', time: '6:00 PM', capacity: 25, booked: 25, day: 'Monday' },
  { id: '4', name: 'Boxing', instructor: 'James', time: '7:00 AM', capacity: 18, booked: 8, day: 'Tuesday' },
  { id: '5', name: 'Pilates', instructor: 'Sarah', time: '10:00 AM', capacity: 12, booked: 10, day: 'Tuesday' },
  { id: '6', name: 'CrossFit', instructor: 'Mike', time: '6:00 PM', capacity: 20, booked: 19, day: 'Wednesday' },
];

const members = [
  { id: '1', name: 'John Smith', email: 'john@email.com', status: 'Active', plan: 'Premium', joined: '2026-01-15' },
  { id: '2', name: 'Emma Wilson', email: 'emma@email.com', status: 'Active', plan: 'Basic', joined: '2026-02-20' },
  { id: '3', name: 'Michael Brown', email: 'michael@email.com', status: 'Active', plan: 'Premium', joined: '2026-03-10' },
  { id: '4', name: 'Sarah Davis', email: 'sarah@email.com', status: 'Expired', plan: 'Basic', joined: '2025-11-05' },
  { id: '5', name: 'James Wilson', email: 'james@email.com', status: 'Active', plan: 'Premium', joined: '2026-04-12' },
];

export default function GymFlowDashboard() {
  const [tab, setTab] = useState('dashboard');
  const navigate = useNavigate();

  useEffect(() => {
    if (!localStorage.getItem('gymflow_token')) navigate('/gymflow/login');
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('gymflow_token');
    localStorage.removeItem('gymflow_user');
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white border-b border-gray-200 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4">
          <div className="flex items-center gap-3">
            <span className="text-2xl">🏋️</span>
            <span className="text-xl font-extrabold text-gray-900">GymFlow</span>
            <span className="bg-green-100 text-green-700 text-xs font-bold px-2 py-1 rounded-full">DEMO</span>
          </div>
          <div className="flex items-center gap-4">
            <button onClick={handleLogout} className="text-sm text-red-600 hover:text-red-700 font-medium">Logout</button>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="flex gap-2 mb-8 border-b border-gray-200">
          {['dashboard', 'classes', 'members'].map(t => (
            <button key={t} onClick={() => setTab(t)} className={`px-5 py-3 text-sm font-semibold capitalize transition ${tab === t ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500 hover:text-gray-700'}`}>
              {t}
            </button>
          ))}
        </div>

        {tab === 'dashboard' && (
          <div className="space-y-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { label: 'Total Members', value: '156', icon: '👥', color: 'blue' },
                { label: 'Active Classes', value: '12', icon: '📅', color: 'purple' },
                { label: 'Bookings Today', value: '47', icon: '📋', color: 'green' },
                { label: 'Revenue', value: '£4,280', icon: '💰', color: 'orange' },
              ].map((s, i) => (
                <div key={i} className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                  <div className="text-2xl mb-2">{s.icon}</div>
                  <div className="text-2xl font-extrabold text-gray-900">{s.value}</div>
                  <div className="text-sm text-gray-500">{s.label}</div>
                </div>
              ))}
            </div>
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
              <h3 className="font-bold text-lg mb-4">Today's Classes</h3>
              <div className="space-y-3">
                {classes.slice(0, 3).map(c => (
                  <div key={c.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                    <div>
                      <div className="font-semibold">{c.name}</div>
                      <div className="text-sm text-gray-500">{c.instructor} • {c.time}</div>
                    </div>
                    <div className="text-right">
                      <div className={`text-sm font-bold ${c.booked >= c.capacity ? 'text-red-600' : 'text-green-600'}`}>
                        {c.booked}/{c.capacity}
                      </div>
                      <div className="text-xs text-gray-400">{c.booked >= c.capacity ? 'Full' : 'Available'}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {tab === 'classes' && (
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="text-left px-6 py-4 text-xs font-bold text-gray-500 uppercase">Class</th>
                  <th className="text-left px-6 py-4 text-xs font-bold text-gray-500 uppercase">Instructor</th>
                  <th className="text-left px-6 py-4 text-xs font-bold text-gray-500 uppercase">Day</th>
                  <th className="text-left px-6 py-4 text-xs font-bold text-gray-500 uppercase">Time</th>
                  <th className="text-left px-6 py-4 text-xs font-bold text-gray-500 uppercase">Capacity</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {classes.map(c => (
                  <tr key={c.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 font-semibold">{c.name}</td>
                    <td className="px-6 py-4 text-gray-600">{c.instructor}</td>
                    <td className="px-6 py-4 text-gray-600">{c.day}</td>
                    <td className="px-6 py-4 text-gray-600">{c.time}</td>
                    <td className="px-6 py-4">
                      <span className={`text-sm font-bold ${c.booked >= c.capacity ? 'text-red-600' : 'text-green-600'}`}>
                        {c.booked}/{c.capacity}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {tab === 'members' && (
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="text-left px-6 py-4 text-xs font-bold text-gray-500 uppercase">Name</th>
                  <th className="text-left px-6 py-4 text-xs font-bold text-gray-500 uppercase">Email</th>
                  <th className="text-left px-6 py-4 text-xs font-bold text-gray-500 uppercase">Plan</th>
                  <th className="text-left px-6 py-4 text-xs font-bold text-gray-500 uppercase">Status</th>
                  <th className="text-left px-6 py-4 text-xs font-bold text-gray-500 uppercase">Joined</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {members.map(m => (
                  <tr key={m.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 font-semibold">{m.name}</td>
                    <td className="px-6 py-4 text-gray-600">{m.email}</td>
                    <td className="px-6 py-4"><span className="bg-blue-100 text-blue-700 text-xs font-bold px-2 py-1 rounded-lg">{m.plan}</span></td>
                    <td className="px-6 py-4">
                      <span className={`text-xs font-bold px-2 py-1 rounded-lg ${m.status === 'Active' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                        {m.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-gray-500 text-sm">{m.joined}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
