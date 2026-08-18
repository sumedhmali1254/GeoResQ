import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Navigation, Info, AlertTriangle, ChevronDown, Check } from 'lucide-react';
import RouteCard from '../../components/RouteCard';
import MapView from '../../components/Map/MapView';
import MapLayers from '../../components/Map/MapLayers';
import { Polyline, Marker, Popup, Circle } from 'react-leaflet';
import L from 'leaflet';
import { getSafeRoutes } from '../../services/mockApi';

const riskLineColors = {
  low: '#22c55e',
  moderate: '#eab308',
  high: '#f97316',
  critical: '#ef4444',
};

// Regional configuration for overall India targeting with unified map assets
const REGIONS = {
  mumbai: {
    id: 'mumbai',
    label: 'Mumbai Metro (Maharashtra)',
    center: [19.076, 72.877],
    zoom: 12,
    blockages: {
      lbsMarg: { label: 'LBS Marg (Route A)', pos: [19.078, 72.880], text: 'LBS Marg Road Blocked (Simulated Flood)' },
      weh: { label: 'Western Express (Route B)', pos: [19.075, 72.845], text: 'Western Express Highway Blocked (Waterlogging near Milan subway)' },
      jvlr: { label: 'JVLR (Route C)', pos: [19.115, 72.875], text: 'JVLR Corridor Blocked (Tree fall & debris)' },
    },
    hazards: [
      { pos: [19.078, 72.880], radius: 400, color: '#ef4444', text: '⚠️ Active Flood Hazard: LBS Marg Underpass' },
      { pos: [19.090, 72.875], radius: 250, color: '#f97316', text: '⚠️ Waterlogging Alert: Kurla Link Road' },
    ],
    incidents: [
      { id: 'm-inc-1', type: 'Severe Waterlogging', lat: 19.083, lng: 72.887, severity: 'critical', reportCount: 34, confidence: 92, desc: 'Mithi River levels overflowed onto Kurla West roads.' },
      { id: 'm-inc-2', type: 'Drain Overflow', lat: 19.070, lng: 72.860, severity: 'high', reportCount: 19, confidence: 85, desc: 'Drainage blockage causing 1ft water levels near BKC Junction.' },
    ],
    hospitals: [
      { id: 'm-h1', name: 'Kurla General Hospital', lat: 19.076, lng: 72.888, beds: 85, exposed: true },
      { id: 'm-h2', name: 'Asian Heart Institute', lat: 19.065, lng: 72.868, beds: 150, exposed: false },
    ],
    shelters: [
      { id: 'm-s1', name: 'Andheri Sports Complex (Shelter)', lat: 19.118, lng: 72.848, capacity: 600, status: 'Active', type: 'official' },
      { id: 'm-s2', name: 'Kurla Municipal School Shelter', lat: 19.072, lng: 72.881, capacity: 250, status: 'Active', type: 'official' },
    ]
  },
  chennai: {
    id: 'chennai',
    label: 'Chennai Metro (Tamil Nadu)',
    center: [12.980, 80.220],
    zoom: 13,
    blockages: {
      velacheryMain: { label: 'Velachery Main Rd', pos: [12.988, 80.225], text: 'Velachery Main Rd Blocked (Lake overflow)' },
      omrCorridor: { label: 'OMR IT Expressway', pos: [12.978, 80.245], text: 'OMR IT Expressway Blocked (Waterlogging near Taramani)' },
      gstRoad: { label: 'Grand Southern Trunk Rd', pos: [12.960, 80.200], text: 'GST Road Blocked (Flyover water logging)' },
    },
    hazards: [
      { pos: [12.988, 80.225], radius: 350, color: '#ef4444', text: '⚠️ Severe Flooding: Velachery Lake Margins' },
      { pos: [12.982, 80.240], radius: 200, color: '#f97316', text: '⚠️ Water Accumulation: Adyar River Buffer' },
    ],
    incidents: [
      { id: 'c-inc-1', type: 'Inundated Subways', lat: 12.990, lng: 80.218, severity: 'critical', reportCount: 42, confidence: 95, desc: 'Subway water levels reached 3ft. Closed for traffic.' },
      { id: 'c-inc-2', type: 'Canal Overflow', lat: 12.972, lng: 80.235, severity: 'high', reportCount: 22, confidence: 88, desc: 'Buckingham canal overflow causing street gridlocks.' },
    ],
    hospitals: [
      { id: 'c-h1', name: 'Fortis Malar Adyar', lat: 13.003, lng: 80.252, beds: 120, exposed: false },
      { id: 'c-h2', name: 'Velachery Care Clinic', lat: 12.985, lng: 80.223, beds: 40, exposed: true },
    ],
    shelters: [
      { id: 'c-s1', name: 'IIT Madras Shelter Complex', lat: 12.992, lng: 80.235, capacity: 500, status: 'Active', type: 'official' },
      { id: 'c-s2', name: 'Taramani Community Center', lat: 12.975, lng: 80.245, capacity: 300, status: 'Active', type: 'official' },
    ]
  },
  guwahati: {
    id: 'guwahati',
    label: 'Guwahati City (Assam)',
    center: [26.175, 91.775],
    zoom: 13,
    blockages: {
      zooRoad: { label: 'R.G. Baruah (Zoo Road)', pos: [26.180, 91.782], text: 'Zoo Road Blocked (Severe street inundation)' },
      gsRoad: { label: 'G.S. Highway Corridor', pos: [26.165, 91.762], text: 'G.S. Highway Blocked (Landslide debris)' },
      anilNagar: { label: 'Anil Nagar Evac Road', pos: [26.170, 91.770], text: 'Anil Nagar Evac Road Blocked (Siltation & flooding)' },
    },
    hazards: [
      { pos: [26.180, 91.782], radius: 300, color: '#ef4444', text: '⚠️ Critical Flash Flood: Zoo Road Channel' },
      { pos: [26.170, 91.770], radius: 250, color: '#f97316', text: '⚠️ Active Inundation: Anil Nagar Drainage Basin' },
    ],
    incidents: [
      { id: 'g-inc-1', type: 'Flash Floods', lat: 26.175, lng: 91.778, severity: 'critical', reportCount: 50, confidence: 97, desc: 'Bharalu river overflow flooding low-lying Anil Nagar residential lanes.' },
      { id: 'g-inc-2', type: 'Urban Landslide', lat: 26.160, lng: 91.760, severity: 'high', reportCount: 15, confidence: 80, desc: 'Minor mudslide blocking one lane of G.S. Road highway.' },
    ],
    hospitals: [
      { id: 'g-h1', name: 'Guwahati Medical College', lat: 26.155, lng: 91.770, beds: 300, exposed: false },
      { id: 'g-h2', name: 'Zoo Road Clinic', lat: 26.182, lng: 91.785, beds: 50, exposed: true },
    ],
    shelters: [
      { id: 'g-s1', name: 'Guwahati High School Relief', lat: 26.188, lng: 91.785, capacity: 400, status: 'Active', type: 'official' },
      { id: 'g-s2', name: 'Ulubari Relief Camp', lat: 26.168, lng: 91.765, capacity: 200, status: 'Active', type: 'official' },
    ]
  }
};

