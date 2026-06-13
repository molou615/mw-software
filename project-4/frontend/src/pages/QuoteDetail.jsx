import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { demoQuotes } from '../demoData';

export default function QuoteDetail() {
  const { id } = useParams();
  const [quote, setQuote] = useState(null);

  useEffect(() => {
    const found = demoQuotes.find(q => q.id === id);
    setQuote(found);
  }, [id]);

  if (!quote) return <div className="text-center py-12 text-gray-400">Quote not found</div>;

  const statusColors = {
    draft: 'bg-gray-100 text-gray-700',
    sent: 'bg-blue-100 text-blue-700',
    viewed: 'bg-yellow-100 text-yellow-700',
    accepted: 'bg-green-100 text-green-700',
    rejected: 'bg-red-100 text-red-700',
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <Link to="/quotes" className="text-sm text-gray-500 hover:text-gray-700 mb-2 block">← Back to Quotes</Link>
          <h1 className="text-3xl font-extrabold text-gray-900">{quote.title}</h1>
          <p className="text-gray-500 mt-1">{quote.quoteNumber} • {quote.client.name}</p>
        </div>
        <div className="flex gap-3">
          <span className={`px-4 py-2 rounded-xl text-sm font-bold ${statusColors[quote.status]}`}>
            {quote.status.charAt(0).toUpperCase() + quote.status.slice(1)}
          </span>
          {quote.status === 'draft' && (
            <button className="bg-blue-600 text-white px-6 py-2 rounded-xl font-bold hover:bg-blue-700 transition">
              Send Quote
            </button>
          )}
          {quote.status === 'sent' && (
            <button className="bg-green-600 text-white px-6 py-2 rounded-xl font-bold hover:bg-green-700 transition">
              Mark as Accepted
            </button>
          )}
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        <div className="md:col-span-2 bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="p-6 border-b border-gray-100">
            <h2 className="font-bold text-lg">Quote Items</h2>
          </div>
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="text-left px-6 py-4 text-xs font-bold text-gray-500 uppercase">Description</th>
                <th className="text-right px-6 py-4 text-xs font-bold text-gray-500 uppercase">Qty</th>
                <th className="text-right px-6 py-4 text-xs font-bold text-gray-500 uppercase">Price</th>
                <th className="text-right px-6 py-4 text-xs font-bold text-gray-500 uppercase">Total</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {quote.items.map(item => (
                <tr key={item.id}>
                  <td className="px-6 py-4">{item.description}</td>
                  <td className="px-6 py-4 text-right">{item.quantity}</td>
                  <td className="px-6 py-4 text-right">£{item.unitPrice.toFixed(2)}</td>
                  <td className="px-6 py-4 text-right font-semibold">£{item.total.toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="space-y-6">
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
            <h3 className="font-bold text-lg mb-4">Summary</h3>
            <div className="space-y-3">
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Subtotal</span>
                <span className="font-semibold">£{quote.subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">VAT ({quote.vatRate}%)</span>
                <span className="font-semibold">£{quote.vatAmount.toFixed(2)}</span>
              </div>
              <div className="border-t border-gray-200 pt-3 flex justify-between">
                <span className="font-bold text-lg">Total</span>
                <span className="font-extrabold text-xl text-orange-600">£{quote.total.toFixed(2)}</span>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
            <h3 className="font-bold text-lg mb-4">Client Details</h3>
            <div className="space-y-2 text-sm">
              <div><span className="text-gray-500">Name:</span> <span className="font-medium">{quote.client.name}</span></div>
              <div><span className="text-gray-500">Company:</span> <span className="font-medium">{quote.client.company}</span></div>
              <div><span className="text-gray-500">Valid Until:</span> <span className="font-medium">{quote.validUntil}</span></div>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
            <h3 className="font-bold text-lg mb-4">Actions</h3>
            <div className="space-y-2">
              <button className="w-full bg-gray-100 text-gray-700 py-3 rounded-xl font-semibold hover:bg-gray-200 transition">
                📥 Download PDF
              </button>
              <button className="w-full bg-gray-100 text-gray-700 py-3 rounded-xl font-semibold hover:bg-gray-200 transition">
                📧 Email to Client
              </button>
              <button className="w-full bg-gray-100 text-gray-700 py-3 rounded-xl font-semibold hover:bg-gray-200 transition">
                📋 Duplicate Quote
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
