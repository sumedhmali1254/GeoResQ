import { motion } from 'framer-motion';
import { Droplets, Wind, Thermometer, CloudRain, AlertTriangle, ShieldCheck, TrendingUp } from 'lucide-react';
import RiskGauge from '../../components/RiskGauge';
export default function CitizenRisk() {
  return (
    <div className="w-full space-y-6">
      <div className="flex items-center justify-between border-b pb-4" style={{ borderColor: 'var(--color-border-secondary)' }}>
        <div>
          <h1 className="text-xl font-extrabold text-[var(--color-text-primary)]">Your Risk Assessment</h1>
          <p className="text-xs text-[var(--color-text-muted)]">Live flood-risk parameters and localized conditions</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Column 1: Risk Gauge & Weather Conditions */}
        <div className="space-y-6">
          <motion.div
            className="glass-card p-6 flex flex-col items-center justify-center h-[230px]"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
          >
            <RiskGauge score={78} size={150} label="Flood Risk" />
            <p className="text-[0.65rem] text-[var(--color-text-muted)] mt-2 text-center italic">
              Elevated flood risk due to drainage overflow and tidal surge.
            </p>
          </motion.div>

          <div className="glass-card p-5">
            <h3 className="text-xs font-semibold text-[var(--color-text-muted)] uppercase tracking-wider mb-3 pb-2 border-b border-[var(--color-border-secondary)]">
              Current Conditions
            </h3>
            <div className="grid grid-cols-2 gap-3">
              {[
                { icon: CloudRain, label: 'Rainfall', value: '85mm/hr', color: '#3b82f6' },
                { icon: Wind, label: 'Wind Speed', value: '42 km/h', color: '#06b6d4' },
                { icon: Thermometer, label: 'Temperature', value: '26°C', color: '#f59e0b' },
                { icon: Droplets, label: 'Humidity', value: '94%', color: '#8b5cf6' },
              ].map((item) => (
                <div key={item.label} className="p-3 rounded-lg bg-[var(--color-bg-tertiary)] text-center border border-[var(--color-border-secondary)]">
                  <item.icon size={18} className="mx-auto mb-1.5" style={{ color: item.color }} />
                  <div className="text-base font-bold font-mono text-[var(--color-text-primary)]">{item.value}</div>
                  <div className="text-[0.55rem] text-[var(--color-text-muted)] font-medium">{item.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Column 2: Contributing Risk Factors */}
        <div className="space-y-6">
          <div className="glass-card p-5 h-full flex flex-col justify-between">
            <div>
              <h3 className="text-xs font-semibold text-[var(--color-text-muted)] uppercase tracking-wider mb-4 pb-2 border-b border-[var(--color-border-secondary)]">
                Contributing Risk Factors
              </h3>
              <div className="space-y-3.5">
                {[
                  { label: 'Rainfall Intensity', value: 85, color: '#ef4444' },
                  { label: 'Terrain Elevation', value: 72, color: '#f97316' },
                  { label: 'Drainage Capacity', value: 60, color: '#eab308' },
                  { label: 'Historical Flood Data', value: 55, color: '#3b82f6' },
                  { label: 'Water Body Proximity', value: 40, color: '#06b6d4' },
                ].map((factor) => (
                  <div key={factor.label}>
                    <div className="flex justify-between text-xs mb-1">
                      <span className="text-[var(--color-text-secondary)] font-semibold">{factor.label}</span>
                      <span className="font-mono text-[var(--color-text-primary)] font-bold">{factor.value}%</span>
                    </div>
                    <div className="h-1.5 rounded-full bg-[var(--color-bg-tertiary)] overflow-hidden border border-[var(--color-border-secondary)]">
                      <motion.div
                        className="h-full rounded-full"
                        style={{ background: factor.color }}
                        initial={{ width: 0 }}
                        animate={{ width: `${factor.value}%` }}
                        transition={{ duration: 0.8, ease: 'easeOut' }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <p className="text-[0.65rem] text-[var(--color-text-muted)] pt-4 italic">
              * Risk levels are updated dynamically based on IMD radar data and regional water sensors.
            </p>
          </div>
        </div>

        {/* Column 3: Action Advisories */}
        <div className="space-y-6">
          <div className="glass-card p-5 h-full flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 mb-4 pb-2 border-b border-[var(--color-border-secondary)]">
                <ShieldCheck size={16} className="text-[var(--color-accent-blue)]" />
                <h3 className="text-xs font-semibold text-[var(--color-text-muted)] uppercase tracking-wider">
                  Action Advisories
                </h3>
              </div>
              <ul className="space-y-4 text-xs text-[var(--color-text-secondary)] list-none pl-0">
                <li className="flex items-start gap-3 p-3 rounded-lg border border-red-100 bg-red-50/50">
                  <AlertTriangle size={16} className="text-[var(--color-risk-high)] flex-shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-red-900 block mb-0.5">Avoid Travel</strong>
                    <span>Stay clear of low-lying roadways and waterlogged subways. Use elevated connector highways only.</span>
                  </div>
                </li>
                <li className="flex items-start gap-3 p-3 rounded-lg border border-amber-100 bg-amber-50/50">
                  <TrendingUp size={16} className="text-[var(--color-risk-moderate)] flex-shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-amber-900 block mb-0.5">Prepare Supplies</strong>
                    <span>Rainfall intensity is projected to increase. Prepare dry emergency kits and power banks.</span>
                  </div>
                </li>
                <li className="flex items-start gap-3 p-3 rounded-lg border border-emerald-100 bg-emerald-50/50">
                  <ShieldCheck size={16} className="text-[var(--color-risk-low)] flex-shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-emerald-900 block mb-0.5">Shelters Ready</strong>
                    <span>The nearest active shelter (Kurla Relief Camp) has standby capacity. Distance is 1.8 km.</span>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
