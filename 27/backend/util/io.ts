import http, { IncomingMessage, ServerResponse } from 'http';
import { Server } from 'socket.io';
import AppError from './AppError';

let _io: Server;

type HttpServer = http.Server<typeof IncomingMessage, typeof ServerResponse>;
const init = (server: HttpServer) => {
  _io = new Server(server, {
    cors: {
      origin: process.env.SOCKETIO_CORS_ORIGIN,
      methods: ['GET', 'POST'],
    },
  });
  _io.on('connection', (socket) => {
    console.log('Client connected', socket.client.conn.remoteAddress);
  });
};

const get = () => {
  if (!_io) throw new AppError('Socket.io not initialized');
  return _io;
};

const io = { init, get };
export default io;
