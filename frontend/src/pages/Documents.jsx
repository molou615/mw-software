import { useState, useEffect, useCallback } from 'react';
import SearchFilters from '../components/SearchFilters';
import DocumentTable from '../components/DocumentTable';
import { getDocuments, searchDocuments, downloadDocument, updateDocument } from '../services/documentService';
import UploadZone from '../components/UploadZone';
import { useAuth } from '../auth/AuthContext';
import config from '../config';
import { mockDocuments } from '../demoData';

const ITEMS_PER_PAGE = 5;

export default function Documents() {
  const { user } = useAuth();
  const [documents, setDocuments] = useState([]);
  const [pagination, setPagination] = useState({ page: 1, pages: 1, total: 0 });
  const [loading, setLoading] = useState(!config.demo);
  const [replaceDoc, setReplaceDoc] = useState(null);
  const [replaceFile, setReplaceFile] = useState(null);
  const [replacing, setReplacing] = useState(false);

  const fetchDocuments = useCallback(async (params = {}) => {
    setLoading(true);

    if (config.demo) {
      const page = parseInt(params.page) || 1;
      const start = (page - 1) * ITEMS_PER_PAGE;
      const pageItems = mockDocuments.slice(start, start + ITEMS_PER_PAGE);
      setTimeout(() => {
        setDocuments(pageItems);
        setPagination({ page, limit: ITEMS_PER_PAGE, total: mockDocuments.length, pages: Math.ceil(mockDocuments.length / ITEMS_PER_PAGE) });
        setLoading(false);
      }, 400);
      return;
    }

    try {
      const res = await getDocuments(params);
      setDocuments(res.data.documents);
      setPagination(res.data.pagination);
    } catch {
      // handled by interceptor
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchDocuments();
  }, [fetchDocuments]);

  const handleSearch = async (params) => {
    if (config.demo) {
      setLoading(true);
      let filtered = [...mockDocuments];
      if (params.jobNumber) filtered = filtered.filter(d => d.jobNumber.toLowerCase().includes(params.jobNumber.toLowerCase()));
      if (params.vehicleReg) filtered = filtered.filter(d => d.vehicleReg.toLowerCase().includes(params.vehicleReg.toLowerCase()));
      if (params.customerName) filtered = filtered.filter(d => d.customerName.toLowerCase().includes(params.customerName.toLowerCase()));
      setTimeout(() => {
        setDocuments(filtered);
        setPagination({ page: 1, limit: ITEMS_PER_PAGE, total: filtered.length, pages: Math.ceil(filtered.length / ITEMS_PER_PAGE) });
        setLoading(false);
      }, 300);
      return;
    }

    setLoading(true);
    try {
      const res = await searchDocuments(params);
      setDocuments(res.data.documents);
      setPagination(res.data.pagination);
    } catch {
      // handled by interceptor
    } finally {
      setLoading(false);
    }
  };

  const handleDownload = async (id, name) => {
    if (config.demo) {
      alert(`[Demo] Would download: ${name}`);
      return;
    }
    try {
      const res = await downloadDocument(id);
      const url = window.URL.createObjectURL(new Blob([res.data]));
      const a = document.createElement('a');
      a.href = url;
      a.download = name;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      a.remove();
    } catch {
      // handled by interceptor
    }
  };

  const handleReplace = (doc) => {
    setReplaceDoc(doc);
    setReplaceFile(null);
  };

  const handleReplaceUpload = async () => {
    if (!replaceFile || !replaceDoc) return;
    if (config.demo) {
      setReplaceDoc(null);
      setReplaceFile(null);
      alert('[Demo] New version uploaded successfully!');
      return;
    }
    setReplacing(true);
    try {
      const fd = new FormData();
      fd.append('file', replaceFile);
      await updateDocument(replaceDoc.id, fd);
      setReplaceDoc(null);
      setReplaceFile(null);
      fetchDocuments();
    } catch {
      // handled by interceptor
    } finally {
      setReplacing(false);
    }
  };

  const handlePageChange = (newPage) => {
    fetchDocuments({ page: newPage });
  };

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Documents</h1>

      <SearchFilters onSearch={handleSearch} />

      {replaceDoc && (
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
          <div className="flex items-center justify-between mb-3">
            <div>
              <p className="text-sm font-medium text-yellow-800">
                Replacing document: {replaceDoc.jobNumber} (v{replaceDoc.version})
              </p>
              <p className="text-xs text-yellow-600">{replaceDoc.originalName}</p>
            </div>
            <button
              onClick={() => setReplaceDoc(null)}
              className="text-yellow-700 hover:text-yellow-900"
            >
              Cancel
            </button>
          </div>
          <UploadZone onFilesSelected={(files) => setReplaceFile(files[0])} />
          {replaceFile && (
            <div className="mt-3 flex items-center justify-between">
              <p className="text-sm text-yellow-700">{replaceFile.name}</p>
              <button
                onClick={handleReplaceUpload}
                disabled={replacing}
                className="px-4 py-2 bg-yellow-600 text-white text-sm font-medium rounded-lg hover:bg-yellow-700 disabled:opacity-50"
              >
                {replacing ? 'Uploading...' : 'Upload New Version'}
              </button>
            </div>
          )}
        </div>
      )}

      {loading ? (
        <div className="bg-white rounded-xl border border-gray-200 p-6 space-y-3">
          {[1, 2, 3, 4, 5].map((i) => (
            <div key={i} className="h-12 bg-gray-100 animate-pulse rounded" />
          ))}
        </div>
      ) : (
        <>
          <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
            <DocumentTable
              documents={documents}
              onDownload={handleDownload}
              onReplace={handleReplace}
            />
          </div>

          {pagination.pages > 1 && (
            <div className="flex justify-center gap-2 mt-6">
              {Array.from({ length: pagination.pages }, (_, i) => i + 1).map((p) => (
                <button
                  key={p}
                  onClick={() => handlePageChange(p)}
                  className={`px-3 py-1 text-sm rounded ${
                    p === pagination.page
                      ? 'bg-blue-600 text-white'
                      : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
                  }`}
                >
                  {p}
                </button>
              ))}
            </div>
          )}

          <p className="text-center text-sm text-gray-400 mt-4">
            Showing {documents.length} of {pagination.total} documents
          </p>
        </>
      )}
    </div>
  );
}
