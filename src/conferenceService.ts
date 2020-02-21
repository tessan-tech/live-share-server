import { Conference } from "./conference";
import { Participant } from "./participant";
import { ErrorCode } from "./errors/error";

export class ConferenceService {
  private conferences: Map<string, Conference> = new Map<string, Conference>();

  public createConference(id: string = undefined): Conference {
    const conference = new Conference(id);
    this.conferences.set(conference.id, conference);
    return conference;
  }

  getConference(id: string): Conference {
    return this.conferences.get(id);
  }

  checkGetConference(id: string): Conference {
    const conference = this.conferences.get(id);
    if (conference == undefined)
      throw new Error(ErrorCode.CONFERENCE_DOES_NOT_EXIST);
    return conference;
  }

  removeConference(conference: Conference): void {
    this.conferences.delete(conference.id);
    console.log(`conference ${conference.id} deleted`);
  }
}
