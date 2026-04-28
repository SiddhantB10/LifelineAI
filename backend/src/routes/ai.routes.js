import { Router } from 'express';
import { fakeCheck, hospitalMatch, severity } from '../controllers/ai.controller.js';

export const aiRouter = Router();

aiRouter.post('/severity', severity);
aiRouter.post('/hospital-match', hospitalMatch);
aiRouter.post('/fake-check', fakeCheck);
