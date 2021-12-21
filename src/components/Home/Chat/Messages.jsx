import React, { useRef, useEffect, useContext, useState } from 'react';
import { SocketContext } from '../../../contexts/socketContext';

import Message from './Message';


const Messages = () => {
    const [chatMessages, setChatMessages] = useState([]);
    const socket = useContext(SocketContext);

    useEffect(() => {
        socket.emit('getChatMessages');
        socket.on('chatMessages', (data) => {
            setChatMessages(data);
        });
    }, []);

    socket.on('receiveMessage', (data) => {
        setChatMessages(data);
    });

    const messageEndRef = useRef(null);
    const scrollToBottom = () => {
        messageEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }

    useEffect(scrollToBottom, [chatMessages]);
    
    return (
        <div className="bg-slate-100 h-[90vh] p-4 overflow-y-auto">
            <div className="md:mr-10">
                {chatMessages.map(item => (
                    <Message
                        key={item.keyId}
                        userName={item.userName}
                        userImg={item.userImg}
                        message={item.message}
                    />
                ))}
                <div ref={messageEndRef}></div>
            </div>
        </div>
    )
}

export default Messages
