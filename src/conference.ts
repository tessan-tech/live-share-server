import { Participant } from "./participant";
import { Socket } from "./types/socket";
import { Server } from "./types/server";
import { Response } from "./socket-events/response-events";

export class Conference{
    private participants : Participant[] = [];
    private readonly server: Server;
    public readonly id : string;

    constructor(server: Server) {
        this.id = "to generate";
        this.server = server;
    }

    public hasParticipant() : boolean {
        return this.participants.length > 0;
    }

    public getParticipants() : Participant[] {
        return this.participants;
    }

    public emit(event: Response, ...params : any[]) : void {
        this.server.to(this.id).emit(event, ...params);
    }

    

    public addParticipant(nickname: string, socket:  Socket) : Participant {
        const participant = new Participant(nickname, socket);
        this.emit(Response.PARTICIPANT_JOINED, nickname);
        this.participants.push(participant);
        socket.join(this.id);
        socket.emit(Response.CONFERENCE_JOINED, participant)
        
        return participant;
    }
}