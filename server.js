const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const cors = require('cors');

const app = express();
app.use(cors());

const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"]
  }
});

let spectators = 0;
let currentBattle = null;

io.on('connection', (socket) => {
  console.log('New client connected');
  spectators++;
  io.emit('spectator_update', spectators);

  socket.on('start_battle', (data) => {
    currentBattle = {
      characters: data.characters,
      startTime: Date.now(),
      spectators: spectators
    };
    io.emit('battle_start', currentBattle);

    // Simulate battle duration
    setTimeout(() => {
      const winner = Math.random() > 0.5 ? data.characters[0] : data.characters[1];
      io.emit('battle_end', {
        ...currentBattle,
        winner,
        duration: Date.now() - currentBattle.startTime
      });
      currentBattle = null;
    }, 5000);
  });

  socket.on('disconnect', () => {
    console.log('Client disconnected');
    spectators--;
    io.emit('spectator_update', spectators);
  });
});

const PORT = process.env.PORT || 3001;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
}); 