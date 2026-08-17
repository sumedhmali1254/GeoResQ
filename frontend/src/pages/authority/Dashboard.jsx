import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, AlertTriangle, Clock } from 'lucide-react';
import KPICard from '../../components/KPICard';
import RiskBadge from '../../components/RiskBadge';
import MapView from '../../components/Map/MapView';
import MapLayers from '../../components/Map/MapLayers';
import { getKPIData, getRiskZones, getIncidents } from '../../services/mockApi';

export default function Dashboard() {
  const [kpis, setKpis] = useState([]);
  const [mapData, setMapData] = useState({ zones: [], hospitals: [], shelters: [] });
  const [recentIncidents, setRecentIncidents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      const [kpiRes, mapRes, incRes] = await Promise.all([
        getKPIData(),
        getRiskZones(),
        getIncidents(),
      ]);
      setKpis(kpiRes.data);
      setMapData(mapRes.data);
      setRecentIncidents(incRes.data.incidents.slice(0, 5));
      setLoading(false);
    }
    loadData();
  }, []);

  const activeLayers = ['floodRisk', 'hospitals', 'shelters', 'alerts'];

  return (
    <div className="page-container">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="page-title">Command Center</h1>
          <p className="text-sm font-semibold text-[var(--color-text-secondary)]">
            Mumbai Urban Flood Monitoring — Real-time decision support overview
          </p>
        </div>
        <div className="hidden md:flex items-center gap-2 text-xs font-bold text-[var(--color-text-secondary)] bg-white px-3 py-1.5 rounded-lg border border-[var(--color-border-secondary)] shadow-xs">
          <Clock size={14} className="text-[var(--color-accent-blue)]" />
          <span>Last updated: {new Date().toLocaleTimeString('en-IN')}</span>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid-kpi mb-6">
        {kpis.map((kpi, i) => (
          <KPICard key={kpi.id} {...kpi} index={i} />
        ))}
      </div>

      {/* Main Content Grid */}
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Map Section — 2 cols */}
        <div className="lg:col-span-2">
          <div className="glass-card overflow-hidden border shadow-sm" style={{ height: '480px' }}>
            <div className="flex items-center justify-between px-4 py-3 border-b border-[var(--color-border-secondary)] bg-white">
              <div className="flex items-center gap-2">
                <div className="w-2.5 h-2.5 rounded-full bg-[var(--color-status-live)] animate-pulse" />
                <span className="text-xs font-bold text-[var(--color-text-primary)] uppercase tracking-wider">
                  Live Situation Map
                </span>
              </div>
              <Link to="/authority/map" className="text-xs font-bold text-[var(--color-accent-blue)] hover:underline flex items-center gap-1">
                Full Screen Map <ArrowRight size={14} />
              </Link>
            </div>
            <div style={{ height: 'calc(100% - 44px)' }}>
              <MapView>
                <MapLayers
                  zones={mapData.zones}
                  hospitals={mapData.hospitals}
                  shelters={mapData.shelters}
                  incidents={recentIncidents}
                  activeLayers={activeLayers}
                />
              </MapView>
            </div>
          </div>
        </div>

        {/* Recent Incidents — 1 col */}
        <div className="glass-card p-4 overflow-hidden flex flex-col border shadow-sm" style={{ maxHeight: '480px' }}>
          <div className="flex items-center justify-between mb-4 pb-2 border-b border-[var(--color-border-secondary)]">
            <div className="flex items-center gap-2">
              <AlertTriangle size={16} className="text-[var(--color-risk-high)]" />
              <span className="text-xs font-bold text-[var(--color-text-primary)] uppercase tracking-wider">
                Recent Incidents
              </span>
            </div>
            <Link to="/authority/incidents" className="text-xs font-bold text-[var(--color-accent-blue)] hover:underline flex items-center gap-1">
              View All <ArrowRight size={14} />
            </Link>
          </div>

          <div className="flex-1 overflow-y-auto space-y-2 pr-1">
            {recentIncidents.map((inc, i) => (
              <motion.div
                key={inc.id}
                className="p-3.5 rounded-xl hover:bg-[var(--color-bg-hover)] transition-colors cursor-pointer border-l-4 border"
                style={{
                  background: 'var(--color-bg-tertiary)',
                  borderLeftColor: inc.severity === 'critical' ? 'var(--color-risk-critical)' : inc.severity === 'high' ? 'var(--color-risk-high)' : 'var(--color-risk-moderate)',
                  borderColor: 'var(--color-border-secondary)',
                }}
                initial={{ opacity: 0, x: 12 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.08 }}
              >
                <div className="flex items-start justify-between mb-1">
                  <span className="text-xs font-bold text-[var(--color-text-primary)]">{inc.type}</span>
                  <RiskBadge level={inc.severity} size="sm" />
                </div>
                <div className="text-xs font-medium text-[var(--color-text-secondary)] mb-1">{inc.location}</div>
                <div className="flex items-center justify-between text-[0.65rem] font-bold text-[var(--color-text-muted)]">
                  <span>{inc.reportCount} reports · {inc.confidence}% conf</span>
                  <span className="font-mono text-[var(--color-accent-blue)]">{inc.id}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-6">
        {[
          { to: '/authority/simulator', label: 'Run Simulator', color: '#7e22ce' },
          { to: '/authority/facilities', label: 'Check Facilities', color: '#15803d' },
          { to: '/authority/routes', label: 'Find Safe Routes', color: '#0284c7' },
          { to: '/authority/copilot', label: 'Ask AI Copilot', color: '#4338ca' },
        ].map((action) => (
          <Link
            key={action.to}
            to={action.to}
            className="glass-card-subtle p-3.5 text-center no-underline border border-[var(--color-border-secondary)] hover:border-[var(--color-border-accent)] transition-all duration-200 group shadow-xs"
          >
            <span className="text-sm font-bold text-[var(--color-text-primary)] group-hover:text-[var(--color-accent-blue)] transition-colors">
              {action.label}
            </span>
            <ArrowRight size={14} className="inline ml-2 text-[var(--color-accent-blue)] group-hover:translate-x-1 transition-transform" />
          </Link>
        ))}
      </div>
    </div>
  );
}
