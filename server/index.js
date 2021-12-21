const express = require('express');
const path = require("path");
var cors = require('cors')
const app = express();
const http = require('http');
const { v4: uuidv4 } = require('uuid');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);

let connectedClients = [];
let chatMessages = [];

app.use(cors());
app.use(express.static(path.join(__dirname, "..", "dist")));
app.use(express.static("public"));

app.use((req, res, next) => {
  res.sendFile(path.join(__dirname, "..", "dist", "index.html"));
});

io.on('connection', (socket) => {
  socket.on('registerNewUser', ({ auth }) => {
    const { userId, userName, userImg } = auth;
    connectedClients.push({
      userId,
      userName,
      userImg,
      id: socket.id,
      keyId: uuidv4()
    });
    io.emit('newFriendConnected', connectedClients);
  });

  socket.on('disconnect', () => {
    connectedClients = connectedClients.filter(user => user.id !== socket.id);
    io.emit('friendDisconnected', connectedClients);
  });

  socket.on('userLoggedOut', () => {
    connectedClients = connectedClients.filter(user => user.id !== socket.id);
    io.emit('friendDisconnected', connectedClients);
  });

  socket.on('sendMessage', ({ auth, message }) => {
    const { userId, userName, userImg } = auth;
    const newMessage = {
      userId,
      userName,
      userImg,
      message,
      keyId: uuidv4()
    }
    chatMessages.push(newMessage)
    io.emit('receiveMessage', chatMessages);
  });

  socket.on('getChatMessages', () => {
    socket.emit('chatMessages', chatMessages);
  });

  socket.on('getOnlineFriends', () => {
    socket.emit('onlineFriends', connectedClients);
  });
  
});

server.listen(80, () => {
  console.log('listening on *:80');
});