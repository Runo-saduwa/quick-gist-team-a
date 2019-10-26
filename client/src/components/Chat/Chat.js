import React, { useState, useEffect } from 'react'
import queryString from 'query-string'
import io from 'socket.io-client'

let socket

const Chat = ({ location }) => {
    const [name, setName] = useState('')
    const [room, setRoom] = useState('')
    const ENDPOINT = 'localhost:5000'

    useEffect(() => {
        const { name, room } = queryString.parse(location.search)
        console.log(location.search)

        socket = io(ENDPOINT)

        console.log(socket)
    })
    return (
        <h1>Chat</h1>
    )
}

export default Chat
