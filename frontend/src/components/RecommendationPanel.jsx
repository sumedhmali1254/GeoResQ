import { useState } from 'react';
import { motion } from 'framer-motion';
import { AlertTriangle, ChevronRight, ChevronDown, ChevronUp } from 'lucide-react';

const priorityConfig = {
  critical: { color: 'var(--color-risk-critical)', bg: 'var(--color-risk-critical-bg)' },
  high: { color: 'var(--color-risk-high)', bg: 'var(--color-risk-high-bg)' },
  moderate: { color: 'var(--color-risk-moderate)', bg: 'var(--color-risk-moderate-bg)' },
  low: { color: 'var(--color-risk-low)', bg: 'var(--color-risk-low-bg)' },
};

export default function RecommendationPanel({ recommendations = [], title = 'Recommended Actions' }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const initialCount = 3;
  const hasMore = recommendations.length > initialCount;
  
  const visibleRecommendations = isExpanded ? recommendations : recommendations.slice(0, initialCount);

  return (
    <div className="glass-card p-5 border flex flex-col">
      <h3 className="section-title flex items-center gap-2 text-sm font-bold mb-4">
        <AlertTriangle size={16} className="text-[var(--color-risk-high)]" />
        <span className="text-[var(--color-text-primary)]">{title}</span>
      </h3>

      <div className={`space-y-3 ${isExpanded && recommendations.length > 5 ? 'max-h-[400px] overflow-y-auto pr-2 custom-scrollbar' : ''}`}>
          {visibleRecommendations.map((rec, index) => {
            const config = priorityConfig[rec.priority] || priorityConfig.moderate;

            return (
              <motion.div
                key={rec.id || index}
                className="p-3.5 rounded-xl border-l-4 transition-colors hover:bg-[var(--color-bg-hover)] border"
                style={{
                  background: 'var(--color-bg-tertiary)',
                  borderLeftColor: config.color,
                  borderColor: 'var(--color-border-secondary)',
                }}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.2, delay: (index % 5) * 0.05 }}
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
      
      {hasMore && (
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="mt-4 flex items-center justify-center gap-2 w-full py-2.5 bg-slate-100/50 hover:bg-slate-200/50 text-slate-700 text-xs font-bold rounded-lg transition-colors border border-slate-200"
        >
          {isExpanded ? (
            <>
              <span>Show Less</span>
              <ChevronUp size={14} />
            </>
          ) : (
            <>
              <span>View All {recommendations.length} Recommendations</span>
              <ChevronDown size={14} />
            </>
          )}
        </button>
      )}
    </div>
  );
}
