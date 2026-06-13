import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const initialEvents = [
  { id: '1', client: 'Ahmed & Fatima', type: 'Wedding', date: '2026-06-20', venue: 'Grand Hotel Marrakech', performers: 4, status: 'Confirmed', budget: 2500 },
  { id: '2', client: 'Smith Family', type: 'Birthday Party', date: '2026-06-22', venue: 'Community Center', performers: 2, status: 'Confirmed', budget: 800 },
  { id: '3', client: 'Corporate Event Ltd', type: 'Corporate Event', date: '2026-06-25', venue: 'Conference Hall', performers: 6, status: 'Pending', budget: 4200 },
  { id: '4', client: 'Bennani Family', type: 'Henna Night', date: '2026-06-28', venue: 'Riad Palais', performers: 3, status: 'Confirmed', budget: 1800 },
  { id: '5', client: 'Tech Conference', type: 'Conference', date: '2026-07-01', venue: 'Casanearshore', performers: 2, status: 'Pending', budget: 3500 },
];

const initialPerformers = [
  { id: '1', name: 'DJ Youssef', specialty: 'DJ & Music', rating: 4.9, events: 45, available: true },
  { id: '2', name: 'Halqa Brothers', specialty: 'Traditional Entertainment', rating: 4.8, events: 32, available: true },
  { id: '3', name: 'Sarah Dance Crew', specialty: 'Belly Dance', rating: 4.7, events: 28, available: false },
  { id: '4', name: 'Magic Mohammed', specialty: 'Magic Show', rating: 4.6, events: 19, available: true },
  { id: '5', name: 'Photo Studio Plus', specialty: 'Photography', rating: 4.9, events: 56, available: true },
];

export default function HalaFlowDashboard() {
  const [tab, setTab] = useState('dashboard');
  const [events, setEvents] = useState(initialEvents);
  const [performers, setPerformers] = useState(initialPerformers);
  const [showNewEvent, setShowNewEvent] = useState(false);
  const [newEvent, setNewEvent] = useState({ client: '', type: '', date: '', venue: '', budget: '' });
  const navigate = useNavigate();

  useEffect(() => {
    if (!localStorage.getItem('halaflow_token')) navigate('/halaflow/login');
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('halaflow_token');
    localStorage.removeItem('halaflow_user');
    navigate('/');
  };

  const createEvent = () => {
    if (!newEvent.client || !newEvent.type || !newEvent.date) {
      alert('Please fill in client, type, and date');
      return;
    }
    const event = {
      id: String(events.length + 1),
      client: newEvent.client,
      type: newEvent.type,
      date: newEvent.date,
      venue: newEvent.venue || 'TBD',
      performers: 0,
      status: 'Pending',
      budget: parseInt(newEvent.budget) || 0,
    };
    setEvents([...events, event]);
    setNewEvent({ client: '', type: '', date: '', venue: '', budget: '' });
    setShowNewEvent(false);
    alert('Event created successfully!');
  };

  const togglePerformerAvailability = (id) => {
    setPerformers(performers.map(p => p.id === id ? { ...p, available: !p.available } : p));
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
            <button onClick={() => setShowNewEvent(true)} className="bg-rose-500 text-white px-5 py-2 rounded-xl font-bold hover:bg-rose-600 transition text-sm">
              + New Event
            </button>
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

        {/* New Event Modal */}
        {showNewEvent && (
          <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4 backdrop-blur-sm" onClick={() => setShowNewEvent(false)}>
            <div className="bg-white rounded-3xl shadow-2xl p-8 w-full max-w-md" onClick={(e) => e.stopPropagation()}>
              <h2 className="text-2xl font-extrabold mb-6">Create New Event</h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Client Name *</label>
                  <input type="text" value={newEvent.client} onChange={(e) => setNewEvent({ ...newEvent, client: e.target.value })} placeholder="e.g. Ahmed & Fatima" className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-rose-500 transition" />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Event Type *</label>
                  <select value={newEvent.type} onChange={(e) => setNewEvent({ ...newEvent, type: e.target.value })} className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-rose-500 transition">
                    <option value="">Select type</option>
                    <option>Wedding</option>
                    <option>Birthday Party</option>
                    <option>Corporate Event</option>
                    <option>Henna Night</option>
                    <option>Conference</option>
                    <option>Other</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Date *</label>
                  <input type="date" value={newEvent.date} onChange={(e) => setNewEvent({ ...newEvent, date: e.target.value })} className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-rose-500 transition" />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Venue</label>
                  <input type="text" value={newEvent.venue} onChange={(e) => setNewEvent({ ...newEvent, venue: e.target.value })} placeholder="e.g. Grand Hotel" className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-rose-500 transition" />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Budget (£)</label>
                  <input type="number" value={newEvent.budget} onChange={(e) => setNewEvent({ ...newEvent, budget: e.target.value })} placeholder="e.g. 2500" className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-rose-500 transition" />
                </div>
              </div>
              <div className="flex gap-3 mt-6">
                <button onClick={createEvent} className="flex-1 bg-rose-500 text-white py-3 rounded-xl font-bold hover:bg-rose-600 transition">Create Event</button>
                <button onClick={() => setShowNewEvent(false)} className="px-6 py-3 border border-gray-200 rounded-xl font-semibold hover:bg-gray-50 transition">Cancel</button>
              </div>
            </div>
          </div>
        )}

        {/* Dashboard */}
        {tab === 'dashboard' && (
          <div className="space-y-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { label: 'Upcoming Events', value: events.length, icon: '📅' },
                { label: 'Active Performers', value: performers.filter(p => p.available).length, icon: '🎭' },
                { label: 'Revenue This Month', value: `£${events.reduce((sum, e) => sum + e.budget, 0).toLocaleString()}`, icon: '💰' },
                { label: 'Client Satisfaction', value: '4.9★', icon: '⭐' },
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
                      <div className="font-bold">£{e.budget.toLocaleString()}</div>
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

        {/* Events */}
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
                    <td className="px-6 py-4 font-bold">£{e.budget.toLocaleString()}</td>
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

        {/* Performers */}
        {tab === 'performers' && (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {performers.map(p => (
              <div key={p.id} className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-lg transition">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 bg-rose-100 rounded-full flex items-center justify-center text-xl">🎭</div>
                  <button onClick={() => togglePerformerAvailability(p.id)} className={`text-xs font-bold px-2 py-1 rounded-lg transition ${p.available ? 'bg-green-100 text-green-700 hover:bg-green-200' : 'bg-red-100 text-red-700 hover:bg-red-200'}`}>
                    {p.available ? 'Available' : 'Busy'}
                  </button>
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
