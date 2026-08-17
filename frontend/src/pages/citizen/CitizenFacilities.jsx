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
    <div className="w-full space-y-6">
      <div className="flex items-center justify-between border-b pb-4" style={{ borderColor: 'var(--color-border-secondary)' }}>
        <div>
          <h1 className="text-xl font-extrabold text-[var(--color-text-primary)]">Nearby Safe Facilities</h1>
          <p className="text-xs text-[var(--color-text-muted)]">Emergency shelters and facilities near you</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {facilities.map((fac, i) => (
          <motion.div
            key={fac.id}
            className="glass-card p-5 flex flex-col justify-between shadow-xs border border-[var(--color-border-secondary)]"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.08 }}
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

              <div className="grid grid-cols-3 gap-2 mb-4 text-center text-xs">
                <div className="p-2.5 rounded bg-[var(--color-bg-tertiary)] border border-[var(--color-border-secondary)]">
                  <div className="font-extrabold text-[var(--color-text-primary)]">{fac.suitabilityScore}</div>
                  <div className="text-[0.55rem] text-[var(--color-text-muted)] font-bold uppercase tracking-wider">Score</div>
                </div>
                <div className="p-2.5 rounded bg-[var(--color-bg-tertiary)] border border-[var(--color-border-secondary)]">
                  <div className="font-extrabold text-[var(--color-text-primary)]">{fac.capacityValue}</div>
                  <div className="text-[0.55rem] text-[var(--color-text-muted)] font-bold uppercase tracking-wider">Capacity</div>
                </div>
                <div className="p-2.5 rounded bg-[var(--color-bg-tertiary)] border border-[var(--color-border-secondary)]">
                  <div className="font-extrabold uppercase" style={{
                    color: fac.floodExposure === 'low' ? 'var(--color-risk-low)' : fac.floodExposure === 'moderate' ? 'var(--color-risk-moderate)' : 'var(--color-risk-high)'
                  }}>{fac.floodExposure}</div>
                  <div className="text-[0.55rem] text-[var(--color-text-muted)] font-bold uppercase tracking-wider">Risk</div>
                </div>
              </div>
            </div>

            <div className="flex gap-2 mt-2">
              <button className="btn-primary btn-sm flex-1 flex items-center justify-center gap-1.5 font-bold">
                <Navigation size={13} />
                <span>Navigate Shelter</span>
              </button>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
