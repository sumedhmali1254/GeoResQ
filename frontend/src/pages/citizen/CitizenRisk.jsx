import { motion } from 'framer-motion';
import { Droplets, Wind, Thermometer, CloudRain, AlertTriangle, ShieldCheck, TrendingUp } from 'lucide-react';
import RiskGauge from '../../components/RiskGauge';

export default function CitizenRisk() {
  return (
    <div className="p-4 max-w-lg mx-auto">
      <h1 className="text-lg font-bold text-[var(--color-text-primary)] mb-1">Your Risk Assessment</h1>
      <p className="text-xs text-[var(--color-text-muted)] mb-5">Based on your location and current conditions</p>

      {/* Risk Gauge */}
      <motion.div
        className="glass-card p-6 flex flex-col items-center mb-4"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
      >
        <RiskGauge score={78} size={160} label="Flood Risk" />
        <p className="text-xs text-[var(--color-text-muted)] mt-3 text-center italic">
          Your area has elevated flood risk due to heavy rainfall and low terrain elevation.
        </p>
      </motion.div>

      {/* Weather Conditions */}
      <div className="glass-card p-4 mb-4">
        <h3 className="text-xs font-semibold text-[var(--color-text-muted)] uppercase tracking-wider mb-3">
          Current Conditions
        </h3>
        <div className="grid grid-cols-2 gap-3">
          {[
            { icon: CloudRain, label: 'Rainfall', value: '85mm/hr', color: '#3b82f6' },
            { icon: Wind, label: 'Wind Speed', value: '42 km/h', color: '#06b6d4' },
            { icon: Thermometer, label: 'Temperature', value: '26°C', color: '#f59e0b' },
            { icon: Droplets, label: 'Humidity', value: '94%', color: '#8b5cf6' },
          ].map((item) => (
            <div key={item.label} className="p-3 rounded-lg bg-[var(--color-bg-tertiary)] text-center">
              <item.icon size={18} className="mx-auto mb-1.5" style={{ color: item.color }} />
              <div className="text-base font-bold font-mono text-[var(--color-text-primary)]">{item.value}</div>
              <div className="text-[0.6rem] text-[var(--color-text-muted)]">{item.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Risk Factors */}
      <div className="glass-card p-4 mb-4">
        <h3 className="text-xs font-semibold text-[var(--color-text-muted)] uppercase tracking-wider mb-3">
          Risk Factors
        </h3>
        <div className="space-y-2.5">
          {[
            { label: 'Rainfall Intensity', value: 85, color: '#ef4444' },
            { label: 'Terrain Elevation', value: 72, color: '#f97316' },
            { label: 'Drainage Capacity', value: 60, color: '#eab308' },
            { label: 'Historical Flood Data', value: 55, color: '#3b82f6' },
            { label: 'Water Body Proximity', value: 40, color: '#06b6d4' },
          ].map((factor) => (
            <div key={factor.label}>
              <div className="flex justify-between text-xs mb-1">
                <span className="text-[var(--color-text-secondary)]">{factor.label}</span>
                <span className="font-mono text-[var(--color-text-primary)]">{factor.value}%</span>
              </div>
              <div className="h-1.5 rounded-full bg-[var(--color-bg-elevated)] overflow-hidden">
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

      {/* Recommendations */}
      <div className="glass-card p-4">
        <div className="flex items-center gap-2 mb-3">
          <ShieldCheck size={14} className="text-[var(--color-accent-blue)]" />
          <h3 className="text-xs font-semibold text-[var(--color-text-muted)] uppercase tracking-wider">
            Recommendations
          </h3>
        </div>
        <ul className="space-y-2 text-xs text-[var(--color-text-secondary)]">
          <li className="flex items-start gap-2">
            <AlertTriangle size={12} className="text-[var(--color-risk-high)] mt-0.5 flex-shrink-0" />
            <span>Avoid travel through low-lying areas. Use elevated routes.</span>
          </li>
          <li className="flex items-start gap-2">
            <TrendingUp size={12} className="text-[var(--color-risk-moderate)] mt-0.5 flex-shrink-0" />
            <span>Rainfall expected to increase. Prepare for possible evacuation.</span>
          </li>
          <li className="flex items-start gap-2">
            <ShieldCheck size={12} className="text-[var(--color-risk-low)] mt-0.5 flex-shrink-0" />
            <span>Nearest shelter is 1.8 km away at Kurla Relief Camp.</span>
          </li>
        </ul>
      </div>
    </div>
  );
}
