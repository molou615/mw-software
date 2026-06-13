import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const demoClients = [
  { id: '1', name: 'John Smith', company: 'Smith Plumbing', email: 'john@smithplumbing.co.uk' },
  { id: '2', name: 'Sarah Williams', company: 'Williams Electrical', email: 'sarah@williamselectrical.co.uk' },
  { id: '3', name: 'Mike Johnson', company: 'Johnson Builders', email: 'mike@johnsonbuilders.co.uk' },
  { id: '4', name: 'Emma Brown', company: 'Brown Carpentry', email: 'emma@browncarpentry.co.uk' },
  { id: '5', name: 'David Lee', company: 'Lee Roofing', email: 'david@leeroofing.co.uk' },
];

const initialQuotes = [
  { id: '1', quoteNumber: 'Q-0001', title: 'Bathroom Renovation', client: 'John Smith', company: 'Smith Plumbing', total: 3270, status: 'sent', date: '2026-06-12', items: [{ desc: 'Remove old suite', qty: 1, price: 350 }, { desc: 'New toilet, basin & bath', qty: 1, price: 1200 }, { desc: 'Tiling', qty: 15, price: 45 }] },
  { id: '2', quoteNumber: 'Q-0002', title: 'Kitchen Extension Wiring', client: 'Sarah Williams', company: 'Williams Electrical', total: 5100, status: 'accepted', date: '2026-06-11', items: [{ desc: 'Full rewire', qty: 1, price: 2800 }, { desc: 'Additional sockets', qty: 10, price: 85 }] },
  { id: '3', quoteNumber: 'Q-0003', title: 'Garden Wall Repair', client: 'Mike Johnson', company: 'Johnson Builders', total: 1542, status: 'draft', date: '2026-06-10', items: [{ desc: 'Demolish section', qty: 3, price: 150 }, { desc: 'Rebuild with blocks', qty: 3, price: 200 }] },
  { id: '4', quoteNumber: 'Q-0004', title: 'Custom Bookshelf', client: 'Emma Brown', company: 'Brown Carpentry', total: 1344, status: 'viewed', date: '2026-06-09', items: [{ desc: 'Oak bookshelf', qty: 1, price: 850 }, { desc: 'Wall mounting', qty: 1, price: 150 }] },
  { id: '5', quoteNumber: 'Q-0005', title: 'Flat Roof Replacement', client: 'David Lee', company: 'Lee Roofing', total: 2136, status: 'sent', date: '2026-06-08', items: [{ desc: 'Remove old roof', qty: 25, price: 15 }, { desc: 'Install EPDM', qty: 25, price: 45 }] },
];

