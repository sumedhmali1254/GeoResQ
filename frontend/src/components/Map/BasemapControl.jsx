import { useEffect, useRef } from 'react';
import { useMap } from 'react-leaflet';
import L from 'leaflet';

export default function BasemapControl({ basemap, onBasemapChange }) {
  const map = useMap();
  const containerRef = useRef(null);
  const onChangeRef = useRef(onBasemapChange);

  useEffect(() => {
    onChangeRef.current = onBasemapChange;
  }, [onBasemapChange]);

  useEffect(() => {
    const control = L.control({ position: 'bottomright' });

    control.onAdd = () => {
      const container = L.DomUtil.create('div', 'map-basemap-control leaflet-bar');
      containerRef.current = container;
      L.DomEvent.disableClickPropagation(container);
      L.DomEvent.disableScrollPropagation(container);

      const options = [
        { key: 'street', label: 'Street' },
        { key: 'satellite', label: 'Satellite' },
      ];

      options.forEach(({ key, label }) => {
        const btn = L.DomUtil.create('button', 'map-basemap-btn', container);
        btn.type = 'button';
        btn.textContent = label;
        btn.dataset.basemap = key;
        btn.addEventListener('click', (e) => {
          L.DomEvent.stopPropagation(e);
          onChangeRef.current(key);
        });
      });

      return container;
    };

    control.addTo(map);
    return () => {
      control.remove();
      containerRef.current = null;
    };
  }, [map]);

  useEffect(() => {
    if (!containerRef.current) return;
    containerRef.current.querySelectorAll('.map-basemap-btn').forEach((btn) => {
      btn.classList.toggle('map-basemap-btn-active', btn.dataset.basemap === basemap);
    });
  }, [basemap]);

  return null;
}
