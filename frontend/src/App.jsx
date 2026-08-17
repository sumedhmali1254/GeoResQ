import { Routes, Route } from 'react-router-dom';
import AuthorityLayout from './layouts/AuthorityLayout';
import CitizenLayout from './layouts/CitizenLayout';

// Pages
import Landing from './pages/Landing';
import Dashboard from './pages/authority/Dashboard';
import LiveMap from './pages/authority/LiveMap';
import Incidents from './pages/authority/Incidents';
import ImpactAnalysis from './pages/authority/ImpactAnalysis';
import Facilities from './pages/authority/Facilities';
import RoutesPage from './pages/authority/Routes';
import Resources from './pages/authority/Resources';
import Simulator from './pages/authority/Simulator';
import Copilot from './pages/authority/Copilot';
import CitizenHome from './pages/citizen/CitizenHome';
import CitizenRisk from './pages/citizen/CitizenRisk';
import SafeRoute from './pages/citizen/SafeRoute';
import CitizenFacilities from './pages/citizen/CitizenFacilities';
import ReportIncident from './pages/citizen/ReportIncident';

export default function App() {
  return (
    <Routes>
      {/* Public */}
      <Route path="/" element={<Landing />} />

      {/* Authority Command Center */}
      <Route path="/authority" element={<AuthorityLayout />}>
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="map" element={<LiveMap />} />
        <Route path="incidents" element={<Incidents />} />
        <Route path="impact" element={<ImpactAnalysis />} />
        <Route path="facilities" element={<Facilities />} />
        <Route path="routes" element={<RoutesPage />} />
        <Route path="resources" element={<Resources />} />
        <Route path="simulator" element={<Simulator />} />
        <Route path="copilot" element={<Copilot />} />
      </Route>

      {/* Citizen Portal */}
      <Route path="/citizen" element={<CitizenLayout />}>
        <Route index element={<CitizenHome />} />
        <Route path="risk" element={<CitizenRisk />} />
        <Route path="safe-route" element={<SafeRoute />} />
        <Route path="facilities" element={<CitizenFacilities />} />
        <Route path="report" element={<ReportIncident />} />
      </Route>
    </Routes>
  );
}
