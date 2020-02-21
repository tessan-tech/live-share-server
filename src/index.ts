import { Store } from "./store";
import { ConferenceService } from "./conferenceService";
import { middlware as errorMiddlware } from "./errors/errorMiddlware";
import { ParticipantController } from "./controllers/SocketController";
import express from "express";
import socketIO from "socket.io";

const app = express().listen(process.env.PORT || 3001, () =>
  console.log("Listening on port: " + (process.env.PORT || 3001))
);
const io = socketIO(app);
io.origins("*:*");
export const store = new Store();
export const conferenceService = new ConferenceService();

io.on("connection", (socket: socketIO.Socket) => {
  console.log(`new connection connection socket id: ${socket.id}`);
  socket.use(errorMiddlware(socket));
  new ParticipantController(socket);
});
