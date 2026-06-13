import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const events = [
  { id: '1', client: 'Ahmed & Fatima', type: 'Wedding', date: '2026-06-20', venue: 'Grand Hotel Marrakech', performers: 4, status: 'Confirmed', budget: '£2,500' },
  { id: '2', client: 'Smith Family', type: 'Birthday Party', date: '2026-06-22', venue: 'Community Center', performers: 2, status: 'Confirmed', budget: '£800' },
  { id: '3', client: 'Corporate Event Ltd', type: 'Corporate Event', date: '2026-06-25', venue: 'Conference Hall', performers: 6, status: 'Pending', budget: '£4,200' },
  { id: '4', client: 'Bennani Family', type: 'Henna Night', date: '2026-06-28', venue: 'Riad Palais', performers: 3, status: 'Confirmed', budget: '£1,800' },
  { id: '5', client: 'Tech Conference', type: 'Conference', date: '2026-07-01', venue: 'Casanearshore', performers: 2, status: 'Pending', budget: '£3,500' },
];

const performers = [
  { id: '1', name: 'DJ Youssef', specialty: 'DJ & Music', rating: 4.9, events: 45, available: true },
  { id: '2', name: 'Halqa Brothers', specialty: 'Traditional Entertainment', rating: 4.8, events: 32, available: true },
  { id: '3', name: 'Sarah Dance Crew', specialty: 'Belly Dance', rating: 4.7, events: 28, available: false },
  { id: '4', name: 'Magic Mohammed', specialty: 'Magic Show', rating: 4.6, events: 19, available: true },
  { id: '5', name: 'Photo Studio Plus', specialty: 'Photography', rating: 4.9, events: 56, available: true },
];

export default function HalaFlowDashboard() {
  const [tab, setTab] = useState('dashboard');
  const navigate = useNavigate();

  useEffect(() => {
    if (!localStorage.getItem('halaflow_token')) navigate('/halaflow/login');
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('halaflow_token');
    localStorage.removeItem('halaflow_user');
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white border-b border-gray-200 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4">
          <div className="flex items-center gap-3">
            <span className="text-2xl">🎉</span>
            <span className="text-xl font-extrabold text-gray-900">HalaFlow</span>
            <span className="bg-green-100 text-green-700 text-xs font-bold px-2 py-1 rounded-full">DEMO</span>
          </div>
          <div className="flex items-center gap-4">
            <button onClick={handleLogout} className="text-sm text-red-600 hover:text-red-700 font-medium">Logout</button>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="flex gap-2 mb-8 border-b border-gray-200">
          {['dashboard', 'events', 'performers'].map(t => (
            <button key={t} onClick={() => setTab(t)} className={`px-5 py-3 text-sm font-semibold capitalize transition ${tab === t ? 'text-rose-600 border-b-2 border-rose-600' : 'text-gray-500 hover:text-gray-700'}`}>
              {t}
            </button>
          ))}
        </div>

        {tab === 'dashboard' && (
          <div className="space-y-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { label: 'Upcoming Events', value: '8', icon: '📅', color: 'rose' },
                { label: 'Active Performers', value: '12', icon: '🎭', color: 'purple' },
                { label: 'Revenue This Month', value: '£12,800', icon: '💰', color: 'green' },
                { label: 'Client Satisfaction', value: '4.9★', icon: '⭐', color: 'orange' },
              ].map((s, i) => (
                <div key={i} className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                  <div className="text-2xl mb-2">{s.icon}</div>
                  <div className="text-2xl font-extrabold text-gray-900">{s.value}</div>
                  <div className="text-sm text-gray-500">{s.label}</div>
                </div>
              ))}
            </div>
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
              <h3 className="font-bold text-lg mb-4">Upcoming Events</h3>
              <div className="space-y-3">
                {events.slice(0, 3).map(e => (
                  <div key={e.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                    <div>
                      <div className="font-semibold">{e.client}</div>
                      <div className="text-sm text-gray-500">{e.type} • {e.date}</div>
                    </div>
                    <div className="text-right">
                      <div className="font-bold text-gray-900">{e.budget}</div>
                      <span className={`text-xs font-bold px-2 py-1 rounded-lg ${e.status === 'Confirmed' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`}>
                        {e.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {tab === 'events' && (
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="text-left px-6 py-4 text-xs font-bold text-gray-500 uppercase">Client</th>
                  <th className="text-left px-6 py-4 text-xs font-bold text-gray-500 uppercase">Type</th>
                  <th className="text-left px-6 py-4 text-xs font-bold text-gray-500 uppercase">Date</th>
                  <th className="text-left px-6 py-4 text-xs font-bold text-gray-500 uppercase">Venue</th>
                  <th className="text-left px-6 py-4 text-xs font-bold text-gray-500 uppercase">Budget</th>
                  <th className="text-left px-6 py-4 text-xs font-bold text-gray-500 uppercase">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {events.map(e => (
                  <tr key={e.id} className="hover:bg-gray-50 cursor-pointer">
                    <td className="px-6 py-4 font-semibold">{e.client}</td>
                    <td className="px-6 py-4 text-gray-600">{e.type}</td>
                    <td className="px-6 py-4 text-gray-600">{e.date}</td>
                    <td className="px-6 py-4 text-gray-600">{e.venue}</td>
                    <td className="px-6 py-4 font-bold">{e.budget}</td>
                    <td className="px-6 py-4">
                      <span className={`text-xs font-bold px-2 py-1 rounded-lg ${e.status === 'Confirmed' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`}>
                        {e.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {tab === 'performers' && (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {performers.map(p => (
              <div key={p.id} className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-lg transition">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 bg-rose-100 rounded-full flex items-center justify-center text-xl">🎭</div>
                  <span className={`text-xs font-bold px-2 py-1 rounded-lg ${p.available ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                    {p.available ? 'Available' : 'Busy'}
                  </span>
                </div>
                <h3 className="font-bold text-lg">{p.name}</h3>
                <p className="text-sm text-gray-500 mb-3">{p.specialty}</p>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-yellow-600 font-semibold">★ {p.rating}</span>
                  <span className="text-gray-400">{p.events} events</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
