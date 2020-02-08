import { Packet } from "../types/packet";
import { Socket } from "../types/socket";
import { Error, ErrorCode } from "./error";

export class ErrorMiddlware {
    private readonly socket : Socket;

    constructor(socket: Socket){
        this.socket = socket;
    }

    public onMessage(packet : Packet, next: (error? : Error | any ) => void) {
        try {
            next();
        } catch (error) {
            this.socket.emit("ERROR", error.code || ErrorCode.UNKNOWN_ERROR);
        }
    }
}

export function middlware(socket: Socket) :  (packet : Packet, next: (error? : any ) => void) => void {

    const middlware = new ErrorMiddlware(socket);
    return middlware.onMessage.bind(middlware);
}