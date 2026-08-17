// Disaster simulation state data
// Maps rainfall levels to predicted impact metrics

export const simulationDefaults = {
  location: 'Mumbai',
  disaster: 'Urban Flood',
  rainfallMin: 40,
  rainfallMax: 200,
  rainfallDefault: 80,
  rainfallUnit: 'mm/hr',
};

// Generate simulation states for different rainfall levels
// The simulation interpolates between these anchor points
export const simulationStates = {
  40: {
    rainfall: 40,
    riskScore: 32,
    populationExposed: 8000,
    roadsAffected: 5,
    hospitalsExposed: 1,
    sheltersRequired: 3,
    rescueTeams: 4,
    ambulances: 6,
    boats: 2,
    waterLevel: 0.3,
    drainageLoad: 35,
    recommendations: [
      'Monitor weather updates closely',
      'Alert on-call rescue teams',
      'Check drainage system capacity',
    ],
  },
  60: {
    rainfall: 60,
    riskScore: 48,
    populationExposed: 15000,
    roadsAffected: 12,
    hospitalsExposed: 2,
    sheltersRequired: 5,
    rescueTeams: 6,
    ambulances: 10,
    boats: 5,
    waterLevel: 0.6,
    drainageLoad: 55,
    recommendations: [
      'Activate standby shelters in low-lying areas',
      'Deploy traffic management to vulnerable roads',
      'Pre-position rescue boats at Zone 17 and Zone 12',
      'Alert hospitals for potential influx',
    ],
  },
  80: {
    rainfall: 80,
    riskScore: 61,
    populationExposed: 28000,
    roadsAffected: 22,
    hospitalsExposed: 4,
    sheltersRequired: 8,
    rescueTeams: 10,
    ambulances: 16,
    boats: 10,
    waterLevel: 1.0,
    drainageLoad: 72,
    recommendations: [
      'Activate additional emergency facilities in Zones 12 and 17',
      'Begin precautionary evacuation of ground-floor residents',
      'Restrict vehicular traffic on 12 high-risk road segments',
      'Deploy rescue boats to Dharavi and Kurla areas',
      'Alert all hospitals within 5km of critical zones',
    ],
  },
  100: {
    rainfall: 100,
    riskScore: 72,
    populationExposed: 42000,
    roadsAffected: 31,
    hospitalsExposed: 6,
    sheltersRequired: 12,
    rescueTeams: 14,
    ambulances: 22,
    boats: 15,
    waterLevel: 1.4,
    drainageLoad: 85,
    recommendations: [
      'URGENT: Mandatory evacuation of Zones 12, 17, and 22',
      'Activate ALL emergency facilities within 5km radius',
      'Deploy full NDRF complement to critical zones',
      'Restrict ALL vehicular traffic on Eastern Express Highway',
      'Alert hospitals — expect mass casualty scenario',
      'Request military assistance for evacuation support',
    ],
  },
  120: {
    rainfall: 120,
    riskScore: 81,
    populationExposed: 58000,
    roadsAffected: 39,
    hospitalsExposed: 7,
    sheltersRequired: 16,
    rescueTeams: 18,
    ambulances: 28,
    boats: 20,
    waterLevel: 1.8,
    drainageLoad: 92,
    recommendations: [
      'CRITICAL: Complete evacuation of all low-lying zones',
      'Activate regional disaster response protocol',
      'Deploy all available rescue boats and amphibious vehicles',
      'Hospital evacuation for 2 flood-exposed facilities',
      'Establish field medical camps at elevated locations',
      'Request Army & Navy disaster response deployment',
      'Issue red alert through all public warning channels',
    ],
  },
  150: {
    rainfall: 150,
    riskScore: 89,
    populationExposed: 72000,
    roadsAffected: 44,
    hospitalsExposed: 8,
    sheltersRequired: 20,
    rescueTeams: 22,
    ambulances: 34,
    boats: 25,
    waterLevel: 2.3,
    drainageLoad: 97,
    recommendations: [
      'EMERGENCY: Full-scale disaster response activation',
      'Evacuate ALL residents from Zones 5, 8, 12, 17, and 22',
      'Airlift capability requested — rooftop evacuations likely',
      'ALL hospitals in flood zone to transfer critical patients',
      'State-level emergency declaration recommended',
      'Cross-district resource mobilization required',
      'National Disaster Response Fund activation recommended',
      'Establish unified command post at Andheri Sports Complex',
    ],
  },
  200: {
    rainfall: 200,
    riskScore: 96,
    populationExposed: 95000,
    roadsAffected: 52,
    hospitalsExposed: 10,
    sheltersRequired: 28,
    rescueTeams: 28,
    ambulances: 42,
    boats: 35,
    waterLevel: 3.2,
    drainageLoad: 100,
    recommendations: [
      'CATASTROPHIC: 26/7-level flooding predicted',
      'National emergency protocols activated',
      'All available military assets deployed',
      'Complete city-section evacuation underway',
      'All hospitals evacuated or in emergency-only mode',
      'Helicopter rescue operations required for stranded',
      'Inter-state resource transfer requested',
      'Morgue capacity pre-arranged',
      'Foreign disaster assistance channels opened',
    ],
  },
};

// Interpolate simulation state for any rainfall value
export function getSimulationState(rainfall) {
  const anchors = Object.keys(simulationStates).map(Number).sort((a, b) => a - b);

  if (rainfall <= anchors[0]) return simulationStates[anchors[0]];
  if (rainfall >= anchors[anchors.length - 1]) return simulationStates[anchors[anchors.length - 1]];

  let lower = anchors[0];
  let upper = anchors[anchors.length - 1];

  for (let i = 0; i < anchors.length - 1; i++) {
    if (rainfall >= anchors[i] && rainfall <= anchors[i + 1]) {
      lower = anchors[i];
      upper = anchors[i + 1];
      break;
    }
  }

  const ratio = (rainfall - lower) / (upper - lower);
  const lowerState = simulationStates[lower];
  const upperState = simulationStates[upper];

  const lerp = (a, b) => Math.round(a + (b - a) * ratio);

  return {
    rainfall,
    riskScore: lerp(lowerState.riskScore, upperState.riskScore),
    populationExposed: lerp(lowerState.populationExposed, upperState.populationExposed),
    roadsAffected: lerp(lowerState.roadsAffected, upperState.roadsAffected),
    hospitalsExposed: lerp(lowerState.hospitalsExposed, upperState.hospitalsExposed),
    sheltersRequired: lerp(lowerState.sheltersRequired, upperState.sheltersRequired),
    rescueTeams: lerp(lowerState.rescueTeams, upperState.rescueTeams),
    ambulances: lerp(lowerState.ambulances, upperState.ambulances),
    boats: lerp(lowerState.boats, upperState.boats),
    waterLevel: +(lowerState.waterLevel + (upperState.waterLevel - lowerState.waterLevel) * ratio).toFixed(1),
    drainageLoad: lerp(lowerState.drainageLoad, upperState.drainageLoad),
    recommendations: ratio < 0.5 ? lowerState.recommendations : upperState.recommendations,
  };
}
