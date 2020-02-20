import { Socket } from "./types/socket";
import { IResponseEvent } from "./socket-events/IResponseEvent";

export class Participant {
  private readonly socket: Socket;
  public readonly nickname: string;

  constructor(nickname: string, socket: Socket) {
    this.socket = socket;
    this.nickname = nickname;
  }

  public send(event: IResponseEvent) {
    this.socket.emit(event.eventName, ...event.getArguments());
  }
}
