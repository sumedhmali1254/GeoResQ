// Multi-Region India Disaster Simulation Engine
// Maps rainfall and cyclone intensity levels to predicted impact metrics for all major Indian regions

export const simulationRegions = [
  { id: 'mumbai', name: 'Mumbai (Maharashtra)', disaster: 'Urban Flood / Monsoon Surge', lat: 19.076, lng: 72.877, riskMultiplier: 1.0, popMultiplier: 1.0 },
  { id: 'delhi', name: 'Delhi NCR (ITO & Yamuna)', disaster: 'Yamuna River Overflow', lat: 28.628, lng: 77.251, riskMultiplier: 1.15, popMultiplier: 1.3 },
  { id: 'chennai', name: 'Chennai (Tamil Nadu)', disaster: 'Adyar River & Lake Overflow', lat: 13.003, lng: 80.250, riskMultiplier: 1.1, popMultiplier: 0.9 },
  { id: 'kolkata', name: 'Kolkata (West Bengal)', disaster: 'Hooghly River & Cyclonic Surge', lat: 22.576, lng: 88.369, riskMultiplier: 1.05, popMultiplier: 1.2 },
  { id: 'bangalore', name: 'Bengaluru (Karnataka)', disaster: 'Bellandur Lake Breach & Urban Flood', lat: 12.928, lng: 77.651, riskMultiplier: 0.9, popMultiplier: 0.85 },
  { id: 'hyderabad', name: 'Hyderabad (Telangana)', disaster: 'Musi River Flash Flood', lat: 17.385, lng: 78.500, riskMultiplier: 0.95, popMultiplier: 0.8 },
  { id: 'pune', name: 'Pune (Maharashtra)', disaster: 'Mutha River Dam Release Flood', lat: 18.516, lng: 73.844, riskMultiplier: 0.88, popMultiplier: 0.75 },
  { id: 'ahmedabad', name: 'Ahmedabad (Gujarat)', disaster: 'Sabarmati Riverfront Overflow', lat: 23.028, lng: 72.582, riskMultiplier: 0.85, popMultiplier: 0.7 },
  { id: 'kerala', name: 'Wayanad & Ernakulam (Kerala)', disaster: 'Landslide & Periyar Dam Flood', lat: 11.508, lng: 76.098, riskMultiplier: 1.25, popMultiplier: 0.6 },
  { id: 'odisha', name: 'Puri & Cuttack (Odisha)', disaster: 'Very Severe Cyclone & Mahanadi Flood', lat: 19.810, lng: 85.832, riskMultiplier: 1.3, popMultiplier: 1.1 },
  { id: 'assam', name: 'Guwahati & Kaziranga (Assam)', disaster: 'Brahmaputra River Flooding', lat: 26.175, lng: 91.745, riskMultiplier: 1.2, popMultiplier: 0.95 },
  { id: 'vizag', name: 'Visakhapatnam (Andhra Pradesh)', disaster: 'Coastal Cyclone & Hillside Landslide', lat: 17.694, lng: 83.282, riskMultiplier: 1.05, popMultiplier: 0.7 },
  { id: 'patna', name: 'Patna & Darbhanga (Bihar)', disaster: 'Ganga & Bagmati River Submersion', lat: 25.614, lng: 85.193, riskMultiplier: 1.15, popMultiplier: 1.25 },
  { id: 'jaipur', name: 'Jaipur (Rajasthan)', disaster: 'Urban Flash Flood & Drainage Failure', lat: 26.888, lng: 75.809, riskMultiplier: 0.8, popMultiplier: 0.65 },
];

export const simulationDefaults = {
  location: 'Mumbai (Maharashtra)',
  regionId: 'mumbai',
  disaster: 'Urban Flood / Monsoon Surge',
  rainfallMin: 40,
  rainfallMax: 200,
  rainfallDefault: 80,
  rainfallUnit: 'mm/hr',
};

// Generate simulation states for different rainfall levels
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
      'Monitor weather updates closely via IMD radar',
      'Alert on-call NDRF & local municipality rescue teams',
      'Check municipal storm drainage system capacity',
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
      'Activate standby shelters in low-lying district zones',
      'Deploy traffic management to vulnerable road underpasses',
      'Pre-position rescue boats at high-risk waterlogging points',
      'Alert civil hospitals for potential casualty influx',
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
      'Activate emergency relief centers across critical wards',
      'Begin precautionary evacuation of ground-floor residents',
      'Restrict vehicular traffic on high-risk road segments',
      'Deploy NDRF rescue boats to flooded residential areas',
      'Alert all district hospitals within 5km of water bodies',
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
      'URGENT: Mandatory evacuation of critical flood zones',
      'Activate ALL emergency facilities within 10km radius',
      'Deploy full NDRF & SDRF complement to high-water zones',
      'Restrict ALL vehicular traffic on flooded expressways',
      'Alert hospitals — expect mass casualty & trauma scenario',
      'Request Military & Coast Guard air-sea evacuation support',
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
      'CRITICAL: Complete evacuation of low-lying urban sectors',
      'Activate state-level disaster response protocol (SDMA)',
      'Deploy all available inflatable boats & amphibious vehicles',
      'Hospital evacuation for flood-exposed medical facilities',
      'Establish field medical camps at high-elevation grounds',
      'Request Army & Air Force heavy-lift helicopter deployment',
      'Issue emergency broadcast warning through all telecom networks',
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
      'EMERGENCY: Full-scale national disaster response (NDMA)',
      'Evacuate ALL residents from primary river basin zones',
      'Helicopter winch capability requested — rooftop evacuations active',
      'ALL hospitals in flood zone to transfer critical ICU patients',
      'State-level emergency declaration enacted',
      'Cross-state resource mobilization and inter-agency dispatch',
      'National Disaster Response Fund (NDRF) emergency deployment',
      'Establish unified emergency command post at central stadium',
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
      'CATASTROPHIC: Extreme 50-year disaster flood predicted',
      'National emergency protocols fully engaged',
      'All armed forces assets (Army, Navy, Air Force) deployed',
      'Complete city-district evacuation underway',
      'All hospitals evacuated or operating in emergency triage mode',
      'Airlift and boat fleet rescue operations underway continuously',
      'Inter-state relief supplies & medical units dispatched',
      'Emergency field morgue & medical triage centers established',
    ],
  },
};

// Interpolate simulation state for any rainfall value and region
export function getSimulationState(rainfall, regionId = 'mumbai') {
  const region = simulationRegions.find((r) => r.id === regionId) || simulationRegions[0];
  const anchors = Object.keys(simulationStates).map(Number).sort((a, b) => a - b);

  let baseState;
  if (rainfall <= anchors[0]) baseState = simulationStates[anchors[0]];
  else if (rainfall >= anchors[anchors.length - 1]) baseState = simulationStates[anchors[anchors.length - 1]];
  else {
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

    baseState = {
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

  // Scale metrics by region multipliers
  return {
    ...baseState,
    region: region.name,
    disaster: region.disaster,
    riskScore: Math.min(100, Math.round(baseState.riskScore * region.riskMultiplier)),
    populationExposed: Math.round(baseState.populationExposed * region.popMultiplier),
    roadsAffected: Math.round(baseState.roadsAffected * region.riskMultiplier),
    hospitalsExposed: Math.round(baseState.hospitalsExposed * region.riskMultiplier),
  };
}
