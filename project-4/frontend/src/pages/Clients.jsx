import { useState } from 'react';
import { demoClients } from '../demoData';

export default function Clients() {
  const [clients, setClients] = useState(demoClients);
  const [search, setSearch] = useState('');

  const filtered = clients.filter(c =>
    c.name.toLowerCase().includes(search.toLowerCase()) ||
    c.company?.toLowerCase().includes(search.toLowerCase()) ||
    c.email?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-extrabold text-gray-900">Clients</h1>
          <p className="text-gray-500 mt-1">Manage your client database</p>
        </div>
        <button className="bg-orange-600 text-white px-6 py-3 rounded-xl font-bold hover:bg-orange-700 transition">
          + Add Client
        </button>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-6 border-b border-gray-100">
          <input
            type="text"
            placeholder="Search clients..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full px-5 py-3 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition"
          />
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="text-left px-6 py-4 text-xs font-bold text-gray-500 uppercase">Name</th>
                <th className="text-left px-6 py-4 text-xs font-bold text-gray-500 uppercase">Company</th>
                <th className="text-left px-6 py-4 text-xs font-bold text-gray-500 uppercase">Email</th>
                <th className="text-left px-6 py-4 text-xs font-bold text-gray-500 uppercase">Phone</th>
                <th className="text-left px-6 py-4 text-xs font-bold text-gray-500 uppercase">Quotes</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filtered.map(client => (
                <tr key={client.id} className="hover:bg-gray-50 cursor-pointer">
                  <td className="px-6 py-4 font-semibold">{client.name}</td>
                  <td className="px-6 py-4 text-gray-600">{client.company}</td>
                  <td className="px-6 py-4 text-gray-600">{client.email}</td>
                  <td className="px-6 py-4 text-gray-600">{client.phone}</td>
                  <td className="px-6 py-4">
                    <span className="bg-orange-100 text-orange-700 text-xs font-bold px-2 py-1 rounded-lg">
                      {client._count?.quotes || 0}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filtered.length === 0 && (
          <div className="p-12 text-center text-gray-400">
            No clients found
          </div>
        )}
      </div>
    </div>
  );
}
