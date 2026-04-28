import { Server } from 'socket.io';

export function initSocket(server) {
  const io = new Server(server, {
    cors: {
      origin: true,
      credentials: true,
    },
  });

  io.on('connection', (socket) => {
    socket.emit('connected', { socketId: socket.id, status: 'online' });

    socket.on('join-emergency', (emergencyId) => {
      socket.join(`emergency:${emergencyId}`);
    });

    socket.on('driver-location', (payload) => {
      if (payload?.emergencyId) {
        io.to(`emergency:${payload.emergencyId}`).emit('ambulance-location', payload);
      }
    });
  });

  return io;
}
