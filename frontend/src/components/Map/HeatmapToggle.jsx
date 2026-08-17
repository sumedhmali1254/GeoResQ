import { motion } from 'framer-motion';
import { Map, Thermometer } from 'lucide-react';

export default function HeatmapToggle({ isHeatmap, onToggle, compact = false }) {
  return (
    <motion.div
      className={`heatmap-toggle ${compact ? 'heatmap-toggle-compact' : ''}`}
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
    >
      <button
        className={`heatmap-toggle-option ${!isHeatmap ? 'heatmap-toggle-active' : ''}`}
        onClick={() => isHeatmap && onToggle()}
        title="Standard Map View"
      >
        <Map size={compact ? 11 : 13} />
        <span>Map</span>
      </button>
      <button
        className={`heatmap-toggle-option ${isHeatmap ? 'heatmap-toggle-active heatmap-toggle-thermal' : ''}`}
        onClick={() => !isHeatmap && onToggle()}
        title="Thermal Heatmap View"
      >
        <Thermometer size={compact ? 11 : 13} />
        <span>Thermal</span>
      </button>
    </motion.div>
  );
}
