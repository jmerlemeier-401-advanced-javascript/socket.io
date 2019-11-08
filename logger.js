'use strict';

const io = require('socket.io-client');
const client = io.connect('http://localhost:3001');

client.on('write_success', (payload) => {
  console.log('boooyah!', payload);
});

client.on('error', (payload) => {
  console.error('yall we errn');
})


// console.error(payload);