import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { AlertTriangle, Navigation, FileWarning, Hospital, MapPin, Shield, Route, Building2 } from 'lucide-react';

import { useAuth } from '../../context/AuthContext';

export default function CitizenHome() {
  const { user } = useAuth();
  return (
    <div className="w-full space-y-6">
      <div className="flex items-center justify-between border-b pb-4" style={{ borderColor: 'var(--color-border-secondary)' }}>
        <div>
          <h1 className="text-2xl font-extrabold text-[var(--color-text-primary)] tracking-tight">Citizen Dashboard</h1>
          <p className="text-xs text-[var(--color-text-muted)] font-medium">
            Welcome back, <strong className="text-[var(--color-accent-blue)]">{user?.name || 'Citizen'}</strong> · Mumbai Disaster Support Services
          </p>
        </div>
        <div className="hidden sm:flex items-center gap-2 text-xs font-bold text-sky-600 bg-sky-50 px-3 py-1.5 rounded-lg border border-sky-100 shadow-xs">
          <MapPin size={14} className="text-sky-500" />
          <span>Location: {user?.area || 'Kurla West, Mumbai'}</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Column 1 - Risk status & Advisories */}
        <div className="space-y-6">
          {/* Risk Card */}
          <motion.div
            className="glass-card p-6 relative overflow-hidden flex flex-col justify-between h-[210px] shadow-xs"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className="absolute top-0 left-0 right-0 h-1 bg-[var(--color-risk-high)]" />
            <div>
              <span className="text-[0.6rem] font-bold text-[var(--color-text-muted)] uppercase tracking-wider block mb-1">Current Risk Assessment</span>
              <div className="text-4xl font-black text-[var(--color-risk-high)] tracking-tight mb-2">HIGH</div>
              <div className="flex items-center gap-2 mb-3">
                <AlertTriangle size={16} className="text-[var(--color-risk-high)]" />
                <span className="text-sm font-semibold text-[var(--color-text-secondary)]">Flood Risk Score: <strong className="text-[var(--color-text-primary)]">78%</strong></span>
              </div>
            </div>
            <p className="text-xs text-[var(--color-text-muted)] italic leading-relaxed">
              Elevated water logging risk in low-lying zones due to heavy rain. Stay alert.
            </p>
          </motion.div>

          {/* Safety Advisories */}
          <motion.div
            className="glass-card p-5 space-y-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.1 }}
          >
            <div className="flex items-center gap-2 pb-2 border-b border-[var(--color-border-secondary)]">
              <Shield size={16} className="text-[var(--color-accent-blue)]" />
              <span className="text-xs font-bold text-[var(--color-text-primary)] uppercase tracking-wider">Safety Guidelines</span>
            </div>
            <ul className="space-y-3 text-xs text-[var(--color-text-secondary)] pl-0 list-none m-0">
              {[
                'Avoid low-lying areas and underpasses (e.g. Milan subway)',
                'Keep emergency dry kit ready (medicines, documents, flashlights)',
                'Observe local flood sirens and follow evacuation plans immediately',
                'Keep your phone charged and refer only to verified civic reports',
              ].map((tip, idx) => (
                <li key={idx} className="flex items-start gap-2.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-accent-blue)] flex-shrink-0 mt-1.5" />
                  <span className="leading-relaxed">{tip}</span>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>

        {/* Column 2 - Primary Emergency Tools */}
        <div className="space-y-6">
          <div className="glass-card p-5 space-y-4">
            <div className="flex items-center gap-2 pb-2 border-b border-[var(--color-border-secondary)]">
              <Navigation size={16} className="text-[var(--color-accent-blue)]" />
              <span className="text-xs font-bold text-[var(--color-text-primary)] uppercase tracking-wider">Emergency Services</span>
            </div>
            <p className="text-xs text-[var(--color-text-secondary)] leading-relaxed">
              Use these tools to plan safe evacuation routes or submit field incident reports.
            </p>

            <div className="space-y-3 pt-2">
              <Link to="/citizen/safe-route" className="btn-primary btn-lg w-full flex items-center justify-center gap-3 no-underline shadow-xs">
                <Navigation size={18} />
                <span>Find Safest Route</span>
              </Link>
              <Link to="/citizen/report" className="btn-danger btn-lg w-full flex items-center justify-center gap-3 no-underline shadow-xs">
                <FileWarning size={18} />
                <span>Report Incident / SOS</span>
              </Link>
            </div>
          </div>

          {/* Direct Rescue Lines */}
          <div className="glass-card p-5">
            <span className="text-xs font-bold text-[var(--color-text-muted)] uppercase tracking-wider block mb-3">Rescue Control Helpline</span>
            <div className="space-y-2.5">
              <a href="tel:112" className="flex items-center justify-between p-3 rounded-lg border text-xs font-bold no-underline transition-all bg-red-50 hover:bg-red-100 border-red-200 text-red-700">
                <span>National Emergency Line</span>
                <span className="font-mono text-sm">112</span>
              </a>
              <a href="tel:1916" className="flex items-center justify-between p-3 rounded-lg border text-xs font-bold no-underline transition-all bg-sky-50 hover:bg-sky-100 border-sky-200 text-sky-700">
                <span>BMC Disaster Control</span>
                <span className="font-mono text-sm">1916</span>
              </a>
            </div>
          </div>
        </div>

        {/* Column 3 - Live Nearby Support Information */}
        <div className="space-y-6">
          <div className="glass-card p-5 space-y-4">
            <div className="flex items-center gap-2 pb-2 border-b border-[var(--color-border-secondary)]">
              <Building2 size={16} className="text-emerald-500" />
              <span className="text-xs font-bold text-[var(--color-text-primary)] uppercase tracking-wider">Nearby Live Support</span>
            </div>

            <div className="space-y-3">
              {[
                { icon: Building2, label: 'Nearest Safe Facility', value: '1.8 km', sub: 'Kurla Relief Camp (Active)', color: '#22c55e' },
                { icon: Hospital, label: 'Nearest Hospital', value: '2.4 km', sub: 'Rajawadi Hospital (Open)', color: '#3b82f6' },
                { icon: AlertTriangle, label: 'Road Blockage Nearby', value: '0.8 km', sub: 'LBS Marg Waterlogged', color: '#ef4444' },
              ].map((item, i) => (
                <motion.div
                  key={item.label}
                  className="glass-card-subtle p-3.5 flex items-center gap-3 border border-[var(--color-border-secondary)]"
                  initial={{ opacity: 0, x: 16 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 + i * 0.08 }}
                >
                  <div className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0"
                    style={{ background: `${item.color}12` }}>
                    <item.icon size={18} style={{ color: item.color }} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-[0.65rem] text-[var(--color-text-muted)] font-bold uppercase tracking-wider">{item.label}</div>
                    <div className="text-xs font-bold text-[var(--color-text-primary)] truncate">{item.sub}</div>
                  </div>
                  <span className="text-sm font-extrabold font-mono text-[var(--color-text-primary)] flex-shrink-0">{item.value}</span>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
