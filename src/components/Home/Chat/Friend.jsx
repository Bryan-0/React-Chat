import React from 'react';

const Friend = ({ userImg, userName }) => {
    return (
        <div className="flex items-center cursor-pointer hover:bg-gray-100 rounded-lg p-2">
            <img src={userImg} className="w-8 h-8 rounded-full mr-4" alt="avatar" />
            <p className="text-sm text-gray-600 -ml-2">{userName}</p>
        </div>
    )
}

export default Friend
