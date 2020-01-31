var app = require("express")();
var http = require("http").createServer(app);
var io = require("socket.io")(http);
var short = require("short-uuid");

const conferences = {};

io.on("connection", function(socket) {
  socket.data = {};
  console.log("a user connected");

  socket.on("disconnect", function() {
    const conference = socket.data.conference;
    if (conference == null) return;
    conference.participants = conference.participants.filter(
      p => p.nickname != socket.data.nickname
    );
    if (conference.participants.lenght == 0) deleteConference(conference);
    io.to(conference.conferenceId).emit(
      "participantLeft",
      socket.data.nickname
    );
  });

  socket.on("createConference", nickname => {
    const conference = createConference();
    console.log(`${nickname} created conference ${conference.conferenceId}`);
    addToConference(socket, nickname, conference);
  });

  socket.on("joinConference", (conferenceId, nickname) => {
    addToConference(socket, nickname, getConference(conferenceId));
  });

  socket.on("rtcHandshake", (nickname, peerId, rtcInfos) => {
    const recipiant = socket.data.conference.participants.find(
      p => p.nickname == nickname
    );
    console.log(
      `${socket.data.nickname} sending rtc handshake to ${recipiant.nickname}`
    );
    console.log(`${socket.id} sending rtc handshake to ${recipiant.socket.id}`);
    console.log(peerId);

    recipiant.socket.emit(
      "rtcHandshake",
      socket.data.nickname,
      peerId,
      rtcInfos
    );
  });
});

function getConference(conferenceId) {
  return conferences[conferenceId];
}

function createConference() {
  const conference = {
    conferenceId: short.generate(),
    participants: []
  };
  conferences[conference.conferenceId] = conference;
  return conference;
}

function deleteConference(conference) {
  console.log(`delete conference ${conference.conferenceId}`);

  delete conferences[conference.conferenceId];
  conference.participants.forEach(p => {
    p.socket.disconnect();
  });
}

function addToConference(socket, nickname, conference) {
  socket.data.conference = conference;
  socket.data.nickname = nickname;
  socket.conference = conference;

  io.to(conference.conferenceId).emit("participantJoined", nickname);

  socket.emit(
    "conferenceJoined",
    conference.conferenceId,
    nickname,
    conference.participants.map(p => p.nickname)
  );
  conference.participants.push({ nickname, socket });
  socket.join(conference.conferenceId);
  console.log(`${nickname} joined conference ${conference.conferenceId}`);
}

http.listen(3000, function() {
  console.log("listening on *:3000");
});
