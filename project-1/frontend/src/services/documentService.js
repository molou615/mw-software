import api from './api';

export const uploadDocument = (formData) => api.post('/api/documents/upload', formData, {
  headers: { 'Content-Type': 'multipart/form-data' },
});

export const getDocuments = (params) => api.get('/api/documents', { params });
export const getDocument = (id) => api.get(`/api/documents/${id}`);
export const searchDocuments = (params) => api.get('/api/documents/search', { params });
export const updateDocument = (id, formData) => api.put(`/api/documents/${id}`, formData, {
  headers: { 'Content-Type': 'multipart/form-data' },
});

export const downloadDocument = (id) => api.get(`/api/documents/${id}/download`, {
  responseType: 'blob',
});
