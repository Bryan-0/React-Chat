import React, { useEffect, useContext } from 'react';

import Messages from './Messages';
import MessageInput from './MessageInput';
import MobileButton from './MobileButton';

import { SocketContext } from '../../../contexts/socketContext';
import { useSelector } from 'react-redux';
import { isMobile } from 'react-device-detect';

const Container = () => {
    const socket = useContext(SocketContext);
    const auth = useSelector(state => state.auth);
    const { isSidebarOpen } = useSelector(state => state.sidebar);

    useEffect(() => {
        socket.emit('registerNewUser', { auth });
    }, []);

    return (
        <div className={isMobile && isSidebarOpen ? "hidden" : "relative h-screen col-span-2 md:col-span-1"}>
            <MobileButton />
            <Messages />
            <div className="absolute w-full bg-white bottom-0 h-20 border-t border-slate-300 z-50">
                <MessageInput />
            </div>
        </div>
    )
};

export default Container;