import { Routes, Route, Navigate } from 'react-router-dom';
import Landing from './pages/Landing';
import PrivacyPolicy from './pages/PrivacyPolicy';
import TermsOfService from './pages/TermsOfService';
import Login from './pages/Login';
import Documents from './pages/Documents';
import GymFlowLogin from './pages/GymFlowLogin';
import GymFlowDashboard from './pages/GymFlowDashboard';
import HalaFlowLogin from './pages/HalaFlowLogin';
import HalaFlowDashboard from './pages/HalaFlowDashboard';

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/privacy" element={<PrivacyPolicy />} />
      <Route path="/terms" element={<TermsOfService />} />

      {/* Project 1 - DeliveryNote Pro */}
      <Route path="/login" element={<Login />} />
      <Route path="/documents" element={<Documents />} />

      {/* Project 2 - GymFlow */}
      <Route path="/gymflow/login" element={<GymFlowLogin />} />
      <Route path="/gymflow/dashboard" element={<GymFlowDashboard />} />

      {/* Project 3 - HalaFlow */}
      <Route path="/halaflow/login" element={<HalaFlowLogin />} />
      <Route path="/halaflow/dashboard" element={<HalaFlowDashboard />} />

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
