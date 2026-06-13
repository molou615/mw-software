import { useState, useEffect } from 'react';
import { useAuth } from '../auth/AuthContext';
import { getDocuments } from '../services/documentService';
import { Link } from 'react-router-dom';
import config from '../config';
import { mockDocuments } from '../demoData';

export default function Dashboard() {
  const { user } = useAuth();
  const [stats, setStats] = useState({ total: 0, recent: [] });
  const [loading, setLoading] = useState(!config.demo);

  useEffect(() => {
    if (config.demo) {
      setStats({ total: mockDocuments.length, recent: mockDocuments.slice(0, 5) });
      return;
    }

    getDocuments({ limit: 5 })
      .then((res) => {
        setStats({
          total: res.data.pagination.total,
          recent: res.data.documents,
        });
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <p className="text-sm text-gray-500">Welcome back</p>
          <p className="text-lg font-semibold text-gray-900 mt-1">{user?.name}</p>
          <p className="text-sm text-gray-400 capitalize">{user?.role}</p>
        </div>
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <p className="text-sm text-gray-500">Total Documents</p>
          {loading ? (
            <div className="h-8 w-16 bg-gray-200 animate-pulse rounded mt-1" />
          ) : (
            <p className="text-3xl font-bold text-gray-900 mt-1">{stats.total}</p>
          )}
        </div>
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <p className="text-sm text-gray-500">Quick Actions</p>
          <div className="mt-2 space-y-1">
            {(user?.role === 'Admin' || user?.role === 'Manager') && (
              <Link to="/upload" className="block text-sm text-blue-600 hover:text-blue-800">
                Upload new document →
              </Link>
            )}
            <Link to="/documents" className="block text-sm text-blue-600 hover:text-blue-800">
              View all documents →
            </Link>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-gray-200">
        <div className="px-6 py-4 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900">Recent Documents</h2>
        </div>
        {loading ? (
          <div className="p-6 space-y-3">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-12 bg-gray-100 animate-pulse rounded" />
            ))}
          </div>
        ) : stats.recent.length === 0 ? (
          <div className="p-6 text-center text-gray-500">
            No documents uploaded yet.
            {(user?.role === 'Admin' || user?.role === 'Manager') && (
              <Link to="/upload" className="block text-blue-600 hover:text-blue-800 mt-2">
                Upload your first document
              </Link>
            )}
          </div>
        ) : (
          <div className="divide-y divide-gray-100">
            {stats.recent.map((doc) => (
              <div key={doc.id} className="px-6 py-3 flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-900">{doc.jobNumber}</p>
                  <p className="text-xs text-gray-500">{doc.customerName} · v{doc.version}</p>
                </div>
                <span className="text-xs text-gray-400">
                  {new Date(doc.createdAt).toLocaleDateString()}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
