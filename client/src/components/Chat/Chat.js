import React, { useState, useEffect } from 'react'
import queryString from 'query-string'
import io from 'socket.io-client'
import './Chat.css'
import onlineIcon from '../../assets/icons/onlineIcon.png'
import closeIcon from '../../assets/icons/closeIcon.png'
// Components
import Infobar from '../Infobar/Infobar'
import Input from '../Input/Input'
import Messages from '../Messages/Messages'

let socket

const Chat = ({ location }) => {
    const [name, setName] = useState('')
    const [room, setRoom] = useState('')
    const [message, setMessage] = useState('')
    const [messages, setMessages] = useState([])
    const ENDPOINT = 'localhost:5000'

    useEffect(() => {
        const { name, room } = queryString.parse(location.search)
        console.log(location.search)

        socket = io(ENDPOINT)
        setName(name)
        setRoom(room)

        socket.emit('join', { name, room }, ({ error }) => {
            // setMessages([...messages, message])
        })

        return () => {
            socket.emit('disconnect')
            socket.off()
        }
    }, [ENDPOINT, location.search])

    useEffect(() => {
        socket.on('message', (message) => {
            setMessages([...messages, message])
        }, [messages])
    })

    const sendMessage = (event) => {
        console.log('sendMessage should run.')
        event.preventDefault()

        if (message) {
            socket.emit('sendMessage', message, () => setMessage(''))
        }
    }

    console.log(message, messages)
    return (
        <div className='outer-container'>
            <div className='chat-container'>
                <Infobar room={room} />
                <Messages messages={messages} name={name} />
                <Input message={message} setMessage={setMessage} sendMessage={sendMessage} />
            </div>
        </div>
    )
}

export default Chat
