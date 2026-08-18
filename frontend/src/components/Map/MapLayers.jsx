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

const riskLevelColor = {
  critical: '#dc2626',
  high: '#ea580c',
  moderate: '#d97706',
  low: '#16a34a',
};

const waterLevelColor = {
  critical: '#7c3aed',
  high: '#2563eb',
  moderate: '#0ea5e9',
  low: '#38bdf8',
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
                fillColor: h.exposed ? '#dc2626' : '#2563eb',
                fillOpacity: 0.9,
                weight: 2,
              }}
            >
              <Popup>
                <div className="text-xs min-w-[180px]">
                  <div className="font-semibold text-sm mb-1">{h.name}</div>
                  <div>Beds: <strong>{h.beds}</strong>{h.icuBeds ? ` · ICU: ${h.icuBeds}` : ''}</div>
                  <div>Flood Exposed: <strong className={h.exposed ? 'text-red-500' : 'text-green-500'}>{h.exposed ? 'YES' : 'No'}</strong></div>
                  {h.emergencyDept !== undefined && (
                    <div>Emergency Dept: <strong>{h.emergencyDept ? '✅ Yes' : 'No'}</strong></div>
                  )}
                </div>
              </Popup>
            </CircleMarker>
          ) : (
            <Marker key={h.id} position={[h.lat, h.lng]} icon={hospitalMarker}>
              <Popup>
                <div className="text-xs min-w-[200px] space-y-1">
                  <div className="font-semibold text-sm border-b pb-1 mb-1">{h.name}</div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Total Beds</span>
                    <strong>{h.beds}</strong>
                  </div>
                  {h.icuBeds && (
                    <div className="flex justify-between">
                      <span className="text-gray-500">ICU Beds</span>
                      <strong>{h.icuBeds}</strong>
                    </div>
                  )}
                  <div className="flex justify-between">
                    <span className="text-gray-500">Emergency Dept</span>
                    <strong>{h.emergencyDept ? '✅ Yes' : '—'}</strong>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Flood Exposed</span>
                    <strong className={h.exposed ? 'text-red-500' : 'text-green-600'}>{h.exposed ? '⚠️ Yes' : '✅ No'}</strong>
                  </div>
                  {h.riskLevel && (
                    <div className="flex justify-between">
                      <span className="text-gray-500">Risk Level</span>
                      <strong style={{ color: riskLevelColor[h.riskLevel] }}>{h.riskLevel?.toUpperCase()}</strong>
                    </div>
                  )}
                  {h.specialties && h.specialties.length > 0 && (
                    <div className="pt-1">
                      <div className="text-gray-500 mb-0.5">Specialties</div>
                      <div className="text-[0.65rem] text-gray-600 leading-relaxed">{h.specialties.slice(0, 3).join(' · ')}</div>
                    </div>
                  )}
                  {h.address && (
                    <div className="text-[0.62rem] text-gray-400 pt-1 border-t mt-1">{h.address}</div>
                  )}
                  {h.contact && (
                    <a href={`tel:${h.contact}`} className="block text-blue-600 font-semibold text-[0.65rem]">📞 {h.contact}</a>
                  )}
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
                fillColor: s.status === 'active' ? '#10b981' : s.type === 'official' ? '#34d399' : '#6ee7b7',
                fillOpacity: 0.9,
                weight: 2,
              }}
            >
              <Popup>
                <div className="text-xs min-w-[160px]">
                  <div className="font-semibold text-sm mb-1">{s.name}</div>
                  <div>Capacity: <strong>{s.capacity?.toLocaleString()}</strong></div>
                  {s.occupancy !== undefined && (
                    <div>Occupancy: <strong>{s.occupancy}</strong> / {s.capacity} ({Math.round((s.occupancy / s.capacity) * 100)}%)</div>
                  )}
                  <div>Type: {s.type === 'official' ? '✅ Official' : '🔶 Potential'}</div>
                  <div>Status: <strong className={s.status === 'active' ? 'text-green-600' : 'text-yellow-600'}>{s.status}</strong></div>
                </div>
              </Popup>
            </CircleMarker>
          ) : (
            <Marker key={s.id} position={[s.lat, s.lng]} icon={shelterMarker}>
              <Popup>
                <div className="text-xs min-w-[200px] space-y-1">
                  <div className="font-semibold text-sm border-b pb-1 mb-1">{s.name}</div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Capacity</span>
                    <strong>{s.capacity?.toLocaleString()}</strong>
                  </div>
                  {s.occupancy !== undefined && (
                    <div className="flex justify-between">
                      <span className="text-gray-500">Occupancy</span>
                      <strong>{s.occupancy} <span className="text-gray-400 font-normal">/ {s.capacity}</span></strong>
                    </div>
                  )}
                  <div className="flex justify-between">
                    <span className="text-gray-500">Type</span>
                    <strong>{s.type === 'official' ? '✅ Official' : '🔶 Potential'}</strong>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Status</span>
                    <strong className={s.status === 'active' ? 'text-green-600' : 'text-amber-600'}>{s.status?.toUpperCase()}</strong>
                  </div>
                  {s.features && s.features.length > 0 && (
                    <div className="pt-1">
                      <div className="text-gray-500 mb-0.5">Facilities</div>
                      <div className="text-[0.65rem] text-gray-600 leading-relaxed">{s.features.slice(0, 4).join(' · ')}</div>
                    </div>
                  )}
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
              <div className="text-xs min-w-[200px] space-y-1">
                <div className="font-semibold text-sm border-b pb-1 mb-1">{inc.type}</div>
                <div className="text-gray-500 mb-1">{inc.location}</div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Incident ID</span>
                  <strong>{inc.id}</strong>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Severity</span>
                  <strong style={{ color: severityColors[inc.severity]?.stroke || '#d97706' }}>{inc.severity?.toUpperCase()}</strong>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Reports</span>
                  <strong>{inc.reportCount}</strong>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Confidence</span>
                  <strong>{inc.confidence}%</strong>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Official</span>
                  <strong>{inc.officialConfirmation ? '✅ Yes' : '⏳ Pending'}</strong>
                </div>
                {inc.description && (
                  <p className="mt-2 text-[0.68rem] leading-relaxed text-gray-500 border-t pt-1">{inc.description}</p>
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
                color: wb.floodStage ? '#7c3aed' : '#3b82f6',
                weight: wb.floodStage ? 4 : 3,
                opacity: 0.7,
                dashArray: wb.floodStage ? undefined : '8 4',
              }}
            >
              <Popup>
                <div className="text-xs min-w-[160px]">
                  <div className="font-semibold text-sm mb-1">{wb.name}</div>
                  <div>Level: <strong style={{ color: waterLevelColor[wb.level] }}>{wb.level?.toUpperCase()}</strong></div>
                  <div>Flood Stage: <strong className={wb.floodStage ? 'text-red-500' : 'text-green-600'}>{wb.floodStage ? '⚠️ Active' : 'Normal'}</strong></div>
                </div>
              </Popup>
            </Polyline>
          ) : (
            <CircleMarker
              key={wb.id}
              center={wb.center}
              radius={wb.radius ? Math.max(10, Math.min(30, wb.radius / 40)) : 15}
              pathOptions={{
                color: wb.floodStage ? '#7c3aed' : '#3b82f6',
                fillColor: wb.floodStage ? '#7c3aed' : '#3b82f6',
                fillOpacity: 0.25,
                weight: wb.floodStage ? 2 : 1,
              }}
            >
              <Popup>
                <div className="text-xs min-w-[160px]">
                  <div className="font-semibold text-sm mb-1">{wb.name}</div>
                  <div>Level: <strong style={{ color: waterLevelColor[wb.level] }}>{wb.level?.toUpperCase()}</strong></div>
                  <div>Flood Stage: <strong className={wb.floodStage ? 'text-red-500' : 'text-green-600'}>{wb.floodStage ? '⚠️ Active' : 'Normal'}</strong></div>
                </div>
              </Popup>
            </CircleMarker>
          )
        )}
    </>
  );
}
