import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import queryString from 'query-string';
import './Join.css'
import 'circular-std'

const Join = ({location}) => {
    const [name, setName] = useState('')
    const [room, setRoom] = useState('');
    const [groupInvite, setGroupInvite] = useState(null);
    useEffect(() => {
        const { groupInvite } = queryString.parse(location.search);

         if(groupInvite){
          setGroupInvite(groupInvite);
         }else {
             return () => {
               
             }
         }
    }, [location.search])

    const checkForValidInput = (event) => {
        if(groupInvite){
            return null
        }
        else if(!name || !room) {
             return event.preventDefault()
        }else {
            return null 
        }

        
    }

    return (
        <div className='container'>
            <div className='container'>
                
                <div className='row'>
                    <div className='col-md-6 mx-auto bg-light mt-5 p-5 rounded shadow-sm'>
                        <form>
                            <fieldset>
                                <h1 className='heading'>Join</h1>
                                <Link className="btn btn-warning" to="/invite">Invite someone</Link>
                                <div className='form-group mt-5'>
                                    <input placeholder='Name' type="text" className="form-control" onChange={(event) => setName(event.target.value)} />
                                </div>
                                <div className='form-group mt-5'>
    {groupInvite ? <div>{groupInvite}</div> : <input placeholder='Room' type="text" className="form-control" onChange={(event) => setRoom(event.target.value)}/>}
                                </div>
                                <Link onClick={event => checkForValidInput(event)} to={groupInvite?`/chat?name=${name}&room=${groupInvite}` :`/chat?name=${name}&room=${room}`}>
                                    <button type='button' className='btn' id='submit' style={{ backgroundColor: '#B9CC95', color: '#ffffff', outline: 'none', fontFamily: 'CircularStd', fontWeight: 500 }}>Submit</button>
                                </Link>
                            </fieldset>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Join
