import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';

const demoQuotes = [
  { id: '1', quoteNumber: 'Q-0001', title: 'Bathroom Renovation', client: 'John Smith', company: 'Smith Plumbing', total: 3270, status: 'sent', date: '2026-06-12' },
  { id: '2', quoteNumber: 'Q-0002', title: 'Kitchen Extension Wiring', client: 'Sarah Williams', company: 'Williams Electrical', total: 5100, status: 'accepted', date: '2026-06-11' },
  { id: '3', quoteNumber: 'Q-0003', title: 'Garden Wall Repair', client: 'Mike Johnson', company: 'Johnson Builders', total: 1542, status: 'draft', date: '2026-06-10' },
  { id: '4', quoteNumber: 'Q-0004', title: 'Custom Bookshelf', client: 'Emma Brown', company: 'Brown Carpentry', total: 1344, status: 'viewed', date: '2026-06-09' },
  { id: '5', quoteNumber: 'Q-0005', title: 'Flat Roof Replacement', client: 'David Lee', company: 'Lee Roofing', total: 2136, status: 'sent', date: '2026-06-08' },
];

const demoClients = [
  { id: '1', name: 'John Smith', company: 'Smith Plumbing', email: 'john@smithplumbing.co.uk', quotes: 2 },
  { id: '2', name: 'Sarah Williams', company: 'Williams Electrical', email: 'sarah@williamselectrical.co.uk', quotes: 1 },
  { id: '3', name: 'Mike Johnson', company: 'Johnson Builders', email: 'mike@johnsonbuilders.co.uk', quotes: 1 },
  { id: '4', name: 'Emma Brown', company: 'Brown Carpentry', email: 'emma@browncarpentry.co.uk', quotes: 1 },
  { id: '5', name: 'David Lee', company: 'Lee Roofing', email: 'david@leeroofing.co.uk', quotes: 1 },
];

