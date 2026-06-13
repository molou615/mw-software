import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../auth/AuthContext';
import { demoClasses, demoClassTypes } from '../demoData';
import { config } from '../config';
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

export default function ClassSchedule() {
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const classes = config.demo ? demoClasses : [];
  const filtered = classes.filter(c => c.date === selectedDate);
  const days = Array.from({ length: 7 }, (_, i) => {
    const d = new Date();
    d.setDate(d.getDate() + i);
    return d.toISOString().split('T')[0];
  });

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar />
      <div className="flex-1 p-8">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold">Class Schedule</h2>
          <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">+ Add Class</button>
        </div>

        <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
          {days.map((day) => (
            <button key={day} onClick={() => setSelectedDate(day)} className={`px-4 py-2 rounded-lg whitespace-nowrap ${selectedDate === day ? 'bg-blue-600 text-white' : 'bg-white text-gray-700 hover:bg-gray-200'}`}>
              {new Date(day + 'T12:00:00').toLocaleDateString('en-GB', { weekday: 'short', day: 'numeric', month: 'short' })}
            </button>
          ))}
        </div>

        <div className="grid gap-4">
          {filtered.length === 0 ? (
            <div className="bg-white rounded-xl p-8 text-center text-gray-500">No classes scheduled for this day</div>
          ) : (
            filtered.map((cls) => (
              <div key={cls.id} className="bg-white rounded-xl p-6 shadow-sm flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-1.5 h-16 rounded-full" style={{ backgroundColor: cls.classType.color }} />
                  <div>
                    <h3 className="text-lg font-semibold" style={{ color: cls.classType.color }}>{cls.classType.name}</h3>
                    <p className="text-gray-500">{cls.startTime} - {cls.endTime} · {cls.instructor.name}</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="text-right">
                    <div className={`text-2xl font-bold ${cls.currentCapacity >= cls.maxCapacity ? 'text-red-500' : 'text-green-500'}`}>
                      {cls.currentCapacity}/{cls.maxCapacity}
                    </div>
                    <div className="text-xs text-gray-500">spots</div>
                  </div>
                  <div className="flex gap-2">
                    <button className="bg-green-500 text-white px-3 py-1 rounded text-sm hover:bg-green-600">Book</button>
                    <button className="bg-gray-200 text-gray-700 px-3 py-1 rounded text-sm hover:bg-gray-300">Edit</button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
