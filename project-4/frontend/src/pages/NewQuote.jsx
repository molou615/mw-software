import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { demoClients } from '../demoData';

export default function NewQuote() {
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [clientId, setClientId] = useState('');
  const [items, setItems] = useState([{ description: '', quantity: 1, unitPrice: 0 }]);
  const [notes, setNotes] = useState('');
  const [validDays, setValidDays] = useState(30);

  const addItem = () => {
    setItems([...items, { description: '', quantity: 1, unitPrice: 0 }]);
  };

  const removeItem = (index) => {
    setItems(items.filter((_, i) => i !== index));
  };

  const updateItem = (index, field, value) => {
    const newItems = [...items];
    newItems[index][field] = field === 'description' ? value : parseFloat(value) || 0;
    setItems(newItems);
  };

  const subtotal = items.reduce((sum, item) => sum + item.quantity * item.unitPrice, 0);
  const vatAmount = subtotal * 0.2;
  const total = subtotal + vatAmount;

  const handleSubmit = (e) => {
    e.preventDefault();
    // In demo mode, just show success and go back
    alert('Quote created successfully! (Demo mode)');
    navigate('/quotes');
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-extrabold text-gray-900">New Quote</h1>
        <p className="text-gray-500 mt-1">Create a professional quote for your client</p>
      </div>

      <form onSubmit={handleSubmit} className="grid md:grid-cols-3 gap-6">
        <div className="md:col-span-2 space-y-6">
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
            <h2 className="font-bold text-lg mb-4">Quote Details</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Quote Title</label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="e.g. Bathroom Renovation"
                  className="w-full px-5 py-3 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Client</label>
                <select
                  value={clientId}
                  onChange={(e) => setClientId(e.target.value)}
                  className="w-full px-5 py-3 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition"
                  required
                >
                  <option value="">Select a client</option>
                  {demoClients.map(c => (
                    <option key={c.id} value={c.id}>{c.name} - {c.company}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Valid for (days)</label>
                <input
                  type="number"
                  value={validDays}
                  onChange={(e) => setValidDays(parseInt(e.target.value))}
                  className="w-32 px-5 py-3 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition"
                />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-bold text-lg">Line Items</h2>
              <button type="button" onClick={addItem} className="text-orange-600 hover:text-orange-700 font-medium text-sm">
                + Add Item
              </button>
            </div>
            <div className="space-y-4">
              {items.map((item, index) => (
                <div key={index} className="flex gap-4 items-start p-4 bg-gray-50 rounded-xl">
                  <div className="flex-1">
                    <input
                      type="text"
                      value={item.description}
                      onChange={(e) => updateItem(index, 'description', e.target.value)}
                      placeholder="Description"
                      className="w-full px-4 py-3 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition"
                      required
                    />
                  </div>
                  <div className="w-24">
                    <input
                      type="number"
                      value={item.quantity}
                      onChange={(e) => updateItem(index, 'quantity', e.target.value)}
                      min="0.5"
                      step="0.5"
                      className="w-full px-4 py-3 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition"
                      required
                    />
                  </div>
                  <div className="w-32">
                    <input
                      type="number"
                      value={item.unitPrice}
                      onChange={(e) => updateItem(index, 'unitPrice', e.target.value)}
                      min="0"
                      step="0.01"
                      className="w-full px-4 py-3 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition"
                      required
                    />
                  </div>
                  <div className="w-28 text-right font-semibold py-3">
                    £{(item.quantity * item.unitPrice).toFixed(2)}
                  </div>
                  {items.length > 1 && (
                    <button type="button" onClick={() => removeItem(index)} className="text-red-500 hover:text-red-700 py-3">
                      ✕
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
            <h2 className="font-bold text-lg mb-4">Notes (optional)</h2>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Any additional notes for the client..."
              rows="3"
              className="w-full px-5 py-3 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition resize-none"
            />
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 sticky top-24">
            <h2 className="font-bold text-lg mb-4">Quote Summary</h2>
            <div className="space-y-3">
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Subtotal</span>
                <span className="font-semibold">£{subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">VAT (20%)</span>
                <span className="font-semibold">£{vatAmount.toFixed(2)}</span>
              </div>
              <div className="border-t border-gray-200 pt-3 flex justify-between">
                <span className="font-bold text-lg">Total</span>
                <span className="font-extrabold text-xl text-orange-600">£{total.toFixed(2)}</span>
              </div>
            </div>
            <div className="mt-6 space-y-3">
              <button type="submit" className="w-full bg-orange-600 text-white py-3 rounded-xl font-bold hover:bg-orange-700 transition">
                Create Quote
              </button>
              <button type="button" className="w-full bg-gray-100 text-gray-700 py-3 rounded-xl font-bold hover:bg-gray-200 transition">
                Save as Draft
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
