export const mockUser = {
  id: 'demo-admin-1',
  email: 'admin@delivery.com',
  name: 'System Admin',
  role: 'Admin',
};

export const mockDocuments = [
  { id: 'doc-1', jobNumber: 'DEL-2024-001', vehicleReg: 'AB12 CDE', customerName: 'Acme Logistics', date: '2024-11-15T10:00:00Z', filePath: 'demo.pdf', originalName: 'delivery-note-001.pdf', mimeType: 'application/pdf', fileSize: 245000, version: 2, createdAt: '2024-11-15T10:00:00Z', uploadedBy: { id: 'u1', name: 'John Manager' }, customer: { id: 'c1', name: 'Acme Logistics' } },
  { id: 'doc-2', jobNumber: 'DEL-2024-002', vehicleReg: 'FG34 HIJ', customerName: 'Beta Transport', date: '2024-11-14T14:30:00Z', filePath: 'demo2.pdf', originalName: 'proof-of-delivery-002.pdf', mimeType: 'application/pdf', fileSize: 180000, version: 1, createdAt: '2024-11-14T14:30:00Z', uploadedBy: { id: 'u1', name: 'John Manager' }, customer: { id: 'c2', name: 'Beta Transport' } },
  { id: 'doc-3', jobNumber: 'DEL-2024-003', vehicleReg: 'KL56 MNO', customerName: 'Gamma Haulage', date: '2024-11-13T09:15:00Z', filePath: 'demo3.jpg', originalName: 'delivery-photo-003.jpg', mimeType: 'image/jpeg', fileSize: 3200000, version: 1, createdAt: '2024-11-13T09:15:00Z', uploadedBy: { id: 'u2', name: 'Sarah Admin' }, customer: { id: 'c3', name: 'Gamma Haulage' } },
  { id: 'doc-4', jobNumber: 'DEL-2024-004', vehicleReg: 'PQ78 RST', customerName: 'Delta Shipping', date: '2024-11-12T16:45:00Z', filePath: 'demo4.png', originalName: 'signature-proof-004.png', mimeType: 'image/png', fileSize: 950000, version: 3, createdAt: '2024-11-12T16:45:00Z', uploadedBy: { id: 'u1', name: 'John Manager' }, customer: { id: 'c4', name: 'Delta Shipping' } },
  { id: 'doc-5', jobNumber: 'DEL-2024-005', vehicleReg: 'UV90 WXY', customerName: 'Epsilon Freight', date: '2024-11-11T11:00:00Z', filePath: 'demo5.pdf', originalName: 'delivery-note-005.pdf', mimeType: 'application/pdf', fileSize: 510000, version: 1, createdAt: '2024-11-11T11:00:00Z', uploadedBy: { id: 'u2', name: 'Sarah Admin' }, customer: { id: 'c5', name: 'Epsilon Freight' } },
  { id: 'doc-6', jobNumber: 'DEL-2024-006', vehicleReg: 'ZA12 BC', customerName: 'Zeta Couriers', date: '2024-11-10T08:20:00Z', filePath: 'demo6.pdf', originalName: 'pod-006.pdf', mimeType: 'application/pdf', fileSize: 195000, version: 1, createdAt: '2024-11-10T08:20:00Z', uploadedBy: { id: 'u1', name: 'John Manager' }, customer: { id: 'c6', name: 'Zeta Couriers' } },
];

export const mockUsers = [
  { id: 'u1', email: 'john@delivery.com', name: 'John Manager', role: 'Manager', active: true, createdAt: '2024-10-01T08:00:00Z' },
  { id: 'u2', email: 'sarah@delivery.com', name: 'Sarah Admin', role: 'Admin', active: true, createdAt: '2024-10-01T08:00:00Z' },
  { id: 'c1', email: 'bob@acme.com', name: 'Bob (Acme)', role: 'Customer', active: true, createdAt: '2024-10-05T09:00:00Z' },
  { id: 'c2', email: 'alice@beta.com', name: 'Alice (Beta)', role: 'Customer', active: true, createdAt: '2024-10-06T10:00:00Z' },
  { id: 'c3', email: 'charlie@gamma.com', name: 'Charlie (Gamma)', role: 'Customer', active: true, createdAt: '2024-10-07T11:00:00Z' },
  { id: 'c4', email: 'diana@delta.com', name: 'Diana (Delta)', role: 'Customer', active: true, createdAt: '2024-10-08T12:00:00Z' },
  { id: 'c5', email: 'elias@epsilon.com', name: 'Elias (Epsilon)', role: 'Customer', active: true, createdAt: '2024-10-09T13:00:00Z' },
  { id: 'c6', email: 'zeta@zeta.com', name: 'Zara (Zeta)', role: 'Customer', active: false, createdAt: '2024-10-10T14:00:00Z' },
];
