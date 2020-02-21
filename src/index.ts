import socketServer from "socket.io";
import { Store } from "./store";
import { ConferenceService } from "./conferenceService";
import { middlware as errorMiddlware } from "./errors/errorMiddlware";
import { ParticipantController } from "./controllers/SocketController";

const io = socketServer(3000);
io.origins("localhost:4200");
export const store = new Store();
export const conferenceService = new ConferenceService();

io.on("connection", socket => {
  console.log(`new connection connection socket id: ${socket.id}`);

  socket.use(errorMiddlware(socket));
  new ParticipantController(socket);
});
