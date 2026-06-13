import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { demoStats, demoQuotes } from '../demoData';
import config from '../config';

export default function Dashboard() {
  const [stats, setStats] = useState(demoStats);
  const [recentQuotes, setRecentQuotes] = useState(demoQuotes.slice(0, 3));

  useEffect(() => {
    if (!config.demo) {
      // Real API call would go here
    }
  }, []);

  const statusColors = {
    draft: 'bg-gray-100 text-gray-700',
    sent: 'bg-blue-100 text-blue-700',
    viewed: 'bg-yellow-100 text-yellow-700',
    accepted: 'bg-green-100 text-green-700',
    rejected: 'bg-red-100 text-red-700',
  };

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-extrabold text-gray-900">Dashboard</h1>
          <p className="text-gray-500 mt-1">Welcome back! Here's your business overview.</p>
        </div>
        <Link to="/new-quote" className="bg-orange-600 text-white px-6 py-3 rounded-xl font-bold hover:bg-orange-700 transition shadow-lg shadow-orange-500/25">
          + New Quote
        </Link>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: 'Total Quotes', value: stats.totalQuotes, icon: '📄', color: 'orange' },
          { label: 'Sent', value: stats.sentQuotes, icon: '📤', color: 'blue' },
          { label: 'Accepted', value: stats.acceptedQuotes, icon: '✅', color: 'green' },
          { label: 'Revenue', value: `£${stats.totalRevenue.toLocaleString()}`, icon: '💰', color: 'purple' },
        ].map((s, i) => (
          <div key={i} className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition">
            <div className="text-2xl mb-2">{s.icon}</div>
            <div className="text-2xl font-extrabold text-gray-900">{s.value}</div>
            <div className="text-sm text-gray-500">{s.label}</div>
          </div>
        ))}
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-6">
            <h2 className="font-bold text-lg">Recent Quotes</h2>
            <Link to="/quotes" className="text-sm text-orange-600 hover:text-orange-700 font-medium">View all →</Link>
          </div>
          <div className="space-y-4">
            {recentQuotes.map(quote => (
              <Link key={quote.id} to={`/quotes/${quote.id}`} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition">
                <div>
                  <div className="font-semibold">{quote.title}</div>
                  <div className="text-sm text-gray-500">{quote.client.name} • {quote.quoteNumber}</div>
                </div>
                <div className="text-right">
                  <div className="font-bold">£{quote.total.toLocaleString()}</div>
                  <span className={`text-xs font-bold px-2 py-1 rounded-lg ${statusColors[quote.status]}`}>
                    {quote.status.charAt(0).toUpperCase() + quote.status.slice(1)}
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
          <h2 className="font-bold text-lg mb-6">Quick Stats</h2>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
              <span className="text-gray-600">Conversion Rate</span>
              <span className="font-bold text-green-600">{stats.conversionRate}%</span>
            </div>
            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
              <span className="text-gray-600">Total Clients</span>
              <span className="font-bold">{stats.totalClients}</span>
            </div>
            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
              <span className="text-gray-600">Avg Quote Value</span>
              <span className="font-bold">£{stats.totalQuotes > 0 ? Math.round(stats.totalRevenue / stats.acceptedQuotes).toLocaleString() : 0}</span>
            </div>
            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
              <span className="text-gray-600">Pending Quotes</span>
              <span className="font-bold text-orange-600">{stats.sentQuotes}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
