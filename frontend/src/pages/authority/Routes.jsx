import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Navigation, Info } from 'lucide-react';
import RouteCard from '../../components/RouteCard';
import MapView from '../../components/Map/MapView';
import { Polyline, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import { getSafeRoutes } from '../../services/mockApi';

const riskLineColors = {
  low: '#22c55e',
  moderate: '#eab308',
  high: '#f97316',
  critical: '#ef4444',
};

export default function Routes() {
  const [routes, setRoutes] = useState([]);
  const [selectedRoute, setSelectedRoute] = useState(null);

  useEffect(() => {
    async function load() {
      const res = await getSafeRoutes();
      setRoutes(res.data);
      setSelectedRoute(res.data.find((r) => r.recommended) || res.data[0]);
    }
    load();
  }, []);

  return (
    <div className="page-container">
      <h1 className="page-title">Risk-Aware Safe Routing</h1>
      <p className="page-subtitle">Evacuation routes compared by disaster exposure, not just distance</p>

      {/* Info Banner */}
      <motion.div
        className="glass-card p-4 mb-6 flex items-start gap-3"
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <Info size={18} className="text-[var(--color-accent-blue)] mt-0.5 flex-shrink-0" />
        <div>
          <p className="text-sm text-[var(--color-text-primary)] font-medium mb-1">
            Routes are evaluated using disaster intelligence, not just navigation data.
          </p>
          <p className="text-xs text-[var(--color-text-secondary)]">
            Each route is assessed for flood risk, road blockage, elevation profile, and accessibility.
            A longer route may be recommended if it has significantly lower disaster exposure.
          </p>
        </div>
      </motion.div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Map */}
        <div className="glass-card overflow-hidden" style={{ height: '500px' }}>
          <div className="px-4 py-3 border-b border-[var(--color-border-secondary)]">
            <span className="text-xs font-semibold text-[var(--color-text-secondary)] uppercase tracking-wider">
              Route Visualization
            </span>
          </div>
          <div style={{ height: 'calc(100% - 44px)' }}>
            <MapView zoom={13}>
              {routes.map((route) => (
                <Polyline
                  key={route.id}
                  positions={route.coordinates}
                  pathOptions={{
                    color: riskLineColors[route.riskLevel],
                    weight: selectedRoute?.id === route.id ? 5 : 3,
                    opacity: selectedRoute?.id === route.id ? 0.9 : 0.4,
                    dashArray: route.recommended ? '' : '8 6',
                  }}
                  eventHandlers={{
                    click: () => setSelectedRoute(route),
                  }}
                />
              ))}
              {/* Start/End markers */}
              {routes.length > 0 && (
                <>
                  <Marker position={routes[0].coordinates[0]} icon={L.divIcon({
                    html: '<div style="background:#3b82f6;color:white;width:24px;height:24px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:12px;font-weight:bold;box-shadow:0 2px 8px rgba(0,0,0,0.4)">A</div>',
                    className: '', iconSize: [24, 24], iconAnchor: [12, 12],
                  })}>
                    <Popup><span className="text-xs">Start: {routes[0].from}</span></Popup>
                  </Marker>
                  <Marker position={routes[0].coordinates[routes[0].coordinates.length - 1]} icon={L.divIcon({
                    html: '<div style="background:#22c55e;color:white;width:24px;height:24px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:12px;font-weight:bold;box-shadow:0 2px 8px rgba(0,0,0,0.4)">B</div>',
                    className: '', iconSize: [24, 24], iconAnchor: [12, 12],
                  })}>
                    <Popup><span className="text-xs">Destination: {routes[0].to}</span></Popup>
                  </Marker>
                </>
              )}
            </MapView>
          </div>
        </div>

        {/* Route Cards */}
        <div className="space-y-4">
          {routes.map((route, i) => (
            <RouteCard
              key={route.id}
              route={route}
              index={i}
              onSelect={setSelectedRoute}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
