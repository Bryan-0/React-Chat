import React from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight, faTimes } from '@fortawesome/free-solid-svg-icons';
import { useDispatch, useSelector } from 'react-redux';
import { toggleSidebar } from '../../../features/sidebar/sidebarSlice';

const MobileButton = () => {
    const dispatch = useDispatch();
    const { isSidebarOpen } = useSelector(state => state.sidebar);

    return (
        <div className={!isSidebarOpen ? "absolute md:hidden top-1/2 -translate-y-1/2 -left-4 z-50 cursor-pointer" 
        : "w-screen h-screen absolute md:hidden top-1/2 -translate-y-1/2 -left-4"}>
            <div className={!isSidebarOpen ? "rounded-full bg-white p-4"
            : "rounded-full p-4 relative w-full"}>
                <FontAwesomeIcon onClick={() => dispatch(toggleSidebar())}  icon={isSidebarOpen ? faTimes : faArrowRight} className={!isSidebarOpen ? "text-lg" : "text-2xl text-red-600 absolute right-2 top-6"} />
            </div>
        </div>
    )
}

export default MobileButton;
