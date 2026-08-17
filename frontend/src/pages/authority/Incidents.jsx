import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Filter, Search } from 'lucide-react';
import IncidentCard from '../../components/IncidentCard';
import { getIncidents } from '../../services/mockApi';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, AreaChart, Area, XAxis, YAxis, CartesianGrid } from 'recharts';

const severityFilters = ['all', 'critical', 'high', 'moderate', 'low'];

export default function Incidents() {
  const [incidents, setIncidents] = useState([]);
  const [distribution, setDistribution] = useState([]);
  const [timeline, setTimeline] = useState([]);
  const [filter, setFilter] = useState('all');
  const [search, setSearch] = useState('');

  useEffect(() => {
    async function load() {
      const res = await getIncidents();
      setIncidents(res.data.incidents);
      setDistribution(res.data.severityDistribution);
      setTimeline(res.data.timeline);
    }
    load();
  }, []);

  const filtered = incidents
    .filter((i) => filter === 'all' || i.severity === filter)
    .filter((i) => search === '' || i.type.toLowerCase().includes(search.toLowerCase()) || i.location.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="page-container">
      <h1 className="page-title">Incident Intelligence</h1>
      <p className="page-subtitle">Ground-truth monitoring with confidence-aware verification</p>

      {/* Charts Row */}
      <div className="grid md:grid-cols-2 gap-6 mb-6">
        {/* Severity Distribution */}
        <div className="glass-card p-4">
          <h3 className="section-title">Severity Distribution</h3>
          <div style={{ height: 180 }}>
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={distribution}
                  cx="50%"
                  cy="50%"
                  innerRadius={50}
                  outerRadius={75}
                  paddingAngle={4}
                  dataKey="value"
                >
                  {distribution.map((entry, i) => (
                    <Cell key={i} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    background: 'var(--color-bg-elevated)',
                    border: '1px solid var(--color-border-primary)',
                    borderRadius: '6px',
                    fontSize: '12px',
                    color: 'var(--color-text-primary)',
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="flex justify-center gap-4 mt-2">
            {distribution.map((d) => (
              <div key={d.name} className="flex items-center gap-1.5 text-xs">
                <div className="w-2.5 h-2.5 rounded-full" style={{ background: d.color }} />
                <span className="text-[var(--color-text-muted)]">{d.name}: {d.value}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Timeline */}
        <div className="glass-card p-4">
          <h3 className="section-title">Incident Timeline (Today)</h3>
          <div style={{ height: 180 }}>
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={timeline} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border-secondary)" />
                <XAxis dataKey="time" tick={{ fontSize: 10, fill: 'var(--color-text-muted)' }} axisLine={false} />
                <YAxis tick={{ fontSize: 10, fill: 'var(--color-text-muted)' }} axisLine={false} />
                <Tooltip
                  contentStyle={{
                    background: 'var(--color-bg-elevated)',
                    border: '1px solid var(--color-border-primary)',
                    borderRadius: '6px',
                    fontSize: '12px',
                    color: 'var(--color-text-primary)',
                  }}
                />
                <Area type="monotone" dataKey="incidents" stroke="#3b82f6" fill="#3b82f6" fillOpacity={0.15} strokeWidth={2} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap items-center gap-3 mb-6">
        <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-[var(--color-bg-card)] border border-[var(--color-border-primary)] flex-1 max-w-xs">
          <Search size={14} className="text-[var(--color-text-muted)]" />
          <input
            type="text"
            placeholder="Search incidents..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="bg-transparent border-none outline-none text-sm text-[var(--color-text-primary)] w-full placeholder:text-[var(--color-text-muted)]"
          />
        </div>
        <div className="flex items-center gap-1.5">
          <Filter size={14} className="text-[var(--color-text-muted)]" />
          {severityFilters.map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`text-xs font-medium px-3 py-1.5 rounded-full border transition-all cursor-pointer ${
                filter === f
                  ? 'bg-[var(--color-accent-blue)] text-white border-[var(--color-accent-blue)]'
                  : 'bg-transparent text-[var(--color-text-muted)] border-[var(--color-border-primary)] hover:border-[var(--color-text-muted)]'
              }`}
            >
              {f === 'all' ? 'All' : f.charAt(0).toUpperCase() + f.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {/* Incident Cards */}
      <div className="grid-cards">
        {filtered.map((incident, i) => (
          <IncidentCard key={incident.id} incident={incident} index={i} />
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="text-center py-16 text-[var(--color-text-muted)]">
          <p className="text-sm">No incidents match the current filters.</p>
        </div>
      )}
    </div>
  );
}
