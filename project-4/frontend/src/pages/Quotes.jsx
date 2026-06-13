import { useState } from 'react';
import { Link } from 'react-router-dom';
import { demoQuotes } from '../demoData';

export default function Quotes() {
  const [quotes, setQuotes] = useState(demoQuotes);
  const [filter, setFilter] = useState('all');
  const [search, setSearch] = useState('');

  const statusColors = {
    draft: 'bg-gray-100 text-gray-700',
    sent: 'bg-blue-100 text-blue-700',
    viewed: 'bg-yellow-100 text-yellow-700',
    accepted: 'bg-green-100 text-green-700',
    rejected: 'bg-red-100 text-red-700',
  };

  const filtered = quotes.filter(q => {
    const matchesFilter = filter === 'all' || q.status === filter;
    const matchesSearch = q.title.toLowerCase().includes(search.toLowerCase()) ||
      q.client.name.toLowerCase().includes(search.toLowerCase()) ||
      q.quoteNumber.toLowerCase().includes(search.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-extrabold text-gray-900">Quotes</h1>
          <p className="text-gray-500 mt-1">Manage and track all your quotes</p>
        </div>
        <Link to="/new-quote" className="bg-orange-600 text-white px-6 py-3 rounded-xl font-bold hover:bg-orange-700 transition">
          + New Quote
        </Link>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-6 border-b border-gray-100 flex flex-col md:flex-row gap-4">
          <input
            type="text"
            placeholder="Search quotes..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="flex-1 px-5 py-3 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition"
          />
          <div className="flex gap-2">
            {['all', 'draft', 'sent', 'viewed', 'accepted', 'rejected'].map(s => (
              <button
                key={s}
                onClick={() => setFilter(s)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition ${
                  filter === s ? 'bg-orange-100 text-orange-700' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {s.charAt(0).toUpperCase() + s.slice(1)}
              </button>
            ))}
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="text-left px-6 py-4 text-xs font-bold text-gray-500 uppercase">Quote</th>
                <th className="text-left px-6 py-4 text-xs font-bold text-gray-500 uppercase">Client</th>
                <th className="text-left px-6 py-4 text-xs font-bold text-gray-500 uppercase">Amount</th>
                <th className="text-left px-6 py-4 text-xs font-bold text-gray-500 uppercase">Status</th>
                <th className="text-left px-6 py-4 text-xs font-bold text-gray-500 uppercase">Date</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filtered.map(quote => (
                <tr key={quote.id} className="hover:bg-gray-50 cursor-pointer">
                  <td className="px-6 py-4">
                    <Link to={`/quotes/${quote.id}`}>
                      <div className="font-semibold">{quote.title}</div>
                      <div className="text-sm text-gray-500">{quote.quoteNumber}</div>
                    </Link>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm font-medium">{quote.client.name}</div>
                    <div className="text-sm text-gray-500">{quote.client.company}</div>
                  </td>
                  <td className="px-6 py-4 font-bold">£{quote.total.toLocaleString()}</td>
                  <td className="px-6 py-4">
                    <span className={`text-xs font-bold px-2 py-1 rounded-lg ${statusColors[quote.status]}`}>
                      {quote.status.charAt(0).toUpperCase() + quote.status.slice(1)}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500">{quote.createdAt}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filtered.length === 0 && (
          <div className="p-12 text-center text-gray-400">
            No quotes found
          </div>
        )}
      </div>
    </div>
  );
}
