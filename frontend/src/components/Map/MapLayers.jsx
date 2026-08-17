import { Marker, Popup, CircleMarker, Polyline } from 'react-leaflet';
import L from 'leaflet';
import ZonePolygon from './ZonePolygon';

// Custom icon factory
function createIcon(emoji, size = 24) {
  return L.divIcon({
    html: `<div style="font-size:${size}px;line-height:1;filter:drop-shadow(0 2px 4px rgba(0,0,0,0.5))">${emoji}</div>`,
    className: 'custom-marker',
    iconSize: [size, size],
    iconAnchor: [size / 2, size / 2],
  });
}

const hospitalIcon = createIcon('🏥', 22);
const shelterIcon = createIcon('🏠', 20);
const incidentIcon = createIcon('⚠️', 20);

export default function MapLayers({
  zones = [],
  hospitals = [],
  shelters = [],
  incidents = [],
  waterBodies = [],
  activeLayers = [],
  selectedZone,
  onZoneClick,
}) {
  return (
    <>
      {/* Flood Risk Zones */}
      {activeLayers.includes('floodRisk') &&
        zones.map((zone) => (
          <ZonePolygon
            key={zone.id}
            zone={zone}
            isSelected={selectedZone?.id === zone.id}
            onClick={onZoneClick}
          />
        ))}

      {/* Hospitals */}
      {activeLayers.includes('hospitals') &&
        hospitals.map((h) => (
          <Marker key={h.id} position={[h.lat, h.lng]} icon={hospitalIcon}>
            <Popup>
              <div className="text-xs min-w-[160px]">
                <div className="font-semibold text-sm mb-1">{h.name}</div>
                <div>Beds: <strong>{h.beds}</strong></div>
                <div>Flood Exposure: <strong className={h.exposed ? 'text-red-400' : 'text-green-400'}>{h.exposed ? 'Yes' : 'No'}</strong></div>
              </div>
            </Popup>
          </Marker>
        ))}

      {/* Shelters */}
      {activeLayers.includes('shelters') &&
        shelters.map((s) => (
          <Marker key={s.id} position={[s.lat, s.lng]} icon={shelterIcon}>
            <Popup>
              <div className="text-xs min-w-[140px]">
                <div className="font-semibold text-sm mb-1">{s.name}</div>
                <div>Capacity: <strong>{s.capacity}</strong></div>
                <div>Type: {s.type === 'official' ? '✅ Official' : '🔶 Potential'}</div>
                <div>Status: <strong>{s.status}</strong></div>
              </div>
            </Popup>
          </Marker>
        ))}

      {/* Citizen Incidents */}
      {activeLayers.includes('alerts') &&
        incidents.map((inc) => (
          <Marker key={inc.id} position={[inc.lat, inc.lng]} icon={incidentIcon}>
            <Popup>
              <div className="text-xs min-w-[160px]">
                <div className="font-semibold text-sm mb-1">{inc.type}</div>
                <div>{inc.id} · {inc.reportCount} reports</div>
                <div>Confidence: <strong>{inc.confidence}%</strong></div>
              </div>
            </Popup>
          </Marker>
        ))}

      {/* Water Bodies */}
      {activeLayers.includes('waterBodies') &&
        waterBodies.map((wb) =>
          wb.type === 'river' ? (
            <Polyline
              key={wb.id}
              positions={wb.coordinates}
              pathOptions={{
                color: '#3b82f6',
                weight: 3,
                opacity: 0.6,
                dashArray: '8 4',
              }}
            />
          ) : (
            <CircleMarker
              key={wb.id}
              center={wb.center}
              radius={15}
              pathOptions={{
                color: '#3b82f6',
                fillColor: '#3b82f6',
                fillOpacity: 0.2,
                weight: 1,
              }}
            />
          )
        )}
    </>
  );
}
