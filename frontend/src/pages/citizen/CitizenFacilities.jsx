import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Building2, Navigation, MapPin, ShieldCheck } from 'lucide-react';
import { getNearbyFacilities } from '../../services/mockApi';
import MapView from '../../components/Map/MapView';
import { CircleMarker, Popup } from 'react-leaflet';

const facilityColor = (type, status) => {
  if (status === 'active') return '#10b981';
  if (type === 'official_shelter') return '#3b82f6';
  return '#f59e0b';
};

export default function CitizenFacilities() {
  const [facilities, setFacilities] = useState([]);
  const [selectedFac, setSelectedFac] = useState(null);
  const [mapCenter, setMapCenter] = useState([19.076, 72.877]);

  useEffect(() => {
    async function load() {
      const res = await getNearbyFacilities();
      const sorted = res.data
        .filter((f) => f.suitabilityScore >= 70)
        .sort((a, b) => a.distanceKm - b.distanceKm);
      setFacilities(sorted);
      if (sorted.length > 0) {
        setMapCenter([sorted[0].lat, sorted[0].lng]);
      }
    }
    load();
  }, []);

  const handleSelectFac = (fac) => {
    setSelectedFac(fac);
    setMapCenter([fac.lat, fac.lng]);
  };

  return (
    <div className="w-full space-y-6">
      <div className="flex items-center justify-between border-b pb-4" style={{ borderColor: 'var(--color-border-secondary)' }}>
        <div>
          <h1 className="text-xl font-extrabold text-[var(--color-text-primary)]">Nearby Safe Facilities</h1>
          <p className="text-xs text-[var(--color-text-muted)]">Emergency shelters and facilities near you — tap a card to locate on map</p>
        </div>
        <div className="hidden sm:flex items-center gap-4 text-[0.65rem] font-bold text-[var(--color-text-muted)]">
          <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded-full bg-emerald-500 inline-block" /> Active</span>
          <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded-full bg-blue-500 inline-block" /> Official</span>
          <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded-full bg-amber-400 inline-block" /> Potential</span>
        </div>
      </div>

      {/* Mini Map */}
      <div className="glass-card overflow-hidden shadow-sm relative" style={{ height: '340px' }}>
        <div className="absolute top-3 left-3 z-[1000] glass-card px-2.5 py-1.5 text-[0.65rem] font-bold text-[var(--color-text-primary)] flex items-center gap-1.5">
          <MapPin size={11} className="text-[var(--color-accent-blue)]" />
          {facilities.length} facilities on map · Click a card below to zoom
        </div>
        <MapView center={mapCenter} zoom={selectedFac ? 14 : 12}>
          {facilities.map((fac) => (
            <CircleMarker
              key={fac.id}
              center={[fac.lat, fac.lng]}
              radius={selectedFac?.id === fac.id ? 9 : 6}
              pathOptions={{
                color: '#ffffff',
                fillColor: facilityColor(fac.type, fac.status),
                fillOpacity: selectedFac?.id === fac.id ? 1 : 0.85,
                weight: selectedFac?.id === fac.id ? 2.5 : 1.5,
              }}
              eventHandlers={{ click: () => handleSelectFac(fac) }}
            >
              <Popup>
                <div className="text-xs min-w-[180px] space-y-1">
                  <div className="font-semibold text-sm border-b pb-1 mb-1">{fac.name}</div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Capacity</span>
                    <strong>{fac.capacityValue?.toLocaleString()}</strong>
                  </div>
                  {fac.occupancy !== undefined && fac.occupancy > 0 && (
                    <div className="flex justify-between">
                      <span className="text-gray-500">Current Occupancy</span>
                      <strong>{fac.occupancy}</strong>
                    </div>
                  )}
                  <div className="flex justify-between">
                    <span className="text-gray-500">Distance</span>
                    <strong>{fac.distanceKm} km</strong>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Suitability</span>
                    <strong>{fac.suitabilityScore}/100</strong>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Flood Risk</span>
                    <strong className={
                      fac.floodExposure === 'low' ? 'text-green-600' :
                      fac.floodExposure === 'moderate' ? 'text-yellow-600' :
                      'text-red-600'
                    }>{fac.floodExposure?.toUpperCase()}</strong>
                  </div>
                  {fac.status === 'active' && (
                    <div className="text-green-600 font-bold text-[0.65rem]">✅ Currently Active</div>
                  )}
                  {fac.contact && (
                    <a href={`tel:${fac.contact}`} className="block text-blue-600 font-semibold text-[0.65rem]">📞 {fac.contact}</a>
                  )}
                </div>
              </Popup>
            </CircleMarker>
          ))}
        </MapView>
      </div>

      {/* Facility Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {facilities.map((fac, i) => (
          <motion.div
            key={fac.id}
            className={`glass-card p-5 flex flex-col justify-between shadow-xs border cursor-pointer transition-all duration-200 ${
              selectedFac?.id === fac.id
                ? 'border-[var(--color-accent-blue)] shadow-md'
                : 'border-[var(--color-border-secondary)] hover:border-[var(--color-border-primary)]'
            }`}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.06 }}
            onClick={() => handleSelectFac(fac)}
          >
            <div>
              <div className="flex items-start justify-between mb-3">
                <div>
                  <h3 className="text-sm font-bold text-[var(--color-text-primary)] tracking-tight mb-1">{fac.name}</h3>
                  <span
                    className="text-[0.6rem] uppercase tracking-wider font-extrabold px-2 py-0.5 rounded-full"
                    style={{
                      background: fac.type === 'official_shelter' ? 'var(--color-risk-low-bg)' : 'var(--color-risk-moderate-bg)',
                      color: fac.type === 'official_shelter' ? 'var(--color-risk-low)' : 'var(--color-risk-moderate)',
                    }}
                  >
                    {fac.type === 'official_shelter' ? '✅ Official Shelter' : '🔶 Emergency Facility'}
                  </span>
                </div>
                <div className="text-right">
                  <div className="text-lg font-black font-mono text-[var(--color-text-primary)]">{fac.distanceKm}</div>
                  <div className="text-[0.55rem] text-[var(--color-text-muted)] font-bold uppercase tracking-wider">km away</div>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-2 mb-3 text-center text-xs">
                <div className="p-2.5 rounded bg-[var(--color-bg-tertiary)] border border-[var(--color-border-secondary)]">
                  <div className="font-extrabold text-[var(--color-text-primary)]">{fac.suitabilityScore}</div>
                  <div className="text-[0.55rem] text-[var(--color-text-muted)] font-bold uppercase tracking-wider">Score</div>
                </div>
                <div className="p-2.5 rounded bg-[var(--color-bg-tertiary)] border border-[var(--color-border-secondary)]">
                  <div className="font-extrabold text-[var(--color-text-primary)]">{fac.capacityValue?.toLocaleString()}</div>
                  <div className="text-[0.55rem] text-[var(--color-text-muted)] font-bold uppercase tracking-wider">Capacity</div>
                </div>
                <div className="p-2.5 rounded bg-[var(--color-bg-tertiary)] border border-[var(--color-border-secondary)]">
                  <div className="font-extrabold uppercase" style={{
                    color: fac.floodExposure === 'low' ? 'var(--color-risk-low)' : fac.floodExposure === 'moderate' ? 'var(--color-risk-moderate)' : 'var(--color-risk-high)'
                  }}>{fac.floodExposure}</div>
                  <div className="text-[0.55rem] text-[var(--color-text-muted)] font-bold uppercase tracking-wider">Risk</div>
                </div>
              </div>

              {/* Status badge */}
              {fac.status === 'active' && (
                <div className="flex items-center gap-1.5 mb-3">
                  <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  <span className="text-[0.65rem] font-bold text-emerald-600">
                    Active · {fac.occupancy} / {fac.capacityValue} occupied
                  </span>
                </div>
              )}

              {/* Top features */}
              {fac.features && fac.features.length > 0 && (
                <div className="flex flex-wrap gap-1 mb-3">
                  {fac.features.slice(0, 3).map((f) => (
                    <span key={f} className="text-[0.55rem] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded bg-[var(--color-bg-tertiary)] border border-[var(--color-border-secondary)] text-[var(--color-text-muted)]">
                      {f}
                    </span>
                  ))}
                  {fac.features.length > 3 && (
                    <span className="text-[0.55rem] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded bg-[var(--color-bg-tertiary)] border border-[var(--color-border-secondary)] text-[var(--color-text-muted)]">
                      +{fac.features.length - 3} more
                    </span>
                  )}
                </div>
              )}
            </div>

            <div className="flex gap-2 mt-2">
              <button
                className="btn-primary btn-sm flex-1 flex items-center justify-center gap-1.5 font-bold"
                onClick={(e) => { e.stopPropagation(); handleSelectFac(fac); }}
              >
                <MapPin size={13} />
                <span>Locate on Map</span>
              </button>
              <button className="btn-sm flex items-center justify-center gap-1.5 font-bold border border-[var(--color-border-secondary)] bg-[var(--color-bg-card)] text-[var(--color-text-primary)] rounded-lg px-3">
                <Navigation size={13} />
              </button>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
