import { useState, useEffect } from 'react';
import MapView from '../../components/Map/MapView';
import MapLayers from '../../components/Map/MapLayers';
import LayerControl from '../../components/Map/LayerControl';
import HeatmapLayer from '../../components/Map/HeatmapLayer';
import HeatmapToggle from '../../components/Map/HeatmapToggle';
import ZoneDetails from '../../components/ZoneDetails';
import { useDisaster } from '../../context/DisasterContext';
import { getRiskZones, getIncidents } from '../../services/mockApi';

export default function LiveMap() {
  const { selectedZone, setSelectedZone, activeFilters, toggleLayer } = useDisaster();
  const [mapData, setMapData] = useState({ zones: [], hospitals: [], shelters: [], waterBodies: [] });
  const [incidents, setIncidents] = useState([]);
  const [showHeatmap, setShowHeatmap] = useState(false);

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
          waterBodies={mapData.waterBodies || []}
          activeLayers={activeFilters.layers}
          selectedZone={selectedZone}
          onZoneClick={setSelectedZone}
        />
        <HeatmapLayer visible={showHeatmap} />
      </MapView>

      {/* Heatmap Toggle — top center */}
      <div className="absolute top-4 left-1/2 -translate-x-1/2 z-[1000]">
        <HeatmapToggle
          isHeatmap={showHeatmap}
          onToggle={() => setShowHeatmap(!showHeatmap)}
        />
      </div>

      {/* Layer Control - top right */}
      <div className="absolute top-4 right-4 z-[1000]">
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
      <div className="absolute bottom-6 left-4 z-[1000] glass-card p-3">
        <div className="text-[0.6rem] font-semibold text-[var(--color-text-muted)] uppercase tracking-wider mb-2">
          {showHeatmap ? 'Thermal Intensity' : 'Risk Level'}
        </div>
        <div className="flex flex-col gap-1.5">
          {showHeatmap ? (
            <>
              {[
                { label: 'Extreme', color: '#ff0000' },
                { label: 'High', color: '#ff4500' },
                { label: 'Moderate', color: '#ffa500' },
                { label: 'Low', color: '#ffff00' },
                { label: 'Minimal', color: '#00ff00' },
              ].map((level) => (
                <div key={level.label} className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-sm" style={{ background: level.color, opacity: 0.8 }} />
                  <span className="text-[0.65rem] text-[var(--color-text-secondary)]">{level.label}</span>
                </div>
              ))}
            </>
          ) : (
            <>
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
            </>
          )}
        </div>
      </div>
    </div>
  );
}
