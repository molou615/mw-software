import { Link } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import { demoStats, demoBookings } from '../demoData';

export default function Dashboard() {
  const stats = demoStats;
  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar />
      <div className="flex-1 p-8">
        <h2 className="text-3xl font-bold mb-8">Dashboard</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-8">
          {[
            { label: 'Total Bookings', value: stats.totalBookings, icon: '📅', color: 'bg-blue-500' },
            { label: 'Pending', value: stats.pendingBookings, icon: '⏳', color: 'bg-yellow-500' },
            { label: 'Confirmed', value: stats.confirmedBookings, icon: '✅', color: 'bg-green-500' },
            { label: 'Completed', value: stats.completedBookings, icon: '🎉', color: 'bg-purple-500' },
            { label: 'Performers', value: stats.totalPerformers, icon: '🎭', color: 'bg-rose-500' },
            { label: 'Revenue', value: '£' + stats.totalRevenue, icon: '💰', color: 'bg-emerald-500' },
          ].map((s, i) => (
            <div key={i} className="bg-white rounded-xl p-5 shadow-sm">
              <div className="flex items-center justify-between mb-2">
                <span className="text-2xl">{s.icon}</span>
                <div className={`${s.color} w-8 h-8 rounded-lg flex items-center justify-center text-white text-xs font-bold`}>{s.value}</div>
              </div>
              <p className="text-gray-500 text-xs">{s.label}</p>
            </div>
          ))}
        </div>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-white rounded-xl p-6 shadow-sm">
            <h3 className="text-lg font-semibold mb-4">Upcoming Events</h3>
            <div className="space-y-3">
              {stats.upcomingEvents.map((b) => (
                <Link key={b.id} to={`/event/${b.id}`} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition">
                  <div>
                    <span className="font-medium">{b.client.name}</span>
                    <span className="text-gray-500 text-sm ml-2">{b.package.name}</span>
                  </div>
                  <div className="text-sm text-gray-500">{b.eventDate}</div>
                </Link>
              ))}
            </div>
          </div>
          <div className="bg-white rounded-xl p-6 shadow-sm">
            <h3 className="text-lg font-semibold mb-4">Quick Actions</h3>
            <div className="space-y-3">
              <Link to="/bookings" className="block p-3 bg-rose-50 text-rose-700 rounded-lg hover:bg-rose-100 transition font-medium">📅 View All Bookings</Link>
              <Link to="/performers" className="block p-3 bg-purple-50 text-purple-700 rounded-lg hover:bg-purple-100 transition font-medium">🎭 Manage Performers</Link>
              <Link to="/packages" className="block p-3 bg-blue-50 text-blue-700 rounded-lg hover:bg-blue-100 transition font-medium">📦 Edit Packages</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
