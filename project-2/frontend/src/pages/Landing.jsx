import { Link } from 'react-router-dom';
import { useState } from 'react';

export default function Landing() {
  const [loading, setLoading] = useState(false);

  const handleDemo = () => {
    setLoading(true);
    setTimeout(() => { window.location.href = '/dashboard'; }, 1500);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-600 to-purple-700">
      <nav className="flex justify-between items-center p-6">
        <div className="text-white text-2xl font-bold">GymFlow</div>
        <div className="flex gap-4">
          <Link to="/login" className="text-white hover:text-blue-200">Login</Link>
          <button onClick={handleDemo} className="bg-white text-blue-600 px-4 py-2 rounded-lg font-semibold hover:bg-blue-50">
            {loading ? (
              <span className="flex items-center gap-2">
                <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"/><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/></svg>
                Loading Demo...
              </span>
            ) : 'Try Demo'}
          </button>
        </div>
      </nav>

      <div className="max-w-6xl mx-auto px-6 py-20">
        <div className="text-center mb-20">
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6">
            Class Booking<br/>Made Simple
          </h1>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Stop managing class bookings on paper. Let your members book online, track attendance, and grow your gym.
          </p>
          <div className="flex gap-4 justify-center">
            <button onClick={handleDemo} className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold text-lg hover:bg-blue-50">
              {loading ? 'Loading...' : 'Try Free Demo'}
            </button>
            <a href="#features" className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold text-lg hover:bg-white/10">
              Learn More
            </a>
          </div>
        </div>

        <div id="features" className="grid md:grid-cols-3 gap-8 mb-20">
          {[
            { title: 'Online Booking', desc: 'Members book classes from their phone, 24/7. No more phone calls.' },
            { title: 'Class Schedule', desc: 'Visual weekly schedule. See capacity at a glance. Drag and drop.' },
            { title: 'Member Management', desc: 'Track attendance, see who books what, manage memberships.' },
            { title: 'Instructor Dashboard', desc: 'Instructors see their classes, attendance, and member details.' },
            { title: 'Attendance Tracking', desc: 'Mark members as attended or no-show. Track patterns over time.' },
            { title: 'Real-time Capacity', desc: 'See how many spots are left. Auto-close when full.' },
          ].map((f, i) => (
            <div key={i} className="bg-white/10 backdrop-blur-sm rounded-xl p-6 text-white">
              <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center mb-4 text-2xl">
                {['📅', '📊', '👥', '🏋️', '✅', '⚡'][i]}
              </div>
              <h3 className="text-xl font-semibold mb-2">{f.title}</h3>
              <p className="text-blue-100">{f.desc}</p>
            </div>
          ))}
        </div>

        <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-10 text-center text-white mb-20">
          <h2 className="text-3xl font-bold mb-4">Pricing</h2>
          <div className="grid md:grid-cols-2 gap-8 max-w-2xl mx-auto">
            <div className="bg-white rounded-xl p-8 text-gray-800">
              <h3 className="text-xl font-bold mb-2">One-Time</h3>
              <div className="text-4xl font-bold text-blue-600 mb-4">£199</div>
              <p className="text-gray-600 mb-4">Pay once, own it forever</p>
              <ul className="text-left text-sm space-y-2">
                <li>✓ Full system</li>
                <li>✓ Free hosting</li>
                <li>✓ 1 year support</li>
                <li>✓ Source code</li>
              </ul>
            </div>
            <div className="bg-white rounded-xl p-8 text-gray-800">
              <h3 className="text-xl font-bold mb-2">Monthly</h3>
              <div className="text-4xl font-bold text-purple-600 mb-4">£29<span className="text-lg">/mo</span></div>
              <p className="text-gray-600 mb-4">We host everything for you</p>
              <ul className="text-left text-sm space-y-2">
                <li>✓ Full system</li>
                <li>✓ Managed hosting</li>
                <li>✓ All updates included</li>
                <li>✓ Priority support</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="text-center text-white pb-10">
          <p className="text-blue-200">Built for small gyms who want to grow</p>
        </div>
      </div>
    </div>
  );
}
