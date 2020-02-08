import { Conference } from "./conference";
import { Socket } from "./types/socket";
import { flatten } from "lodash";

export class ConferenceService {
    private conferences : Conference[] = [];

    public createConference() : Conference {
        
        const conference = new Conference();
        this.conferences.push(conference);
        return conference;
    }

    public hasConference(socket : Socket) : boolean  {
        const allParticipants = flatten(this.conferences.map(c => c.getParticipants()));
        return allParticipants.find(p => p.socket.id === socket.id) !== undefined;
    }
}