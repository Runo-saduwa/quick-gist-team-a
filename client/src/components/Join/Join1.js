import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import './Join1.css'
import 'circular-std'

const Join1 = () => {
    const [name, setName] = useState('')
    const [room, setRoom] = useState('')

    const checkForValidInput = (event) => {
        if (!name || !room) {
             return event.preventDefault()
        }

        return null
    }

    return (
        <div className='container'>
            <div className='container'>
                <div className='row'>
                    <div className='col-md-6 mx-auto bg-light mt-5 p-5 rounded shadow-sm'>
                        <form>
                            <fieldset>
                                <h1 className='heading'>Join</h1>
                                <div className='form-group mt-5'>
                                    <input placeholder='Name' type="text" className="form-control" onChange={(event) => setName(event.target.value)} />
                                </div>
                                <div className='form-group mt-5'>
                                    <input placeholder='Room' type="text" className="join-input form-control" onChange={(event) => setRoom(event.target.value)} />
                                </div>
                                <Link onClick={event => checkForValidInput(event)} to={`/chat?name=${name}&room=${room}`}>
                                    <button type='button' className='btn' id='submit' style={{ backgroundColor: '#0b4f6c', color: '#ffffff', outline: 'none', fontFamily: 'CircularStd' }}>Submit</button>
                                </Link>
                            </fieldset>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Join1
