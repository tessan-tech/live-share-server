import { Packet } from "../types/packet";
import { Socket } from "../types/socket";
import { Error, ErrorCode } from "./error";

export function createMiddlware(
  socket: Socket
): (packet: Packet, next: (err?: any) => void) => void {
  return function(packet: Packet, next: (err?: any) => void) {
    const prevOn = socket.on;
    socket.on = function(
      event: string | symbol,
      listener: (...args: any[]) => void
    ) {
      prevOn(event, (...args: any[]) => {
        try {
          listener(...args);
        } catch (error) {
          console.log(error);
        }
      });
      return this;
    }.bind(socket);
  };
}
