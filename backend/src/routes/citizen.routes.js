import { Router } from 'express';
import { createEmergency, getEmergency, updateProfile } from '../controllers/citizen.controller.js';

export const citizenRouter = Router();

citizenRouter.post('/create', createEmergency);
citizenRouter.get('/emergency/:id', getEmergency);
citizenRouter.post('/profile/update', updateProfile);
