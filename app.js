'use strict';

const io = require('socket.io-client');
const client = io.connect('http://localhost:3001');

let file = process.argv.slice(2).shift();

const fs = require('fs');

//==================================
//2. 
const net = require('net');

//==================================

const util = require('util');
const fsRead = util.promisify(fs.readFile);
const fsWrite = util.promisify(fs.writeFile);

//==================================

const readFile = (filePath) => fsRead(filePath);
const writeFile = (filePath, buffer) => fsWrite(filePath, buffer);
const upperCase = (buffer) => {
  const convertedBuffer = buffer.toString().trim().toUpperCase();
  return Buffer.from(convertedBuffer);
}
//==================================

const events = {
  read_error: 'read_error', 
  write_error: 'write_error', 
  write_successful: 'write_success'
};

//==================================


const alterFile = (path) => {
  return readFile(path)
  .then(data => upperCase(data))
  .then(buffer => {
    console.log(buffer);
    return writeFile(path, buffer)
      .catch(e => client.emit('error', e)); 
  })
  .then(() => client.emit('write', 'test'))
  .catch(e => client.emit('error', e)) //write a message to the socket.
};

if (process.env.NODE_ENV !== 'test') {
  console.log('here is the my main script');
  alterFile(file);
}

//==================================

module.exports = {
  readFile, 
  writeFile, 
  upperCase,
}

