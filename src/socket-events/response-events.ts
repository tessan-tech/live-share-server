import { IResponseEvent } from "./IResponseEvent";
import { Participant } from "../participant";

enum Response {
    PARTICIPANT_JOINED = "participantJoined",
    PARTICIPANT_LEFT = "participantLeft",
    CONFERENCE_JOINED = "conferenceJoined"
}

export class ParticipantJoined implements IResponseEvent {
    eventName = Response.PARTICIPANT_JOINED;
    constructor(private nickame: String) {}
    
    getArguments(): any[] {
        return [this.nickame]
    }
}

export class ParticipantLeft implements IResponseEvent {
    eventName = Response.PARTICIPANT_LEFT;
    constructor(private nickame: String) {}
    
    getArguments(): any[] {
        return [this.nickame]
    }
}

export class ConferenceJoined implements IResponseEvent {
    eventName = Response.PARTICIPANT_JOINED;
    constructor(private conferenceId: String, private nickname: String, private participants: Participant[]) {}
    
    getArguments(): any[] {
        return [this.conferenceId, this.nickname, this.participants]
    }
}