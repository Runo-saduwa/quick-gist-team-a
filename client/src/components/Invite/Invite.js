import React, {useState} from 'react';
import axios from 'axios';


const Invite = () => {
    const [email, setEmail] = useState('')
    const [room, setRoom] = useState('');

    const formHandler = () => {
        console.log(email, room);
        axios.post('https://quickgist.herokuapp.com/invite', {
             email: email,
             room: room
          })
          .then((response) => {
            console.log(response);
          }, (error) => {
            console.log(error);
          });
        // fetch('http://localhost:8080/invite', {
        //     method: 'POST',
        //     headers : new Headers(),
        //     body:JSON.stringify({email:email, room:room})
        // }).then((res) => res.json())
        // .then((data) =>  console.log(data))
        // .catch((err)=>console.log(err))


    }

   return (
    <div className='container'>
    <div className='container'>
        
        <div className='row'>
            <div className='col-md-6 mx-auto bg-light mt-5 p-5 rounded shadow-sm'>
                <form>
                    <fieldset>
                        <h5 className="text-center">Generate an invitation Link</h5>
                        <div className='form-group mt-5'>
                            <input placeholder='Email' type="text" className="form-control" onChange={(event) => setEmail(event.target.value)} />
                        </div>
                        <div className='form-group mt-5'>
                      <input placeholder='Room' type="text" className="form-control" onChange={(event) => setRoom(event.target.value)}/>
                        </div>
                     
                            <button onClick={formHandler} type='button' className='btn' id='submit' style={{ backgroundColor: '#B9CC95', color: '#ffffff', outline: 'none', fontFamily: 'CircularStd', fontWeight: 500 }}>Submit</button>
                    
                    </fieldset>
                </form>
            </div>
        </div>
    </div>
</div>
   )
}


export default Invite;
