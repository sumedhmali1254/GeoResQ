import { motion } from 'framer-motion';
import { AlertTriangle, ChevronRight } from 'lucide-react';

const priorityConfig = {
  critical: { color: 'var(--color-risk-critical)', bg: 'var(--color-risk-critical-bg)' },
  high: { color: 'var(--color-risk-high)', bg: 'var(--color-risk-high-bg)' },
  moderate: { color: 'var(--color-risk-moderate)', bg: 'var(--color-risk-moderate-bg)' },
  low: { color: 'var(--color-risk-low)', bg: 'var(--color-risk-low-bg)' },
};

export default function RecommendationPanel({ recommendations = [], title = 'Recommended Actions' }) {
  return (
    <div className="glass-card p-5 border">
      <h3 className="section-title flex items-center gap-2 text-sm font-bold mb-4">
        <AlertTriangle size={16} className="text-[var(--color-risk-high)]" />
        <span className="text-[var(--color-text-primary)]">{title}</span>
      </h3>

      <div className="space-y-3">
        {recommendations.map((rec, index) => {
          const config = priorityConfig[rec.priority] || priorityConfig.moderate;

          return (
            <motion.div
              key={index}
              className="p-3.5 rounded-xl border-l-4 transition-colors hover:bg-[var(--color-bg-hover)] border"
              style={{
                background: 'var(--color-bg-tertiary)',
                borderLeftColor: config.color,
                borderColor: 'var(--color-border-secondary)',
              }}
              initial={{ opacity: 0, x: -12 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: index * 0.08 }}
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1.5">
                    <span
                      className="text-[0.6rem] font-black uppercase tracking-widest px-2 py-0.5 rounded-md border"
                      style={{
                        background: config.bg,
                        color: config.color,
                        borderColor: `${config.color}30`
                      }}
                    >
                      {rec.priority}
                    </span>
                    {rec.resource && (
                      <span className="text-xs font-bold text-[var(--color-text-secondary)]">
                        {rec.resource}
                      </span>
                    )}
                  </div>
                  <p className="text-sm font-bold text-[var(--color-text-primary)] mb-1 leading-snug">{rec.action}</p>
                  {rec.reason && (
                    <p className="text-xs font-medium text-[var(--color-text-secondary)] leading-relaxed">{rec.reason}</p>
                  )}
                </div>
                <ChevronRight size={16} className="text-[var(--color-text-secondary)] mt-1 flex-shrink-0" />
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
