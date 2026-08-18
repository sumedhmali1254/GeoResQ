import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Navigation, Shield, AlertTriangle, CheckCircle } from 'lucide-react';
import MapView from '../../components/Map/MapView';
import HeatmapLayer from '../../components/Map/HeatmapLayer';
import HeatmapToggle from '../../components/Map/HeatmapToggle';
import { Polyline, Marker, Circle, Popup, CircleMarker } from 'react-leaflet';
import L from 'leaflet';
import { getSafeRoutes, getIncidents, getRiskZones } from '../../services/mockApi';

export default function SafeRoute() {
  const [routes, setRoutes] = useState([]);
  const [selectedRoute, setSelectedRoute] = useState(null);
  const [showHeatmap, setShowHeatmap] = useState(false);
  const [hazardIncidents, setHazardIncidents] = useState([]);
  const [hospitals, setHospitals] = useState([]);

  useEffect(() => {
    async function load() {
      const [routeRes, incRes, mapRes] = await Promise.all([
        getSafeRoutes(),
        getIncidents(),
        getRiskZones(),
      ]);
      setRoutes(routeRes.data);
      setSelectedRoute(routeRes.data.find((r) => r.recommended) || routeRes.data[0]);
      // Only critical and high severity incidents shown as route hazards
      setHazardIncidents(
        incRes.data.incidents.filter(
          (i) => i.severity === 'critical' || i.severity === 'high'
        )
      );
      setHospitals(mapRes.data.hospitals || []);
    }
    load();
  }, []);

  const recommendedRoute = routes.find((r) => r.recommended);

  return (
    <div className="w-full space-y-6">
      <div className="flex items-center justify-between border-b pb-4" style={{ borderColor: 'var(--color-border-secondary)' }}>
        <div>
          <h1 className="text-xl font-extrabold text-[var(--color-text-primary)]">Find Safest Route</h1>
          <p className="text-xs text-[var(--color-text-muted)]">Evacuation routes compared by disaster exposure, not just distance</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Side: Map & Route List (Col span 8) */}
        <div className="lg:col-span-8 space-y-5">
          {/* Map */}
          <div className="glass-card overflow-hidden relative shadow-sm" style={{ height: '400px' }}>
            {/* Heatmap Toggle overlay on map */}
            <div className="absolute top-3 right-3 z-[1000]">
              <HeatmapToggle
                isHeatmap={showHeatmap}
                onToggle={() => setShowHeatmap(!showHeatmap)}
              />
            </div>

            <MapView zoom={12}>
              {routes.map((route) => {
                const isHighRisk = route.riskLevel === 'high' || route.riskLevel === 'critical';
                const isSelected = selectedRoute?.id === route.id;
                
                if (isHighRisk) {
                  return (
                    <span key={route.id}>
                      {/* Zebra Stripe Base (Black) */}
                      <Polyline
                        positions={route.coordinates}
                        pathOptions={{
                          color: '#0f172a',
                          weight: isSelected ? 6 : 4,
                          opacity: isSelected ? 0.95 : 0.5,
                        }}
                        eventHandlers={{ click: () => setSelectedRoute(route) }}
                      />
                      {/* Zebra Stripe Foreground (Dashed Red) */}
                      <Polyline
                        positions={route.coordinates}
                        pathOptions={{
                          color: '#ef4444',
                          weight: isSelected ? 6 : 4,
                          opacity: 1,
                          dashArray: '10 8',
                        }}
                        eventHandlers={{ click: () => setSelectedRoute(route) }}
                      />
                    </span>
                  );
                }

                return (
                  <Polyline
                    key={route.id}
                    positions={route.coordinates}
                    pathOptions={{
                      color: route.riskLevel === 'low' ? '#22c55e' : '#eab308',
                      weight: isSelected ? 5 : 3,
                      opacity: isSelected ? 0.95 : 0.4,
                      dashArray: route.recommended ? '' : '6 4',
                    }}
                    eventHandlers={{ click: () => setSelectedRoute(route) }}
                  />
                );
              })}

              {/* Live hazard zones from incident data — critical/high incidents */}
              {hazardIncidents.map((inc) => (
                <Circle
                  key={`hazard-${inc.id}`}
                  center={[inc.lat, inc.lng]}
                  radius={inc.severity === 'critical' ? 380 : 220}
                  pathOptions={{
                    color: inc.severity === 'critical' ? '#ef4444' : '#f97316',
                    fillColor: inc.severity === 'critical' ? '#ef4444' : '#f97316',
                    fillOpacity: 0.14,
                    weight: 1.5,
                    dashArray: '5 5',
                  }}
                >
                  <Popup>
                    <span className="text-xs font-bold" style={{ color: inc.severity === 'critical' ? '#dc2626' : '#ea580c' }}>
                      ⚠️ {inc.type}: {inc.location}
                    </span>
                    <p className="text-[0.65rem] mt-1 text-gray-500">{inc.description?.slice(0, 80)}…</p>
                  </Popup>
                </Circle>
              ))}

              {/* Hospital markers — safe havens during evacuation */}
              {hospitals.filter((h) => !h.exposed).slice(0, 6).map((h) => (
                <CircleMarker
                  key={`hosp-${h.id}`}
                  center={[h.lat, h.lng]}
                  radius={5}
                  pathOptions={{
                    color: '#fff',
                    fillColor: '#2563eb',
                    fillOpacity: 0.85,
                    weight: 1.5,
                  }}
                >
                  <Popup>
                    <div className="text-xs">
                      <div className="font-semibold">{h.name}</div>
                      <div>Beds: <strong>{h.beds}</strong></div>
                      <div className="text-green-600 font-bold">✅ Safe — Low Flood Risk</div>
                    </div>
                  </Popup>
                </CircleMarker>
              ))}

              {routes.length > 0 && routes[0]?.coordinates && (
                <>
                  <Marker position={routes[0].coordinates[0]} icon={L.divIcon({
                    html: '<div style="background:#3b82f6;color:white;width:22px;height:22px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:11px;font-weight:bold;box-shadow:0 2px 6px rgba(0,0,0,0.3)">A</div>',
                    className: '', iconSize: [22, 22], iconAnchor: [11, 11],
                  })} />
                  <Marker position={routes[0].coordinates[routes[0].coordinates.length - 1]} icon={L.divIcon({
                    html: '<div style="background:#22c55e;color:white;width:22px;height:22px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:11px;font-weight:bold;box-shadow:0 2px 6px rgba(0,0,0,0.3)">B</div>',
                    className: '', iconSize: [22, 22], iconAnchor: [11, 11],
                  })} />
                </>
              )}
              <HeatmapLayer visible={showHeatmap} />
            </MapView>
          </div>

          {/* Route List */}
          <div className="space-y-2">
            <span className="text-xs font-bold text-[var(--color-text-muted)] uppercase tracking-wider block">Available Corridors</span>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {routes.map((route) => (
                <button
                  key={route.id}
                  onClick={() => setSelectedRoute(route)}
                  className={`p-3.5 rounded-lg flex items-center gap-3 text-left border transition-all cursor-pointer ${
                    selectedRoute?.id === route.id
                      ? 'bg-[var(--color-bg-elevated)] border-[var(--color-accent-blue)] shadow-xs'
                      : 'bg-[var(--color-bg-card)] border-[var(--color-border-secondary)] hover:border-[var(--color-border-primary)]'
                  }`}
                >
                  <div
                    className="w-3 h-3 rounded-full flex-shrink-0"
                    style={{
                      background: route.riskLevel === 'low' ? '#22c55e' : route.riskLevel === 'moderate' ? '#eab308' : '#ef4444',
                    }}
                  />
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-semibold text-[var(--color-text-primary)] truncate">{route.name.split('—')[1]?.trim() || route.name}</div>
                    <div className="text-xs text-[var(--color-text-muted)]">{route.distance} km · {route.travelTime} mins</div>
                  </div>
                  <span className={`text-xs font-bold uppercase flex-shrink-0 ${
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
        </div>

        {/* Right Side: Evacuation Info / Recommended Details (Col span 4) */}
        <div className="lg:col-span-4 space-y-6">
          {/* Recommended Route Highlight */}
          {recommendedRoute && (
            <motion.div
              className="glass-card p-5 border-l-4 border-l-[var(--color-risk-low)] shadow-xs"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <div className="flex items-center gap-2 mb-2">
                <CheckCircle size={16} className="text-[var(--color-risk-low)]" />
                <span className="text-sm font-bold text-[var(--color-text-primary)]">Recommended Evacuation Path</span>
              </div>
              <p className="text-xs text-[var(--color-text-secondary)] mb-4 leading-relaxed">{recommendedRoute.reason}</p>
              <div className="grid grid-cols-3 gap-2.5 text-center">
                <div className="p-2.5 rounded bg-[var(--color-bg-tertiary)] border border-[var(--color-border-secondary)]">
                  <div className="text-base font-extrabold font-mono text-[var(--color-text-primary)]">{recommendedRoute.distance}</div>
                  <div className="text-[0.55rem] text-[var(--color-text-muted)] font-bold">KM</div>
                </div>
                <div className="p-2.5 rounded bg-[var(--color-bg-tertiary)] border border-[var(--color-border-secondary)]">
                  <div className="text-base font-extrabold font-mono text-[var(--color-text-primary)]">{recommendedRoute.travelTime}</div>
                  <div className="text-[0.55rem] text-[var(--color-text-muted)] font-bold">MIN</div>
                </div>
                <div className="p-2.5 rounded bg-[var(--color-bg-tertiary)] border border-[var(--color-border-secondary)]">
                  <div className="text-base font-extrabold font-mono text-[var(--color-risk-low)]">LOW</div>
                  <div className="text-[0.55rem] text-[var(--color-text-muted)] font-bold">RISK</div>
                </div>
              </div>
            </motion.div>
          )}

          {/* Selected Route Info */}
          {selectedRoute && (
            <div className="glass-card p-5 space-y-4">
              <h3 className="text-sm font-bold text-[var(--color-text-primary)] border-b pb-2" style={{ borderColor: 'var(--color-border-secondary)' }}>
                Selected Route: {selectedRoute.name.split('—')[1]?.trim() || selectedRoute.name}
              </h3>
              <p className="text-xs text-[var(--color-text-secondary)] leading-relaxed">{selectedRoute.reason}</p>

              <div className="space-y-2 pt-2">
                <span className="text-[0.65rem] font-bold text-[var(--color-text-muted)] uppercase tracking-wider block mb-1">Evacuation Route Segments</span>
                {selectedRoute.segments.map((seg, idx) => (
                  <div key={idx} className="flex justify-between items-center text-xs p-3 rounded-lg bg-[var(--color-bg-tertiary)] border border-[var(--color-border-secondary)]">
                    <span className="font-semibold text-[var(--color-text-secondary)]">{seg.name}</span>
                    <span className={`font-black px-2.5 py-0.5 rounded-full uppercase text-[0.55rem] ${
                      seg.risk === 'low' ? 'bg-green-50 text-green-700 border border-green-200' :
                      seg.risk === 'moderate' ? 'bg-yellow-50 text-yellow-700 border border-yellow-200' :
                      seg.risk === 'high' ? 'bg-orange-50 text-orange-700 border border-orange-200' :
                      'bg-red-50 text-red-700 border border-red-200'
                    }`}>
                      {seg.risk}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
