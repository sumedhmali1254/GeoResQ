import { useEffect, useRef } from 'react';
import { MapContainer, TileLayer, useMap } from 'react-leaflet';
import { mapConfig } from '../../data/zones';

// Component to handle dynamic center/zoom changes
function MapController({ center, zoom }) {
  const map = useMap();
  useEffect(() => {
    if (center) map.flyTo(center, zoom || map.getZoom(), { duration: 0.8 });
  }, [center, zoom, map]);
  return null;
}

export default function MapView({
  center = mapConfig.center,
  zoom = mapConfig.zoom,
  children,
  className = '',
  style = {},
  onClick,
}) {
  const mapRef = useRef(null);

  return (
    <MapContainer
      center={center}
      zoom={zoom}
      minZoom={mapConfig.minZoom}
      maxZoom={mapConfig.maxZoom}
      className={`w-full h-full rounded-lg ${className}`}
      style={{ background: 'var(--color-bg-primary)', ...style }}
      ref={mapRef}
      zoomControl={true}
      attributionControl={true}
      onClick={onClick}
    >
      <TileLayer
        url={mapConfig.tileUrl}
        attribution={mapConfig.attribution}
      />
      <MapController center={center} zoom={zoom} />
      {children}
    </MapContainer>
  );
}
