import { demoHospitals } from '../data/demo.js';
import { datasetInsights } from '../data/datasetInsights.js';

const criticalKeywords = ['chest pain', 'unconscious', 'severe bleeding', 'not breathing', 'heart attack', 'stroke'];
const mediumKeywords = ['fracture', 'injury', 'bleeding', 'pain', 'accident'];

export function detectSeverity({ text = '', voiceTranscript = '' } = {}) {
  const merged = `${text} ${voiceTranscript}`.toLowerCase();

  if (criticalKeywords.some((keyword) => merged.includes(keyword))) {
    return { severity: 'Critical', confidence: 0.96 };
  }

  if (mediumKeywords.some((keyword) => merged.includes(keyword))) {
    return { severity: 'Medium', confidence: 0.78 };
  }

  return { severity: 'Low', confidence: 0.64 };
}

export function matchHospital({ lat = 0, lng = 0, specialty = 'Emergency', severity = 'Medium' } = {}) {
  const trafficPressure = datasetInsights.traffic.averagesByTime.reduce((max, entry) => Math.max(max, entry.avgWaitingTime), 0);
  const ranked = [...demoHospitals]
    .map((hospital) => {
      const distancePenalty = Math.hypot(hospital.lat - lat, hospital.lng - lng) * 100;
      const specialtyBonus = hospital.specialties.some((entry) => entry.toLowerCase().includes(String(specialty).toLowerCase())) ? -18 : 0;
      const loadPenalty = hospital.load * 0.45;
      const icuBonus = severity === 'Critical' ? Math.max(0, 14 - hospital.icu_beds) * 1.8 : 0;
      const congestionPenalty = trafficPressure > 35 ? 4 : 0;
      const score = Math.round(100 - distancePenalty + specialtyBonus - loadPenalty - icuBonus - congestionPenalty + hospital.rating * 4);

      return { ...hospital, score };
    })
    .sort((left, right) => right.score - left.score);

  return ranked[0];
}

export function detectSpam({ description = '', repeatCount = 0 } = {}) {
  const lower = description.toLowerCase();
  const suspicious = ['test', 'prank', 'fake', 'joke', 'spam', 'nothing happened'];
  const keywordScore = suspicious.reduce((sum, keyword) => sum + (lower.includes(keyword) ? 1 : 0), 0);
  const score = Math.min(100, 12 + repeatCount * 16 + keywordScore * 28);

  return {
    isSpam: score >= 50,
    score,
    reasons: [
      ...(keywordScore ? ['Suspicious text patterns detected'] : []),
      ...(repeatCount > 1 ? ['Repeated reports from same source'] : []),
    ],
  };
}
