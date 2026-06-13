import { useState, useEffect } from 'react';
import UploadZone from '../components/UploadZone';
import { uploadDocument } from '../services/documentService';
import { getUsers } from '../services/userService';
import { useAuth } from '../auth/AuthContext';
import config from '../config';
import { mockUsers } from '../demoData';

export default function Upload() {
  const { user } = useAuth();
  const [files, setFiles] = useState([]);
  const [formData, setFormData] = useState({
    jobNumber: '',
    vehicleReg: '',
    customerName: '',
    date: new Date().toISOString().split('T')[0],
    customerId: '',
  });
  const [customers, setCustomers] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [message, setMessage] = useState(null);

  useEffect(() => {
    if (user?.role === 'Admin') {
      if (config.demo) {
        setCustomers(mockUsers.filter((u) => u.role === 'Customer'));
        return;
      }
      getUsers().then((res) => {
        setCustomers(res.data.filter((u) => u.role === 'Customer'));
      }).catch(() => {});
    }
  }, [user]);

  const handleFiles = (fileList) => {
    setFiles(Array.from(fileList));
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (files.length === 0) {
      setMessage({ type: 'error', text: 'Please select a file to upload' });
      return;
    }

    if (config.demo) {
      setMessage({ type: 'success', text: '[Demo] Document uploaded successfully!' });
      setFiles([]);
      setFormData({
        jobNumber: '',
        vehicleReg: '',
        customerName: '',
        date: new Date().toISOString().split('T')[0],
        customerId: '',
      });
      return;
    }

    setUploading(true);
    setMessage(null);

    try {
      const fd = new FormData();
      fd.append('file', files[0]);
      fd.append('jobNumber', formData.jobNumber);
      fd.append('vehicleReg', formData.vehicleReg);
      fd.append('customerName', formData.customerName);
      fd.append('date', formData.date);
      if (formData.customerId) {
        fd.append('customerId', formData.customerId);
      }

      await uploadDocument(fd);
      setMessage({ type: 'success', text: 'Document uploaded successfully!' });
      setFiles([]);
      setFormData({
        jobNumber: '',
        vehicleReg: '',
        customerName: '',
        date: new Date().toISOString().split('T')[0],
        customerId: '',
      });
    } catch (err) {
      setMessage({ type: 'error', text: err.response?.data?.message || 'Upload failed' });
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Upload Delivery Note</h1>

      {message && (
        <div
          className={`p-4 rounded-lg mb-4 text-sm ${
            message.type === 'success'
              ? 'bg-green-50 text-green-700'
              : 'bg-red-50 text-red-700'
          }`}
        >
          {message.text}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <UploadZone onFilesSelected={handleFiles} />

        {files.length > 0 && (
          <div className="bg-white rounded-lg border border-gray-200 p-4">
            <p className="text-sm font-medium text-gray-700">Selected file:</p>
            <p className="text-sm text-gray-500 mt-1">{files[0].name}</p>
          </div>
        )}

        <div className="bg-white rounded-xl border border-gray-200 p-6 space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Job Number *</label>
              <input
                type="text"
                name="jobNumber"
                value={formData.jobNumber}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Vehicle Reg</label>
              <input
                type="text"
                name="vehicleReg"
                value={formData.vehicleReg}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Customer Name *</label>
              <input
                type="text"
                name="customerName"
                value={formData.customerName}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Date</label>
              <input
                type="date"
                name="date"
                value={formData.date}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          </div>

          {user?.role === 'Admin' && customers.length > 0 && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Assign to Customer</label>
              <select
                name="customerId"
                value={formData.customerId}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="">No assignment</option>
                {customers.map((c) => (
                  <option key={c.id} value={c.id}>{c.name} ({c.email})</option>
                ))}
              </select>
            </div>
          )}

          <button
            type="submit"
            disabled={uploading || files.length === 0}
            className="w-full py-2 px-4 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {uploading ? 'Uploading...' : 'Upload Document'}
          </button>
        </div>
      </form>
    </div>
  );
}
