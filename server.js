'use strict';

const io = require('socket.io')(3001);

io.on('connection', (socket) => {
  console.log(socket.id);
  socket.on('write', (payload) => {
    console.log('WRITE');
    io.emit('write_success', payload);
  });
  socket.on('disconnect', () => {
    console.log(socket.id);
  });
});

