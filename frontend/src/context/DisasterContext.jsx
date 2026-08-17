import { createContext, useContext, useState, useCallback } from 'react';

const DisasterContext = createContext(null);

export function DisasterProvider({ children }) {
  const [selectedZone, setSelectedZone] = useState(null);
  const [activeFilters, setActiveFilters] = useState({
    riskLevels: ['critical', 'high', 'moderate', 'low'],
    layers: ['floodRisk', 'hospitals', 'shelters', 'roads', 'alerts'],
    timeRange: '24h',
  });
  const [simulationParams, setSimulationParams] = useState({
    location: 'Mumbai',
    disaster: 'Urban Flood',
    rainfall: 80,
  });
  const [isLive, setIsLive] = useState(true);

  const toggleLayer = useCallback((layerKey) => {
    setActiveFilters((prev) => ({
      ...prev,
      layers: prev.layers.includes(layerKey)
        ? prev.layers.filter((l) => l !== layerKey)
        : [...prev.layers, layerKey],
    }));
  }, []);

  const toggleRiskLevel = useCallback((level) => {
    setActiveFilters((prev) => ({
      ...prev,
      riskLevels: prev.riskLevels.includes(level)
        ? prev.riskLevels.filter((l) => l !== level)
        : [...prev.riskLevels, level],
    }));
  }, []);

  const updateSimulation = useCallback((params) => {
    setSimulationParams((prev) => ({ ...prev, ...params }));
  }, []);

  return (
    <DisasterContext.Provider
      value={{
        selectedZone,
        setSelectedZone,
        activeFilters,
        setActiveFilters,
        toggleLayer,
        toggleRiskLevel,
        simulationParams,
        updateSimulation,
        isLive,
        setIsLive,
      }}
    >
      {children}
    </DisasterContext.Provider>
  );
}

export function useDisaster() {
  const context = useContext(DisasterContext);
  if (!context) throw new Error('useDisaster must be used within DisasterProvider');
  return context;
}

export default DisasterContext;
