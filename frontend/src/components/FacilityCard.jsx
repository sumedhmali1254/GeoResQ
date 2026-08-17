import { motion } from 'framer-motion';
import { ShieldCheck, Eye } from 'lucide-react';
import {
  RadarChart, PolarGrid, PolarAngleAxis, Radar, ResponsiveContainer,
} from 'recharts';

export default function FacilityCard({ facility, index = 0, onViewMap, onActivate }) {
  const radarData = [
    { metric: 'Safety', value: facility.safety },
    { metric: 'Capacity', value: facility.capacity },
    { metric: 'Access', value: facility.accessibility },
    { metric: 'Support', value: facility.emergencySupport },
    { metric: 'Distance', value: facility.distance },
  ];

  const typeColors = {
    official_shelter: { bg: 'rgba(21,128,61,0.1)', border: 'rgba(21,128,61,0.3)', text: '#15803d', label: 'Official Shelter' },
    potential_facility: { bg: 'rgba(217,119,6,0.1)', border: 'rgba(217,119,6,0.3)', text: '#d97706', label: 'Potential Facility' },
  };
  const typeStyle = typeColors[facility.type] || typeColors.potential_facility;

  return (
    <motion.div
      className="glass-card p-5 border hover:border-[var(--color-border-accent)] transition-all"
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, delay: index * 0.06 }}
    >
      {/* Header */}
      <div className="flex items-start justify-between mb-3">
        <div>
          <h3 className="text-base font-bold text-[var(--color-text-primary)] mb-1">{facility.name}</h3>
          <div className="flex items-center gap-2">
            <span
              className="text-[0.6rem] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full"
              style={{ background: typeStyle.bg, color: typeStyle.text, border: `1px solid ${typeStyle.border}` }}
            >
              {typeStyle.label}
            </span>
            <span className="text-xs font-semibold text-[var(--color-text-secondary)]">{facility.category}</span>
          </div>
        </div>
        {/* Suitability Score */}
        <div className="flex flex-col items-center">
          <div className="text-2xl font-black font-mono text-[var(--color-accent-blue)]">{facility.suitabilityScore}</div>
          <span className="text-[0.55rem] font-extrabold text-[var(--color-text-muted)] uppercase tracking-wider">Suitability</span>
        </div>
      </div>

      {/* Radar Chart */}
      <div className="h-[160px] mb-3">
        <ResponsiveContainer width="100%" height="100%">
          <RadarChart data={radarData} cx="50%" cy="50%" outerRadius="70%">
            <PolarGrid stroke="var(--color-border-primary)" />
            <PolarAngleAxis
              dataKey="metric"
              tick={{ fontSize: 9, fill: 'var(--color-text-secondary)', fontWeight: 700 }}
            />
            <Radar
              name="Score"
              dataKey="value"
              stroke="#2563eb"
              fill="#2563eb"
              fillOpacity={0.18}
              strokeWidth={2}
            />
          </RadarChart>
        </ResponsiveContainer>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 gap-2 mb-4 text-xs">
        <div className="flex justify-between px-2.5 py-1.5 rounded-lg bg-[var(--color-bg-tertiary)] border border-[var(--color-border-secondary)]">
          <span className="font-semibold text-[var(--color-text-secondary)]">Capacity</span>
          <span className="font-bold text-[var(--color-text-primary)] font-mono">{facility.capacityValue}</span>
        </div>
        <div className="flex justify-between px-2.5 py-1.5 rounded-lg bg-[var(--color-bg-tertiary)] border border-[var(--color-border-secondary)]">
          <span className="font-semibold text-[var(--color-text-secondary)]">Distance</span>
          <span className="font-bold text-[var(--color-text-primary)] font-mono">{facility.distanceKm} km</span>
        </div>
        <div className="flex justify-between px-2.5 py-1.5 rounded-lg bg-[var(--color-bg-tertiary)] border border-[var(--color-border-secondary)]">
          <span className="font-semibold text-[var(--color-text-secondary)]">Flood Risk</span>
          <span className="font-extrabold uppercase" style={{
            color: facility.floodExposure === 'low' ? 'var(--color-risk-low)' : facility.floodExposure === 'moderate' ? 'var(--color-risk-moderate)' : 'var(--color-risk-high)'
          }}>{facility.floodExposure}</span>
        </div>
        <div className="flex justify-between px-2.5 py-1.5 rounded-lg bg-[var(--color-bg-tertiary)] border border-[var(--color-border-secondary)]">
          <span className="font-semibold text-[var(--color-text-secondary)]">Hospital</span>
          <span className="font-bold text-[var(--color-text-primary)] font-mono">{facility.hospitalProximityKm} km</span>
        </div>
      </div>

      {/* Actions */}
      <div className="flex gap-2">
        <button className="btn-secondary btn-sm flex-1" onClick={() => onViewMap?.(facility)}>
          <Eye size={14} /> View on Map
        </button>
        <button className="btn-primary btn-sm flex-1" onClick={() => onActivate?.(facility)}>
          <ShieldCheck size={14} /> Activate
        </button>
      </div>
    </motion.div>
  );
}
