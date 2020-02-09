import { Conference } from "../conference";
import { Socket } from "../types/socket";
import { Participant } from "../participant";

export class ParticipantController {
    constructor(private socket: Socket, private nickname: string, private conference: Conference) {
        socket.on("createConference", this.onCreateConference.bind(this))
        socket.on("joinConference", this.onJoinConference.bind(this))
        socket.on("rtcHandshake", this.onRTCHandshake.bind(this))
    }

    private onCreateConference(nickname: string) {

    }

    private onJoinConference(conferenceId: string, nickname: string) {

    }

    private onRTCHandshake(recipientNickname: string, peerId: any, rtcInfos: any) {

    }

    public sendRTCHandshake(recipiant: Participant, peerId: any, rtcInfos: any) {
        this.socket.emit("rtcHandshake", this.nickname, peerId, rtcInfos)
    }
}