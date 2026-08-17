import { useEffect, useRef, useState } from 'react';
import { MapContainer, TileLayer, useMap } from 'react-leaflet';
import { mapConfig } from '../../data/zones';
import BasemapControl from './BasemapControl';

const BASEMAPS = {
  street: {
    url: 'https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png',
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="https://carto.com/">CARTO</a>',
  },
  satellite: {
    url: 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',
    attribution: 'Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community',
  },
};

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
  showBasemapControl = true,
}) {
  const mapRef = useRef(null);
  const [basemap, setBasemap] = useState('street');

  return (
    <MapContainer
      center={center}
      zoom={zoom}
      minZoom={mapConfig.minZoom}
      maxZoom={mapConfig.maxZoom}
      className={`w-full h-full ${className}`}
      style={{ background: 'var(--color-bg-primary)', ...style }}
      ref={mapRef}
      zoomControl={true}
      attributionControl={true}
      onClick={onClick}
    >
      <TileLayer
        key={basemap}
        url={BASEMAPS[basemap].url}
        attribution={BASEMAPS[basemap].attribution}
      />
      <MapController center={center} zoom={zoom} />
      {children}
      {showBasemapControl && (
        <BasemapControl basemap={basemap} onBasemapChange={setBasemap} />
      )}
    </MapContainer>
  );
}
