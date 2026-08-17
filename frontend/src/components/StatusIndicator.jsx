export default function StatusIndicator({ status = 'live', label }) {
  const config = {
    live: { color: 'var(--color-status-live)', text: 'Live' },
    online: { color: 'var(--color-status-live)', text: 'Online' },
    warning: { color: 'var(--color-status-warning)', text: 'Warning' },
    error: { color: 'var(--color-status-error)', text: 'Offline' },
    syncing: { color: 'var(--color-accent-blue)', text: 'Syncing' },
  };

  const c = config[status] || config.live;

  return (
    <div className="flex items-center gap-1.5">
      <div className="relative">
        <div className="w-2 h-2 rounded-full" style={{ background: c.color }} />
        {status === 'live' && (
          <div
            className="absolute inset-0 w-2 h-2 rounded-full animate-ping opacity-75"
            style={{ background: c.color }}
          />
        )}
      </div>
      <span className="text-xs font-medium" style={{ color: c.color }}>
        {label || c.text}
      </span>
    </div>
  );
}
