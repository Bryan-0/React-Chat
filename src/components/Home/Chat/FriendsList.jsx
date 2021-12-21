import React, { useState, useContext } from 'react';
import { GoogleLogout } from 'react-google-login';
import Friend from './Friend';
import MobileButton from './MobileButton';

import google_logo from '../../../assets/google_logo.png';
import chat from '../../../assets/chat.png';
import friendsLogo from '../../../assets/friends.png';

import { Navigate } from 'react-router-dom';
import { SocketContext } from '../../../contexts/socketContext';
import { useSelector } from 'react-redux';
import { isMobile } from 'react-device-detect';

const FriendsList = () => {

    const [userLoggedOut, setUserLoggedOut] = useState(false);
    const { isSidebarOpen } = useSelector(state => state.sidebar);
    const socket = useContext(SocketContext);
    const [friends, setFriends] = useState([]);

    socket.on('newFriendConnected', (data) => {
        setFriends(data);
    });

    socket.on('friendDisconnected', (data) => {
        setFriends(data);
    });

    if (userLoggedOut) {
        return <Navigate to="/login" />
    }

    const displayFriendList = () => {
        return (
            friends.map(friend => (
                <Friend 
                    key={friend.keyId}
                    userName={friend.userName}
                    userImg={friend.userImg}
                />
            ))
        )
    }

    return (
        <div className={isMobile ? isSidebarOpen ? "w-screen h-screen" : "hidden" : "w-64 border-r border-slate-300 relative"}>
            {isMobile ? <MobileButton /> : null}
            <div className="bg-white p-4 h-full rounded-lg shadow-xl  space-y-2">
                <h2 className="text-center italic flex justify-center items-center gap-1 flex-col">
                    <img className="w-8 h-8" src={chat} alt="Icon" />
                    AylChat
                </h2>
                <h3 className="flex gap-2 items-center">
                    <img className="w-8 h-8" src={friendsLogo} alt="avatar" />
                    Users in Chat
                </h3>
                {displayFriendList()}
                <div className={isMobile ? "absolute bottom-6 left-1/2 transform -translate-x-1/2" : "absolute bottom-6 left-16"}>
                    <GoogleLogout 
                        clientId='GOOGLE OAUTH2 CLIENT ID HERE'
                        buttonText="Logout"
                        render={renderProps => (
                            <button onClick={renderProps.onClick} disabled={renderProps.disabled}
                                className="shadow-md hover:bg-gray-50 px-4 py-2 rounded-lg"
                            >
                                <div className="flex justify-center items-center gap-2">                                
                                    <img className="w-6 h-6" src={google_logo} alt="Google Logo" />
                                    Logout
                                </div>
                            </button>
                        )}
                        onLogoutSuccess={() => {
                            setUserLoggedOut(true);
                            socket.emit('userLoggedOut');
                        }}
                    />
                </div>
            </div>
        </div>
    )
};

export default FriendsList;