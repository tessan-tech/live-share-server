import { ParticipantData } from "./participantData";
import { Conference } from "./conference";

export class Store {
  private store: Map<string, ParticipantData>;

  constructor() {
    this.store = new Map<string, ParticipantData>();
  }

  public getData(socketId: string): ParticipantData | undefined {
    return this.store.get(socketId);
  }

  public createData(
    socketId: string,
    conference: Conference,
    nickname: string
  ): ParticipantData {
    const data = new ParticipantData(conference, nickname);
    this.store.set(socketId, data);
    return data;
  }
}
