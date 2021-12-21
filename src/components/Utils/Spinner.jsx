import React from 'react';

import chat from '../../assets/chat.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';

const Spinner = () => {
    return (
        <div className="flex flex-col gap-2 h-screen items-center justify-center">
            <img src={chat} className="w-16 h-16" />
            <FontAwesomeIcon icon={faSpinner} spin className="text-4xl text-red-400" />
        </div>
    )
}

export default Spinner;
