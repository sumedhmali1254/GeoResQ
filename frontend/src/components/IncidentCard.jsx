import { motion } from 'framer-motion';
import RiskBadge from './RiskBadge';
import ConfidenceIndicator from './ConfidenceIndicator';
import { MapPin, Clock, Image, Users, CheckCircle, AlertTriangle } from 'lucide-react';

const verificationIcons = {
  verified: { icon: CheckCircle, color: 'var(--color-risk-low)', label: 'Verified' },
  pending: { icon: Clock, color: 'var(--color-risk-moderate)', label: 'Pending' },
  unverified: { icon: AlertTriangle, color: 'var(--color-risk-high)', label: 'Unverified' },
};

export default function IncidentCard({ incident, index = 0, onClick }) {
  const verification = verificationIcons[incident.verificationStatus] || verificationIcons.unverified;
  const VerifIcon = verification.icon;

  const timeAgo = (ts) => {
    const diff = Date.now() - new Date(ts).getTime();
    const mins = Math.floor(diff / 60000);
    if (mins < 60) return `${mins}m ago`;
    const hrs = Math.floor(mins / 60);
    return `${hrs}h ago`;
  };

  return (
    <motion.div
      className="glass-card p-5 cursor-pointer border hover:border-[var(--color-border-accent)] transition-all duration-200"
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.05 }}
      onClick={() => onClick?.(incident)}
    >
      {/* Header */}
      <div className="flex items-start justify-between mb-3">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <span className="text-xs font-mono font-bold text-[var(--color-accent-blue)] bg-blue-50 px-2 py-0.5 rounded border border-blue-200">{incident.id}</span>
            <RiskBadge level={incident.severity} size="sm" />
          </div>
          <h3 className="text-base font-bold text-[var(--color-text-primary)]">{incident.type}</h3>
        </div>
        <div className="flex items-center gap-1 font-bold" style={{ color: verification.color }}>
          <VerifIcon size={14} />
          <span className="text-[0.65rem] uppercase tracking-wider">{verification.label}</span>
        </div>
      </div>

      {/* Location + Time */}
      <div className="flex items-center gap-4 mb-3 text-xs font-medium text-[var(--color-text-secondary)]">
        <div className="flex items-center gap-1">
          <MapPin size={14} className="text-[var(--color-accent-blue)]" />
          <span className="font-semibold">{incident.location}</span>
        </div>
        <div className="flex items-center gap-1 text-[var(--color-text-muted)]">
          <Clock size={14} />
          <span>{timeAgo(incident.timestamp)}</span>
        </div>
      </div>

      {/* Stats Row */}
      <div className="flex items-center gap-4 mb-3 p-2 rounded-lg bg-[var(--color-bg-tertiary)] border border-[var(--color-border-secondary)]">
        <div className="flex items-center gap-1.5 text-xs font-bold">
          <Users size={14} className="text-[var(--color-accent-blue)]" />
          <span className="text-[var(--color-text-primary)]">{incident.reportCount} Reports</span>
        </div>
        <div className="flex items-center gap-1.5 text-xs font-bold">
          <Image size={14} className="text-[var(--color-accent-purple)]" />
          <span className="text-[var(--color-text-primary)]">{incident.imageReports} Photos</span>
        </div>
      </div>

      {/* Confidence */}
      <ConfidenceIndicator value={incident.confidence} size="sm" />
    </motion.div>
  );
}
