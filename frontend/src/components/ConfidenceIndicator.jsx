import { motion } from 'framer-motion';
import { ShieldCheck } from 'lucide-react';

export default function ConfidenceIndicator({ value, size = 'md' }) {
  const getColor = (v) => {
    if (v >= 85) return 'var(--color-risk-low)';
    if (v >= 65) return 'var(--color-accent-blue)';
    if (v >= 45) return 'var(--color-risk-moderate)';
    return 'var(--color-risk-high)';
  };

  const color = getColor(value);
  const sizes = {
    sm: { barH: 'h-1.5', text: 'text-xs', w: 'w-24' },
    md: { barH: 'h-2', text: 'text-sm', w: 'w-32' },
    lg: { barH: 'h-2.5', text: 'text-base', w: 'w-40' },
  };
  const s = sizes[size];

  return (
    <div className="flex items-center gap-2.5">
      <ShieldCheck size={size === 'sm' ? 14 : 16} style={{ color }} />
      <div className="flex flex-col gap-1 flex-1">
        <div className="flex items-center justify-between">
          <span className="text-[0.65rem] font-medium text-[var(--color-text-muted)] uppercase tracking-wider">
            Confidence
          </span>
          <span className={`${s.text} font-bold font-mono`} style={{ color }}>
            {value}%
          </span>
        </div>
        <div className={`${s.barH} ${s.w} rounded-full bg-[var(--color-bg-elevated)] overflow-hidden`}>
          <motion.div
            className={`${s.barH} rounded-full`}
            style={{ background: color }}
            initial={{ width: 0 }}
            animate={{ width: `${value}%` }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
          />
        </div>
      </div>
    </div>
  );
}
