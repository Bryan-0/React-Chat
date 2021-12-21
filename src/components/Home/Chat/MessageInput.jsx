import React, { useContext, useState, useEffect } from 'react';
import EmojiPicker from './EmojiPicker';

import send from '../../../assets/send.png';
import emoji from '../../../assets/emoji.png';
import clip from '../../../assets/clip.png';

import { SocketContext } from '../../../contexts/socketContext';
import { useSelector } from 'react-redux';

const MessageInput = () => {
    const socket = useContext(SocketContext);
    const auth = useSelector(state => state.auth);
    const [message, setMessage] = useState('');
    const [isEmojiPickerOpen, setIsEmojiPickerOpen] = useState(false);

    const sendMessage = () => {
        if (!message) return;
        socket.emit('sendMessage', {
            auth,
            message
        });
        setMessage('');
    }

    useEffect(() => {
        const handleEnter = (e) => {            
            if (e.key === 'Enter') {
                if (!message) return;
                sendMessage();
            }
        }
        document.addEventListener('keyup', handleEnter);

        return () => {
            document.removeEventListener('keyup', handleEnter);
        }
    });

    const openEmojiPicker = () => {
        setIsEmojiPickerOpen(!isEmojiPickerOpen);
    }

    return (
        <div className="absolute bottom-4 w-full md:w-11/12 px-2 md:px-4">
            <div className=" flex items-center gap-2">
                <input type="text" 
                    className="border border-gray-400 rounded-md px-4 py-3 pr-16 focus:outline-slate-400 w-full"
                    placeholder="Type a message..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                />
                <div className="hover:bg-slate-100 rounded-lg p-1 relative">
                    {isEmojiPickerOpen && <EmojiPicker setMessage={setMessage} setIsEmojiPickerOpen={setIsEmojiPickerOpen} />}
                    <img onClick={openEmojiPicker} src={emoji} className="w-6 h-6 rounded-full mr-2 cursor-pointer" alt="avatar" />
                </div>
                <div className="cursor-pointer hover:bg-slate-100 rounded-lg p-1">
                    <img src={clip} className="w-6 h-6 rounded-full mr-2" alt="avatar" />
                </div>
                <div onClick={sendMessage} className="md:hidden cursor-pointer absolute right-28 hover:bg-slate-100 p-1 rounded-lg">
                    <img src={send} className="w-8 h-8" alt="avatar" />
                </div>
            </div>
        </div>
    )
}

export default MessageInput;
