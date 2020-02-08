import { Socket } from "./types/socket";

export class Participant {
    public readonly socket : Socket;
    public readonly nickname : string;

    constructor(nickname: string, socket : Socket) {
        this.socket = socket;
        this.nickname = nickname;
    }
}