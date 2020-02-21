import { IResponseEvent } from "./IResponseEvent";
import { Participant } from "../participant";

enum Response {
  PARTICIPANT_JOINED = "participantJoined",
  PARTICIPANT_LEFT = "participantLeft",
  CONFERENCE_JOINED = "conferenceJoined",
  RTC_HANDSHAKE = "rtcHandshake",
  STREAM_STOPPED = "streamStopped"
}

export class ParticipantJoined implements IResponseEvent {
  eventName = Response.PARTICIPANT_JOINED;
  constructor(private nickame: String) {}

  getArguments(): any[] {
    return [this.nickame];
  }
}

export class ParticipantLeft implements IResponseEvent {
  eventName = Response.PARTICIPANT_LEFT;
  constructor(private nickame: String) {}

  getArguments(): any[] {
    return [this.nickame];
  }
}

export class ConferenceJoined implements IResponseEvent {
  eventName = Response.CONFERENCE_JOINED;
  constructor(
    private conferenceId: String,
    private nickname: String,
    private participants: Participant[]
  ) {}

  getArguments(): any[] {
    return [
      this.conferenceId,
      this.nickname,
      this.participants.map(p => p.nickname).filter(n => n !== this.nickname)
    ];
  }
}

export class RTCHandshake implements IResponseEvent {
  eventName = Response.RTC_HANDSHAKE;
  constructor(
    private senderNickname: string,
    private peerId: any,
    private rtcInfos: any
  ) {}

  getArguments(): any[] {
    return [this.senderNickname, this.peerId, this.rtcInfos];
  }
}

export class StreamStopped implements IResponseEvent {
  eventName = Response.STREAM_STOPPED;
  constructor(private senderNickname: string, private streamId: string) {}

  getArguments(): any[] {
    return [this.senderNickname, this.streamId];
  }
}
