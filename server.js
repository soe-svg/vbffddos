const express = require('express');
const http = require('http');
const { Server } = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = new Server(server);

let requestCount = 0;

// Middleware der tæller alle hits
app.use((req, res, next) => {
    requestCount++;
    next();
});

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

// Nulstil tælleren og send data hvert sekund
setInterval(() => {
    io.emit('update_load', requestCount);
    // Vi sænker tælleren gradvist for at simulere server-recovery, 
    // eller du kan nulstille den helt med requestCount = 0;
    requestCount = Math.max(0, requestCount - 5); 
}, 1000);

server.listen(3000, () => {
    console.log('Server kører på http://localhost:3000');
});
