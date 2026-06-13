import { Link } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import { demoBookings } from '../demoData';
import { useState } from 'react';

const statusColors = { PENDING: 'bg-yellow-100 text-yellow-700', CONFIRMED: 'bg-green-100 text-green-700', IN_PROGRESS: 'bg-blue-100 text-blue-700', COMPLETED: 'bg-purple-100 text-purple-700', CANCELLED: 'bg-red-100 text-red-700' };

export default function Bookings() {
  const [filter, setFilter] = useState('all');
  const bookings = filter === 'all' ? demoBookings : demoBookings.filter(b => b.status === filter);
  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar />
      <div className="flex-1 p-8">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold">Bookings</h2>
          <button className="bg-rose-500 text-white px-4 py-2 rounded-lg hover:bg-rose-600">+ New Booking</button>
        </div>
        <div className="flex gap-2 mb-6">
          {['all', 'PENDING', 'CONFIRMED', 'COMPLETED', 'CANCELLED'].map((f) => (
            <button key={f} onClick={() => setFilter(f)} className={`px-4 py-2 rounded-lg text-sm capitalize ${filter === f ? 'bg-rose-500 text-white' : 'bg-white text-gray-700 hover:bg-gray-200'}`}>
              {f === 'all' ? 'All' : f.toLowerCase()}
            </button>
          ))}
        </div>
        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="text-left px-6 py-3 text-xs font-medium text-gray-500 uppercase">Client</th>
                <th className="text-left px-6 py-3 text-xs font-medium text-gray-500 uppercase">Package</th>
                <th className="text-left px-6 py-3 text-xs font-medium text-gray-500 uppercase">Date</th>
                <th className="text-left px-6 py-3 text-xs font-medium text-gray-500 uppercase">Time</th>
                <th className="text-left px-6 py-3 text-xs font-medium text-gray-500 uppercase">Venue</th>
                <th className="text-left px-6 py-3 text-xs font-medium text-gray-500 uppercase">Status</th>
                <th className="text-right px-6 py-3 text-xs font-medium text-gray-500 uppercase">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {bookings.map((b) => (
                <tr key={b.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 font-medium">{b.client.name}</td>
                  <td className="px-6 py-4 text-gray-500">{b.package.name}</td>
                  <td className="px-6 py-4 text-gray-500">{b.eventDate}</td>
                  <td className="px-6 py-4 text-gray-500">{b.eventTime}</td>
                  <td className="px-6 py-4 text-gray-500">{b.venue}</td>
                  <td className="px-6 py-4"><span className={`px-2 py-1 rounded-full text-xs font-medium ${statusColors[b.status]}`}>{b.status}</span></td>
                  <td className="px-6 py-4 text-right"><Link to={`/event/${b.id}`} className="text-rose-600 hover:text-rose-800 text-sm font-medium">View</Link></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
