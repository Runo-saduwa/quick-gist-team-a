import React from 'react'
import 'circular-std'
import { FiX } from 'react-icons/fi'
import './Infobar.css'
import onlineIcon from '../../assets/icons/online-icon.png'

const Infobar = ({ room, typing }) => {
    return (
        <div className='info-bar shadow-sm'>
            <div className='left-inner-container'>
                <img src={onlineIcon} className="online-icon" alt='online' />
                <h3 style={{ fontFamily: 'CircularStd', fontWeight: 600, color: '#000', marginBottom: 0, marginTop: 0 }} >
                {room}
                {typing ? <div className="typing-effect">someone is typing</div> : null}
                </h3>
             
            </div>
            <div className="right-inner-container">
                <a href="/"><FiX size={20} color='#000' /></a>
            </div>
        </div>
    )
}

export default Infobar
