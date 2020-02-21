import { Store } from "./store";
import { ConferenceService } from "./conferenceService";
import { createMiddlware } from "./errors/errorMiddlware";
import { ParticipantController } from "./controllers/SocketController";
import express from "express";
import socketIO from "socket.io";
import { ErrorCode } from "./errors/error";

const app = express().listen(process.env.PORT || 3001, () =>
  console.log("Listening on port: " + (process.env.PORT || 3001))
);
const io = socketIO(app);
io.origins("*:*");
export const store = new Store();
export const conferenceService = new ConferenceService();

io.on("connection", (socket: socketIO.Socket) => {
  const prevOn = socket.on.bind(socket);
  socket.on = function(
    event: string | symbol,
    listener: (...args: any[]) => void
  ) {
    prevOn(event, (...args: any[]) => {
      try {
        listener(...args);
      } catch (error) {
        socket.emit("ERROR", error.code || ErrorCode.UNKNOWN_ERROR);
      }
    });
    return socket;
  };
  new ParticipantController(socket);
});
