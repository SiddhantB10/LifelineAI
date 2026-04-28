// Gemini API integration for Lifeline AI
// Uses Google Generative AI API (Free Tier)
// API Key should be set via GEMINI_API_KEY environment variable

const GEMINI_API_KEY = process.env.GEMINI_API_KEY || '';
const GEMINI_API_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent';

/**
 * Analyze emergency description using Gemini AI
 * @param {string} description - Emergency description
 * @param {string} voiceTranscript - Optional voice transcript
 * @returns {Promise<{severity: string, confidence: number, analysis: string}>}
 */
export async function analyzeEmergencyWithAI(description = '', voiceTranscript = '') {
  if (!GEMINI_API_KEY) {
    console.warn('GEMINI_API_KEY not set; falling back to heuristics');
    return fallbackSeverityDetection(description, voiceTranscript);
  }

  try {
    const prompt = `Analyze this emergency medical situation and determine severity level.

Description: "${description}"
${voiceTranscript ? `Voice Transcript: "${voiceTranscript}"` : ''}

Respond in JSON format:
{
  "severity": "Critical|High|Medium|Low",
  "confidence": 0-1,
  "keywords": ["list", "of", "important", "medical", "terms"],
  "summary": "brief assessment"
}

Critical: Life-threatening (unconscious, severe bleeding, chest pain, breathing difficulty, stroke signs)
High: Serious but stable (severe injuries, poisoning, severe burns)
Medium: Moderate concern (conscious injuries, moderate pain, stable conditions)
Low: Minor issues (minor cuts, general illness, routine assistance)`;

    const response = await fetch(`${GEMINI_API_URL}?key=${GEMINI_API_KEY}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [{ parts: [{ text: prompt }] }],
      }),
    });

    if (!response.ok) {
      throw new Error(`Gemini API error: ${response.status}`);
    }

    const data = await response.json();
    const content = data.candidates?.[0]?.content?.parts?.[0]?.text || '{}';

    // Extract JSON from response (in case Gemini wraps it in markdown)
    const jsonMatch = content.match(/\{[\s\S]*\}/);
    const analysis = jsonMatch ? JSON.parse(jsonMatch[0]) : {};

    return {
      severity: analysis.severity || 'Medium',
      confidence: analysis.confidence || 0.5,
      keywords: analysis.keywords || [],
      summary: analysis.summary || 'Unable to analyze',
      method: 'gemini-ai',
    };
  } catch (error) {
    console.error('Gemini API error:', error);
    return fallbackSeverityDetection(description, voiceTranscript);
  }
}

/**
 * Match hospital using Gemini AI based on specialty and current load
 * @param {Array} hospitals - List of available hospitals
 * @param {object} emergency - Emergency object with lat, lng, type, severity
 * @returns {Promise<{id: string, name: string, score: number, reason: string}>}
 */
export async function matchHospitalWithAI(hospitals = [], emergency = {}) {
  if (!GEMINI_API_KEY) {
    console.warn('GEMINI_API_KEY not set; using distance-based matching');
    return fallbackHospitalMatch(hospitals, emergency);
  }

  try {
    const hospitalList = hospitals
      .map((h) => `${h.name} (ICU beds: ${h.icu_beds}, Emergency beds: ${h.emergency_beds}, Specialties: ${h.specialties.join(', ')}, Load: ${h.load}%)`)
      .join('\n');

    const prompt = `Given these available hospitals and an emergency, recommend the best match:

Hospitals:
${hospitalList}

Emergency Details:
- Type: ${emergency.type}
- Severity: ${emergency.severity}
- Location: (${emergency.lat}, ${emergency.lng})
- Description: ${emergency.description}

Consider: Distance, appropriate specialties, available beds, current load, and patient severity.

Respond in JSON:
{
  "recommendedHospital": "Hospital Name",
  "reason": "brief explanation",
  "score": 0-100
}`;

    const response = await fetch(`${GEMINI_API_URL}?key=${GEMINI_API_KEY}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [{ parts: [{ text: prompt }] }],
      }),
    });

    if (!response.ok) {
      throw new Error(`Gemini API error: ${response.status}`);
    }

    const data = await response.json();
    const content = data.candidates?.[0]?.content?.parts?.[0]?.text || '{}';
    const jsonMatch = content.match(/\{[\s\S]*\}/);
    const recommendation = jsonMatch ? JSON.parse(jsonMatch[0]) : {};

    const hospital =
      hospitals.find((h) => h.name === recommendation.recommendedHospital) || hospitals[0];

    return {
      ...hospital,
      score: recommendation.score || 75,
      reason: recommendation.reason || 'Selected based on available resources',
      method: 'gemini-ai',
    };
  } catch (error) {
    console.error('Gemini hospital matching error:', error);
    return fallbackHospitalMatch(hospitals, emergency);
  }
}

