/**
 * Mock API Service
 * Simulates backend API responses using local mock data.
 * Each function mirrors a real API endpoint.
 * Replace implementations with apiClient calls when backend is ready.
 *
 * Endpoint mapping:
 *   getActiveDisasters()     → GET  /api/disasters/active
 *   getRiskZones()           → GET  /api/risk
 *   getZoneImpact(zoneId)    → GET  /api/risk/:zoneId/impact
 *   getNearbyFacilities()    → GET  /api/facilities/nearby
 *   getRecommendedShelters() → GET  /api/shelters/recommended
 *   getSafeRoutes(from, to)  → GET  /api/route/safe
 *   getResources()           → GET  /api/resources
 *   getIncidents()           → GET  /api/incidents
 *   submitIncident(data)     → POST /api/incidents
 *   runFloodSimulation(params) → POST /api/simulation/flood
 *   askCopilot(query)        → POST /api/assistant/query
 *   getKPIData()             → GET  /api/dashboard/kpi
 */

import { kpiData } from '../data/kpi';
import { riskZones, hospitals, shelters, mapConfig } from '../data/zones';
import { incidents, severityDistribution, incidentTimeline } from '../data/incidents';
import { facilities } from '../data/facilities';
import { routes } from '../data/routes';
import { resources, allocationRecommendations } from '../data/resources';
import { getSimulationState, simulationDefaults } from '../data/simulation';

// Simulate network delay
const delay = (ms = 300) => new Promise((resolve) => setTimeout(resolve, ms));

export async function getKPIData() {
  await delay(200);
  return { data: kpiData };
}

export async function getActiveDisasters() {
  await delay(300);
  return {
    data: {
      incidents: incidents.filter((i) => i.severity === 'critical' || i.severity === 'high'),
      totalActive: 47,
      lastUpdated: new Date().toISOString(),
    },
  };
}

export async function getRiskZones() {
  await delay(400);
  return {
    data: {
      zones: riskZones,
      hospitals,
      shelters,
      mapConfig,
    },
  };
}

export async function getZoneImpact(zoneId) {
  await delay(300);
  const zone = riskZones.find((z) => z.id === zoneId);
  if (!zone) return { data: null };

  return {
    data: {
      zone,
      impactSummary: {
        populationExposed: zone.population,
        hospitalsExposed: zone.hospitalsExposed,
        schoolsExposed: zone.schoolsExposed,
        roadsAffected: zone.roadsAffected,
        buildingsAffected: zone.buildingsAffected,
        sheltersAvailable: zone.sheltersAvailable,
      },
    },
  };
}

export async function getNearbyFacilities(lat, lng, radiusKm = 5) {
  await delay(300);
  return { data: facilities };
}

export async function getRecommendedShelters(zoneId) {
  await delay(300);
  const recommended = facilities
    .filter((f) => f.suitabilityScore >= 75)
    .sort((a, b) => b.suitabilityScore - a.suitabilityScore);
  return { data: recommended };
}

export async function getSafeRoutes(from, to) {
  await delay(500);
  return { data: routes };
}

export async function getResources() {
  await delay(300);
  return {
    data: {
      resources,
      recommendations: allocationRecommendations,
    },
  };
}

export async function getIncidents(filters = {}) {
  await delay(300);
  let filtered = [...incidents];

  if (filters.severity) {
    filtered = filtered.filter((i) => i.severity === filters.severity);
  }
  if (filters.verified) {
    filtered = filtered.filter((i) => i.verificationStatus === 'verified');
  }

  return {
    data: {
      incidents: filtered,
      severityDistribution,
      timeline: incidentTimeline,
    },
  };
}

export async function submitIncident(data) {
  await delay(800);
  const newIncident = {
    id: `INC-${Math.floor(Math.random() * 900) + 100}`,
    ...data,
    confidence: 35,
    verificationStatus: 'unverified',
    reportCount: 1,
    imageReports: data.hasPhoto ? 1 : 0,
    timestamp: new Date().toISOString(),
    sourceReliability: 'low',
    officialConfirmation: false,
  };
  return { data: newIncident };
}

export async function runFloodSimulation(params) {
  await delay(600);
  const { rainfall } = params;
  const state = getSimulationState(rainfall);
  const baseState = getSimulationState(simulationDefaults.rainfallDefault);

  return {
    data: {
      current: baseState,
      simulated: state,
      defaults: simulationDefaults,
    },
  };
}

