import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const initialDocs = [
  { id: '1', jobNumber: 'JOB-001', vehicleReg: 'AB12 CDE', customerName: 'Smith & Sons Ltd', date: '2026-06-12', originalName: 'delivery-note-001.pdf', fileSize: 245000, version: 1 },
  { id: '2', jobNumber: 'JOB-002', vehicleReg: 'FG34 HIJ', customerName: 'Johnson Transport', date: '2026-06-12', originalName: 'delivery-note-002.pdf', fileSize: 189000, version: 1 },
  { id: '3', jobNumber: 'JOB-003', vehicleReg: 'KL56 MNO', customerName: 'Williams Haulage', date: '2026-06-11', originalName: 'delivery-note-003.pdf', fileSize: 312000, version: 2 },
  { id: '4', jobNumber: 'JOB-004', vehicleReg: 'PQ78 RST', customerName: 'Brown Logistics', date: '2026-06-11', originalName: 'delivery-note-004.pdf', fileSize: 178000, version: 1 },
  { id: '5', jobNumber: 'JOB-005', vehicleReg: 'UV90 WXY', customerName: 'Davis Freight', date: '2026-06-10', originalName: 'delivery-note-005.pdf', fileSize: 267000, version: 1 },
];

export default function Documents() {
  const [docs, setDocs] = useState(initialDocs);
  const [search, setSearch] = useState('');
  const [showUpload, setShowUpload] = useState(false);
  const [uploadForm, setUploadForm] = useState({ jobNumber: '', vehicleReg: '', customerName: '' });
  const navigate = useNavigate();

  useEffect(() => {
    if (!localStorage.getItem('demo_token')) navigate('/login');
  }, [navigate]);

  const filtered = docs.filter(d =>
    d.jobNumber.toLowerCase().includes(search.toLowerCase()) ||
    d.customerName.toLowerCase().includes(search.toLowerCase()) ||
    d.vehicleReg.toLowerCase().includes(search.toLowerCase())
  );

  const handleUpload = () => {
    if (!uploadForm.jobNumber || !uploadForm.customerName) {
      alert('Please fill in job number and customer name');
      return;
    }
    const newDoc = {
      id: String(docs.length + 1),
      jobNumber: uploadForm.jobNumber,
      vehicleReg: uploadForm.vehicleReg,
      customerName: uploadForm.customerName,
      date: new Date().toISOString().split('T')[0],
      originalName: `delivery-note-${Date.now()}.pdf`,
      fileSize: Math.floor(Math.random() * 300000) + 100000,
      version: 1,
    };
    setDocs([newDoc, ...docs]);
    setUploadForm({ jobNumber: '', vehicleReg: '', customerName: '' });
    setShowUpload(false);
  };

  const handleLogout = () => {
    localStorage.removeItem('demo_token');
    localStorage.removeItem('demo_user');
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white border-b border-gray-200 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4">
          <div className="flex items-center gap-3">
            <span className="text-2xl">🚛</span>
            <span className="text-xl font-extrabold text-gray-900">DeliveryNote Pro</span>
            <span className="bg-green-100 text-green-700 text-xs font-bold px-2 py-1 rounded-full">DEMO</span>
          </div>
          <div className="flex items-center gap-4">
            <button onClick={() => setShowUpload(true)} className="bg-blue-600 text-white px-5 py-2 rounded-xl font-bold hover:bg-blue-700 transition text-sm">
              + Upload Document
            </button>
            <button onClick={handleLogout} className="text-sm text-red-600 hover:text-red-700 font-medium">Logout</button>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-6 py-10">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-extrabold text-gray-900">Documents</h1>
            <p className="text-gray-500 mt-1">Search and manage delivery notes</p>
          </div>
          <div className="bg-blue-50 text-blue-700 px-4 py-2 rounded-xl text-sm font-semibold">
            📄 {docs.length} documents
          </div>
        </div>

        {/* Upload Modal */}
        {showUpload && (
          <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4 backdrop-blur-sm" onClick={() => setShowUpload(false)}>
            <div className="bg-white rounded-3xl shadow-2xl p-8 w-full max-w-md" onClick={(e) => e.stopPropagation()}>
              <h2 className="text-2xl font-extrabold mb-6">Upload Document</h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Job Number *</label>
                  <input type="text" value={uploadForm.jobNumber} onChange={(e) => setUploadForm({ ...uploadForm, jobNumber: e.target.value })} placeholder="e.g. JOB-006" className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-blue-500 transition" />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Vehicle Reg</label>
                  <input type="text" value={uploadForm.vehicleReg} onChange={(e) => setUploadForm({ ...uploadForm, vehicleReg: e.target.value })} placeholder="e.g. XY12 ZAB" className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-blue-500 transition" />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Customer Name *</label>
                  <input type="text" value={uploadForm.customerName} onChange={(e) => setUploadForm({ ...uploadForm, customerName: e.target.value })} placeholder="e.g. Acme Ltd" className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-blue-500 transition" />
                </div>
                <div className="border-2 border-dashed border-gray-300 rounded-xl p-8 text-center hover:border-blue-400 transition cursor-pointer">
                  <div className="text-3xl mb-2">📁</div>
                  <p className="text-gray-500 text-sm">Click to select a file or drag & drop</p>
                  <p className="text-gray-400 text-xs mt-1">PDF, JPG, PNG up to 10MB</p>
                </div>
              </div>
              <div className="flex gap-3 mt-6">
                <button onClick={handleUpload} className="flex-1 bg-blue-600 text-white py-3 rounded-xl font-bold hover:bg-blue-700 transition">Upload</button>
                <button onClick={() => setShowUpload(false)} className="px-6 py-3 border border-gray-200 rounded-xl font-semibold hover:bg-gray-50 transition">Cancel</button>
              </div>
            </div>
          </div>
        )}

        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="p-6 border-b border-gray-100">
            <input
              type="text"
              placeholder="Search by job number, customer, or vehicle..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full px-5 py-3 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
            />
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="text-left px-6 py-4 text-xs font-bold text-gray-500 uppercase">Job Number</th>
                  <th className="text-left px-6 py-4 text-xs font-bold text-gray-500 uppercase">Vehicle</th>
                  <th className="text-left px-6 py-4 text-xs font-bold text-gray-500 uppercase">Customer</th>
                  <th className="text-left px-6 py-4 text-xs font-bold text-gray-500 uppercase">Date</th>
                  <th className="text-left px-6 py-4 text-xs font-bold text-gray-500 uppercase">File</th>
                  <th className="text-left px-6 py-4 text-xs font-bold text-gray-500 uppercase">Size</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {filtered.map((doc) => (
                  <tr key={doc.id} className="hover:bg-gray-50 transition cursor-pointer">
                    <td className="px-6 py-4">
                      <span className="bg-blue-100 text-blue-700 text-xs font-bold px-2.5 py-1 rounded-lg">{doc.jobNumber}</span>
                    </td>
                    <td className="px-6 py-4 text-sm font-mono text-gray-700">{doc.vehicleReg || '—'}</td>
                    <td className="px-6 py-4 text-sm text-gray-900 font-medium">{doc.customerName}</td>
                    <td className="px-6 py-4 text-sm text-gray-500">{doc.date}</td>
                    <td className="px-6 py-4 text-sm text-gray-600">{doc.originalName}</td>
                    <td className="px-6 py-4 text-sm text-gray-500">{(doc.fileSize / 1000).toFixed(0)} KB</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {filtered.length === 0 && (
            <div className="p-12 text-center text-gray-400">
              No documents found matching "{search}"
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
