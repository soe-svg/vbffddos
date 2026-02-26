const express = require('express');
const http = require('http');
const { Server } = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = new Server(server);

let currentRequests = 0;
let lastRPS = 0;

app.use((req, res, next) => {
    currentRequests++;
    next();
});

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

// Beregn Requests Per Second (RPS) hvert sekund
setInterval(() => {
    lastRPS = currentRequests;
    currentRequests = 0; // Nulstil til næste måling
    io.emit('update_load', lastRPS);
}, 1000);

server.listen(3000, '0.0.0.0', () => {
    console.log('Server kører på port 3000');
    console.log('Vis monitor på: http://localhost:3000');
});