export async function askCopilot(query) {
  await delay(1200);

  // Pre-defined responses based on structured data
  const responses = {
    'immediate attention': {
      answer: `Based on current risk assessment data, **Zone 17 — Kurla West** requires the highest priority because it combines:\n\n• **Risk Score**: 84/100 (Critical)\n• **Population Exposure**: 72,400 residents\n• **Limited Road Accessibility**: 18 roads affected\n• **High Confidence**: 91% data reliability\n\nSecondary priority: **Zone 12 — Dharavi** (Risk: 78, Population: 95,200) — higher population but slightly lower composite risk.`,
      sources: ['Risk Engine', 'Population Database', 'Road Network Analysis'],
      confidence: 94,
    },
    'emergency facilities': {
      answer: `For **Zone 17 — Kurla West**, the following facilities are recommended:\n\n1. **Andheri Sports Complex** — Suitability: 94/100 (3.4 km, Official Shelter)\n2. **Kurla Relief Camp** — Suitability: 91/100 (1.2 km, Official Shelter)\n3. **Powai Convention Center** — Suitability: 89/100 (4.1 km, Potential)\n4. **Chembur Stadium** — Suitability: 86/100 (2.6 km, Potential)\n\n⚠️ **Dharavi Community Center** (0.6 km) has high flood exposure — not recommended despite proximity.`,
      sources: ['Facility Intelligence', 'GIS Distance Analysis', 'Flood Risk Engine'],
      confidence: 91,
    },
    'safest route': {
      answer: `**Route B — via Western Express Highway** is the safest route from Kurla West to the nearest recommended shelter.\n\n• **Distance**: 7.1 km (2 km longer than Route A)\n• **Risk Score**: 24/100 (Low)\n• **Flood Exposure**: 0 segments\n• **Road Blockages**: None\n• **Travel Time**: ~35 minutes\n\nRoute A is shorter (5.2 km) but passes through 2 flood-prone underpasses with active blockages. Route B's higher elevation (avg. 13.5m vs 5.2m) provides significantly better flood clearance.`,
      sources: ['Routing Engine', 'Road Network', 'Real-time Flood Data'],
      confidence: 88,
    },
    'rainfall increases': {
      answer: `If rainfall increases by 40% (from 80mm/hr to 112mm/hr), the simulation predicts:\n\n| Metric | Current | Projected | Change |\n|--------|---------|-----------|--------|\n| Risk Score | 61 | 77 | +16 |\n| Population Exposed | 28,000 | 50,000 | +78% |\n| Roads Affected | 22 | 35 | +59% |\n| Hospitals Exposed | 4 | 7 | +75% |\n| Shelters Required | 8 | 14 | +75% |\n\n**Recommended immediate actions**: Activate evacuation protocol for Zones 12 and 17, deploy all remaining NDRF teams, alert hospitals for mass casualty preparedness.`,
      sources: ['Flood Simulation Engine', 'Impact Model', 'Resource Planner'],
      confidence: 82,
    },
    'hospitals': {
      answer: `**Exposed hospitals** (within flood-risk zones):\n\n1. **Rajawadi Hospital** — Risk: Critical, 640 beds, Zone 17\n2. **KEM Hospital** — Risk: High, 1800 beds, Zone 12 perimeter\n3. **Sion Hospital** — Risk: Moderate, 1200 beds, Zone 8\n\n**Safe hospitals** (available for patient transfer):\n- Lilavati Hospital — 314 beds, Low Risk\n- Hinduja Hospital — 400 beds, Low Risk\n- Cooper Hospital — 425 beds, Low Risk\n\n**Recommendation**: Begin patient transfer from Rajawadi Hospital immediately. KEM Hospital should prepare for potential evacuation if rainfall exceeds 120mm/hr.`,
      sources: ['Hospital Registry', 'Flood Risk Engine', 'GIS Analysis'],
      confidence: 90,
    },
  };

  const queryLower = query.toLowerCase();
  let response = null;

  for (const [key, value] of Object.entries(responses)) {
    if (queryLower.includes(key)) {
      response = value;
      break;
    }
  }

  if (!response) {
    response = {
      answer: `Based on the current disaster intelligence data, I can provide analysis on:\n\n• **Priority zones** — which areas need immediate attention\n• **Facility recommendations** — suitable emergency shelters\n• **Route safety** — safest evacuation paths\n• **Scenario analysis** — impact of changing conditions\n• **Hospital exposure** — healthcare facility risk assessment\n\nPlease ask a specific question about any of these areas, and I'll provide data-backed intelligence from the active monitoring systems.`,
      sources: ['System Status'],
      confidence: 100,
    };
  }

  return {
    data: {
      ...response,
      timestamp: new Date().toISOString(),
      tools: {
        gis: true,
        riskEngine: true,
        impactEngine: true,
        facilityIntelligence: true,
        routing: true,
      },
    },
  };
}
