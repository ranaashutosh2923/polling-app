// server/index.js

const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");

const app = express();
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"]
  }
});

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Live Polling Server is running!");
});

// === Poll State & History ===
let currentPoll = null;
let answers = {};
let students = {}; // socket.id => name
let pollHistory = []; // array of { question, results }
let pollTimer = null;

const emitStudentList = () => {
  const studentList = Object.entries(students).map(([id, name]) => ({ id, name }));
  io.emit("studentList", studentList);
};

const endPoll = () => {
  if (!currentPoll) return;
  const results = {};
  currentPoll.options.forEach(opt => results[opt] = 0);
  Object.values(answers).forEach(choice => {
    if (results[choice] !== undefined) results[choice]++;
  });

  io.emit("pollResults", {
    question: currentPoll.question,
    results
  });

  pollHistory.push({
    question: currentPoll.question,
    results
  });

  currentPoll = null;
  answers = {};
  if (pollTimer) {
    clearTimeout(pollTimer);
    pollTimer = null;
  }
};

io.on("connection", (socket) => {
  console.log("🟢 Connected:", socket.id);

  const auth = socket.handshake.auth;
  console.log("🔎 Incoming socket.auth:", auth);
  const role = auth?.role;
  const name = auth?.name;

  if (role === "student") {
    students[socket.id] = name;
    emitStudentList();
    console.log(`👨‍🎓 Student joined: ${name} (${socket.id})`);
  } else if (role === "teacher") {
    console.log(`👩‍🏫 Teacher joined: (${socket.id})`);
    socket.emit("pollHistory", pollHistory); // send history on teacher login
  }

  socket.on("startPoll", (pollData) => {
    currentPoll = {
      question: pollData.question,
      options: pollData.options
    };
    answers = {};
    io.emit("pollStarted", currentPoll);

    if (pollData.timer) {
      pollTimer = setTimeout(endPoll, pollData.timer * 1000);
    }
  });

  socket.on("submitAnswer", (data) => {
    answers[socket.id] = data.choice;
  });

  socket.on("endPoll", endPoll);

  socket.on("chatMessage", (msg) => {
    io.emit("chatMessage", msg);
  });

  socket.on("kickStudent", ({ id }) => {
    const kickedSocket = io.sockets.sockets.get(id);
    if (kickedSocket) {
      kickedSocket.emit("kicked");
      kickedSocket.disconnect(true);
      console.log(`❌ Kicked student: ${students[id]} (${id})`);
    }
  });

  socket.on("disconnect", () => {
    if (students[socket.id]) {
      delete students[socket.id];
      emitStudentList();
    }
  });
});

const PORT = 4000;
server.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
