import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Filter } from 'lucide-react';
import FacilityCard from '../../components/FacilityCard';
import { getNearbyFacilities } from '../../services/mockApi';

const typeFilters = ['all', 'official_shelter', 'potential_facility'];
const typeLabels = { all: 'All Facilities', official_shelter: 'Official Shelters', potential_facility: 'Potential Facilities' };

export default function Facilities() {
  const [facilities, setFacilities] = useState([]);
  const [filter, setFilter] = useState('all');
  const [sortBy, setSortBy] = useState('suitability');

  useEffect(() => {
    async function load() {
      const res = await getNearbyFacilities();
      setFacilities(res.data);
    }
    load();
  }, []);

  const filtered = facilities
    .filter((f) => filter === 'all' || f.type === filter)
    .sort((a, b) => {
      if (sortBy === 'suitability') return b.suitabilityScore - a.suitabilityScore;
      if (sortBy === 'distance') return a.distanceKm - b.distanceKm;
      if (sortBy === 'capacity') return b.capacityValue - a.capacityValue;
      return 0;
    });

  const officialCount = facilities.filter((f) => f.type === 'official_shelter').length;
  const potentialCount = facilities.filter((f) => f.type === 'potential_facility').length;

  return (
    <div className="page-container">
      <h1 className="page-title">Emergency Facilities Intelligence</h1>
      <p className="page-subtitle">
        Dynamic facility assessment with suitability scoring — not every facility is an official shelter
      </p>

      {/* Summary Stats */}
      <div className="flex flex-wrap items-center gap-4 mb-6">
        <div className="glass-card-subtle px-4 py-2.5 flex items-center gap-2">
          <div className="w-2.5 h-2.5 rounded-full bg-[var(--color-risk-low)]" />
          <span className="text-sm text-[var(--color-text-primary)]">{officialCount} Official Shelters</span>
        </div>
        <div className="glass-card-subtle px-4 py-2.5 flex items-center gap-2">
          <div className="w-2.5 h-2.5 rounded-full bg-[var(--color-risk-moderate)]" />
          <span className="text-sm text-[var(--color-text-primary)]">{potentialCount} Potential Facilities</span>
        </div>
        <div className="glass-card-subtle px-4 py-2.5">
          <span className="text-sm text-[var(--color-text-secondary)]">
            Total Capacity: <strong className="text-[var(--color-text-primary)]">
              {facilities.reduce((s, f) => s + f.capacityValue, 0).toLocaleString()}
            </strong>
          </span>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap items-center gap-3 mb-6">
        <Filter size={14} className="text-[var(--color-text-muted)]" />
        {typeFilters.map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`text-xs font-medium px-3 py-1.5 rounded-full border transition-all cursor-pointer ${
              filter === f
                ? 'bg-[var(--color-accent-blue)] text-white border-[var(--color-accent-blue)]'
                : 'bg-transparent text-[var(--color-text-muted)] border-[var(--color-border-primary)] hover:border-[var(--color-text-muted)]'
            }`}
          >
            {typeLabels[f]}
          </button>
        ))}
        <span className="text-[var(--color-text-muted)] text-xs mx-2">|</span>
        <span className="text-xs text-[var(--color-text-muted)]">Sort:</span>
        {['suitability', 'distance', 'capacity'].map((s) => (
          <button
            key={s}
            onClick={() => setSortBy(s)}
            className={`text-xs px-2.5 py-1 rounded border transition-all cursor-pointer ${
              sortBy === s
                ? 'bg-[var(--color-bg-elevated)] text-[var(--color-text-primary)] border-[var(--color-border-accent)]'
                : 'bg-transparent text-[var(--color-text-muted)] border-[var(--color-border-secondary)]'
            }`}
          >
            {s.charAt(0).toUpperCase() + s.slice(1)}
          </button>
        ))}
      </div>

      {/* Facility Cards */}
      <div className="grid-cards">
        {filtered.map((facility, i) => (
          <FacilityCard key={facility.id} facility={facility} index={i} />
        ))}
      </div>
    </div>
  );
}
