import { detectSeverity, detectSpam, matchHospital } from '../services/ai.js';

export async function severity(req, res) {
  res.json(detectSeverity(req.body));
}

export async function hospitalMatch(req, res) {
  res.json({ hospital: matchHospital(req.body) });
}

export async function fakeCheck(req, res) {
  res.json(detectSpam(req.body));
}
