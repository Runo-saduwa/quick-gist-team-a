### QuickGist - Real-time multiuser Chat Application

#### Description:

QuickGist is a real-time chat application, that allows multiple users join different chat rooms to interact about a random topic.

#### Technologies:
 * Backend - Express.js Socket.IO, and Node.js 
 * Frontend - React.js

#### How to start server

 * cd into server directory
 * ```npm install```
 * ```npm start```
 
#### DOCUMENTATION

  ## Backend - 
     * Event - 'join' - listens for 'join' from the client
       response emitted - The client emits an object with 'name and room' properties  in the following format:

       ```{
           name: 'name',
           room: 'room
         } ```
         
     * Event - 'sendMessage' - listens for 'sendMessage' event from the client
       response emitted - this event expects to recieve a string, 'message' in the following format:
       ```
       STRING message 
        ```



