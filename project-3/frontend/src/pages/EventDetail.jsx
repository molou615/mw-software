import { useParams, Link } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import { demoBookings, demoChecklist } from '../demoData';
import { useState } from 'react';

const statusColors = { PENDING: 'bg-yellow-100 text-yellow-700', CONFIRMED: 'bg-green-100 text-green-700', COMPLETED: 'bg-purple-100 text-purple-700' };
const categoryLabels = { 'pre-event': 'Pre-Event', 'during-event': 'During Event', 'post-event': 'Post-Event' };
const categoryColors = { 'pre-event': 'border-blue-200 bg-blue-50', 'during-event': 'border-yellow-200 bg-yellow-50', 'post-event': 'border-green-200 bg-green-50' };

export default function EventDetail() {
  const { id } = useParams();
  const booking = demoBookings.find(b => b.id === parseInt(id)) || demoBookings[0];
  const checklist = demoChecklist;
  const [items, setItems] = useState(checklist);
  const toggle = (itemId) => setItems(items.map(i => i.id === itemId ? { ...i, completed: !i.completed } : i));
  const categories = ['pre-event', 'during-event', 'post-event'];

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar />
      <div className="flex-1 p-8">
        <Link to="/bookings" className="text-gray-500 hover:text-gray-700 mb-4 inline-block">← Back to Bookings</Link>
        <div className="flex justify-between items-start mb-8">
          <div>
            <h2 className="text-3xl font-bold">{booking.client.name}</h2>
            <p className="text-gray-500">{booking.package.name} · {booking.venue}</p>
          </div>
          <span className={`px-3 py-1 rounded-full text-sm font-medium ${statusColors[booking.status]}`}>{booking.status}</span>
        </div>
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-xl p-6 shadow-sm">
            <h3 className="font-semibold mb-3">Event Details</h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between"><span className="text-gray-500">Date</span><span className="font-medium">{booking.eventDate}</span></div>
              <div className="flex justify-between"><span className="text-gray-500">Time</span><span className="font-medium">{booking.eventTime}</span></div>
              <div className="flex justify-between"><span className="text-gray-500">Duration</span><span className="font-medium">{booking.duration} min</span></div>
              <div className="flex justify-between"><span className="text-gray-500">Guests</span><span className="font-medium">{booking.guestCount}</span></div>
            </div>
          </div>
          <div className="bg-white rounded-xl p-6 shadow-sm">
            <h3 className="font-semibold mb-3">Payment</h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between"><span className="text-gray-500">Package Price</span><span className="font-medium">£{booking.package.price}</span></div>
              <div className="flex justify-between"><span className="text-gray-500">Deposit Paid</span><span className="font-medium text-green-600">£{booking.depositPaid}</span></div>
              <div className="flex justify-between"><span className="text-gray-500">Total Paid</span><span className="font-medium">£{booking.totalPaid || 0}</span></div>
              <div className="flex justify-between"><span className="text-gray-500">Balance</span><span className="font-medium text-red-600">£{booking.package.price - (booking.totalPaid || 0)}</span></div>
            </div>
          </div>
          <div className="bg-white rounded-xl p-6 shadow-sm">
            <h3 className="font-semibold mb-3">Performers</h3>
            <div className="space-y-2">
              {booking.performances.length > 0 ? booking.performances.map((perf, i) => (
                <div key={i} className="flex items-center gap-2 p-2 bg-gray-50 rounded-lg">
                  <span className="text-lg">🎭</span>
                  <span className="text-sm font-medium">{perf.performer.user.name}</span>
                </div>
              )) : <p className="text-gray-400 text-sm">No performers assigned</p>}
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl p-6 shadow-sm">
          <h3 className="font-semibold mb-4">Event Checklist</h3>
          <div className="grid md:grid-cols-3 gap-6">
            {categories.map((cat) => (
              <div key={cat} className={`rounded-xl border-2 p-4 ${categoryColors[cat]}`}>
                <h4 className="font-semibold text-sm mb-3">{categoryLabels[cat]}</h4>
                <div className="space-y-2">
                  {items.filter(i => i.category === cat).map((item) => (
                    <label key={item.id} className="flex items-center gap-2 p-2 bg-white rounded-lg cursor-pointer hover:bg-gray-50">
                      <input type="checkbox" checked={item.completed} onChange={() => toggle(item.id)} className="w-4 h-4 rounded text-rose-500" />
                      <span className={`text-sm ${item.completed ? 'line-through text-gray-400' : ''}`}>{item.title}</span>
                    </label>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
