import { Polygon, Tooltip } from 'react-leaflet';
import { riskColors } from '../../data/zones';

export default function ZonePolygon({ zone, isSelected, onClick }) {
  const colors = riskColors[zone.riskLevel] || riskColors.moderate;

  return (
    <Polygon
      positions={zone.coordinates}
      pathOptions={{
        color: isSelected ? '#60a5fa' : colors.stroke,
        fillColor: colors.fill,
        fillOpacity: isSelected ? 0.5 : colors.fillOpacity,
        weight: isSelected ? 3 : 2,
        dashArray: isSelected ? '' : '4',
      }}
      eventHandlers={{
        click: () => onClick?.(zone),
      }}
    >
      <Tooltip
        direction="top"
        offset={[0, -10]}
        opacity={0.95}
        className="!bg-[var(--color-bg-card)] !text-[var(--color-text-primary)] !border-[var(--color-border-primary)] !rounded-lg !px-3 !py-2 !shadow-lg"
      >
        <div className="text-xs">
          <div className="font-semibold mb-1">{zone.name}</div>
          <div className="flex items-center gap-2">
            <span>Risk: <strong>{zone.riskScore}</strong>/100</span>
            <span className="uppercase text-[0.6rem] font-bold" style={{
              color: riskColors[zone.riskLevel]?.fill
            }}>
              {zone.riskLevel}
            </span>
          </div>
          <div className="text-[var(--color-text-muted)] mt-0.5">
            Pop: {zone.population.toLocaleString()}
          </div>
        </div>
      </Tooltip>
    </Polygon>
  );
}
