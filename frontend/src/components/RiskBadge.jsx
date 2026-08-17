const levelConfig = {
  critical: { bg: 'var(--color-risk-critical-bg)', color: 'var(--color-risk-critical)', border: 'rgba(239,68,68,0.3)' },
  high: { bg: 'var(--color-risk-high-bg)', color: 'var(--color-risk-high)', border: 'rgba(249,115,22,0.3)' },
  moderate: { bg: 'var(--color-risk-moderate-bg)', color: 'var(--color-risk-moderate)', border: 'rgba(234,179,8,0.3)' },
  low: { bg: 'var(--color-risk-low-bg)', color: 'var(--color-risk-low)', border: 'rgba(34,197,94,0.3)' },
};

export default function RiskBadge({ level, size = 'md' }) {
  const config = levelConfig[level] || levelConfig.moderate;
  const sizeClasses = {
    sm: 'text-[0.6rem] px-2 py-0.5',
    md: 'text-xs px-3 py-1',
    lg: 'text-sm px-4 py-1.5',
  };

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full font-semibold uppercase tracking-wider ${sizeClasses[size]}`}
      style={{
        background: config.bg,
        color: config.color,
        border: `1px solid ${config.border}`,
      }}
    >
      <span className="w-1.5 h-1.5 rounded-full" style={{ background: config.color }} />
      {level}
    </span>
  );
}
