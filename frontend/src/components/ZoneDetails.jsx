import { motion, AnimatePresence } from 'framer-motion';
import { X, Users, Route, Hospital, Home, TrendingUp, Eye, Navigation, Building2 } from 'lucide-react';
import RiskGauge from './RiskGauge';
import ConfidenceIndicator from './ConfidenceIndicator';
import RiskBadge from './RiskBadge';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts';

export default function ZoneDetails({ zone, onClose, onViewImpact, onRecommend, onViewRoutes }) {
  if (!zone) return null;

  const barColors = ['#3b82f6', '#6366f1', '#8b5cf6', '#06b6d4', '#f59e0b', '#ef4444'];

  return (
    <AnimatePresence>
      <motion.div
        initial={{ x: 400, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        exit={{ x: 400, opacity: 0 }}
        transition={{ type: 'spring', damping: 25, stiffness: 200 }}
        className="fixed right-0 top-[var(--spacing-header)] bottom-0 w-[380px] z-30 overflow-y-auto border-l"
        style={{
          background: 'rgba(255, 255, 255, 0.98)',
          backdropFilter: 'blur(16px)',
          borderColor: 'var(--color-border-secondary)',
          boxShadow: 'var(--shadow-elevated)',
        }}
      >
        {/* Header */}
        <div className="sticky top-0 z-10 p-4 pb-3 border-b border-[var(--color-border-secondary)]"
          style={{ background: 'rgba(255, 255, 255, 0.95)' }}>
          <div className="flex items-start justify-between mb-2">
            <div>
              <h2 className="text-base font-bold text-[var(--color-text-primary)]">{zone.name}</h2>
              <p className="text-xs text-[var(--color-text-muted)]">{zone.city}, {zone.state}</p>
            </div>
            <button onClick={onClose} className="p-1.5 rounded-md hover:bg-[var(--color-bg-hover)] transition-colors border-none cursor-pointer bg-transparent">
              <X size={18} className="text-[var(--color-text-muted)]" />
            </button>
          </div>
          <RiskBadge level={zone.riskLevel} size="sm" />
        </div>

        <div className="p-4 space-y-5">
          {/* Risk Gauge + Confidence */}
          <div className="flex items-center justify-between">
            <RiskGauge score={zone.riskScore} size={100} />
            <div className="flex-1 ml-4">
              <ConfidenceIndicator value={zone.confidence} />
            </div>
          </div>

          {/* Key Stats */}
          <div className="grid grid-cols-2 gap-3">
            {[
              { icon: Users, label: 'Population', value: zone.population.toLocaleString(), color: '#8b5cf6' },
              { icon: Route, label: 'Roads Affected', value: zone.roadsAffected, color: '#f59e0b' },
              { icon: Hospital, label: 'Hospitals Exposed', value: zone.hospitalsExposed, color: '#ef4444' },
              { icon: Home, label: 'Shelters', value: zone.sheltersAvailable, color: '#22c55e' },
              { icon: Building2, label: 'Buildings', value: zone.buildingsAffected, color: '#f97316' },
              { icon: TrendingUp, label: 'Elevation', value: `${zone.elevation}m`, color: '#06b6d4' },
            ].map((stat) => (
              <div key={stat.label} className="glass-card-subtle p-3">
                <div className="flex items-center gap-2 mb-1.5">
                  <stat.icon size={14} style={{ color: stat.color }} />
                  <span className="text-[0.65rem] text-[var(--color-text-muted)] uppercase tracking-wider">{stat.label}</span>
                </div>
                <span className="text-lg font-bold text-[var(--color-text-primary)] font-mono">{stat.value}</span>
              </div>
            ))}
          </div>

          {/* Risk Contribution Chart */}
          <div>
            <h3 className="section-title">Risk Contributions</h3>
            <div className="glass-card-subtle p-3" style={{ height: 200 }}>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={zone.riskContributions} layout="vertical" margin={{ left: 0, right: 8, top: 4, bottom: 4 }}>
                  <XAxis type="number" domain={[0, 30]} tick={{ fontSize: 10, fill: 'var(--color-text-muted)' }} axisLine={false} tickLine={false} />
                  <YAxis type="category" dataKey="factor" width={95} tick={{ fontSize: 9, fill: 'var(--color-text-secondary)' }} axisLine={false} tickLine={false} />
                  <Tooltip
                    contentStyle={{
                      background: 'var(--color-bg-elevated)',
                      border: '1px solid var(--color-border-primary)',
                      borderRadius: '6px',
                      fontSize: '12px',
                      color: 'var(--color-text-primary)',
                    }}
                    formatter={(v) => [`${v}%`, 'Contribution']}
                  />
                  <Bar dataKey="value" radius={[0, 4, 4, 0]} barSize={14}>
                    {zone.riskContributions.map((_, i) => (
                      <Cell key={i} fill={barColors[i % barColors.length]} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Actions */}
          <div className="flex flex-col gap-2 pt-2">
            <button className="btn-primary btn-sm w-full" onClick={() => onViewImpact?.(zone)}>
              <Eye size={14} /> View Impact Analysis
            </button>
            <button className="btn-secondary btn-sm w-full" onClick={() => onRecommend?.(zone)}>
              <TrendingUp size={14} /> Recommend Action
            </button>
            <button className="btn-secondary btn-sm w-full" onClick={() => onViewRoutes?.(zone)}>
              <Navigation size={14} /> View Safe Routes
            </button>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
