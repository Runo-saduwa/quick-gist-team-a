const express = require('express');
const socketio = require("socket.io");
const http = require('http');
const app = express();
const server = http.createServer(app);
const io = socketio(server);
const {addUser, removeUser, getUser, getUsersRoom} = require('./utils/users')
const PORT = process.env.PORT || 5000;




// --- Connection
io.on('connection', (socket) => {

    /*
     - * 'join' - listens for join from the client
     - *  response expected - this event expects to recieve an object with 'name and room'  in the following format :
       * {
           name: 'name',
           room: 'room
         }
       *
    */

   socket.on('join', ({name, message}) => {
    
   });

   
 /*
     - * 'sendMessage' - listens for 'sendMessage' event from the client
     - *  response expected - this event expects to recieve a string, 'message' in the following format:
       * 
           STRING message
       *
    */

   socket.on('sendMessage', (message) => {

   })


 socket.on('disconnect', () => {
  const user = removeUser(socket.id);

  if(user){
      io.to(user.room).emit('message', {user:'admin', text: `${user.name} has left.`})
  }
  
 })


})

server.listen(PORT, () => {
    console.log('Server is Up and running on port' + PORT);
})