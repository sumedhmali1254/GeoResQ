import { motion } from 'framer-motion';
import * as Icons from 'lucide-react';

const statusColors = {
  critical: 'var(--color-risk-critical)',
  high: 'var(--color-risk-high)',
  moderate: 'var(--color-risk-moderate)',
  low: 'var(--color-risk-low)',
};

export default function ResourceCard({ resource, index = 0 }) {
  const IconComponent = Icons[resource.icon] || Icons.Package;
  const color = statusColors[resource.status] || 'var(--color-accent-blue)';
  const usagePercent = Math.round((resource.deployed / resource.total) * 100);

  return (
    <motion.div
      className="glass-card p-5 border hover:border-[var(--color-border-accent)] transition-all"
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, delay: index * 0.06 }}
    >
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl flex items-center justify-center shadow-xs" style={{ background: `${color}18` }}>
            <IconComponent size={20} style={{ color }} />
          </div>
          <div>
            <h3 className="text-base font-bold text-[var(--color-text-primary)]">{resource.name}</h3>
            <span className="text-[0.65rem] font-bold text-[var(--color-text-secondary)] uppercase tracking-wider">{resource.category}</span>
          </div>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="mb-4">
        <div className="flex justify-between text-xs mb-1.5 font-bold">
          <span className="text-[var(--color-text-secondary)]">Deployed Ratio</span>
          <span className="font-mono text-[var(--color-text-primary)]">{resource.deployed} / {resource.total} ({usagePercent}%)</span>
        </div>
        <div className="h-2.5 rounded-full bg-[var(--color-bg-tertiary)] border border-[var(--color-border-secondary)] overflow-hidden">
          <motion.div
            className="h-full rounded-full"
            style={{ background: color }}
            initial={{ width: 0 }}
            animate={{ width: `${usagePercent}%` }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
          />
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-2 text-center">
        <div className="p-2.5 rounded-lg bg-[var(--color-bg-tertiary)] border border-[var(--color-border-secondary)]">
          <div className="text-base font-black font-mono text-[var(--color-text-primary)]">{resource.total}</div>
          <div className="text-[0.6rem] font-extrabold text-[var(--color-text-secondary)] uppercase">Total</div>
        </div>
        <div className="p-2.5 rounded-lg bg-[var(--color-bg-tertiary)] border border-[var(--color-border-secondary)]">
          <div className="text-base font-black font-mono" style={{ color }}>{resource.deployed}</div>
          <div className="text-[0.6rem] font-extrabold text-[var(--color-text-secondary)] uppercase">Deployed</div>
        </div>
        <div className="p-2.5 rounded-lg bg-[var(--color-bg-tertiary)] border border-[var(--color-border-secondary)]">
          <div className="text-base font-black font-mono text-[var(--color-accent-emerald)]">{resource.available}</div>
          <div className="text-[0.6rem] font-extrabold text-[var(--color-text-secondary)] uppercase">Available</div>
        </div>
      </div>
    </motion.div>
  );
}
