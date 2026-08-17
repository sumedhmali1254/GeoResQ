import { useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import { FlaskConical, MapPin, CloudRain, ArrowRight, AlertTriangle, TrendingUp, Zap } from 'lucide-react';
import RiskGauge from '../../components/RiskGauge';
import RecommendationPanel from '../../components/RecommendationPanel';
import { getSimulationState, simulationDefaults } from '../../data/simulation';

export default function Simulator() {
  const [rainfall, setRainfall] = useState(simulationDefaults.rainfallDefault);
  const currentState = getSimulationState(simulationDefaults.rainfallDefault);
  const simState = getSimulationState(rainfall);

  const comparisonMetrics = [
    { label: 'Risk Score', current: currentState.riskScore, simulated: simState.riskScore, unit: '/100', icon: '🎯' },
    { label: 'Population Exposed', current: currentState.populationExposed, simulated: simState.populationExposed, unit: '', format: true, icon: '👥' },
    { label: 'Roads Affected', current: currentState.roadsAffected, simulated: simState.roadsAffected, unit: '', icon: '🛣️' },
    { label: 'Hospitals Exposed', current: currentState.hospitalsExposed, simulated: simState.hospitalsExposed, unit: '', icon: '🏥' },
    { label: 'Shelters Required', current: currentState.sheltersRequired, simulated: simState.sheltersRequired, unit: '', icon: '🏠' },
    { label: 'Water Level', current: currentState.waterLevel, simulated: simState.waterLevel, unit: 'm', icon: '🌊' },
  ];

  const getDelta = (current, simulated) => {
    const diff = simulated - current;
    if (diff === 0) return null;
    return diff > 0 ? `+${typeof simulated === 'number' && simulated > 999 ? (diff).toLocaleString() : diff}` : `${diff}`;
  };

  const recommendations = simState.recommendations.map((rec, i) => ({
    priority: i === 0 ? 'critical' : i < 3 ? 'high' : 'moderate',
    action: rec,
    reason: '',
  }));

  const rainfallPercent = ((rainfall - simulationDefaults.rainfallMin) / (simulationDefaults.rainfallMax - simulationDefaults.rainfallMin)) * 100;

  return (
    <div className="page-container">
      {/* Header */}
      <div className="flex items-center gap-3 mb-1">
        <div className="w-10 h-10 rounded-xl flex items-center justify-center"
          style={{ background: 'rgba(139, 92, 246, 0.15)', border: '1px solid rgba(139, 92, 246, 0.3)' }}>
          <FlaskConical size={20} className="text-[var(--color-accent-purple)]" />
        </div>
        <div>
          <h1 className="page-title mb-0">Disaster Decision Simulator</h1>
          <p className="text-sm text-[var(--color-text-secondary)]">
            Test what happens before the situation gets worse
          </p>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-6 mt-6">
        {/* Control Panel — Left Col */}
        <div className="space-y-4">
          {/* Location & Disaster */}
          <div className="glass-card p-4">
            <h3 className="section-title">Simulation Parameters</h3>
            <div className="space-y-3">
              <div>
                <label className="text-xs text-[var(--color-text-muted)] uppercase tracking-wider mb-1.5 block">Location</label>
                <div className="flex items-center gap-2 px-3 py-2.5 rounded-lg bg-[var(--color-bg-input)] border border-[var(--color-border-primary)]">
                  <MapPin size={14} className="text-[var(--color-accent-blue)]" />
                  <span className="text-sm text-[var(--color-text-primary)] font-medium">{simulationDefaults.location}</span>
                </div>
              </div>
              <div>
                <label className="text-xs text-[var(--color-text-muted)] uppercase tracking-wider mb-1.5 block">Disaster Type</label>
                <div className="flex items-center gap-2 px-3 py-2.5 rounded-lg bg-[var(--color-bg-input)] border border-[var(--color-border-primary)]">
                  <CloudRain size={14} className="text-[var(--color-accent-cyan)]" />
                  <span className="text-sm text-[var(--color-text-primary)] font-medium">{simulationDefaults.disaster}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Rainfall Slider */}
          <div className="glass-card p-4">
            <h3 className="section-title">Rainfall Intensity</h3>
            <div className="mb-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs text-[var(--color-text-muted)]">{simulationDefaults.rainfallMin}mm</span>
                <span className="text-lg font-bold font-mono text-[var(--color-text-primary)]">
                  {rainfall}<span className="text-xs font-normal text-[var(--color-text-muted)] ml-1">mm/hr</span>
                </span>
                <span className="text-xs text-[var(--color-text-muted)]">{simulationDefaults.rainfallMax}mm</span>
              </div>

              {/* Custom Slider */}
              <div className="relative h-6 flex items-center">
                <div className="absolute inset-x-0 h-2 rounded-full bg-[var(--color-bg-elevated)]">
                  <div
                    className="h-full rounded-full transition-all duration-200"
                    style={{
                      width: `${rainfallPercent}%`,
                      background: rainfall > 150 ? 'linear-gradient(90deg, #eab308, #ef4444)'
                        : rainfall > 100 ? 'linear-gradient(90deg, #22c55e, #eab308)'
                        : 'linear-gradient(90deg, #22c55e, #3b82f6)',
                    }}
                  />
                </div>
                <input
                  type="range"
                  min={simulationDefaults.rainfallMin}
                  max={simulationDefaults.rainfallMax}
                  step={5}
                  value={rainfall}
                  onChange={(e) => setRainfall(Number(e.target.value))}
                  className="absolute inset-0 w-full opacity-0 cursor-pointer z-10"
                />
                <div
                  className="absolute w-5 h-5 rounded-full bg-white shadow-lg border-2 border-[var(--color-accent-blue)] pointer-events-none transition-all duration-200"
                  style={{ left: `calc(${rainfallPercent}% - 10px)` }}
                />
              </div>

              {/* Scale markers */}
              <div className="flex justify-between mt-2 text-[0.55rem] text-[var(--color-text-muted)]">
                <span>Light</span>
                <span>Moderate</span>
                <span>Heavy</span>
                <span>Extreme</span>
              </div>
            </div>

            {/* Drainage Load */}
            <div className="mt-4">
              <div className="flex justify-between text-xs mb-1">
                <span className="text-[var(--color-text-muted)]">Drainage Load</span>
                <span className="font-mono text-[var(--color-text-secondary)]">{simState.drainageLoad}%</span>
              </div>
              <div className="h-2 rounded-full bg-[var(--color-bg-elevated)] overflow-hidden">
                <motion.div
                  className="h-full rounded-full"
                  style={{
                    background: simState.drainageLoad > 90 ? '#ef4444' : simState.drainageLoad > 70 ? '#f97316' : '#22c55e',
                  }}
                  animate={{ width: `${simState.drainageLoad}%` }}
                  transition={{ duration: 0.5 }}
                />
              </div>
            </div>
          </div>

          {/* Risk Gauge */}
          <div className="glass-card p-4 flex justify-center">
            <RiskGauge score={simState.riskScore} size={140} label="Simulated Risk" />
          </div>
        </div>

        {/* Comparison Panel — Center + Right */}
        <div className="lg:col-span-2 space-y-4">
          {/* Comparison Header */}
          <div className="glass-card p-4">
            <div className="flex items-center gap-4 mb-4">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-[var(--color-accent-blue)]" />
                <span className="text-xs font-semibold text-[var(--color-text-secondary)]">CURRENT STATE (80mm)</span>
              </div>
              <ArrowRight size={16} className="text-[var(--color-text-muted)]" />
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-[var(--color-accent-purple)]" />
                <span className="text-xs font-semibold text-[var(--color-text-secondary)]">SIMULATED STATE ({rainfall}mm)</span>
              </div>
            </div>

            {/* Comparison Grid */}
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {comparisonMetrics.map((metric, i) => {
                const delta = getDelta(metric.current, metric.simulated);
                const isWorse = metric.simulated > metric.current;
                const isSame = metric.simulated === metric.current;
                const formatVal = (v) => metric.format ? v.toLocaleString() : v;

                return (
                  <motion.div
                    key={metric.label}
                    className="p-3 rounded-lg relative overflow-hidden"
                    style={{
                      background: 'var(--color-bg-tertiary)',
                      borderLeft: `2px solid ${isWorse && !isSame ? 'var(--color-risk-high)' : isSame ? 'var(--color-text-muted)' : 'var(--color-risk-low)'}`,
                    }}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: i * 0.05 }}
                  >
                    <div className="text-[0.65rem] text-[var(--color-text-muted)] uppercase tracking-wider mb-2 flex items-center gap-1.5">
                      <span>{metric.icon}</span> {metric.label}
                    </div>
                    <div className="flex items-end gap-2">
                      <span className="text-sm font-mono text-[var(--color-text-muted)]">
                        {formatVal(metric.current)}{metric.unit}
                      </span>
                      <ArrowRight size={12} className="text-[var(--color-text-muted)] mb-0.5" />
                      <motion.span
                        className="text-lg font-bold font-mono text-[var(--color-text-primary)]"
                        key={metric.simulated}
                        initial={{ scale: 1.2 }}
                        animate={{ scale: 1 }}
                      >
                        {formatVal(metric.simulated)}{metric.unit}
                      </motion.span>
                    </div>
                    {delta && (
                      <span
                        className="text-[0.65rem] font-mono font-medium mt-1 inline-block"
                        style={{ color: isWorse ? 'var(--color-risk-high)' : 'var(--color-risk-low)' }}
                      >
                        {delta}
                      </span>
                    )}
                  </motion.div>
                );
              })}
            </div>
          </div>

          {/* Recommended Actions */}
          <RecommendationPanel
            recommendations={recommendations}
            title={`Recommended Actions (at ${rainfall}mm/hr)`}
          />

          {/* Context Note */}
          <div className="glass-card-subtle p-4">
            <div className="flex items-start gap-2">
              <AlertTriangle size={14} className="text-[var(--color-risk-moderate)] mt-0.5 flex-shrink-0" />
              <p className="text-xs text-[var(--color-text-secondary)] leading-relaxed">
                Simulation results are based on hydrological models, terrain analysis, historical flood data, and infrastructure mapping.
                These projections help authorities prepare response plans before conditions worsen.
                Actual outcomes may vary based on real-time conditions.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
