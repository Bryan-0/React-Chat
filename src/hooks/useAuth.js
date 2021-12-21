import { useState, useEffect } from 'react';
import { gapi, loadAuth2 } from 'gapi-script';
import { useDispatch } from 'react-redux';
import { login, logout } from '../features/authentication/authSlice';

const useAuth = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(null);
    const dispatch = useDispatch();

    useEffect(() => {
        const setAuth2 = async () => {
            const auth2 = await loadAuth2(gapi, 'GOOGLE OAUTH2 CLIENT ID HERE', '')
            if (auth2.isSignedIn.get()) {
                dispatch(login({
                    userName: auth2.currentUser.get().getBasicProfile().getName(),
                    userEmail: auth2.currentUser.get().getBasicProfile().getEmail(),
                    userImg: auth2.currentUser.get().getBasicProfile().getImageUrl(),
                    userId: auth2.currentUser.get().getBasicProfile().getId()
                }));
                setIsAuthenticated(true);
            } else {
                dispatch(logout());
                setIsAuthenticated(false);
            }
          }
          setAuth2();
    }, []);

    return [isAuthenticated, setIsAuthenticated];
};

export default useAuth;