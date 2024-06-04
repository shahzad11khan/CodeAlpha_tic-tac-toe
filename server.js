const express = require("express");
const http = require("http");
const socketIo = require("socket.io");
const mongoose = require("mongoose");

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

// Connect to MongoDB
mongoose.connect("mongodb://localhost:27017/mern-socketio-game", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Serve static files from the React app
app.use(express.static("client/build"));

io.on("connection", (socket) => {
  console.log("New client connected");

  socket.on("move", (data) => {
    console.log(data);
    // Broadcast the movement to all clients
    io.sockets.emit("move", data);
  });

  socket.on("disconnect", () => {
    console.log("Client disconnected");
  });
});

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
