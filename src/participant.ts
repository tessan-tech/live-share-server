import { Socket } from "./types/socket";
import { IResponseEvent } from "./socket-events/IResponseEvent";
import { ErrorCode } from "./errors/error";

export class Participant {
  private readonly socket: Socket;
  public readonly nickname: string;

  constructor(nickname: string, socket: Socket) {
    if (!nickname || nickname === "")
      throw new Error(ErrorCode.INVALID_NICKNAME);
    this.socket = socket;
    this.nickname = nickname;
  }

  public send(event: IResponseEvent) {
    this.socket.emit(event.eventName, ...event.getArguments());
  }
}
