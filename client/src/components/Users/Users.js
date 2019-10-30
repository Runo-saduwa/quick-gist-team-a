import React from 'react';
import 'circular-std'
import onlineIcon from '../../assets/icons/online-icon.png';
import './Users.css';

const Users = ({ users }) => (
    <div className="text-container">
        <div>
            <h1 style={{ fontFamily: 'CircularStd', color: '#000' }}>Quick Gist <span role="img" aria-label="emoji">💬</span></h1>
            <h2 style={{ fontFamily: 'CircularStd', color: '#000' }}>Created with React, Express, Node and Socket.IO <span role="img" aria-label="emoji">❤️</span></h2>
            <h2 style={{ fontFamily: 'CircularStd', color: '#000' }}>Try it out right now! <span role="img" aria-label="emoji">⬅️</span></h2>
        </div>
        {
            users
                ? (
                    <div>
                        <h1>People currently chatting:</h1>
                        <div className="active-container">
                            <h2>
                                {users.map(({ name }) => (
                                    <div key={name} className="active-item">
                                        {name}
                                        <img alt="online" src={onlineIcon} />
                                    </div>
                                ))}
                            </h2>
                        </div>
                    </div>
                )
                : null
        }
    </div>
);

export default Users;