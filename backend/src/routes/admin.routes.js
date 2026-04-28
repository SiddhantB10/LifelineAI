import { Router } from 'express';
import { analytics, fleet, heatmap } from '../controllers/admin.controller.js';

export const adminRouter = Router();

adminRouter.get('/analytics', analytics);
adminRouter.get('/heatmap', heatmap);
adminRouter.get('/fleet/live', fleet);
