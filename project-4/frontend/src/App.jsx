import { Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Quotes from './pages/Quotes';
import QuoteDetail from './pages/QuoteDetail';
import Clients from './pages/Clients';
import NewQuote from './pages/NewQuote';
import Layout from './components/Layout';
import ProtectedRoute from './components/ProtectedRoute';

export default function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route
        element={
          <ProtectedRoute>
            <Layout />
          </ProtectedRoute>
        }
      >
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/quotes" element={<Quotes />} />
        <Route path="/quotes/:id" element={<QuoteDetail />} />
        <Route path="/clients" element={<Clients />} />
        <Route path="/new-quote" element={<NewQuote />} />
      </Route>
      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  );
}