export default function QuoteBuilderDashboard() {
  const [tab, setTab] = useState('dashboard');
  const [selectedQuote, setSelectedQuote] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (!localStorage.getItem('qb_token')) navigate('/quotebuilder/login');
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('qb_token');
    localStorage.removeItem('qb_user');
    navigate('/');
  };

  const statusColors = {
    draft: 'bg-gray-100 text-gray-700',
    sent: 'bg-blue-100 text-blue-700',
    viewed: 'bg-yellow-100 text-yellow-700',
    accepted: 'bg-green-100 text-green-700',
    rejected: 'bg-red-100 text-red-700',
  };

  const totalRevenue = demoQuotes.filter(q => q.status === 'accepted').reduce((sum, q) => sum + q.total, 0);

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white border-b border-gray-200 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4">
          <div className="flex items-center gap-3">
            <span className="text-2xl">📝</span>
            <span className="text-xl font-extrabold text-gray-900">QuoteBuilder</span>
            <span className="bg-green-100 text-green-700 text-xs font-bold px-2 py-1 rounded-full">DEMO</span>
          </div>
          <div className="flex items-center gap-4">
            <button onClick={handleLogout} className="text-sm text-red-600 hover:text-red-700 font-medium">Logout</button>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="flex gap-2 mb-8 border-b border-gray-200">
          {['dashboard', 'quotes', 'clients'].map(t => (
            <button key={t} onClick={() => { setTab(t); setSelectedQuote(null); }} className={`px-5 py-3 text-sm font-semibold capitalize transition ${tab === t ? 'text-orange-600 border-b-2 border-orange-600' : 'text-gray-500 hover:text-gray-700'}`}>
              {t}
            </button>
          ))}
        </div>

        {tab === 'dashboard' && (
          <div className="space-y-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { label: 'Total Quotes', value: '5', icon: '📄' },
                { label: 'Sent', value: '2', icon: '📤' },
                { label: 'Accepted', value: '1', icon: '✅' },
                { label: 'Revenue', value: `£${totalRevenue.toLocaleString()}`, icon: '💰' },
              ].map((s, i) => (
                <div key={i} className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                  <div className="text-2xl mb-2">{s.icon}</div>
                  <div className="text-2xl font-extrabold text-gray-900">{s.value}</div>
                  <div className="text-sm text-gray-500">{s.label}</div>
                </div>
              ))}
            </div>
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
              <h3 className="font-bold text-lg mb-4">Recent Quotes</h3>
              <div className="space-y-3">
                {demoQuotes.slice(0, 3).map(q => (
                  <div key={q.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition cursor-pointer" onClick={() => { setSelectedQuote(q); setTab('quotes'); }}>
                    <div>
                      <div className="font-semibold">{q.title}</div>
                      <div className="text-sm text-gray-500">{q.client} • {q.quoteNumber}</div>
                    </div>
                    <div className="text-right">
                      <div className="font-bold">£{q.total.toLocaleString()}</div>
                      <span className={`text-xs font-bold px-2 py-1 rounded-lg ${statusColors[q.status]}`}>{q.status}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {tab === 'quotes' && !selectedQuote && (
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
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
                {demoQuotes.map(q => (
                  <tr key={q.id} className="hover:bg-gray-50 cursor-pointer" onClick={() => setSelectedQuote(q)}>
                    <td className="px-6 py-4">
                      <div className="font-semibold">{q.title}</div>
                      <div className="text-sm text-gray-500">{q.quoteNumber}</div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm font-medium">{q.client}</div>
                      <div className="text-sm text-gray-500">{q.company}</div>
                    </td>
                    <td className="px-6 py-4 font-bold">£{q.total.toLocaleString()}</td>
                    <td className="px-6 py-4">
                      <span className={`text-xs font-bold px-2 py-1 rounded-lg ${statusColors[q.status]}`}>{q.status}</span>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500">{q.date}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {tab === 'quotes' && selectedQuote && (
          <div className="space-y-6">
            <button onClick={() => setSelectedQuote(null)} className="text-orange-600 hover:text-orange-700 font-medium">← Back to quotes</button>
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
              <div className="flex items-center justify-between mb-8">
                <div>
                  <h2 className="text-2xl font-extrabold">{selectedQuote.title}</h2>
                  <p className="text-gray-500">{selectedQuote.quoteNumber} • {selectedQuote.client}</p>
                </div>
                <span className={`px-4 py-2 rounded-xl text-sm font-bold ${statusColors[selectedQuote.status]}`}>{selectedQuote.status}</span>
              </div>
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h3 className="font-bold mb-4">Line Items</h3>
                  <div className="space-y-3">
                    {[
                      { desc: 'Labor', qty: 1, price: 1500 },
                      { desc: 'Materials', qty: 1, price: 800 },
                      { desc: 'Equipment hire', qty: 2, price: 150 },
                    ].map((item, i) => (
                      <div key={i} className="flex justify-between p-3 bg-gray-50 rounded-lg">
                        <span>{item.desc}</span>
                        <span className="font-semibold">£{(item.qty * item.price).toFixed(2)}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <div>
                  <h3 className="font-bold mb-4">Summary</h3>
                  <div className="bg-gray-50 rounded-xl p-4 space-y-2">
                    <div className="flex justify-between text-sm"><span className="text-gray-500">Subtotal</span><span>£{(selectedQuote.total / 1.2).toFixed(2)}</span></div>
                    <div className="flex justify-between text-sm"><span className="text-gray-500">VAT (20%)</span><span>£{(selectedQuote.total - selectedQuote.total / 1.2).toFixed(2)}</span></div>
                    <div className="border-t border-gray-200 pt-2 flex justify-between font-bold text-lg"><span>Total</span><span className="text-orange-600">£{selectedQuote.total.toLocaleString()}</span></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {tab === 'clients' && (
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="text-left px-6 py-4 text-xs font-bold text-gray-500 uppercase">Name</th>
                  <th className="text-left px-6 py-4 text-xs font-bold text-gray-500 uppercase">Company</th>
                  <th className="text-left px-6 py-4 text-xs font-bold text-gray-500 uppercase">Email</th>
                  <th className="text-left px-6 py-4 text-xs font-bold text-gray-500 uppercase">Quotes</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {demoClients.map(c => (
                  <tr key={c.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 font-semibold">{c.name}</td>
                    <td className="px-6 py-4 text-gray-600">{c.company}</td>
                    <td className="px-6 py-4 text-gray-600">{c.email}</td>
                    <td className="px-6 py-4">
                      <span className="bg-orange-100 text-orange-700 text-xs font-bold px-2 py-1 rounded-lg">{c.quotes}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
