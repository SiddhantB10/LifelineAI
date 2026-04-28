import { Router } from 'express';
import { acceptAmbulance, requestsNearby, updateLocation, updateStatus } from '../controllers/driver.controller.js';

export const driverRouter = Router();

driverRouter.get('/nearby', requestsNearby);
driverRouter.post('/accept', acceptAmbulance);
driverRouter.post('/location', updateLocation);
driverRouter.post('/status', updateStatus);
