import React from 'react'
import 'circular-std'
import './Input.css'
import { FiArrowUp } from 'react-icons/fi'

const Input = ({ message, setMessage, sendMessage }) => {
    return (
        <form className='border pl-3 mx-3 my-3'>
            <input
            style={{fontFamily: 'CircularStd'}}
                className='input'
                type='text'
                placeholder='Type a message...'
                value={message}
                onChange={event => setMessage(event.target.value)}
                onKeyPress={event => event.key === 'Enter' ? sendMessage(event) : null}
            />
            {/* <button className='send-button' onClick={event => sendMessage(event)}>Send</button> */}
            {/* <button><img src="./img/google.png" alt="my image" onClick={this.myfunction} /></button> */}
            <button className='btn btn-circle' onClick={event => sendMessage(event)}><FiArrowUp size={30} color='#fff'/></button>
        </form>
    )
}

export default Input
