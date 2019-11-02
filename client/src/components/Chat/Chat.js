import React, { useState, useEffect } from 'react'
import queryString from 'query-string'
import io from 'socket.io-client'
import './Chat.css'
// Components
import Infobar from '../Infobar/Infobar'
import Input from '../Input/Input'
import Messages from '../Messages/Messages'
import Users from '../Users/Users'

let socket

const Chat = ({ location }) => {
    const [name, setName] = useState('')
    const [room, setRoom] = useState('')
    const [users, setUsers] = useState('');
    const [message, setMessage] = useState('')
    const [messages, setMessages] = useState([])
    const [typing, setTyping] = useState(false)
    const ENDPOINT = 'localhost:5000'

    useEffect(() => {
        const { name, room } = queryString.parse(location.search);

        socket = io(ENDPOINT);

        setRoom(room);
        setName(name)

        socket.emit('join', { name, room }, (error) => {
            if (error) {
                alert(error);
            }
        });
    }, [ENDPOINT, location.search]);

    useEffect(() => {
        socket.on('message', (message) => {
            setMessages([...messages, message]);
        });

        socket.on('typing', (typing) => {
            setTyping(typing)
        })

        socket.on('roomData', ({ users }) => {
            setUsers(users)
        })

        return () => {
            socket.emit('disconnect');

            socket.off();
        }
    }, [messages])

    const sendMessage = (event) => {
        event.preventDefault();
       

        socket.emit('typing', typing, () => setTyping(false))
        if (message) {
            socket.emit('sendMessage', message, () => setMessage(''));

        }
       
    }

    const onTyping = () => {
        let typing = true;
        socket.emit('typing', typing, () => setTyping(false))
      
    }

  

    return (
        <div className='outer-container'>
            <div className='chat-container'>
                <Infobar room={room} typing={typing}/>
                <Messages messages={messages} name={name} />
                <Input message={message} setMessage={setMessage} sendMessage={sendMessage} onTyping={onTyping}/>
            </div>
            <Users users={users} />
        </div>
    )
}

export default Chat
