import http from 'http';
import { someText, requestHandler } from './routes';

console.log(someText);

const server = http.createServer(requestHandler);

server.listen(3000);
