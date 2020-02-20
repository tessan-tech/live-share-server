import { Participant } from "./participant";
import { Socket } from "./types/socket";
import { Server } from "./types/server";
import { Error, ErrorCode } from "./errors/error";
import { IResponseEvent } from "./socket-events/IResponseEvent";
import {
  ParticipantJoined,
  ParticipantLeft
} from "./socket-events/response-events";

export class Conference {
  private participants: Participant[] = [];
  public readonly id: string;

  constructor() {
    this.id = "unidjust3commeca";
  }

  public hasParticipant(): boolean {
    return this.participants.length > 0;
  }

  public getParticipants(): Participant[] {
    return this.participants;
  }

  public checkGetParticipant(nickname: String): Participant {
    const participant = this.participants.find(p => p.nickname === nickname);
    if (participant === undefined)
      throw new Error(ErrorCode.CANT_FIND_PARTICIPANT);
    return participant;
  }

  public removeParticipant(nickname: string) {
    const toRemove = this.participants.find(p => p.nickname === nickname);
    if (toRemove === undefined)
      throw new Error(ErrorCode.CANT_REMOVE_PARTICIPANT_DOES_NOT_EXIST);
    console.log(`${nickname} left conference ${this.id}`);
    this.participants = this.participants.filter(p => p !== toRemove);
    this.broadcast(new ParticipantLeft(nickname));
  }

  public checkAddParticipant(newParticipant: Participant) {
    if (this.participants.find(p => p.nickname == newParticipant.nickname))
      throw new Error(ErrorCode.NICKNAME_CONFLICT);
    this.participants.push(newParticipant);
    this.broadcast(
      new ParticipantJoined(newParticipant.nickname),
      newParticipant.nickname
    );
  }

  public broadcast(event: IResponseEvent, exceptNickname: string = undefined) {
    const recipiants = exceptNickname
      ? this.participants.filter(p => p.nickname !== exceptNickname)
      : this.participants;
    recipiants.forEach(p => p.send(event));
  }
}