export default function Routes() {
  const [selectedRegion, setSelectedRegion] = useState('mumbai');
  const [routes, setRoutes] = useState([]);
  const [selectedRoute, setSelectedRoute] = useState(null);
  const [blockages, setBlockages] = useState({});
  const [showRegionMenu, setShowRegionMenu] = useState(false);
  const [activeLayers, setActiveLayers] = useState(['alerts', 'hospitals', 'shelters']);
  const dropdownRef = useRef(null);

  useEffect(() => {
    async function load() {
      const res = await getSafeRoutes(selectedRegion);
      const routesWithBase = res.data.slice(0, 3).map(r => ({
        ...r,
        baseRiskScore: r.riskScore,
        baseRoadBlockages: r.roadBlockages
      }));
      setRoutes(routesWithBase);
      setSelectedRoute(routesWithBase.find((r) => r.recommended) || routesWithBase[0]);

      const initial = {};
      Object.keys(REGIONS[selectedRegion].blockages).forEach(k => {
        initial[k] = false;
      });
      setBlockages(initial);
    }
    load();
  }, [selectedRegion]);

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowRegionMenu(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleToggleBlockage = (key) => {
    const nextBlockages = { ...blockages, [key]: !blockages[key] };
    setBlockages(nextBlockages);

    const updated = routes.map(route => {
      let score = route.baseRiskScore;
      let blockedCount = route.baseRoadBlockages;

      if (selectedRegion === 'mumbai') {
        if (route.id === 'route-a' && nextBlockages.lbsMarg) { score = 98; blockedCount = 3; }
        if (route.id === 'route-b' && nextBlockages.weh) { score = 95; blockedCount = 2; }
        if (route.id === 'route-c' && nextBlockages.jvlr) { score = 88; blockedCount = 2; }
      } else if (selectedRegion === 'chennai') {
        if (route.id === 'chennai-route-a' && nextBlockages.velacheryMain) { score = 97; blockedCount = 2; }
        if (route.id === 'chennai-route-b' && nextBlockages.omrCorridor) { score = 92; blockedCount = 1; }
        if (route.id === 'chennai-route-a' && nextBlockages.gstRoad) { score = 85; blockedCount = 2; }
      } else if (selectedRegion === 'guwahati') {
        if (route.id === 'guwahati-route-a' && nextBlockages.zooRoad) { score = 99; blockedCount = 2; }
        if (route.id === 'guwahati-route-b' && nextBlockages.gsRoad) { score = 94; blockedCount = 2; }
        if (route.id === 'guwahati-route-a' && nextBlockages.anilNagar) { score = 90; blockedCount = 2; }
      }

      let riskLevel = 'low';
      if (score > 80) riskLevel = 'critical';
      else if (score > 60) riskLevel = 'high';
      else if (score > 35) riskLevel = 'moderate';

      return {
        ...route,
        riskScore: score,
        roadBlockages: blockedCount,
        riskLevel,
        recommended: false,
      };
    });

    let safest = null;
    updated.forEach(r => {
      if (!safest || r.riskScore < safest.riskScore) {
        safest = r;
      }
    });

    if (safest) {
      safest.recommended = true;
      setSelectedRoute(safest);
    }

    setRoutes(updated);
  };

  return (
    <div className="page-container">
      {/* Header Selector bar */}
      <div className="pb-4 border-b border-[var(--color-border-secondary)] mb-6">
        <h1 className="page-title !mb-1">Evacuation Route Dispatch Center</h1>
        <p className="page-subtitle font-medium !mb-0">Review and manage dynamic relief corridors across national hotspots</p>
      </div>

      {/* Authority Control Center: Blockages Simulator Panel */}
      <div className="glass-card p-5 mb-6 border border-red-150 shadow-sm relative overflow-hidden">
        <div className="absolute top-0 left-0 right-0 h-1 bg-red-500" />
        <h2 className="text-sm font-bold text-[var(--color-text-primary)] uppercase tracking-wider mb-2 flex items-center gap-2">
          <AlertTriangle size={16} className="text-red-500 animate-pulse" />
          <span>Official Command: Simulate Road Obstructions & Blockages</span>
        </h2>
        <p className="text-xs text-[var(--color-text-secondary)] mb-4 leading-relaxed">
          Toggle flood-induced blockages on major arteries. The SIH routing engine dynamically re-calculates exposure levels, updating active directions for the selected region.
        </p>
        <div className="flex flex-wrap gap-3">
          {Object.entries(REGIONS[selectedRegion].blockages).map(([key, info]) => (
            <button
              key={key}
              onClick={() => handleToggleBlockage(key)}
              className={`px-4 py-2.5 rounded-lg text-xs font-bold transition-all cursor-pointer border ${blockages[key]
                  ? 'bg-red-600 text-white border-red-700 shadow-sm'
                  : 'bg-[var(--color-bg-card)] text-[var(--color-text-secondary)] border-[var(--color-border-secondary)] hover:border-red-500'
                }`}
            >
              {blockages[key] ? `🚨 Clear ${info.label}` : `🚧 Block ${info.label}`}
            </button>
          ))}
        </div>
      </div>

      <div className="grid lg:grid-cols-12 gap-6">
        {/* Left Side: Map visualization (Col span 7) */}
        <div className="lg:col-span-7 glass-card overflow-hidden shadow-sm relative" style={{ height: '540px' }}>
          <div className="px-4 py-3 border-b border-[var(--color-border-secondary)] flex items-center justify-between">
            <span className="text-xs font-bold text-[var(--color-text-primary)] uppercase tracking-wider">
              Live Command Route Map · {REGIONS[selectedRegion].label}
            </span>
            <div className="flex gap-2.5">
              <span className="inline-flex items-center gap-1 text-[0.65rem] font-bold text-[var(--color-text-muted)]">
                <span className="w-2.5 h-2.5 rounded-full bg-green-500" /> Safe Corridor
              </span>
              <span className="inline-flex items-center gap-1 text-[0.65rem] font-bold text-[var(--color-text-muted)]">
                <span className="w-2.5 h-2.5 rounded-full bg-red-500" /> Blocked Corridor
              </span>
            </div>
          </div>
          <div style={{ height: 'calc(100% - 44px)' }} className="relative">
            <MapView
              center={REGIONS[selectedRegion].center}
              zoom={REGIONS[selectedRegion].zoom}
            >
              {/* Dynamic Map Layers Toggle Control overlay on the map */}
              <div className="absolute top-3 right-3 z-[1000] bg-white/95 backdrop-blur-md p-3 rounded-xl border shadow-sm max-w-[160px] text-left" style={{ borderColor: 'var(--color-border-secondary)' }}>
                <div className="text-[0.6rem] font-black uppercase text-[var(--color-text-muted)] tracking-wider mb-2">Map Layers</div>
                <div className="space-y-2">
                  {[
                    { id: 'alerts', label: 'Incidents', color: '#ef4444' },
                    { id: 'hospitals', label: 'Hospitals', color: '#2563eb' },
                    { id: 'shelters', label: 'Shelters', color: '#10b981' },
                  ].map((layer) => {
                    const isActive = activeLayers.includes(layer.id);
                    return (
                      <label key={layer.id} className="flex items-center gap-2 text-xs font-semibold text-[var(--color-text-secondary)] cursor-pointer select-none">
                        <input
                          type="checkbox"
                          checked={isActive}
                          onChange={() => {
                            if (isActive) {
                              setActiveLayers(activeLayers.filter(l => l !== layer.id));
                            } else {
                              setActiveLayers([...activeLayers, layer.id]);
                            }
                          }}
                          className="rounded border-slate-300 text-blue-600 focus:ring-blue-500 cursor-pointer"
                        />
                        <span className="flex items-center gap-1.5 text-[0.7rem]">
                          <span className="w-2 h-2 rounded-full" style={{ background: layer.color }} />
                          {layer.label}
                        </span>
                      </label>
                    );
                  })}
                </div>
              </div>

              {/* Dynamic Evacuation Route Lines */}
              {routes.map((route) => {
                const isCritical = route.riskLevel === 'critical';
                const isSelected = selectedRoute?.id === route.id;

                if (isCritical) {
                  return (
                    <span key={route.id}>
                      {/* Zebra Stripe Base (Black) */}
                      <Polyline
                        positions={route.coordinates}
                        pathOptions={{
                          color: '#0f172a',
                          weight: isSelected ? 6 : 4,
                          opacity: isSelected ? 0.95 : 0.6,
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
                      color: riskLineColors[route.riskLevel],
                      weight: isSelected ? 5 : 3,
                      opacity: isSelected ? 0.95 : 0.4,
                      dashArray: route.recommended ? '' : '6 4',
                    }}
                    eventHandlers={{ click: () => setSelectedRoute(route) }}
                  />
                );
              })}

              {/* Dynamic Flood Hazard Danger Circles */}
              {REGIONS[selectedRegion].hazards.map((hazard, index) => (
                <Circle
                  key={`hazard-${index}`}
                  center={hazard.pos}
                  radius={hazard.radius}
                  pathOptions={{ color: hazard.color, fillColor: hazard.color, fillOpacity: 0.12, weight: 1.5, dashArray: '5 5' }}
                >
                  <Popup><span className="text-xs font-bold" style={{ color: hazard.color }}>{hazard.text}</span></Popup>
                </Circle>
              ))}

              {/* Dynamic Flood Incidents, Hospitals and Shelters layers from unified MapLayers component */}
              <MapLayers
                hospitals={REGIONS[selectedRegion].hospitals}
                shelters={REGIONS[selectedRegion].shelters}
                incidents={REGIONS[selectedRegion].incidents}
                activeLayers={activeLayers}
              />

              {/* Simulated active Blockage Indicators */}
              {Object.entries(blockages).map(([key, active]) => {
                if (!active) return null;
                const blockageInfo = REGIONS[selectedRegion].blockages[key];
                if (!blockageInfo) return null;
                return (
                  <Marker key={key} position={blockageInfo.pos} icon={L.divIcon({
                    html: '<div style="background:#dc2626;color:white;width:34px;height:34px;border-radius:50%;display:flex;align-items:center;justify-content:center;border:2.5px solid white;box-shadow:0 3px 10px rgba(0,0,0,0.4)"><svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" style="display:block;"><path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg></div>',
                    className: 'custom-blockage-pin', iconSize: [34, 34], iconAnchor: [17, 17]
                  })}>
                    <Popup><span className="text-xs font-bold text-red-600">{blockageInfo.text}</span></Popup>
                  </Marker>
                );
              })}

              {/* Start/End markers */}
              {routes.length > 0 && routes[0]?.coordinates && (
                <>
                  <Marker position={routes[0].coordinates[0]} icon={L.divIcon({
                    html: '<div style="background:#3b82f6;color:white;width:24px;height:24px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:12px;font-weight:bold;box-shadow:0 2px 8px rgba(0,0,0,0.4)">A</div>',
                    className: '', iconSize: [24, 24], iconAnchor: [12, 12],
                  })}>
                    <Popup><span className="text-xs font-semibold">Start: Evac Origin Area</span></Popup>
                  </Marker>
                  <Marker position={routes[0].coordinates[routes[0].coordinates.length - 1]} icon={L.divIcon({
                    html: '<div style="background:#22c55e;color:white;width:24px;height:24px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:12px;font-weight:bold;box-shadow:0 2px 8px rgba(0,0,0,0.4)">B</div>',
                    className: '', iconSize: [24, 24], iconAnchor: [12, 12],
                  })}>
                    <Popup><span className="text-xs font-semibold">Destination: Target Shelter Complex</span></Popup>
                  </Marker>
                </>
              )}
            </MapView>
          </div>
        </div>

        {/* Right Side: Command Region Box + Route Cards scrollable container (Col span 5) */}
        <div className="lg:col-span-5 flex flex-col gap-3" style={{ height: '540px' }}>
          
          {/* Top Box: Active Command Region Box */}
          <div className="glass-card p-3.5 border border-[var(--color-border-primary)] shadow-sm rounded-xl shrink-0" ref={dropdownRef}>
            <div className="flex items-center justify-between gap-3">
              <div>
                <div className="text-[0.58rem] font-black uppercase tracking-wider text-[var(--color-text-muted)] mb-0.5">
                  Active Command Region
                </div>
                <div className="text-xs font-bold text-[var(--color-text-primary)]">
                  {REGIONS[selectedRegion].label}
                </div>
              </div>

              <div className="relative">
                <button
                  type="button"
                  onClick={() => setShowRegionMenu(!showRegionMenu)}
                  className="flex items-center justify-between gap-2 bg-blue-50/80 hover:bg-blue-100/80 border border-blue-200 text-blue-700 font-bold text-xs px-3 py-1.5 rounded-lg outline-none cursor-pointer shadow-xs transition-colors"
                >
                  <Navigation size={13} className="text-blue-600 shrink-0" />
                  <span>Switch Region</span>
                  <ChevronDown size={13} className={`text-blue-500 shrink-0 transition-transform duration-200 ${showRegionMenu ? 'rotate-180' : ''}`} />
                </button>

                <AnimatePresence>
                  {showRegionMenu && (
                    <motion.div
                      initial={{ opacity: 0, y: 4, scale: 0.98 }}
                      animate={{ opacity: 1, y: 4, scale: 1 }}
                      exit={{ opacity: 0, y: 4, scale: 0.98 }}
                      transition={{ duration: 0.15 }}
                      className="absolute right-0 mt-1.5 w-64 bg-white border border-slate-200 rounded-xl shadow-2xl z-[1100] overflow-hidden py-1"
                      style={{ boxShadow: '0 12px 36px -4px rgba(15, 23, 42, 0.18)' }}
                    >
                      {Object.entries(REGIONS).map(([key, val]) => (
                        <button
                          key={key}
                          type="button"
                          onClick={() => {
                            setSelectedRegion(key);
                            setShowRegionMenu(false);
                          }}
                          className={`w-full text-left px-3.5 py-2.5 text-xs font-semibold hover:bg-slate-50 transition-colors border-none cursor-pointer flex items-center justify-between ${
                            selectedRegion === key ? 'text-blue-700 bg-blue-50/80 font-bold' : 'text-slate-700 bg-transparent'
                          }`}
                        >
                          <span>{val.label}</span>
                          {selectedRegion === key && <Check size={14} className="text-blue-600 shrink-0" />}
                        </button>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </div>

          {/* Dedicated Scrollable Card Box for Route Cards */}
          <div className="glass-card p-3 border border-[var(--color-border-primary)] shadow-sm rounded-xl flex-1 min-h-0 overflow-y-auto space-y-4 pr-1.5">
            <div className="text-[0.6rem] font-black uppercase text-[var(--color-text-muted)] tracking-wider px-1 pb-1 border-b border-[var(--color-border-secondary)]">
              Evaluated Corridors ({routes.length})
            </div>
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
    </div>
  );
}
