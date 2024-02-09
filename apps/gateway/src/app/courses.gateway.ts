import { OnGatewayConnection, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

@WebSocketGateway(31820, { transports: ['websocket'] })
// @WebSocketGateway(31820, { transports: ['websocket'] })
export class CoursesGateway implements OnGatewayConnection {
  @WebSocketServer() server: Server;

  handleConnection(client: Socket): void {
    console.warn(client.id);
    client.on('reloadCourses', () => this.server.emit('fetchData', { refetch: true, socketId: client.id }));
  }
}
