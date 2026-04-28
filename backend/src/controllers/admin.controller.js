import { demoAmbulances, demoEmergencies, demoHospitals, demoUsers } from '../data/demo.js';
import { datasetInsights } from '../data/datasetInsights.js';
import { getHospitalLoadSummary } from '../services/dispatch.js';

export async function analytics(req, res) {
  res.json({
    metrics: {
      total_users: demoUsers.length,
      total_emergencies: demoEmergencies.length,
      critical_cases: demoEmergencies.filter((item) => item.severity === 'Critical').length,
      hospitals_online: demoHospitals.length,
      ambulances_online: demoAmbulances.length,
      top_accident_state: datasetInsights.roadAccidents.topStatesByTotal[0] ?? null,
      peak_traffic_window: datasetInsights.traffic.averagesByTime.slice().sort((left, right) => right.avgWaitingTime - left.avgWaitingTime)[0] ?? null,
      ambulance_demand_peak: datasetInsights.ambulanceDemand.timeSlotBreakdown[0] ?? null,
    },
  });
}

export async function heatmap(req, res) {
  res.json({
    hotspots: [
      ...demoEmergencies.map((item, index) => ({
        id: item.id,
        lat: item.lat,
        lng: item.lng,
        intensity: 60 + index * 12,
        severity: item.severity,
        source: 'live-emergency',
      })),
      ...datasetInsights.roadAccidents.topStatesByTotal.slice(0, 8).map((state, index) => ({
        id: `accident-${index}`,
        state: state.key,
        intensity: Math.min(100, Math.round(state.value / 12000)),
        source: 'road-accidents',
      })),
    ],
  });
}

export async function fleet(req, res) {
  res.json({ ambulances: demoAmbulances, hospitals: getHospitalLoadSummary(), vehicleSignals: datasetInsights.vehicleDetection });
}
