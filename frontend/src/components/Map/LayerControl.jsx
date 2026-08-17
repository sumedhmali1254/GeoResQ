import { motion } from 'framer-motion';
import {
  Layers,
  Droplets,
  Hospital,
  Home,
  Route,
  AlertTriangle,
  Waves,
  Users,
} from 'lucide-react';

const layers = [
  { key: 'floodRisk', label: 'Flood Risk', icon: Droplets, color: '#3b82f6' },
  { key: 'hospitals', label: 'Hospitals', icon: Hospital, color: '#ef4444' },
  { key: 'shelters', label: 'Shelters', icon: Home, color: '#22c55e' },
  { key: 'roads', label: 'Roads', icon: Route, color: '#f59e0b' },
  { key: 'alerts', label: 'Alerts', icon: AlertTriangle, color: '#f97316' },
  { key: 'waterBodies', label: 'Water Bodies', icon: Waves, color: '#06b6d4' },
  { key: 'population', label: 'Population', icon: Users, color: '#8b5cf6' },
];

export default function LayerControl({ activeLayers = [], onToggle }) {
  return (
    <motion.div
      className="glass-card p-3 w-52"
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="flex items-center gap-2 mb-3 pb-2 border-b border-[var(--color-border-secondary)]">
        <Layers size={14} className="text-[var(--color-text-muted)]" />
        <span className="text-xs font-semibold uppercase tracking-wider text-[var(--color-text-muted)]">
          Map Layers
        </span>
      </div>

      <div className="flex flex-col gap-1">
        {layers.map((layer) => {
          const isActive = activeLayers.includes(layer.key);
          const Icon = layer.icon;

          return (
            <button
              key={layer.key}
              onClick={() => onToggle(layer.key)}
              className="flex items-center gap-2.5 px-2.5 py-2 rounded-md text-left transition-all duration-200 border-none cursor-pointer"
              style={{
                background: isActive ? `${layer.color}12` : 'transparent',
                color: isActive ? 'var(--color-text-primary)' : 'var(--color-text-muted)',
              }}
            >
              <div
                className="w-4 h-4 rounded flex items-center justify-center"
                style={{
                  background: isActive ? layer.color : 'var(--color-bg-elevated)',
                  border: `1px solid ${isActive ? layer.color : 'var(--color-border-primary)'}`,
                }}
              >
                {isActive && (
                  <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                    <path d="M2 5L4 7L8 3" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                )}
              </div>
              <Icon size={14} style={{ color: isActive ? layer.color : 'var(--color-text-muted)' }} />
              <span className="text-xs font-medium">{layer.label}</span>
            </button>
          );
        })}
      </div>
    </motion.div>
  );
}
