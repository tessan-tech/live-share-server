import { Conference } from "./conference";
import { Participant } from "./participant";
import { ErrorCode } from "./errors/error";

export class ConferenceService {
  private conferences: Map<string, Conference> = new Map<string, Conference>();

  public createConference(): Conference {
    const conference = new Conference();
    this.conferences.set(conference.id, conference);
    return conference;
  }

  checkGetConference(id: string): Conference {
    const conference = this.conferences.get(id);
    if (conference == undefined)
      throw new Error(ErrorCode.CONFERENCE_DOES_NOT_EXIST);
    return conference;
  }
}
