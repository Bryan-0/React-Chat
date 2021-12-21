import React from 'react';

const Message = ({ userImg, userName, message }) => {
    return (
        <div className="flex items-center mb-3 bg-white rounded-lg p-3 shadow-sm relative z-10">
            <div className="w-12 overflow-hidden inline-block absolute -left-4 bottom-0 -z-10">
                <div className=" h-16 bg-white rotate-45 transform origin-bottom-left"></div>
            </div>
            <img src={userImg} className="w-10 h-10 rounded-full mr-4 self-start" alt="avatar" />
            <div className="flex flex-col items-center">
                <p className="self-start">{userName}</p>
                <p className="text-sm text-gray-600 self-start">{message}</p>
            </div>
        </div>
    )
}

export default Message
