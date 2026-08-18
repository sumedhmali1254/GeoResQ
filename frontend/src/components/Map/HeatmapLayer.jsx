import { useEffect } from 'react';
import { useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet.heat';
import { heatmapPoints, heatmapConfig } from '../../data/heatmapData';

export default function HeatmapLayer({ visible = false, customPoints = null }) {
  const map = useMap();

  useEffect(() => {
    if (!visible) return;

    // Patch canvas getContext to set `willReadFrequently: true` to suppress Leaflet.heat browser warning
    const origCreateElement = document.createElement.bind(document);
    const createElementOverride = (tagName, options) => {
      const el = origCreateElement(tagName, options);
      if (typeof tagName === 'string' && tagName.toLowerCase() === 'canvas') {
        const origGetContext = el.getContext.bind(el);
        el.getContext = function (type, attribs) {
          if (type === '2d') {
            attribs = { willReadFrequently: true, ...(attribs || {}) };
          }
          return origGetContext(type, attribs);
        };
      }
      return el;
    };

    document.createElement = createElementOverride;

    const points = customPoints || heatmapPoints;
    const heatLayer = L.heatLayer(points, {
      radius: heatmapConfig.radius,
      blur: heatmapConfig.blur,
      maxZoom: heatmapConfig.maxZoom,
      max: heatmapConfig.max,
      minOpacity: heatmapConfig.minOpacity,
      gradient: heatmapConfig.gradient,
    });

    heatLayer.addTo(map);

    // Restore original createElement
    document.createElement = origCreateElement;

    return () => {
      map.removeLayer(heatLayer);
    };
  }, [map, visible, customPoints]);

  return null;
}
