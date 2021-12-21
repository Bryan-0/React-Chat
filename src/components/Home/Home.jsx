import React, { useEffect } from "react";

import FriendsList from "./Chat/FriendsList";
import Container from "./Chat/Container";
import { isMobile } from "react-device-detect";
import { toggleSidebar } from "../../features/sidebar/sidebarSlice";
import { useDispatch } from "react-redux";
import useAuth from "../../hooks/useAuth";

import { Navigate } from "react-router-dom";

import { SocketContext, socket } from "../../contexts/socketContext";
import Spinner from "../Utils/Spinner";

const Home = () => {
    const [isAuthenticated, setIsAuthenticated] = useAuth();
    const dispatch = useDispatch();

    useEffect(() => {
        if (isMobile) {
            dispatch(toggleSidebar());
        }
    }, []);

    if (isAuthenticated === null) {
        return <Spinner />;
    } else if (!isAuthenticated) {
        return <Navigate to="/login" />
    }

    return (
        <div className="grid grid-cols-[auto_1fr]">
            <SocketContext.Provider value={socket}>
                <FriendsList />
                <Container />
            </SocketContext.Provider>
        </div>
    );
}

export default Home;