import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Users, Hospital, GraduationCap, Route, Building2, Layers, ArrowDown } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import RiskBadge from '../../components/RiskBadge';
import { getRiskZones } from '../../services/mockApi';

export default function ImpactAnalysis() {
  const [zones, setZones] = useState([]);

  useEffect(() => {
    async function load() {
      const res = await getRiskZones();
      setZones(res.data.zones);
    }
    load();
  }, []);

  // Aggregate impact data
  const totalPop = zones.reduce((s, z) => s + z.population, 0);
  const totalHosp = zones.reduce((s, z) => s + z.hospitalsExposed, 0);
  const totalSchools = zones.reduce((s, z) => s + z.schoolsExposed, 0);
  const totalRoads = zones.reduce((s, z) => s + z.roadsAffected, 0);
  const totalBuildings = zones.reduce((s, z) => s + z.buildingsAffected, 0);

  const impactMetrics = [
    { icon: Users, label: 'Population Exposed', value: totalPop.toLocaleString(), color: '#8b5cf6' },
    { icon: Hospital, label: 'Hospitals Exposed', value: totalHosp, color: '#ef4444' },
    { icon: GraduationCap, label: 'Schools Exposed', value: totalSchools, color: '#f59e0b' },
    { icon: Route, label: 'Roads Affected', value: totalRoads, color: '#06b6d4' },
    { icon: Building2, label: 'Buildings Affected', value: totalBuildings, color: '#f97316' },
  ];

  const zoneChartData = zones.map((z) => ({
    name: z.name.split('—')[1]?.trim() || z.name,
    population: z.population,
    risk: z.riskScore,
    riskLevel: z.riskLevel,
  }));

  const riskBarColors = {
    critical: '#ef4444', high: '#f97316', moderate: '#eab308', low: '#22c55e',
  };

  return (
    <div className="page-container">
      <h1 className="page-title">Impact Analysis</h1>
      <p className="page-subtitle">Understanding who and what is affected — beyond risk mapping</p>

      {/* Hazard → Exposure → Impact Flow */}
      <motion.div
        className="glass-card p-6 mb-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h3 className="section-title mb-4">Decision Intelligence Pipeline</h3>
        <div className="flex flex-col md:flex-row items-center justify-center gap-4 md:gap-8">
          {[
            { label: 'HAZARD', desc: 'Where is the danger?', color: '#ef4444', sub: 'Flood risk zones, rainfall intensity, water levels' },
            { label: 'EXPOSURE', desc: 'What is at risk?', color: '#f97316', sub: 'Population, hospitals, schools, roads, buildings' },
            { label: 'IMPACT', desc: 'What is the consequence?', color: '#8b5cf6', sub: 'Casualties, displacement, infrastructure damage' },
          ].map((step, i) => (
            <div key={step.label} className="flex items-center gap-4">
              <div className="text-center flex-1">
                <div
                  className="w-14 h-14 rounded-xl flex items-center justify-center mx-auto mb-2"
                  style={{ background: `${step.color}15`, border: `1px solid ${step.color}30` }}
                >
                  <span className="text-lg font-bold" style={{ color: step.color }}>{i + 1}</span>
                </div>
                <div className="text-sm font-bold text-[var(--color-text-primary)] mb-1">{step.label}</div>
                <div className="text-xs text-[var(--color-accent-blue)] font-medium mb-1">{step.desc}</div>
                <div className="text-[0.65rem] text-[var(--color-text-muted)] max-w-[200px] mx-auto">{step.sub}</div>
              </div>
              {i < 2 && (
                <div className="hidden md:block">
                  <ArrowDown size={20} className="text-[var(--color-text-muted)] rotate-[-90deg]" />
                </div>
              )}
            </div>
          ))}
        </div>
        <div className="mt-4 p-3 rounded-lg bg-[var(--color-bg-tertiary)] text-center">
          <p className="text-xs text-[var(--color-text-secondary)] italic">
            "Risk alone is not enough. Impact analysis reveals the real-world consequences of hazard exposure."
          </p>
        </div>
      </motion.div>

      {/* Impact Metrics */}
      <div className="grid-kpi mb-6">
        {impactMetrics.map((metric, i) => (
          <motion.div
            key={metric.label}
            className="kpi-card p-4 relative overflow-hidden"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.08 }}
          >
            <div className="absolute top-0 left-0 right-0 h-[2px]" style={{ background: metric.color }} />
            <div className="flex items-center gap-2 mb-2">
              <metric.icon size={16} style={{ color: metric.color }} />
              <span className="text-[0.65rem] text-[var(--color-text-muted)] uppercase tracking-wider">{metric.label}</span>
            </div>
            <span className="text-2xl font-bold font-mono text-[var(--color-text-primary)]">{metric.value}</span>
          </motion.div>
        ))}
      </div>

      {/* Charts */}
      <div className="grid md:grid-cols-2 gap-6 mb-6">
        {/* Population by Zone */}
        <div className="glass-card p-4">
          <h3 className="section-title">Population Exposure by Zone</h3>
          <div style={{ height: 280 }}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={zoneChartData} margin={{ top: 8, right: 8, left: -10, bottom: 4 }}>
                <XAxis dataKey="name" tick={{ fontSize: 9, fill: 'var(--color-text-muted)' }} axisLine={false} />
                <YAxis tick={{ fontSize: 9, fill: 'var(--color-text-muted)' }} axisLine={false} tickFormatter={(v) => v >= 1000 ? `${v / 1000}K` : v} />
                <Tooltip
                  contentStyle={{
                    background: 'var(--color-bg-elevated)', border: '1px solid var(--color-border-primary)',
                    borderRadius: '6px', fontSize: '12px', color: 'var(--color-text-primary)',
                  }}
                  formatter={(v) => [v.toLocaleString(), 'Population']}
                />
                <Bar dataKey="population" radius={[4, 4, 0, 0]} barSize={28}>
                  {zoneChartData.map((entry, i) => (
                    <Cell key={i} fill={riskBarColors[entry.riskLevel] || '#3b82f6'} fillOpacity={0.7} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Risk Score by Zone */}
        <div className="glass-card p-4">
          <h3 className="section-title">Risk Score by Zone</h3>
          <div style={{ height: 280 }}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={zoneChartData} margin={{ top: 8, right: 8, left: -10, bottom: 4 }}>
                <XAxis dataKey="name" tick={{ fontSize: 9, fill: 'var(--color-text-muted)' }} axisLine={false} />
                <YAxis domain={[0, 100]} tick={{ fontSize: 9, fill: 'var(--color-text-muted)' }} axisLine={false} />
                <Tooltip
                  contentStyle={{
                    background: 'var(--color-bg-elevated)', border: '1px solid var(--color-border-primary)',
                    borderRadius: '6px', fontSize: '12px', color: 'var(--color-text-primary)',
                  }}
                />
                <Bar dataKey="risk" radius={[4, 4, 0, 0]} barSize={28}>
                  {zoneChartData.map((entry, i) => (
                    <Cell key={i} fill={riskBarColors[entry.riskLevel] || '#3b82f6'} fillOpacity={0.8} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Zone Impact Table */}
      <div className="glass-card p-4 overflow-x-auto">
        <h3 className="section-title">Zone-wise Impact Summary</h3>
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-[var(--color-border-secondary)]">
              <th className="text-left py-2 px-3 text-xs font-medium text-[var(--color-text-muted)] uppercase">Zone</th>
              <th className="text-center py-2 px-3 text-xs font-medium text-[var(--color-text-muted)] uppercase">Risk</th>
              <th className="text-right py-2 px-3 text-xs font-medium text-[var(--color-text-muted)] uppercase">Population</th>
              <th className="text-right py-2 px-3 text-xs font-medium text-[var(--color-text-muted)] uppercase hidden md:table-cell">Hospitals</th>
              <th className="text-right py-2 px-3 text-xs font-medium text-[var(--color-text-muted)] uppercase hidden md:table-cell">Schools</th>
              <th className="text-right py-2 px-3 text-xs font-medium text-[var(--color-text-muted)] uppercase">Roads</th>
              <th className="text-right py-2 px-3 text-xs font-medium text-[var(--color-text-muted)] uppercase hidden lg:table-cell">Buildings</th>
            </tr>
          </thead>
          <tbody>
            {zones.map((z) => (
              <tr key={z.id} className="border-b border-[var(--color-border-secondary)] hover:bg-[var(--color-bg-hover)] transition-colors">
                <td className="py-2.5 px-3 font-medium text-[var(--color-text-primary)]">{z.name}</td>
                <td className="py-2.5 px-3 text-center"><RiskBadge level={z.riskLevel} size="sm" /></td>
                <td className="py-2.5 px-3 text-right font-mono text-[var(--color-text-secondary)]">{z.population.toLocaleString()}</td>
                <td className="py-2.5 px-3 text-right font-mono text-[var(--color-text-secondary)] hidden md:table-cell">{z.hospitalsExposed}</td>
                <td className="py-2.5 px-3 text-right font-mono text-[var(--color-text-secondary)] hidden md:table-cell">{z.schoolsExposed}</td>
                <td className="py-2.5 px-3 text-right font-mono text-[var(--color-text-secondary)]">{z.roadsAffected}</td>
                <td className="py-2.5 px-3 text-right font-mono text-[var(--color-text-secondary)] hidden lg:table-cell">{z.buildingsAffected}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
