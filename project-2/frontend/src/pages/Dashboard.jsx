import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../auth/AuthContext';
import { demoStats, demoClasses } from '../demoData';
import { config } from '../config';

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
      <div className="mb-8">
        <h1 className="text-2xl font-bold">GymFlow</h1>
        {config.demo && <span className="text-xs bg-blue-600 px-2 py-1 rounded">Demo</span>}
      </div>
      <nav className="space-y-2">
        {navItems.map((item) => (
          <Link key={item.path} to={item.path} className={`flex items-center gap-3 px-4 py-3 rounded-lg transition ${location.pathname === item.path ? 'bg-blue-600' : 'hover:bg-gray-800'}`}>
            <span>{item.icon}</span>
            <span>{item.label}</span>
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

export default function Dashboard() {
  const stats = config.demo ? demoStats : { totalMembers: 0, totalBookings: 0, totalClasses: 0, todayClasses: 0, todayBookings: 0, recentBookings: [] };
  const todayClasses = config.demo ? demoClasses.filter(c => c.date === new Date().toISOString().split('T')[0]) : [];

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar />
      <div className="flex-1 p-8">
        <h2 className="text-3xl font-bold mb-8">Dashboard</h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          {[
            { label: 'Total Members', value: stats.totalMembers, icon: '👥', color: 'bg-blue-500' },
            { label: 'Total Bookings', value: stats.totalBookings, icon: '🎟️', color: 'bg-green-500' },
            { label: 'Active Classes', value: stats.totalClasses, icon: '📅', color: 'bg-purple-500' },
            { label: "Today's Classes", value: stats.todayClasses, icon: '⚡', color: 'bg-orange-500' },
          ].map((s, i) => (
            <div key={i} className="bg-white rounded-xl p-6 shadow-sm">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-500 text-sm">{s.label}</p>
                  <p className="text-3xl font-bold mt-1">{s.value}</p>
                </div>
                <div className={`${s.color} w-12 h-12 rounded-lg flex items-center justify-center text-2xl`}>{s.icon}</div>
              </div>
            </div>
          ))}
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-white rounded-xl p-6 shadow-sm">
            <h3 className="text-lg font-semibold mb-4">Today's Classes</h3>
            <div className="space-y-3">
              {todayClasses.map((cls) => (
                <div key={cls.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div>
                    <span className="font-medium" style={{ color: cls.classType.color }}>{cls.classType.name}</span>
                    <span className="text-gray-500 text-sm ml-2">{cls.startTime} - {cls.endTime}</span>
                  </div>
                  <div className="text-sm">
                    <span className={cls.currentCapacity >= cls.maxCapacity ? 'text-red-500' : 'text-green-500'}>
                      {cls.currentCapacity}/{cls.maxCapacity}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm">
            <h3 className="text-lg font-semibold mb-4">Recent Bookings</h3>
            <div className="space-y-3">
              {stats.recentBookings.map((b) => (
                <div key={b.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div>
                    <span className="font-medium">{b.member.name}</span>
                    <span className="text-gray-500 text-sm ml-2">{b.class.classType.name}</span>
                  </div>
                  <span className={`text-xs px-2 py-1 rounded-full ${b.status === 'CONFIRMED' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`}>
                    {b.status}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
