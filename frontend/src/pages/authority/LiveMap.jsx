import { useState, useEffect } from 'react';
import MapView from '../../components/Map/MapView';
import MapLayers from '../../components/Map/MapLayers';
import LayerControl from '../../components/Map/LayerControl';
import ZoneDetails from '../../components/ZoneDetails';
import { useDisaster } from '../../context/DisasterContext';
import { getRiskZones, getIncidents } from '../../services/mockApi';

export default function LiveMap() {
  const { selectedZone, setSelectedZone, activeFilters, toggleLayer } = useDisaster();
  const [mapData, setMapData] = useState({ zones: [], hospitals: [], shelters: [] });
  const [incidents, setIncidents] = useState([]);

  useEffect(() => {
    async function load() {
      const [mapRes, incRes] = await Promise.all([getRiskZones(), getIncidents()]);
      setMapData(mapRes.data);
      setIncidents(incRes.data.incidents);
    }
    load();
  }, []);

  return (
    <div className="relative" style={{ height: 'calc(100vh - var(--spacing-header))' }}>
      {/* Full-screen Map */}
      <MapView>
        <MapLayers
          zones={mapData.zones}
          hospitals={mapData.hospitals}
          shelters={mapData.shelters}
          incidents={incidents}
          activeLayers={activeFilters.layers}
          selectedZone={selectedZone}
          onZoneClick={setSelectedZone}
        />
      </MapView>

      {/* Layer Control - top right */}
      <div className="absolute top-4 right-4 z-20">
        <LayerControl
          activeLayers={activeFilters.layers}
          onToggle={toggleLayer}
        />
      </div>

      {/* Zone Details Panel */}
      {selectedZone && (
        <ZoneDetails
          zone={selectedZone}
          onClose={() => setSelectedZone(null)}
        />
      )}

      {/* Map Legend - bottom left */}
      <div className="absolute bottom-6 left-4 z-20 glass-card p-3">
        <div className="text-[0.6rem] font-semibold text-[var(--color-text-muted)] uppercase tracking-wider mb-2">
          Risk Level
        </div>
        <div className="flex flex-col gap-1.5">
          {[
            { label: 'Critical', color: '#ef4444' },
            { label: 'High', color: '#f97316' },
            { label: 'Moderate', color: '#eab308' },
            { label: 'Low', color: '#22c55e' },
          ].map((level) => (
            <div key={level.label} className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-sm" style={{ background: level.color, opacity: 0.6 }} />
              <span className="text-[0.65rem] text-[var(--color-text-secondary)]">{level.label}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
