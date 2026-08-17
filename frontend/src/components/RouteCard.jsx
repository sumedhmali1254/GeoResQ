import { motion } from 'framer-motion';
import { Navigation } from 'lucide-react';
import RiskBadge from './RiskBadge';

export default function RouteCard({ route, index = 0, onSelect }) {
  return (
    <motion.div
      className={`glass-card p-5 relative overflow-hidden border ${route.recommended ? 'ring-2 ring-[var(--color-accent-blue)] border-[var(--color-accent-blue)]' : ''}`}
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.3, delay: index * 0.1 }}
    >
      {route.recommended && (
        <div className="absolute top-0 left-0 bg-[var(--color-accent-blue)] text-white text-[0.6rem] font-black uppercase tracking-widest px-3 py-1 rounded-br-lg shadow-xs">
          Recommended
        </div>
      )}

      {/* Header */}
      <div className="flex items-start justify-between mb-3">
        <div>
          <h3 className="text-base font-bold text-[var(--color-text-primary)] mb-1">{route.name}</h3>
          <p className="text-xs font-semibold text-[var(--color-text-secondary)]">{route.from} → {route.to}</p>
        </div>
        <RiskBadge level={route.riskLevel} size="sm" />
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-3 mb-4">
        <div className="text-center p-2.5 rounded-lg bg-[var(--color-bg-tertiary)] border border-[var(--color-border-secondary)]">
          <div className="text-lg font-black font-mono text-[var(--color-text-primary)]">{route.distance}</div>
          <div className="text-[0.6rem] font-bold text-[var(--color-text-secondary)] uppercase tracking-wider">KM</div>
        </div>
        <div className="text-center p-2.5 rounded-lg bg-[var(--color-bg-tertiary)] border border-[var(--color-border-secondary)]">
          <div className="text-lg font-black font-mono text-[var(--color-text-primary)]">{route.travelTime}</div>
          <div className="text-[0.6rem] font-bold text-[var(--color-text-secondary)] uppercase tracking-wider">MIN</div>
        </div>
        <div className="text-center p-2.5 rounded-lg bg-[var(--color-bg-tertiary)] border border-[var(--color-border-secondary)]">
          <div className="text-lg font-black font-mono text-[var(--color-accent-blue)]">{route.riskScore}</div>
          <div className="text-[0.6rem] font-bold text-[var(--color-text-secondary)] uppercase tracking-wider">RISK</div>
        </div>
      </div>

      {/* Segments */}
      <div className="mb-4">
        <div className="text-[0.65rem] font-extrabold text-[var(--color-text-muted)] uppercase tracking-widest mb-2">
          Route Segments Breakdown
        </div>
        <div className="space-y-1.5">
          {route.segments.map((seg, i) => (
            <div key={i} className="flex items-center gap-2 text-xs">
              <div className="w-2.5 h-2.5 rounded-full flex-shrink-0" style={{
                background: seg.risk === 'critical' ? '#dc2626' : seg.risk === 'high' ? '#ea580c' : seg.risk === 'moderate' ? '#d97706' : '#15803d'
              }} />
              <span className="font-semibold text-[var(--color-text-secondary)] flex-1">{seg.name}</span>
              <span className="font-mono font-bold text-[var(--color-text-primary)]">{seg.distance} km</span>
            </div>
          ))}
        </div>
      </div>

      {/* Reason */}
      <div className="p-3 rounded-lg bg-blue-50 border border-blue-150 mb-4">
        <p className="text-xs text-[var(--color-text-secondary)] font-medium leading-relaxed">
          "{route.reason}"
        </p>
      </div>

      {/* Info row */}
      <div className="flex items-center gap-4 mb-4 text-xs font-semibold text-[var(--color-text-secondary)]">
        <span>Flood exposure: <strong className="text-[var(--color-text-primary)]">{route.floodExposure} segments</strong></span>
        <span>Blockages: <strong className="text-[var(--color-text-primary)]">{route.roadBlockages}</strong></span>
      </div>

      <button className="btn-primary btn-sm w-full" onClick={() => onSelect?.(route)}>
        <Navigation size={14} /> Select Route
      </button>
    </motion.div>
  );
}
