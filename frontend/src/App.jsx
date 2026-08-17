import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './context/AuthContext';
import AuthorityLayout from './layouts/AuthorityLayout';
import CitizenLayout from './layouts/CitizenLayout';

// Pages
import Landing from './pages/Landing';
import Login from './pages/Login';
import Dashboard from './pages/authority/Dashboard';
import LiveMap from './pages/authority/LiveMap';
import Incidents from './pages/authority/Incidents';
import ImpactAnalysis from './pages/authority/ImpactAnalysis';
import Facilities from './pages/authority/Facilities';
import RoutesPage from './pages/authority/Routes';
import Resources from './pages/authority/Resources';
import Simulator from './pages/authority/Simulator';
import Copilot from './pages/authority/Copilot';
import Settings from './pages/authority/Settings';
import CitizenHome from './pages/citizen/CitizenHome';
import CitizenRisk from './pages/citizen/CitizenRisk';
import SafeRoute from './pages/citizen/SafeRoute';
import CitizenFacilities from './pages/citizen/CitizenFacilities';
import ReportIncident from './pages/citizen/ReportIncident';

// Auth guard component
function ProtectedRoute({ children, requiredRole }) {
  const { isAuthenticated, user } = useAuth();

  if (!isAuthenticated) {
    const loginPath = requiredRole === 'authority' ? '/login?role=authority' : '/login';
    return <Navigate to={loginPath} replace />;
  }

  if (requiredRole && user?.role !== requiredRole) {
    return <Navigate to={user?.role === 'citizen' ? '/citizen' : '/authority/dashboard'} replace />;
  }

  return children;
}

export default function App() {
  return (
    <Routes>
      {/* Public */}
      <Route path="/" element={<Landing />} />
      <Route path="/login" element={<Login />} />

      {/* Authority Command Center */}
      <Route
        path="/authority"
        element={
          <ProtectedRoute requiredRole="authority">
            <AuthorityLayout />
          </ProtectedRoute>
        }
      >
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="map" element={<LiveMap />} />
        <Route path="incidents" element={<Incidents />} />
        <Route path="impact" element={<ImpactAnalysis />} />
        <Route path="facilities" element={<Facilities />} />
        <Route path="routes" element={<RoutesPage />} />
        <Route path="resources" element={<Resources />} />
        <Route path="simulator" element={<Simulator />} />
        <Route path="copilot" element={<Copilot />} />
        <Route path="settings" element={<Settings />} />
      </Route>

      {/* Citizen Portal */}
      <Route
        path="/citizen"
        element={
          <ProtectedRoute requiredRole="citizen">
            <CitizenLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<CitizenHome />} />
        <Route path="risk" element={<CitizenRisk />} />
        <Route path="safe-route" element={<SafeRoute />} />
        <Route path="facilities" element={<CitizenFacilities />} />
        <Route path="report" element={<ReportIncident />} />
      </Route>
    </Routes>
  );
}