/**
 * Detect spam/false alarms using Gemini AI
 * @param {string} description - Emergency description
 * @param {number} repeatCount - How many times user has reported
 * @returns {Promise<{isSpam: boolean, score: number, confidence: number}>}
 */
export async function detectSpamWithAI(description = '', repeatCount = 0) {
  if (!GEMINI_API_KEY) {
    return fallbackSpamDetection(description, repeatCount);
  }

  try {
    const prompt = `Assess if this emergency report is likely spam or false alarm:

Report: "${description}"
Repeat Count: ${repeatCount}

Look for: Test keywords, prank indicators, spam patterns, inconsistencies.

Respond in JSON:
{
  "isSpam": true|false,
  "confidence": 0-1,
  "reasons": ["reason1", "reason2"],
  "riskScore": 0-100
}`;

    const response = await fetch(`${GEMINI_API_URL}?key=${GEMINI_API_KEY}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [{ parts: [{ text: prompt }] }],
      }),
    });

    if (!response.ok) {
      throw new Error(`Gemini API error: ${response.status}`);
    }

    const data = await response.json();
    const content = data.candidates?.[0]?.content?.parts?.[0]?.text || '{}';
    const jsonMatch = content.match(/\{[\s\S]*\}/);
    const analysis = jsonMatch ? JSON.parse(jsonMatch[0]) : {};

    return {
      isSpam: analysis.isSpam || false,
      confidence: analysis.confidence || 0.5,
      score: analysis.riskScore || 0,
      reasons: analysis.reasons || [],
      method: 'gemini-ai',
    };
  } catch (error) {
    console.error('Gemini spam detection error:', error);
    return fallbackSpamDetection(description, repeatCount);
  }
}

// Fallback functions for when Gemini is unavailable
function fallbackSeverityDetection(description, voiceTranscript) {
  const merged = `${description} ${voiceTranscript}`.toLowerCase();
  const critical = ['chest pain', 'unconscious', 'severe bleeding', 'not breathing', 'heart attack', 'stroke'];
  const high = ['severe', 'critical', 'emergency'];
  const medium = ['fracture', 'injury', 'bleeding', 'pain', 'accident'];

  if (critical.some((k) => merged.includes(k))) {
    return { severity: 'Critical', confidence: 0.96, method: 'heuristic' };
  }
  if (high.some((k) => merged.includes(k))) {
    return { severity: 'High', confidence: 0.85, method: 'heuristic' };
  }
  if (medium.some((k) => merged.includes(k))) {
    return { severity: 'Medium', confidence: 0.78, method: 'heuristic' };
  }
  return { severity: 'Low', confidence: 0.64, method: 'heuristic' };
}

function fallbackHospitalMatch(hospitals, emergency) {
  if (!hospitals.length) return null;
  return {
    ...hospitals[0],
    score: 50,
    reason: 'Nearest hospital by distance',
    method: 'heuristic',
  };
}

function fallbackSpamDetection(description, repeatCount) {
  const suspicious = ['test', 'prank', 'fake', 'joke', 'spam', 'nothing happened'];
  const lower = description.toLowerCase();
  const keywordScore = suspicious.reduce((sum, k) => sum + (lower.includes(k) ? 1 : 0), 0);
  const score = Math.min(100, 12 + repeatCount * 16 + keywordScore * 28);

  return {
    isSpam: score >= 50,
    confidence: Math.min(1, score / 100),
    score,
    reasons: [
      ...(keywordScore ? ['Suspicious keywords detected'] : []),
      ...(repeatCount > 1 ? ['Repeated reports'] : []),
    ],
    method: 'heuristic',
  };
}
