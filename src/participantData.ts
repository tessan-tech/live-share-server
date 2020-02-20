import { Conference } from "./conference";

export class ParticipantData {
  conference: Conference;
  nickname: string;

  constructor(conference: Conference, nickname: string) {
    this.conference = conference;
    this.nickname = nickname;
  }

  setNickname(nickname: string) {
    this.nickname = nickname;
  }

  setConference(conference: Conference) {
    this.conference = conference;
  }
}
