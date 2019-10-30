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
                onChange={({ target: { value } }) => setMessage(value)}
                onKeyPress={event => event.key === 'Enter' ? sendMessage(event) : null}
            />
            <button className='btn btn-circle' onClick={event => sendMessage(event)}><FiArrowUp size={30} color='#fff'/></button>
        </form>
    )
}

export default Input
