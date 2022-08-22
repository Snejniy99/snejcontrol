import { Socket } from 'socket.io';

class ChatSocket {
  public socket: Socket;

  constructor(socket: Socket) {
    this.socket = socket;
  }

  private initializeSocket() {
    return;
  }
}

export default ChatSocket;
