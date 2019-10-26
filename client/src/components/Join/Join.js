import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import './Join.css'

const Join = () => {
    const [name, setName] = useState('')
    const [room, setRoom] = useState('')

    const checkForValidInput = (event) => {
        if(!name || !room){
            return event.preventDefault()
        }

        return null
    }
    return (
        <div className="join-outer-container">
            <div className="join-inner-container">
                <h1 className='heading'></h1>
                <div>
                    <input placeholder='Name' type="text" className="join-input" onChange={(event) => setName(event.target.value)} />
                </div>
                <div>
                    <input placeholder='Room' type="text" className="join-input mt-20" onChange={(event) => setRoom(event.target.value)} />
                </div>
                <Link onClick={event => checkForValidInput(event)} to={`/chat?name=${name}&room=${room}`}>
                    <button className="button mt-20" type='submit'>Sign In</button>
                </Link>
            </div>
        </div>
    )
}

export default Join
