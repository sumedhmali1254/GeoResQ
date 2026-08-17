import { motion } from 'framer-motion';
import * as Icons from 'lucide-react';

const statusColors = {
  critical: 'var(--color-risk-critical)',
  high: 'var(--color-risk-high)',
  moderate: 'var(--color-risk-moderate)',
  low: 'var(--color-risk-low)',
};

export default function KPICard({ label, value, icon, trend, trendDirection, status, index = 0 }) {
  const IconComponent = Icons[icon] || Icons.Activity;
  const accentColor = statusColors[status] || 'var(--color-accent-blue)';

  return (
    <motion.div
      className="kpi-card p-4 relative overflow-hidden"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.08 }}
    >
      {/* Accent border top */}
      <div className="absolute top-0 left-0 right-0 h-[3px]" style={{ background: accentColor }} />

      <div className="flex items-start justify-between mb-3">
        <div
          className="w-10 h-10 rounded-xl flex items-center justify-center shadow-xs"
          style={{ background: `${accentColor}18` }}
        >
          <IconComponent size={20} style={{ color: accentColor }} />
        </div>
        {trend && (
          <span
            className="text-xs font-mono font-bold px-2.5 py-0.5 rounded-full border"
            style={{
              color: trendDirection === 'up' ? 'var(--color-risk-high)' : 'var(--color-risk-low)',
              background: trendDirection === 'up' ? 'var(--color-risk-high-bg)' : 'var(--color-risk-low-bg)',
              borderColor: trendDirection === 'up' ? 'rgba(234,88,12,0.25)' : 'rgba(21,128,61,0.25)',
            }}
          >
            {trendDirection === 'up' ? '↑' : '↓'} {trend}
          </span>
        )}
      </div>

      <div className="text-3xl font-black text-[var(--color-text-primary)] font-mono tracking-tight mb-1">
        {value}
      </div>
      <div className="text-xs font-bold text-[var(--color-text-secondary)] uppercase tracking-wider">
        {label}
      </div>
    </motion.div>
  );
}
