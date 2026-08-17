import { useState } from 'react';
import { motion } from 'framer-motion';
import { Navigation, Shield, AlertTriangle, CheckCircle } from 'lucide-react';
import MapView from '../../components/Map/MapView';
import { Polyline, Marker } from 'react-leaflet';
import L from 'leaflet';
import { routes } from '../../data/routes';

export default function SafeRoute() {
  const [selectedRoute, setSelectedRoute] = useState(routes.find((r) => r.recommended) || routes[0]);
  const recommendedRoute = routes.find((r) => r.recommended);

  return (
    <div className="p-4 max-w-lg mx-auto">
      <h1 className="text-lg font-bold text-[var(--color-text-primary)] mb-1">Find Safest Route</h1>
      <p className="text-xs text-[var(--color-text-muted)] mb-4">Routes evaluated by disaster exposure, not just distance</p>

      {/* Map */}
      <div className="glass-card overflow-hidden mb-4" style={{ height: '280px' }}>
        <MapView zoom={13}>
          {routes.map((route) => (
            <Polyline
              key={route.id}
              positions={route.coordinates}
              pathOptions={{
                color: route.riskLevel === 'low' ? '#22c55e' : route.riskLevel === 'moderate' ? '#eab308' : '#ef4444',
                weight: selectedRoute?.id === route.id ? 5 : 3,
                opacity: selectedRoute?.id === route.id ? 0.9 : 0.3,
              }}
              eventHandlers={{ click: () => setSelectedRoute(route) }}
            />
          ))}
          {routes.length > 0 && (
            <>
              <Marker position={routes[0].coordinates[0]} icon={L.divIcon({
                html: '<div style="background:#3b82f6;color:white;width:20px;height:20px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:10px;font-weight:bold">A</div>',
                className: '', iconSize: [20, 20], iconAnchor: [10, 10],
              })} />
              <Marker position={routes[0].coordinates[routes[0].coordinates.length - 1]} icon={L.divIcon({
                html: '<div style="background:#22c55e;color:white;width:20px;height:20px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:10px;font-weight:bold">B</div>',
                className: '', iconSize: [20, 20], iconAnchor: [10, 10],
              })} />
            </>
          )}
        </MapView>
      </div>

      {/* Recommended Route Highlight */}
      {recommendedRoute && (
        <motion.div
          className="glass-card p-4 mb-4 border-l-4 border-l-[var(--color-risk-low)]"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="flex items-center gap-2 mb-2">
            <CheckCircle size={16} className="text-[var(--color-risk-low)]" />
            <span className="text-sm font-semibold text-[var(--color-text-primary)]">Recommended Route</span>
          </div>
          <p className="text-xs text-[var(--color-text-secondary)] mb-3">{recommendedRoute.reason}</p>
          <div className="grid grid-cols-3 gap-2 text-center">
            <div className="p-2 rounded bg-[var(--color-bg-tertiary)]">
              <div className="text-base font-bold font-mono text-[var(--color-text-primary)]">{recommendedRoute.distance}</div>
              <div className="text-[0.55rem] text-[var(--color-text-muted)]">KM</div>
            </div>
            <div className="p-2 rounded bg-[var(--color-bg-tertiary)]">
              <div className="text-base font-bold font-mono text-[var(--color-text-primary)]">{recommendedRoute.travelTime}</div>
              <div className="text-[0.55rem] text-[var(--color-text-muted)]">MIN</div>
            </div>
            <div className="p-2 rounded bg-[var(--color-bg-tertiary)]">
              <div className="text-base font-bold font-mono text-[var(--color-risk-low)]">LOW</div>
              <div className="text-[0.55rem] text-[var(--color-text-muted)]">RISK</div>
            </div>
          </div>
        </motion.div>
      )}

      {/* Route List */}
      <div className="space-y-2">
        {routes.map((route) => (
          <button
            key={route.id}
            onClick={() => setSelectedRoute(route)}
            className={`w-full p-3 rounded-lg flex items-center gap-3 text-left border transition-all cursor-pointer ${
              selectedRoute?.id === route.id
                ? 'bg-[var(--color-bg-elevated)] border-[var(--color-accent-blue)]'
                : 'bg-[var(--color-bg-card)] border-[var(--color-border-secondary)] hover:border-[var(--color-border-primary)]'
            }`}
          >
            <div
              className="w-3 h-3 rounded-full flex-shrink-0"
              style={{
                background: route.riskLevel === 'low' ? '#22c55e' : route.riskLevel === 'moderate' ? '#eab308' : '#ef4444',
              }}
            />
            <div className="flex-1">
              <div className="text-sm font-medium text-[var(--color-text-primary)]">{route.name.split('—')[1]?.trim()}</div>
              <div className="text-xs text-[var(--color-text-muted)]">{route.distance} km · {route.travelTime} min</div>
            </div>
            <span className={`text-xs font-semibold uppercase ${
              route.riskLevel === 'low' ? 'text-[var(--color-risk-low)]' :
              route.riskLevel === 'moderate' ? 'text-[var(--color-risk-moderate)]' :
              'text-[var(--color-risk-high)]'
            }`}>
              {route.riskLevel}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}
