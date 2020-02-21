import { Conference } from "../conference";
import { Socket } from "../types/socket";
import { Participant } from "../participant";
import { ErrorCode } from "../errors/error";
import { store, conferenceService } from "..";
import { ParticipantData } from "../participantData";
import {
  RTCHandshake,
  ConferenceJoined,
  StreamStopped
} from "../socket-events/response-events";
import { IResponseEvent } from "../socket-events/IResponseEvent";

export class ParticipantController {
  constructor(private socket: Socket) {
    socket.on("createConference", this.onCreateConference.bind(this));
    socket.on("joinConference", this.onJoinConference.bind(this));
    socket.on("rtcHandshake", this.onRTCHandshake.bind(this));
    socket.on("streamStopped", this.onStreamStopped.bind(this));
    socket.on("disconnect", this.onDisconnect.bind(this));
  }

  send(event: IResponseEvent): void {
    this.socket.emit(event.eventName, ...event.getArguments());
  }

  checkGetParticipantData(): ParticipantData {
    const data = store.getData(this.socket.id);
    if (data == undefined)
      throw new Error(ErrorCode.USER_IS_NOT_IN_A_CONFERENCE);
    return data;
  }

  onCreateConference(nickname: string): void {
    const conference = conferenceService.createConference();
    console.log(`conference ${conference.id} cree`);
    this.checkJoinConference(conference, nickname);
  }

  checkJoinConference(conference: Conference, nickname: string): void {
    if (store.getData(this.socket.id) !== undefined)
      throw new Error(ErrorCode.CANT_CREATE_CONFERENCE_USER_ALREADY_ASSIGNED);
    conference.checkAddParticipant(new Participant(nickname, this.socket));
    store.createData(this.socket.id, conference, nickname);
    console.log(`user ${nickname} joined conference ${conference.id}`);
    const confJoinedEvent = new ConferenceJoined(
      conference.id,
      nickname,
      conference.getParticipants()
    );

    this.send(confJoinedEvent);
  }

  onJoinConference(conferenceId: string, nickname: string): void {
    const conference =
      conferenceService.getConference(conferenceId) ||
      conferenceService.createConference(conferenceId);
    this.checkJoinConference(conference, nickname);
  }

  onStreamStopped(streamId: string): void {
    const { conference, nickname } = this.checkGetParticipantData();
    console.log(`stream ${streamId} stopped`);

    conference.broadcast(new StreamStopped(nickname, streamId), nickname);
  }

  onDisconnect(): void {
    console.log(`socket: ${this.socket.id} disconnected`);
    const participantData = store.getData(this.socket.id);
    if (!participantData) return;
    const conference = participantData.conference;
    conference.removeParticipant(participantData.nickname);
    if (!conference.hasParticipant())
      conferenceService.removeConference(conference);
  }

  onRTCHandshake(recipientNickname: string, peerId: any, rtcInfos: any): void {
    this.checkGetParticipantData()
      .conference.checkGetParticipant(recipientNickname)
      .send(
        new RTCHandshake(
          this.checkGetParticipantData().nickname,
          peerId,
          rtcInfos
        )
      );
  }
}
