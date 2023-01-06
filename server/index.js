const express = require("express");
const http = require("http");
const mongoose = require("mongoose");

const app = express();
const port = process.env.PORT || 3000;
var server = http.createServer(app);
const Room = require("./models/room");
var io = require("socket.io")(server);

// middle ware
app.use(express.json());

const DB =
  "mongodb+srv://dhruv1206:dhruv_1206@cluster0.0xhhdun.mongodb.net/?retryWrites=true&w=majority";

io.on("connection", (socket) => {
  console.log("connected");
  socket.on("createRoom", async ({ nickname }) => {
    console.log(nickname);
    
    try{
      let room = new Room();
      let player = {
        socketID:socket.id,
        nickname,
        playerType:'X',
      };
      room.players.push(player);
      room.turn = player;
      room = await room.save();
      console.log(room);
      const roomId = room._id;
      socket.join(roomId);

      io.to(roomId).emit("createRoomSuccess",room); 
    }
    catch(e){
      console.log(e);
    }
  });
});

mongoose
  .connect(DB)
  .then(() => {
    console.log("Connection successful!");
  })
  .catch((e) => {
    console.log(e);
  });

server.listen(port, "0.0.0.0", () => {
  console.log(`Server started and running on port ${port}`);
});