import socketServer from "socket.io";
import { Store } from "./store";
import { ConferenceService } from "./conferenceService";
import { middlware as errorMiddlware } from "./errors/errorMiddlware";
import { Error, ErrorCode } from "./errors/error";

const io = socketServer();
const store = new Store();
const conferences = new ConferenceService();

io.on("connection", socket => {
    socket.use(errorMiddlware(socket));
    socket.on("createConference", nickname => {
        const hasConference = conferences.hasConference(socket);
        if (hasConference)
            throw new Error(ErrorCode.CANT_CREATE_CONFERENCE_USER_ALREADY_ASSIGNED);
        const conference = conferences.createConference();
        conference.addParticipant(nickname, socket);
      });
});