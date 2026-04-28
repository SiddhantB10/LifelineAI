import { Router } from 'express';
import { incomingCases, updateBeds } from '../controllers/hospital.controller.js';

export const hospitalRouter = Router();

hospitalRouter.get('/incoming-cases', incomingCases);
hospitalRouter.post('/beds/update', updateBeds);
