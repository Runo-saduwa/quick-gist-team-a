const express = require('express');
const cors = require('cors');
const socketio = require("socket.io");
const http = require('http');
const app = express();
const server = http.createServer(app);
const io = socketio(server);
const {addUser, removeUser, getUser, getUsersRoom} = require('./utils/users');
const Filter = require('bad-words');
const PORT = process.env.PORT || 5000;
const router = require('./routes');
const filter = new Filter();

 



io.on('connection', (socket) => {


  socket.on('join', ({name, room}, callback) => {
     const {error, user} = addUser({id: socket.id, name, room});

     if(error){
        return callback(error)
     }
      
     socket.emit('message', {user:'admin', text:`${user.name}, welcome to the room ${user.room}`})
     socket.broadcast.to(user.room).emit('message', {user:'admin', text: `${user.name}, has joined. Take some time out to say hello!`})
     
     socket.join(user.room);


      

     io.to(user.room).emit('roomData', {room:user.room, users:getUsersRoom(user.room)})
     callback()

  });


  socket.on('sendMessage', (message, callback) => {
  const user = getUser(socket.id);
  io.to(user.room).emit('message', {user:user.name, text: filter.clean(message)});
  io.to(user.room).emit('roomData', {room:user.room, users: getUsersRoom(user.room)});

  callback();
  })

  socket.on('typing', (typing) => {


    socket.broadcast.emit('typing', typing);

   

  // callback();


  })


  socket.on('disconnect', () => {
      const user = removeUser(socket.id);

      if(user){
          io.to(user.room).emit('message', {user:'admin', text: `${user.name} has left.`})
      }
  })
})


// // --- Connection

//  /*
//      - * 'sendMessage' - listens for 'sendMessage' event from the client
//      - *  response expected - this event expects to recieve a string, 'message' in the following format:
//        * 
//            STRING message
//        *
//     */



// Middleware



app.use(router);
app.use(cors());


server.listen(PORT, () => {
    console.log('Server is Up and running on port ' + PORT);
})