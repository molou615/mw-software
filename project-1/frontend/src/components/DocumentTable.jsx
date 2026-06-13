import { useAuth } from '../auth/AuthContext';

export default function DocumentTable({ documents, onDownload, onReplace }) {
  const { user } = useAuth();
  const canManage = user?.role === 'Admin' || user?.role === 'Manager';

  if (!documents || documents.length === 0) {
    return (
      <div className="text-center py-12 text-gray-500">
        No documents found.
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-gray-200">
            <th className="text-left py-3 px-4 font-medium text-gray-600">Job #</th>
            <th className="text-left py-3 px-4 font-medium text-gray-600">Customer</th>
            <th className="text-left py-3 px-4 font-medium text-gray-600">Vehicle</th>
            <th className="text-left py-3 px-4 font-medium text-gray-600">Date</th>
            <th className="text-left py-3 px-4 font-medium text-gray-600">Version</th>
            <th className="text-left py-3 px-4 font-medium text-gray-600">Uploaded By</th>
            <th className="text-left py-3 px-4 font-medium text-gray-600">File</th>
            <th className="text-right py-3 px-4 font-medium text-gray-600">Actions</th>
          </tr>
        </thead>
        <tbody>
          {documents.map((doc) => (
            <tr key={doc.id} className="border-b border-gray-100 hover:bg-gray-50">
              <td className="py-3 px-4 font-medium text-gray-900">{doc.jobNumber}</td>
              <td className="py-3 px-4 text-gray-700">{doc.customerName}</td>
              <td className="py-3 px-4 text-gray-700">{doc.vehicleReg || '-'}</td>
              <td className="py-3 px-4 text-gray-700">
                {new Date(doc.date).toLocaleDateString()}
              </td>
              <td className="py-3 px-4">
                <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-blue-100 text-blue-800">
                  v{doc.version}
                </span>
              </td>
              <td className="py-3 px-4 text-gray-700">{doc.uploadedBy?.name || '-'}</td>
              <td className="py-3 px-4 text-gray-700 text-xs truncate max-w-[150px]">
                {doc.originalName}
              </td>
              <td className="py-3 px-4 text-right">
                <div className="flex justify-end gap-2">
                  <button
                    onClick={() => onDownload(doc.id, doc.originalName)}
                    className="text-blue-600 hover:text-blue-800 text-xs font-medium"
                  >
                    Download
                  </button>
                  {canManage && (
                    <button
                      onClick={() => onReplace(doc)}
                      className="text-green-600 hover:text-green-800 text-xs font-medium"
                    >
                      Replace
                    </button>
                  )}
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
