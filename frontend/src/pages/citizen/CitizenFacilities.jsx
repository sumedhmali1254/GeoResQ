import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Building2, Navigation, MapPin, ShieldCheck } from 'lucide-react';
import { getNearbyFacilities } from '../../services/mockApi';

export default function CitizenFacilities() {
  const [facilities, setFacilities] = useState([]);

  useEffect(() => {
    async function load() {
      const res = await getNearbyFacilities();
      setFacilities(res.data.filter((f) => f.suitabilityScore >= 70).sort((a, b) => a.distanceKm - b.distanceKm));
    }
    load();
  }, []);

  return (
    <div className="p-4 max-w-lg mx-auto">
      <h1 className="text-lg font-bold text-[var(--color-text-primary)] mb-1">Nearby Safe Facilities</h1>
      <p className="text-xs text-[var(--color-text-muted)] mb-4">Emergency shelters and facilities near you</p>

      <div className="space-y-3">
        {facilities.map((fac, i) => (
          <motion.div
            key={fac.id}
            className="glass-card p-4"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.08 }}
          >
            <div className="flex items-start justify-between mb-2">
              <div>
                <h3 className="text-sm font-semibold text-[var(--color-text-primary)]">{fac.name}</h3>
                <span
                  className="text-[0.6rem] uppercase tracking-wider font-semibold"
                  style={{
                    color: fac.type === 'official_shelter' ? 'var(--color-risk-low)' : 'var(--color-risk-moderate)',
                  }}
                >
                  {fac.type === 'official_shelter' ? '✅ Official Shelter' : '🔶 Emergency Facility'}
                </span>
              </div>
              <div className="text-right">
                <div className="text-lg font-bold font-mono text-[var(--color-text-primary)]">{fac.distanceKm}</div>
                <div className="text-[0.55rem] text-[var(--color-text-muted)]">km away</div>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-2 mb-3 text-center text-xs">
              <div className="p-2 rounded bg-[var(--color-bg-tertiary)]">
                <div className="font-bold text-[var(--color-text-primary)]">{fac.suitabilityScore}</div>
                <div className="text-[0.55rem] text-[var(--color-text-muted)]">Score</div>
              </div>
              <div className="p-2 rounded bg-[var(--color-bg-tertiary)]">
                <div className="font-bold text-[var(--color-text-primary)]">{fac.capacityValue}</div>
                <div className="text-[0.55rem] text-[var(--color-text-muted)]">Capacity</div>
              </div>
              <div className="p-2 rounded bg-[var(--color-bg-tertiary)]">
                <div className="font-bold" style={{
                  color: fac.floodExposure === 'low' ? 'var(--color-risk-low)' : fac.floodExposure === 'moderate' ? 'var(--color-risk-moderate)' : 'var(--color-risk-high)'
                }}>{fac.floodExposure}</div>
                <div className="text-[0.55rem] text-[var(--color-text-muted)]">Flood Risk</div>
              </div>
            </div>

            <div className="flex gap-2">
              <button className="btn-primary btn-sm flex-1">
                <Navigation size={13} /> Navigate
              </button>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
