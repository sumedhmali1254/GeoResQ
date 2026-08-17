import { Marker, Popup, CircleMarker, Polyline, Circle } from 'react-leaflet';
import L from 'leaflet';
import ZonePolygon from './ZonePolygon';

function createSvgMarker(type, color, size = 32) {
  let svgContent = '';

  if (type === 'hospital') {
    svgContent = `<path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-2 10h-4v4h-2v-4H7v-2h4V7h2v4h4v2z" fill="currentColor"/>`;
  } else if (type === 'shelter') {
    svgContent = `<path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" fill="currentColor"/>`;
  } else if (type === 'incident') {
    svgContent = `<path d="M1 21h22L12 2 1 21zm12-3h-2v-2h2v2zm0-4h-2v-4h2v4z" fill="currentColor"/>`;
  }

  const htmlContent = `
    <div class="marker-pin" style="--marker-color: ${color}; width: ${size}px; height: ${size}px; margin: -${size / 2}px 0 0 -${size / 2}px;">
      <div class="marker-icon-wrap" style="width: ${Math.round(size * 0.62)}px; height: ${Math.round(size * 0.62)}px;">
        <svg viewBox="0 0 24 24" class="marker-svg" style="display: block; width: ${Math.round(size * 0.4)}px; height: ${Math.round(size * 0.4)}px;">
          ${svgContent}
        </svg>
      </div>
    </div>
  `;

  return L.divIcon({
    html: htmlContent,
    className: 'custom-leaflet-marker',
    iconSize: [size, size],
    iconAnchor: [size / 2, size],
    popupAnchor: [0, -size + 2],
  });
}

const hospitalIcon = createSvgMarker('hospital', '#2563eb');
const shelterIcon = createSvgMarker('shelter', '#10b981');
const incidentIcon = createSvgMarker('incident', '#ef4444');
const compactHospitalIcon = createSvgMarker('hospital', '#2563eb', 24);
const compactShelterIcon = createSvgMarker('shelter', '#10b981', 24);
const compactIncidentIcon = createSvgMarker('incident', '#ef4444', 26);

const severityColors = {
  critical: { stroke: '#dc2626', fill: '#ef4444' },
  high: { stroke: '#ea580c', fill: '#f97316' },
  moderate: { stroke: '#d97706', fill: '#eab308' },
};

export default function MapLayers({
  zones = [],
  hospitals = [],
  shelters = [],
  incidents = [],
  waterBodies = [],
  activeLayers = [],
  selectedZone,
  onZoneClick,
  compact = false,
}) {
  const hospitalMarker = compact ? compactHospitalIcon : hospitalIcon;
  const shelterMarker = compact ? compactShelterIcon : shelterIcon;
  const incidentMarker = compact ? compactIncidentIcon : incidentIcon;

  return (
    <>
      {activeLayers.includes('floodRisk') &&
        zones.map((zone) => (
          <ZonePolygon
            key={zone.id}
            zone={zone}
            isSelected={selectedZone?.id === zone.id}
            onClick={onZoneClick}
          />
        ))}

      {activeLayers.includes('hospitals') &&
        hospitals.map((h) => (
          compact ? (
            <CircleMarker
              key={h.id}
              center={[h.lat, h.lng]}
              radius={6}
              pathOptions={{
                color: '#ffffff',
                fillColor: h.exposed ? '#2563eb' : '#60a5fa',
                fillOpacity: 0.9,
                weight: 2,
              }}
            >
              <Popup>
                <div className="text-xs min-w-[160px]">
                  <div className="font-semibold text-sm mb-1">{h.name}</div>
                  <div>Beds: <strong>{h.beds}</strong></div>
                  <div>Flood Exposure: <strong className={h.exposed ? 'text-red-400' : 'text-green-400'}>{h.exposed ? 'Yes' : 'No'}</strong></div>
                </div>
              </Popup>
            </CircleMarker>
          ) : (
            <Marker key={h.id} position={[h.lat, h.lng]} icon={hospitalMarker}>
              <Popup>
                <div className="text-xs min-w-[160px]">
                  <div className="font-semibold text-sm mb-1">{h.name}</div>
                  <div>Beds: <strong>{h.beds}</strong></div>
                  <div>Flood Exposure: <strong className={h.exposed ? 'text-red-400' : 'text-green-400'}>{h.exposed ? 'Yes' : 'No'}</strong></div>
                </div>
              </Popup>
            </Marker>
          )
        ))}

      {activeLayers.includes('shelters') &&
        shelters.map((s) => (
          compact ? (
            <CircleMarker
              key={s.id}
              center={[s.lat, s.lng]}
              radius={5}
              pathOptions={{
                color: '#ffffff',
                fillColor: s.type === 'official' ? '#10b981' : '#34d399',
                fillOpacity: 0.9,
                weight: 2,
              }}
            >
              <Popup>
                <div className="text-xs min-w-[140px]">
                  <div className="font-semibold text-sm mb-1">{s.name}</div>
                  <div>Capacity: <strong>{s.capacity}</strong></div>
                  <div>Type: {s.type === 'official' ? '✅ Official' : '🔶 Potential'}</div>
                </div>
              </Popup>
            </CircleMarker>
          ) : (
            <Marker key={s.id} position={[s.lat, s.lng]} icon={shelterMarker}>
              <Popup>
                <div className="text-xs min-w-[140px]">
                  <div className="font-semibold text-sm mb-1">{s.name}</div>
                  <div>Capacity: <strong>{s.capacity}</strong></div>
                  <div>Type: {s.type === 'official' ? '✅ Official' : '🔶 Potential'}</div>
                  <div>Status: <strong>{s.status}</strong></div>
                </div>
              </Popup>
            </Marker>
          )
        ))}

      {activeLayers.includes('alerts') &&
        incidents.map((inc) => {
          const colors = severityColors[inc.severity] || severityColors.moderate;
          return (
            <Circle
              key={`circle-${inc.id}`}
              center={[inc.lat, inc.lng]}
              radius={inc.severity === 'critical' ? 350 : inc.severity === 'high' ? 220 : 140}
              pathOptions={{
                color: colors.stroke,
                fillColor: colors.fill,
                fillOpacity: compact ? 0.18 : 0.12,
                weight: compact ? 2 : 1.5,
                dashArray: compact ? undefined : '5, 5',
              }}
            />
          );
        })}

      {activeLayers.includes('alerts') &&
        incidents.map((inc) => (
          <Marker key={`marker-${inc.id}`} position={[inc.lat, inc.lng]} icon={incidentMarker}>
            <Popup>
              <div className="text-xs min-w-[180px]">
                <div className="font-semibold text-sm mb-1">{inc.type}</div>
                <div className="text-[var(--color-text-muted)] mb-1">{inc.location}</div>
                <div>{inc.id} · {inc.reportCount} reports</div>
                <div>Confidence: <strong>{inc.confidence}%</strong></div>
                {inc.description && (
                  <p className="mt-2 text-[0.7rem] leading-relaxed text-[var(--color-text-secondary)]">{inc.description}</p>
                )}
              </div>
            </Popup>
          </Marker>
        ))}

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
