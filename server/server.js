const express = require('express');
const socketio = require("socket.io");
const http = require('http');
const app = express();
const server = http.createServer(app);
const io = socketio(server);
const {addUser, removeUser, getUser, getUsersRoom} = require('./utils/users')
const PORT = process.env.PORT || 5000;
const router = require('./routes');


io.on('connection', (socket) => {


  socket.on('join', ({name, room}, callback) => {
     const {error, user} = addUser({id: socket.id, name, room});

     console.log(name, room)

     if(error){
        return callback(error)
     }
      
     socket.emit('message', {user:'admin', text:`${user.name}, welcome to the room ${user.room}`})
      console.log(user.name, user.room)
     socket.broadcast.to(user.room).emit('message', {user:'admin', text: `${user.name}, has joined. Take some time out to say hello!`})
     
     socket.join(user.room);


      

     io.to(user.room).emit('roomData', {room:user.room, users:getUsersRoom(user.room)})
     callback();


  });


  socket.on('sendMessage', (message, callback) => {
  const user = getUser(socket.id);
  io.to(user.room).emit('message', {user:user.name, text: message});
  io.to(user.room).emit('roomData', {room:user.room, users: getUsersRoom(user.room)});

  callback();
  })


  socket.on('disconnect', () => {
      const user = removeUser(socket.id);

      if(user){
          io.to(user.room).emit('message', {user:'admin', text: `${user.name} has left.`})
      }
  })
})


// // --- Connection
// io.on('connection', (socket) => {

//     /*
//      - * 'join' - listens for join from the client
//      - *  response expected - this event expects to recieve an object with 'name and room'  in the following format :
//        * {
//            name: 'name',
//            room: 'room
//          }
//        *
//     */

//    socket.on('join', ({name, room}, callback) => {
//     const {error, user} = addUser({id: socket.id, name, room});

//     if(error){
//        return callback(error)
//     }
     
//     socket.emit('message', {user:'admin', text:`${user.name}, welcome to the room ${user.room}`})
//      console.log(user.name, user.room)
//     socket.broadcast.to(user.room).emit('message', {user:'admin', text: `${user.name}, has joined. Take some time out to say hello!`})
    
//     socket.join(user.room);


     

//     io.to(user.room).emit('roomData', {room:user.room, users:getUsersRoom(user.room)})
//     callback();

//    });

   
//  /*
//      - * 'sendMessage' - listens for 'sendMessage' event from the client
//      - *  response expected - this event expects to recieve a string, 'message' in the following format:
//        * 
//            STRING message
//        *
//     */

//    socket.on('sendMessage', (message, callback) => {
//     const user = getUser(socket.id);
//     io.to(user.room).emit('message', {user:user.name, text: message});
//     io.to(user.room).emit('roomData', {room:user.room, users: getUsersRoom(user.room)});

//     callback();
//    })


//  socket.on('disconnect', () => {
//   const user = removeUser(socket.id);

//   if(user){
//       io.to(user.room).emit('message', {user:'admin', text: `${user.name} has left.`})
//   }

//  })


// })

// Middleware
app.use(router);


server.listen(PORT, () => {
    console.log('Server is Up and running on port ' + PORT);
})