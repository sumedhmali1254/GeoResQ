import { useEffect } from 'react';
import { useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet.heat';
import { heatmapPoints, heatmapConfig } from '../../data/heatmapData';

export default function HeatmapLayer({ visible = false, customPoints = null }) {
  const map = useMap();

  useEffect(() => {
    if (!visible) return;

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

    return () => {
      map.removeLayer(heatLayer);
    };
  }, [map, visible, customPoints]);

  return null;
}
