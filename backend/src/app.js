import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import { authRouter } from './routes/auth.routes.js';
import { citizenRouter } from './routes/citizen.routes.js';
import { driverRouter } from './routes/driver.routes.js';
import { hospitalRouter } from './routes/hospital.routes.js';
import { adminRouter } from './routes/admin.routes.js';
import { aiRouter } from './routes/ai.routes.js';
import { createEmergency, getEmergency, updateProfile } from './controllers/citizen.controller.js';
import { notFound, errorHandler } from './middleware/error.js';

export const app = express();

app.use(helmet());
app.use(cors({ origin: true, credentials: true }));
app.use(rateLimit({ windowMs: 15 * 60 * 1000, max: 200 }));
app.use(express.json({ limit: '10mb' }));

app.get('/health', (_req, res) => {
  res.json({ ok: true, service: 'lifeline-ai-backend', timestamp: new Date().toISOString() });
});

app.use('/auth', authRouter);
app.use('/sos', citizenRouter);
app.post('/sos/create', createEmergency);
app.get('/emergency/:id', getEmergency);
app.post('/profile/update', updateProfile);
app.use('/requests', driverRouter);
app.use('/ambulance', driverRouter);
app.use('/hospital', hospitalRouter);
app.use('/', adminRouter);
app.use('/ai', aiRouter);

app.use(notFound);
app.use(errorHandler);