export default function QuoteBuilderDashboard() {
  const [tab, setTab] = useState('dashboard');
  const [quotes, setQuotes] = useState(initialQuotes);
  const [selectedQuote, setSelectedQuote] = useState(null);
  const [showNewQuote, setShowNewQuote] = useState(false);
  const [newQuote, setNewQuote] = useState({ title: '', clientId: '', items: [{ desc: '', qty: 1, price: 0 }], notes: '' });
  const navigate = useNavigate();

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
  };

  const totalRevenue = quotes.filter(q => q.status === 'accepted').reduce((sum, q) => sum + q.total, 0);

  const addLineItem = () => {
    setNewQuote({ ...newQuote, items: [...newQuote.items, { desc: '', qty: 1, price: 0 }] });
  };

  const updateLineItem = (index, field, value) => {
    const items = [...newQuote.items];
    items[index][field] = field === 'desc' ? value : parseFloat(value) || 0;
    setNewQuote({ ...newQuote, items });
  };

  const removeLineItem = (index) => {
    setNewQuote({ ...newQuote, items: newQuote.items.filter((_, i) => i !== index) });
  };

  const createQuote = () => {
    const client = demoClients.find(c => c.id === newQuote.clientId);
    if (!client || !newQuote.title) { alert('Please fill in title and client'); return; }

    const subtotal = newQuote.items.reduce((sum, item) => sum + item.qty * item.price, 0);
    const total = Math.round(subtotal * 1.2);

    const quote = {
      id: String(quotes.length + 1),
      quoteNumber: `Q-${String(quotes.length + 1).padStart(4, '0')}`,
      title: newQuote.title,
      client: client.name,
      company: client.company,
      total,
      status: 'draft',
      date: new Date().toISOString().split('T')[0],
      items: newQuote.items.map(i => ({ desc: i.desc, qty: i.qty, price: i.price })),
    };

    setQuotes([quote, ...quotes]);
    setNewQuote({ title: '', clientId: '', items: [{ desc: '', qty: 1, price: 0 }], notes: '' });
    setShowNewQuote(false);
    setTab('quotes');
  };

  const subtotal = newQuote.items.reduce((sum, item) => sum + item.qty * item.price, 0);
  const total = Math.round(subtotal * 1.2);

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
            <button onClick={() => { setShowNewQuote(true); setTab('new-quote'); }} className="bg-orange-600 text-white px-5 py-2 rounded-xl font-bold hover:bg-orange-700 transition text-sm">
              + New Quote
            </button>
            <button onClick={handleLogout} className="text-sm text-red-600 hover:text-red-700 font-medium">Logout</button>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="flex gap-2 mb-8 border-b border-gray-200">
          {['dashboard', 'quotes', 'clients'].map(t => (
            <button key={t} onClick={() => { setTab(t); setSelectedQuote(null); setShowNewQuote(false); }} className={`px-5 py-3 text-sm font-semibold capitalize transition ${tab === t || (tab === 'new-quote' && t === 'quotes') ? 'text-orange-600 border-b-2 border-orange-600' : 'text-gray-500 hover:text-gray-700'}`}>
              {t}
            </button>
          ))}
        </div>

        {/* Dashboard */}
        {tab === 'dashboard' && (
          <div className="space-y-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { label: 'Total Quotes', value: quotes.length, icon: '📄' },
                { label: 'Sent', value: quotes.filter(q => q.status === 'sent').length, icon: '📤' },
                { label: 'Accepted', value: quotes.filter(q => q.status === 'accepted').length, icon: '✅' },
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
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-bold text-lg">Recent Quotes</h3>
                <button onClick={() => { setShowNewQuote(true); setTab('new-quote'); }} className="text-orange-600 hover:text-orange-700 font-medium text-sm">+ New Quote</button>
              </div>
              <div className="space-y-3">
                {quotes.slice(0, 3).map(q => (
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

        {/* New Quote Form */}
        {tab === 'new-quote' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-extrabold">New Quote</h2>
              <button onClick={() => { setShowNewQuote(false); setTab('quotes'); }} className="text-gray-500 hover:text-gray-700">✕ Cancel</button>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              <div className="md:col-span-2 space-y-6">
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                  <h3 className="font-bold mb-4">Quote Details</h3>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Title</label>
                      <input type="text" value={newQuote.title} onChange={(e) => setNewQuote({ ...newQuote, title: e.target.value })} placeholder="e.g. Bathroom Renovation" className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition" />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Client</label>
                      <select value={newQuote.clientId} onChange={(e) => setNewQuote({ ...newQuote, clientId: e.target.value })} className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition">
                        <option value="">Select a client</option>
                        {demoClients.map(c => <option key={c.id} value={c.id}>{c.name} - {c.company}</option>)}
                      </select>
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-bold">Line Items</h3>
                    <button onClick={addLineItem} className="text-orange-600 hover:text-orange-700 font-medium text-sm">+ Add Item</button>
                  </div>
                  <div className="space-y-3">
                    {newQuote.items.map((item, i) => (
                      <div key={i} className="flex gap-3 items-center p-3 bg-gray-50 rounded-xl">
                        <input type="text" value={item.desc} onChange={(e) => updateLineItem(i, 'desc', e.target.value)} placeholder="Description" className="flex-1 px-4 py-3 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-orange-500 transition" />
                        <input type="number" value={item.qty} onChange={(e) => updateLineItem(i, 'qty', e.target.value)} min="1" className="w-20 px-3 py-3 border border-gray-200 rounded-lg text-sm text-center focus:ring-2 focus:ring-orange-500 transition" />
                        <input type="number" value={item.price} onChange={(e) => updateLineItem(i, 'price', e.target.value)} min="0" className="w-28 px-3 py-3 border border-gray-200 rounded-lg text-sm text-right focus:ring-2 focus:ring-orange-500 transition" />
                        <span className="w-24 text-right font-semibold text-sm">£{(item.qty * item.price).toFixed(2)}</span>
                        {newQuote.items.length > 1 && <button onClick={() => removeLineItem(i)} className="text-red-400 hover:text-red-600">✕</button>}
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                  <h3 className="font-bold mb-4">Notes (optional)</h3>
                  <textarea value={newQuote.notes} onChange={(e) => setNewQuote({ ...newQuote, notes: e.target.value })} placeholder="Payment terms, warranty info..." rows="3" className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-orange-500 transition resize-none" />
                </div>
              </div>

              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 sticky top-24 h-fit">
                <h3 className="font-bold mb-4">Summary</h3>
                <div className="space-y-3">
                  <div className="flex justify-between text-sm"><span className="text-gray-500">Subtotal</span><span className="font-semibold">£{subtotal.toFixed(2)}</span></div>
                  <div className="flex justify-between text-sm"><span className="text-gray-500">VAT (20%)</span><span className="font-semibold">£{(subtotal * 0.2).toFixed(2)}</span></div>
                  <div className="border-t border-gray-200 pt-3 flex justify-between"><span className="font-bold text-lg">Total</span><span className="font-extrabold text-xl text-orange-600">£{total.toLocaleString()}</span></div>
                </div>
                <button onClick={createQuote} className="w-full bg-orange-600 text-white py-3 rounded-xl font-bold hover:bg-orange-700 transition mt-6">
                  Create Quote
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Quotes List */}
        {tab === 'quotes' && !selectedQuote && (
          <div className="space-y-4">
            <div className="flex justify-end">
              <button onClick={() => { setShowNewQuote(true); setTab('new-quote'); }} className="bg-orange-600 text-white px-5 py-2 rounded-xl font-bold hover:bg-orange-700 transition text-sm">+ New Quote</button>
            </div>
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
                  {quotes.map(q => (
                    <tr key={q.id} className="hover:bg-gray-50 cursor-pointer" onClick={() => setSelectedQuote(q)}>
                      <td className="px-6 py-4"><div className="font-semibold">{q.title}</div><div className="text-sm text-gray-500">{q.quoteNumber}</div></td>
                      <td className="px-6 py-4"><div className="text-sm font-medium">{q.client}</div><div className="text-sm text-gray-500">{q.company}</div></td>
                      <td className="px-6 py-4 font-bold">£{q.total.toLocaleString()}</td>
                      <td className="px-6 py-4"><span className={`text-xs font-bold px-2 py-1 rounded-lg ${statusColors[q.status]}`}>{q.status}</span></td>
                      <td className="px-6 py-4 text-sm text-gray-500">{q.date}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Quote Detail */}
        {tab === 'quotes' && selectedQuote && (
          <div className="space-y-6">
            <button onClick={() => setSelectedQuote(null)} className="text-orange-600 hover:text-orange-700 font-medium">← Back to quotes</button>
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
              <div className="flex items-center justify-between mb-8">
                <div>
                  <h2 className="text-2xl font-extrabold">{selectedQuote.title}</h2>
                  <p className="text-gray-500">{selectedQuote.quoteNumber} • {selectedQuote.client}</p>
                </div>
                <div className="flex gap-3">
                  <span className={`px-4 py-2 rounded-xl text-sm font-bold ${statusColors[selectedQuote.status]}`}>{selectedQuote.status}</span>
                  {selectedQuote.status === 'draft' && <button onClick={() => { setQuotes(quotes.map(q => q.id === selectedQuote.id ? { ...q, status: 'sent' } : q)); setSelectedQuote({ ...selectedQuote, status: 'sent' }); }} className="bg-blue-600 text-white px-4 py-2 rounded-xl font-bold hover:bg-blue-700 text-sm">Send Quote</button>}
                  {selectedQuote.status === 'sent' && <button onClick={() => { setQuotes(quotes.map(q => q.id === selectedQuote.id ? { ...q, status: 'accepted' } : q)); setSelectedQuote({ ...selectedQuote, status: 'accepted' }); }} className="bg-green-600 text-white px-4 py-2 rounded-xl font-bold hover:bg-green-700 text-sm">Mark Accepted</button>}
                </div>
              </div>
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h3 className="font-bold mb-4">Line Items</h3>
                  <div className="space-y-3">
                    {selectedQuote.items.map((item, i) => (
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

        {/* Clients */}
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
                    <td className="px-6 py-4"><span className="bg-orange-100 text-orange-700 text-xs font-bold px-2 py-1 rounded-lg">{quotes.filter(q => q.client === c.name).length}</span></td>
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
