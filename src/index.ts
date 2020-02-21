import { Socket } from "socket.io";
import { Store } from "./store";
import { ConferenceService } from "./conferenceService";
import { middlware as errorMiddlware } from "./errors/errorMiddlware";
import { ParticipantController } from "./controllers/SocketController";
import express from "express";

const app = express();
const server = require("http").createServer(app);
const io = require("socket.io")(server);
io.origins("*:*");
export const store = new Store();
export const conferenceService = new ConferenceService();

app.get("/", (req, res) => {
  res.send({ status: "OK" });
});

io.on("connection", (socket: Socket) => {
  console.log(`new connection connection socket id: ${socket.id}`);
  socket.use(errorMiddlware(socket));
  new ParticipantController(socket);
});

server.listen(3001, () => {
  console.log("listening...");
});
