import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { AlertTriangle, Navigation, FileWarning, Hospital, MapPin, Shield, Route, Building2 } from 'lucide-react';

export default function CitizenHome() {
  return (
    <div className="p-4 max-w-lg mx-auto">
      {/* Risk Status */}
      <motion.div
        className="glass-card p-5 mb-4 text-center relative overflow-hidden"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div className="absolute top-0 left-0 right-0 h-1 bg-[var(--color-risk-high)]" />
        <p className="text-xs text-[var(--color-text-muted)] uppercase tracking-wider mb-1">Your Current Risk</p>
        <div className="text-3xl font-extrabold text-[var(--color-risk-high)] mb-1">HIGH</div>
        <div className="flex items-center justify-center gap-2 mb-3">
          <AlertTriangle size={16} className="text-[var(--color-risk-high)]" />
          <span className="text-sm text-[var(--color-text-secondary)]">Flood Risk: <strong className="text-[var(--color-text-primary)]">78%</strong></span>
        </div>
        <p className="text-xs text-[var(--color-text-muted)] italic">
          Heavy rainfall expected in your area. Stay alert and follow official advisories.
        </p>
      </motion.div>

      {/* Nearby Info */}
      <div className="space-y-2 mb-5">
        {[
          { icon: Building2, label: 'Nearest Safe Facility', value: '1.8 km', sub: 'Kurla Relief Camp', color: '#22c55e' },
          { icon: Hospital, label: 'Nearest Hospital', value: '2.4 km', sub: 'Rajawadi Hospital', color: '#3b82f6' },
          { icon: AlertTriangle, label: 'Road Blockage Nearby', value: '0.8 km', sub: 'LBS Marg', color: '#ef4444' },
        ].map((item, i) => (
          <motion.div
            key={item.label}
            className="glass-card-subtle p-3.5 flex items-center gap-3"
            initial={{ opacity: 0, x: -16 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 + i * 0.1 }}
          >
            <div className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0"
              style={{ background: `${item.color}15` }}>
              <item.icon size={18} style={{ color: item.color }} />
            </div>
            <div className="flex-1">
              <div className="text-xs text-[var(--color-text-muted)]">{item.label}</div>
              <div className="text-sm font-medium text-[var(--color-text-primary)]">{item.sub}</div>
            </div>
            <span className="text-sm font-bold font-mono text-[var(--color-text-primary)]">{item.value}</span>
          </motion.div>
        ))}
      </div>

      {/* Primary Actions */}
      <div className="space-y-3">
        <Link to="/citizen/safe-route" className="btn-primary btn-lg w-full">
          <Navigation size={20} />
          Find Safest Route
        </Link>
        <Link to="/citizen/report" className="btn-danger btn-lg w-full">
          <FileWarning size={20} />
          Report Disaster
        </Link>
      </div>

      {/* Safety Tips */}
      <motion.div
        className="mt-6 glass-card-subtle p-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        <div className="flex items-center gap-2 mb-2">
          <Shield size={14} className="text-[var(--color-accent-blue)]" />
          <span className="text-xs font-semibold text-[var(--color-text-muted)] uppercase tracking-wider">Safety Advisory</span>
        </div>
        <ul className="space-y-1.5 text-xs text-[var(--color-text-secondary)]">
          <li>• Avoid low-lying areas and underpasses</li>
          <li>• Keep emergency kit ready (documents, water, medicines)</li>
          <li>• Follow official evacuation orders if issued</li>
          <li>• Call 112 for emergency assistance</li>
        </ul>
      </motion.div>
    </div>
  );
}
