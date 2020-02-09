import { Participant } from "./participant";
import { Socket } from "./types/socket";
import { Server } from "./types/server";
import { Error, ErrorCode } from "./errors/error"

export class Conference {
    private participants: Participant[] = [];
    private readonly server: Server;
    public readonly id: string;

    constructor(server: Server) {
        this.id = "to generate";
        this.server = server;
    }

    public hasParticipant(): boolean {
        return this.participants.length > 0;
    }

    public getParticipants(): Participant[] {
        return this.participants;
    }

    public getParticipant(nickname: String): Participant {
        const participant = this.participants.find(p => p.nickname === nickname)
        if (participant === undefined) throw new Error(ErrorCode.CANT_FIND_PARTICIPANT)
        return participant
    }

    public emit(event: string, ...params: any[]): void {
        this.server.to(this.id).emit(event, ...params);
    }



    public addParticipant(nickname: string, socket: Socket): Participant {
        const participant = new Participant(nickname, socket);
        this.emit("participantJoined", nickname);
        this.participants.push(participant);
        socket.join(this.id);
        socket.emit(Response.CONFERENCE_JOINED, participant)

        return participant;
    }
}