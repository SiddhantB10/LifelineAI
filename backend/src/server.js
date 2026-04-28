import http from 'node:http';
import dotenv from 'dotenv';
import { app } from './app.js';
import { initSocket } from './socket/index.js';
import { logInfo } from './utils/logger.js';

dotenv.config();

const port = process.env.PORT || 4000;
const server = http.createServer(app);
initSocket(server);

server.listen(port, () => {
  logInfo(`Lifeline AI backend running on port ${port}`);
});
