const express = require('express');
const socketio = require("socket.io");
const http = require('http');
const app = express();
const server = http.createServer(app);
const io = socketio(server);
const {addUser, removeUser, getUser, getUsersRoom} = require('./utils/users');
const Filter = require('bad-words');
const PORT = process.env.PORT || 8080;
const router = require('./routes');
const filter = new Filter();
const cors = require('cors');
const bodyParser = require('body-parser');
//sgMail.setApiKey(process.env.SENDGRID_API_KEY);





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

//app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }))
 
// parse application/json
app.use(bodyParser.json())


// var allowCrossDomain = function(req, res, next) {
//   res.header("Access-Control-Allow-Origin", "*"); // allow requests from any other server
//   res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE'); // allow these verbs
//   res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Cache-Control");
//   next();
// }
 // app.use(allowCrossDomain)


app.use(router);
app.use(cors())


server.listen(PORT, () => {
    console.log('Server is Up and running on port ' + PORT);
})